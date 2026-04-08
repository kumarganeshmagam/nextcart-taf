import { DOMSanitizer } from '../utils/DOMSanitizer';
import { TestContext } from '../utils/TestContext';
import { ProviderFactory } from '../providers/ProviderFactory';
import { AIProvider } from '../providers/AIProvider';

export interface HealSuggestion {
  selector: string;
  type: 'css' | 'xpath';
  confidence: 'HIGH' | 'MEDIUM' | 'LOW';
  reason: string;
}

const aiProvider: AIProvider = ProviderFactory.getProvider();

export async function tier1Heal(
  dom: string,
  failedSelector: string,
  elementDesc: string,
  context: TestContext
): Promise<HealSuggestion[]> {

  const cleanDOM = DOMSanitizer.clean(dom, elementDesc);
  const precedingSteps = context.getRecentContextString();

  const prompt = `
You are a Playwright test automation expert. A locator has failed.

FAILED SELECTOR: "${failedSelector}"
ELEMENT DESCRIPTION: "${elementDesc}"
PRECEDING STEPS: ${precedingSteps}

DOM SNAPSHOT:
${cleanDOM}

Provide 5 alternative Playwright-compatible selectors ranked by confidence.
Use ONLY this exact format:

[LOCATORS]
1. selector-here | HIGH | reason why
2. selector-here | MEDIUM | reason why
3. selector-here | MEDIUM | reason why
4. selector-here | LOW | reason why
5. selector-here | LOW | reason why
[/LOCATORS]

Rules:
- Prefer data-testid, aria-label, role over fragile class/id
- Return ONLY the format above, nothing else
  `;

  const response = await aiProvider.generateText(prompt);
  return parseLocatorResponse(response);
}

export async function tier2Heal(
  dom: string,
  screenshotBase64: string,
  failedSelector: string,
  elementDesc: string,
  context: TestContext
): Promise<HealSuggestion[]> {

  const cleanDOM = DOMSanitizer.clean(dom, elementDesc);
  const precedingSteps = context.getRecentContextString();

  const prompt = `Analyze screenshot + DOM. Find the element: "${elementDesc}".
     Failed selector: "${failedSelector}". Steps before: ${precedingSteps}
     DOM: ${cleanDOM}
     
     Return ONLY:
     [LOCATORS]
     1. selector | HIGH | reason
     [/LOCATORS]`;

  const response = await aiProvider.generateWithVision(prompt, screenshotBase64);
  return parseLocatorResponse(response);
}

function parseLocatorResponse(response: string): HealSuggestion[] {
  const match = response.match(/\[LOCATORS\]([\s\S]*?)\[\/LOCATORS\]/);
  if (!match) return [];

  return match[1].trim().split('\n')
    .map(line => {
      const parts = line.match(/\d+\.\s+(.+?)\s+\|\s+(HIGH|MEDIUM|LOW)\s+\|\s+(.+)/);
      if (!parts) return null;
      const selector = parts[1].trim();
      return {
        selector,
        type: (selector.startsWith('//') || selector.startsWith('xpath=')) ? 'xpath' : 'css',
        confidence: parts[2] as 'HIGH' | 'MEDIUM' | 'LOW',
        reason: parts[3]
      } as HealSuggestion;
    })
    .filter((s): s is HealSuggestion => s !== null);
}

