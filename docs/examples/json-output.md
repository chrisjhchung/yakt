# JSON Output Example

Yakt can generate any YAML structure, including JSON-like configurations.

## Application Config Component

```typescript
// components/AppConfig.ymlx
export default function AppConfig(props: {
  name: string;
  version: string;
  environment: string;
}) {
  return {
    application: {
      name: props.name,
      version: props.version,
      environment: props.environment
    },
    server: {
      host: "0.0.0.0",
      port: 3000
    },
    database: {
      host: process.env.DB_HOST || "localhost",
      port: 5432
    }
  };
}
```

## Manifest

```typescript
// Manifest.ymlx
import AppConfig from "./components/AppConfig.ymlx";

export default [
  AppConfig({
    name: "my-app",
    version: "1.0.0",
    environment: "production"
  })
];
```

## Output

```bash
yakt compile Manifest.ymlx
```

Generates YAML that can be easily converted to JSON if needed:

```yaml
application:
  name: my-app
  version: 1.0.0
  environment: production
server:
  host: 0.0.0.0
  port: 3000
database:
  host: localhost
  port: 5432
```

