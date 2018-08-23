// import "netlify-identity-widget";
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


CMS.registerPreviewStyle("https://unpkg.com/vuetify@next/dist/vuetify.min.css");
CMS.registerPreviewStyle(require('to-string-loader!./cms.css'), {raw: true});

CMS.registerWidget("material-icons", NetlifyCMSWidgetMaterialIcons.Control);
CMS.registerWidget("color", NetlifyCMSWidgetColor.Control);

CMS.registerPreviewTemplate("home", HomePreview);
CMS.registerPreviewTemplate("about", AboutPreview);
CMS.registerPreviewTemplate("contact", ContactPreview);
CMS.registerPreviewTemplate("technology", PostPreview);