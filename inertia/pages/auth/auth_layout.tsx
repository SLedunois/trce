import TrceLogo from '~/images/trce-logo.svg'

export default function AuthLayout({ children }: { children: any }) {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col">
        <a href="#" className="flex items-center gap-2 self-center w-1/2">
          <img src={TrceLogo} />
        </a>
        {children}
      </div>
    </div>
  )
}
