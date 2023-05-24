import { computed, type Ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

type UseNavigationItemFunction = () => {
  isHome: Ref<boolean>
  isUser: Ref<boolean>
  isAbout: Ref<boolean>
  isAds: Ref<boolean>
  goToHome: () => Promise<void>
  goToUser: () => Promise<void>
  goToAbout: () => Promise<void>
  goToAds: () => Promise<void>
}

const useNavigationItem: UseNavigationItemFunction = () => {
  const route = useRoute()
  const router = useRouter()

  const isHome = computed(() => route.path === '/')
  const isUser = computed(() => route.path === '/user')
  const isAbout = computed(() => route.path === '/about')
  const isAds = computed(() => route.path === '/ads')

  type navigationFunction = () => Promise<void>
  const goToHome: navigationFunction = async () => {
    await router.push('/')
  }
  const goToUser: navigationFunction = async () => {
    await router.push('/user')
  }
  const goToAbout: navigationFunction = async () => {
    await router.push('/about')
  }
  const goToAds: navigationFunction = async () => {
    await router.push('/ads')
  }

  return {
    isHome,
    isUser,
    isAbout,
    isAds,
    goToHome,
    goToUser,
    goToAbout,
    goToAds
  }
}

export default useNavigationItem
