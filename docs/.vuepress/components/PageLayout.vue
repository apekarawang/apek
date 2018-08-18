<template>
  <div class="page-layout">
    <SiteTitle :title="$page.title"/>
    <div class="content" style="padding-top: 0">
      <Content />
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    title() {
      return this.$page.title;
    },
  },
  mounted() {
    console.log(this.$page);
  },
};
</script>
