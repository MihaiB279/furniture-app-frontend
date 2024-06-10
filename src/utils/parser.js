export function parseDetailsToDisplay(details) {
  const detailsObj = {};
  const entries = details.replace(/^\{|\}$/g, '').split(',');
  entries.forEach(entry => {
    let [key, value] = entry.split(':').map(part => part.trim().replace(/^[\'|]\'|^'|'$/g, ''));
    key = key.charAt(0).toUpperCase() + key.slice(1);
    detailsObj[key] = value;
  });
  return detailsObj;
}
