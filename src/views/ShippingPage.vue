<template>
  <Layout>
    <AddressForm @form-changed="addressFormChanged"/>
    <PaymentForm :amount="finalPrice" :deliveryAddress="deliveryAddress"/>
  </Layout>
</template>

<script>
import Layout from "@/views/Layout.vue";
import AddressForm from "@/components/AddressForm.vue";
import PaymentForm from "@/components/PaymentForm.vue";

export default {
  name: "Shipping",
  components: {PaymentForm, Layout, AddressForm},
  data() {
    return {
      finalPrice: 0,
      deliveryAddress: {
        county: '',
        city: '',
        street: '',
        number: 0,
        buildingNumber: 0,
        apartmentNumber: 0,
        stairs: 0,
      },
    };
  },
  created() {
    const params = new URLSearchParams(window.location.search);
    this.finalPrice = decodeURIComponent(params.get('value'));
  },
  methods:{
    addressFormChanged(addressData) {
      this.deliveryAddress.county = addressData.county;
      this.deliveryAddress.city = addressData.city;
      this.deliveryAddress.street = addressData.street;
      this.deliveryAddress.number = addressData.number;
      this.deliveryAddress.buildingNumber = addressData.buildingNumber;
      this.deliveryAddress.apartmentNumber = addressData.apartmentNumber;
      this.deliveryAddress.stairs = addressData.stairs;
    },
  }
}
</script>

<style scoped>

</style>
