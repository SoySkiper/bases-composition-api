import { ref } from 'vue'
import axios from 'axios'

const usePokemon = ( pokemonId = '1') => {
    
    const pokemon = ref()
    const isLoading = ref(false)
    const errorMesage = ref()

    const searchPokemon = async() => {
        isLoading.value = true
        pokemon.value = null

        try {
            const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
            pokemon.value = data
            errorMesage.value = null

            console.log(data)
        }

         catch (error) {
            errorMesage.value = "No se pudo cargar el pokemon"
        }

        isLoading.value = false
            
    }
    searchPokemon()

    return {
        errorMesage,
        isLoading,
        pokemon,
    }
}

export default usePokemon