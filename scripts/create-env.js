const fs = require('fs');
const path = require('path');

const examplePath = path.join(__dirname, '..', 'server', '.env.example');
const envPath = path.join(__dirname, '..', 'server', '.env');

if (!fs.existsSync(envPath)) {
  fs.copyFileSync(examplePath, envPath);
  console.log('Se creó server/.env desde server/.env.example');
} else {
  console.log('server/.env ya existe; no se modificó.');
}

console.log('\nConfiguración lista. Revisa MONGO_URI en server/.env y ejecuta:');
console.log('  npm run seed   (opcional)');
console.log('  npm run dev');
