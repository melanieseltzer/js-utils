// Rename file to strip spaces and use Date.now method for timestamp
export const renameFile = filename => {
  const baseName = filename.substring(0, filename.lastIndexOf('.'));
  const ext = filename.substring(filename.lastIndexOf('.') + 1, filename.length);

  return `${baseName}-${Date.now()}.${ext}`.replace(/\s+/g, '-');
}
