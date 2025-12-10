# Components

Components are the building blocks of Yakt. They're reusable functions that return YAML objects or strings.

## Basic Component

A component is a default export from a `.ymlx` file:

```typescript
export default function MyComponent(props: { name: string }) {
  return {
    apiVersion: "v1",
    kind: "ConfigMap",
    metadata: { name: props.name }
  };
}
```

## Component Props

Components receive props as function parameters:

```typescript
export default function Deployment(props: {
  name: string;
  image: string;
  replicas: number;
}) {
  return {
    apiVersion: "apps/v1",
    kind: "Deployment",
    metadata: { name: props.name },
    spec: {
      replicas: props.replicas,
      template: {
        spec: {
          containers: [{
            name: props.name,
            image: props.image
          }]
        }
      }
    }
  };
}
```

## Using Components

Import and use components in your manifests:

```typescript
import Deployment from "./components/Deployment.ymlx";

export default [
  Deployment({
    name: "web",
    image: "nginx:latest",
    replicas: 3
  })
];
```

## Returning YAML Strings

Components can also return YAML strings directly:

```typescript
export default function ConfigMap(props: { name: string; data: Record<string, string> }) {
  return `
apiVersion: v1
kind: ConfigMap
metadata:
  name: ${props.name}
data:
${Object.entries(props.data).map(([k, v]) => `  ${k}: ${v}`).join('\n')}
  `;
}
```

## Returning Arrays

Components can return arrays to generate multiple resources:

```typescript
export default function MultiService(props: { names: string[] }) {
  return props.names.map(name => ({
    apiVersion: "v1",
    kind: "Service",
    metadata: { name },
    spec: { selector: { app: name } }
  }));
}
```

## Nested Components

Components can use other components:

```typescript
import Service from "./Service.ymlx";
import ConfigMap from "./ConfigMap.ymlx";

export default function App(props: { name: string }) {
  return [
    Service({ name: props.name }),
    ConfigMap({
      name: `${props.name}-config`,
      data: { app: props.name }
    })
  ];
}
```

