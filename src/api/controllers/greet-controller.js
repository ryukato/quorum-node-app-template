'use strict';
const greetMap = new Map();
const defaultGreet = {lang: 'us', message: 'hello'};

exports.sayHello = (req, res) => {
  const lang = req.params.lang || req.body.lang;
  const greet = greetMap.get(lang) || defaultGreet;
  return res.json(greet);
}

exports.newGreeting = (req, res) => {
  // console.log('newGreeting');
  const message = req.body.greet || req.body.message;
  const lang = req.body.lang;
  const greet = { lang: lang, message: message };
  greetMap.set(lang, greet);
  res.status(201).json(greet);
}
