
import { Client, Account, Databases, Users } from "node-appwrite";
import { cookies } from "next/headers";
import * as sdk from "node-appwrite";


export async function createSessionClient() {
  const client = new Client()
    .setEndpoint(process.env.ENDPOINT!)
    .setProject(process.env.PROJECT_ID!);

  const session = (await cookies()).get("appwrite-session");

  if (!session || !session.value) {
    throw new Error("No session");
  }

  client.setSession(session.value);

  return {
    get account() {
      return new Account(client);
    },
    get database() {
      return new Databases(client);
    },
  };
}

export async function createAdminClient() {
  const client = new Client()
    .setEndpoint(process.env.ENDPOINT!)
    .setProject(process.env.PROJECT_ID!)
    .setKey(process.env.API_KEY!);

  return {
    get account() {
      return new Account(client);
    },
    get database() {
      return new Databases(client);
    },
    get user() {
      return new Users(client);
    }
  };
}
const client = new sdk.Client();

client.setEndpoint(process.env.ENDPOINT!).setProject(process.env.PROJECT_ID!).setKey(process.env.API_KEY!);

export const databases = new sdk.Databases(client);
export const users = new sdk.Users(client);