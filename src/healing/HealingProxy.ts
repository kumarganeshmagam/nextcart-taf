import { Page } from '@playwright/test';
import { HealingCache } from './HealingCache';
import { tier1Heal, tier2Heal } from './AIHealer';
import { TestContext } from '../utils/TestContext';

export class HealingProxy {
  private static healingLog: Record<string, any> = {};
  public static readonly testContext = new TestContext();

  /**
   * Wraps the Playwright Page object with a Proxy to provide transparent self-healing.
   */
  static wrap(page: Page): Page {
    const handler: ProxyHandler<any> = {
      get(target, prop, receiver) {
        const originalValue = Reflect.get(target, prop, receiver);

        // Define which methods we want to wrap with healing
        const healableMethods = ['click', 'fill', 'check', 'selectOption', 'hover'];

        if (typeof originalValue === 'function' && healableMethods.includes(prop as string)) {
          return async (...args: any[]) => {
            const selector = args[0];
            const description = `element with selector "${selector}"`;
            
            // Track the action in context
            HealingProxy.testContext.record('Page', prop as string, description, selector);

            try {
              // Attempt the original action with a tight timeout to trigger healing faster
              // Note: We merge the user's options with our timeout if it's the second argument
              let options = args[1] || {};
              if (typeof options === 'object') {
                options = { ...options, timeout: options.timeout || 5000 };
              }
              
              return await (originalValue as Function).apply(target, [args[0], options, ...args.slice(2)]);
            } catch (error) {
              console.warn(`[Proxy] Action "${prop as string}" failed for ${selector}. Attempting healing...`);
              
              const healedSelector = await HealingProxy.tryHeal(page, selector, description);
              
              if (healedSelector) {
                console.info(`[Proxy] Retrying "${prop as string}" with healed selector: ${healedSelector}`);
                return await (originalValue as Function).apply(target, [healedSelector, ...args.slice(1)]);
              }
              
              throw error;
            }
          };
        }

        return originalValue;
      }
    };

    return new Proxy(page, handler);
  }

  static async verifyLocator(page: Page, selector: string): Promise<boolean> {
    try {
      return await page.evaluate((sel) => {
        const el = document.querySelector(sel);
        if (!el) return false;
        const visible = (el as HTMLElement).offsetParent !== null;
        const enabled = !(el as HTMLInputElement).disabled;
        return visible && enabled;
      }, selector);
    } catch {
      return false;
    }
  }

  static async tryHeal(page: Page, selector: string, description: string): Promise<string | null> {
    const cached = HealingCache.get(selector);
    if (cached) {
      if (await this.verifyLocator(page, cached)) {
        console.info(`[Heal] ✅ Cache hit verified: "${selector}" → "${cached}"`);
        return cached;
      }
      console.warn(`[Heal] ⚠️ Cached locator "${cached}" no longer valid. Retrying AI.`);
    }

    console.warn(`[Heal] 🔧 Tier 1 healing started for: "${selector}" (${description})`);
    const dom = await page.content();
    const suggestions1 = await tier1Heal(dom, selector, description, this.testContext);

    for (const s of suggestions1) {
      if (await this.verifyLocator(page, s.selector)) {
        console.info(`[Heal] ✅ Tier 1 healed: "${selector}" → "${s.selector}" (${s.confidence})`);
        HealingCache.set(selector, s.selector);
        this.healingLog[selector] = { healed: s.selector, tier: 1, confidence: s.confidence, reason: s.reason };
        return s.selector;
      }
    }

    console.warn(`[Heal] 📸 Tier 2 healing (vision) started for: "${selector}"`);
    const screenshot = await page.screenshot({ fullPage: false });
    const base64 = screenshot.toString('base64');
    const suggestions2 = await tier2Heal(dom, base64, selector, description, this.testContext);

    for (const s of suggestions2) {
      if (await this.verifyLocator(page, s.selector)) {
        console.info(`[Heal] ✅ Tier 2 healed: "${selector}" → "${s.selector}" (${s.confidence})`);
        HealingCache.set(selector, s.selector);
        this.healingLog[selector] = { healed: s.selector, tier: 2, confidence: s.confidence, reason: s.reason };
        return s.selector;
      }
    }

    console.error(`[Heal] ❌ Healing failed for: "${selector}"`);
    return null;
  }

  static getLog() {
    return this.healingLog;
  }
}
