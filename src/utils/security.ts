import DOMPurify from 'isomorphic-dompurify'

/**
 * Sanitizuje HTML řetězec pro bezpečné vykreslení pomocí dangerouslySetInnerHTML.
 * Odstraní nebezpečné tagy jako <script>, <onerror>, <iframe> atd.
 */
export function sanitizeHtml(html: string): string {
  if (!html) return ''
  
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      'p', 'br', 'b', 'i', 'em', 'strong', 'a', 'ul', 'ol', 'li', 
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'code', 'pre',
      'img', 'span', 'div', 'table', 'thead', 'tbody', 'tr', 'th', 'td'
    ],
    ALLOWED_ATTR: [
      'href', 'src', 'alt', 'title', 'class', 'target', 'rel', 
      'width', 'height', 'style'
    ]
  }) as string
}
