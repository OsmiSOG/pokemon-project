<template>
  <v-container>
    <v-card>
      <v-card-title>Register</v-card-title>
      <v-card-subtitle
        >If your want see a pokemon you need to account, please Register</v-card-subtitle
      >
      <v-divider></v-divider>
      <br>
      <v-card-text>
        <form @submit.prevent="sendRegister">
          <label for="email">Name:</label>
          <input
            class="box-input"
            v-model="name"
            type="text"
            placeholder="Jhon Due"
            required
          />
          <br>
          <br>
          <label for="email">Email:</label>
          <input
            class="box-input"
            v-model.trim="email"
            type="email"
            placeholder="example@email.com"
            required
          />
          <br><br>
          <label for="password">Password</label>
          <input class="box-input" v-model="password" type="password" required />
          <br><br><br>
          <v-btn type="submit">Register</v-btn>
        </form>
        <br>
        <div>
          <p>You have account</p>
          <router-link to="/login">Login Here</router-link>
        </div>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    name: '',
    email: '',
    password: ''
  }),
  methods: {
    redirect () {
      this.$router.push({ name: 'Landing' })
    },
    resetData () {
      this.name = ''
      this.email = ''
      this.password = ''
    },
    async sendRegister () {
      try {
        await this.$store.dispatch('user/doRegister', {
          name: this.name,
          email: this.email,
          password: this.password
        })
        this.resetData()
        this.redirect()
      } catch (error) {
        alert(error.message)
        console.error(error)
      }
    }
  }
}
</script>

<style>
.box-input {
    font-size: 25pt;
    display: block;
    width: 80%;
    border-radius: 5px;
    background-color: lightgray;
    margin: 1;
}

label {
    font-size: 15pt;
}
</style>
