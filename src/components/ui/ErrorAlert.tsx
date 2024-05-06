import ErrorCrossIcon from "../icons/ErrorCrossIcon"

interface ErrorAlertProps extends React.HTMLAttributes<HTMLDivElement> {
  errorMessage: string
  className?: string
}
export default function ErrorAlert({
  errorMessage,
  className,
}: ErrorAlertProps) {
  const styles = `bg-error flex gap-4 items-center py-5 px-4 text-gray-900 lg:w-[900px] md:w-[650px] w-[90%] md:text-base text-sm rounded-xl ${className}`
  return (
    <div role="alert" className={styles}>
      <ErrorCrossIcon />
      <span>{errorMessage}</span>
    </div>
  )
}
