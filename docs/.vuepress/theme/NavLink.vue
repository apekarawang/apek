<template>
  <component
    flat
    :is="tag"
    :to="link"
    :active-class="side ? undefined : 'btn-nav-active'"
    v-if="!isExternal(link)"
    :exact="exact"
  >{{ item.text }}
  </component>
  <component
    flat
    :is="tag"
    v-else
    :href="link"
    :target="isMailto(link) || isTel(link) ? null : '_blank'"
    :rel="isMailto(link) || isTel(link) ? null : 'noopener noreferrer'"
  >
    <template v-if="!side">
      {{ item.text }}
      <v-icon small>call_missed_outgoing</v-icon>
    </template>
    <v-list-tile-content v-else>
      <v-list-tile-title>
        {{ item.text }}
      </v-list-tile-title>
    </v-list-tile-content>
  </component>
</template>

<script>
import { isExternal, isMailto, isTel, ensureExt } from './util';

export default {
  props: {
    item: {
      required: true,
    },
    side: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    tag() {
      return this.side ? 'v-list-tile' : 'v-btn';
    },
    link() {
      return ensureExt(this.item.link);
    },

    exact() {
      if (this.$site.locales) {
        return Object.keys(this.$site.locales).some(
          rootLink => rootLink === this.link
        );
      }
      return this.link === '/';
    },
  },

  methods: {
    isExternal,
    isMailto,
    isTel,
  },
};
</script>
