<template>
     <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white">
          <div class="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 border border-gray-200">
               <div class="text-center mb-6">
                    <h1 class="text-3xl font-extrabold text-blue-600">TicketPro</h1>
                    <p class="text-gray-600 mt-1">Bienvenido de nuevo 👋</p>
               </div>

               <form @submit.prevent="handleLogin">
                    <InputEmail v-model="formData.email" v-model:isValid="formValidity.email" :showErrors="showErrors"
                         label="Correo electrónico" />

                    <InputPassword v-model="formData.password" v-model:isValid="formValidity.password"
                         :showErrors="showErrors" label="Contraseña" />

                    <button type="submit"
                         class="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition">
                         Iniciar sesión
                    </button>
               </form>
          </div>
     </div>
</template>


<script setup>
import { ref, computed } from 'vue'
import authService from '../../services/authService'
import InputEmail from '../../components/ui/InputEmail.vue'
import InputPassword from '../../components/ui/InputPassword.vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toast-notification'
import { useLoadingStore } from '../../store/loadingStore'

const toast = useToast()
const router = useRouter()
const loading = useLoadingStore()

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
          toast.error( 'Corrige los errores antes de continuar.' )
          return
     }

     try {
          loading.show('Iniciando sesión...')
          const response = await authService.login(formData.value)

          localStorage.setItem('token', response.token)
          localStorage.setItem('user', JSON.stringify(response.user))

          toast.success('Inicio de sesión exitoso')

          router.push('/dashboard')
     } catch (error) {
          toast.error(error.message || 'Credenciales incorrectas o error de red.')
     } finally {
          loading.hide()
     }
}
</script>
