const oplog = require('../model/oplog');
const utils = require('../common/utils');

module.exports = function (app) {
  app.express.request.oplog = function (data, appendDetail = true) {
    const user = this.user || this.session.user;
    const clusterCode = this.query.clusterCode || this.body.clusterCode ||
     '_system_manage';

    oplog.add({
      time: Date.now(),
      username: user.name,
      socket: {
        address: utils.getIp(this),
      },
      clusterCode,
      detail: appendDetail ? {
        originalUrl: this.originalUrl,
        params: this.params,
        query: this.query,
        body: this.body
      } : {},
      ...data
    });
  };
};
