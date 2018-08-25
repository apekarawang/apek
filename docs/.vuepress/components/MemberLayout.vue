<template>
  <div class="post-layout">
    <PostTitle
      class="overlay"
      :title="$page.title"
      :subtitle="subtitle"
      :img="$page.frontmatter.thumbnail"
    />
    <v-container>
      <Content />
    </v-container>
  </div>
</template>

<script>
export default {
  components: {},
  computed: {
    subtitle() {
      return (this.$page.frontmatter.business || []).join(', ');
    },
  },
};
</script>
