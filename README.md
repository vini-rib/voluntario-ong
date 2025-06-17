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