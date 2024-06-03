<template>
  <div id="app">
    <loading-overlay ref="loading" />
    <router-view/>
  </div>
</template>

<script>
import LoadingOverlay from './components/LoadingOverlay.vue';

export default {
  components: {
    LoadingOverlay
  },
}
</script>
