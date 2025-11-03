# Testes Automatizados - Saucedemo (Playwright)

Este projeto contém testes automatizados para o site de ecommerce [Saucedemo](https://www.saucedemo.com/cart.html) utilizando [Playwright](https://playwright.dev/).

## Estrutura do Projeto

- `tests/`  
  Contém os arquivos de teste e utilitários.
  - `fluxoDeCompra.spec.ts`: Testes de fluxo de compra.
  - `support/helpers.ts`: Funções auxiliares para os testes.
  - `casos de testes/casosDeTestes.text`: Descrição dos cenários de teste.
- `test-results/`  
  Resultados das execuções dos testes.
- `package.json`  
  Dependências do projeto.

## Pré-requisitos

- [Node.js](https://nodejs.org/) (recomendado v16+)
- npm

## Instalação

1. Clone este repositório.
2. Instale as dependências:

   ```sh
   npm install
   ```

## Executando os Testes

Para rodar todos os testes:

```sh
npx playwright test
```

Os resultados dos testes serão salvos na pasta `test-results/`.

## Estrutura dos Testes

Os cenários de teste cobrem:

- Login com usuário existente
- Adicionar e remover produtos do carrinho
- Visualizar produtos no carrinho
- Fluxos de checkout, incluindo validações de campos obrigatórios
- Cancelamento do checkout

Os detalhes dos cenários estão descritos em [`tests/casos de testes/casosDeTestes.text`](tests/casos%20de%20testes/casosDeTestes.text).

---
Feito por Carolina utilizando [Playwright](https://playwright.dev/)
