import { Models } from "node-appwrite";

export interface Users extends Models.Document {
   firstName: string;
   lastName: string;
   phone:string;
    email:string;
   password:string;
}