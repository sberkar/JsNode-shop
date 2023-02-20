const { MailtrapClient } = require("mailtrap");

const TOKEN = "825164b15385cd385295aa0a833c9912";
const ENDPOINT = "https://send.api.mailtrap.io/";

const client = new MailtrapClient({ endpoint: ENDPOINT, token: TOKEN });

const sender = {
  email: "support@colrs.in",
  name: "Mailtrap Test",
};
const recipients = [
  {
    email: "sberkar12@gmail.com",
  }
];

client
  .send({
    from: sender,
    to: recipients,
    subject: "You are awesome!",
    text: "Congrats for sending test email with Mailtrap!",
    category: "Integration Test",
  })
  .then(response => console.log(response)).catch(e => console.log(e));