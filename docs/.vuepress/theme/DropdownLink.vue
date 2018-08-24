<template>
  <v-toolbar-items>
    <v-menu
      bottom offset-y
      open-on-hover
    >

      <v-btn
        flat
        slot="activator"
      >
        {{ item.text }}
        <v-icon small>keyboard_arrow_down</v-icon>
      </v-btn>

        <v-list>
          <v-list-group
            v-if="subItem.type === 'links'"
            :group="subItem.text"
            class="dropdown-item"
            :key="subItem.link || index"
            v-for="(subItem, index) in item.items"
            no-action
          >
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>{{ subItem.text }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>

              <v-list-tile
              v-if="subItem.type === 'links'"
                class="dropdown-subitem"
                :key="childSubItem.link"
                v-for="childSubItem in subItem.items"
                :to="childSubItem.link"
              >
                <v-list-tile-content>
                  <v-list-tile-title>{{ childSubItem.text }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
          </v-list-group>
          <v-list-tile :to="subItem.link"
              v-else
              :item="subItem"
            >
              <v-list-tile-content>
                <v-list-tile-title>{{ subItem.text }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
        </v-list>
    </v-menu>
  </v-toolbar-items>
</template>

<script>
import NavLink from './NavLink.vue';
import VMenu from '../../../node_modules/vuetify/es5/components/VMenu';

export default {
  components: { NavLink, VMenu },

  data() {
    return {
      open: false,
    };
  },

  props: {
    item: {
      required: true,
    },
  },

  methods: {
    toggle() {
      this.open = !this.open;
    },
  },
};
</script>

<style lang="stylus">
@import './styles/config.styl'
</style>
