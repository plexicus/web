// Function to flatten a nested YAML object
export default function flattenYamlObject(obj: any, prefix: string = ''): Record<string, any> {
  let result: Record<string, any> = {};
 
  // Ensure that obj is a valid object and not null or undefined
  if (obj && typeof obj === 'object') {
    for (const key in obj) {
      // Use Object.prototype.hasOwnProperty to avoid issues if obj doesn't inherit from Object
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        // If the key is 'default', skip adding the prefix
        const newKey = (key === 'default' && !prefix) ? '' : (prefix ? `${prefix}.${key}` : key);
    
        // If the value is an object, recursively flatten it
        if (typeof obj[key] === 'object' && obj[key] !== null) {
          result = { ...result, ...flattenYamlObject(obj[key], newKey) };
        } else {
          result[newKey] = obj[key];
        }
      }
    }
  }
    
  return result;
}
    