import { useState } from 'react'
import { useApiServiceMutation } from 'shared/api'

export const useResendEmail = (email: string) => {
  const [apiService, { isLoading: loading }] = useApiServiceMutation()
  const [sent, setSent] = useState(false)
  const resend = async () => {
    setSent(false)
    try {
      await apiService({
        method: 'POST',
        url: 'auth/resend-activation-email',
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
    resend,
    loading,
    sent,
  }
}
