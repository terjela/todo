import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import Ably from "ably";

interface Props {
  channel: Ably.Types.RealtimeChannelCallbacks;
  clientId: string;
  children: ReactNode;
}

interface AblyContextValues {
  channel: Ably.Types.RealtimeChannelCallbacks;
  clientId: string;
  connectedUsers: number;
}

const AblyContext = createContext<AblyContextValues>({} as AblyContextValues);

const AblyProvider = ({ channel, clientId, children }: Props) => {
  const [connectedUsers, setConnectedUsers] = useState(0);

  useEffect(() => {
    const subscribe = async () => {
      await channel.presence.subscribe(function (presenceMsg) {
        console.log(`${presenceMsg.clientId} connected`);
        channel.presence.get((err, members) => {
          if (members) {
            setConnectedUsers(members.length);
          }
        });
      });
    };
    subscribe();

    return () => {
      channel.unsubscribe();
    };
  });

  return (
    <AblyContext.Provider value={{ channel, clientId, connectedUsers }}>
      {children}
    </AblyContext.Provider>
  );
};

const useAbly = () => useContext(AblyContext);

export { AblyProvider, useAbly };
