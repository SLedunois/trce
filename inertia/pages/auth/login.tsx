import AuthLayout from '@/layouts/auth_layout'
import { LoginForm } from '@/components/login-form'

export default function Login() {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  )
}
