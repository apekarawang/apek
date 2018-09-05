import React from 'react'

import PostTitle from '@components/PostTitle.vue'
import { VContainer } from 'vuetify/es5/components/VGrid'
export default ({ entry, getAsset, widgetFor, widgetsFor }) => {
  return (
    <div>
      <PostTitle
        img={getAsset(entry.getIn(['data', 'thumbnail']))}
        title={entry.getIn(['data', 'title'])}
        subtitle={entry.getIn(['data', 'business'] || []).join(', ')}
      />
      <VContainer>
        <div className="markdown-body">{widgetFor('body')}</div>
      </VContainer>
    </div>
  )
}
