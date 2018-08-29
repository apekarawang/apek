<template>
  <div class="page-layout">
    <SiteTitle
      :title="$page.title"
      :subtitle="$page.frontmatter.subtitle"
    />
    <slot>
      <v-container>
        <Content />
      </v-container>
    </slot>
  </div>
</template>
