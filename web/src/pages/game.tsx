import { useTypedQuery } from "@psycho-mantis/graphql/urql";

export default function Game() {
  const [hello] = useTypedQuery({
    query: {
      hello: true,
    },
  });
  console.log(hello);

  return (
    <div>
      <div>game</div>
    </div>
  );
}
