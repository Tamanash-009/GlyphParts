import * as fs from 'fs';
import * as path from 'path';

const REPLACEMENTS: [string | RegExp, string][] = [
  // Typography
  [/[ ]*text-black dark:text-white/g, ' text-[#111111] dark:text-white'],
  [/text-zinc-500 font-light/g, 'text-[#525252] font-light'],
  [/text-zinc-500 leading-relaxed/g, 'text-[#525252] leading-relaxed'],
  [/text-zinc-500 mt-1/g, 'text-[#525252] mt-1'],
  [/text-zinc-500 dark:text-zinc-400/g, 'text-[#525252] dark:text-zinc-400'],
  [/text-zinc-600 dark:text-zinc-400/g, 'text-[#404040] dark:text-zinc-400'],
  [/text-zinc-500/g, 'text-[#525252]'], // catchall 1
  [/text-zinc-400/g, 'text-[#737373]'], // catchall 2 (might hit dark mode so be careful, but we'll try to just catch most of these)
  
  // Backgrounds
  [/bg-zinc-50 dark:bg-\[#111\]/g, 'bg-[#F5F5F5] dark:bg-[#111]'],
  [/bg-white dark:bg-black/g, 'bg-white dark:bg-[#111]'], // card inner ring
  [/bg-zinc-100 dark:bg-\[#111\]/g, 'bg-[#F5F5F5] dark:bg-[#111]'],
  [/bg-\[#FAFAFA\]\/70 dark:bg-black\/70/g, 'bg-[rgba(255,255,255,0.8)] dark:bg-black/70'],

  // Borders
  [/border-black\/5 dark:border-white\/5/g, 'border-[#E5E5E5] dark:border-white/5'],
  [/border-black\/5 dark:border-white\/10/g, 'border-[#E5E5E5] dark:border-white/10'],

  // Hover
  [/hover:text-black dark:hover:text-white/g, 'hover:text-[#111111] dark:hover:text-white'],
  [/hover:bg-zinc-100 dark:hover:bg-\[#161616\]/g, 'hover:bg-white dark:hover:bg-[#161616]'],

  // Layout globals
  [/bg-\[#FAFAFA\] dark:bg-black/g, 'bg-[#FAFAFA] dark:bg-[#000000]'],
  [/text-black dark:text-white/g, 'text-[#111111] dark:text-white'],
];

function processDir(dir: string) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.tsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // We will do a safe replacement
      content = content.replace(/text-black dark:text-white/g, 'text-[#111111] dark:text-white');
      content = content.replace(/bg-zinc-50 dark:bg-\[#111\]/g, 'bg-[#F5F5F5] dark:bg-[#111]');
      content = content.replace(/border-black\/5 dark:border-white\/5/g, 'border-[#E5E5E5] dark:border-white/5');
      content = content.replace(/border-black\/5 dark:border-white\/10/g, 'border-[#E5E5E5] dark:border-white/10');
      content = content.replace(/bg-\[#FAFAFA\]\/70/g, 'bg-[rgba(255,255,255,0.8)]');
      content = content.replace(/text-zinc-500 dark:text-zinc-400/g, 'text-[#525252] dark:text-[#A1A1AA]');
      content = content.replace(/text-zinc-600 dark:text-zinc-400/g, 'text-[#404040] dark:text-[#A1A1AA]');
      content = content.replace(/hover:text-black dark:hover:text-white/g, 'hover:text-[#111111] dark:hover:text-white');
      content = content.replace(/bg-white dark:bg-\[#050505\]/g, 'bg-white dark:bg-[#050505]');
      content = content.replace(/bg-white dark:bg-black/g, 'bg-white dark:bg-[#111111]');
      content = content.replace(/bg-black text-white dark:bg-white dark:text-black/g, 'bg-[#111111] text-white dark:bg-white dark:text-[#111111]');

      // Raw specific colors safely (using word boundaries to avoid overriding dark mode)
      content = content.replace(/(?<!dark:)text-zinc-500/g, 'text-[#525252]');
      content = content.replace(/(?<!dark:)text-zinc-600/g, 'text-[#404040]');
      content = content.replace(/(?<!dark:)text-zinc-400/g, 'text-[#737373]');
      content = content.replace(/(?<!dark:)text-black/g, 'text-[#111111]');
      content = content.replace(/(?<!dark:)bg-zinc-50\b/g, 'bg-[#F5F5F5]');
      content = content.replace(/(?<!dark:)bg-white/g, 'bg-white');
      content = content.replace(/(?<!dark:)border-black\/5/g, 'border-[#E5E5E5]');
      
      content = content.replace(/placeholder:text-zinc-400/g, 'placeholder:text-[#8A8A8A]');
      content = content.replace(/text-zinc-400 shrink-0/g, 'text-[#737373] shrink-0');
      
      // Specifically Layout body setup
      content = content.replace(/document.body.style.color = theme === 'dark' \? '#ffffff' : '#000000';/g, "document.body.style.color = theme === 'dark' ? '#ffffff' : '#2A2A2A';");

      fs.writeFileSync(fullPath, content);
    }
  }
}

processDir(path.join(process.cwd(), 'src'));
console.log('Update done');
