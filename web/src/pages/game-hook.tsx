import Sockette from "sockette";
import decode from "jwt-decode";
import { useEffect, useState } from "react";
import { useTypedQuery } from "@psycho-mantis/graphql/urql";

export const useGame = () => {
  const [lobbyQueryRes, lobbyQueryExec] = useTypedQuery({
    query: {
      lobby: {
        channelId: true,
        lobbyId: true,
        gameTitle: true,
        started: true,

        players: {
          playerId: true,
          team: true,
          isGm: true,

          user: {
            avatar: true,
            discriminator: true,
            userId: true,
            username: true,
          },
        },
      },
    },
  });

  const urlParams = new URLSearchParams(window.location.search);
  const jwt = urlParams.get("jwt");
  const { lobbyId } = decode<{ lobbyId: string }>(jwt!);
  const [ws, setWs] = useState<Sockette>();

  useEffect(() => {
    console.log(import.meta.env.VITE_API_URL);

    const ws = new Sockette(import.meta.env.VITE_WS_API_URL, {
      timeout: 5e3,
      maxAttempts: 10,
      onopen: (e) => {
        console.log("Connected!", e);
        setWs(ws);
        ws.json({
          action: "save-connection",
          data: { lobbyId },
        });
      },
      onmessage: (e) => {
        console.log("Received:", e);
        const parsedData = JSON.parse(e.data);
        switch (parsedData.action) {
          case "update-lobby":
            lobbyQueryExec({ requestPolicy: "network-only" });
            break;
          default:
            break;
        }
      },
      onreconnect: (e) => console.log("Reconnecting...", e),
      onmaximum: (e) => console.log("Stop Attempting!", e),
      onclose: (e) => console.log("Closed!", e),
      onerror: (e) => console.log("Error:", e),
    });
  }, []);

  useEffect(() => {
    if (!!ws) {
      const reconnect = setInterval(() => {
        console.log("ping");
        ws.json({ action: "ping" });
      }, 60000);
      return () => clearInterval(reconnect);
    }
  }, [ws]);

  useEffect(() => {
    if (!lobbyQueryRes.fetching && lobbyQueryRes.data) {
      console.log(lobbyQueryRes);
    }
  }, [lobbyQueryRes]);

  return {
    lobbyQueryRes,
  };
};
