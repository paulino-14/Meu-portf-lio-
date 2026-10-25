/* Uso de IA: declare aqui qual ferramenta usou e para quê.
   Exemplo: "Usei o Claude para entender o erro do classList.toggle." */

const btnMenu = document.getElementById("btnMenu");
const menu = document.getElementById("menuPrincipal");
const btnTema = document.getElementById("btnTema");
const formulario = document.getElementById("formContato");

// Retorna "Bom dia", "Boa tarde" ou "Boa noite" de acordo com a hora (0 a 23).
function obterSaudacao(hora) {
  if (hora < 12) return "Bom dia";
  if (hora < 18) return "Boa tarde";
  return "Boa noite";
}

// Escreve a saudação no hero usando a hora atual do visitante.
function mostrarSaudacao() {
  document.getElementById("saudacao").textContent = "// " + obterSaudacao(new Date().getHours()) + ", seja bem-vindo(a)";
}

// Abre ou fecha o menu no celular e atualiza o aria-expanded.
function alternarMenu() {
  const aberto = menu.classList.toggle("aberto");
  btnMenu.setAttribute("aria-expanded", String(aberto));
  btnMenu.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
}

// Alterna entre tema escuro e claro e guarda a escolha (bônus: localStorage).
function alternarTema() {
  const claro = document.body.classList.toggle("tema-claro");
  try { localStorage.setItem("tema", claro ? "claro" : "escuro"); } catch (e) { /* storage indisponível */ }
}

// Aplica o tema salvo na última visita, se existir.
function carregarTema() {
  try {
    if (localStorage.getItem("tema") === "claro") document.body.classList.add("tema-claro");
  } catch (e) { /* storage indisponível */ }
}

// Mostra ou limpa a mensagem de erro de um campo.
function definirErro(idCampo, idErro, mensagem) {
  const erro = document.getElementById(idErro);
  const campo = document.getElementById(idCampo);
  erro.textContent = mensagem;
  campo.closest(".campo").classList.toggle("invalido", mensagem !== "");
  campo.setAttribute("aria-invalid", mensagem !== "" ? "true" : "false");
}

// Valida o formulário e retorna true se tudo estiver correto, ou false se houver erros.
function validarFormulario() {
  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const mensagem = document.getElementById("mensagem").value.trim();
  const consentimento = document.getElementById("consentimento").checked;
  let valido = true;

  let erroNome = "";
  if (nome === "") { erroNome = "Informe seu nome."; valido = false; }
  definirErro("nome", "erroNome", erroNome);

  let erroEmail = "";
  if (email === "") { erroEmail = "Informe seu e-mail."; valido = false; }
  else if (!email.includes("@") || !email.includes(".")) { erroEmail = "Digite um e-mail válido, como nome@exemplo.com."; valido = false; }
  definirErro("email", "erroEmail", erroEmail);

  let erroMensagem = "";
  if (mensagem === "") { erroMensagem = "Escreva sua mensagem."; valido = false; }
  else if (mensagem.length < 20) { erroMensagem = "A mensagem precisa ter pelo menos 20 caracteres (agora: " + mensagem.length + ")."; valido = false; }
  definirErro("mensagem", "erroMensagem", erroMensagem);

  let erroConsentimento = "";
  if (!consentimento) { erroConsentimento = "Marque a caixa para enviar a mensagem."; valido = false; }
  definirErro("consentimento", "erroConsentimento", erroConsentimento);

  return valido;
}

// Trata o envio: valida, mostra sucesso e limpa o formulário.
function enviarFormulario(evento) {
  evento.preventDefault();
  const msgSucesso = document.getElementById("msgSucesso");
  msgSucesso.textContent = "";
  if (validarFormulario()) {
    msgSucesso.textContent = "Mensagem enviada! Responderei em breve.";
    formulario.reset();
  }
}

// Insere o ano atual no rodapé.
function mostrarAno() {
  document.getElementById("ano").textContent = new Date().getFullYear();
}

carregarTema();
mostrarSaudacao();
mostrarAno();
btnMenu.addEventListener("click", alternarMenu);
btnTema.addEventListener("click", alternarTema);
formulario.addEventListener("submit", enviarFormulario);
// Fecha o menu ao escolher uma seção no celular.
menu.addEventListener("click", (e) => { if (e.target.tagName === "A" && menu.classList.contains("aberto")) alternarMenu(); });
