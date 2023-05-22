module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    'vue/setup-compiler-macros': true
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'standard-with-typescript',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting',
    'plugin:unicorn/recommended'
  ],
  overrides: [],
  // Vueを読み込めるようにする。eslint-plugin-vueが提供してくれている。
  parser: 'vue-eslint-parser',
  parserOptions: {
    // VueをTypescriptで使う場合は指定する必要がある。vue-eslint-parser固有のオプション
    parser: '@typescript-eslint/parser',
    // ES Modulesを使ってコードを書く場合はmoduleを指定する必要がある。
    sourceType: 'module',
    ecmaVersion: 'latest',
    project: './tsconfig.json'
  },
  plugins: ['vue'],
  rules: {}
}
