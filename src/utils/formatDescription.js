import DOMPurify from 'dompurify';

/**
 * Formats a description (plain text or HTML from ReactQuill) by converting URLs to clickable links,
 * preserving line breaks and paragraph spacing, and sanitizing the HTML for safe rendering.
 * @param {string} text - The description from Firebase (plain text or HTML).
 * @returns {string} - Sanitized HTML string ready for dangerouslySetInnerHTML.
 */
export function formatDescription(text) {
  if (!text || typeof text !== 'string') return '';

  let processedText = text;

  // If it's HTML (contains <), convert to plain text with line breaks
  if (text.includes('<')) {
    // Assuming HTML from ReactQuill with <p> tags
    processedText = text
      .replace(/<p>/gi, '')  // Remove opening <p>
      .replace(/<\/p>/gi, '\n')  // Replace closing </p> with newline
      .replace(/<br\s*\/?>/gi, '\n')  // Handle any <br> tags
      .replace(/<[^>]*>/g, '');  // Remove any other HTML tags
  }

  // Step 1: Convert URLs to clickable links
  const urlRegex = /((https?:\/\/|www\.)[^\s]+|[a-zA-Z0-9-]{2,}\.[a-zA-Z]{2,})/gi;
  let html = processedText.replace(urlRegex, (url) => {
    const href = url.startsWith('http') ? url : `http://${url}`;
    return `<a href="${href}" target="_blank" rel="noopener noreferrer" style="color:#059669;text-decoration:underline;font-weight:500;">${url}</a>`;
  });

  // Step 2: Preserve line breaks by converting \n to <br />
  html = html.replace(/\n/g, '<br />');

  // Step 3: Sanitize the HTML to prevent XSS
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['a', 'br'],
    ALLOWED_ATTR: ['href', 'target', 'rel', 'style']
  });
}