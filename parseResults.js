const fs = require('fs');
const data = JSON.parse(fs.readFileSync('test-results.json', 'utf8'));
const failures = [];

data.suites.forEach(suite => {
  if (suite.suites) {
    suite.suites.forEach(fileSuite => {
      if (fileSuite.specs) {
        fileSuite.specs.forEach(spec => {
          if (spec.ok === false) {
            let errorMsg = 'No error message';
            if (spec.tests && spec.tests[0] && spec.tests[0].results && spec.tests[0].results[0] && spec.tests[0].results[0].error) {
              errorMsg = spec.tests[0].results[0].error.message;
            }
            if(fileSuite.title) {
                failures.push(`${suite.file} -> ${spec.title}\n  Error: ${errorMsg.substring(0, 500).replace(/\n/g, ' ')}\n`);
            }
            
          }
        });
      }
    });
  }
});

console.log(`Total Expected: ${data.stats.expected}`);
console.log(`Total Unexpected: ${data.stats.unexpected}`);
failures.forEach(f => console.log(f));
