import winston from 'winston';
import winstonDaily from 'winston-daily-rotate-file';
import moment from 'moment';
import path from 'path';

const level = process.env.LOG_LEVEL || 'debug';
const rootDir = path.join(process.env.PWD, '/logs');
const instance_number = process.env.NODE_APP_INSTANCE ?  process.env.NODE_APP_INSTANCE : 0;
const logformat = winston.format.printf(info => `${info.timestamp} [${info.level}] ${info.label} ${info.message}`);

function timeStampFormat() {
  return moment().format('YYYY-MM-DD HH:mm:ss.SSS ZZ');
}

const appendTimestamp = winston.format((info) => {
  info.timestamp = `[${timeStampFormat()}]`;
  return info;
});

//winston 모듈로 만드는 로거(Logger, 로그를 출력하는 객체를 말할 때 사용하는 용어)는 transports 라는 속성 값으로 여러 개의 설정 정보를 전달 할 수 있다.
const logger = winston.createLogger({
  level: level,
  format: winston.format.combine(
    winston.format.label({label: `VM[${process.env.VM_INDEX || 1}] PROCESS[${instance_number}]`}),
    appendTimestamp(),
    logformat
  ),
  transports: [
    new (winstonDaily)({
      name: 'info-file',  //이름이 info-file인 설정 정보는 매일 새로운 파일에 로그를 기록하도록 설정
      filename: rootDir + '/server/%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      colorize: false,
      maxsize: 50000000, // 50MB를 넘어 가면 자동으로 새로운 파일을 생성되며, 이때 자동으로 분리되어 생성 되는 파일의 개수는 최대 1000개 까지 가능하다.
      maxFiles: 1000, //info 수준의 로그만 기록하도록 설정함.
      level: level,
      showLevel: true,
      prettyPrint: true,
      json: false,
      timestamp: timeStampFormat,
      label: `instance_number[${instance_number}]`
    }),
    new (winston.transports.Console)({
      name: 'debug-console',
      colorize: true,
      level: level,
      showLevel: true,
      prettyPrint: true,
      json: false,
      timestamp: timeStampFormat,
      label: `instance_number[${instance_number}]`
    })
  ],
  exceptionHandlers: [
    new (winstonDaily)({
      name: 'exception-file',
      filename: rootDir + '/exception/%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      colorize: false,
      maxsize: 50000000,
      maxFiles: 1000,
      level: 'error',
      showLevel: true,
      prettyPrint: true,
      json: false,
      timestamp: timeStampFormat,
      label: `instance_number[${instance_number}]`
    }),
    new (winston.transports.Console)({
      name: 'exception-console',
      colorize: true,
      level: level,
      showLevel: true,
      prettyPrint: true,
      json: false,
      timestamp: timeStampFormat,
      label: `instance_number[${instance_number}]`
    })
  ]
});

module.exports = logger;
