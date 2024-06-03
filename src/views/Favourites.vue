<template>
  <Layout>
    <h1>Your rooms with your favourite furniture</h1>
    <b-card v-for="key in keys"
            no-body
            class="p-3 mb-1 my-card">
      <b-card-header header-tag="header" class="p-1" role="tab">
        {{ key }}
      </b-card-header>
      <b-card v-for="fav in favourites[key]">
        <b-form-group
          id="input-group-1"
          label="Type: "
          label-for="input-1"
        >
          <b-form-input
            id="input-2"
            v-model="fav.furnitureType"
            type="text"
            disabled
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-1"
          label="Name: "
          label-for="input-2"
        >
          <b-form-input
            id="input-2"
            v-model="fav.name"
            type="text"
            disabled
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-3"
          label="Details: "
          label-for="input-3"
        >
          <b-form-input
            id="input-3"
            v-model="fav.details"
            type="text"
            disabled
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-4"
          label="Details: "
          label-for="input-4"
        >
          <b-form-input
            id="input-4"
            v-model="fav.price"
            type="number"
            disabled
          ></b-form-input>
        </b-form-group>
        <b-button @click="addToCart(fav)" pill variant="primary">
          <b-icon icon="cart3" class="menu-icon"></b-icon>
        </b-button>
        <b-button @click="deleteFromFavourites(key, fav)" pill variant="danger">
          <b-icon icon="x-circle-fill" class="menu-icon"></b-icon>
        </b-button>
      </b-card>
    </b-card>
  </Layout>
</template>

<script>
import Layout from "@/views/Layout.vue";
import ServiceFavourite from "@/services/ServiceFavourite";
import ServiceShoppingCart from "@/services/ServiceShoppingCart";
import LoadingOverlay from "@/components/LoadingOverlay.vue";
import { mapActions } from 'vuex';

export default {
  name: "Favourites",
  components: {Layout, LoadingOverlay},
  data() {
    return {
      favourites: {},
      keys: [],
    }
  },
  methods: {
    ...mapActions(['showLoading', 'hideLoading']),
    async getFavourite() {
      this.showLoading();
      await ServiceFavourite.getFavourites().then((response) => {
        if (response && response.data) {
          const favourites_list = response.data;
          favourites_list.forEach(item => {
            if (this.favourites.hasOwnProperty(item.room)) {
              this.favourites[item.room].push(item.furniture);
            } else {
              this.favourites[item.room] = [item.furniture];
            }
          });
          this.keys = Object.keys(this.favourites);
        }
      });
      this.hideLoading();
    },
    addToCart(item) {
      ServiceShoppingCart.saveToShoppingCart([item]).then((response) => {
        if (response && response.data) {
        }
      });
    },
    deleteFromFavourites(key, item){
      for (let i = 0; i < this.favourites[key].length; i++) {
        if (this.favourites[key][i] === item ) {
          this.favourites[key].splice(i, 1);
          this.$forceUpdate();
          if(this.favourites[key].length === 0){
            this.keys = this.keys.filter(function(keySearch) {
              return keySearch !== key;
            });
          }
          break;
        }
      }
      ServiceFavourite.deleteFromFavourite(key, item).then((response) => {
        if (response && response.data) {
        }
      });
    }
  },
    created() {
      this.getFavourite();
    },
}
</script>

<style scoped>

</style>
