import { useEffect } from "react";
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

  useEffect(() => {
    if (!lobbyQueryRes.fetching && lobbyQueryRes.data) {
      console.log(lobbyQueryRes);
    }
  }, [lobbyQueryRes]);

  return {
    lobbyQueryRes,
  };
};
