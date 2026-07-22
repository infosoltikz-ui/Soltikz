import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { createClient } from '@/utils/supabase/server';

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
      amount, // We pass this from the frontend for logging
      planId
    } = await req.json();

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json({ error: 'Missing payment details' }, { status: 400 });
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
    // Log the payment
    await supabase.from('payments_and_subscriptions').insert({
      user_id: user.id,
      razorpay_payment_id: razorpay_payment_id,
      razorpay_order_id: razorpay_order_id,
      amount_paid: amount,
      status: 'Captured',
      valid_until: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString() // Valid for 1 month
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
