//express as a way to express a server
import express from 'express';
import cors from 'cors';
import MongooseSession from './connections/mongoose.js';

import router_users from "./routes/routes.js";

const database = "PruebaReact"
const port = 3030;
const app = express();

app.use(express.json());
app.use(cors());

app.listen(port, () => {
   console.log(`> 🔭 Listening at: [ http://localhost:${port} ] `);
});

await MongooseSession(database)
// await MongooseSession(database).catch(console.dir);

app.use('/', router_users);
