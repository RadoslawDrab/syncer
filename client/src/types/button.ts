import { colors } from 'config/tailwind.config'

export interface ButtonStyle {
  type: ButtonType
  color: ButtonColor
}
export type ButtonType = 'default' | 'outline' | 'transparent'
export type ButtonColor = keyof typeof colors
