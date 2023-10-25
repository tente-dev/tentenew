import { useRef, useState } from 'react'
import { Keyboard, TextInput } from 'react-native'
import { useApiServiceMutation } from 'shared/api'
import { LoginResponse } from '../types/auth'
import { usePasswordStrenth } from './password'
import { EmailRegEx } from '../constants/regex'
import { useRoute } from '@react-navigation/native'
import { useShowToast } from 'shared/feedback'
import { decode } from 'base-64'

interface Payload {
  password: string
  repeatPassword: string
}

interface Errors {
  password: boolean
  repeatPassword: boolean
}

export const useResetPassword = () => {
  const route = useRoute()
  const { showToast } = useShowToast()
  const params = route.params ?? {}
  const values = (params as any)?.token
  const [apiService, { isLoading: loading }] = useApiServiceMutation()
  const emailRef = useRef<TextInput>(null)
  const passwordRef = useRef<TextInput>(null)
  const repeatPasswordRef = useRef<TextInput>(null)
  const firstnameRef = useRef<TextInput>(null)
  const lastnameRef = useRef<TextInput>(null)
  const [payload, setPayload] = useState<Payload>({
    password: '',
    repeatPassword: '',
  })
  const { valid, validations } = usePasswordStrenth(payload.password)
  const [errors, setErrors] = useState<Errors>({
    password: false,
    repeatPassword: false,
  })
  const [errorMessage, setErrorMessage] = useState<string>()
  const changeValue = (key: keyof Payload, value: string) => {
    setPayload(current => ({
      ...current,
      [key]: value,
    }))
  }
  const resetPassword = async () => {
    setErrorMessage('')
    setErrors({
      password: false,
      repeatPassword: false,
    })
    if (!payload.password || !valid) {
      setErrors(current => ({ ...current, password: true }))
      passwordRef.current?.focus()
      return
    }
    if (
      !payload.repeatPassword ||
      !(payload.password === payload.repeatPassword)
    ) {
      setErrors(current => ({ ...current, repeatPassword: true }))
      repeatPasswordRef.current?.focus()
      return
    }
    Keyboard.dismiss()
    const params = decode(values)?.replace('?', '').split('&')
    const email = params[0].replace('email=', '')
    const resetToken = params[1].replace('resetToken=', '')
    try {
      const { password } = payload
      await apiService({
        method: 'POST',
        url: 'auth/reset-password',
        body: {
          email,
          password,
          resetToken,
        },
      }).unwrap()
      showToast('success', 'Se cambio tu contraseña con exito!', email)
    } catch (error: any) {
      setErrorMessage(error?.data?.error?.message ?? 'Se produjo un error.')
      console.log(JSON.stringify(error))
    }
  }

  return {
    payload,
    refs: {
      emailRef,
      passwordRef,
      repeatPasswordRef,
      firstnameRef,
      lastnameRef,
    },
    errors,
    loading,
    errorMessage,
    validations,
    changeValue,
    resetPassword,
  }
}
