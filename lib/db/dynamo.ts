export * as Dynamo from "./dynamo";

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

export const Client = new DynamoDBClient({});
