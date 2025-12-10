# Basic YAML Example

A simple example showing how to generate basic YAML with Yakt.

## Simple ConfigMap

Create a component that generates a ConfigMap:

```typescript
// ConfigMap.ymlx
export default function ConfigMap(props: {
  name: string;
  data: Record<string, string>;
}) {
  return {
    apiVersion: "v1",
    kind: "ConfigMap",
    metadata: {
      name: props.name
    },
    data: props.data
  };
}
```

## Manifest

```typescript
// Manifest.ymlx
import ConfigMap from "./ConfigMap.ymlx";

export default [
  ConfigMap({
    name: "app-config",
    data: {
      environment: "production",
      logLevel: "info"
    }
  })
];
```

## Output

```bash
yakt compile Manifest.ymlx
```

Generates:

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
data:
  environment: production
  logLevel: info
```

