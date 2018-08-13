const configs = {
  local: {
    port: 3000,
    logLevel: process.env.LOG_LEVEL || 'debug',
    rateLimit: {
      enable: true,
      windowMs: 10 * 60 * 1000, // 10 minutes
      max: 100, // limit each key to 100 requests per windowMs
      delayMs: 0, // disable delaying - full speed until the max limit is reached,
      headers: true,
      keyGenerator: (req) => {
        return req.ip;
      }
    },
    vm: {
      index: process.env.VM_INDEX || 1
    },
    process: {
      index: process.env.PROCESS_INDEX || 1
    }
  }
  //add more env profile

};

module.exports = configs;
