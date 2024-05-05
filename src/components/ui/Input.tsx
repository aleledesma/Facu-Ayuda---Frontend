import { UseFormRegisterReturn } from "react-hook-form"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string
  register: UseFormRegisterReturn<any>
  className?: string
}
export default function Input({
  error,
  register,
  className,
  children,
  ...props
}: InputProps) {
  const styles = `input input-bordered lg:input-md input-sm ${
    error && "input-error"
  } ${className}`
  return <input className={styles} {...props} {...register} />
}
