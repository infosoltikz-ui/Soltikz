const fs = require('fs');
const path = require('path');

const replacements = {
  'bg-slate-50': 'bg-slate-50 dark:bg-slate-950',
  'bg-white': 'bg-white dark:bg-slate-900',
  'text-slate-900': 'text-slate-900 dark:text-white',
  'text-slate-500': 'text-slate-500 dark:text-slate-400',
  'text-slate-700': 'text-slate-700 dark:text-slate-300',
  'text-slate-800': 'text-slate-800 dark:text-slate-200',
  'border-slate-100': 'border-slate-100 dark:border-slate-800/50',
  'border-slate-200': 'border-slate-200 dark:border-slate-800',
  'border-slate-300': 'border-slate-300 dark:border-slate-700',
  'bg-slate-100': 'bg-slate-100 dark:bg-slate-800',
  'hover:bg-slate-50': 'hover:bg-slate-50 dark:hover:bg-slate-800/50',
  'placeholder-slate-400': 'placeholder-slate-400 dark:placeholder-slate-500',
};

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = dir + '/' + file;
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else { 
      if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk('./src');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;
  
  // We need to be careful not to replace something that already has dark: applied
  // So we only replace if it's not preceded by dark:
  Object.keys(replacements).forEach(key => {
    // Regex explanation:
    // Match the class name `key` with word boundaries,
    // Negative lookbehind `(?<!dark:)` ensures it's not already dark:key
    // Negative lookahead `(?!\s+dark:)` ensures we don't add it if dark: variant is right after
    const regex = new RegExp(`(?<!dark:)\\b${key}\\b(?!\\s+dark:)`, 'g');
    content = content.replace(regex, replacements[key]);
  });

  if (content !== original) {
    fs.writeFileSync(file, content);
    console.log(`Updated ${file}`);
  }
});
