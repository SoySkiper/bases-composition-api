import { ref } from 'vue'
import axios from 'axios'

export default function useUsers() {
  const users = ref([])
  const isLoading = ref(true)
  const currentPage = ref(1)
  const errorMessage = ref()

  const getUsers = async (page = 1) => {
    if (page <= 0) page = 1

    isLoading.value = true

    try {
      const { data } = await axios.get('https://reqres.in/api/users', {
        params: { page }
      })

      if (data.data.length > 0) {
        users.value = data.data
        currentPage.value = page
        errorMessage.value = null
      } else {
        errorMessage.value = 'No hay más usuarios'
      }
    } catch (error) {
      errorMessage.value = 'Error al cargar los usuarios'
    } finally {
      isLoading.value = false
    }
  }

  getUsers()

  return {
    currentPage,
    errorMessage,
    isLoading,
    users,
    nextPage: () => getUsers(currentPage.value + 1),
    prevPage: () => getUsers(currentPage.value - 1)
  }
}
