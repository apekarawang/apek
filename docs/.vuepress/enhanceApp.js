// import Vuetify from 'vuetify'

import Vuetify from '@vuetify/es5/components/Vuetify'
import VApp from '@vuetify/es5/components/VApp'
import VNavigationDrawer from '@vuetify/es5/components/VNavigationDrawer'
import VToolbar from '@vuetify/es5/components/VToolbar'
import VCard from '@vuetify/es5/components/VCard'
import VGrid from '@vuetify/es5/components/VGrid'
import VList from '@vuetify/es5/components/VList'
import VBtn from '@vuetify/es5/components/VBtn'
import VIcon from '@vuetify/es5/components/VIcon'
import VSnackbar from '@vuetify/es5/components/VSnackbar'
import VDivider from '@vuetify/es5/components/VDivider'
import VMenu from '@vuetify/es5/components/VMenu'
import VImg from '@vuetify/es5/components/VImg';
import VFooter from '@vuetify/es5/components/VFooter'
import transitions from '@vuetify/es5/components/transitions'
import directives from '@vuetify/es5/directives'

import VS2 from 'vue-script2'

export default ({
  Vue, // the version of Vue being used in the VuePress app
  options, // the options for the root Vue instance
  router, // the router instance for the app
  siteData, // site metadata
}) => {
  Vue.use(VS2)
  Vue.use(Vuetify, {
    components: {
      VApp,
      VFooter,
      VToolbar,
      VNavigationDrawer,
      VGrid,
      VCard,
      VImg,
      VList,
      VBtn,
      VIcon,
      VMenu,
      VSnackbar,
      VDivider,
      transitions,
    },
    directives,
  })
}