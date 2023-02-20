const { MailtrapClient } = require("mailtrap");

const TOKEN = "825164b15385cd385295aa0a833c9912";
const ENDPOINT = "https://send.api.mailtrap.io/";

const client = new MailtrapClient({ endpoint: ENDPOINT, token: TOKEN });

module.exports = client