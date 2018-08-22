<template>
  <v-container grid-list-md>
    <h1>Technologies</h1>
    <v-list three-line>
      <v-data-iterator
        :items="posts"
      >
        <template slot="item" slot-scope="props">
          <v-list-tile avatar :to="props.item._path">
            <v-list-tile-avatar>
              <img :src="props.item.thumbnail">
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title v-html="props.item.title"></v-list-tile-title>
              <v-list-tile-sub-title v-html="props.item.description || props.item.excerpt || props.item.body"></v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-data-iterator>
    </v-list>
  </v-container>
</template>

<script>
import { VDataIterator, VDivider } from 'vuetify';

export default {
  components: {
    VDataIterator,
    VDivider,
  },
  asyncData() {
    const context = require.context(
      '~/content/blog/posts/technologies/',
      false,
      /\.json$/
    );

    const posts = context.keys().map(key => ({
      ...context(key),
      _path: `/technology/${key.replace('.json', '').replace('./', '')}`,
    }));

    return { posts };
  },
  head() {
    return {
      title: 'Technologies',
    };
  },
};
</script>
