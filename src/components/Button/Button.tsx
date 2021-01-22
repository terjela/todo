import styles from "./Button.module.css";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  inverse?: boolean;
}

export const Button = ({ inverse, ...props }: Props) => (
  <button className={styles.button} {...props}>
    {props.children}
  </button>
);
