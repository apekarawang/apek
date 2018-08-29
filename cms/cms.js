import React from "react";
import Vue from "vue";
import CMS from "netlify-cms";
import ClientOnly from "vuepress/lib/app/components/ClientOnly";
import NetlifyCMSWidgetMaterialIcons from "netlify-cms-widget-material-icons";
import NetlifyCMSWidgetColor from "netlify-cms-widget-color";
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

import('netlify-identity-widget').then(({default: netlifyIdentity}) => {
  netlifyIdentity.on(`init`, user => {
    if (!user) {
      netlifyIdentity.on(`login`, user => {
        document.location.reload();
      });
    }
  });
  netlifyIdentity.init({
    APIUrl: 'https://apek.netlify.com/.netlify/identity',
  })
})

CMS.registerWidget("material-icons", NetlifyCMSWidgetMaterialIcons.Control);
CMS.registerWidget("color", NetlifyCMSWidgetColor.Control);

CMS.registerPreviewStyle(require('to-string-loader!./cms.css'), {raw: true});

CMS.registerPreviewTemplate("home", HomePreview);
CMS.registerPreviewTemplate("about", AboutPreview);
CMS.registerPreviewTemplate("contact", ContactPreview);
CMS.registerPreviewTemplate("technology", PostPreview);
CMS.registerPreviewTemplate("announcement", PostPreview);
CMS.registerPreviewTemplate("activities", PostPreview);
CMS.registerPreviewTemplate("member", MemberPreview);