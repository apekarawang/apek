import React from 'react'

import SiteTitle from '@components/SiteTitle.vue'
import ContactPage from '@components/ContactPage.vue'
import { VContainer } from 'vuetify/es5/components/VGrid'
export default ({ entry, getAsset, widgetFor, widgetsFor }) => {
  function _f(f) {
    return entry.getIn(['data', f])
  }
  return (
    <div>
      <SiteTitle title={_f('title')} subtitle={_f('subtitle')} />
      <ContactPage
        email={_f('email')}
        phone={_f('phone')}
        fax={_f('fax')}
        address={_f('address')}
        address2={_f('address2')}
      />
    </div>
  )
}
