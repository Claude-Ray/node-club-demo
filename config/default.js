'use strict';

const path = require('path');
const cache = require('koa-router-cache');
const MemoryCache = cache.MemoryCache;

module.exports = {
  port           : process.env.PORT || 3000,
  mongodb        : {
    url: 'mongodb://127.0.0.1:27017/club-demo'
  },
  schemeConf     : path.join(__dirname, './default.scheme'),
  staticCacheConf: path.join(__dirname, '../theme/public'),
  renderConf     : path.join(__dirname, '../theme/config'),
  routerConf     : 'routes',
  routerCacheConf: {
    'GET /': {
      key        : 'cache:index',
      expire     : 10 * 1000,
      get        : MemoryCache.get,
      set        : MemoryCache.set,
      destroy    : MemoryCache.destroy,
      passthrough: function* passthrough(_cache) {
        // visitors
        if (!this.session || !this.session.user) {
          if (_cache === null) {
            return {
              shouldCache: true,
              shouldPass : true,
            };
          }
          this.type = 'text/html; charset=utf-8';
          this.set('content-encoding', 'gzip');
          this.body = _cache;
          return {
            shouldCache: true,
            shouldPass : false,
          };
        }
        // users
        return {
          shouldCache: false,
          shouldPass : true,
        }
      }
    }
  }
};