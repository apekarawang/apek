<template>
  <component
    :is="side ? 'v-list' : 'v-toolbar-items'"
    v-if="userLinks.length || repoLink"
  >
    <!-- user links -->
    <template
      v-for="item in userLinks"
    >

      <template
        v-if="item.type === 'links'"
      >
        <v-list-group v-if="side">
          <v-list-tile slot="activator">
            <v-list-tile-content>
              <v-list-tile-title>
                {{item.text}}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <NavLink v-for="x in item.items" :item="x" side :key="x.link" />
        </v-list-group>
        <DropdownLink
          v-else
          :item="item"
          :key="item.link"
        />
      </template>
      <NavLink
        v-else
        :side="side"
        :item="item"
        :key="item.link"
      />
    </template>

    <!-- repo link -->
    <component
      :is="side ? 'v-list-tile' : 'v-btn'"
      flat
      v-if="repoLink"
      :href="repoLink"
      class="repo-link"
      target="_blank"
      rel="noopener noreferrer"
    >
      <template v-if="side">
        <v-list-tile-content>
          <v-list-tile-title>{{repoLabel}}</v-list-tile-title>
        </v-list-tile-content>
        <v-list-tile-action>
          <v-icon small>call_missed_outgoing</v-icon>
        </v-list-tile-action>
      </template>
      <template v-else>
        {{ repoLabel }}
        <v-icon small>call_missed_outgoing</v-icon>
      </template>

    </component>
  </component>
</template>

<script>
import DropdownLink from './DropdownLink.vue';
import { resolveNavLinkItem } from './util';
import NavLink from './NavLink.vue';

export default {
  props: {
    side: {
      type: Boolean,
      default: false,
    },
  },

  components: { NavLink, DropdownLink },

  computed: {
    userNav() {
      return this.$themeLocaleConfig.nav || this.$site.themeConfig.nav || [];
    },

    nav() {
      const { locales } = this.$site;
      if (locales && Object.keys(locales).length > 1) {
        const currentLink = this.$page.path;
        const routes = this.$router.options.routes;
        const themeLocales = this.$site.themeConfig.locales || {};
        const languageDropdown = {
          text: this.$themeLocaleConfig.selectText || 'Languages',
          items: Object.keys(locales).map(path => {
            const locale = locales[path];
            const text =
              (themeLocales[path] && themeLocales[path].label) || locale.lang;
            let link;
            // Stay on the current page
            if (locale.lang === this.$lang) {
              link = currentLink;
            } else {
              // Try to stay on the same page
              link = currentLink.replace(this.$localeConfig.path, path);
              // fallback to homepage
              if (!routes.some(route => route.path === link)) {
                link = path;
              }
            }
            return { text, link };
          }),
        };
        return [...this.userNav, languageDropdown];
      }
      return this.userNav;
    },

    userLinks() {
      return (this.nav || []).map(link => {
        return Object.assign(resolveNavLinkItem(link), {
          items: (link.items || []).map(resolveNavLinkItem),
        });
      });
    },

    repoLink() {
      const { repo } = this.$site.themeConfig;
      if (repo) {
        return /^https?:/.test(repo) ? repo : `https://github.com/${repo}`;
      }
    },

    repoLabel() {
      if (!this.repoLink) return;
      if (this.$site.themeConfig.repoLabel) {
        return this.$site.themeConfig.repoLabel;
      }

      const repoHost = this.repoLink.match(/^https?:\/\/[^/]+/)[0];
      const platforms = ['GitHub', 'GitLab', 'Bitbucket'];
      for (let i = 0; i < platforms.length; i++) {
        const platform = platforms[i];
        if (new RegExp(platform, 'i').test(repoHost)) {
          return platform;
        }
      }

      return 'Source';
    },
  },
};
</script>

<style lang="stylus">
  @import './styles/config.styl'

  .nav-links
    display inline-block
    a
      line-height 1.4rem
      color inherit
      &:hover, &.router-link-active
        color $accentColor
    .nav-item
      position relative
      display inline-block
      margin-left 1.5rem
      line-height 2rem
      &:first-child
        margin-left 0
    .repo-link
      margin-left 1.5rem

  @media (max-width: $MQMobile)
    .nav-links
      .nav-item, .repo-link
        margin-left 0

  @media (min-width: $MQMobile)
    .nav-links a
      &:hover, &.router-link-active
        color $textColor

    .nav-item > a:not(.external)
      &:hover, &.router-link-active
        margin-bottom -2px
        border-bottom 2px solid lighten($accentColor, 8%)
</style>
