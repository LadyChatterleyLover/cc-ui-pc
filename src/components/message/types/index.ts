

export type MessageType = 'success' | 'info' | 'warning' | 'error'

export interface MessageOptions {
  message?: string,
  type?: MessageType,
  duration?: number | string
}