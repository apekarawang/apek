<template>
  <v-container grid-list-md>
    <v-list three-line>
      <v-data-iterator
        :items="posts"
        item-key="key"
      >
        <template slot="item" slot-scope="props">
          <v-list-tile avatar :to="props.item.path">
            <v-list-tile-avatar>
              <img :src="props.item.frontmatter.thumbnail">
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title v-html="props.item.frontmatter.title"></v-list-tile-title>
              <v-list-tile-sub-title
                v-html="props.item.frontmatter.description || props.item.excerpt || props.item.frontmatter.body" />
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-data-iterator>
    </v-list>
  </v-container>
</template>

<script>
import VDataIterator from '@vuetify/es5/components/VDataIterator';

export default {
  props: {
    cat: {
      type: String,
      default: 'blog',
    },
  },
  components: {
    VDataIterator,
  },
  mounted() {
    // console.log(this.posts);
  },
  computed: {
    posts() {
      return this.$site.pages
        .filter(x => x.path.startsWith(`/${this.cat}/`) && !x.frontmatter.index)
        .sort(
          (a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date)
        );
    },
  },
};
</script>
