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
