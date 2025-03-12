const fs = require('fs');
const path = require('path');

const CODE_EXAMPLE_MAPPING_FILE = 'src/code-examples-content.js';
const VALID_DOCUMENT_EXTENSIONS = ['.md', '.mdx'];
const CODE_EXAMPLE_PATH_REGEX = /<(?:(?:CodeExample)|(?:CliInvocationExample))\s+[^>]*path=["']([^"']+)["'][^>]*>/g;

/**
 * Returns a list of file paths for a given `dir`.
 */
function getAllDocuments(dir) {
  let results = [];
  const list = fs.readdirSync(dir);

  list.forEach((file) => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllDocuments(file)); // Recurse into subdirectory
    } else {
      if (VALID_DOCUMENT_EXTENSIONS.indexOf(path.extname(file)) !== -1) {
        results.push(file); // Add file to results
      }
    }
  });

  return results;
}

/**
 * Extracts all `regex` group `1` matches found in a list of `files`.
 */
function getUniqueRegexMatches(files, regex) {
  const matches = new Set();

  files.forEach((file) => {
    const content = fs.readFileSync(file, 'utf-8');
    let foundMatches;
    while ((foundMatches = regex.exec(content)) !== null) {
      matches.add(foundMatches[1]); // Extract group 1
    }
  });

  return Array.from(matches);
}

/**
 * Helper function to create a `raw-loader` import from a `path`.
 */
function pathToImport(path) {
  return `import('!!raw-loader!/../examples/${path}')`;
}

const files = getAllDocuments('docs');

const uniqueMatches = getUniqueRegexMatches(files, CODE_EXAMPLE_PATH_REGEX);

const _module = `
/// THIS FILE IS AUTOMATICALLY GENERATED BY \`yarn generate-code-imports\` DO NOT MODIFY ///
    //
export const CODE_EXAMPLE_PATH_MAPPINGS = \{
  ${uniqueMatches.map((path) => `  '${path}': () => ${pathToImport(path)},`).join('\n')}
\};

/// THIS FILE IS AUTOMATICALLY GENERATED BY \`yarn generate-code-imports\` DO NOT MODIFY ///
`;

fs.writeFile(CODE_EXAMPLE_MAPPING_FILE, _module, (err) => {
  if (err) throw err;
  console.log(`Generated ${uniqueMatches.length} code references in ${CODE_EXAMPLE_MAPPING_FILE}.`);
});
