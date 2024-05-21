<template>
  <Layout>
    <b-card class="mt-3" header="Add a new furniture">
      <b-form id="furniture-add-form" @submit.prevent="onSubmit">
        <b-form-group
          id="input-group-1"
          label="Name:"
          label-for="input-1"
        >
          <b-form-input
            id="input-1"
            v-model="name"
            type="text"
            placeholder="Enter name for furniture"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-2"
          label="Price:"
          label-for="input-2"
        >
          <b-form-input
            id="input-1"
            v-model="price"
            type="text"
            placeholder="Enter price for furniture"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-select @change="selectChanged" v-model="selectedFurniture">
          <b-form-select-option v-for="item in keys" :value="item">{{
              item
            }}
          </b-form-select-option>
        </b-form-select>
        <div v-for="item in values">
          <p> {{ item.attribute }}</p>
          <div v-if="item.values.includes('bool')">
            <b-form-radio :name="'radio-' + selectedFurniture + '-' + item.attribute"
                          value="No preference">
              No preference
            </b-form-radio>
            <b-form-radio :name="'radio-' + selectedFurniture + '-' + item.attribute" value="Yes">
              Yes
            </b-form-radio>
            <b-form-radio :name="'radio-' + selectedFurniture + '-' + item.attribute" value="No">
              No
            </b-form-radio>
          </div>
          <div v-else-if="item.values.includes('fixed')">
            <b-form-radio :name="'radio-' + selectedFurniture + '-' + item.attribute"
                          value="No preference">
              No preference
            </b-form-radio>
            <b-form-radio :name="'radio-' + selectedFurniture + '-' + item.attribute"
                          value="Fixed">
              Fixed
            </b-form-radio>
            <b-form-radio :name="'radio-' + selectedFurniture + '-' + item.attribute"
                          value="Range">Range
            </b-form-radio>

            <b-form-input
              :id="'input-' + selectedFurniture + '-' + item.attribute"
              type="text">
            </b-form-input>
          </div>
          <div v-else>
            <b-form-select :id="'select-' + selectedFurniture + '-' + item.attribute">
              <b-form-select-option v-for="itemValue in item.values" :value="itemValue">
                {{ itemValue }}
              </b-form-select-option>
            </b-form-select>
          </div>
        </div>
        <b-button type="submit" variant="primary">Submit</b-button>
      </b-form>
    </b-card>
  </Layout>
</template>

<script>
import ServiceFurniture from "@/services/ServiceFurniture";
import Layout from "@/views/Layout.vue";

export default {
  name: "AddNewFurniture",
  components: {Layout},
  data() {
    return {
      selectedFurniture: null,
      keys: [],
      values: [],
      furniture: [],
      name: '',
      price: 0,
    };
  },
  methods: {
    selectChanged() {
      this.values = [];
      const indexKeys = Object.keys(this.furniture[this.selectedFurniture]);
      for (const attribute of indexKeys) {
        const options = this.furniture[this.selectedFurniture][attribute];
        options.unshift("No preferences");
        this.values.push({'attribute': attribute, 'values': options});
      }
    },
    async getFurnitureDetails() {
      await ServiceFurniture.getFurnitureDetails().then((response) => {
        if (response && response.data) {
          this.furniture = response.data;
          this.keys = Object.keys(this.furniture);
        }
      });
    },
    async onSubmit() {
      const form = document.getElementById('furniture-add-form');
      const selects = form.querySelectorAll('select');
      let furnitureDetails = {};

      selects.forEach(function (select, index) {
        if (index > 0) {
          const attributeName = select.id.split('-')[2];
          const indexOpts = select.options.selectedIndex;
          furnitureDetails[attributeName] = select.options[indexOpts].value;
        }
      })
      const furniture = {price: this.price, name: this.name, furnitureType: this.selectedFurniture, details: furnitureDetails};
      ServiceFurniture.saveFurniture(furniture).then((response) => {

      });
    },
  },
  async created() {
    await this.getFurnitureDetails();
  }
};
</script>

<style scoped>

</style>
