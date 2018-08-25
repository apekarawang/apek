<template>
  <div class="page-layout">
    <SiteTitle 
      :title="$page.title" 
      :subtitle="$page.frontmatter.subtitle"
    />
    <v-container>
      <Content />
    </v-container>
  </div>
</template>
