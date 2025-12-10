import yaml from "js-yaml";

type ComponentReturn = string | object | Array<string | object>;

export function renderManifest(manifest: ComponentReturn): string {
  const items = Array.isArray(manifest) ? manifest : [manifest];
  const yamlStrings = items.map(renderItem);
  // Join with YAML document separator
  return yamlStrings.join("---\n");
}

function renderItem(item: string | object): string {
  if (typeof item === "string") {
    // parse YAML string to validate & normalize
    const parsed = yaml.load(item);
    return yaml.dump(parsed);
  } else if (typeof item === "object") {
    return yaml.dump(item);
  } else {
    throw new Error("Invalid component return type. Must be string or object.");
  }
}
