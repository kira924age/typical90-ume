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

/**
 * ナビゲーションアイテムを使用するためのフック関数です。
 * `useRoute` フックを使用して現在のルート情報を取得し、`useRouter` フックを使用してルーター情報を取得します。
 * 各ページへの遷移関数や現在のページの状態（真偽値）を提供します。
 *
 * @returns ナビゲーションアイテムに関連する情報と遷移関数を持つオブジェクト
 */
const useNavigationItem: UseNavigationItemFunction = () => {
  const route = useRoute()
  const router = useRouter()

  const isHome = computed(() => route.path === '/')
  const isUser = computed(() => route.path === '/user')
  const isAbout = computed(() => route.path === '/about')
  const isAds = computed(() => route.path === '/ads')

  type navigationFunction = () => Promise<void>

  /**
   * ホームページに遷移する関数です。
   * `router.push()` メソッドを使用して非同期的にホームページに遷移します。
   *
   * @remarks
   * ホームページのURLはルートパス '/' です。
   */
  const goToHome: navigationFunction = async () => {
    await router.push('/')
  }

  /**
   * ユーザーページに遷移する関数です。
   *
   * @remarks
   * 非同期操作であり、`router.push()` メソッドを使用してユーザーページに遷移します。
   * ユーザーページのURLは '/user' です。
   */
  const goToUser: navigationFunction = async () => {
    await router.push('/user')
  }

  /**
   * アバウトページに遷移する関数です。
   *
   * @remarks
   * 非同期操作であり、`router.push()` メソッドを使用してアバウトページに遷移します。
   * アバウトページのURLは '/about' です。
   */
  const goToAbout: navigationFunction = async () => {
    await router.push('/about')
  }

  /**
   * Ads ページに遷移する関数です。
   *
   * @remarks
   * 非同期操作であり、`router.push()` メソッドを使用してアバウトページに遷移します。
   * Ads ページのURLは '/ads' です。
   */
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
