import Sockette from "sockette";
import decode from "jwt-decode";
import { useEffect, useState } from "react";
import { useTypedQuery } from "@psycho-mantis/graphql/urql";
import { RoomPlayer, User } from "@psycho-mantis/graphql/genql";

export const useGame = () => {
  const [roomQueryRes, roomQueryExec] = useTypedQuery({
    query: {
      room: {
        channelId: true,
        roomId: true,
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

  const [roomPlayer, setRoomPlayer] = useState<RoomPlayer[]>();

  useEffect(() => {
    const { fetching, data } = roomQueryRes;
    if (!fetching && data) {
      console.log(roomQueryRes);
      setRoomPlayer(data.room.players as RoomPlayer[]);
    }
  }, [roomQueryRes]);

  const urlParams = new URLSearchParams(window.location.search);
  const jwt = urlParams.get("jwt");
  const { roomId } = decode<{ roomId: string }>(jwt!);
  const [ws, setWs] = useState<Sockette>();

  useEffect(() => {
    const ws = new Sockette(import.meta.env.VITE_WS_API_URL, {
      timeout: 5e3,
      maxAttempts: 10,
      onopen: (e) => {
        console.log("Connected!", e);
        setWs(ws);
        ws.json({
          action: "save-connection",
          data: { roomId },
        });
      },
      onmessage: (e) => {
        console.log("Received:", e);
        const parsedData = JSON.parse(e.data);
        switch (parsedData.action) {
          case "update-room":
            roomQueryExec({ requestPolicy: "network-only" });
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

  return {
    roomQueryRes,
    roomPlayer,
  };
};
