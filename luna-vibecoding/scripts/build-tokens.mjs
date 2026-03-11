import fs from 'node:fs';
import path from 'node:path';

const repoRoot = path.resolve(process.cwd());
const inputPath = path.join(repoRoot, 'tokens', 'luna_token.tokens.json');
const outputPath = path.join(repoRoot, 'src', 'app', 'tokens.css');

function toKebab(str) {
  return String(str)
    .replace(/[^a-zA-Z0-9]+/g, '-')
