import React from 'react'
import Vue from 'vue'
import ClientOnly from 'vuepress/lib/app/components/ClientOnly'
import NetlifyCMSWidgetMaterialIcons from 'netlify-cms-widget-material-icons/dist/umd/material-icons'
import NetlifyCMSWidgetColor from 'netlify-cms-widget-native-color'

Vue.component('ClientOnly', ClientOnly)

import('netlify-cms').then(async ({ default: CMS }) => {
  CMS.registerWidget('material-icons', NetlifyCMSWidgetMaterialIcons.Control)
  CMS.registerWidget('color', NetlifyCMSWidgetColor.Control)

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
