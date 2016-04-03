'use strict';

exports.port = process.env.PORT || 5000;
exports.mongodb = {
  uri: process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost:27017/homelicious'
};
exports.companyName = 'UofT';
exports.projectName = 'Homelicious';
exports.systemEmail = 'jack.tremblay001@gmail.com';
exports.cryptoKey = 'k3yb0ardc4t';
exports.loginAttempts = {
  forIp: 50,
  forIpAndUser: 7,
  logExpiration: '20m'
};
exports.requireAccountVerification = false;
exports.smtp = {
  from: {
    name: process.env.SMTP_FROM_NAME || exports.projectName +' Website',
    address: process.env.SMTP_FROM_ADDRESS || 'jack.tremblay001@gmail.com'
  },
  credentials: {
    user: process.env.SMTP_USERNAME || 'jack.tremblay001@gmail.com',
    password: process.env.SMTP_PASSWORD || '9f7ad226c9',
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    ssl: true
  }
};
exports.oauth = {
  twitter: {
    key: process.env.TWITTER_OAUTH_KEY || 'zxBKgWAZ00qN22DgbpA8plKxf',
    secret: process.env.TWITTER_OAUTH_SECRET || 'nkaf1A1YQ1pAjjaqDC4O4zpevSUT0r9IJl8RByuH7oBMxsyu8O'
  },
  facebook: {
    key: process.env.FACEBOOK_OAUTH_KEY || '1592191067764434',
    secret: process.env.FACEBOOK_OAUTH_SECRET || '94021161fcfa2c95ed7ee277c9124832'
  },
  github: {
    key: process.env.GITHUB_OAUTH_KEY || '7f3c0c444af1a6853a41',
    secret: process.env.GITHUB_OAUTH_SECRET || 'ab01add7052e33e2f7ced7338a0990871c337b69'
  },
  google: {
    key: process.env.GOOGLE_OAUTH_KEY || '729200985123-jrfetblfd0dlbsk09hiio4i7tua2fker.apps.googleusercontent.com',
    secret: process.env.GOOGLE_OAUTH_SECRET || 'ivwIlkxFJ0hmJvu2jjqsAd7u'
  },
  tumblr: {
    key: process.env.TUMBLR_OAUTH_KEY || '',
    secret: process.env.TUMBLR_OAUTH_SECRET || ''
  }
};
