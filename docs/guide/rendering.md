# Rendering

Yakt compiles your components and manifests into clean YAML output.

## Output Format

Yakt generates YAML files with multiple documents separated by `---`:

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: config1
---
apiVersion: v1
kind: ConfigMap
metadata:
  name: config2
```

## File Output

By default, Yakt writes to `out/manifest.yaml`:

```bash
yakt compile Manifest.ymlx
# Creates: out/manifest.yaml
```

## Stdout Output

Use the `-o` or `--stdout` flag to output to stdout:

```bash
yakt compile Manifest.ymlx -o
```

This is useful for piping to other tools:

```bash
yakt compile Manifest.ymlx -o | kubectl apply -f -
```

## YAML Normalization

Yakt automatically normalizes YAML output:

- Consistent indentation
- Proper formatting
- Valid YAML syntax

Both object returns and YAML string returns are normalized.

## Multiple Documents

When your manifest returns an array, each item becomes a separate YAML document:

```typescript
export default [
  { kind: "Service", metadata: { name: "svc1" } },
  { kind: "Service", metadata: { name: "svc2" } }
];
```

Results in:

```yaml
kind: Service
metadata:
  name: svc1
---
kind: Service
metadata:
  name: svc2
```

