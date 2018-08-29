<template>
  <div>
    <v-container
      v-if="doc.cover"
      fluid
      class="px-0 py-0"
    >
      <v-img
        :src="doc.cover"
        aspect-ratio="1.7"
      />
    </v-container>

    <ClientOnly>
      <v-container
        v-if="doc.carousel && doc.carousel.length > 0"
        fluid
        class="px-0 py-0"
      >
        <v-carousel
          lazy
          :hide-controls="doc.carousel.length < 2"
          :hide-delimiters="doc.carousel.length < 2"
        >
          <v-carousel-item
            v-for="(item, i) in doc.carousel"
            :key="i"
            :src="item.image"
          />
        </v-carousel>
      </v-container>
    </ClientOnly>

    <div
      v-if="doc.business"
      class="business-field"
      style="background-image: linear-gradient(322deg,#da2b2b 20%,#000000 78%)"
    >
      <v-container
        dark
        class="text-xs-center"
        grid-list-xl
      >
        <template v-if="doc.business">
          <h2 class="display-1 mb-4 white--text">Business Fields</h2>
          <v-layout
            row
            wrap
            justify-center
          >
            <v-flex
              v-for="b in doc.business"
              :key="b.title"
              md3
              xs12
              class="my-3"
            >
              <v-icon
                color="white"
                size="64px"
              >{{ b.icon }}</v-icon>
              <div class="title my-4 white--text">{{ b.title }}</div>
            </v-flex>
          </v-layout>
        </template>

        <template v-if="doc.sponsor">
          <h2 class="mt-5 pt-5 display-1 mb-4 white--text">Sponsors</h2>
          <v-layout
            row
            wrap
            justify-center
          >
            <v-flex
              v-for="b in doc.sponsor"
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
import VCarousel from '@vuetify/es5/components/VCarousel/VCarousel'
import VCarouselItem from '@vuetify/es5/components/VCarousel/VCarouselItem'
import VImg from '@vuetify/es5/components/VImg'
export default {
  components: {
    VCarousel,
    VCarouselItem,
    VImg,
  },
  computed: {
    doc() {
      return this.$page.frontmatter
    },
  },
}
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
