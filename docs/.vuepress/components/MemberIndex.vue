<template>
  <v-container
    grid-list-md
  >
    <v-text-field
      v-model="search"
      append-icon="search"
      label="Search"
      single-line
      hide-details
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
        <v-card 
          tile 
          ripple 
          :to="props.item.path" 
          hover
        >
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
      return this.$site.pages.filter(
        x => x.path.startsWith(`/members/`) && !x.frontmatter.index
      );
    },
  },
};
</script>
