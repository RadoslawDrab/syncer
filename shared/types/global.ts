export type ObjectKeys<T> = { [key: string]: T }

export type VerticalPosition = 'top' | 'center' | 'bottom'
export type HorizontalPosition = 'left' | 'center' | 'right'
export type Position = `${VerticalPosition}-${HorizontalPosition}`