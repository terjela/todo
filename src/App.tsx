import React from "react";
import * as Ably from "ably";
import { nanoid } from "nanoid";
import styles from "./App.module.css";
import { TodoList } from "./containers/TodoList/TodoList";
import { AblyProvider } from "./providers/AblyProvider";

// Inititialize Ably
const clientId = nanoid(); // Send med clientid for å ikke hente egne meldinger;
var ably = new Ably.Realtime({
  key: "GmwGng.k0pRQQ:bNFOMg1effQwtr3c",
  clientId,
});
var channel = ably.channels.get("todos");

function App() {
  return (
    <AblyProvider channel={channel} clientId={clientId}>
      <div className={styles.container}>
        <div>
          <header className={styles.header}>
            <h1>TODO</h1>
          </header>
          <main>
            <TodoList />
          </main>
        </div>
      </div>
    </AblyProvider>
  );
}

export default App;
