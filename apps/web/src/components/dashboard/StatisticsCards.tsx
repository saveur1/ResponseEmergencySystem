import type { LucideIcon } from 'lucide-react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const cardVariants = cva('', {
  variants: {
    variant: {
      default: 'border-border',
      fire: 'border-red-200 bg-red-50',
      assault: 'border-orange-200 bg-orange-50',
      flood: 'border-blue-200 bg-blue-50'
    }
  },
  defaultVariants: {
    variant: 'default'
  }
})

const iconVariants = cva('h-5 w-5', {
  variants: {
    variant: {
      default: 'text-foreground',
      fire: 'text-red-600',
      assault: 'text-orange-600',
      flood: 'text-blue-600'
    }
  },
  defaultVariants: {
    variant: 'default'
  }
})

interface StatCardProps extends VariantProps<typeof cardVariants> {
  title: string
  value: string | number
  icon: LucideIcon
  description?: string
  className?: string
}

export function StatCard({
  title,
  value,
  icon: Icon,
  description,
  variant,
  className
}: StatCardProps) {
  return (
    <Card className={cn(cardVariants({ variant }), className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className={cn(iconVariants({ variant }))} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </CardContent>
    </Card>
  )
}
