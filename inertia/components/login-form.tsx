import React from 'react'

import { Form, Link } from '@adonisjs/inertia/react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Message } from '@/components/ui/messages'
import { ShieldX, MailCheck } from 'lucide-react'
import { Data } from '@generated/data'

const getMessage = (flash: Data.SharedProps['flash']) => {
  if (flash?.error === 'Unauthorized access') {
    return null
  }

  if (flash?.error) {
    return <Message type="error" description={flash.error} icon={ShieldX} />
  }

  if (flash?.success) {
    return <Message type="success" description={flash.success} icon={MailCheck} />
  }

  return null
}

export function LoginForm({ className, ...props }: React.ComponentProps<'div'> & { flash: any }) {
  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>Login with your account</CardDescription>
        </CardHeader>
        <CardContent>
          {getMessage(props.flash)}
          <Form route="login.auth">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input name="email" id="email" type="email" placeholder="m@example.com" required />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Link
                    route="password.forgot.show"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password ?
                  </Link>
                </div>
                <Input id="password" type="password" name="password" required />
              </Field>
              <Field>
                <Button type="submit">Login</Button>
              </Field>
            </FieldGroup>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
