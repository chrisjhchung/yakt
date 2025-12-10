# Installation

Yakt can be installed in several ways depending on your needs.

## From Pre-built Binaries

Download the pre-built binary for your platform from the [GitHub Releases](https://github.com/chrisjhchung/yakt/releases) page.

### Linux

```bash
# Download
wget https://github.com/chrisjhchung/yakt/releases/download/v0.0.1/yakt-linux-x64

# Make executable
chmod +x yakt-linux-x64

# Install to system path
sudo mv yakt-linux-x64 /usr/local/bin/yakt
```

### macOS

```bash
# Download
wget https://github.com/chrisjhchung/yakt/releases/download/v0.0.1/yakt-macos-x64

# Make executable
chmod +x yakt-macos-x64

# Install to system path
sudo mv yakt-macos-x64 /usr/local/bin/yakt
```

For Apple Silicon (M1/M2), use `yakt-macos-arm64` instead.

### Windows

1. Download `yakt-win-x64.exe` from the releases page
2. Add the directory containing the executable to your PATH
3. Rename to `yakt.exe` (optional)

## From Source

If you want to build from source or contribute:

```bash
# Clone the repository
git clone https://github.com/chrisjhchung/yakt.git
cd yakt

# Install dependencies
npm install

# Build
npm run build

# Link globally (optional)
npm link
```

## Verify Installation

After installation, verify it works:

```bash
yakt --help
```

You should see the help output with available commands.

