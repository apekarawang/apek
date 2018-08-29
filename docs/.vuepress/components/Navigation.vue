<template>
<div>
  <v-toolbar
    app
    clipped-left
    clipped-right
  >

    <router-link
      :to="$localePath"
      class="d-flex"
    >
      <img
        v-if="$site.themeConfig.logo"
        class="logo"
        :src="$withBase($site.themeConfig.logo)"
        :alt="$siteTitle"
        height="24px"
      >
    </router-link>

    <v-toolbar-title
      v-if="$siteTitle && $site.themeConfig.navTitle !== false"
      ref="siteName"
      class="pb-1 hidden-xs-only"
    >{{ $siteTitle }}
    </v-toolbar-title>

    <v-spacer />

    <NavLinks class="hidden-xs-only" />
    <!-- <v-toolbar-items v-if="user">
      <v-btn flat icon data-netlify-identity-button="true" @click.native="identity.open()">
        <v-icon>account_circle</v-icon>
      </v-btn>
    </v-toolbar-items> -->
    <v-toolbar-side-icon
      class="hidden-sm-and-up"
      @click.stop="toggleSidebar"
    />

  </v-toolbar>
  <v-navigation-drawer
      v-model="isSidebarOpen"
      app
      clipped
      right
      temporary
    >
      <NavLinks side />
    </v-navigation-drawer>
</div>
</template>

<script>
export default {
  data: () => ({
    identity: null,
    user: null,
    isSidebarOpen: false,
    swUpdateEvent: null,
  }),
  methods: {
    toggleSidebar(to) {
      this.isSidebarOpen = typeof to === 'boolean' ? to : !this.isSidebarOpen;
    },
  },
};
</script>
