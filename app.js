'use strict';

const koa = require('koa');
const app = new koa();
const logger = require('koa-logger');
const bodyparser = require('koa-bodyparser');
const staticCache = require('koa-static-cache');
const session = require('koa-generic-session');
const MongoStore = require('koa-generic-session-mongo')
const errorhandler = require('koa-errorhandler');
const flash = require('koa-flash');
const gzip = require('koa-gzip');
const routerCache = require('koa-router-cache');
const scheme = require('koa-scheme');
const router = require('koa-frouter');
const config = require('config-lite')(__dirname);

// 避免循环依赖
const merge = require('merge-descriptors');
const core = require('./lib/core');
const renderConf = require('config.renderConf');
merge(renderConf.locals || {}, core, false);

app.keys = [renderConf.locals.$app.name];

// 中间件的加载顺序很重要
app.use(errorhandler());
app.use(bodyparser());
app.use(staticCache(confg.staticCacheConf));
app.use(logger());
app.use(session({
  store: new MongoStore(config.mongodb)
}));
app.use(flash());
app.use(scheme(config.schemeConf));
app.use(routerCache(app, config.routerCacheConf));
app.use(gzip());
app.use(render(app, renderConf));
app.use(router(app, config.routerConf));

app.listen(config.port, () => {
  console.log('Server listening on: ', config.port);
});
