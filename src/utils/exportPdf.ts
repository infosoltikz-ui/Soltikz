import { jsPDF } from 'jspdf';
import { toJpeg } from 'html-to-image';

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
    compress: true, // Enable jsPDF compression
  });

  for (let i = 0; i < pages.length; i++) {
    const pageEl = pages[i];
    
    // Convert to high-quality JPEG to drastically reduce file size vs PNG.
    // - pixelRatio: 2 gives crisp text without creating a 50MB image (retina display resolution)
    // - quality: 0.95 provides excellent visual quality with strong compression
    const dataUrl = await toJpeg(pageEl, {
      quality: 0.95,
      pixelRatio: 2, 
      backgroundColor: '#ffffff',
      cacheBust: true,
      skipFonts: false,
      style: {
        printColorAdjust: 'exact',
      } as Partial<CSSStyleDeclaration>,
    });

    if (i > 0) {
      pdf.addPage();
    }

    // A4 dimensions in mm (210 x 297)
    // Using JPEG drastically reduces the final PDF size.
    pdf.addImage(dataUrl, 'JPEG', 0, 0, 210, 297, undefined, 'FAST');
  }

  pdf.save(filename);
};

