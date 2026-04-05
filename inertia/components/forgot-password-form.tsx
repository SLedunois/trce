import { Form } from '@adonisjs/inertia/react'
import { Hourglass } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Message } from '@/components/ui/messages'
import { Input } from '@/components/ui/input'

export function ForgotPasswordForm({ flash }: React.ComponentProps<'div'> & { flash: any }) {
  return (
    <div className={cn('flex flex-col gap-6')}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Reset password</CardTitle>
          <CardDescription>
            Enter the email associated with your account and we'll send an email with instructions
            to reset your password
          </CardDescription>
        </CardHeader>
        <CardContent>
          {flash?.error && <Message type="error" description={flash.error} icon={Hourglass} />}
          <Form route="password.forgot.store">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input name="email" id="email" type="email" placeholder="m@example.com" required />
              </Field>
              <Field>
                <Button type="submit">Send instructions</Button>
              </Field>
            </FieldGroup>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
