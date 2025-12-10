# CLI Options

Detailed reference for all Yakt CLI options.

## Global Options

### `-h, --help`

Display help information and exit.

```bash
yakt --help
```

Shows:
- Available commands
- Usage examples
- Option descriptions

## Command Options

### `-o, --stdout`

Output compiled YAML to stdout instead of writing to a file.

**Default:** `false` (writes to `out/manifest.yaml`)

**Example:**
```bash
# Write to file (default)
yakt compile Manifest.ymlx

# Output to stdout
yakt compile Manifest.ymlx -o
yakt compile Manifest.ymlx --stdout
```

**Use Cases:**
- Piping to other commands
- Viewing output without creating files
- CI/CD integration

## Environment Variables

Currently, Yakt doesn't use any environment variables. All configuration is done through command-line arguments.

## Configuration Files

Yakt doesn't use configuration files. All settings are specified via command-line arguments.

