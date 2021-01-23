import styles from "./Button.module.css";

export const Button = ({
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button className={styles.button} {...props}>
    {props.children}
  </button>
);
