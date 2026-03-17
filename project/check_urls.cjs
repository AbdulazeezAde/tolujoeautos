const https = require('https');

function getRedirect(id) {
  return new Promise((resolve) => {
    https.get(`https://unsplash.com/photos/${id}/download?force=true`, (res) => {
      resolve(res.headers.location);
    });
  });
}

async function main() {
  console.log('URL 1:', await getRedirect('-Pt97OtdYWY'));
  console.log('URL 2:', await getRedirect('7-_W7I8qHNY'));
}
main();
