import VueMDCIcon from 'vue-mdc-adapter/dist/icon'
import VueMDCTypography from 'vue-mdc-adapter/dist/typography'

// import 'vue-mdc-adapter/dist/icon/icon.css'  

export default ({
    Vue, // the version of Vue being used in the VuePress app
    options, // the options for the root Vue instance
    router, // the router instance for the app
    siteData // site metadata
  }) => {
    Vue.use(VueMDCIcon)
    Vue.mixin(VueMDCTypography)
  }