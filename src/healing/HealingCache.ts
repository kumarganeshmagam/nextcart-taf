import * as fs from 'fs';
import * as path from 'path';

export class HealingCache {
  private static cacheFile = path.join(process.cwd(), 'healing-cache.json');
  private static cache: Record<string, string> = {};

  static load() {
    if (fs.existsSync(this.cacheFile)) {
      try {
        const data = fs.readFileSync(this.cacheFile, 'utf8');
        this.cache = JSON.parse(data);
      } catch (e) {
        console.error('Failed to load healing cache', e);
        this.cache = {};
      }
    }
  }

  static get(selector: string): string | null {
    if (Object.keys(this.cache).length === 0) this.load();
    return this.cache[selector] || null;
  }

  static set(original: string, healed: string) {
    this.cache[original] = healed;
    this.save();
  }

  private static save() {
    try {
      fs.writeFileSync(this.cacheFile, JSON.stringify(this.cache, null, 2));
    } catch (e) {
      console.error('Failed to save healing cache', e);
    }
  }

  static clear() {
    this.cache = {};
    if (fs.existsSync(this.cacheFile)) fs.unlinkSync(this.cacheFile);
  }
}
