<template>
    <h1 v-if="!pokemon && !errorMesage"> Esperando... </h1>
    <h1 v-else-if="errorMesage"> {{ errorMesage }}</h1>
    <template v-else>
        <h3>{{ pokemon.name }}</h3>
        <img :src="pokemon.sprites.front_default" :alt="pokemon.name">
        <br>
        <router-link :to="{name: 'pokemon-search'}">Regresar</router-link>
    </template>
</template>

<script>
import { useRoute } from 'vue-router';
import usePokemon from '../composables/usePokemon'

export default {
    setup() {
        const route = useRoute()
        console.log(route.params.id)
        const { errorMesage, isLoading, pokemon } = usePokemon(route.params.id)
        return {
            errorMesage,
            isLoading,
            pokemon,
        }
    }
}

</script>
