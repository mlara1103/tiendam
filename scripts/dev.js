const { spawn } = require('child_process');

const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm';
const processes = [
  spawn(npmCommand, ['run', 'dev', '--prefix', 'server'], { stdio: 'inherit' }),
  spawn(npmCommand, ['run', 'dev', '--prefix', 'client'], { stdio: 'inherit' })
];

function stopAll(signal = 'SIGTERM') {
  for (const child of processes) {
    if (!child.killed) child.kill(signal);
  }
}

process.on('SIGINT', () => {
  stopAll('SIGINT');
  process.exit(0);
});
process.on('SIGTERM', () => {
  stopAll();
  process.exit(0);
});

for (const child of processes) {
  child.on('exit', (code) => {
    if (code && code !== 0) {
      stopAll();
      process.exitCode = code;
    }
  });
}
