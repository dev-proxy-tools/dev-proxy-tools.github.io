import { execSync } from 'node:child_process';
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { stringify } from 'node:querystring';

const REPO = 'https://github.com/pnp/proxy-samples.git';
const CLONE_DIR = '.proxy-samples';
const OUTPUT_DIR = 'src/content/samples';
const RAW_BASE = 'https://raw.githubusercontent.com/pnp/proxy-samples/main/samples';

console.log('Fetching samples from pnp/proxy-samples...');

// Clean up previous runs
if (existsSync(CLONE_DIR)) {
  rmSync(CLONE_DIR, { recursive: true });
}
if (existsSync(OUTPUT_DIR)) {
  rmSync(OUTPUT_DIR, { recursive: true });
}
mkdirSync(OUTPUT_DIR, { recursive: true });

// Shallow clone with sparse checkout — only grab the samples directory
execSync(`git clone --depth 1 --filter=blob:none --sparse ${REPO} ${CLONE_DIR}`, { stdio: 'pipe' });
execSync('git sparse-checkout set samples', { cwd: CLONE_DIR, stdio: 'pipe' });

const samplesDir = join(CLONE_DIR, 'samples');
if (!existsSync(samplesDir)) {
  console.error('No samples directory found');
  process.exit(1);
}

function escapeYamlString(value: string): string {
  if (/[:#{}[\],&*?|>!%@`"']/.test(value) || value.includes('\n')) {
    return JSON.stringify(value);
  }
  return value;
}

function toYamlFrontmatter(obj: Record<string, unknown>, indent = 0): string {
  const pad = '  '.repeat(indent);
  let yaml = '';

  for (const [key, value] of Object.entries(obj)) {
    if (value === null || value === undefined) continue;

    if (Array.isArray(value)) {
      if (value.length === 0) {
        yaml += `${pad}${key}: []\n`;
      } else if (typeof value[0] === 'object') {
        yaml += `${pad}${key}:\n`;
        for (const item of value) {
          const entries = Object.entries(item as Record<string, unknown>);
          yaml += `${pad}  - ${entries[0][0]}: ${escapeYamlString(String(entries[0][1]))}\n`;
          for (const [k, v] of entries.slice(1)) {
            yaml += `${pad}    ${k}: ${escapeYamlString(String(v))}\n`;
          }
        }
      } else {
        yaml += `${pad}${key}:\n`;
        for (const item of value) {
          yaml += `${pad}  - ${escapeYamlString(String(item))}\n`;
        }
      }
    } else if (typeof value === 'object') {
      yaml += `${pad}${key}:\n`;
      yaml += toYamlFrontmatter(value as Record<string, unknown>, indent + 1);
    } else {
      yaml += `${pad}${key}: ${escapeYamlString(String(value))}\n`;
    }
  }

  return yaml;
}

function rewriteImagePaths(markdown: string, sampleDir: string): string {
  // Rewrite relative image paths to raw GitHub URLs
  // Matches ![alt](relative/path) but not ![alt](https://...)
  return markdown.replace(
    /!\[([^\]]*)\]\((?!https?:\/\/)([^)]+)\)/g,
    (_, alt, path) => `![${alt}](${RAW_BASE}/${sampleDir}/${path})`
  );
}

const dirs = readdirSync(samplesDir, { withFileTypes: true }).filter(d => d.isDirectory());
let count = 0;

for (const dir of dirs) {
  const sampleJsonPath = join(samplesDir, dir.name, 'assets', 'sample.json');
  if (!existsSync(sampleJsonPath)) continue;

  try {
    const raw = readFileSync(sampleJsonPath, 'utf-8');
    const parsed = JSON.parse(raw);
    const sample = Array.isArray(parsed) ? parsed[0] : parsed;

    // Read README.md if it exists
    const readmePath = join(samplesDir, dir.name, 'README.md');
    let readmeContent = '';
    if (existsSync(readmePath)) {
      readmeContent = readFileSync(readmePath, 'utf-8');
      readmeContent = rewriteImagePaths(readmeContent, dir.name);
    }

    // Write as a markdown file with YAML frontmatter
    const frontmatter = toYamlFrontmatter(sample);
    const outPath = join(OUTPUT_DIR, `${dir.name}.md`);
    writeFileSync(outPath, `---\n${frontmatter}---\n\n${readmeContent}`);
    count++;
  } catch (err) {
    console.warn(`Skipping ${dir.name}: ${err}`);
  }
}

// Clean up clone
rmSync(CLONE_DIR, { recursive: true });

console.log(`Fetched ${count} samples into ${OUTPUT_DIR}`);
