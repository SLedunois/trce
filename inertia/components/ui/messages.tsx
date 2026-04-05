import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { LucideIcon } from 'lucide-react'

type MessageProps = {
  icon: LucideIcon
  title?: string
  description?: string
  type: 'success' | 'warning' | 'error'
}

const variants = {
  success: {
    container:
      'border-teal-200 bg-teal-50 text-teal-900 dark:border-teal-900 dark:bg-teal-950 dark:text-teal-50',
    description: 'text-teal-900 dark:text-teal-50',
  },
  warning: {
    container:
      'border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-50',
    description: 'text-amber-900 dark:text-amber-50',
  },
  error: {
    container:
      'border-rose-200 bg-rose-50 text-rose-900 dark:border-rose-900 dark:bg-rose-950 dark:text-rose-50',
    description: 'text-rose-900 dark:text-rose-50',
  },
}

export const Message = (props: MessageProps) => {
  const variant = variants[props.type]

  return (
    <Alert className={`max-w-md mb-4 ${variant.container}`}>
      <props.icon />

      {props.title && <AlertTitle>{props.title}</AlertTitle>}

      {props.description && (
        <AlertDescription className={variant.description}>{props.description}</AlertDescription>
      )}
    </Alert>
  )
}
