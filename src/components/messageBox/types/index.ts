import type { VNode } from "vue"

export type MessageBoxType = '' | 'success' | 'info' | 'warning' | 'error'
export type MessageBoxComponentType = 'alert' | 'confirm' | 'prompt'

export interface MessageBoxProps {
  title?: string,
  message?: string | VNode,
  confirmButtonText?: string,
  cancelButtonText?: string,
  showConfirmButton?: boolean,
  showCancelButton?: boolean,
  type?: MessageBoxType,
  showClose?: boolean,
  componentType?: MessageBoxComponentType,
  dangerouslyUseHTMLString?: boolean,
  callback?: (action: 'confirm' | 'cancel') => void
}

