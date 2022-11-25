const { format } = require('date-fns');
const { v4: uuid } = require('uuid');
const fs = require('fs');

const fsPromises = require('fs').promises;
const path = require('path');

const logEvents = async (message, logName) => {
  const dateTime = `${format(new Date(), 'yyyy/MM/dd\tHH:mm:ss')}`;
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
  console.log(logItem);
  try {
    if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
      await fsPromises.mkdir(path.join(__dirname, '..', 'logs'));
    }

    // testting
    await fsPromises.appendFile(
      path.join(__dirname, '..', 'logs', logName),
      logItem
    );
  } catch (err) {
    console.log(err);
  }
};

const loggerReq = (req, res, next) => {
  let message = `${req.method}\t${req.headers.origin}\t${req.url}`;
  logEvents(message, 'reqLogs.txt');
  next();
};

module.exports = { loggerReq, logEvents };