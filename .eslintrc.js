module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-recommended',
    '@vue/typescript'
  ],
  rules: {
    // you can put some custom rules here
  },
  parserOptions: {
    parser: '@typescript-eslint/parser', 
    sourceType: 'module', 
    ecmaVersion: 2018, 
    ecmaFeatures : {
      jsx : false
    }
  }
}