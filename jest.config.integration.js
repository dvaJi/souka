'use strict';

module.exports = Object.assign({}, require('./jest.config'), {
  testMatch: ['<rootDir>/test/**/*.integration.{ts,tsx}'],
});
