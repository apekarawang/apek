<template>
  <span ref="x_script" class="x-script-container"></span>
</template>
<script>
export default {
  props: ['src'],
  mounted: function() {
    var self = this;
    var el = this.$refs['x_script'];

    import('postscribe').then(({ default: postscribe }) => {
      postscribe(el, '<script src="' + this.src + '"></script>', {
        error: function(e) {
          console.log(e);
        },
      });
    });
  },
};
</script>
