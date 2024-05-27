<template>
  <div class="unauthorized-container">
    <h1>Access Denied</h1>
    <p>You do not have permission to view this page.</p>
    <router-link to="/">Go Back Home</router-link>
  </div>
</template>

<script>
export default {
  name: "UnauthorizedPage"
}
</script>

<style scoped>
.unauthorized-container {
  padding: 20px;
  text-align: center;
}

</style>
