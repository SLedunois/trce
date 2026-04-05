import { useState } from 'react'

import { Form } from '@adonisjs/inertia/react'
import { Shield } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { PasswordInput } from '@/components/ui/password-input'
import { Message } from './ui/messages'

export type PasswordChangeFormProps = {
  token?: string
}

export function PasswordChangeForm({
  className,
  ...props
}: React.ComponentProps<'div'> & PasswordChangeFormProps) {
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
          <Message
            type="success"
            icon={Shield}
            description="For security reasons, you must set a new password before continuing."
          />
          <CardTitle className="text-xl">Password Update</CardTitle>
          <CardDescription>Choose a strong password for your account.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form route={props.token ? 'password.reset' : 'password_changes.update'}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">New password</FieldLabel>
                <PasswordInput
                  onChange={(_password) => handlePassword(_password)}
                  showStrength={true}
                  name="password"
                />
              </Field>
              {props.token && <input type="hidden" name="token" value={props.token} />}
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
