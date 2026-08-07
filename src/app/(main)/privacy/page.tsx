import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto max-w-4xl py-20 px-4">
      <h1 className="text-4xl font-black mb-8 text-slate-900">Privacy Policy</h1>
      <div className="prose prose-slate max-w-none">
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        <h2>1. Introduction</h2>
        <p>Welcome to Resume Builder One. We respect your privacy and are committed to protecting your personal data.</p>
        
        <h2>2. Data We Collect</h2>
        <p>We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:</p>
        <ul>
          <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
          <li><strong>Contact Data:</strong> includes email address and telephone numbers.</li>
          <li><strong>Financial Data:</strong> includes payment card details (processed securely by Razorpay).</li>
          <li><strong>Profile Data:</strong> includes your resume details, employment history, and education.</li>
        </ul>

        <h2>3. How We Use Your Data</h2>
        <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
        <ul>
          <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
          <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
          <li>Where we need to comply with a legal obligation.</li>
        </ul>

        <h2>4. Data Security</h2>
        <p>We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorised way, altered or disclosed.</p>

        <h2>5. Contact Us</h2>
        <p>If you have any questions about this privacy policy or our privacy practices, please contact us at info.soltikz@gmail.com.</p>
      </div>
    </div>
  );
}
