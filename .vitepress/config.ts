import { defineConfig } from 'vitepress'

const EMAIL_ICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
<path fill="currentColor" d="M3 3h18a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1m9.06 8.683L5.648 6.238L4.353 7.762l7.72 6.555l7.581-6.56l-1.308-1.513z"/>
</svg>`

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'en-US',
  srcDir: "posts",
  title: "Hikari's home",
  description: "A blog site of Chitose Hikari",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],
    search: { provider: 'local' },

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/liuyax0818', ariaLabel: 'GitHub' },
      { icon: { svg: EMAIL_ICON_SVG }, link: 'mailto:L1803703552@gmail.com', ariaLabel: 'Email' },
    ]
  }
})
