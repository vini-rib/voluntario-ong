// Função para exibir as necessidades cadastradas na página necessidades.html
function exibirNecessidades() {
    const lista = document.getElementById('lista-necessidades');
    if (!lista) return;
    const necessidades = JSON.parse(localStorage.getItem('necessidades')) || [];
    const pesquisa = document.getElementById('pesquisa')?.value.toLowerCase() || '';
    const filtroTipo = document.getElementById('filtro-tipo')?.value || '';
    let filtradas = necessidades;
    if (pesquisa) {
        filtradas = filtradas.filter(n =>
            n.tituloNecessidade.toLowerCase().includes(pesquisa) ||
            n.descricaoNecessidade.toLowerCase().includes(pesquisa)
        );
    }
    if (filtroTipo) {
        filtradas = filtradas.filter(n => n.tipoAjuda === filtroTipo);
    }
    lista.innerHTML = '';
    if (filtradas.length === 0) {
        lista.innerHTML = '<p>Nenhuma necessidade encontrada.</p>';
        return;
    }
    filtradas.forEach(n => {
        const card = document.createElement('div');
        card.className = 'card-necessidade';
        card.innerHTML = `
            <h3>${n.tituloNecessidade}</h3>
            <p><strong>Instituição:</strong> ${n.nomeInstituicao}</p>
            <p><strong>Tipo de Ajuda:</strong> ${n.tipoAjuda}</p>
            <p><strong>Descrição:</strong> ${n.descricaoNecessidade}</p>
            <p><strong>Endereço:</strong> ${n.rua}, ${n.bairro}, ${n.cidade} - ${n.estado}, CEP: ${n.cep}</p>
            <p><strong>Contato:</strong> ${n.contato}</p>
        `;
        lista.appendChild(card);
    });
}

// Adiciona listeners para filtros e pesquisa na página de necessidades
if (document.getElementById('lista-necessidades')) {
    exibirNecessidades();
    document.getElementById('pesquisa').addEventListener('input', exibirNecessidades);
    document.getElementById('filtro-tipo').addEventListener('change', exibirNecessidades);
}
// Array para armazenar as necessidades cadastradas
const necessidades = JSON.parse(localStorage.getItem('necessidades')) || [];

/**
 * Função para salvar a necessidade no array e no localStorage
 */
document.getElementById('form-cadastro').addEventListener('submit', function(event) {
    if (!validarFormulario()) {
        event.preventDefault();
        return;
    }
    // Monta o objeto necessidade
    const necessidade = {
        nomeInstituicao: document.getElementById('nomeInstituicao').value.trim(),
        tipoAjuda: document.getElementById('tipoAjuda').value,
        tituloNecessidade: document.getElementById('tituloNecessidade').value.trim(),
        descricaoNecessidade: document.getElementById('descricaoNecessidade').value.trim(),
        cep: document.getElementById('cep').value.trim(),
        rua: document.getElementById('rua').value.trim(),
        bairro: document.getElementById('bairro').value.trim(),
        cidade: document.getElementById('cidade').value.trim(),
        estado: document.getElementById('estado').value.trim(),
        contato: document.getElementById('contato').value.trim(),
        dataCadastro: new Date().toISOString()
    };
    necessidades.push(necessidade);
    localStorage.setItem('necessidades', JSON.stringify(necessidades));
    alert('Necessidade cadastrada com sucesso!');
    this.reset();
    event.preventDefault(); // Evita recarregar a página
});
// Validação do formulário de cadastro de necessidade
// e integração com ViaCEP para preenchimento automático de endereço

/**
 * Função para validar o formulário antes do envio
 * Verifica campos obrigatórios, formato de e-mail e telefone
 */
function validarFormulario() {
    const nome = document.getElementById('nomeInstituicao').value.trim();
    const tipoAjuda = document.getElementById('tipoAjuda').value;
    const titulo = document.getElementById('tituloNecessidade').value.trim();
    const descricao = document.getElementById('descricaoNecessidade').value.trim();
    const cep = document.getElementById('cep').value.trim();
    const rua = document.getElementById('rua').value.trim();
    const bairro = document.getElementById('bairro').value.trim();
    const cidade = document.getElementById('cidade').value.trim();
    const estado = document.getElementById('estado').value.trim();
    const contato = document.getElementById('contato').value.trim();

    // Validação simples de e-mail e telefone
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const telefoneRegex = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/;
    if (!nome || !tipoAjuda || !titulo || !descricao || !cep || !rua || !bairro || !cidade || !estado || !contato) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return false;
    }
    if (!(emailRegex.test(contato) || telefoneRegex.test(contato))) {
        alert('Informe um e-mail ou telefone válido no campo de contato.');
        return false;
    }
    return true;
}

/**
 * Função para buscar endereço pelo CEP usando a API ViaCEP
 * Preenche automaticamente os campos de rua, bairro, cidade e estado
 */
document.getElementById('cep').addEventListener('blur', function() {
    const cep = this.value.replace(/\D/g, '');
    if (cep.length !== 8) return;
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => response.json())
        .then(data => {
            if (data.erro) {
                alert('CEP não encontrado.');
                return;
            }
            document.getElementById('rua').value = data.logradouro || '';
            document.getElementById('bairro').value = data.bairro || '';
            document.getElementById('cidade').value = data.localidade || '';
            document.getElementById('estado').value = data.uf || '';
        })
        .catch(() => alert('Erro ao buscar o CEP.'));
});

// Comentários explicativos incluídos para facilitar manutenção e entendimento do código.
