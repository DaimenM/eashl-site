import { toast } from "sonner"

type ToastProps = {
    variant?: 'default' | 'destructive' | 'success' | 'error' | 'info' | 'warning'
  title?: string
  description: string
  type?: 'success' | 'error' | 'info' | 'warning'
}

export function useToast() {
  const showToast = ({ title, description, type = 'info' }: ToastProps) => {
    switch (type) {
      case 'success':
        toast.success(description, {
        description: title,
        })
        break
      case 'error':
        toast.error(description, {
        description: title,
        })
        break
      case 'warning':
        toast.warning(description, {
        description: title,
        })
        break
      default:
        toast(description, {
        description: title,
        })
    }
  }

  return { toast: showToast }
}