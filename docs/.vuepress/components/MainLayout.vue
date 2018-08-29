<template>
  <v-app id="apek">
    <Navigation />
    <v-content>
      <slot>
        <Content />
      </slot>
      <SWUpdatePopup :update-event="swUpdateEvent" />
    </v-content>
    <Footer />
  </v-app>
</template>

<script>
export default {
  data: () => ({
    swUpdateEvent: null,
  }),
  mounted() {
    window.addEventListener('scroll', this.onScroll);
    this.$on('sw-updated', this.onSWUpdated);
  },
  methods: {
    onSWUpdated(e) {
      this.swUpdateEvent = e;
    },
  },
};
</script>
