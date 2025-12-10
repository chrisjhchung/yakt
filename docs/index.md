---
layout: home

hero:
  name: "Yakt"
  text: "YAML Templating Framework"
  tagline: Build reusable YAML components with JavaScript, just like React for HTML
  actions:
    - theme: brand
      text: Get Started
      link: /guide/installation
    - theme: alt
      text: View on GitHub
      link: https://github.com/chrisjhchung/yakt

features:
  - title: Component-Based
    details: Create reusable YAML components with props, just like React components
  - title: TypeScript Support
    details: Write your templates in TypeScript with full type safety
  - title: Simple CLI
    details: Compile your templates to YAML with a single command
  - title: Flexible Output
    details: Output to files or stdout, perfect for CI/CD pipelines
---

## Quick Example

```typescript
// Service.ymlx
export default function Service(props: { name: string }) {
  return {
    apiVersion: "v1",
    kind: "Service",
    metadata: { name: props.name },
    spec: { selector: { app: props.name }, ports: [{ port: 80 }] }
  };
}
```

```typescript
// Manifest.ymlx
import Service from "./components/Service.ymlx";

export default [
  Service({ name: "my-app" }),
  Service({ name: "my-api" })
];
```

```bash
yakt compile Manifest.ymlx
```

Outputs clean, maintainable YAML files ready for deployment.

