<template>
  <div class="post-layout">
    <PostTitle
      :title="$page.title"
      :subtitle="subtitle"
      :img="$page.frontmatter.thumbnail"
    />
    <v-container>
      <Content class="markdown-body" />
    </v-container>
  </div>
</template>

<script>
export default {
  components: {},
  computed: {
    subtitle() {
      return (this.$page.frontmatter.subtitle || []).join(', ')
    },
  },
}
</script>

<style lang="stylus" scoped>
@require '~github-markdown-css/github-markdown.css'
</style>
