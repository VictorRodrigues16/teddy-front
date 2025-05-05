# Sistema de Gerenciamento de Clientes

Este é um sistema completo de gerenciamento de clientes desenvolvido com **React**, **TypeScript** e **Vite**. O sistema permite cadastrar, editar, excluir e selecionar clientes, além de visualizar uma tela com os clientes selecionados.

## 📋 Funcionalidades

- Cadastro de novos clientes
- Edição de dados de clientes existentes
- Exclusão de clientes
- Seleção de clientes
- Tela dedicada para visualização de clientes selecionados

## 🚀 Tecnologias Utilizadas

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Cypress](https://www.cypress.io/) – para testes end-to-end

## 📁 Estrutura do Projeto

```bash
src/
├── assets/ 
├── components/        
├── hooks/          
├── pages/           
├── routes/ 
├── services/        
├── types/         
├── utils/    
├── App.tsx
└── main.tsx              
```

## ⚙️ Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

```env
VITE_API_URL=https://sua-api-aqui.com
```


## 🚀 Como rodas o projeto
### Siga os passos abaixo para rodar o projeto localmente:
### 1. Clone o repositório

```bash
git clone https://github.com/VictorRodrigues16/teddy-front.git
cd teddy-front
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente
Crie o arquivo .env conforme descrito acima.

### 4. Inicie o servidor
```bash
npm run dev
```

## 🧪 Testes End-to-End com Cypress
Este projeto possui testes automatizados utilizando o Cypress.

### Executar os testes em modo interativo
```bash
npm run test:e2e
```
Esse comando abre a interface do cypress para um acompanhamento mais detalhado dos teste.

### Executar os testes em modo headless
```bash
npm run test:e2e:headless
```
Esse comando roda todos os testes e você acompanha pelo terminal.

## 🙋‍♂️ Autor

Este projeto foi desenvolvido individualmente por Victor.