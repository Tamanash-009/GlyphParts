import * as fs from 'fs';
import * as path from 'path';

function processDir(dir: string) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.tsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      content = content.replace(/hover:bg-zinc-100/g, 'hover:bg-[#FFFFFF]');
      content = content.replace(/(?<!dark|hover):bg-zinc-100/g, 'bg-[#F5F5F5]'); // Be careful not to replace hover! 
      content = content.replace(/ bg-zinc-100/g, ' bg-[#F5F5F5]');
      content = content.replace(/bg-zinc-200/g, 'bg-[#E5E5E5]');
      content = content.replace(/text-\[\#525252\] font-light/g, 'text-[#404040]');

      fs.writeFileSync(fullPath, content);
    }
  }
}

processDir(path.join(process.cwd(), 'src'));
console.log('Update 2 done');
