# Pokédex

Projeto front-end desenvolvido em Angular 17 como parte de um desafio técnico. A aplicação apresenta uma Pokédex responsiva com listagem de Pokémon, busca dinâmica, autocomplete, paginação e integração com a PokéAPI.

## Tecnologias

* Angular 17
* Angular CLI 17
* TypeScript
* SCSS
* Standalone Components
* RxJS
* PokéAPI

## Justificativa da escolha do Angular

Apesar do desafio sugerir o uso de Vanilla JavaScript, foi utilizado Angular 17 por ser a tecnologia com a qual possuo maior experiência profissional, permitindo focar na organização da arquitetura, componentização, responsividade, gerenciamento de estado local e experiência do usuário.

A aplicação foi desenvolvida sem bibliotecas externas de UI e sem soluções complexas de gerenciamento global de estado, priorizando simplicidade, legibilidade e facilidade de manutenção.

## Funcionalidades

* Listagem paginada de Pokémon
* Busca dinâmica sem recarregamento de página
* Autocomplete de busca
* Paginação responsiva
* Integração com PokéAPI
* Hover e interações visuais
* Responsividade para desktop e mobile

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

## Estrutura do projeto

A feature principal da Pokédex está organizada em:

```txt
src/app/features/pokedex
```

A estrutura foi separada em:

* páginas;
* componentes;
* serviços;
* interfaces;
* estado local simples.

O projeto utiliza:

* Standalone Components;
* lazy loading;
* ChangeDetectionStrategy.OnPush;
* Signals e RxJS para controle de estado e reatividade.

## Observações

O projeto foi desenvolvido buscando manter:

* separação de responsabilidades;
* código limpo e legível;
* responsividade;
* experiência fluida sem recarregamento;
* organização compatível com aplicações Angular modernas.
