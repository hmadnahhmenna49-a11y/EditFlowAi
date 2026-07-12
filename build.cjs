process.chdir(__dirname);
const { build } = require('vite');
build()
  .then(r => {
    if (r.errors && r.errors.length) {
      console.error('ERRORS:', JSON.stringify(r.errors));
      process.exit(1);
    }
    console.log('BUILD SUCCESS');
  })
  .catch(e => {
    console.error('BUILD FAILED:', e.message);
    process.exit(1);
  });