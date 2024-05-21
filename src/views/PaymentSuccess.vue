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

export default {
  name: "PaymentSuccess",
  components: {Layout},
  data(){
    return{
      message: '',
    }
  },
  mounted() {
    const params = new URLSearchParams(window.location.search);
    const paymentId = params.get('paymentId');
    const payerId = params.get('PayerID');
    this.sendPayment(paymentId, payerId);
  },
  methods: {
    sendPayment(paymentId, payerId) {
      ServicePayment.sendSuccess(paymentId, payerId).then((response) => {
        if (response && response.data) {
          const status = response.data.status;
          this.message = "Your order was " + status;
        }
      });
    }
  }
}
</script>

<style scoped>

</style>
