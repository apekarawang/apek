<template functional>
  <div :style="{color: '#fff', padding: '1rem', backgroundImage: `linear-gradient(322deg, ${props.start || '#da2b2b'} 20%, ${props.end || '#000000'} 78%)`}">
      <h1 class="content">
        {{ props.title }}
      </h1>
  </div>
</template>
