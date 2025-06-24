// Array para armazenar as necessidades cadastradas
let necessidades = [];

// Função para validar o formulário
function validarFormulario() {
    const nomeInstituicao = document.getElementById('nomeInstituicao').value;
    const tipoAjuda = document.getElementById('tipoAjuda').value;
    const titulo = document.getElementById('tituloNecessidade').value;
    const descricao = document.getElementById('descricaoNecessidade').value;
    const cep = document.getElementById('cep').value;
    const contato = document.getElementById('contato').value;

    if (!nomeInstituicao || !tipoAjuda || !titulo || !descricao || !cep || !contato) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return false;
    }

    // Validar formato do CEP
    const cepLimpo = cep.replace(/\D/g, '');
    if (cepLimpo.length !== 8) {
        alert('Por favor, insira um CEP válido.');
        return false;
    }

    // Validar formato do contato (email ou telefone)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const telefoneRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
    if (!emailRegex.test(contato) && !telefoneRegex.test(contato)) {
        alert('Por favor, insira um e-mail válido ou telefone no formato (99) 99999-9999');
        return false;
    }

    // Se passou por todas as validações, salvar a necessidade
    salvarNecessidade();
    return false; // Impede o envio do formulário
}

// Função para salvar a necessidade
function salvarNecessidade() {
    const necessidade = {
        nomeInstituicao: document.getElementById('nomeInstituicao').value,
        tipoAjuda: document.getElementById('tipoAjuda').value,
        titulo: document.getElementById('tituloNecessidade').value,
        descricao: document.getElementById('descricaoNecessidade').value,
        cep: document.getElementById('cep').value,
        rua: document.getElementById('rua').value,
        bairro: document.getElementById('bairro').value,
        cidade: document.getElementById('cidade').value,
        estado: document.getElementById('estado').value,
        contato: document.getElementById('contato').value,
        dataCadastro: new Date().toISOString()
    };

    necessidades.push(necessidade);
    localStorage.setItem('necessidades', JSON.stringify(necessidades));
    alert('Necessidade cadastrada com sucesso!');
    document.getElementById('form-cadastro').reset();
}

// Função para buscar CEP utilizando a API ViaCEP
async function buscarCEP(cep) {
    // Remove caracteres não numéricos
    const cepLimpo = cep.replace(/\D/g, '');

    // Valida o formato do CEP (8 dígitos)
    if (cepLimpo.length !== 8) {
        alert('Por favor, insira um CEP válido com 8 dígitos.');
        return;
    }

    try {
        // Faz a requisição para a API do ViaCEP
        const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
        
        // Verifica se a requisição foi bem sucedida
        if (!response.ok) {
            throw new Error('Erro na requisição do CEP');
        }

        const data = await response.json();

        // Verifica se o CEP existe na base
        if (data.erro) {
            alert('CEP não encontrado na base de dados.');
            return;
        }

        // Preenche os campos com os dados retornados
        const campos = {
            'rua': data.logradouro,
            'bairro': data.bairro,
            'cidade': data.localidade,
            'estado': data.uf
        };

        // Atualiza os campos do formulário
        Object.entries(campos).forEach(([campo, valor]) => {
            const elemento = document.getElementById(campo);
            if (elemento) {
                elemento.value = valor || '';
            }
        });
    } catch (error) {
        console.error('Erro ao consultar CEP:', error);
        alert('Erro ao buscar CEP. Por favor, tente novamente mais tarde.');
    }
}

// Função para exibir necessidades
function exibirNecessidades() {
    const necessidadesContainer = document.getElementById('lista-necessidades');
    if (!necessidadesContainer) return;

    const necessidadesParaExibir = JSON.parse(localStorage.getItem('necessidades')) || [];
    
    necessidadesContainer.innerHTML = necessidadesParaExibir.length === 0 
        ? '<p>Nenhuma necessidade cadastrada.</p>'
        : necessidadesParaExibir.map(n => `
            <div class="card-necessidade">
                <h3>${n.titulo}</h3>
                <p><strong>Instituição:</strong> ${n.nomeInstituicao}</p>
                <p><strong>Tipo de Ajuda:</strong> ${n.tipoAjuda}</p>
                <p><strong>Descrição:</strong> ${n.descricao}</p>
                <p><strong>Localização:</strong> ${n.cidade} - ${n.estado}</p>
                <p><strong>Contato:</strong> ${n.contato}</p>
            </div>
        `).join('');
}

// Event Listeners
window.addEventListener('load', () => {
    // Carregar necessidades do localStorage
    const necessidadesArmazenadas = localStorage.getItem('necessidades');
    if (necessidadesArmazenadas) {
        necessidades = JSON.parse(necessidadesArmazenadas);
    }    // Exibir necessidades se estiver na página de necessidades
    exibirNecessidades();
    
    // Adicionar listener para o CEP se estiver na página de cadastro
    const cepInput = document.getElementById('cep');
    if (cepInput) {
        cepInput.addEventListener('blur', (e) => buscarCEP(e.target.value));
    }
});