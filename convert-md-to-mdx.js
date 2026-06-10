const fs = require('fs'); // Built-in module to work with the filesystem
const path = require('path'); // Built-in module for working with file paths

// Path to your root directory where the `.md` files are located.
// Replace this with the correct root directory path.
const rootDirectory = '.';

// Function to traverse directories recursively and convert `.md` files
const convertMdToMdx = (dir) => {
  if (!fs.existsSync(dir)) {
    console.error(`Directory "${dir}" does not exist.`);
    return;
  }

  // Read all items (files and folders) in the directory
  fs.readdir(dir, { withFileTypes: true }, (err, items) => {
    if (err) {
      console.error(`Error reading directory "${dir}": ${err.message}`);
      return;
    }

    items.forEach((item) => {
      // Construct the full path of the item
      const itemPath = path.join(dir, item.name);

      // If the item is a directory, call this function recursively
      if (item.isDirectory()) {
        convertMdToMdx(itemPath);
      } else if (item.isFile() && item.name.endsWith('.md')) {
        // If the item is a `.md` file, process it
        fs.readFile(itemPath, 'utf8', (readErr, content) => {
          if (readErr) {
            console.error(`Error reading file "${itemPath}": ${readErr.message}`);
            return;
          }

          // Extract the first title starting with #
          const titleMatch = content.match(/^#\s+(.*)/);
          if (titleMatch) {
            const title = titleMatch[1].trim(); // Get the title text
            const frontmatter = `---\ntitle: ${title}\n---\n`; // Mintlify frontmatter format

            // Replace the first # Heading with the frontmatter
            const newContent = content.replace(/^#\s+.+/, frontmatter);

            // Save the new content to a `.mdx` file (convert extension)
            const newFilePath = itemPath.replace('.md', '.mdx');
            fs.writeFile(newFilePath, newContent, (writeErr) => {
              if (writeErr) {
                console.error(`Error writing file "${newFilePath}": ${writeErr.message}`);
                return;
              }

              console.log(`Converted: "${item.name}" -> "${path.basename(newFilePath)}"`);

              // After successfully creating the .mdx file, delete the original .md file
              fs.unlink(itemPath, (unlinkErr) => {
                if (unlinkErr) {
                  console.error(`Error deleting file "${itemPath}": ${unlinkErr.message}`);
                  return;
                }
                console.log(`Deleted old file: "${item.name}"`);
              });
            });
          } else {
            console.warn(`No title found in file: "${item.name}" (skipped)`);
          }
        });
      }
    });
  });
};

// Start processing from the root directory
convertMdToMdx(rootDirectory);