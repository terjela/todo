import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { DBSchema, IDBPDatabase, openDB } from "idb";
import { Todo } from "../hooks/useTodos";

const dbName = "todoList";
const storeName = "todo";

interface Props {
  children: ReactNode;
}

interface TodoDB extends DBSchema {
  todo: {
    key: string;
    value: Todo;
  };
}

interface IndexedDBContextValues {
  db?: IDBPDatabase<TodoDB>;
}

const IndexedDBContext = createContext<IndexedDBContextValues>(
  {} as IndexedDBContextValues
);

const IndexedDBProvider = ({ children }: Props) => {
  const [db, setDb] = useState<IDBPDatabase<TodoDB>>();

  useEffect(() => {
    openDB<TodoDB>(dbName, 1, {
      upgrade(db) {
        db.createObjectStore(storeName, { keyPath: "id" });
      },
    })
      .then((value) => {
        setDb(value);
      })
      .catch(() => {
        // Error handling
      });
  }, []);

  return (
    <IndexedDBContext.Provider value={{ db }}>
      {children}
    </IndexedDBContext.Provider>
  );
};

const useIndexedDB = () => useContext(IndexedDBContext);

export { IndexedDBProvider, useIndexedDB };
