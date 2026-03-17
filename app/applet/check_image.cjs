const https = require('https');

https.get('https://images.unsplash.com/photo-1680843274944-40433b411e2b?auto=format&fit=crop&q=80&w=1200', (res) => {
  console.log('Status:', res.statusCode);
  console.log('Headers:', res.headers);
});
