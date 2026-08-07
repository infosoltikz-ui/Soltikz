import React from 'react';

export default function TermsOfService() {
  return (
    <div className="container mx-auto max-w-4xl py-20 px-4">
      <h1 className="text-4xl font-black mb-8 text-slate-900">Terms of Service</h1>
      <div className="prose prose-slate max-w-none">
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        
        <h2>1. Agreement to Terms</h2>
        <p>By accessing our website, you agree to be bound by these Terms of Service and to use the site in accordance with these Terms of Service, our Privacy Policy and any additional terms and conditions that may apply to specific sections of the site or to products and services available through the site or from us.</p>
        
        <h2>2. Intellectual Property Rights</h2>
        <p>Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site and the trademarks, service marks, and logos contained therein are owned or controlled by us or licensed to us.</p>
        
        <h2>3. User Representations</h2>
        <p>By using the Site, you represent and warrant that: (1) all registration information you submit will be true, accurate, current, and complete; (2) you will maintain the accuracy of such information and promptly update such registration information as necessary.</p>
        
        <h2>4. Prohibited Activities</h2>
        <p>You may not access or use the Site for any purpose other than that for which we make the Site available. The Site may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.</p>
        
        <h2>5. Payment and Billing</h2>
        <p>We use Razorpay for processing payments. By providing a credit card or other payment method, you represent and warrant that you are authorized to use the designated payment method and that you authorize us (or our third-party payment processor, Razorpay) to charge your payment method for the total amount of your purchase.</p>

        <h2>6. Contact Us</h2>
        <p>In order to resolve a complaint regarding the Site or to receive further information regarding use of the Site, please contact us at info.soltikz@gmail.com.</p>
      </div>
    </div>
  );
}
