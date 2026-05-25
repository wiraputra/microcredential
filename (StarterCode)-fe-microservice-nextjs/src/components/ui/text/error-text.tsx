interface IErrorTextProps {
  message: string;
  className?: string;
}

export default function ErrorText({
  message,
  className = "text-red-500 text-sm",
}: IErrorTextProps) {
  return <p className={className}>{message}</p>;
}
