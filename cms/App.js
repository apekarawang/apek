import './app.styl'
import React from 'react'
import Vue from 'vue'
import Vuetify from '@vuetify/es5/components/Vuetify'
import Toolbar from './Toolbar.vue'

import VApp from 'vuetify/es5/components/VApp'
Vue.use(Vuetify)

export default () => (
  <main>
    <VApp>
      <Toolbar />
    </VApp>
    <h1>Hello</h1>
  </main>
)
