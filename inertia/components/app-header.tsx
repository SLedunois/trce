import { Link } from '@adonisjs/inertia/react'
import { usePage } from '@inertiajs/react'

import { SidebarTrigger } from '~/components/ui/sidebar'
import { Separator } from '~/components/ui/separator'
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '~/components/ui/breadcrumb'

export function AppHeader() {
  let items = usePage()
    .url.split('/')
    .filter((item) => item !== '' && item !== usePage().component)

  return (
    <header className="flex h-16 shrink-0 items-center gap-2">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-8" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block capitalize">
              <Link href={'/' + usePage().component}>{usePage().component}</Link>
            </BreadcrumbItem>
            {items.length > 0 && <BreadcrumbSeparator className="hidden md:block" />}
            {items.map((item) => (
              <BreadcrumbItem>
                <BreadcrumbPage>{item}</BreadcrumbPage>
              </BreadcrumbItem>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  )
}
