'use strict';

exports = module.exports = function(app, mongoose) {
  //embeddable docs first
  require('./schema/Note')(app, mongoose);
  require('./schema/Status')(app, mongoose);
  require('./schema/StatusLog')(app, mongoose);
  require('./schema/Category')(app, mongoose);

  //then regular docs
  require('./schema/User')(app, mongoose);
  require('./schema/Admin')(app, mongoose);
  require('./schema/AdminGroup')(app, mongoose);
  require('./schema/Account')(app, mongoose);
  require('./schema/LoginAttempt')(app, mongoose);
  require('./schema/Friend')(app, mongoose);
  require('./schema/Dish')(app, mongoose);
  require('./schema/Comment')(app, mongoose);
  require('./schema/Order')(app, mongoose);
  require('./schema/Msg')(app, mongoose);
};
