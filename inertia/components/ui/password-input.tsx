import { useState, useCallback, JSX } from 'react'
import { Eye, EyeClosed, Squircle, Check } from 'lucide-react'

import { Input } from '@/components/ui/input'

type StrengthLevel = {
  bar: string
  text: string
  label: string
}

type Rule = {
  key: string
  label: string
  test: (value: string) => boolean
}

export type PasswordInputProps = {
  name?: string
  showStrength?: boolean
  placeholder?: string
  onChange?: (value: string) => void
}

const LEVELS: StrengthLevel[] = [
  { bar: 'bg-red-500', text: 'text-red-500', label: 'Very weak' },
  { bar: 'bg-orange-400', text: 'text-orange-400', label: 'Weak' },
  { bar: 'bg-yellow-400', text: 'text-yellow-400', label: 'Fair' },
  { bar: 'bg-teal-600', text: 'text-teal-600', label: 'Strong' },
]

const RULES: Rule[] = [
  { key: 'len', label: '8 characters min.', test: (v) => v.length >= 8 },
  { key: 'upper', label: 'One uppercase', test: (v) => /[A-Z]/.test(v) },
  { key: 'num', label: 'One number', test: (v) => /[0-9]/.test(v) },
  { key: 'special', label: 'One special char', test: (v) => /[^A-Za-z0-9]/.test(v) },
]

export function PasswordInput({
  name = 'password',
  showStrength = false,
  placeholder = '••••••••',
  onChange,
}: PasswordInputProps): JSX.Element {
  const [value, setValue] = useState<string>('')
  const [visible, setVisible] = useState<boolean>(false)

  const score: number = RULES.filter((r) => r.test(value)).length
  const level: StrengthLevel = LEVELS[Math.max(0, score - 1)]

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      setValue(e.target.value)
      onChange?.(e.target.value)
    },
    [onChange]
  )

  const toggleVisibility = useCallback((): void => {
    setVisible((prev) => !prev)
  }, [])

  return (
    <div className="mb-4">
      <div className="relative">
        <Input
          id={name}
          type={visible ? 'text' : 'password'}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={handleChange}
          autoComplete="new-password"
          className="w-full px-3 py-2.5 pr-10 text-sm border border-gray-300 rounded-lg bg-white
                     text-gray-900 placeholder-gray-400 outline-none transition-all
                     focus:border-teal-600 focus:ring-2 focus:ring-teal-600/15"
        />
        <button
          type="button"
          onClick={toggleVisibility}
          aria-label={visible ? 'Hide password' : 'Show password'}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-teal-600 transition-colors"
        >
          {visible ? <EyeClosed size={20} /> : <Eye size={20} />}
        </button>
      </div>

      {showStrength && (
        <>
          <div className="flex gap-1 mt-2">
            {([0, 1, 2, 3] as const).map((i) => (
              <div
                key={i}
                className={`h-0.5 flex-1 rounded-full transition-all duration-300 ${
                  i < score ? level.bar : 'bg-gray-200'
                }`}
              />
            ))}
          </div>

          <p className={`text-xs mt-1 font-medium ${level.text}`}>{level.label}</p>

          <div className="grid grid-cols-2 gap-x-3 gap-y-1 mt-2.5">
            {RULES.map((rule) => {
              const met: boolean = rule.test(value)
              return (
                <div
                  key={rule.key}
                  className={`flex items-center gap-1.5 text-xs transition-colors ${
                    met ? 'text-teal-600' : 'text-gray-400'
                  }`}
                >
                  {met ? <Check size={12} /> : <Squircle size={12} />}
                  {rule.label}
                </div>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}
