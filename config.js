
var cfg = {};

// storing environment variables
cfg.account_sid = process.env.TWILIO_ACCOUNT_SID;
cfg.auth_token = process.env.TWILIO_AUTH_TOKEN;
cfg.twil_num = process.env.TWILIO_NUM;
cfg.my_num = process.env.MY_NUMBER;

// exporting the configuration object
module.exports = cfg;
