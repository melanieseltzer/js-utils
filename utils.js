// Takes in a filename, replaces spaces with dashes, and
// returns a new name with Date.now() for timestamp
export function renameFile(filename) {
  // Get the base name without the extension
  const baseName = filename.replace(/\s+/g, '-').substring(0, filename.lastIndexOf('.'));

  // Get the file extension
  const ext = filename.substring(filename.lastIndexOf('.') + 1, filename.length);

  // Return the new name as a string
  return `${baseName}-${Date.now()}.${ext}`;
}

// Wait for process to exit before moving on to the next task
// useful with Redux Saga/generators
export function waitForChildProcessToComplete(process) {
  return new Promise((resolve, reject) => {
    process.on('exit', code => {
      if (code === 0) {
        resolve(undefined);
      } else {
        reject(new Error(code));
      }
    });
  });
}