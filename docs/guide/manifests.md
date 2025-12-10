# Manifests

Manifests are the entry points for Yakt compilation. They define what gets generated.

## Basic Manifest

A manifest is a `.ymlx` file that exports a default value:

```typescript
export default {
  apiVersion: "v1",
  kind: "Pod",
  metadata: { name: "my-pod" }
};
```

## Array Manifests

Return an array to generate multiple YAML documents:

```typescript
export default [
  { apiVersion: "v1", kind: "ConfigMap", metadata: { name: "config1" } },
  { apiVersion: "v1", kind: "ConfigMap", metadata: { name: "config2" } }
];
```

## Function Manifests

Manifests can be functions that return values:

```typescript
export default function generateManifest() {
  const environments = ["dev", "staging", "prod"];
  
  return environments.map(env => ({
    apiVersion: "v1",
    kind: "Namespace",
    metadata: { name: env }
  }));
}
```

## Using Components

The most common pattern is to import and use components:

```typescript
import Service from "./components/Service.ymlx";
import Deployment from "./components/Deployment.ymlx";

export default [
  Service({ name: "api", port: 8080 }),
  Deployment({ name: "api", image: "myapp:latest", replicas: 3 })
];
```

## Output Location

When you compile a manifest:

```bash
yakt compile Manifest.ymlx
```

The output is written to `out/manifest.yaml` relative to the manifest file's directory.

For example:
- `project/Manifest.ymlx` → `project/out/manifest.yaml`
- `examples/yaml/Manifest.ymlx` → `examples/yaml/out/manifest.yaml`

