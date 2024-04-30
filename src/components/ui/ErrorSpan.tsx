interface ErrorSpanProps extends React.HtmlHTMLAttributes<HTMLSpanElement> {
  error?: string
}

export default function ErrorSpan({ error, ...props }: ErrorSpanProps) {
  const styles = `label-text-alt text-red-400 ${props.className}`
  return <>{error && <span className={styles}>{error}</span>}</>
}
