import React from 'react'
import Vue from 'vue'
import ClientOnly from 'vuepress/lib/app/components/ClientOnly'

Vue.component('ClientOnly', ClientOnly)

import('netlify-cms').then(async ({ default: CMS }) => {
  const NetlifyCMSWidgetMaterialIcons = await import('netlify-cms-widget-material-icons')
  const NetlifyCMSWidgetColor = await import('netlify-cms-widget-native-color')
  const cloudinaryLibrary = await import('netlify-cms-simple-cloudinary')

  CMS.registerMediaLibrary(cloudinaryLibrary.default || cloudinaryLibrary)
  CMS.registerWidget('material-icons', NetlifyCMSWidgetMaterialIcons.Control)
  CMS.registerWidget('color', NetlifyCMSWidgetColor.Control)
  CMS.registerEditorComponent({
    // Internal id of the component
    id: 'youtube',
    // Visible label
    label: 'Youtube',
    // Fields the user need to fill out when adding an instance of the component
    fields: [{ name: 'id', label: 'Youtube Video ID', widget: 'string' }],
    // Pattern to identify a block as being an instance of this component
    pattern: /^youtube (\S+)$/,
    // Function to extract data elements from the regexp match
    fromBlock: match => match && { id: match[1] },
    // Function to create a text block from an instance of this component
    toBlock: o => `youtube ${o.id}`,
    // Preview output for this component. Can either be a string or a React component
    // (component gives better render performance)
    toPreview: o =>
      `<img src="http://img.youtube.com/vi/${
        o.id
      }/maxresdefault.jpg" alt="Youtube Video" />`,
  })

  const HomePreview = await import('./Preview/HomePreview')
  const AboutPreview = await import('./Preview/AboutPreview')
  const ContactPreview = await import('./Preview/ContactPreview')
  const PostPreview = await import('./Preview/PostPreview')
  const MemberPreview = await import('./Preview/MemberPreview')

  CMS.registerPreviewStyle(require('to-string-loader!./cms.css'), { raw: true })
  CMS.registerPreviewStyle(
    require('to-string-loader!github-markdown-css/github-markdown.css'),
    { raw: true }
  )
  CMS.registerPreviewTemplate('home', HomePreview.default)
  CMS.registerPreviewTemplate('about', AboutPreview.default)
  CMS.registerPreviewTemplate('contact', ContactPreview.default)
  CMS.registerPreviewTemplate('technology', PostPreview.default)
  CMS.registerPreviewTemplate('announcement', PostPreview.default)
  CMS.registerPreviewTemplate('activity', PostPreview.default)
  CMS.registerPreviewTemplate('member', MemberPreview.default)
})
