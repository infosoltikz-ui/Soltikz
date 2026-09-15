import React from 'react';
import { C2CTemplate } from '@/components/create-resume/templates/C2CTemplate';
import { c2cSampleData, sampleProfileData } from '@/components/create-resume/templates/sampleData';

export default function C2CTestPage() {
  const PAGE_HEIGHT = 1123;
  const PAGE_WIDTH = 794;

  return (
    <div style={{ padding: '2rem', backgroundColor: '#f3f4f6', minHeight: '100vh', display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
      
      {/* Page 1 */}
      <div>
        <h2 style={{ textAlign: 'center', marginBottom: '1rem', fontWeight: 'bold' }}>Page 1</h2>
        <div style={{ width: PAGE_WIDTH, height: PAGE_HEIGHT, overflow: 'hidden', backgroundColor: 'white', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}>
          <C2CTemplate resumeData={c2cSampleData} profileData={sampleProfileData} />
        </div>
      </div>

      {/* Page 2 */}
      <div>
        <h2 style={{ textAlign: 'center', marginBottom: '1rem', fontWeight: 'bold' }}>Page 2</h2>
        <div style={{ width: PAGE_WIDTH, height: PAGE_HEIGHT, overflow: 'hidden', backgroundColor: 'white', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}>
          <div style={{ transform: `translateX(-${PAGE_WIDTH}px)`, width: '100%', height: '100%' }}>
            <C2CTemplate resumeData={c2cSampleData} profileData={sampleProfileData} />
          </div>
        </div>
      </div>

    </div>
  );
}
