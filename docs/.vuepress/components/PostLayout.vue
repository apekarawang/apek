<template>
  <div class="post-layout">
    <PostTitle :title="$page.title" :subtitle="subtitle"></PostTitle>
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
      return (this.$page.frontmatter.subtitle || []).join(', ');
    },
  },
};
</script>
