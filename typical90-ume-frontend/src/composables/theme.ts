import { useTheme } from 'vuetify'
import { onMounted, nextTick, type Ref } from 'vue'

// https://vuetifyjs.com/en/api/use-theme/
interface Theme {
  current: Readonly<
    Ref<{
      readonly dark: boolean
      readonly colors: {
        readonly [x: string]: string
        readonly background: string
        readonly surface: string
        readonly primary: string
        readonly secondary: string
        readonly success: string
        readonly warning: string
        readonly error: string
        readonly info: string
        readonly 'on-background': string
        readonly 'on-surface': string
        readonly 'on-primary': string
        readonly 'on-secondary': string
        readonly 'on-success': string
        readonly 'on-warning': string
        readonly 'on-error': string
        readonly 'on-info': string
      }
      readonly variables: Readonly<Record<string, string | number>>
    }>
  >
  global: {
    name: Ref<string>
    current: Readonly<
      Ref<{
        readonly dark: boolean
        readonly colors: {
          readonly [x: string]: string
          readonly background: string
          readonly surface: string
          readonly primary: string
          readonly secondary: string
          readonly success: string
          readonly warning: string
          readonly error: string
          readonly info: string
          readonly 'on-background': string
          readonly 'on-surface': string
          readonly 'on-primary': string
          readonly 'on-secondary': string
          readonly 'on-success': string
          readonly 'on-warning': string
          readonly 'on-error': string
          readonly 'on-info': string
        }
        readonly variables: Readonly<Record<string, string | number>>
      }>
    >
  }
}

type UseThemeFunction = () => {
  theme: Theme
  toggleTheme: () => void
}

const useMyTheme: UseThemeFunction = () => {
  const theme = useTheme()

  onMounted(async () => {
    await nextTick(() => {
      if (
        localStorage['theme'] === 'dark' ||
        (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
      ) {
        document.documentElement.classList.remove('light')
        document.documentElement.classList.add('dark')
        localStorage['theme'] = 'dark'
        theme.global.name.value = 'dark'
      } else {
        document.documentElement.classList.remove('dark')
        document.documentElement.classList.add('light')
        localStorage['theme'] = 'light'
        theme.global.name.value = 'light'
      }
    })
  })

  type toggleFunction = () => void
  const toggleTheme: toggleFunction = () => {
    if (typeof theme.global.current.value.dark !== 'boolean') {
      return
    }
    if (theme.global.current.value.dark) {
      document.documentElement.classList.remove('dark')
      document.documentElement.classList.add('light')
      localStorage['theme'] = 'light'
      theme.global.name.value = 'light'
    } else {
      document.documentElement.classList.remove('light')
      document.documentElement.classList.add('dark')
      localStorage['theme'] = 'dark'
      theme.global.name.value = 'dark'
    }
  }

  return {
    theme,
    toggleTheme
  }
}

export default useMyTheme
