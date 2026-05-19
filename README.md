# Pokédex

Projeto front-end desenvolvido em Angular para um desafio técnico. A aplicação apresenta uma Pokédex com layout responsivo, listagem de Pokémon, paginação e integração com a PokéAPI.

## Tecnologias

- Angular 17
- Angular CLI 17
- TypeScript
- SCSS
- Standalone Components
- PokéAPI

## Como rodar o projeto

Instale as dependências:

```bash
npm install
```

Inicie o servidor de desenvolvimento:

```bash
npm start
```

Depois acesse:

```txt
http://localhost:4200
```

## Build

Para gerar a versão de produção:

```bash
npm run build
```

Os arquivos gerados ficam na pasta `dist/`.

## Estrutura principal

A feature da Pokédex fica em:

```txt
src/app/features/pokedex
```

Ela foi organizada separando página, componentes, serviço, interfaces e estado local simples, sem NgRx e sem bibliotecas externas de UI.

## Observações

O projeto usa a PokéAPI como fonte de dados e mantém a responsabilidade dos componentes separada para facilitar manutenção, evolução visual e explicação em entrevista.
