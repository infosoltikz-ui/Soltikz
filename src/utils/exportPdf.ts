import { jsPDF } from 'jspdf';
import { toPng } from 'html-to-image';

export const exportToPdf = async (element: HTMLElement, filename: string) => {
  // Find all individual pages within the container
  const pages = Array.from(element.querySelectorAll('.resume-page')) as HTMLElement[];
  
  if (pages.length === 0) {
    throw new Error('No resume pages found to export.');
  }

  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  for (let i = 0; i < pages.length; i++) {
    const pageEl = pages[i];
    
    // Convert to high-quality PNG using native browser renderer.
    // - backgroundColor: white ensures no transparent bleed-through
    // - pixelRatio: 3 gives crisp text at A4 print resolution
    // - cacheBust: prevents html-to-image from using stale cached fonts/images
    // - skipFonts: false ensures custom fonts (Google Fonts etc.) are embedded
    const dataUrl = await toPng(pageEl, {
      quality: 1,
      pixelRatio: 3,
      backgroundColor: '#ffffff',
      cacheBust: true,
      skipFonts: false,
      style: {
        // Force the browser to paint all backgrounds (critical for colored headers/sidebars)
        printColorAdjust: 'exact',
      } as Partial<CSSStyleDeclaration>,
    });

    if (i > 0) {
      pdf.addPage();
    }

    // A4 dimensions in mm
    pdf.addImage(dataUrl, 'PNG', 0, 0, 210, 297);
  }

  pdf.save(filename);
};

