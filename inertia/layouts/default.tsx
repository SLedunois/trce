import { Data } from '@generated/data'
import { toast, Toaster } from 'sonner'
import { usePage } from '@inertiajs/react'
import { ReactElement, useEffect } from 'react'

import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/app-sidebar'
import { AppHeader } from '~/components/app-header'

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
      {!unheaderedPages.includes(usePage().url) ? (
        <SidebarProvider>
          <AppSidebar user={children.props.user} />
          <SidebarInset>
            <AppHeader />
            <main>{children}</main>
          </SidebarInset>
        </SidebarProvider>
      ) : (
        <main>{children}</main>
      )}

      <Toaster position="top-center" richColors />
    </>
  )
}
