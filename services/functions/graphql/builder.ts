import SchemaBuilder from "@pothos/core";
import { lobby, user } from "@psycho-mantis/lib/model";
import DataloaderPlugin from "@pothos/plugin-dataloader";
import { Service } from "electrodb";

export const builder = new SchemaBuilder<{
  Context: {
    model: {
      lobby: Service<lobby.Model>;
      user: Service<user.Model>;
    };
  };
}>({
  plugins: [DataloaderPlugin],
});

builder.queryType({});
builder.mutationType({});
