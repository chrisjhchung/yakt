import { defineConfig } from 'vitepress'

// Base path for GitHub Pages - change if your repo name is different
const base = process.env.BASE_PATH || '/yakt/'

export default defineConfig({
  title: 'Yakt',
  description: 'JavaScript-powered YAML templating framework',
  base: base,
  ignoreDeadLinks: [
    /^https?:\/\/localhost/,
    /^http:\/\/localhost:5173/
  ],
  
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
      { text: 'API', link: '/api/' },
      { text: 'Examples', link: '/examples/' }
    ],
    
    sidebar: {
      '/guide/': [
        {
          text: 'Getting Started',
          items: [
            { text: 'Installation', link: '/guide/installation' },
            { text: 'Quick Start', link: '/guide/quick-start' }
          ]
        },
        {
          text: 'Concepts',
          items: [
            { text: 'Components', link: '/guide/components' },
            { text: 'Manifests', link: '/guide/manifests' },
            { text: 'Rendering', link: '/guide/rendering' }
          ]
        }
      ],
      '/api/': [
        {
          text: 'CLI Reference',
          collapsed: false,
          items: [
            { text: 'Commands', link: '/api/commands' },
            { text: 'Options', link: '/api/options' }
          ]
        }
      ],
      '/examples/': [
        {
          text: 'Examples',
          collapsed: false,
          items: [
            { text: 'Basic YAML', link: '/examples/basic-yaml' },
            { text: 'Kubernetes', link: '/examples/kubernetes' },
            { text: 'JSON Output', link: '/examples/json-output' }
          ]
        }
      ]
    },
    
    socialLinks: [
      { icon: 'github', link: 'https://github.com/chrisjhchung/yakt' }
    ],
    
    footer: {
      message: 'Released under the MIT License.',
      copyright: `Copyright © ${new Date().getFullYear()} Yakt Contributors`
    }
  }
})

