import { useRef, useState } from 'react'
import { Keyboard, TextInput } from 'react-native'
import { useApiServiceMutation } from 'shared/api'
import { LoginResponse } from '../types/auth'
import { usePasswordStrenth } from './password'
import { EmailRegEx } from '../constants/regex'

interface Payload {
  email: string
  firstname: string
  lastname: string
  password: string
  repeatPassword: string
}

interface Errors {
  email: boolean
  firstname: boolean
  lastname: boolean
  password: boolean
  repeatPassword: boolean
}

interface Props {
  onSuccess: () => void
}

export const useRegister = (props: Props) => {
  const { onSuccess } = props
  const [apiService, { isLoading: loading }] = useApiServiceMutation()
  const emailRef = useRef<TextInput>(null)
  const passwordRef = useRef<TextInput>(null)
  const repeatPasswordRef = useRef<TextInput>(null)
  const firstnameRef = useRef<TextInput>(null)
  const lastnameRef = useRef<TextInput>(null)
  const [payload, setPayload] = useState<Payload>({
    email: '',
    password: '',
    firstname: '',
    lastname: '',
    repeatPassword: '',
  })
  const { valid, validations } = usePasswordStrenth(payload.password)
  const [errors, setErrors] = useState<Errors>({
    email: false,
    password: false,
    firstname: false,
    lastname: false,
    repeatPassword: false,
  })
  const [errorMessage, setErrorMessage] = useState<string>()
  const changeValue = (key: keyof Payload, value: string) => {
    setPayload(current => ({
      ...current,
      [key]: value,
    }))
  }
  const register = async () => {
    setErrorMessage('')
    setErrors({
      email: false,
      password: false,
      firstname: false,
      lastname: false,
      repeatPassword: false,
    })
    if (!payload.firstname) {
      setErrors(current => ({ ...current, firstname: true }))
      firstnameRef.current?.focus()
      return
    }
    if (!payload.lastname) {
      setErrors(current => ({ ...current, lastname: true }))
      lastnameRef.current?.focus()
      return
    }
    if (!payload.email || !EmailRegEx.test(payload.email)) {
      setErrors(current => ({ ...current, email: true }))
      emailRef.current?.focus()
      return
    }
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
    try {
      const { email, password, firstname, lastname } = payload
      await apiService({
        method: 'POST',
        url: 'auth/register',
        body: {
          email,
          password,
          firstname,
          lastname,
        },
      }).unwrap()
      onSuccess()
    } catch (error: any) {
      setErrorMessage(error?.data?.error?.message ?? 'Error de registro.')
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
    register,
  }
}
