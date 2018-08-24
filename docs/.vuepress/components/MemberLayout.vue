<template>
  <div class="post-layout">
    <PostTitle class="overlay" :title="$page.title" :subtitle="subtitle" :img="$page.frontmatter.thumbnail">
    </PostTitle>
    <v-container>
      <Content />
    </v-container>
  </div>
</template>

<script>
import VParallax from '@vuetify/es5/components/VParallax';
import VImg from '@vuetify/es5/components/VImg';
export default {
  components: {
    VParallax,
    VImg,
  },
  computed: {
    subtitle() {
      return (this.$page.frontmatter.business || []).join(', ');
    },
  },
};
</script>
