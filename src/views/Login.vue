<template>
  <v-container>
    <v-card>
      <v-card-title>Login</v-card-title>
      <v-card-subtitle
        >If your want see a pokemon, please login</v-card-subtitle
      >
      <v-divider></v-divider>
      <br>
      <v-card-text>
        <form @submit.prevent="sendLogin">
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
          <input class="box-input " v-model="password" type="password" required />
          <br><br><br>
          <v-btn type="submit">Login</v-btn>
        </form>
        <br>
        <div>
          <p>You don't have account</p>
          <router-link to="/register">Register Here</router-link>
        </div>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    email: '',
    password: '',
    toRoute: ''
  }),
  methods: {
    redirect () {
      this.$watch(
        () => this.$route.query,
        async () => {
          if (await this.$route.query.redirect !== undefined) {
            this.$router.push(this.$route.query.redirect)
          } else {
            this.$router.push('/')
          }
        },
        // fetch the data when the view is created and the data is
        // already being observed
        { immediate: true }
      )
    },
    resetData () {
      this.email = ''
      this.password = ''
      this.toRoute = ''
    },
    async sendLogin () {
      try {
        await this.$store.dispatch('user/doLogin', {
          email: this.email,
          password: this.password
        })
        this.resetData()
        this.redirect()
      } catch (error) {
        alert(error.message)
        console.log(error)
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
