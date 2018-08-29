import "netlify-identity-widget";
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

import("netlify-cms")
  .then(async ({default: CMS}) => {
    const NetlifyCMSWidgetMaterialIcons = await import("netlify-cms-widget-material-icons");
    const NetlifyCMSWidgetColor = await import("netlify-cms-widget-color");
    CMS.registerWidget("material-icons", NetlifyCMSWidgetMaterialIcons.Control);
    CMS.registerWidget("color", NetlifyCMSWidgetColor.Control);

    const HomePreview = await import("./Preview/HomePreview");
    const AboutPreview = await import("./Preview/AboutPreview");
    const ContactPreview = await import("./Preview/ContactPreview");
    const PostPreview = await import("./Preview/PostPreview");
    const MemberPreview = await import("./Preview/MemberPreview");

    CMS.registerPreviewStyle(require('to-string-loader!./cms.css'), {raw: true});
    CMS.registerPreviewTemplate("home", HomePreview.default);
    CMS.registerPreviewTemplate("about", AboutPreview.default);
    CMS.registerPreviewTemplate("contact", ContactPreview.default);
    CMS.registerPreviewTemplate("technology", PostPreview.default);
    CMS.registerPreviewTemplate("announcement", PostPreview.default);
    CMS.registerPreviewTemplate("activities", PostPreview.default);
    CMS.registerPreviewTemplate("member", MemberPreview.default);
  });