/**
 * Rename a filename, replacing spaces with dashes, and adding a timestamp
 * @param {String} filename The original filename to rename
 * @returns {String} The formatted filename
*/
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

/**
 * A small function to format bytes into appropriate sizes
 * @param {Number} bytes The number of bytes to format
 * @returns {String} Formatted size
*/
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

/**
 * Recursively check if a multi-nested object contains x key
 * @param {Object} obj The object to check
 * @param {String} key The first key in the object to check
 * @param {Array.<String>} rest The rest of the keys to check, if nested more than 1 level
 * @returns {boolean} Return true if obj contains key, otherwise false
*/
export function checkNestedObj(obj, key, ...rest) {
  if (obj === undefined) return false
  if (rest.length === 0 && obj.hasOwnProperty(key)) return true
  return checkNestedObj(obj[key], ...rest)
}

/**
 * Transform a string into an appropriate url slug
 * @param {String} str The string to transform
*/
export function slugify(str) {
  return str
    // replace forward slash and spaces with dash
    .replace(/\/|\s+/g, '-')
    // replace duplicate dashes with single dash
    .replace(/[\s-]+/g, '-')
    .toLowerCase()
    .trim();
}

/**
 * Capitalize the first letter of a string
 * @param {String} str The string to capitalize
 */
export function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Wrap a number in a unit of measurement
 * @param {Number} num The number to wrap
 * @param {String} unit Optional - the unit of measurement, defaults to `px`
 */
export const withUnit = (num, unit = 'px') => `${num}${unit}`;
