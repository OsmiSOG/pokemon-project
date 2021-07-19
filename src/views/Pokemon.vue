<template>
  <v-container>
    <v-breadcrumbs :items="items">
      <template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>
  </v-container>
  <v-container class="fill-height grey lighten-3">
    <v-row row wrap align-center align="center" justify="center" class="text-center">
      <v-col></v-col>
      <v-col>
        <v-sheet
          height="70vh"
          width="110vh"
          elevation="15"
          rounded
          class="text-center"
        >
        <h1>{{pokemon.name}}</h1>
        <v-divider></v-divider>
        <div>
          <v-row>
            <v-col v-for="(sprite, index) in pokemon.sprites" :key="index" cols="3">
              <v-img
                lazy-src="https://picsum.photos/id/11/10/6"
                v-bind:src="sprite.url"
              ></v-img>
            </v-col>
          </v-row>
        </div>
        <v-divider></v-divider>
        <div>
          <v-row>
            <v-col>base experiece: {{this.pokemon.base_experience}}</v-col>
            <v-col>Weight: {{this.pokemon.weight}}</v-col>
            <v-col>height: {{this.pokemon.height}}</v-col>
          </v-row>
          <v-divider></v-divider>
          <v-row>
            <v-col max-height="400">
              <p>ABILITIES</p>
              <v-list
                v-scroll.self="onScroll"
                max-height="200"
                class="overflow-y-auto"
                v-for="(ability, index) in pokemon.abilities"
                :key="index"
              >
                <v-list-item>{{ability.ability.name}}</v-list-item>
              </v-list>
            </v-col>
            <v-col>
              <p>MOVES</p>
              <div
                v-scroll.self="onScroll"
                max-height="200"
                class="overflow-scroll content-overflow">
                <v-list
                  v-for="(move, index) in pokemon.moves"
                  :key="index"
                >
                  <v-list-item>{{move.move.name}}</v-list-item>
                </v-list>
              </div>
            </v-col>
          </v-row>
        </div>
        </v-sheet>
      </v-col>
      <v-col></v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Pokemon',
  props: ['id'],
  data: () => ({
    scrollInvoked: 0,
    items: [
      {
        text: 'Home',
        disabled: false,
        exact: true,
        link: true,
        to: { name: 'Landing' }
      },
      {
        text: 'pokemon',
        disabled: true,
        exact: true,
        link: true,
        to: { name: 'Pokemon', params: { id: 2 } }
      }
    ],
    pokemon: {
      name: '',
      base_experience: 0,
      weight: 0,
      height: 0,
      abilities: [],
      moves: [],
      sprites: []
    }
  }),
  methods: {
    onScroll () {
      this.scrollInvoked++
    }
  },
  created () {
    fetch(`https://pokeapi.co/api/v2/pokemon/${this.id}`)
      .then(response => response.json())
      .then(data => {
        this.pokemon.name = data.name
        this.pokemon.base_experience = data.base_experience
        this.pokemon.height = data.height
        this.pokemon.weight = data.weight
        data.abilities.forEach(ability => {
          this.pokemon.abilities.push(ability)
        })
        data.moves.forEach(move => {
          this.pokemon.moves.push(move)
        })
        for (const key in data.sprites) {
          if (Object.hasOwnProperty.call(data.sprites, key)) {
            if (typeof data.sprites[key] === 'string') {
              this.pokemon.sprites.push({
                name: key,
                url: data.sprites[key]
              })
            }
          }
        }
      })
  }
}
</script>

<style>

  .content-overflow {
    height: 40vh;
  }

  .overflow-scroll {
    overflow-y: scroll;
  }
</style>
