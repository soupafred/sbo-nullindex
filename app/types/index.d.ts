import type { AvatarProps } from '@nuxt/ui'

export type Period = 'daily' | 'weekly' | 'monthly'

export interface Range {
  start: Date
  end: Date
}
