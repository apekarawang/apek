<template>
  <v-app
    id="apek"
    :class="pageClasses"
  >
    <!-- Netlify Identity -->
    <script2 src="https://identity.netlify.com/v1/netlify-identity-widget.js" />

    <!--<Navbar
      v-if="shouldShowNavbar"
      @toggle-sidebar="toggleSidebar"
    />-->
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
    <!--<div
      class="sidebar-mask"
      @click="toggleSidebar(false)"
    ></div>-->

    <!-- <Sidebar
      :items="sidebarItems"
      @toggle-sidebar="toggleSidebar"
    >
      <slot
        slot="top"
        name="sidebar-top"
      />
      <slot
        slot="bottom"
        name="sidebar-bottom"
      />
    </Sidebar> -->

    <v-content>
      <div
        v-if="$page.frontmatter.layout"
        class="custom-layout"
      >
        <component :is="$page.frontmatter.layout" />
      </div>

      <Home v-else-if="$page.frontmatter.home" />

      <Page
        v-else
        :sidebar-items="sidebarItems"
      >
        <slot
          slot="top"
          name="page-top"
        />
        <slot
          slot="bottom"
          name="page-bottom"
        />
      </Page>

      <SWUpdatePopup :update-event="swUpdateEvent" />
    </v-content>
  </v-app>
</template>

<script>
import Vue from 'vue';
import nprogress from 'nprogress';
import Home from './Home.vue';
// import Navbar from './Navbar.vue';
import Page from './Page.vue';
// import Sidebar from './Sidebar.vue';
import SWUpdatePopup from './SWUpdatePopup.vue';
import { resolveSidebarItems } from './util';
import NavLinks from './NavLinks';

export default {
  components: { Home, Page, NavLinks, SWUpdatePopup },

  data() {
    return {
      isSidebarOpen: false,
      swUpdateEvent: null,
    };
  },

  computed: {
    shouldShowNavbar() {
      const { themeConfig } = this.$site;
      const { frontmatter } = this.$page;
      if (frontmatter.navbar === false || themeConfig.navbar === false) {
        return false;
      }
      return (
        this.$title ||
        themeConfig.logo ||
        themeConfig.repo ||
        themeConfig.nav ||
        this.$themeLocaleConfig.nav
      );
    },

    shouldShowSidebar() {
      const { frontmatter } = this.$page;
      return (
        !frontmatter.layout &&
        !frontmatter.home &&
        frontmatter.sidebar !== false &&
        this.sidebarItems.length
      );
    },

    sidebarItems() {
      return resolveSidebarItems(
        this.$page,
        this.$route,
        this.$site,
        this.$localePath
      );
    },

    pageClasses() {
      const userPageClass = this.$page.frontmatter.pageClass;
      return [
        {
          // 'no-navbar': !this.shouldShowNavbar,
          // 'sidebar-open': this.isSidebarOpen,
          // 'no-sidebar': !this.shouldShowSidebar,
        },
        userPageClass,
      ];
    },
  },

  mounted() {
    window.addEventListener('scroll', this.onScroll);

    // configure progress bar
    nprogress.configure({ showSpinner: false });

    this.$router.beforeEach((to, from, next) => {
      if (to.path !== from.path && !Vue.component(to.name)) {
        nprogress.start();
      }
      next();
    });

    this.$router.afterEach(() => {
      nprogress.done();
      this.isSidebarOpen = false;
    });

    this.$on('sw-updated', this.onSWUpdated);
  },

  methods: {
    toggleSidebar(to) {
      this.isSidebarOpen = typeof to === 'boolean' ? to : !this.isSidebarOpen;
    },

    // side swipe
    // onTouchStart(e) {
    //   this.touchStart = {
    //     x: e.changedTouches[0].clientX,
    //     y: e.changedTouches[0].clientY,
    //   }
    // },

    // onTouchEnd(e) {
    //   const dx = e.changedTouches[0].clientX - this.touchStart.x
    //   const dy = e.changedTouches[0].clientY - this.touchStart.y
    //   if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
    //     if (dx > 0 && this.touchStart.x <= 80) {
    //       this.toggleSidebar(true)
    //     } else {
    //       this.toggleSidebar(false)
    //     }
    //   }
    // },

    onSWUpdated(e) {
      this.swUpdateEvent = e;
    },
  },
};
</script>

<!--<style src="prismjs/themes/prism-tomorrow.css"></style>-->
<style src="./styles/theme.styl" lang="stylus"></style>
