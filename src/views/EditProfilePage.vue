<template>
  <div>
    <SingUpUserForm :initial-user-data="user" :is-edit-mode="true"/>
  </div>
</template>

<script>
import SingUpUserForm from '@/components/SingUpUserForm.vue';

export default {
  name: "EditProfilePage",
  data() {
    return {
      user: {}
    };
  },
  components: { SingUpUserForm },
  created() {
    if (this.$route.query.user) {
      try {
        this.user = JSON.parse(this.$route.query.user);
      } catch (e) {
        console.error("Error parsing the user data:", e);
        this.user = {};
      }
    }
  },
};
</script>
