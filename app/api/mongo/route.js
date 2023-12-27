import { MongoClient } from "mongodb"
import { NextResponse } from "next/server"

export async function GET(request) {
    return NextResponse.json({"a": 34})
}

// Replace the uri string with your connection string.
const uri = "mongodb+srv://durgeshkavate7128:Abys0cEZXEfSyUPG@mongodb-cluster.tkspjjv.mongodb.net/";

const client = new MongoClient(uri);

async function run() {
  try {
    const database = client.db('sample_mflix');
    const movies = database.collection('movies');
    const query = { title: 'Back to the Future' };
    const movie = await movies.findOne(query);

    console.log(movie);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);