import * as cheerio from 'cheerio';
import sanitizeHtml from 'sanitize-html';

export class DOMSanitizer {
  static clean(rawHTML: string, elementDescription: string): string {
    const $ = cheerio.load(rawHTML);

    // Strip scripts and styles
    $('script, style, noscript, meta, link, svg').remove();

    // Use sanitize-html for extra safety (optional but keeps things clean)
    const sanitized = sanitizeHtml($.html(), {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat(['form', 'input', 'button', 'select', 'label', 'main', 'section']),
      allowedAttributes: {
        '*': ['id', 'class', 'name', 'type', 'placeholder', 'aria-label', 'data-testid', 'role', 'href']
      }
    });

    const $$ = cheerio.load(sanitized);

    // Try to find relevant section using keywords
    const keywords = elementDescription.toLowerCase().split(' ');
    let context = $$('form, section, [role="main"], main').first();
    
    // Fallback logic if a more specific context is found containing keywords
    if (!context.length) {
        context = $$('body');
    }

    return (context.html() || $$('html').html() || '').substring(0, 8000);
  }
}
