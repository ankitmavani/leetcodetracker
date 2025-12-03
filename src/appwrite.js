import { Client, Databases } from "appwrite";

const client = new Client()
  .setEndpoint("https://fra.cloud.appwrite.io/v1") // Appwrite endpoint
  .setProject("692fdfb00000ef6e8aef");             // Your project ID

export const databases = new Databases(client);

// IDs
export const DB_ID = "692fe6a6001e4f6372c2";
export const COLLECTION_ID = "questions";
export const HABIT_COLLECTION = "habit_tracker_data";