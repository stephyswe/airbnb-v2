// removeAllCollections.js

import { MongoClient } from "mongodb";

async function removeAllCollections() {
  const uri = process.env.DATABASE_URL || "";
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db();
    const collections = ["Account", "Listing", "Reservation", "User"];

    for (const collectionName of collections) {
      await db.collection(collectionName).deleteMany({});
      console.log(`Removed all documents from ${collectionName}`);
    }

    console.log("All collections cleared successfully");
  } catch (error) {
    console.error("Error removing collections and data:", error);
  } finally {
    await client.close();
  }
}

removeAllCollections().catch(console.error);
