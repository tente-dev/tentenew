import { useRef, useState } from 'react'
import { Keyboard, TextInput } from 'react-native'
import { useDispatch } from 'react-redux'
import { EmailRegEx } from '../constants/regex'
import { saveUser } from '../slice/auth';

interface Payload {
  email: string
  password: string
}

interface Errors {
  email: boolean
  password: boolean
}

interface Props {
  onSuccess: () => void
}

export const useLogin = (props: Props) => {
  const { onSuccess } = props
  const dispatch = useDispatch()
  const emailRef = useRef<TextInput>(null)
  const passwordRef = useRef<TextInput>(null)
  const [payload, setPayload] = useState<Payload>({ email: '', password: '' })
  const [errors, setErrors] = useState<Errors>({
    email: false,
    password: false,
  })
  const [errorMessage, setErrorMessage] = useState<string>()

  const changeValue = (key: keyof Payload, value: string) => {
    setPayload(current => ({
      ...current,
      [key]: value,
    }))
  }

  const login = () => {
    setErrorMessage('')
    setErrors({ email: false, password: false })

    // Check for hardcoded admin login
    if (payload.email === 'admin' && payload.password === 'admin') {
      dispatch(saveUser({
        id: 123, email: 'admin',
        verified: false,
        firstname: '',
        lastname: '',
        userTypeId: 0,
        socialAuth: null
      }));
 // Guardamos un usuario ficticio
      onSuccess()
      return
    }

    if (!payload.email || !EmailRegEx.test(payload.email)) {
      setErrors(current => ({ ...current, email: true }))
      emailRef.current?.focus()
      return
    }
    if (!payload.password) {
      setErrors(current => ({ ...current, password: true }))
      passwordRef.current?.focus()
      return
    }
    Keyboard.dismiss()

    // No hay backend, por lo que puedes manejar otra lógica aquí si es necesario
    setErrorMessage('Error de autenticación.')
  }

  return {
    payload,
    refs: {
      emailRef,
      passwordRef,
    },
    errors,
    errorMessage,
    changeValue,
    login,
  }
}
