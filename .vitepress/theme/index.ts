// https://vitepress.dev/guide/custom-theme
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'

import MyLayout from './components/MyLayout.vue'
import AboutMe from './components/AboutMe.vue'
import Archives from './components/Archives.vue'

import 'lxgw-wenkai-lite-webfont/style.css'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout: MyLayout,
  enhanceApp({ app, router, siteData }) {
    app.component('AboutMe', AboutMe)
    app.component('Archives', Archives)
    // ...
  }
} satisfies Theme
