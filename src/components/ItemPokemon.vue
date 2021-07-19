<template>
  <v-container>
    <router-link class="text-decoration-none" :to="{name: 'Pokemon', params: {id: idPokemon}}">
      <v-card
        elevation="6"
        shaped
      >
        <v-card-text class="text-center">
          {{pokemon.name}}
        </v-card-text>
      </v-card>
    </router-link>
  </v-container>
</template>

<script>

export default {
  name: 'ItemPokemon',
  props: ['pokemon'],
  computed: {
    idPokemon () {
      const sliceUrl = this.pokemon.url.split('/')
      return sliceUrl[sliceUrl.length - 2]
    }
  }
}
</script>
