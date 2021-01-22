import { useEffect, useState } from "react";
import { useAbly } from "../providers/AblyProvider";
import { useIndexedDb } from "./useIndexedDb";

export interface Todo {
  id: string;
  text: string;
  completed?: boolean;
}

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const { db } = useIndexedDb();
  const { channel, clientId } = useAbly();

  const addTodo = (newTodo: Todo, skipMessage?: boolean) => {
    setTodos([...todos, newTodo]);
    db?.add("todo", newTodo);
    if (!skipMessage) {
      channel.publish("add_todo", newTodo);
    }
  };

  const removeTodo = (todoToDelete: Todo, skipMessage?: boolean) => {
    setTodos(todos.filter((todo) => todo.id !== todoToDelete.id));
    db?.delete("todo", todoToDelete.id);
    if (!skipMessage) {
      channel.publish("remove_todo", todoToDelete);
    }
  };

  const completeTodo = (todoToComplete: Todo, skipMessage?: boolean) => {
    setTodos(
      todos.map((todo) =>
        todo.id === todoToComplete.id ? { ...todo, completed: true } : todo
      )
    );
    db?.put("todo", { ...todoToComplete, completed: true });
    if (!skipMessage) {
      channel.publish("complete_todo", todoToComplete);
    }
  };

  useEffect(() => {
    db?.getAll("todo").then((todosFromIndexedDb) =>
      setTodos(todosFromIndexedDb)
    );
  }, [db]);

  useEffect(() => {
    const subscribe = async () => {
      await channel.subscribe((msg) => {
        if (msg.clientId !== clientId) {
          const todo = msg.data as Todo;
          switch (msg.name) {
            case "add_todo":
              addTodo(todo, true);
              break;
            case "remove_todo":
              removeTodo(todo, true);
              break;
            case "complete_todo":
              completeTodo(todo, true);
              db?.put("todo", { ...todo, completed: true });
              break;
            default:
              break;
          }
        }
      });
    };

    subscribe();
    return () => {
      channel.unsubscribe();
    };
  });

  return {
    todos,
    addTodo,
    removeTodo,
    completeTodo,
  };
};
