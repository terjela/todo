import { createContext, ReactNode, useContext } from "react";
import Ably from "ably";

interface Props {
  channel: Ably.Types.RealtimeChannelCallbacks;
  clientId: string;
  children: ReactNode;
}

interface AblyContextValues {
  channel: Ably.Types.RealtimeChannelCallbacks;
  clientId: string;
}

const AblyContext = createContext<AblyContextValues>({} as AblyContextValues);

const AblyProvider = ({ channel, clientId, children }: Props) => {
  return (
    <AblyContext.Provider value={{ channel, clientId }}>
      {children}
    </AblyContext.Provider>
  );
};

const useAbly = () => useContext(AblyContext);

export { AblyProvider, useAbly };
