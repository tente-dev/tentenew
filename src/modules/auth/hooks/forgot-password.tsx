import { useRef, useState } from 'react'
import { useApiServiceMutation } from 'shared/api'
import { EmailRegEx } from '../constants/regex'
import { Keyboard, TextInput } from 'react-native'

export const useForgotPassword = () => {
  const [apiService, { isLoading: loading }] = useApiServiceMutation()
  const [sent, setSent] = useState(false)
  const [email, setEmail] = useState('')
  const [error, setError] = useState(false)
  const emailRef = useRef<TextInput>(null)
  const forgotPassword = async () => {
    if (!email || !EmailRegEx.test(email)) {
      emailRef.current?.focus()
      setError(true)
      return
    }
    setSent(false)
    setError(false)
    Keyboard.dismiss()
    try {
      await apiService({
        method: 'POST',
        url: 'auth/forgot-password',
        body: {
          email,
        },
      })
    } catch (error) {
      console.log(error)
    } finally {
      setSent(true)
    }
  }
  return {
    forgotPassword,
    setEmail,
    loading,
    sent,
    error,
    email,
    emailRef,
  }
}
