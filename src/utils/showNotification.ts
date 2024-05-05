import toast from "react-hot-toast"

export const showNotification = (message: string, ok: boolean) => {
  const toastConfig = {
    duration: 5000,
    position: "top-right",
    style: {
      marginTop: "50px",
    },
  }
  if (ok) {
    toast.success(message, toastConfig as any) // ta mal
  } else {
    toast.error(message, toastConfig as any) // ta mal
  }
}
