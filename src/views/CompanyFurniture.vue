<template>
  <Layout>
    <b-form-group label-size="Default" label="Select furniture type:" label-for="dropdown-1">
      <b-form-select @change="selectChanged" v-model="selectedType">
        <b-form-select-option v-for="(item,index) in furnitureTypes" :value="item">{{ item }}
        </b-form-select-option>
      </b-form-select>
    </b-form-group>
    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      aria-controls="my-table"
    ></b-pagination>

    <p class="mt-3">Furniture's row number selected to be deleted: {{ currentRow }}</p>

    <b-table
      id="my-table"
      :items="values"
      :per-page="perPage"
      :current-page="currentPage"
      @row-clicked="rowClicked"
      small
    ></b-table>

    <a href="/add-furniture">
      <b-button variant="primary">Add a new furniture</b-button>
    </a>
    <b-button variant="danger" v-b-modal.modal-delete>Delete furniture</b-button>
    <b-modal id="modal-delete" hide-footer title="Confirmation">
      <div class="text-center">
        <p>Are you sure you want to delete furniture with name "{{nameToDelete}} of type "{{selectedType}}"?</p>
      </div>
      <b-button variant="danger" @click="deleteFurniture">Yes</b-button>
      <b-button variant="secondary" @click="closeModal">No</b-button>
    </b-modal>
  </Layout>
</template>

<script>
import ServiceFurniture from "@/services/ServiceFurniture";
import Layout from "@/views/Layout.vue";
import LoadingOverlay from "@/components/LoadingOverlay.vue"
import { mapActions } from 'vuex';

export default {
  name: "CompanyUser",
  components: {Layout, LoadingOverlay},
  data() {
    return {
      furniture: [],
      furnitureTypes: [],
      selectedType: null,
      values: [],
      perPage: 5,
      currentPage: 1,
      currentRow: 1,
      nameToDelete: null,
    };
  },
  methods: {
    ...mapActions(['showLoading', 'hideLoading']),
    closeModal(){
      this.$bvModal.hide('modal-delete');
    },
    rowClicked(item, index) {
      this.currentRow = index + 1;
      this.nameToDelete = this.values[(this.currentPage - 1) * this.perPage + this.currentRow - 1].name;
      },
    selectChanged() {
      this.values = this.furniture.filter(item => {
        if (item.furnitureType === this.selectedType) {
          ['company', 'furnitureType'].forEach(field => delete item[field]);
          return true;
        }
        return false;
      });
    },
    async getFurniturePerCompany() {
      await ServiceFurniture.getFurniturePerCompany().then((response) => {
        if (response && response.data) {
          this.furniture = response.data;
          this.furnitureTypes = [...new Set(this.furniture.map(item => item.furnitureType))];
        }
      });
    },
    async deleteFurniture() {
      await ServiceFurniture.deleteFurniture(this.selectedType, this.nameToDelete).then((response) => {
        if (response && response.data) {
          alert("Furniture successfully deleted!");
        }
      });
      this.closeModal();
      location.reload();
    }
  },
  computed: {
    rows() {
      return this.values.length
    }
  },
  async created() {
    this.showLoading();
    await this.getFurniturePerCompany();
    this.hideLoading();
  },
}
</script>

<style scoped>

</style>
