import { DefaultTheme, defineConfig } from 'vitepress'
import { getPosts, Post } from './theme/serverUtils'

// 扩展 VitePress 主题配置
interface BlogThemeConfig extends DefaultTheme.Config {
  docsDir: string
  posts: Post[]
  pageSize: number
  postLength: number
  nav: any[]
  socialLinks: any[]
}

const EMAIL_ICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
<path fill="currentColor" d="M3 3h18a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1m9.06 8.683L5.648 6.238L4.353 7.762l7.72 6.555l7.581-6.56l-1.308-1.513z"/>
</svg>`

// https://vitepress.dev/reference/site-config
export default async () => {

  // https://vitepress.dev/reference/default-theme-config
  const themeConfig: BlogThemeConfig = {
    search: { provider: 'local' },
    docsDir: '/',
    posts: await getPosts(),
    pageSize: 10,
    postLength: 10,
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Archives', link: '/archives' }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/liuyax0818', ariaLabel: 'GitHub' },
      { icon: { svg: EMAIL_ICON_SVG }, link: 'mailto:L1803703552@gmail.com', ariaLabel: 'Email' },
    ]
  }

  return defineConfig({
    lang: 'en-US',
    title: "Hikari's home",
    description: "A blog site of Hoshino Hikari",
    head: [
      ['meta', { name: 'author', content: 'Hikari' }],
      ['meta', { property: 'og:title', content: 'Home' }],
      ['meta', { property: 'og:description', content: 'A blog site of Hoshino Hikari' }],
    ],
    lastUpdated: false,
    themeConfig
  })

} 