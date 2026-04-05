import AuthLayout from '@/layouts/auth_layout'
import { ForgotPasswordForm } from '~/components/forgot-password-form'
import { InertiaProps } from '~/types'

export default function PasswordChange(props: InertiaProps) {
  return (
    <AuthLayout>
      <ForgotPasswordForm flash={props.flash} />
    </AuthLayout>
  )
}
