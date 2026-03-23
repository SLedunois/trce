import { useState } from 'react'

import { Form } from '@adonisjs/inertia/react'
import { Shield } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { PasswordInput } from '@/components/ui/password-input'

const ChangePasswordAlert = () => (
  <Alert className="max-w-md border-teal-200 bg-teal-50 text-teal-900 dark:border-teal-900 dark:bg-teal-950 dark:text-teal-50 mb-4">
    <Shield />
    <AlertDescription>
      For security reasons, you must set a new password before continuing.
    </AlertDescription>
  </Alert>
)

export function PasswordChangeForm({ className, ...props }: React.ComponentProps<'div'>) {
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [validForm, setValidForm] = useState(true)

  const handlePassword = (_password: string) => {
    setPassword(_password)
    checkPasswordsEquality(_password, passwordConfirmation)
  }

  const handlePasswordConfirmation = (_passwordConfirmation: string) => {
    setPasswordConfirmation(_passwordConfirmation)
    checkPasswordsEquality(password, _passwordConfirmation)
  }

  const checkPasswordsEquality = (_password: string, _passwordConfirmation: string) => {
    setValidForm(_password.length >= 8 && _password == _passwordConfirmation)
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <ChangePasswordAlert />
          <CardTitle className="text-xl">Password Update</CardTitle>
          <CardDescription>Choose a strong password for your account.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form route="password_changes.update">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">New password</FieldLabel>
                <PasswordInput
                  onChange={(_password) => handlePassword(_password)}
                  showStrength={true}
                  name="password"
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="password">Confirm password</FieldLabel>
                <PasswordInput
                  onChange={(_passwordConfirmation) =>
                    handlePasswordConfirmation(_passwordConfirmation)
                  }
                  name="password_confirmation"
                />
              </Field>
              <Field>
                <Button type="submit" disabled={!validForm}>
                  Update password
                </Button>
              </Field>
            </FieldGroup>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
