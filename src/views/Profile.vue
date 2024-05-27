<template>
  <Layout>
    <div class="text-center">
      <b-avatar size="14rem"></b-avatar>
      <b-card
        :header="user.firstName + ' ' + user.lastName"
        header-text-variant="white"
        header-tag="header"
        header-bg-variant="dark"
        title="Personal data"
        style="max-width: 20rem;"
      >
        <b-card-text>Telephone: {{ user.phone }}</b-card-text>
        <b-card-text>County: {{ user.address.county }}</b-card-text>
        <b-card-text>City: {{ user.address.city }}</b-card-text>
        <b-card-text>Street: {{ user.address.street }}</b-card-text>
        <b-card-text>Number: {{ user.address.number }}</b-card-text>
        <b-card-text v-if="user.buildingNumber">Building number:
          {{ user.address.buildingNumber }}
        </b-card-text>
        <b-card-text v-if="user.apartmentNumber">Apartment number:
          {{ user.address.apartmentNumber }}
        </b-card-text>
        <b-card-text v-if="user.stairs">Stairs: {{ user.address.stairs }}</b-card-text>
        <b-button size="sm" class="mb-2" @click="editProfile">
          <b-icon icon="gear-fill" aria-hidden="true"></b-icon>
          Edit profile
        </b-button>
      </b-card>

      <b-pagination
        v-model="currentPage"
        :total-rows="payments.length"
        :per-page="perPage"
        align="center"
        class="my-4"
      ></b-pagination>
      <b-table
        id="my-table"
        :items="payments"
        :per-page="perPage"
        :current-page="currentPage"
        small
      ></b-table>
    </div>
  </Layout>
</template>

<script>
import Layout from "@/views/Layout.vue";
import ServiceUser from "@/services/ServiceUser";
import ServicePayment from "@/services/ServicePayment";
import JwtService from "@/services/JwtService";

export default {
  name: "Profile",
  components: {Layout},
  data() {
    return {
      user: {
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
        phone: '',
        firstName: '',
        lastName: '',
        address: {
          county: '',
          city: '',
          street: '',
          number: null,
          buildingNumber: null,
          stairs: '',
        },
        company: 'no-company',
      },
      payments: [],
      perPage: 5,
      currentPage: 1
    }
  },
  async created() {
    const response = await ServiceUser.getProfile();
    if (response != null) {
      this.user = response.data;
    }
    if (JwtService.extractRoleFromJWT() === 'USER') {
      const responsePayments = await ServicePayment.getPayments();
      if (responsePayments != null) {
        this.payments = responsePayments.data;
      }
    }
  },
  methods: {
    editProfile() {
      this.$router.push({
        name: 'profile-edit',
        query: {user: JSON.stringify(this.user)}
      });
    },
  }
}
</script>

<style scoped>
.text-center {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
