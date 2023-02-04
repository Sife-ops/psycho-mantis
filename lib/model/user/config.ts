import { Table } from "@serverless-stack/node/table";
import { Client } from "../dynamo";
import { EntityConfiguration } from "electrodb";

export const Configuration: EntityConfiguration = {
  table: Table["user-db"].tableName,
  client: Client,
};
