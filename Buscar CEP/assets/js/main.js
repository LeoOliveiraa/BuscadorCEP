// Buscar os elementos DOM corretos
let cepInput = document.getElementById('cep');
let cidadeInput = document.getElementById('cdd');
let estadoInput = document.getElementById('estado');
let bairroInput = document.getElementById('bairro');
let ruaInput = document.getElementById('rua');

function limpar_form() {
    cepInput.value = "";
    cidadeInput.value = "";
    estadoInput.value = "";
    bairroInput.value = "";
    ruaInput.value = "";
}


async function buscarCep(cep) {

    cep = cep.replace('-', '');
    // Verifique se o valor de cep é válido (não vazio)
    if (!cep) {
        alert('Por favor, insira um CEP válido.');
        return;
    }

    try {
        const dados = await fetch(`https://viacep.com.br/ws/${cep}/json/`);

        if (dados.status === 200) {
            const resultado = await dados.json();

            mostrarNaTela(resultado);
        } else {
            throw new Error();
        }
    } catch {
        alert('A pesquisa por CEP falhou, tente novamente!');
    }
}

function mostrarNaTela(resultado) {
    cidadeInput.value = resultado.localidade;
    estadoInput.value = resultado.uf;
    // Defina outras propriedades, como estado, bairro e rua, da mesma maneira, se necessário.
}

// Exemplo de como você pode chamar a função buscarCep() ao pressionar um botão, por exemplo:
document.getElementById('botaoBuscar').addEventListener('click', function () {
    const cep = cepInput.value;
    buscarCep(cep);
});

