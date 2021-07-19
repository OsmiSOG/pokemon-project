<template>
  <h1 class="text-center">Pokemones</h1>
  <v-container>
    <v-row>
      <v-col cols="6" md="3" v-for="(pok, index) in pokemons" :key="index">
        <ItemPokemon v-bind:pokemon="pok"/>
      </v-col>
    </v-row>
  </v-container>
  <v-container>
    <v-btn @click="getPokemons">More Pokemons ...</v-btn>
  </v-container>
</template>

<script>
// @ is an alias to /src
import ItemPokemon from '@/components/ItemPokemon.vue'

export default {
  name: 'LandingPokemons',
  components: {
    ItemPokemon
  },
  data: () => ({
    pokemons: [],
    limit: 20,
    offset: 0
  }),
  methods: {
    async getPokemons () {
      fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${this.offset}&limit=${this.limit}`, {
        method: 'GET'
      }).then(response => response.json()).then(data => {
        data.results.forEach(pokemon => {
          this.pokemons.push(pokemon)
        })
        this.offset = this.offset + this.limit
        console.log(this.offset, this.limit)
      })
    }
  },
  async created () {
    await this.getPokemons()
  }
}
</script>
