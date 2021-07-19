<template>
  <v-app>
    <v-app-bar density="compact">
      <v-app-bar-title > <router-link to="/" class="text-decoration-none">Pokemon API</router-link> </v-app-bar-title>
      <v-spacer></v-spacer>
      <v-btn v-if="!user" text> <router-link to="/login" class="text-decoration-none">  Login </router-link></v-btn>
      <v-btn v-if="!user" class="mr-3" text> <router-link to="/register" class="text-decoration-none"> Register </router-link></v-btn>
      <v-btn @click="doLogout" v-if="user" class="mr-3" text> Logout </v-btn>
    </v-app-bar>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'App',

  data: () => ({
    //
  }),
  methods: {
    async doLogout () {
      try {
        await this.$store.dispatch('user/doLogout')
        this.$router.push({ name: 'Landing' })
      } catch (error) {
        console.error(error.message)
      }
    }
  },
  computed: {
    ...mapState('user', ['user'])
  }
}
</script>
