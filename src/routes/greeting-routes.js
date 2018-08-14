'use strict';
import DefaultRouter from './default-routes';

class GreetingRoutes extends DefaultRouter {
  constructor(conf, greetController) {
    super(conf);
    if (!greetController) {
      throw new Error('Fail to contruct GreetingRoutes - Invalid controller');
    }
    this.validateController(greetController);
    this.controller = greetController;
  }

  validateController(controller) {
    if (!controller.sayHello) {
      throw new Error('Fail to contruct GreetingRoutes - Given controller not implementing sayHello');
    }

    if (!controller.newGreeting) {
      throw new Error('Fail to contruct GreetingRoutes - Given controller not implementing newGreeting');
    }
  }

  register(app) {
    super.register(app);
    app.route('/greet')
    .get(this.controller.sayHello)
    .post(this.controller.newGreeting);
  }
}

module.exports = GreetingRoutes;
