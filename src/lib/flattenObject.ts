export default function flattenYamlObject(obj: any, prefix: string = ''): Record<string, any> {
  let result: Record<string, any> = {};

  if (obj && typeof obj === 'object') {
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const newKey = (key === 'default' && !prefix) ? '' : (prefix ? `${prefix}.${key}` : key);
        const value = obj[key];

        if (Array.isArray(value)) {
          result[newKey] = value;

          value.forEach((item, index) => {
            if (typeof item === 'object' && item !== null) {
              result = {
                ...result,
                ...flattenYamlObject(item, `${newKey}.${index}`),
              };
            } else {
              result[`${newKey}.${index}`] = item;
            }
          });

        } else if (typeof value === 'object' && value !== null) {
          result = { ...result, ...flattenYamlObject(value, newKey) };
        } else {
          result[newKey] = value;
        }
      }
    }
  }

  return result;
}