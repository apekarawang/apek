<template>
  <div class="post-layout">
    <v-parallax
      dark
      :src="getImage()"
      height="200"
    >
      <v-layout
        align-center
        column
        justify-center
      >
        <h1 class="display-2 font-weight-thin mb-3">
          {{ $page.frontmatter.title }}
        </h1>
        <h4 class="subheading" v-if="$page.frontmatter.subtitle">
          {{ $page.frontmatter.subtitle }}
        </h4>
      </v-layout>
    </v-parallax>
    <v-container>
      <Content />
    </v-container>
  </div>
</template>

<script>
import VParallax from '@vuetify/es5/components/VParallax';
export default {
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
        console.log(id);
        return this.images[id];
      }

      return;
    },
  },
};
</script>
