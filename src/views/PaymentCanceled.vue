<template>
  <Layout>
    <b-card>
      {{message}}
    </b-card>
  </Layout>
</template>

<script>
import ServicePayment from "@/services/ServicePayment";
import Layout from "@/views/Layout.vue";
import store from "@/store"

export default {
  name: "PaymentCanceled",
  components: {Layout},
  data(){
    return{
      message: 'Your order was successfully canceled',
    }
  },
  mounted() {
    this.sendPayment();
  },
  methods: {
    sendPayment() {
      ServicePayment.sendCancel().then((response) => {
        if (response && response.data) {
          store.commit('setPaymentProcessed', false);
        }
      });
    }
  }
}
</script>

<style scoped>

</style>
