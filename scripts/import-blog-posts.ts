import { readFileSync, writeFileSync, readdirSync, mkdirSync, copyFileSync, existsSync } from 'fs';
import { join, basename } from 'path';

const BACKUP_DIR = '/Users/garrytrinder/repos/blog-backup';
const BLOG_DIR = join(process.cwd(), 'src/content/blog');
const IMAGES_SRC = join(BACKUP_DIR, 'images');
const IMAGES_DEST = join(process.cwd(), 'public/blog/images');

// Ensure output directories exist
mkdirSync(BLOG_DIR, { recursive: true });
mkdirSync(IMAGES_DEST, { recursive: true });

// Parse metadata from the blockquote header
function parseMetadata(content: string) {
  const lines = content.split('\n');

  // Title is the first # heading
  const titleLine = lines.find(l => l.startsWith('# '));
  const title = titleLine?.replace(/^#\s+/, '').trim() ?? 'Untitled';

  // Find the blockquote section with Authors, Published, Source
  let authors = 'Dev Proxy Team';
  let published = '';
  let source = '';

  for (const line of lines) {
    const authorMatch = line.match(/\*\*Authors?:\*\*\s*(.+)/);
    if (authorMatch) authors = authorMatch[1].trim();

    const dateMatch = line.match(/\*\*Published:\*\*\s*(.+)/);
    if (dateMatch) published = dateMatch[1].trim();

    const sourceMatch = line.match(/\*\*Source:\*\*\s*(.+)/);
    if (sourceMatch) source = sourceMatch[1].trim();
  }

  // Convert date string to YYYY-MM-DD
  const date = new Date(published);
  const dateStr = date.toISOString().split('T')[0];

  return { title, authors, date: dateStr, source };
}

// Extract first meaningful paragraph as description
function extractDescription(body: string): string {
  const lines = body.split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    // Skip empty lines, headings, images, blockquotes, lists, bold-only lines
    if (!trimmed) continue;
    if (trimmed.startsWith('#')) continue;
    if (trimmed.startsWith('![')) continue;
    if (trimmed.startsWith('>')) continue;
    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) continue;
    if (trimmed.startsWith('**In this version:**')) continue;
    if (trimmed.match(/^\*\*[^*]+\*\*$/)) continue;

    // Use this line as description, strip markdown formatting
    let desc = trimmed
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // strip links
      .replace(/\*\*/g, '') // strip bold
      .replace(/\*/g, '') // strip italic
      .replace(/`([^`]+)`/g, '$1'); // strip inline code

    // Truncate to ~160 chars at word boundary
    if (desc.length > 160) {
      desc = desc.substring(0, 157).replace(/\s+\S*$/, '') + '...';
    }
    return desc;
  }
  return 'A blog post from the Dev Proxy team.';
}

// Strip the title and metadata blockquote, return clean body
function stripHeader(content: string): string {
  const lines = content.split('\n');
  let i = 0;

  // Skip leading empty lines
  while (i < lines.length && !lines[i].trim()) i++;

  // Skip the # title line
  if (i < lines.length && lines[i].startsWith('# ')) i++;

  // Skip empty lines after title
  while (i < lines.length && !lines[i].trim()) i++;

  // Skip the blockquote metadata (lines starting with >)
  while (i < lines.length && lines[i].startsWith('>')) i++;

  // Skip trailing empty lines after blockquote
  while (i < lines.length && !lines[i].trim()) i++;

  return lines.slice(i).join('\n').trim();
}

// Determine tags based on filename and content
function determineTags(filename: string, _content: string): string[] {
  if (filename.match(/dev-proxy-v\d/)) return ['release'];
  if (filename.includes('building-custom-copilots')) return ['tutorial'];
  if (filename.includes('simulate-handling')) return ['tutorial'];
  return ['announcement'];
}

// Track all referenced images
const referencedImages = new Set<string>();

// Fix image paths: ./images/foo.png -> /web/blog/images/foo.png
function fixImagePaths(body: string): string {
  return body.replace(/!\[([^\]]*)\]\(\.?\/?images\/([^)]+)\)/g, (_match, alt, filename) => {
    referencedImages.add(filename);
    return `![${alt}](/blog/images/${filename})`;
  });
}

// Process all markdown files
const files = readdirSync(BACKUP_DIR).filter(f => f.endsWith('.md'));
console.log(`Found ${files.length} blog post(s) to import`);

let imported = 0;

for (const file of files) {
  const filepath = join(BACKUP_DIR, file);
  const raw = readFileSync(filepath, 'utf-8');

  const meta = parseMetadata(raw);
  const body = stripHeader(raw);
  const description = extractDescription(body);
  const tags = determineTags(file, raw);
  const fixedBody = fixImagePaths(body);

  // Escape any quotes in title/description
  const safeTitle = meta.title.replace(/"/g, '\\"');
  const safeDesc = description.replace(/"/g, '\\"');

  const frontmatter = `---
title: "${safeTitle}"
description: "${safeDesc}"
date: ${meta.date}
author: "${meta.authors}"
tags: [${tags.map(t => `"${t}"`).join(', ')}]
---`;

  const output = `${frontmatter}\n\n${fixedBody}\n`;
  const outPath = join(BLOG_DIR, file);

  writeFileSync(outPath, output, 'utf-8');
  imported++;
  console.log(`  ✓ ${file} (${meta.date})`);
}

// Copy referenced images
console.log(`\nCopying ${referencedImages.size} referenced image(s)...`);
let copied = 0;
for (const img of referencedImages) {
  const src = join(IMAGES_SRC, img);
  const dest = join(IMAGES_DEST, img);
  if (existsSync(src)) {
    copyFileSync(src, dest);
    copied++;
  } else {
    console.warn(`  ⚠ Missing image: ${img}`);
  }
}

console.log(`\nDone! Imported ${imported} post(s), copied ${copied} image(s).`);
