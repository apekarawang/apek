<template>
  <v-container
    fluid
    grid-list-md
  >
    <v-data-iterator
      :items="posts"
      item-key="key"
      :rows-per-page-items="rowsPerPageItems"
      :pagination.sync="pagination"
      content-tag="v-layout"
      row
      wrap
    >
      <v-flex
        slot="item"
        slot-scope="props"
        md12
        lg6
      >
        <v-card :to="props.item.path">
          <v-layout>
            <v-flex xs5>
              <v-img
                :src="props.item.frontmatter.thumbnail"
                height="125px"
                contain
              />
            </v-flex>
            <v-flex>
              <v-card-title primary-title>
                <div>
                  <div class="headline">{{ props.item.frontmatter.title }}</div>
                  <div v-if="props.item.frontmatter.date">
                    {{ new Date(props.item.frontmatter.date).toLocaleDateString() }}
                  </div>
                </div>
              </v-card-title>
            </v-flex>
          </v-layout>
          <v-divider light />
          <v-card-text v-html="props.item.frontmatter.description || props.item.excerpt || props.item.frontmatter.body" />
        </v-card>
      </v-flex>
    </v-data-iterator>
  </v-container>
</template>

<script>
import VDataIterator from '@vuetify/es5/components/VDataIterator'

export default {
  components: {
    VDataIterator,
  },
  props: {
    cat: {
      type: String,
      default: 'blog',
    },
  },
  data: () => ({
    rowsPerPageItems: [{ text: 'All', value: -1 }, 2, 4, 8, 16, 20],
    pagination: {
      rowsPerPage: 4,
    },
  }),
  computed: {
    posts() {
      return this.$site.pages
        .filter(x => x.path.startsWith(`/${this.cat}/`) && !x.frontmatter.index)
        .sort(
          (a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date)
        )
    },
  },
  mounted() {
    // console.log(this.posts);
  },
  methods: {
    formatDate(date) {
      const d = new Date(date)
      return [d.getDay(), d.getMonth(), d.getFullYear()].join('-')
    },
  },
}
</script>
