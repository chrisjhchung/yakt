# Kubernetes Example

Generate Kubernetes resources with Yakt.

## Components

### Deployment Component

```typescript
// components/Deployment.ymlx
export default function Deployment(props: {
  name: string;
  image: string;
  replicas: number;
  port: number;
}) {
  return {
    apiVersion: "apps/v1",
    kind: "Deployment",
    metadata: {
      name: props.name
    },
    spec: {
      replicas: props.replicas,
      selector: {
        matchLabels: {
          app: props.name
        }
      },
      template: {
        metadata: {
          labels: {
            app: props.name
          }
        },
        spec: {
          containers: [{
            name: props.name,
            image: props.image,
            ports: [{
              containerPort: props.port
            }]
          }]
        }
      }
    }
  };
}
```

### Service Component

```typescript
// components/Service.ymlx
export default function Service(props: {
  name: string;
  port: number;
}) {
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

## Manifest

```typescript
// Manifest.ymlx
import Deployment from "./components/Deployment.ymlx";
import Service from "./components/Service.ymlx";

export default [
  Deployment({
    name: "web",
    image: "nginx:latest",
    replicas: 3,
    port: 80
  }),
  Service({
    name: "web",
    port: 80
  })
];
```

## Output

```bash
yakt compile Manifest.ymlx
```

Generates a complete Kubernetes manifest with Deployment and Service resources.

