const nodemailer = require("nodemailer");

const recoverDiv = document.getElementById("recover");

function gerarCodigo() {
	let codigo = "";
	let caracteres =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZ" + "abcdefghijklmnopqrstuvwxyz0123456789@#$";

	for (let i = 1; i <= 6; i++) {
		let char = Math.floor(Math.random() * caracteres.length + 1);

		codigo += str.charAt(char);
	}

	return codigo;
}


function enviarCodigo() {
	let email = document.getElementById("email").value;

	if (email != "") {
		("use strict");
		const nodemailer = require("nodemailer");

		const transporter = nodemailer.createTransport({
			host: "outlook.com",
			port: 465,
			secure: true,
			auth: {
				// TODO: replace `user` and `pass` values from <https://forwardemail.net>
				user: "erick.araujo@sptech.school",
				pass: "#Gf51786458802",
			},
		});

		// async..await is not allowed in global scope, must use a wrapper
		async function main() {
			// send mail with defined transport object
			const info = await transporter.sendMail({
				from: '"Fred Foo 👻" <erick.araujo@sptech.school>', // sender address
				to: `${email}`, // list of receivers
				subject: "Codigo de autenticação", // Subject line
				text: `seu codigo é ${gerarCodigo()}`, // plain text body
				html: "<b>Hello world?</b>", // html body
			});

			console.log("Message sent: %s", info.messageId);
			// Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

			//
			// NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
			//       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
			//       <https://github.com/forwardemail/preview-email>
			//
		}

		main().catch(console.error);

		recoverDiv.innerHTML = `
        <div class="box">
                <h1>Olhe seu email!</h1>
                <p>Enviamos um codigo de autentificação para ${email}</p>
            </div>

            <label class="box_form">
                <input type="text" id="validadorCodigo" placeholder="Digite o codigo (6 digitos)">
            </label>

            <button class="btt_cadastro" style="width: 100%;" onclick="validarCodigo()">
                Enviar
            </button>
        `;
	}
}
