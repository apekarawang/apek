<template functional>
  <div class="bgx mb-3">
    <v-container class="py-5">
      <h1 class="white--text display-1 text-uppercase font-weight-thin">{{ props.title }}</h1>
      <span
        v-if="props.subtitle"
        class="subheading white--text"
        v-text="props.subtitle"
      />
    </v-container>
  </div>
</template>
