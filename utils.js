// Takes in a filename, replaces spaces with dashes, and
// returns a new name with Date.now() for timestamp
export function renameFile(filename) {
  // Get the base name without the extension
  const baseName = filename
    .replace(/\s+/g, '-')
    .substring(0, filename.lastIndexOf('.'));

  // Get the file extension
  const ext = filename.substring(
    filename.lastIndexOf('.') + 1,
    filename.length
  );

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

// A small function to format bytes into appropriate sizes
export function bytesToSize(bytes) {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

  // If no number was passed or it's 0 in then return empty
  if (bytes === 0 || bytes === undefined) return '';

  // Get i to use when selecting from size array
  // will be 0, 1, 2, 3, 4 and so on depending on size of bytes
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);

  // If it's just bytes then no further conversion is required
  if (i === 0) return `(${bytes} ${sizes[i]})`;

  // Otherwise calculate using i to select from sizes array
  // toFixed(0) removes the decimal and rounds up
  return `(${(bytes / 1024 ** i).toFixed(0)} ${sizes[i]})`;
}
