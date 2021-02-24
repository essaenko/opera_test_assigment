import * as express from 'express';
import * as path from 'path';

import { latestAction, searchAction } from './contollers/block';

const server: express.Express = express();

server.use(express.static(path.resolve("./front/build")));

server.get('/', (_, response) => {
  response.sendFile(path.resolve("./front/build/index.html"));
});

server.get('/api/block/latest', latestAction);

server.get('/api/block/:blockID', searchAction);

server.listen(process.env.PORT || 80, () => {
  console.log(`Listen port ${process.env.PORT || 80} for app`);
})