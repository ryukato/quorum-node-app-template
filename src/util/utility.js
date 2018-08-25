class Utility {
  constructor() {
    throw new Error("Utility class no instance required. Use static method");
  }

  static delay(waitTimeInMilli) {
    return new Promise(resolve => setTimeout(() => {
      resolve(new Date().getTime());
    }, waitTimeInMilli));
  }
}

module.exports = Utility;
