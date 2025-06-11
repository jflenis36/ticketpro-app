<template>
     <div class="min-h-screen flex items-center justify-center bg-gray-100">
          <form @submit.prevent="handleLogin" class="bg-white p-6 rounded shadow-md w-full max-w-sm">
               <h2 class="text-xl font-semibold mb-4">Iniciar sesión</h2>

               <InputEmail v-model="formData.email" v-model:isValid="formValidity.email" :showErrors="showErrors"
                    label="Correo electrónico" />

               <InputPassword v-model="formData.password" v-model:isValid="formValidity.password"
                    :showErrors="showErrors" label="Contraseña" />

               <button type="submit" class="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded">
                    Entrar
               </button>
          </form>
     </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import authService from '../../services/authService'
import InputEmail from '../../components/ui/InputEmail.vue'
import InputPassword from '../../components/ui/InputPassword.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const formData = ref({
     email: '',
     password: ''
})

const formValidity = ref({
     email: false,
     password: false
})

const showErrors = ref(false)

const isFormValid = computed(() =>
     Object.values(formValidity.value).every(Boolean)
)

async function handleLogin() {
     showErrors.value = true
     if (!isFormValid.value) {
          alert('Corrige los errores antes de continuar.')
          return
     }

     try {
          const response = await authService.login(formData.value)
          
          localStorage.setItem('token', response.token)
          localStorage.setItem('user', JSON.stringify(response.user))
          
          router.push('/dashboard')
     } catch (error) {
          alert(error.message || 'Credenciales incorrectas o error de red.')
     }
}
</script>
