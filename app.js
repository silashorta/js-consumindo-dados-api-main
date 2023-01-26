// FETCH API

async function buscaEndereco(cep) {
    var mensagemErro = document.querySelector('#erro')
    mensagemErro.innerHTML = '';

    try {
        var consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
        var consultaCEPConvertida = await consultaCEP.json();
        if (consultaCEPConvertida.erro) {
            throw Error('CEP inexistente!')
        }
        var cidade = document.querySelector('#cidade')
        cidade.value = consultaCEPConvertida.localidade
        var logradouro = document.querySelector('#endereco')
        logradouro.value = consultaCEPConvertida.logradouro
        var estado = document.querySelector('#estado')
        estado.value = consultaCEPConvertida.uf
        var bairro = document.querySelector('#bairro')
        bairro.value = consultaCEPConvertida.bairro

        console.log(consultaCEPConvertida)
        return consultaCEPConvertida;
    } catch (erro) {
        mensagemErro.innerHTML = '<p>CEP inválido. Tente novamente!</p>'
        mensagemErro.classList.add('erro__texto')
        console.log(erro)
    }
}

var cep = document.querySelector('#cep')
cep.addEventListener('focusout', () => buscaEndereco(cep.value))



// MÁSCARA TELEFONE

const inputTelefone = (event) => {
    let input = event.target
    input.value = phoneMask(input.value)
  }
  
  const phoneMask = (value) => {
    if (!value) return ""
    value = value.replace(/\D/g,'')
    value = value.replace(/(\d{2})(\d)/,"($1) $2")
    value = value.replace(/(\d)(\d{4})$/,"$1-$2")
    return value
  }