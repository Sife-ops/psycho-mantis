import { useEffect, useState } from "react";
import { useGame } from "./game-hook";

import {
  RoomPlayer as RoomPlayerType,
  User as UserType,
} from "@psycho-mantis/graphql/genql";

export const useAvatar = (user: Pick<UserType, "avatar" | "userId">) => {
  const [avatar, setAvatar] = useState<string>();

  useEffect(() => {
    fetch(
      `https://cdn.discordapp.com/avatars/${user.userId}/${user.avatar}.png`
    )
      .then((res) => res.blob())
      .then((blob) => URL.createObjectURL(blob))
      .then((objUrl) => setAvatar(objUrl));
  }, []);

  return avatar;
};

export const Avatar: React.FC<{
  user: Pick<UserType, "avatar" | "userId">;
  roomPlayer?: Pick<RoomPlayerType, "team">;
}> = (props) => {
  const avatar = useAvatar(props.user);

  const size1 = {
    minWidth: "3rem",
    minHeight: "3rem",
    maxWidth: "3rem",
    maxHeight: "3rem",
  };

  const size2 = {
    minWidth: "3.1rem",
    minHeight: "3.1rem",
    maxWidth: "3.1rem",
    maxHeight: "3.1rem",
  };

  return (
    <div style={size2}>
      {avatar && (
        <div
          style={{
            borderRadius: "50%",
            backgroundColor: props.roomPlayer?.team || "springgreen",
            ...size2,
          }}
        >
          <img
            style={{
              borderRadius: "50%",
              position: "relative",
              left: "0.05rem",
              top: "0.05rem",
              ...size1,
            }}
            src={avatar}
          />
        </div>
      )}
    </div>
  );
};

export const User: React.FC<{
  user: UserType;
  roomPlayer?: Pick<RoomPlayerType, "team" | "isGm">;
}> = (props) => {
  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <Avatar user={props.user} roomPlayer={props.roomPlayer} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          paddingLeft: "0.5rem",
        }}
      >
        <div>
          {props.user.username}
          {props.roomPlayer?.isGm ? " (GM)" : ""}
        </div>
        <div>#{props.user.discriminator}</div>
      </div>
    </div>
  );
};

export const RoomPlayer: React.FC<{ roomPlayer: RoomPlayerType }> = (props) => {
  return <User user={props.roomPlayer.user} roomPlayer={props.roomPlayer} />;
};

export default function Game() {
  const game = useGame();

  return (
    <div
      style={{
        border: "1px solid red",
        display: "flex",
        flexDirection: "column",
        gap: ".5rem",
      }}
    >
      {game.roomPlayer &&
        game.roomPlayer.map((rp) => {
          return <RoomPlayer key={rp.user.userId} roomPlayer={rp} />;
        })}
      {/* <div>{JSON.stringify(game.roomQueryRes.data)}</div> */}
    </div>
  );
}
