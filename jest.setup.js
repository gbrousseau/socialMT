// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'

// Reset all mocks between tests
beforeEach(() => {
  jest.resetModules()
  jest.clearAllMocks()
}) 