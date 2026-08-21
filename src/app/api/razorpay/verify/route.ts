import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { createClient } from '@/utils/supabase/server';
import { PRO_MONTHLY, PRO_YEARLY } from '@/utils/pricingPlans';

const KNOWN_PLANS = { PRO_MONTHLY, PRO_YEARLY };

export async function POST(req: Request) {
  try {
    const supabase = await createClient();

    // 1. Verify User
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      planId
    } = await req.json();

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json({ error: 'Missing payment details' }, { status: 400 });
    }

    // Derive the real amount/duration from the known plan server-side rather than
    // trusting a client-supplied amount (which could otherwise be tampered with).
    const plan = KNOWN_PLANS[planId as keyof typeof KNOWN_PLANS];
    if (!plan) {
      return NextResponse.json({ error: 'Unknown plan' }, { status: 400 });
    }

    const secret = process.env.RAZORPAY_KEY_SECRET;
    if (!secret) throw new Error('Razorpay secret not configured');

    // 2. Verify Signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(body.toString())
      .digest('hex');

    const isAuthentic = expectedSignature === razorpay_signature;

    if (!isAuthentic) {
      return NextResponse.json({ error: 'Invalid payment signature' }, { status: 400 });
    }

    // 3. Update Database on Success
    const validUntil = new Date();
    if (plan.period === 'year') {
      validUntil.setFullYear(validUntil.getFullYear() + 1);
    } else {
      validUntil.setMonth(validUntil.getMonth() + 1);
    }

    // Log the payment
    await supabase.from('payments_and_subscriptions').insert({
      user_id: user.id,
      razorpay_payment_id: razorpay_payment_id,
      razorpay_order_id: razorpay_order_id,
      amount_paid: plan.amountInr,
      status: 'Captured',
      valid_until: validUntil.toISOString()
    });

    // Upgrade the user's profile
    const { error: profileError } = await supabase
      .from('profiles')
      .update({ plan_id: planId }) // e.g., 'PRO_MONTHLY'
      .eq('id', user.id);

    if (profileError) throw profileError;

    return NextResponse.json({ 
      success: true, 
      message: 'Payment verified and plan upgraded successfully'
    });

  } catch (error: any) {
    console.error('Razorpay Verification Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
