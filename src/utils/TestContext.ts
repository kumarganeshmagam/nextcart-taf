export interface StepRecord {
  name: string;
  action: string;
  elementDesc: string;
  locator: string;
  timestamp: number;
}

export class TestContext {
  private steps: StepRecord[] = [];
  testName = '';

  init(name: string) { 
    this.testName = name; 
    this.steps = []; 
  }

  record(name: string, action: string, elementDesc: string, locator: string) {
    this.steps.push({ name, action, elementDesc, locator, timestamp: Date.now() });
  }

  getPrecedingSteps(count = 3): StepRecord[] {
    return this.steps.slice(-count - 1, -1);
  }

  getCurrentStepIndex() { 
    return this.steps.length - 1; 
  }

  getRecentContextString(): string {
      return this.getPrecedingSteps()
        .map(s => `${s.action} on "${s.elementDesc}"`)
        .join(' → ') || 'none';
  }
}
