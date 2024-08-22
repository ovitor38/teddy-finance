/* eslint-disable */
import type { UserConfig } from '@commitlint/types'

const Configuration: UserConfig = {
  parserPreset: {
    parserOpts: {
      subjectPattern: /^(\w+)\((\w+)(-(\w+))?\): (.+)$/,
      subjectPatternErrorMsg: 'Errooor'
    }
  },
  extends: ['@commitlint/config-conventional'],
  plugins: [
    {
      rules: {
        'type-enum': (parsed, _when, expectedValues: any) => {
          const { type } = parsed
          if (!type || !expectedValues.includes(type))
            return [
              false,
              `type must be one of: \n✨ feat: Adição de nova funcionalidade \n🐛 fix": Correção de bug \n🔨 chore": Tarefas de construção e tarefas diversas \n📚 docs": Alterações na documentação \n💄 style": Mudanças de estilo que não afetam o código (espaços em branco, formatação, ponto e vírgula, etc.) \n♻️  refactor: Refatoração de código que não corrige bugs nem adiciona novas funcionalidades \n🧪 test: Adição ou modificação de testes \n⚡ perf: Melhorias de desempenho \n🚀 ci: Mudanças nas configurações e scripts de CI \n🛠️  build: Mudanças que afetam o sistema de build ou dependências externas (escopo não obrigatório)`
            ]
          return [true, '']
        }
      }
    }
  ],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'build',
        'chore',
        'ci',
        'docs',
        'feat',
        'fix',
        'perf',
        'refactor',
        'revert',
        'style',
        'test'
      ]
    ],
    'type-case': [2, 'always', 'lowerCase'],
    'type-empty': [2, 'never'],
    'scope-empty': [2, 'never'],
    'scope-case': [2, 'always', 'camel-case'],
    'subject-case': [2, 'always', 'lowerCase'],
    'subject-empty': [2, 'never']
  }
}

export default Configuration
