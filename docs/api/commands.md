# CLI Commands

Yakt provides a simple CLI for compiling your templates.

## Commands

### `compile` / `build` / `render`

Compile a `.ymlx` manifest file to YAML.

**Synopsis:**
```bash
yakt <command> [options] [manifest]
```

**Commands:**
- `compile` - Compile manifest to YAML (default)
- `build` - Alias for compile
- `render` - Alias for compile

**Arguments:**
- `manifest` - Path to the `.ymlx` manifest file (optional, defaults to `examples/yaml/Manifest.ymlx`)

**Examples:**
```bash
# Compile a manifest
yakt compile Manifest.ymlx

# Using build alias
yakt build examples/yaml/Manifest.ymlx

# Using render alias
yakt render my-project/Manifest.ymlx
```

## Options

### `-o, --stdout`

Output YAML to stdout instead of writing to a file.

**Example:**
```bash
yakt compile Manifest.ymlx -o
```

**Use Cases:**
- Piping to other tools: `yakt compile Manifest.ymlx -o | kubectl apply -f -`
- Viewing output: `yakt compile Manifest.ymlx -o | less`
- CI/CD pipelines

### `-h, --help`

Display help information.

**Example:**
```bash
yakt --help
yakt compile --help
```

## Exit Codes

- `0` - Success
- `1` - Error (file not found, compilation error, etc.)

## Examples

```bash
# Basic compilation
yakt compile examples/yaml/Manifest.ymlx

# Output to stdout
yakt compile examples/yaml/Manifest.ymlx -o

# Using different command names
yakt build examples/json/Manifest.ymlx
yakt render my-app/Manifest.ymlx --stdout
```

