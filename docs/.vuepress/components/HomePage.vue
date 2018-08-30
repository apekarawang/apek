<template>
  <div>
    <v-container
      v-if="cover"
      fluid
      class="px-0 py-0"
    >
      <v-img
        :src="cover"
        lazy-src="/favicon-16x16.png"
        aspect-ratio="1.7"
      />
    </v-container>

    <ClientOnly>
      <v-container
        v-if="carousel && carousel.length > 0"
        fluid
        class="px-0 py-0"
      >
        <v-carousel
          lazy
          :hide-controls="carousel.length < 2"
          :hide-delimiters="carousel.length < 2"
        >
          <v-carousel-item
            v-for="(item, i) in carousel"
            :key="i"
            :src="item.image"
          />
        </v-carousel>
      </v-container>
    </ClientOnly>

    <div
      v-if="business"
      class="business-field"
      style="background-image: linear-gradient(322deg,#da2b2b 20%,#000000 78%)"
    >
      <v-container
        dark
        class="text-xs-center"
        grid-list-xl
      >
        <template v-if="business">
          <h2 class="display-1 mb-4 white--text">Business Fields</h2>
          <v-layout
            row
            wrap
            justify-center
          >
            <v-flex
              v-for="b in business"
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

        <template v-if="sponsor">
          <h2 class="mt-5 pt-5 display-1 mb-4 white--text">Sponsors</h2>
          <v-layout
            row
            wrap
            justify-center
          >
            <v-flex
              v-for="b in sponsor"
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
export default {
  components: {
    VCarousel,
    VCarouselItem,
  },
  props: ['cover', 'carousel', 'business', 'sponsor'],
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
