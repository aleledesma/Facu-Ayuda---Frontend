import ErrorCrossIcon from "../icons/ErrorCrossIcon"

interface ErrorAlertProps extends React.HTMLAttributes<HTMLDivElement> {
  errorMessage: string
  className?: string
}
export default function ErrorAlert({
  errorMessage,
  className,
}: ErrorAlertProps) {
  const styles = `alert alert-error ${className}`
  return (
    <div role="alert" className={styles}>
      <ErrorCrossIcon />
      <span>{errorMessage}</span>
    </div>
  )
}
