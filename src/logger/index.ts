import pino from "pino";

const transport = pino.transport({
    target: 'pino-pretty',
    options: {colorize: true}
})

const log = pino({}, transport)
// const log = pino({timestamp: () => `,"time":"${dayjs().format()}"`});

export default log;