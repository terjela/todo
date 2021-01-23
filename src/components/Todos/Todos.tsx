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
      {todos
        .sort((a, b) => a.created.getTime() - b.created.getTime())
        .sort((a, b) => (a.completed && !b.completed ? 1 : -1))
        .map((todo) => (
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
