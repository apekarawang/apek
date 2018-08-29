<template functional>
  <div>
    <v-toolbar>
      <v-toolbar-side-icon />
      <v-toolbar-title>Title {{ props.path }}</v-toolbar-title>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat>Link One</v-btn>
        <v-btn flat>Link Two</v-btn>
        <v-btn flat>Link Three</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    {{ props }}
  </div>
</template>
