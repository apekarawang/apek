<template>
  <v-parallax
    dark
    :src="img || getImage()"
    :height="height || 380"
  >
    <v-layout
      style="text-shadow: 0px 5px 2em black"
      align-center
      column
      justify-center
    >
      <h1 class="display-2 font-weight-thin mb-3">
        {{ title }}
      </h1>
      <h4 class="subheading" v-if="subtitle">
        {{ subtitle }}
      </h4>
      <slot></slot>
    </v-layout>
  </v-parallax>
</template>
<script>
import VParallax from '@vuetify/es5/components/VParallax';

export default {
  props: ['img', 'title', 'subtitle', 'height'],
  components: {
    VParallax,
  },
  data: () => ({
    images: ['/images/human-resource.jpg', '/images/atom.jpg'],
  }),
  methods: {
    getImage() {
      const max = this.images.length;
      if (max) {
        const id = Math.floor(Math.random() * (max - 1 - 0 + 1)) + 0;
        return this.images[id];
      }

      return;
    },
  },
};
</script>
