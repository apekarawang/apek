<template>
  <div>
    <div v-for="post in posts">
      <!-- <h2>
          <router-link :to="post.path">{{ post.frontmatter.title }}</router-link>
      </h2> -->

      <!-- <p>{{ post.excerpt }}</p> -->
      <div v-html="post.excerpt" @click="$router.push(post.path)" style="cursor: pointer"></div>

      <p><router-link :to="post.path">Read more</router-link></p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cat: {
      type: String,
      default: 'blog',
    },
  },
  mounted() {
    // console.log(this.$site.pages);
  },
  computed: {
    posts() {
      return this.$site.pages
        .filter(
          x => x.path.startsWith(`/${this.cat}/`) && !x.frontmatter.blog_index
        )
        .sort(
          (a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date)
        );
    },
  },
};
</script>
