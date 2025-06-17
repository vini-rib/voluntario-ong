# Plataforma de Conexão Voluntária Local

## Descrição
Plataforma web para conectar ONGs e instituições sociais a voluntários, facilitando o cadastro e a visualização de demandas reais da comunidade.

## Funcionalidades
- Cadastro de necessidades por instituições (formulário validado e integrado ao ViaCEP)
- Visualização dinâmica das necessidades em cards
- Pesquisa e filtro por tipo de ajuda
- Layout responsivo, acessível e consistente
- Estrutura de pastas organizada (HTML, CSS, JS)

## Estrutura de Pastas
```
voluntario-ong/
  cadastro.html
  home.html
  necessidades.html
  README.md
  assets/
    css/
      style.css
    js/
      main.js
```

## Como rodar o projeto localmente
1. Clone o repositório
2. Abra o arquivo `home.html` no navegador
3. Navegue entre as páginas pelo menu

## Publicação
O projeto pode ser publicado facilmente no GitHub Pages:
1. Faça push para o GitHub
2. No repositório, acesse Settings > Pages
3. Selecione a branch principal e a pasta `/voluntario-ong` como fonte
4. O site estará disponível no endereço gerado pelo GitHub Pages

## Licença
MIT
# Plataforma de Conexão Voluntária

Projeto para conectar ONGs e voluntários, facilitando o cadastro e a visualização de demandas sociais.

## Estrutura de Pastas

```
voluntario-ong/
├── cadastro.html           # Página de cadastro de necessidade
├── home.html               # Página inicial
├── necessidades.html       # Página de visualização de necessidades
├── assets/
│   ├── css/
│   │   └── style.css       # Estilos globais e responsivos
│   └── js/
│       └── main.js         # Lógica JS: validação, integração ViaCEP, exibição dinâmica
└── README.md               # Documentação do projeto
```

## Funcionalidades
- Cadastro de demandas por voluntários/doações
- Visualização dinâmica das necessidades cadastradas
- Pesquisa e filtro por tipo de ajuda
- Preenchimento automático de endereço via ViaCEP
- Design responsivo e acessível

## Como rodar o projeto
Abra o arquivo `home.html` em seu navegador. Não é necessário backend.

## Observações
- Todos os dados são salvos no navegador (localStorage)
- Código comentado para facilitar manutenção
- Siga as mensagens de commit para entender o histórico de desenvolvimento
# voluntario-ong