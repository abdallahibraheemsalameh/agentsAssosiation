<template>
  <v-container>
    <v-card color="grey lighten-5" class="card py-9" flat>
      <!-- <v-card-title>Log in </v-card-title> -->
      <v-layout md6 row justify-center>
        <v-flex xs11 md9 class="mb-3">
          <v-card-title class="d-flex justify-center">Sign up </v-card-title>
        </v-flex>

        <v-flex xs11 md9 class="mb-3">
          <v-text-field
            v-model="name"
            :error-messages="nameErrors"
            :counter="3"
            label="Name"
            required
            @input="$v.name.$touch()"
            @blur="$v.name.$touch()"
          ></v-text-field>
        </v-flex>

        <v-flex xs11 md9 class="mb-3">
          <v-text-field
            v-model="email"
            :error-messages="emailErrors"
            label="E-mail"
            required
            @input="$v.email.$touch()"
            @blur="$v.email.$touch()"
          ></v-text-field>
        </v-flex>

        <v-flex xs11 md9 class="mb-3">
          <v-text-field
            v-model="password"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]"
            :type="show1 ? 'text' : 'password'"
            name="input-10-1"
            label="password"
            hint="At least 8 characters"
            counter
            @click:append="show1 = !show1"
          ></v-text-field>
        </v-flex>

        <v-flex xs11 md9 class="mt-3">
          <div class="d-flex justify-end">
            <v-btn class="mr-4" @click="clear"> clear </v-btn>
            <v-btn @click="Signup"> Signup </v-btn>
          </div>
        </v-flex>

        <v-flex xs12 md9 class="mt-3" justify-center>
          <span class="d-flex justify-center"
            >Already Have an Account? <a href="Login">Login</a></span
          >
        </v-flex>
      </v-layout>
    </v-card>
  </v-container>
</template>

<!-- <template>
  <v-card>
    <v-form>
      <v-container fluid>
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="name"
              :error-messages="nameErrors"
              :counter="3"
              label="Name"
              required
              @input="$v.name.$touch()"
              @blur="$v.name.$touch()"
            ></v-text-field>
            <v-text-field
              v-model="email"
              :error-messages="emailErrors"
              label="E-mail"
              required
              @input="$v.email.$touch()"
              @blur="$v.email.$touch()"
            ></v-text-field>

            <v-text-field
              v-model="password"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required, rules.min]"
              :type="show1 ? 'text' : 'password'"
              name="input-10-1"
              label="password"
              hint="At least 8 characters"
              counter
              @click:append="show1 = !show1"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-btn class="mr-4" @click="Signup"> Signup </v-btn>
        <v-btn @click="clear"> clear </v-btn>
        <span>Already Have an Account? <a href="Login">Login</a></span>
      </v-container>
    </v-form>
  </v-card>
</template> -->

<script>
import axios from "axios";

import { validationMixin } from "vuelidate";
import { required, maxLength, email } from "vuelidate/lib/validators";
export default {
  mixins: [validationMixin],

  validations: {
    name: { required, maxLength: maxLength(10) },
    email: { required, email },
    select: { required },
    checkbox: {
      checked(val) {
        return val;
      },
    },
  },
  data() {
    return {
      name: "",
      email: "",
      show1: false,
      password: "",
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 8 || "Min 8 characters",
        emailMatch: () => `The email and password you entered don't match`,
      },
    };
  },
  methods: {
    async Signup() {
      if (
        this.name.trim() !== "" &&
        this.email.trim() !== "" &&
        this.password.trim() !== ""
      ) {
        const response = await axios.post("http://localhost:5000/Signup", {
          name: this.name.trim(),
          email: this.email,
          password: this.password,
        });

        console.log(response);
        if (response.status != 201) {
          alert(`${response.data.msg}`);
          return;
        } else {
          alert("Successfully Created");
          this.$router.push({ path: "Login" });
        }
      } else {
        alert("Please enter data");
        return;
      }
    },
    submit() {
      this.$v.$touch();
    },
    clear() {
      this.$v.$reset();
      this.name = "";
      this.email = "";
      this.password = "";
    },
  },
  computed: {
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.maxLength &&
        errors.push("Name must be at most 10 characters long");
      !this.$v.name.required && errors.push("Name is required.");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Must be valid e-mail");
      !this.$v.email.required && errors.push("E-mail is required");
      return errors;
    },
  },
};
</script>

<style scoped>
.card {
  /* height: 70%; */
  margin: 15% 20%;
}
@media only screen and (max-width: 768px) {
  .card {
    margin: 0 !important;
  }
  .login {
    font-size: 22px;
  }
}
</style>
