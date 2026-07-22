import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { createClient } from '@/utils/supabase/server';

export async function POST(req: Request) {
  try {
    const supabase = await createClient();
    
    // 1. Verify User
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { planId, amountInr } = await req.json();

    if (!planId || !amountInr) {
      return NextResponse.json({ error: 'Missing required payload data' }, { status: 400 });
    }

    // 2. Initialize Razorpay
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      console.error('Razorpay keys are missing in environment variables');
      return NextResponse.json({ error: 'Payment gateway configuration error' }, { status: 500 });
    }

    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    // 3. Create Order
    // Amount must be in paise (multiply INR by 100)
    const options = {
      amount: Math.round(amountInr * 100),  
      currency: "INR",
      receipt: `rcpt_${user.id}_${Date.now()}`.substring(0, 40),
      notes: {
        userId: user.id,
        planId: planId
      }
    };

    const order = await instance.orders.create(options);

    if (!order) {
      return NextResponse.json({ error: 'Failed to create Razorpay order' }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true, 
      orderId: order.id,
      amount: order.amount,
      currency: order.currency
    });

  } catch (error: any) {
    console.error('Razorpay Order Creation Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
