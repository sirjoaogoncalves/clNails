// This script creates placeholder elements for images that don't exist yet
export const setupPlaceholders = () => {
  // Create a simple placeholder service for local development
  const createPlaceholder = (element, bgColor = 'c4908f') => {
    const width = element.getAttribute('width') || element.width || 300;
    const height = element.getAttribute('height') || element.height || 200;
    
    // Set a background color from our theme
    element.style.backgroundColor = `#${bgColor}`;
    
    // Add some size properties
    element.style.width = `${width}px`;
    element.style.height = `${height}px`;
    
    // Center text
    element.style.display = 'flex';
    element.style.alignItems = 'center';
    element.style.justifyContent = 'center';
    element.style.color = '#ffffff';
    element.style.fontFamily = 'sans-serif';
    element.style.fontSize = '14px';
    
    // Add text with dimensions
    element.textContent = `${width}×${height}`;
    
    // Remove src to prevent broken image icon
    element.removeAttribute('src');
  };
  
  // Handle image errors by replacing with placeholders
  document.addEventListener('error', (e) => {
    if (e.target.tagName.toLowerCase() === 'img') {
      createPlaceholder(e.target);
    }
  }, true);
  
  // Find all images with "placeholder" class and apply placeholders
  document.querySelectorAll('img.placeholder').forEach(img => {
    createPlaceholder(img);
  });
};
