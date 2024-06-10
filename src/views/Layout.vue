<template>
  <div class="page-container">
    <b-navbar type="light" variant="dark">
      <b-nav-item class="nav-item">
        <router-link :to="{ path: '/home' }">
          <b-icon icon="info-circle" class="menu-icon"></b-icon>
          <span class="menu-text">Home page</span>
        </router-link>
      </b-nav-item>

      <b-nav-item v-if="role === 'USER'" class="nav-item">
        <router-link :to="{ path: '/room-details' }">
          <b-icon icon="house-door" class="menu-icon"></b-icon>
          <span class="menu-text">Generate</span>
        </router-link>
      </b-nav-item>

      <b-nav-item v-if="role === 'COMPANY'" class="nav-item">
        <router-link :to="{ path: '/company-furniture' }">
          <b-icon icon="house-door" class="menu-icon"></b-icon>
          <span class="menu-text">Furniture</span>
        </router-link>
      </b-nav-item>

      <b-nav-item v-if="role === 'USER'" class="nav-item">
        <router-link :to="{ path: '/shopping-cart' }">
          <b-icon icon="cart3" class="menu-icon"></b-icon>
          <span class="menu-text">Shopping cart</span>
        </router-link>
      </b-nav-item>

      <b-nav-item v-if="role === 'USER'" class="nav-item">
        <router-link :to="{ path: '/favourites' }">
          <b-icon icon="star" class="menu-icon"></b-icon>
          <span class="menu-text">Favourites</span>
        </router-link>
      </b-nav-item>

      <b-nav-item class="nav-item">
        <router-link :to="{ path: '/profile' }">
          <b-icon icon="person" class="menu-icon"></b-icon>
          <span class="menu-text">Profile</span>
        </router-link>
      </b-nav-item>

      <b-nav-item @click="logout" class="nav-item">
        <b-icon icon="door-open" class="menu-icon"></b-icon>
        <span class="menu-text">Log out</span>
      </b-nav-item>
    </b-navbar>
    <slot></slot>
  </div>
</template>

<script>
import JwtService from "@/services/JwtService";

export default {
  name: "Layout",
  data() {
    return {
      role: JwtService.extractRoleFromJWT(),
    }
  },
  methods: {
    logout() {
      JwtService.logout();
    }
  }
};
</script>

<style scoped>
.nav-item {
  padding: 0;
  list-style-type: none;
}

.menu-icon {
  margin-right: 5px;
}

.menu-text {
  color: #fff;
  font-weight: bold;
}

.page-container {
  max-width: 80%;
  margin: 0 auto;
}

</style>
