import React, { useState } from "react";
import { Button } from "../Button/Button";
import styles from "./NewTodo.module.css";

interface Props {
  addTodo(text: string): void;
}

export const NewTodo = ({ addTodo }: Props) => {
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTodo(value);
    setValue("");
  };

  const MAX_LENGTH = 34;

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.inputWrapper}>
        <input
          type="text"
          className={styles.input}
          placeholder="Legg til oppgave"
          value={value}
          onChange={(e: React.FormEvent<HTMLInputElement>) =>
            setValue(e.currentTarget.value)
          }
        />
        {value.length > 0 && (
          <Button type="submit" disabled={value.length >= MAX_LENGTH}>
            LEGG TIL
          </Button>
        )}
      </div>
      {value.length >= MAX_LENGTH && (
        <p className={styles.warning}>Oppgaveteksten er for lang!</p>
      )}
    </form>
  );
};
