const nodemailer = require("nodemailer");
const {
  EMAIL_SERVICE,
  SENDER_EMAIL,
  SENDER_PASSWORD,
  RECEIVER_EMAIL,
} = require("../global/global");

function sendByEmail(userResponse, result) {
  const transporter = nodemailer.createTransport({
    service: EMAIL_SERVICE,
    auth: {
      user: SENDER_EMAIL,
      pass: SENDER_PASSWORD,
    },
  });

  results_to_text = "";
  result["records"].forEach((element) => {
    results_to_text =
      results_to_text +
      "\n Nombre de proyecto: " +
      element["fields"]["Project Name"] +
      "\n Nombre del Experto: " +
      element["fields"]["Expert Name"] +
      "\n Correo del experto: " +
      element["fields"]["Expert Email"] +
      "\n Descripcion del experto: " +
      element["fields"]["Expert Experience"] +
      "\n";
  });

  const mailOptions = {
    from: SENDER_EMAIL,
    to: RECEIVER_EMAIL,
    subject: `Resultados del matchmaking del proyecto ${userResponse.project_name}`,
    text: results_to_text,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.error("Error al enviar el correo:", error);
    } else {
      console.log("Correo enviado:", info.response);
    }
  });
}

module.exports = { sendByEmail };
