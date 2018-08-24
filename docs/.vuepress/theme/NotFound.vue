<template>
  <v-app dark>
    <v-container fill-height>
      <v-layout align-center>
        <v-flex class="text-xs-center">
          <h1>404</h1>
          <blockquote>{{ getMsg() }}</blockquote>
          <v-btn flat color="error" to="/">Take me home.</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import { VBtn } from 'vuetify';

const msgs = [
  `There's nothing here.`,
  `How did we get here?`,
  `That's a Four-Oh-Four.`,
  `Looks like we've got some broken links.`,
];

export default {
  components: {
    VBtn,
  },
  methods: {
    getMsg() {
      return msgs[Math.floor(Math.random() * msgs.length)];
    },
  },
};
</script>
