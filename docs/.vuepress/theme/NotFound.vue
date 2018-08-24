<template>
  <v-app dark>
    <v-container fill-height>
      <v-layout align-center>
        <v-flex class="text-xs-center">
          <h1 :data-heading="404">404</h1>
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

<style scoped>
h1 {
  text-align: center;
  font-size: 14vw;
  position: relative;
  font-weight: 900;
  text-transform: uppercase;
  line-height: 1;
  color: transparent;
}
h1:focus {
  outline: none;
}

h1::before,
h1::after {
  content: attr(data-heading);
  position: absolute;
  top: 0;
  left: 35%;
}

h1::before {
  color: gray;
  clip-path: polygon(0% 100%, 100% 100%, 100% 40%, 0 60%);
}

h1::after {
  color: white;
  clip-path: polygon(0 0, 100% 0%, 100% 36%, 0 56%);
  animation: slide 5s infinite;
}

@keyframes slide {
  0% {
    transform: translateX(0);
  }
  50% {
    transform: translate(-20px, 2%);
  }
}
</style>
