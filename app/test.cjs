const https = require('https');

function getDirectUrl(id) {
  return new Promise((resolve) => {
    https.get(`https://unsplash.com/photos/${id}/download?force=true`, (res) => {
      resolve(res.headers.location.split('?')[0] + '?auto=format&fit=crop&q=80&w=1200');
    });
  });
}

async function run() {
  console.log(await getDirectUrl('-Pt97OtdYWY'));
  console.log(await getDirectUrl('7-_W7I8qHNY'));
}
run();
