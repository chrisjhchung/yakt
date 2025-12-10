# Quick Start

Get up and running with Yakt in minutes.

## Your First Component

Create a simple component file `Service.ymlx`:

```typescript
export default function Service(props: { name: string; port: number }) {
  return {
    apiVersion: "v1",
    kind: "Service",
    metadata: {
      name: props.name
    },
    spec: {
      selector: {
        app: props.name
      },
      ports: [{
        port: props.port,
        targetPort: props.port
      }]
    }
  };
}
```

## Create a Manifest

Create a manifest file `Manifest.ymlx` that uses your component:

```typescript
import Service from "./Service.ymlx";

export default [
  Service({ name: "frontend", port: 3000 }),
  Service({ name: "backend", port: 8080 })
];
```

## Compile to YAML

Run the compile command:

```bash
yakt compile Manifest.ymlx
```

This creates `out/manifest.yaml` with your compiled YAML:

```yaml
apiVersion: v1
kind: Service
metadata:
  name: frontend
spec:
  selector:
    app: frontend
  ports:
    - port: 3000
      targetPort: 3000
---
apiVersion: v1
kind: Service
metadata:
  name: backend
spec:
  selector:
    app: backend
  ports:
    - port: 8080
      targetPort: 8080
```

## Output to Stdout

To output directly to stdout (useful for piping):

```bash
yakt compile Manifest.ymlx -o
```

## Next Steps

- Learn about [Components](/guide/components)
- Explore [Examples](/examples/)
- Check the [API Reference](/api/commands)

