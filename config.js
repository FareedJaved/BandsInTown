
var cfg = {}; 

cfg.account_sid = process.env.TWILIO_ACCOUNT_SID; 
cfg.auth_token = process.env.TWILIO_AUTH_TOKEN;
cfg.twil_num = process.env.TWILIO_NUM;

// exporting the configuration object
module.exports = cfg;
