
function enviar (){
  var nomeValue = document.getElementById("nome").value;
//   var profissãoValue = document.getElementById("Profissao").value;
  var contatoValue= document.getElementById("Contato").value;
  var emailValue = document.getElementById ("Email").value;
  var linkedinValue = document.getElementById("Linkedin").value;
//   var githubValue = document.getElementById("Github").value;
  var sobreValue = document.getElementById("Sobre").value;

  var formValue = {
    nome: nomeValue,
    // profissão: profissãoValue,
    contato: contatoValue,
    email: emailValue,
    linkedin: linkedinValue,
    // github: githubValue,
    sobre: sobreValue,
  };

  console.log(formValue)
}