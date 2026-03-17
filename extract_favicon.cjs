const fs = require('fs');
if (!fs.existsSync('public')) fs.mkdirSync('public');
const content = fs.readFileSync('src/logoBase64.ts', 'utf-8');
const match = content.match(/base64,(.*?)`/s);
if (match) {
  fs.writeFileSync('public/favicon.jpg', Buffer.from(match[1], 'base64'));
  console.log('Favicon created');
} else {
  console.log('Failed to match base64');
}
