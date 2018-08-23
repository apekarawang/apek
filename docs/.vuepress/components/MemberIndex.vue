<template>
  <v-container
    grid-list-md
  >
    <v-text-field
        append-icon="search"
        autofocus
        label="Search"
        single-line
        hide-details
        v-model="search"
        class="mb-3"
    />

    <v-data-iterator
      :search="search"
      :items="members"
      item-key="title"
      content-tag="v-layout"
      :rows-per-page-items="rowsPerPageItems"
      :pagination.sync="pagination"
      row
      wrap
    >
      <v-flex
        slot="item"
        slot-scope="props"
        sm12
        md6
      >
        <v-card tile ripple :to="props.item.path" hover>
          <v-card-title>
            <h4>
              {{ props.item.title }}
            </h4>
          </v-card-title>
          <v-divider />
          <v-list dense>
            <v-list-tile>
              <v-list-tile-action>
                <v-icon>star</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ props.item.frontmatter.business.join(', ') }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-action>
                <v-icon>home</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ props.item.frontmatter.address }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-action>
                <v-icon>email</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ props.item.frontmatter.email.join(', ') }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-action>
                <v-icon>phone</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ props.item.frontmatter.phone.join(', ') }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-action>
                <v-icon>print</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ props.item.frontmatter.fax && props.item.frontmatter.fax.join() || '-' }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-flex>
    </v-data-iterator>
  </v-container>
  <!-- <div>
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

      <div v-html="post.excerpt" @click="$router.push(post.path)" style="cursor: pointer"></div>

      <p><router-link :to="post.path">Read more</router-link></p>
    </div>
  </div> -->
</template>

<script>
import VDataIterator from '@vuetify/es5/components/VDataIterator';
import VTextField from '@vuetify/es5/components/VTextField';

export default {
  components: {
    VDataIterator,
    VTextField,
  },
  data: () => ({
    search: '',
    rowsPerPageItems: [{ text: 'All', value: -1 }, 2, 4, 8, 16, 20],
    pagination: {
      rowsPerPage: 4,
    },
  }),
  computed: {
    members() {
      return this.$site.pages
        .filter(x => x.path.startsWith(`/members/`) && !x.frontmatter.index)
        .sort(
          (a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date)
        );
    },
  },
};
</script>
