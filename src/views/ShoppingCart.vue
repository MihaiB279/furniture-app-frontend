<template>
  <Layout>
    <b-card v-for="item in items">
      <b-form-group
        id="input-group-1"
        label="Type: "
        label-for="input-1"
      >
        <b-form-input
          id="input-2"
          v-model="item.furniture.furnitureType"
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
          v-model="item.furniture.name"
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
          v-model="item.furniture.details"
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
          v-model="item.furniture.price"
          type="number"
          disabled
        ></b-form-input>
        <b-button @click="deleteFromCart(item)" pill variant="danger">
          <b-icon icon="x-circle-fill" class="menu-icon"></b-icon>
        </b-button>
      </b-form-group>
    </b-card>
    <a  v-if="finalPrice !== 0" :href="`/shipping-details?value=${encodeURIComponent(finalPrice)}`">
      <b-button variant="primary">Buy</b-button>
    </a>
    <p v-else>Nothing in your cart yet.</p>
  </Layout>
</template>

<script>
import Layout from "@/views/Layout.vue";
import ServiceShoppingCart from "@/services/ServiceShoppingCart";
import LoadingOverlay from "@/components/LoadingOverlay.vue";
import { mapActions } from 'vuex';

export default {
  name: "ShoppingCart",
  components: {Layout, LoadingOverlay},
  data() {
    return {
      items: [],
      finalPrice: 0
    }
  },
  methods: {
    ...mapActions(['showLoading', 'hideLoading']),
    async getShoppingCart() {
      this.showLoading();
      await ServiceShoppingCart.getShoppingCart().then((response) => {
        if (response && response.data) {
          this.items = response.data;
          if(this.items != null) {
            this.items.forEach((item) => {
              this.finalPrice += parseFloat(item.furniture.price);
            });
          }
        }
      });
      this.hideLoading();
    },
    deleteFromCart(item) {
      for (let i = 0; i < this.items.length; i++) {
        if (this.items[i].furniture === item.furniture) {
          this.items.splice(i, 1);
          break;
        }
      }
      ServiceShoppingCart.deleteFromCart(item).then((response) => {
        if (response && response.data) {
        }
      });
    }
  },
  created() {
    this.getShoppingCart();
  }
}
</script>

<style scoped>

</style>
