<div align="center">

# Yakt

**JavaScript-powered YAML templating framework**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub release](https://img.shields.io/github/release/YOUR_USERNAME/yakt.svg)](https://github.com/YOUR_USERNAME/yakt/releases)

*Build reusable YAML components with JavaScript, just like React for HTML*

[Documentation](https://YOUR_USERNAME.github.io/yakt/) • [Examples](./docs/examples/) • [Installation](#installation)

</div>

---

## ✨ Features

- 🧩 **Component-Based** - Create reusable YAML components with props, just like React components
- 📘 **TypeScript Support** - Write your templates in TypeScript with full type safety
- 🚀 **Simple CLI** - Compile your templates to YAML with a single command
- 🔄 **Flexible Output** - Output to files or stdout, perfect for CI/CD pipelines
- ⚡ **Fast** - Lightweight and fast compilation

## 🚀 Quick Start

### Installation

**From Pre-built Binaries:**

Download the latest release for your platform from the [Releases](https://github.com/YOUR_USERNAME/yakt/releases) page.

```bash
# Linux/macOS
wget https://github.com/YOUR_USERNAME/yakt/releases/download/v0.0.1/yakt-linux-x64
chmod +x yakt-linux-x64
sudo mv yakt-linux-x64 /usr/local/bin/yakt

# Or from source
git clone https://github.com/YOUR_USERNAME/yakt.git
cd yakt
npm install && npm run build
npm link
```

### Your First Component

Create a component file `Service.ymlx`:

```typescript
export default function Service(props: { name: string; port: number }) {
  return {
    apiVersion: "v1",
    kind: "Service",
    metadata: { name: props.name },
    spec: {
      selector: { app: props.name },
      ports: [{ port: props.port }]
    }
  };
}
```

Create a manifest `Manifest.ymlx`:

```typescript
import Service from "./Service.ymlx";

export default [
  Service({ name: "frontend", port: 3000 }),
  Service({ name: "backend", port: 8080 })
];
```

Compile to YAML:

```bash
yakt compile Manifest.ymlx
```

Outputs clean YAML to `out/manifest.yaml`:

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
```

## 📖 Documentation

Full documentation is available at [docs/](./docs/) or visit the [online docs](https://YOUR_USERNAME.github.io/yakt/).

- [Installation Guide](./docs/guide/installation.md)
- [Quick Start](./docs/guide/quick-start.md)
- [Components](./docs/guide/components.md)
- [API Reference](./docs/api/commands.md)
- [Examples](./docs/examples/)

## 💻 Usage

### Basic Commands

```bash
# Compile a manifest
yakt compile Manifest.ymlx

# Output to stdout
yakt compile Manifest.ymlx -o

# Alternative command names
yakt build Manifest.ymlx
yakt render Manifest.ymlx --stdout
```

### CLI Options

- `-o, --stdout` - Output to stdout instead of file
- `-h, --help` - Show help information

See the [CLI Reference](./docs/api/commands.md) for complete documentation.

## 📁 Project Structure

```
yakt/
├── src/              # TypeScript source
│   ├── cli.ts        # CLI entry point
│   └── compiler/    # Compiler logic
├── dist/             # Compiled JavaScript
├── examples/         # Example projects
│   ├── yaml/         # YAML examples
│   └── json/         # JSON examples
├── docs/             # Documentation site
└── bin/              # Built binaries (after packaging)
```

## 🛠️ Development

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/yakt.git
cd yakt

# Install dependencies
npm install

# Build
npm run build

# Test
npm test

# Run docs locally
cd docs
npm install
npm run dev
```

## 📝 Examples

Check out the [examples directory](./examples/) for more examples:

- [Basic YAML](./docs/examples/basic-yaml.md)
- [Kubernetes Resources](./docs/examples/kubernetes.md)
- [JSON Configuration](./docs/examples/json-output.md)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by React's component model
- Built with TypeScript and Node.js

---

<div align="center">

Made with ❤️ by the Yakt contributors

[Report Bug](https://github.com/YOUR_USERNAME/yakt/issues) • [Request Feature](https://github.com/YOUR_USERNAME/yakt/issues) • [Documentation](https://YOUR_USERNAME.github.io/yakt/)

</div>
