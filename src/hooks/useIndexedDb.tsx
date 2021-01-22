import { useEffect, useState } from "react";
import { DBSchema, IDBPDatabase, openDB } from "idb";
import { Todo } from "./useTodos";

type Status = "loading" | "success" | "error";

const dbName = "todoList";
const storeName = "todo";

interface TodoDB extends DBSchema {
  todo: {
    key: string;
    value: Todo;
  };
}

export const useIndexedDb = () => {
  const [db, setDb] = useState<IDBPDatabase<TodoDB>>();
  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    openDB<TodoDB>(dbName, 1, {
      upgrade(db) {
        db.createObjectStore(storeName, { keyPath: "id" });
      },
    })
      .then((value) => {
        setDb(value);
        setStatus("success");
      })
      .catch(() => {
        setStatus("error");
      });
  }, []);

  return {
    db,
    status,
  };
};
