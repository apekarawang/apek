<template>
  <MainLayout class="page-layout">
    <SiteTitle
      :title="$page.title"
      :subtitle="$page.frontmatter.subtitle"
    />
    <v-container>
      <Content />
    </v-container>
  </MainLayout>
</template>
