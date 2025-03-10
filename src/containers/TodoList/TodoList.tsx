import React from "react";
import { nanoid } from "nanoid";
import { NewTodo } from "../../components/NewTodo/NewTodo";
import { Todos } from "../../components/Todos/Todos";
import { Todo, useTodos } from "../../hooks/useTodos";

export const TodoList = () => {
  const {
    todos,
    addTodo,
    removeTodo,
    completeTodo,
    connectedUsers,
  } = useTodos();

  const handleAddTodo = (text: string) => {
    const newTodo: Todo = { id: nanoid(), text, created: new Date() };
    addTodo(newTodo);
  };

  const handleRemoveTodo = (id: string) => {
    const todoToDelete = todos.find((todo) => todo.id === id);
    if (todoToDelete) {
      removeTodo(todoToDelete);
    }
  };

  const handleCompleteTodo = (id: string) => {
    const todoToComplete = todos.find((todo) => todo.id === id);
    if (todoToComplete) {
      completeTodo(todoToComplete);
    }
  };

  return (
    <>
      {connectedUsers > 0 && (
        <p>
          Det er {connectedUsers} {connectedUsers > 1 ? "brukere" : "bruker"}{" "}
          pålogget
        </p>
      )}

      <NewTodo addTodo={handleAddTodo} />
      <Todos
        todos={todos}
        completeTodo={handleCompleteTodo}
        removeTodo={handleRemoveTodo}
      />
    </>
  );
};
