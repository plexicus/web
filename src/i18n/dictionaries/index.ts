import flattenYamlObject from '@/lib/flattenObject';


const dictionaries: Record<string, any> = {};
const yamlFiles = import.meta.glob(['./**/*.yml', './**/*.yaml'], { eager: true });

for (const path in yamlFiles) {
  const fileData = yamlFiles[path];
  const sanitizedPath = path.replace(/^\.\/|\/$/g, '');
  const language = sanitizedPath.split('/')[0];
  if (!dictionaries[language]) {
    dictionaries[language] = {};
  }

  // Ensure fileData is an object (in case it's a primitive type)
  if (typeof fileData !== 'object' || fileData === null) {
    // Handle non-object fileData (e.g., primitive or array)
    console.warn(`File ${path} is not a valid object, skipping.`);
    continue;
  }

  dictionaries[language] = {
    ...dictionaries[language],
    ...flattenYamlObject(fileData),
  };

}
export default dictionaries;