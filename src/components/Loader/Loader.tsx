import css from "./Loader.module.css";

interface LoaderProps {
  message: string;
}

export default function Loader({ message }: LoaderProps) {
  return message && <p className={css.text}>{message}</p>;
}
