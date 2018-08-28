<template>
  <v-toolbar-items>
    <v-menu
      bottom
      offset-y
      open-on-hover
      :close-on-content-click="false"
    >

      <v-btn
        slot="activator"
        flat
      >
        {{ item.text }}
        <v-icon small>keyboard_arrow_down</v-icon>
      </v-btn>

      <v-list>
        <v-list-group
          v-for="(subItem, index) in item.items"
          v-if="subItem.type === 'links'"
          :key="subItem.link || index"
          :group="subItem.text"
          class="dropdown-item"
          no-action
        >
          <v-list-tile slot="activator">
            <v-list-tile-content>
              <v-list-tile-title>{{ subItem.text }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <template
            v-if="subItem.type === 'links'"
          >
            <v-list-tile
              v-for="childSubItem in subItem.items"
              :key="childSubItem.link"
              class="dropdown-subitem"
              :to="childSubItem.link"
            >
              <v-list-tile-content>
                <v-list-tile-title>{{ childSubItem.text }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list-group>
        <v-list-tile
          v-else
          :to="subItem.link"
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
// import NavLink from './NavLink.vue';

export default {
  props: {
    item: {
      required: true,
    },
  },

  data() {
    return {
      open: false,
    };
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
