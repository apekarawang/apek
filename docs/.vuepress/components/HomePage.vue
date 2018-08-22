<template>
  <div>
    <v-container
      v-if="$page.frontmatter.cover"
      fluid
      class="px-0 py-0"
    >
      <v-img
        :src="$page.frontmatter.cover"
        aspect-ratio="1.7"
      />
    </v-container>

    <v-container
      v-if="$page.frontmatter.carousel && $page.frontmatter.carousel.length > 0"
      fluid
      class="px-0 py-0"
    >
      <v-carousel lazy :hide-controls="$page.frontmatter.carousel.length < 2" :hide-delimiters="$page.frontmatter.carousel.length < 2">
        <v-carousel-item v-for="(item, i) in $page.frontmatter.carousel" :src="item.image" :key="i"></v-carousel-item>
      </v-carousel>
    </v-container>

    <div
      v-if="$page.frontmatter.business"
      class="business-field bgx"
    >
      <v-container
        class="text-xs-center"
        grid-list-xl
      >
        <template v-if="$page.frontmatter.business">
          <h2 class="display-1 mb-4 white--text">Business Fields</h2>
          <v-layout
            row
            wrap
            justify-center
          >
            <v-flex
              v-for="b in $page.frontmatter.business"
              :key="b.title"
              md3
              xs12
              class="my-3"
            >
              <!-- <fa :icon="b.icon.split(' ')" class="white--text" size="6x"/> -->
              <v-icon color="white" size="64px">{{b.icon}}</v-icon>
              <div class="title my-4 white--text">{{ b.title }}</div>
            </v-flex>
          </v-layout>
        </template>

        <template v-if="$page.frontmatter.sponsor">
          <h2 class="mt-5 pt-5 display-1 mb-4 white--text">Sponsors</h2>
          <v-layout
            row
            wrap
            justify-center
          >
            <v-flex
              v-for="b in $page.frontmatter.sponsor"
              :key="b.title"
              md3
              xs12
              class="my-3"
            >
              <v-img
                max-height="80px"
                :src="b.image"
                :alt="b.title"
                :title="b.title"
                aspect-ratio="1"
                contain
              />
            </v-flex>
          </v-layout>
        </template>
      </v-container>
    </div>
  </div>
</template>

<script>
import VCarousel from '@vuetify/es5/components/VCarousel/VCarousel';
import VCarouselItem from '@vuetify/es5/components/VCarousel/VCarouselItem';
import VImg from '@vuetify/es5/components/VImg';
export default {
  components: {
    VCarousel,
    VCarouselItem,
    VImg,
  },
  data() {
    return {
      posts: [
        'Fabrication',
        'Machining',
        'Construction',
        'M.E. & Maintenance',
        'Machine Maker',
        'Automation',
        'Engineering Consultant',
        'Technical Supplier',
        'et cetera.',
      ],
    };
  },
};
</script>

<style>
.bgy {
  background-image: linear-gradient(-322deg, #000000 8%, #da2b2b 78%);
}

/* .jumbotron__image {
  width: 100%;
  height: 100%;
} */
</style>
