import { h } from 'vue'
import Theme from 'vitepress/theme'
import './styles/vars.css'
// import HomeSponsors from './components/HomeSponsors.vue'
// import AsideSponsors from './components/AsideSponsors.vue'
import SvgImage from './components/SvgImage.vue'
import NotFound from './components/NotFound.vue'

export default {
  ...Theme,
  Layout() {
    return h(Theme.Layout, null, {
      // 'home-features-after': () => h(HomeSponsors),
      //   'aside-ads-before': () => h(AsideSponsors),
      'not-found': () => h(NotFound),
    })
  },
  enhanceApp({ app }) {
    app.component('SvgImage', SvgImage)
  },
}
