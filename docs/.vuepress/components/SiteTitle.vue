<template functional>
  <div class="bgx mb-3">
    <v-container class="py-5">
      <h1 class="white--text display-1">{{ props.title || parent.$page.title }}</h1>
      <span
        v-if="props.subtitle || parent.$page.frontmatter.subtitle"
        class="subheading white--text"
        v-text="props.subtitle || parent.$page.frontmatter.subtitle"
      />
    </v-container>
  </div>
</template>
