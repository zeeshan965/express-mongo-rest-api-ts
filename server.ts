require('./src/global')
import * as dotenv from 'dotenv';

dotenv.config();
import config from "config";
import log from "./src/logger";
import connect from "./src/db/connect";


const app = require('./src/app');
const port = config.get('port') as number;
const host = config.get('host') as string;

app.listen(port, host, () => {
    log.info(`Server listening at http://${host}:${port}`)
    connect().then(r => r).catch(e => e);
});