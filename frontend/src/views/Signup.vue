<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function goToSignup() {
  router.push('/signup')
}
</script>
