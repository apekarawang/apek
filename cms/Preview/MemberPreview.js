import React from 'react'

import PostTitle from '@components/PostTitle.vue'
import { VContainer } from 'vuetify/es5/components/VGrid'
export default ({ entry, getAsset, widgetFor, widgetsFor }) => {
  return (
    <div>
      <PostTitle
        title={entry.getIn(['data', 'title'])}
        subtitle={entry.getIn(['data', 'business'] || []).join(', ')}
      />
      <VContainer className="markdown-body">{widgetFor('body')}</VContainer>
    </div>
  )
}
