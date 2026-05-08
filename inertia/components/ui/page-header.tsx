import { Typography } from '~/components/ui/typography'

type PageHeaderProps = {
  title: string
  buttons?: React.ReactNode[]
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, buttons }) => (
  <div className="w-full flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6 mb-8">
    <Typography.H1>{title}</Typography.H1>
    <div className="flex flex-wrap items-center gap-2 sm:ml-auto sm:gap-3 lg:ml-0">
      {buttons?.map((button) => button)}
    </div>
  </div>
)
