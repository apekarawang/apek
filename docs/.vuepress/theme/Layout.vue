<template>
  <component :is="$page.frontmatter.layout" v-if="$page.frontmatter.layout"></component>
  <Content v-else :custom="false" />
</template>

<script>
import VueScript from 'vue-script2';

export default {
  data() {
    return {
      identity: null,
      user: null,
    };
  },

  mounted() {
    VueScript.load(
      'https://identity.netlify.com/v1/netlify-identity-widget.js'
    ).then(() => {
      this.identity = netlifyIdentity;
      netlifyIdentity.on(`init`, user => {
        if (!user) {
          netlifyIdentity.on(`login`, user => {
            this.$emit('userLoggedIn', user);
            document.location.reload();
          });
        } else {
          this.$emit('userLoggedIn', user);
        }
      });
      netlifyIdentity.init({
        container: '#apek',
        APIUrl: 'https://apek.netlify.com/.netlify/identity',
      });
    });
  },
};
</script>

<!--<style src="prismjs/themes/prism-tomorrow.css"></style>-->
<!-- <style src="./styles/theme.styl" lang="stylus"></style> -->
