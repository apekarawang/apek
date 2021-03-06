import React from 'react'

import PostTitle from '@components/PostTitle.vue'
import { VContainer } from 'vuetify/es5/components/VGrid'
export default ({ entry, getAsset, widgetFor, widgetsFor }) => {
  return (
    <div>
      <PostTitle
        className="overlay"
        img={getAsset(entry.getIn(['data', 'thumbnail']))}
        title={entry.getIn(['data', 'title'])}
        subtitle={
          entry.getIn(['data', 'subtitle']) ||
          new Date(entry.getIn(['data', 'date'])).toLocaleDateString()
        }
      />
      <VContainer>
        <div className="markdown-body">{widgetFor('body')}</div>
      </VContainer>
    </div>
  )
}
