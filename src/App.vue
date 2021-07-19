<template>
  <v-app>
    <v-app-bar density="compact">
      <v-app-bar-title > <router-link to="/" class="text-decoration-none">Pokemon API</router-link> </v-app-bar-title>
      <v-spacer></v-spacer>
      <v-btn text> <router-link to="/login" class="text-decoration-none">  Login </router-link></v-btn>
      <v-btn class="mr-3" text> <router-link to="/register" class="text-decoration-none"> Register </router-link></v-btn>
    </v-app-bar>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  })
}
</script>
