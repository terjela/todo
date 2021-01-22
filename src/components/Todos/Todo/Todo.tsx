import { Todo as TodoType } from "../../../hooks/useTodos";
import { Button } from "../../Button/Button";
import styles from "./Todo.module.css";

interface Props {
  todo: TodoType;
  removeTodo(id: string): void;
  completeTodo(id: string): void;
}

export const Todo = ({ todo, removeTodo, completeTodo }: Props) => (
  <li className={styles.todo}>
    <span className={todo.completed ? styles.completed : undefined}>
      {todo.text}
    </span>
    <div className={styles.buttons}>
      {!todo.completed && (
        <Button onClick={() => completeTodo(todo.id)}>UTFØR</Button>
      )}

      <Button onClick={() => removeTodo(todo.id)}>SLETT</Button>
    </div>
  </li>
);
