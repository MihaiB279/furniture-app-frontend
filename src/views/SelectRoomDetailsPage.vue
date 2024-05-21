<template>
  <Layout>
    <div class="container">
      <b-card
        v-for="key in Object.keys(rooms)"
        :key="key"
        no-body
        class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button
            block
            v-b-toggle="'room-' + key"
            variant="info"
            @click="onCollapseToggle(key)">
            Room name: {{ key }}  (press to open to see details)
          </b-button>
        </b-card-header>
        <b-collapse :id="'room-' + key"
                    accordion="my-accordion" role="tabpanel">
          <RoomForm @form-changed="dataFormChanged" :roomName="key"/>
          <b-card v-for="furniture in rooms[key].furniture"
                  no-body
                  class="w-25 p-3 mb-1 bg-secondary text-light my-card">
            <b-card-header header-tag="header" class="p-1" role="tab">
              <b-button @click="deleteFurniture(key, furniture.details)" pill variant="danger">
                <b-icon icon="x-circle-fill" class="menu-icon"></b-icon>
              </b-button>
              <b-button
                block
                v-b-toggle="key + '-' + furniture.furnitureType"
                variant="info">
                {{ furniture.furnitureType }}
              </b-button>
            </b-card-header>
            <b-collapse :id="key + '-' + furniture.furnitureType"
                        :accordion="'accordion-' + key" role="tabpanel">
              {{ furniture.details }}
            </b-collapse>
          </b-card>
          <b-overlay :show="doOverlay" rounded="sm">
            <div v-if="roomsOffer[key]">
              <b-carousel
                id="carousel-1"
                v-model="slide"
                :interval="4000"
                controls
                indicators
                background="#ababab"
                style="text-shadow: 1px 1px 2px #333;"
                @sliding-start="onSlideStart"
                @sliding-end="onSlideEnd"
              >
                <!-- Text slides with image -->
                <b-carousel-slide v-for="furnitureDescription in roomsOffer[key].furniture"
                                  caption="Furniture description"
                                  img-src="https://img.freepik.com/free-photo/black-concrete-wall_24972-1046.jpg"
                >
                  <p v-if="roomsOffer[key].budget !== -1">
                    {{ furnitureDescription }}
                  </p>
                  <p v-else>
                    Sorry, we do not have a furniture to match your selection for:
                    {{ furnitureDescription.name }}
                  </p>
                </b-carousel-slide>
              </b-carousel>
              <p>
                Total: {{ roomsOffer[key].budget }}
              </p>
              <b-button @click="addToFavourite(key)">
                <b-icon icon="star" class="menu-icon"></b-icon>
                Favourites
              </b-button>
              <b-button @click="addToShoppingCart(key)">
                <b-icon icon="cart3" class="menu-icon"></b-icon>
                Shopping cart
              </b-button>
            </div>
          </b-overlay>
        </b-collapse>
      </b-card>
      <b-form-input v-model="roomName" placeholder="Enter your room name"></b-form-input>
      <b-button pill v-if="Object.keys(rooms).length > 0" variant="primary"
                v-b-toggle.furniture-selection>Add
        furniture
      </b-button>
      <b-sidebar id="furniture-selection" title="Furniture" width="40%" right shadow>
        <template #footer="{ hide }">
          <div class="d-flex bg-dark text-light align-items-center px-3 py-2">
            <b-button size="sm" @click="saveFurnitureToRoom" variant="primary">Save furniture
            </b-button>
            <b-button size="sm" @click="hide">Close</b-button>
          </div>
        </template>
        <div class="px-3 py-2">
          <p>
            Select the furniture you desire for you room. Select one from the list
            and the details for it will appear under for you to choose your preferences.
          </p>
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
        </div>
      </b-sidebar>
      <b-modal id="modal-room-name-missing"
               title="Room not selected"
               v-model="showRoomNameNotPresent">
        <p class="my-4">You need to select a room first to add a furniture to it.</p>
      </b-modal>
      <b-button
        variant="primary"
        @click="addNewRoom">
        Add a new room
      </b-button>
      <b-modal id="modal-room-name"
               title="Room name already existing"
               v-model="showAlreadyRoomModal">
        <p class="my-4">A room with the name {{roomName}} already exists, please choose another name.</p>
      </b-modal>
      <b-button
        variant="success"
        v-if="Object.keys(rooms).length > 0"
        @click="sendData">
        Save
      </b-button>
    </div>
  </Layout>
</template>

<script>
import RoomForm from '@/components/RoomForm.vue';
import Layout from '@/views/Layout.vue';
import ServiceFurniture from "@/services/ServiceFurniture";
import ServiceFavourite from "@/services/ServiceFavourite";
import ServiceShoppingCart from "@/services/ServiceShoppingCart";

export default {
  name: 'GeneratePage',
  components: {RoomForm, Layout},
  data() {
    return {
      showAlreadyRoomModal: false,
      showRoomNameNotPresent: false,
      slide: 0,
      sliding: null,
      doOverlay: false,
      rooms: {},
      roomName: '',
      furniture: [],
      keys: [],
      values: [],
      selectedFurniture: null,
      roomsOffer: {},
      currentRoom: null,
    };
  },
  methods: {
    onSlideStart(slide) {
      this.sliding = true
    },
    onSlideEnd(slide) {
      this.sliding = false
    },
    dataFormChanged(roomData) {
      if (this.rooms[roomData.name].budget !== roomData.budget) {
        this.rooms[roomData.name].budget = roomData.budget;
        delete this.rooms[roomData.name].alreadyGenerated;
      }
    },
    addNewRoom() {
      if(!(this.roomName in this.rooms)) {
        const room = {
          name: this.roomName,
          budget: 0,
          furniture: []
        };
        this.rooms[this.roomName] = room;
        this.showAlreadyRoomModal = false;
        this.$forceUpdate();
      }
      else{
        this.showAlreadyRoomModal = true;
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
    onCollapseToggle(roomName) {
      this.currentRoom = roomName;
    },
    selectChanged() {
      this.values = [];
      const indexKeys = Object.keys(this.furniture[this.selectedFurniture]);
      for (const attribute of indexKeys) {
        const options = this.furniture[this.selectedFurniture][attribute];
        options.unshift("No preferences");
        this.values.push({'attribute': attribute, 'values': options});
      }
    },
    saveFurnitureToRoom() {
      if(this.currentRoom === null){
        this.showRoomNameNotPresent = true;
        return;
      }
      this.showRoomNameNotPresent = false;
      const sideBar = document.getElementById('furniture-selection');
      const radioButtons = sideBar.querySelectorAll('input[type="radio"]');
      const inserts = sideBar.querySelectorAll('input[type="text"]');
      const selects = sideBar.querySelectorAll('select');
      let furnitureDetails = {};

      radioButtons.forEach(function (radioButton) {
        if (radioButton.checked && (radioButton.value !== 'Fixed' && radioButton.value !== 'Range')) {
          const attributeName = radioButton.name.split('-')[2];
          furnitureDetails[attributeName] = radioButton.value;
        }
      });

      inserts.forEach(function (insert) {
        const attributeName = insert.id.split('-')[2];
        furnitureDetails[attributeName] = insert.value;
      });

      selects.forEach(function (select, index) {
        if (index > 0) {
          const attributeName = select.id.split('-')[2];
          const indexOpts = select.options.selectedIndex;
          furnitureDetails[attributeName] = select.options[indexOpts].value;
        }
      })
      if (Object.keys(this.rooms).indexOf(this.currentRoom) > -1) {
        this.rooms[this.currentRoom].furniture.push({
          'furnitureType': this.selectedFurniture,
          'details': furnitureDetails
        });
      } else {
        this.rooms[this.currentRoom].furniture = [{
          'name': [this.selectedFurniture],
          'details': furnitureDetails
        }];
      }
      this.$forceUpdate();
    },
    deleteFurniture(name, furnitureDetails) {
      for (let i = 0; i < this.rooms[name].furniture.length; i++) {
        if (this.rooms[name].furniture[i]['details'] === furnitureDetails) {
          this.rooms[name].furniture.splice(i, 1);
          break;
        }
      }
      this.$forceUpdate();
    },
    async sendData() {
      this.doOverlay = true;
      await ServiceFurniture.sendFurnitureData(this.rooms).then((response) => {
        if (response && response.data) {
          this.roomsOffer = response.data;
          for (const key in this.roomsOffer) {
            const value = this.roomsOffer[key];
            if (value.budget !== -1) {
              if (Object.keys(this.rooms[key]).indexOf("alreadyGenerated") > -1) {
                this.rooms[key].alreadyGenerated.push(value.furniture);
              } else {
                this.rooms[key].alreadyGenerated = [value.furniture];
              }
            }
          }
        }
      });
      this.doOverlay = false;
    },
    addToFavourite(key) {
      const favourite = {[key]: this.roomsOffer[key]}
      ServiceFavourite.saveToFavourites(favourite).then((response) => {
        if (response && response.data) {
        }
      });
    },
    addToShoppingCart(key) {
      ServiceShoppingCart.saveToShoppingCart(this.roomsOffer[key].furniture).then((response) => {
        if (response && response.data) {
        }
      });
    }
  },
  async created() {
    await this.getFurnitureDetails();
  },
};
</script>

<style scoped>
.my-card {
  display: inline-block;
}
</style>
