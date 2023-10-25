import { useEffect, useState } from 'react'
import {
  OneLowerCaseAtLeastRegEx,
  OneNumericCharAtLeastRegEx,
  OneSpecialCharAtLeastRegEx,
  OneUpperCaseAtLeastRegEx,
} from '../constants/regex'

export interface PasswordValidations {
  length: boolean
  lowercase: boolean
  uppercase: boolean
  numeric: boolean
  special: boolean
}

export const usePasswordStrenth = (password: string) => {
  const [validations, setValidations] = useState<PasswordValidations>({
    length: false,
    lowercase: false,
    uppercase: false,
    numeric: false,
    special: false,
  })
  useEffect(() => {
    setValidations({
      length: password.length >= 8,
      lowercase: OneLowerCaseAtLeastRegEx.test(password),
      uppercase: OneUpperCaseAtLeastRegEx.test(password),
      numeric: OneNumericCharAtLeastRegEx.test(password),
      special: OneSpecialCharAtLeastRegEx.test(password),
    })
  }, [password])
  return {
    valid:
      validations.length &&
      validations.lowercase &&
      validations.uppercase &&
      validations.special &&
      validations.numeric,
    validations,
  }
}
