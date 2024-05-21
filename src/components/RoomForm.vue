<template>
  <b-card class="mt-3" header="Room details">
    <b-form>
      <b-form-group
        id="input-group-1"
        label="Budget:"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="roomData.budget"
          type="text"
          placeholder="Enter the maximum budget allowed for this room"
          required
        ></b-form-input>
      </b-form-group>
    </b-form>
  </b-card>
</template>

<script>

export default {
  name: 'RoomForm',
  props: {
    roomName: ""
  },
  data() {
    return {
      roomData: {
        name: this.roomName,
        budget: 0,
      },
    };
  },
  watch: {
    roomData: {
      handler(newVal) {
        this.$emit('form-changed', newVal);
      },
      deep: true
    }
  }
};
</script>

<style scoped>

</style>
