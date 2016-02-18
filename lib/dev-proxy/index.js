var proxy       = require('proxy-middleware');
var onHeaders   = require('on-headers');
var logger      = require('morgan');
var compression = require('compression');
var url         = require('url');
var proxyUrl    = 'http://devapi-mdrealtime.elasticbeanstalk.com/';
//var proxyUrl    = 'http://192.168.1.106:8080/';
//var proxyUrl    = 'http://192.168.0.6:8080/';

var stripCookieMetadata = function() {
  var cookieHeader = this.getHeader('set-cookie');
  if (cookieHeader && cookieHeader.map) {
    var newCookies = cookieHeader.map(function(cookie) {
      var newCookie = cookie.replace(/\s*secure\s*\;/, '');
      return newCookie;
    });

    this.setHeader('set-cookie', newCookies);
  }
};

var setup = function(app) {
  app.use(function(request, response, next) {
    onHeaders(response, stripCookieMetadata);
    next();
  });
};

module.exports = {
  name: 'dev-proxy',
  testemMiddleware: function(app) {
    setup(app);
  },
  serverMiddleware: function(options) {
    options.options.proxy = proxyUrl;
    options.app
      .use(compression())
      .use(logger('dev'));
    setup(options.app);
  }
};
