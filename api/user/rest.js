'use strict';

exports.get_user = function(req, res, next){
  return res.send(JSON.stringify({res.locals.user));
};
