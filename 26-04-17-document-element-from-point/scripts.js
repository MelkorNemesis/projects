/**
 * Demonstration of document.elementFromPoint(x, y)
 * 
 * This method returns the topmost Element at the specified coordinates
 * (relative to the viewport). It's useful for:
 * - Hit testing
 * - Custom drag-and-drop
 * - Detecting elements under cursor
 * - Accessibility features
 */

// DOM references
const coordsDisplay = document.getElementById('coords');
const elementTagDisplay = document.getElementById('element-tag');
const elementClassDisplay = document.getElementById('element-class');
const elementIdDisplay = document.getElementById('element-id');
const toggleBtn = document.getElementById('toggle-pointer');
const box2 = document.querySelector('.box-2');
const clickOutput = document.getElementById('click-output');

// Track the currently highlighted element
let currentHighlight = null;

/**
 * Main demonstration: Track mouse and show element info
 */
document.addEventListener('mousemove', (e) => {
  const x = e.clientX;
  const y = e.clientY;
  
  // Update coordinates display
  coordsDisplay.textContent = `(${x}, ${y})`;
  
  // Get element at point
  const element = document.elementFromPoint(x, y);
  
  if (element) {
    // Update info panel
    elementTagDisplay.textContent = element.tagName.toLowerCase();
    elementClassDisplay.textContent = element.className || '—';
    elementIdDisplay.textContent = element.id || '—';
    
    // Visual highlight effect
    if (currentHighlight && currentHighlight !== element) {
      currentHighlight.classList.remove('highlighted');
    }
    
    if (element.closest('.playground') || element.classList.contains('playground')) {
      element.classList.add('highlighted');
      currentHighlight = element;
    } else if (currentHighlight) {
      currentHighlight.classList.remove('highlighted');
      currentHighlight = null;
    }
  }
});

/**
 * Demonstrate how pointer-events: none affects elementFromPoint
 * When an element has pointer-events: none, elementFromPoint will
 * return the element beneath it instead
 */
toggleBtn.addEventListener('click', (e) => {
  e.stopPropagation(); // Prevent the click from triggering elementsFromPoint
  box2.classList.toggle('no-pointer');
  
  if (box2.classList.contains('no-pointer')) {
    toggleBtn.textContent = 'Enable pointer-events on Box 2';
  } else {
    toggleBtn.textContent = 'Disable pointer-events on Box 2';
  }
});

/**
 * Format element info for display
 */
function formatElement(el, index) {
  const tag = el.tagName.toLowerCase();
  const classes = el.className ? el.className.split(' ').filter(c => c && c !== 'highlighted').join('.') : '';
  const id = el.id || '';
  
  return { tag, classes, id, index };
}

/**
 * Create HTML for a single element entry
 */
function createElementEntry(info) {
  const entry = document.createElement('div');
  entry.className = 'element-entry';
  
  const indexSpan = document.createElement('span');
  indexSpan.className = 'entry-index';
  indexSpan.textContent = info.index + 1;
  
  const contentDiv = document.createElement('div');
  contentDiv.className = 'entry-content';
  
  const tagSpan = document.createElement('span');
  tagSpan.className = 'entry-tag';
  tagSpan.textContent = info.tag;
  
  contentDiv.appendChild(tagSpan);
  
  if (info.id) {
    const idSpan = document.createElement('span');
    idSpan.className = 'entry-id';
    idSpan.textContent = `#${info.id}`;
    contentDiv.appendChild(idSpan);
  }
  
  if (info.classes) {
    const classSpan = document.createElement('span');
    classSpan.className = 'entry-class';
    classSpan.textContent = `.${info.classes}`;
    contentDiv.appendChild(classSpan);
  }
  
  entry.appendChild(indexSpan);
  entry.appendChild(contentDiv);
  
  return entry;
}

/**
 * Display elementsFromPoint results in sidebar
 */
document.addEventListener('click', (e) => {
  // Ignore clicks on toggle button
  if (e.target.closest('.btn')) return;
  
  const x = e.clientX;
  const y = e.clientY;
  
  // Get ALL elements at point (returns an array)
  const elements = document.elementsFromPoint(x, y);
  
  // Clear previous output
  clickOutput.innerHTML = '';
  
  // Add click info header
  const header = document.createElement('div');
  header.className = 'click-header';
  header.innerHTML = `
    <span class="click-coords">Click at (${x}, ${y})</span>
    <span class="click-count">${elements.length} elements</span>
  `;
  clickOutput.appendChild(header);
  
  // Create entries container
  const entriesContainer = document.createElement('div');
  entriesContainer.className = 'entries-container';
  
  // Add each element
  elements.forEach((el, index) => {
    const info = formatElement(el, index);
    const entry = createElementEntry(info);
    
    // Add staggered animation
    entry.style.animationDelay = `${index * 30}ms`;
    
    entriesContainer.appendChild(entry);
  });
  
  clickOutput.appendChild(entriesContainer);
});

// Initial log
console.log('🎯 elementFromPoint demo ready!');
