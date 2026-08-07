import React from 'react';

export default function RefundPolicy() {
  return (
    <div className="container mx-auto max-w-4xl py-20 px-4">
      <h1 className="text-4xl font-black mb-8 text-slate-900">Refund and Cancellation Policy</h1>
      <div className="prose prose-slate max-w-none">
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        
        <h2>1. Cancellation Policy</h2>
        <p>You may cancel your subscription at any time. Cancellations will take effect at the end of the current billing cycle. You will continue to have access to the premium features until the end of your billing cycle.</p>
        
        <h2>2. Refund Policy</h2>
        <p>We offer a 7-day money-back guarantee for all new subscriptions. If you are not satisfied with our service, you can request a full refund within 7 days of your initial purchase.</p>
        <p>To request a refund, please contact our support team at info.soltikz@gmail.com with your account details and reason for the refund.</p>
        
        <h2>3. Exceptions</h2>
        <p>Refunds will not be provided in the following cases:</p>
        <ul>
          <li>Requests made after the 7-day money-back guarantee period.</li>
          <li>Renewals of existing subscriptions.</li>
          <li>Accounts that have been suspended or terminated for violating our Terms of Service.</li>
        </ul>
        
        <h2>4. Processing of Refunds</h2>
        <p>Approved refunds will be processed through your original method of payment (via Razorpay). Please allow 5-7 business days for the refund to reflect in your account, depending on your bank or credit card provider.</p>
      </div>
    </div>
  );
}
