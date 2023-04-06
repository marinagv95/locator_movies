import { Client } from "pg";

const client: Client = new Client({
  user: "mama_",
  host: "localhost",
  port: 5432,
  password: "wood1995",
  database: "movies_sp2",
});

const startDatabase = async (): Promise<void> => {
  await client.connect();
  console.log("Database connected");
};

export { startDatabase, client };
