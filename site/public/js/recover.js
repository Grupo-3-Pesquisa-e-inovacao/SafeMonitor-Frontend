const recoverDiv = document.getElementById("recover");

const serviceID = "";
const templateID = "";

function gerarCodigo() {
	let codigo = "";
	let caracteres =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZ" + "abcdefghijklmnopqrstuvwxyz0123456789@#$";

	for (let i = 1; i <= 6; i++) {
		let char = Math.floor(Math.random() * caracteres.length + 1);

		codigo += caracteres.charAt(char);
	}

	return codigo;
}

(function(){
	emailjs.init("gjl6RaM3oy6VIOIWcz");
 })();

let codigoRecuperacao = gerarCodigo();


function enviarCodigo() {
	let email = document.getElementById("email").value;

	if (email != "") {

		function sendMail() {
			var params = {
				name: "me",
				email: "araujoerick.n1@gmail.com",
				message: `Seu codigo de verificação é ${codigoRecuperacao}.`
			}
		}

		emailjs.send(serviceID, templateID, params).then(
			res => {
				console.log("success!")
				console.log(res)
			}
		).catch((err) => console.log(err))

		sendMail()

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
	} else {
		alert("Preencha o email.")
	}
}

function validarCodigo() {
	let validador = document.getElementById("validadorCodigo")

	if (validador == codigoRecuperacao) {
		alert("verificado!")
	} else {
		alert("codigo invalido!")
	}
}
