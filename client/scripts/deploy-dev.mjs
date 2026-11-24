// Deploys the Angular build to dev.awarenessusa.org (S3 + CloudFront).
// Usage: npm run deploy:dev   (from client/)
// Requires: AWS CLI configured (aws configure) with S3 + CloudFront permissions.
import { execSync } from 'node:child_process';

const BUCKET = 'dev.awarenessusa.org';
const DISTRIBUTION_ID = 'E2TTY7CESZLT1J';
const run = (cmd) => { console.log(`\n> ${cmd}`); execSync(cmd, { stdio: 'inherit' }); };

run('npx ng build --configuration production');
run(`aws s3 sync dist/client/browser s3://${BUCKET} --delete`);
run(`aws cloudfront create-invalidation --distribution-id ${DISTRIBUTION_ID} --paths "/*"`);

console.log(`\nDeployed -> https://${BUCKET}`);
