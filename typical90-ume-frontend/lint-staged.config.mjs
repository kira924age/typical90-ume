// lint-staged.config.js
export default {
  '**/*.{ts,vue}': () => 'vue-tsc --noEmit',
  'src/**/*.{js,cjs,mjs,ts,mts,vue}': 'eslint --fix --no-ignore --max-warnings=0',
  'src/**/*.{css,scss}': 'stylelint --fix',
  'src/**/*': 'prettier --write --ignore-unknown'
}
