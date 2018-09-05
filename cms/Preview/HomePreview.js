import React from 'react'
import Home from '@components/HomePage.vue'
const HomePreview = ({ entry, getAsset, widgetFor, widgetsFor }) => {
  return (
    <Home
      cover={widgetsFor('cover')
        .map(c => ({
          image:
            c.getIn(['data', 'image']) &&
            getAsset(c.getIn(['data', 'image'])).toString(),
          title: c.getIn(['data', 'title']),
          description: c.getIn(['data', 'description']),
        }))
        .toArray()}
      business={widgetsFor('business')
        .map(b => ({
          title: b.getIn(['data', 'title']),
          icon: b.getIn(['data', 'icon']),
        }))
        .toJS()}
      sponsor={widgetsFor('sponsor')
        .map(s => ({
          title: s.getIn(['data', 'title']),
          image:
            s.getIn(['data', 'image']) &&
            getAsset(s.getIn(['data', 'image'])).toString(),
        }))
        .toJS()}
    />
  )
}
export default HomePreview
