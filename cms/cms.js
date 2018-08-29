import React from "react";
import Vue from "vue";
import ClientOnly from "vuepress/lib/app/components/ClientOnly";

import {
  Vuetify,
  VApp,
  VToolbar,
  VBtn,
  VGrid,
  VCard,
  VList,
  VIcon,
  VSnackbar
} from "vuetify";

import HomePreview from "./Preview/HomePreview";
import AboutPreview from "./Preview/AboutPreview";
import ContactPreview from "./Preview/ContactPreview";
import PostPreview from "./Preview/PostPreview";
import MemberPreview from "./Preview/MemberPreview";

Vue.component("ClientOnly", ClientOnly);

Vue.use(Vuetify, {
  components: {
    VApp,
    VToolbar,
    VGrid,
    VCard,
    VList,
    VBtn,
    VIcon,
    VSnackbar
  }
});

import('netlify-identity-widget')
  .then(({default: netlifyIdentity}) => {
    netlifyIdentity.init()
    netlifyIdentity.on('init', user => {
      if (!user) {
        netlifyIdentity.on(`login`, user => {
          document.location.reload();
        });
      }
    })
  })

import('netlify-cms')
  .then(({default: CMS}) => {
    import("netlify-cms-widget-material-icons")
      .then(({Control}) => {
        CMS.registerWidget("material-icons", Control);
      });
    import("netlify-cms-widget-color")
      .then(({Control}) => {
        CMS.registerWidget("color", Control);
      });

    CMS.registerPreviewStyle(require('to-string-loader!./cms.css'), {raw: true});

    CMS.registerPreviewTemplate("home", HomePreview);
    CMS.registerPreviewTemplate("about", AboutPreview);
    CMS.registerPreviewTemplate("contact", ContactPreview);
    CMS.registerPreviewTemplate("technology", PostPreview);
    CMS.registerPreviewTemplate("announcement", PostPreview);
    CMS.registerPreviewTemplate("activities", PostPreview);
    CMS.registerPreviewTemplate("member", MemberPreview);
  })