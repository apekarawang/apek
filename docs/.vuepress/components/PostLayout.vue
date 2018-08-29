<template>
  <MainLayout class="post-layout">
    <PostTitle
      :title="$page.title"
      :subtitle="subtitle"
    />
    <v-container>
      <Content />
    </v-container>
  </MainLayout>
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
