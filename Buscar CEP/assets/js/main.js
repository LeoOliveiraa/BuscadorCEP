//Armazenamento dos itens em variáveis.
let cepInput = document.getElementById('cep')
let cidadeInput = document.getElementById('cdd');
let estadoInput = document.getElementById('estado');
let bairroInput = document.getElementById('bairro');
let ruaInput = document.getElementById('rua');
const loader = document.getElementById('loader');

//Função pra mostrar animação de carregamento
function showLoader() {
    loader.style.display = 'block';
    document.body.classList.add('blurred-background');
}

//Função pra ocultar animação de carregamento
function hideLoader() {
    loader.style.display = 'none';
    document.body.classList.remove('blurred-background');
}


//Função pra limpar os campos após ser chamada por um botão.
function limpar_form() {
    cepInput.value = "";
    cidadeInput.value = "";
    estadoInput.value = "";
    bairroInput.value = "";
    ruaInput.value = "";
}

//Função principal do webApp
async function buscarCep(cep) {
    
    //exibe a animação de carregamento
    showLoader();

    //Regex pro CEP
    cep = cep.replace(/\D/g, '');
    //Verifica se o campos está vazio
    if (!cep) {
        alert('Por favor, insira um CEP válido.\n Aceitamos somente números!');
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
    } finally {
        hideLoader();
    }
}


//Função para imprimir os dados JSON na tela.
function mostrarNaTela(resultado) {
    cidadeInput.value = resultado.localidade;
    estadoInput.value = resultado.uf;
    bairroInput.value = resultado.bairro;
    ruaInput.value = resultado.logradouro;
}

//Chamada da ação principal através de um botão.
document.getElementById('botaoBuscar').addEventListener('click', function () {
    const cep = cepInput.value;
    buscarCep(cep);
});

