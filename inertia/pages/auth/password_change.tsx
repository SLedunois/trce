import { type InertiaProps } from '~/types'

import { PasswordChangeForm, type PasswordChangeFormProps } from '~/components/password-change-form'
import AuthLayout from '@/layouts/auth_layout'

export default function PasswordChange({ token }: InertiaProps & PasswordChangeFormProps) {
  return (
    <AuthLayout>
      <PasswordChangeForm token={token} />
    </AuthLayout>
  )
}
