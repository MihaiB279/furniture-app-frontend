<template>
  <b-card class="mt-3" header="Address details">
    <b-form>
      <b-form-radio name="radio-address"
                    value="Account address"
                    v-model="selectedRadio"
                    @change="optionChanged">
        Account address
      </b-form-radio>
      <b-form-radio name="radio-address"
                    value="New address"
                    v-model="selectedRadio"
                    @change="optionChanged">
        New address
      </b-form-radio>

      <b-form-group
        id="input-group-1"
        label="County:"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="address.county"
          type="text"
          :disabled="selectedRadio==='Account address'"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-2"
        label="City:"
        label-for="input-2"
      >
        <b-form-input
          id="input-2"
          v-model="address.city"
          type="text"
          required
          :disabled="selectedRadio==='Account address'"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-3"
        label="Street:"
        label-for="input-3"
      >
        <b-form-input
          id="input-3"
          v-model="address.street"
          type="text"
          required
          :disabled="selectedRadio==='Account address'"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-4"
        label="Number:"
        label-for="input-4"
      >
        <b-form-input
          id="input-4"
          v-model="address.number"
          type="text"
          required
          :disabled="selectedRadio==='Account address'"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-5"
        label="Building Number:"
        label-for="input-5"
      >
        <b-form-input
          id="input-5"
          v-model="address.buildingNumber"
          type="text"
          :disabled="selectedRadio==='Account address'"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-6"
        label="Apartment number:"
        label-for="input-6"
      >
        <b-form-input
          id="input-6"
          v-model="address.apartmentNumber"
          type="text"
          :disabled="selectedRadio==='Account address'"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-7"
        label="Stairs Number:"
        label-for="input-7"
      >
        <b-form-input
          id="input-7"
          v-model="address.stairs"
          type="text"
          :disabled="selectedRadio==='Account address'"
        ></b-form-input>
      </b-form-group>
    </b-form>
  </b-card>
</template>

<script>

import ServiceUser from "@/services/ServiceUser";

export default {
  name: "AddressForm",
  data() {
    return {
      selectedRadio: "Account address",
      address: {
        county: '',
        city: '',
        street: '',
        number: 0,
        buildingNumber: 0,
        apartmentNumber: 0,
        stairs: 0,
      },
      userAddress: {
        county: '',
        city: '',
        street: '',
        number: 0,
        buildingNumber: 0,
        apartmentNumber: 0,
        stairs: 0,
      }
    };
  },
  methods: {
    optionChanged() {
      if (this.selectedRadio.toString() === "Account address") {
        this.address.county = this.userAddress.county;
        this.address.city = this.userAddress.city;
        this.address.street = this.userAddress.street;
        this.address.number = this.userAddress.number;
        this.address.buildingNumber = this.userAddress.buildingNumber;
        this.address.apartmentNumber = this.userAddress.apartmentNumber;
        this.address.stairs = this.userAddress.stairs;
      } else {
        this.address.county = '';
        this.address.city = '';
        this.address.street = '';
        this.address.number = 0;
        this.address.buildingNumber = 0;
        this.address.apartmentNumber = 0;
        this.address.stairs = 0;
      }
    },
    async getUser() {
      const response = await ServiceUser.getProfile();
      if (response != null) {
        this.userAddress = response.data.address;
        this.address.county = this.userAddress.county;
        this.address.city = this.userAddress.city;
        this.address.street = this.userAddress.street;
        this.address.number = this.userAddress.number;
        this.address.buildingNumber = this.userAddress.buildingNumber;
        this.address.apartmentNumber = this.userAddress.apartmentNumber;
        this.address.stairs = this.userAddress.stairs;
      }
    }
  },
  created() {
    this.getUser();
  },
  watch: {
    address: {
      handler(newVal) {
        // Emit event with form data whenever it changes
        this.$emit('form-changed', newVal);
      },
      deep: true
    }
  }
}
</script>

<style scoped>

</style>
