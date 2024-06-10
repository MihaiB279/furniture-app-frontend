<template>
  <div class="signup-form-container">
    <b-card header="Your profile details" class="signup-card">
      <b-form @submit.prevent="onSubmit">
        <b-form-group label="First name:" label-for="input-1">
          <b-form-input :disabled="isEditMode" id="input-1" v-model="form.firstName" type="text"
                        placeholder="Enter your first name" required
                        :state="validateField(form.firstName)"
                        @keydown.enter.prevent></b-form-input>
          <b-form-invalid-feedback :state="validateField(form.firstName)">First name is required.
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group label="Last name:" label-for="input-2">
          <b-form-input :disabled="isEditMode" id="input-2" v-model="form.lastName" type="text"
                        placeholder="Enter your last name" required
                        :state="validateField(form.lastName)"
                        @keydown.enter.prevent></b-form-input>
          <b-form-invalid-feedback :state="validateField(form.lastName)">Last name is required.
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group label="Email:" label-for="input-3">
          <b-form-input :disabled="isEditMode" id="input-3" v-model="form.email" type="email"
                        placeholder="Enter your email" required
                        :state="validateField(form.email)"
                        @keydown.enter.prevent></b-form-input>
          <b-form-invalid-feedback :state="validateField(form.email)">A valid email is required.
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group label="Username:" label-for="input-4">
          <b-form-input ref="usernameInput" :disabled="isEditMode" id="input-4"
                        v-model="form.username"
                        type="text" placeholder="Enter the username you want to use" required
                        :state="validateField(form.username) && !errors.username"
                        @keydown.enter.prevent></b-form-input>
          <b-form-invalid-feedback :state="validateField(form.username)">
            Username is required.
          </b-form-invalid-feedback>
          <b-form-text v-if="errors.username" class="text-danger">{{
              errors.username
            }}
          </b-form-text>
        </b-form-group>

        <b-form-group label="Password:" label-for="input-5" v-if="!initialUserData">
          <b-form-input id="input-5" v-model="form.password" type="password"
                        placeholder="Enter your password" required
                        :state="validatePassword()"
                        @keydown.enter.prevent></b-form-input>
          <b-form-invalid-feedback :state="validatePassword()">Password must be at least 6
            characters.
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group label="Repeat password:" label-for="input-6" v-if="!initialUserData">
          <b-form-input id="input-6" v-model="form.confirmPassword" type="password"
                        placeholder="Repeat the password" required
                        :state="validateConfirmPassword()"
                        @keydown.enter.prevent></b-form-input>
          <b-form-invalid-feedback :state="validateConfirmPassword()">Passwords must match.
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group label="Phone:" label-for="input-7">
          <b-form-input :disabled="isEditMode" id="input-7" v-model="form.phone" type="tel"
                        placeholder="Enter your phone number" required
                        :state="validatePhone()"
                        @keydown.enter.prevent></b-form-input>
          <b-form-invalid-feedback :state="validatePhone()">Phone number is required and should be
            made of exactly 10 digit numbers.
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group label="County:" label-for="input-8">
          <b-form-input id="input-8" v-model="form.county" type="text"
                        placeholder="Enter your county" required
                        @keydown.enter.prevent></b-form-input>
        </b-form-group>

        <b-form-group label="City:" label-for="input-9">
          <b-form-input id="input-9" v-model="form.city" type="text" placeholder="Enter your city"
                        required></b-form-input>
        </b-form-group>

        <b-form-group label="Street:" label-for="input-10">
          <b-form-input id="input-10" v-model="form.street" type="text"
                        placeholder="Enter your street" required
                        @keydown.enter.prevent></b-form-input>
        </b-form-group>

        <b-form-group label="Street number:" label-for="input-11">
          <b-form-input id="input-11" v-model="form.number" type="number"
                        placeholder="Enter your street number" required
                        @keydown.enter.prevent></b-form-input>
        </b-form-group>

        <b-form-group label="Building number:" label-for="input-12">
          <b-form-input id="input-12" v-model="form.buildingNumber" type="number"
                        placeholder="Enter your building number" required
                        @keydown.enter.prevent></b-form-input>
        </b-form-group>

        <b-form-group label="Apartment number:" label-for="input-12">
          <b-form-input id="input-12" v-model="form.apartmentNumber" type="number"
                        placeholder="Enter your apartmentNumber number" required
                        @keydown.enter.prevent></b-form-input>
        </b-form-group>

        <b-form-group label="Stairs:" label-for="input-13">
          <b-form-input id="input-13" v-model="form.stairs" type="text"
                        placeholder="Enter stair details" required
                        @keydown.enter.prevent></b-form-input>
        </b-form-group>

        <b-button v-if="!showCompany && !isEditMode" @click.prevent="showCompanyField" variant="info">Register as a
          company?
        </b-button>
        <transition name="fade">
          <b-form-group v-if="showCompany" label="Company you work for:" label-for="input-14">
            <b-form-select id="input-14" v-model="form.company"
                           :options="companies"
                           @change="validateField(form.company)">
              <template #first>
                <b-form-select-option value="no-company">Select company</b-form-select-option>
              </template>
            </b-form-select>
          </b-form-group>
        </transition>

        <b-button type="submit" variant="primary">Submit</b-button>
      </b-form>
    </b-card>
  </div>
</template>

<script>
import router from "@/router";
import AuthService from "@/services/AuthService";
import ServiceUser from "@/services/ServiceUser";
import LoadingOverlay from "@/components/LoadingOverlay.vue";
import { mapActions } from 'vuex';

export default {
  name: 'SignUpUserForm',
  components: LoadingOverlay,
  props: {
    initialUserData: {
      type: Object,
      default: () => null
    },
    isEditMode: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showCompany: false,
      form: {
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
        phone: '',
        firstName: '',
        lastName: '',
        county: '',
        city: '',
        street: '',
        number: null,
        buildingNumber: null,
        apartmentNumber: null,
        stairs: '',
        company: 'no-company',
      },
      companies: [],
      errors: {
        username: ''
      },
    };
  },
  watch: {
    'form.username': function (newValue, oldValue) {
      if (newValue !== oldValue && this.errors.username) {
        this.errors.username = '';
      }
    }
  },
  methods: {
    ...mapActions(['showLoading', 'hideLoading']),
    onSubmit() {
      this.clearErrors();
      if (this.isFormInvalid()) {
        alert("Please correct the highlighted errors.");
      } else {
        this.showLoading();
        const address = {
          county: this.form.county,
          city: this.form.city,
          street: this.form.street,
          number: this.form.number,
          buildingNumber: this.form.buildingNumber,
          apartmentNumber: this.form.apartmentNumber,
          stairs: this.form.stairs
        };
        const user = {
          username: this.form.username,
          password: this.form.password,
          email: this.form.email,
          phone: this.form.phone,
          firstName: this.form.firstName,
          lastName: this.form.lastName,
          address: address,
          company: this.form.company,
        }
        if (this.isEditMode) {
          ServiceUser.updateUser(user)
            .then(() => {
              router.push('/profile');
            })
            .catch(error => {
              alert("Update failed: " + error.message);
            });
        } else {
          AuthService.saveUser(user)
            .then(() => {
              router.push('/login');
            })
            .catch(error => {
              if (error.message.includes("Username")) {
                this.errors.username = error.message;
                this.$refs.usernameInput.focus();
              } else {
                alert("Registration failed: " + error.message);
              }
            });
        }
        this.hideLoading();
      }
    },
    clearErrors() {
      this.errors.username = '';
    },
    validateField(field) {
      if (typeof field === 'string') {
        return field.trim().length > 0;
      }
      return false;
    },
    validatePassword() {
      if (this.isEditMode && !this.form.password) {
        return true;
      }
      return this.form.password.length >= 6;
    },
    validatePhone() {
      if (this.isEditMode && !this.form.password) {
        return true;
      }
      return this.form.phone.length === 10 && /^[0-9]+$/.test(this.form.phone);
    },
    validateConfirmPassword() {
      if (this.isEditMode && !this.form.confirmPassword) {
        return true;
      }
      return this.form.password === this.form.confirmPassword && this.form.confirmPassword.length > 0;
    },
    isFormInvalid() {
      const requiredFields = [
        'firstName',
        'lastName',
        'email',
        'username',
        'password',
        'confirmPassword',
        'phone',
        'county',
        'city',
        'street',
        'number',
        'apartmentNumber',
        'buildingNumber',
        'stairs'
      ];

      return requiredFields.some(field => {
        if (field === 'password') {
          return !this.validatePassword();
        } else if (field === 'confirmPassword') {
          return !this.validateConfirmPassword();
        } else {
          return !this.validateField(this.form[field]);
        }
      });
    },
    showCompanyField() {
      this.showCompany = true;
      this.fetchCompanies();
    },
    fetchCompanies() {
      AuthService.getCompany().then(response => {
        this.companies = response.data;
        this.companies.unshift('no-company');
      }).catch(error => {
        console.error("Failed to fetch companies: ", error);
        this.companies = ['no-company'];
      });
    },
    initializeForm() {
      Object.keys(this.form).forEach(key => {
        if (this.initialUserData[key] !== undefined) {
          this.form[key] = this.initialUserData[key].toString();
        }
      });

      if (this.initialUserData.address) {
        this.form.county = this.initialUserData.address.county.toString();
        this.form.city = this.initialUserData.address.city.toString();
        this.form.street = this.initialUserData.address.street.toString();
        this.form.number = this.initialUserData.address.number.toString();
        this.form.buildingNumber = this.initialUserData.address.buildingNumber.toString();
        this.form.apartmentNumber = this.initialUserData.address.apartmentNumber.toString();
        this.form.stairs = this.initialUserData.address.stairs.toString();
      }

      this.showCompany = !!this.initialUserData.company && this.initialUserData.company !== 'no-company';
      if (this.showCompany) {
        this.form.company = this.initialUserData.company;
      }
    },
  },
  created() {
    if (this.initialUserData) {
      this.initializeForm();
    }
  },
  mounted() {
    this.$refs.usernameInput.focus();
  }
};
</script>

<style scoped>
.signup-form-container {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  max-width: 800px;
  margin: auto;
}

.signup-card {
  border: none;
}
</style>

