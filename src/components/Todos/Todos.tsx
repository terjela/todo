import { Todo as TodoType } from "../../hooks/useTodos";
import { Todo } from "./Todo/Todo";
import styles from "./Todos.module.css";

interface Props {
  todos: TodoType[];
  removeTodo(id: string): void;
  completeTodo(id: string): void;
}

export const Todos = ({ todos, removeTodo, completeTodo }: Props) => {
  return (
    <ul className={styles.todoList}>
      {todos.map((todo) => (
        <Todo
          key={todo.id}
          todo={todo}
          removeTodo={removeTodo}
          completeTodo={completeTodo}
        />
      ))}
    </ul>
  );
};
