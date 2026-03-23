import { Data } from '@generated/data'
import { toast, Toaster } from 'sonner'
import { usePage } from '@inertiajs/react'
import { ReactElement, useEffect } from 'react'
import { Form, Link } from '@adonisjs/inertia/react'

import TrceLogo from '~/images/trce-logo.svg'

const unheaderedPages: string[] = ['/login', '/password/change']

export default function Layout({ children }: { children: ReactElement<Data.SharedProps> }) {
  useEffect(() => {
    toast.dismiss()
  }, [usePage().url])

  if (children.props.flash.error) {
    toast.error(children.props.flash.error)
  }

  if (children.props.flash.success) {
    toast.success(children.props.flash.success)
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
                <>
                  <span>{children.props.user?.initials}</span>
                  <Form route="session.destroy">
                    <button type="submit">Logout</button>
                  </Form>
                </>
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
