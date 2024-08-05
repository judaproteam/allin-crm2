'use client'

import * as React from 'react'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import Icon from '@/ui/Icon'

const EyeCheckbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={`peer size-4.5 shrink-0 disabled:cursor-not-allowed disabled:opacity-50
       ${className}`}
    {...props}>
    {!props.checked && <Icon name="eye-slash" type="reg" className="size-4 pointer-events-none" />}
    <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
      <Icon name="eye" type="lit" className="size-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
EyeCheckbox.displayName = CheckboxPrimitive.Root.displayName

export { EyeCheckbox }
