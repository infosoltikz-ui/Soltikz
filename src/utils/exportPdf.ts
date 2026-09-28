export const exportToPdf = async (element: HTMLElement, filename: string) => {
  // To print ONLY the resume and not the dashboard, we clone the element
  // and temporarily mount it directly to the body.
  const printMount = document.createElement('div');
  printMount.id = 'print-mount';
  
  // Clone the node so we don't break the React component tree
  const clone = element.cloneNode(true) as HTMLElement;
  printMount.appendChild(clone);
  
  document.body.appendChild(printMount);
  document.body.classList.add('printing-resume');

  setTimeout(() => {
    const originalTitle = document.title;
    document.title = filename;
    
    window.print();
    
    document.title = originalTitle;
    
    // Clean up
    document.body.classList.remove('printing-resume');
    document.body.removeChild(printMount);
  }, 100);
};
