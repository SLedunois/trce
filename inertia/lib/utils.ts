import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

import { Data } from '@generated/data'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isAdmin(user: Data.User | undefined) {
  return user?.role === 'admin'
}
