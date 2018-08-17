import DefaultRouter from '../routes/default-routes';

class AuthInterceptor extends DefaultRouter{
  constructor(conf) {
    super(conf);
  }

  register(app) {
    if (!app) {
      throw new Error('Fail to register routes - Invalid app');
    }

    app.use('/', this.router);

    this.router.get('/', (req, res, next) => {
      if (this.authenticate(req, res)) {
        next();
      } else {
        res.status(401).json({"errMsg": "Not Authorized Authorization is required"})
      }
    });
  }

  authenticate(req, res) {
    // do something for authentication
    return true;
  }
}


module.exports = AuthInterceptor;
