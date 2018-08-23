import React from 'react'

import SiteTitle from "@components/SiteTitle.vue";
import { VContainer } from "vuetify/es5/components/VGrid"
export default ({ entry, getAsset, widgetFor, widgetsFor }) => {
  return (
    <div>
      <SiteTitle title={entry.getIn(['data', 'title'])}/>
      <VContainer>
        {widgetFor('body')}
      </VContainer>
    </div>
  )
}
