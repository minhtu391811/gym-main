module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  // ts 会使用类型检查，检查未使用的变量，如果不想使用 ts 的类型检查，可以启用 globals，选择忽略一些全局定义的变量
  // 定义 vue 自动引入的全局变量，防止 eslint 报错
  // globals: {
  //   defineProps: true,
  //   defineEmits: true,
  //   ref: true,
  //   watch: true,
  //   reactive: true
  // },
  // 后面的配置会覆盖前者
  extends: ['eslint:recommended', 'plugin:vue/vue3-recommended', 'plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended',],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: ['vue', '@typescript-eslint', '@typescript-eslint/eslint-plugin'],
  rules: {
    // js 处理
    'no-undef': 0, // 未命名变量不报错：当未命名变量的检查交给 ts 类型检查器时使用
    'no-unused-vars': 1, // 未使用的变量
    'comma-dangle': 0,
    'space-before-function-paren': 0, // function 前面的空格
    quotes: [
      2,
      'single',
      {
        avoidEscape: true,
        allowTemplateLiterals: true
      }
    ],
    semi: [2, 'never'],
    'no-irregular-whitespace': 2, // 不能有不规则的空格
    'eol-last': 0, // 所有文件结尾必须包括换行
    // 异步处理
    'no-promise-executor-return': 2, // 禁止 promise 中使用 return
    'no-await-in-loop': 2, // 禁止循环中使用 await
    'max-nested-callbacks': ['error', 3], // 异步最大回调数
    'no-return-await': 2,
    'prefer-promise-reject-errors': 2, // 使用 new Error 追踪错误
    // vue 错误
    'vue/no-unused-vars': 1,
    'vue/component-tags-order': 0,
    'vue/singleline-html-element-content-newline': 0,
    'vue/multiline-html-element-content-newline': 0,
    'vue/first-attribute-linebreak': 0,
    'vue/html-closing-bracket-newline': 0,
    'vue/html-indent': 0,
    'vue/no-multiple-template-root': 0,
    'vue/html-self-closing': 0,
    'vue/max-attributes-per-line': [
      1,
      {
        singleline: 5,
        multiline: 4
      }
    ],
    // ts 错误处理
    '@typescript-eslint/no-explicit-any': 1
  }
}