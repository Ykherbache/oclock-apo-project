import { isValueDefined } from '~/utils/core'

describe('is defined utilitary function', () => {
  it('should return true if the variable is defined', () => {
    expect(isValueDefined(1)).toBe(true)
  })
  it('should return false if the variable is not defined', () => {
    expect(isValueDefined(undefined)).toBe(false)
  })
  it('should return false if the variable is null', () => {
    expect(isValueDefined(null)).toBe(false)
  })
})
