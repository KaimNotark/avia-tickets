module.exports = {
  // очищаем моки при каждом новом запуске
  clearMocks: true,
  // говорим откуда собирать информацию для отчета о тестировании
  collectCoverageFrom: ['src/**/*.js'],
  // указываем, где хранить отчет
  coverageDirectory: 'coverage',
  // расширения тестируемых файлов - только js
  moduleFileExtensions: ['js'],
  // где могут находиться наши тесты
  testMatch: ['**/__tests__/**/*.js?(x)', '**/?(*.)+(spec|test).js?(x)'],
  // где тесты искать не нужно
  testPathIgnorePatterns: ['\\\\node_modules\\\\'],
  // файлы, которые не нужно трансформировать
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  // какие файлы трансформировать и как (чем)
  transform: {
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$':
      'jest-transform-stub',
    '^.+\\.(js|jsx)?$': 'babel-jest'
  },
  // отображать подробный отчет в процессе тестирования
  // verbose: false,
};