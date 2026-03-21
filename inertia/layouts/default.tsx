import { Data } from '@generated/data'
import { toast, Toaster } from 'sonner'
import { usePage } from '@inertiajs/react'
import { ReactElement, useEffect } from 'react'
import { Form, Link } from '@adonisjs/inertia/react'

import TrceLogo from '~/images/trce-logo.svg'

const unheaderedPages: string[] = ['/login']

export default function Layout({ children }: { children: ReactElement<Data.SharedProps> }) {
  useEffect(() => {
    toast.dismiss()
  }, [usePage().url])

  if (children.props.flash.error) {
    toast.error(children.props.flash.error)
  }

  return (
    <>
      {!unheaderedPages.includes(usePage().url) && (
        <header>
          <div>
            <div>
              <Link route="home">
                <img src={TrceLogo} />
              </Link>
            </div>
            <div>
              <nav>
                {children.props.user ? (
                  <>
                    <span>{children.props.user.initials}</span>
                    <Form route="session.destroy">
                      <button type="submit">Logout</button>
                    </Form>
                  </>
                ) : (
                  <>
                    <Link route="new_account.create">Signup</Link>
                    <Link route="session.create">Login</Link>
                  </>
                )}
              </nav>
            </div>
          </div>
        </header>
      )}
      <main>{children}</main>
      <Toaster position="top-center" richColors />
    </>
  )
}
