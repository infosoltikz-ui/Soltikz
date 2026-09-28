export const exportToPdf = async (element: HTMLElement, filename: string) => {
  // Using native browser print dialog for ATS-friendly, text-searchable PDFs
  // The globals.css already contains @media print rules that hide UI elements (.no-print)
  // and format the .resume-page elements perfectly for A4.
  
  // A brief delay allows any UI state changes to settle before printing
  setTimeout(() => {
    // Modify document title temporarily so the default save filename matches
    const originalTitle = document.title;
    document.title = filename;
    
    window.print();
    
    // Restore original title
    document.title = originalTitle;
  }, 100);
};
