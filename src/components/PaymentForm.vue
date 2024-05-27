<template>
  <b-card class="mt-3" header="Payment methods">
    Total amount: {{amount}}
    <b-form-radio name="radio-payment"
                  value="Cash at delivery"
                  v-model="selectedRadio"
                  @change="optionChanged">
      Cash at delivery
    </b-form-radio>
    <b-form-radio name="radio-payment"
                  value="Card online"
                  v-model="selectedRadio"
                  @change="optionChanged">
      Card online
    </b-form-radio>
    <b-button @click="sendOrder">Send order</b-button>
  </b-card>
</template>

<script>
import ServicePayment from "@/services/ServicePayment";
import router from "@/router";
import store from "@/store"

export default {
  name: "PaymentForm",
  props: ['amount', 'deliveryAddress'],
  data() {
    return {
      selectedRadio: "Cash at delivery",
    }
  },
  methods: {
    optionChanged() {
    },
    async sendOrder() {
      const data={amount: this.amount, deliveryAddress:this.deliveryAddress}
      if(this.selectedRadio === "Card online") {
        await ServicePayment.createCardPayment(data).then((response) => {
          if (response && response.data) {
            store.commit('setPaymentProcessed', true);
            window.location.href = response.data;
          }
        });
      }
      else{
        await ServicePayment.savePaymentCash(data).then((response) => {
          if (response && response.data) {
            router.push("/profile");
          }
        });
      }
    }
  },
}
</script>

<style scoped>

</style>
