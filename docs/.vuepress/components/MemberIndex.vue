<template>
  <div>
    <div v-for="post in posts">
      <h2>
          <router-link :to="post.path">{{ post.frontmatter.title }}</router-link>
      </h2>
      <address>{{post.frontmatter.address}}</address>
      <ul>
        <caption>Business</caption>
        <li v-for="(name, b) in post.frontmatter.business" :key="b">
          {{ name }}
        </li>
      </ul>
      <ul>
        <caption>email</caption>
        <li v-for="(name, b) in post.frontmatter.email" :key="b">
          {{ name }}
        </li>
      </ul>
      <ul>
        <caption>phone</caption>
        <li v-for="(name, b) in post.frontmatter.phone" :key="b">
          {{ name }}
        </li>
      </ul>
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
        .filter(x => x.path.startsWith(`/members/`) && !x.frontmatter.index)
        .sort(
          (a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date)
        );
    },
  },
};
</script>
