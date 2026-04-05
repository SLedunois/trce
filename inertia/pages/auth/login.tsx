import AuthLayout from '@/layouts/auth_layout'
import { LoginForm } from '@/components/login-form'
import { InertiaProps } from '~/types'

export default function Login(props: InertiaProps) {
  return (
    <AuthLayout>
      <LoginForm flash={props.flash} />
    </AuthLayout>
  )
}
