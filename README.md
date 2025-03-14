# Documentação do Projeto Micro-Frontend

## Índice

1. [Visão Geral do Projeto](#visão-geral-do-projeto)
2. [Configuração e Instalação](#configuração-e-instalação)
3. [Scripts e Ferramentas](#scripts-e-ferramentas)
4. [Testes](#testes)
5. [Arquitetura](#arquitetura)
6. [Gerenciamento de Estado](#gerenciamento-de-estado)
7. [Componentes](#componentes)
8. [Fluxo de Desenvolvimento](#fluxo-de-desenvolvimento)
9. [Estrutura de Arquivos e Pastas](#estrutura-de-arquivos-e-pastas)

## Visão Geral do Projeto

Este projeto é uma aplicação micro-frontend construída utilizando React, TypeScript e Webpack 5 Module Federation. Consiste em duas aplicações principais:

1. **Aplicação Container**: A aplicação principal que hospeda os micro-frontends e fornece componentes compartilhados, gerenciamento de estado e utilitários.
2. **Aplicação Remote**: Uma aplicação separada que consome componentes e estado da aplicação container.

### Tecnologias Utilizadas

- **React**: Biblioteca frontend para construção de interfaces de usuário
- **TypeScript**: Adiciona tipagem estática ao JavaScript
- **Webpack 5**: Empacotador de módulos com Module Federation para arquitetura micro-frontend
- **Redux Toolkit**: Biblioteca de gerenciamento de estado
- **Ant Design**: Biblioteca de componentes de UI
- **Tailwind CSS**: Framework CSS utilitário
- **Jest**: Framework de testes unitários
- **Cypress**: Framework de testes end-to-end

## Configuração e Instalação

### Pré-requisitos

- Node.js (v14 ou superior)
- npm ou yarn

### Passos para Instalação

1. Clone o repositório:
   ```bash
   git clone <url-do-repositório>
   cd <diretório-do-repositório>
   ```

2. Instale as dependências para a aplicação container:
   ```bash
   cd container
   npm install
   ```

3. Instale as dependências para a aplicação remote:
   ```bash
   cd ../remote
   npm install
   ```

### Executando as Aplicações

1. Inicie a aplicação container:
   ```bash
   cd container
   npm start
   ```

2. Inicie a aplicação remote:
   ```bash
   cd remote
   npm start
   ```

3. Acesse as aplicações:
   - Container: http://localhost:3000
   - Remote: http://localhost:3001

## Scripts e Ferramentas

O projeto inclui scripts úteis para desenvolvimento e manutenção:

### Scripts Globais

- **generate-tree.sh**: Gera uma árvore de diretórios atualizada do projeto
- **run-tests.sh**: Executa todos os testes do projeto (unitários e E2E)

### Scripts do Container e Remote

- **npm start**: Inicia o servidor de desenvolvimento
- **npm test**: Executa testes unitários
- **npm run build**: Gera build de produção
- **npm run cypress**: (Container) Executa testes E2E
- **npm run cypress:open**: (Container) Abre interface do Cypress

## Testes

O projeto utiliza Jest para testes unitários e Cypress para testes E2E:

### Testes Unitários
- Localizados em arquivos `.test.tsx`
- Executados via `npm test`
- Testam componentes, hooks e lógica de negócio

### Testes End-to-End
- Localizados em `cypress/e2e`
- Testam fluxos completos da aplicação
- Arquivos principais: `app.cy.ts`, `components.cy.ts`, `store.cy.ts`


## Estrutura de Arquivos e Pastas

```
.
├── GLOBAL_STATE_MANANGEMENT.md    # Documentação sobre gerenciamento de estado
├── README.md                      # Este arquivo
├── generate-tree.sh                # Script para gerar a árvore de diretórios
├── container/                      # Aplicação principal (Host)
│   ├── .babelrc                    # Configuração do Babel
│   ├── webpack.config.js            # Configuração do Webpack
│   ├── .gitignore                   # Arquivos ignorados pelo Git
│   ├── package-lock.json            # Controle de versões do npm
│   ├── package.json                 # Configuração e dependências da aplicação
│   ├── federation.config.json        # Configuração do Module Federation
│   ├── tsconfig.json                 # Configuração do TypeScript
│   ├── src/                          # Código-fonte do container
│   │   ├── App.tsx                   # Componente principal da aplicação
│   │   ├── index.html                 # Página HTML principal
│   │   ├── index.css                  # Estilos globais
│   │   ├── index.ts                   # Ponto de entrada da aplicação
│   │   ├── remote.d.ts                # Definições de módulos remotos (Module Federation)
│   │   ├── types/                     # Definições de tipos TypeScript
│   │   │   ├── storeState.ts          # Definição dos tipos da Store Redux
│   │   ├── providers/                 # Providers de contexto da aplicação
│   │   │   ├── StoreProvider.tsx      # Provider Redux para encapsular a aplicação
│   │   ├── components/                # Componentes compartilhados
│   │   │   ├── Navbar.tsx             # Navbar da aplicação
│   │   │   ├── SideMenu.tsx           # Menu lateral da aplicação
│   │   │   ├── FallbackTestPage.tsx   # Página de fallback para carregamento dinâmico
│   │   │   ├── Button.tsx             # Componente de botão reutilizável
│   │   ├── hooks/                     # Hooks personalizados
│   │   │   ├── useStoreDispatch.ts    # Hook para acessar `dispatch` do Redux
│   │   │   ├── useStoreSelector.ts    # Hook para acessar o estado global da Store
│   │   │   ├── useStore.ts            # Hook que encapsula chamadas Redux
│   │   ├── services/                  # Serviços de API
│   │   │   ├── product/               # Serviço para produtos
│   │   │   │   ├── index.ts           # Implementação do serviço de produtos
│   │   │   │   ├── types.ts           # Definições de tipos para produtos
│   │   ├── store/                     # Configuração da Store Redux
│   │   │   ├── index.ts               # Configuração principal da Store
│   │   │   ├── features/              # Slices do Redux
│   │   │   │   ├── providers/
│   │   │   │   │   ├── providersSlice.ts   # Slice para provedores
│   │   │   │   ├── product/
│   │   │   │   │   ├── productSlice.ts     # Slice para produtos
│   │   │   │   ├── menu/
│   │   │   │   │   ├── menuSlice.ts        # Slice para menu
│   │   │   │   ├── counter/
│   │   │   │   │   ├── counterSlice.ts     # Slice para contador
├── remote/                         # Aplicação microfrontend (remota)
│   ├── .babelrc                     # Configuração do Babel
│   ├── webpack.config.js             # Configuração do Webpack
│   ├── .gitignore                    # Arquivos ignorados pelo Git
│   ├── package-lock.json             # Controle de versões do npm
│   ├── package.json                  # Configuração e dependências da aplicação
│   ├── tsconfig.json                  # Configuração do TypeScript
│   ├── src/                           # Código-fonte do remote
│   │   ├── App.tsx                    # Componente principal da aplicação remote
│   │   ├── index.html                  # Página HTML principal
│   │   ├── index.css                   # Estilos globais
│   │   ├── index.ts                    # Ponto de entrada da aplicação
│   │   ├── container.d.ts              # Definições de módulos remotos (importados do Container)
│   │   ├── pages/                      # Páginas da aplicação remote
│   │   │   ├── test/
│   │   │   │   ├── index.tsx           # Página de testes
```

### Explicação Detalhada dos Arquivos

#### Configuração e Dependências

- **package.json**: Lista as dependências do projeto e define scripts (`start`, `build`).  
- **webpack.config.js**: Configura o Webpack e o **Module Federation**, permitindo compartilhar código entre Container e Remote.  
- **federation.config.json**: Define os módulos expostos pelo container para que possam ser consumidos remotamente.  
- **tsconfig.json**: Configuração do TypeScript, garantindo segurança de tipos.  

#### Código-Fonte

- **App.tsx**: Componente principal, responsável pela estrutura da aplicação.  
- **index.ts**: Ponto de entrada, onde a aplicação é iniciada e renderizada no navegador.  
- **index.html**: Estrutura HTML base da aplicação.  
- **index.css**: Estilos globais, utilizando **Tailwind CSS**.  

#### Gerenciamento de Estado (Redux)

- **store/index.ts**: Configuração central do Redux (`configureStore`).  
- **store/features/**: Contém **slices** do Redux, que gerenciam partes específicas do estado global.  

#### Hooks Customizados

- **useStoreDispatch.ts**: Facilita o uso do `dispatch` do Redux.  
- **useStoreSelector.ts**: Hook tipado para selecionar partes do estado global.  
- **useStore.ts**: Encapsula chamadas Redux (`incrementCounter`, `decrementCounter` etc.).  

#### Componentes Compartilhados

- **Navbar.tsx**: Cabeçalho superior da aplicação.  
- **SideMenu.tsx**: Menu lateral de navegação.  
- **Button.tsx**: Componente reutilizável de botão.  

#### Provedores e Serviços

- **StoreProvider.tsx**: Envolve a aplicação com o `<Provider>` do Redux.  
- **services/product/index.ts**: Serviço para buscar dados de produtos via API.  

---

### Detalhamento dos Arquivos e Pastas

#### Aplicação Container

##### Arquivos de Configuração

- **container/.babelrc**: Configuração do Babel para transpilação de código JavaScript/TypeScript.
- **container/.gitignore**: Lista de arquivos e pastas a serem ignorados pelo Git.
- **container/federation.config.json**: Configuração para o plugin de federação de módulos, especificando quais componentes e tipos são expostos.
- **container/package.json**: Define as dependências, scripts e metadados do projeto.
- **container/tsconfig.json**: Configuração do TypeScript para o projeto.
- **container/webpack.config.js**: Configuração do Webpack, incluindo o plugin de federação de módulos para compartilhamento de código.

##### Pasta src

- **container/src/App.tsx**: Componente principal da aplicação container, define o layout e a estrutura da aplicação.
- **container/src/index.css**: Estilos CSS globais da aplicação.
- **container/src/index.html**: Template HTML para a aplicação.
- **container/src/index.ts**: Ponto de entrada da aplicação, importa e renderiza o componente App.
- **container/src/remote.d.ts**: Definições de tipos para os componentes importados da aplicação remote.

##### Pasta components

- **container/src/components/Button.tsx**: Componente de botão reutilizável que é compartilhado com a aplicação remote.
- **container/src/components/Navbar.tsx**: Componente de barra de navegação superior que inclui a seleção de provedor.
- **container/src/components/SideMenu.tsx**: Componente de menu lateral que permite a navegação entre diferentes seções da aplicação.

##### Pasta hooks

- **container/src/hooks/useStore.ts**: Hook personalizado que fornece acesso às ações da store Redux.
- **container/src/hooks/useStoreDispatch.ts**: Hook personalizado que fornece acesso à função dispatch da store Redux.
- **container/src/hooks/useStoreSelector.ts**: Hook personalizado que fornece acesso ao estado da store Redux.

##### Pasta providers

- **container/src/providers/StoreProvider.tsx**: Componente provedor que envolve a aplicação com o Provider do Redux.

##### Pasta services

- **container/src/services/product/index.ts**: Serviço para buscar dados de produtos de uma API externa.
- **container/src/services/product/types.ts**: Definições de tipos para os dados de produtos.

##### Pasta store

- **container/src/store/index.ts**: Configuração principal da store Redux, combinando todos os reducers.
- **container/src/store/features/counter/counterSlice.ts**: Slice Redux para o estado do contador.
- **container/src/store/features/menu/menuSlice.ts**: Slice Redux para o estado do menu.
- **container/src/store/features/product/productSlice.ts**: Slice Redux para o estado dos produtos.
- **container/src/store/features/providers/providersSlice.ts**: Slice Redux para o estado dos provedores.

##### Pasta types

- **container/src/types/storeState.ts**: Definições de tipos para o estado da store Redux.

#### Aplicação Remote

##### Arquivos de Configuração

- **remote/.babelrc**: Configuração do Babel para transpilação de código JavaScript/TypeScript.
- **remote/.gitignore**: Lista de arquivos e pastas a serem ignorados pelo Git.
- **remote/package.json**: Define as dependências, scripts e metadados do projeto.
- **remote/tsconfig.json**: Configuração do TypeScript para o projeto.
- **remote/webpack.config.js**: Configuração do Webpack, incluindo o plugin de federação de módulos para consumir código compartilhado.

##### Pasta src

- **remote/src/App.tsx**: Componente principal da aplicação remote.
- **remote/src/container.d.ts**: Definições de tipos para os componentes e hooks importados da aplicação container.
- **remote/src/index.css**: Estilos CSS globais da aplicação.
- **remote/src/index.html**: Template HTML para a aplicação.
- **remote/src/index.ts**: Ponto de entrada da aplicação, importa e renderiza o componente App.

##### Pasta pages

- **remote/src/pages/test/index.tsx**: Página de teste que demonstra o uso de componentes e estado do container.

### Significado e Propósito dos Arquivos Principais

#### Arquivos de Configuração

- **webpack.config.js**: Este arquivo é crucial para a arquitetura micro-frontend, pois configura o Module Federation que permite o compartilhamento de código entre aplicações. Define quais componentes são expostos (no container) e consumidos (no remote).
- **federation.config.json**: Define quais componentes e tipos são expostos para geração de tipos TypeScript, garantindo a segurança de tipos entre aplicações.
- **tsconfig.json**: Configura o TypeScript para o projeto, definindo opções de compilação e verificação de tipos.
- **package.json**: Define as dependências do projeto e scripts para desenvolvimento, build e execução.

#### Arquivos de Aplicação

- **App.tsx**: Define a estrutura principal da aplicação, incluindo layout, roteamento e componentes principais.
- **index.ts**: Ponto de entrada da aplicação, responsável por renderizar o componente App e inicializar a aplicação.
- **container.d.ts**: Arquivo crucial para a integração TypeScript entre aplicações, define os tipos para todos os componentes, hooks e estados compartilhados.

#### Arquivos de Estado

- **store/index.ts**: Configura a store Redux central, combinando todos os reducers e definindo o estado global da aplicação.
- **features/*/Slice.ts**: Cada slice define uma parte do estado global, com seus próprios reducers e ações.
- **types/storeState.ts**: Define os tipos TypeScript para o estado global, garantindo consistência e segurança de tipos.

#### Arquivos de Componentes

- **components/*.tsx**: Componentes React reutilizáveis que podem ser compartilhados entre aplicações.
- **pages/*.tsx**: Componentes de página específicos da aplicação remote.

#### Arquivos de Hooks

- **hooks/useStore.ts**: Fornece uma interface simplificada para acessar ações da store Redux.
- **hooks/useStoreSelector.ts**: Fornece uma interface tipada para acessar o estado da store Redux.
- **hooks/useStoreDispatch.ts**: Fornece acesso tipado à função dispatch da store Redux.

#### Arquivos de Serviços

- **services/*/index.ts**: Implementa a lógica de comunicação com APIs externas.
- **services/*/types.ts**: Define os tipos para os dados recebidos e enviados para APIs externas.

## Arquitetura

### Abordagem Micro-Frontend

Este projeto utiliza uma arquitetura micro-frontend, que permite o desenvolvimento e implantação independentes de aplicações frontend. Os principais benefícios incluem:

- **Escalabilidade**: Equipes podem trabalhar em diferentes partes da aplicação independentemente
- **Manutenibilidade**: Bases de código menores e focadas são mais fáceis de manter
- **Flexibilidade Tecnológica**: Diferentes equipes podem usar diferentes tecnologias
- **Implantação Independente**: Aplicações podem ser implantadas independentemente

### Module Federation

O Module Federation do Webpack 5 é usado para compartilhar código entre aplicações em tempo de execução. Isso permite:

- **Compartilhamento de Componentes**: A aplicação container expõe componentes que podem ser consumidos pela aplicação remote
- **Compartilhamento de Estado**: A aplicação container expõe sua store Redux e utilitários relacionados
- **Compartilhamento de Tipos**: Tipos TypeScript são compartilhados entre aplicações para segurança de tipos

### Compartilhamento de Componentes

Os componentes são compartilhados da aplicação container para a aplicação remote usando Module Federation. A aplicação container expõe componentes em seu arquivo webpack.config.js:

```javascript
// container/webpack.config.js
new ModuleFederationPlugin({
  name: "container",
  filename: "remoteEntry.js",
  exposes: {
    "./Button": "./src/components/Button.tsx",
    // Outros componentes expostos
  },
  // ...
})
```

A aplicação remote consome esses componentes importando-os:

```javascript
// remote/webpack.config.js
new ModuleFederationPlugin({
  name: "remote",
  remotes: {
    container: "container@http://localhost:3000/remoteEntry.js",
  },
  // ...
})
```

```tsx
// remote/src/pages/test/index.tsx
import Button from "container/Button";
```

### Compartilhamento de Tipos

Os tipos TypeScript são compartilhados entre aplicações usando arquivos de declaração. A aplicação container gera definições de tipos usando o pacote `@cloudbeds/webpack-module-federation-types-plugin`:

```json
// container/federation.config.json
{
  "name": "container",
  "exposes": {
    "./Button": "./src/components/Button.tsx",
    "./types/storeState": "./src/types/storeState.ts"
    // Outros componentes e tipos expostos
  }
}
```

A aplicação remote inclui essas definições de tipos em seu arquivo `container.d.ts`:

```typescript
// remote/src/container.d.ts
declare module "container/Button" {
  // Definições de tipos para o componente Button
}

declare module "container/types/storeState" {
  // Definições de tipos para o estado da store
}
```

## Gerenciamento de Estado

### Estrutura da Store Redux

A aplicação utiliza Redux Toolkit para gerenciamento de estado. A store é configurada na aplicação container e compartilhada com a aplicação remote.

A store consiste em vários slices:

1. **Counter Slice**: Gerencia um estado simples de contador
   - Estado: `{ value: number }`
   - Ações: `increment`, `decrement`, `incrementByAmount`

2. **Product Slice**: Gerencia dados de produtos
   - Estado: `{ products: ProductItem[] }`
   - Ações: `setProducts`
   - Thunks Assíncronos: `getAllProduct`

3. **Providers Slice**: Gerencia o provedor selecionado
   - Estado: `{ selectedProvider: string }`
   - Ações: `setSelectedProvider`

4. **Menu Slice**: Gerencia o item de menu selecionado
   - Estado: `{ selectedMenuItem: string }`
   - Ações: `setSelectedMenuItem`

### Hooks Personalizados

A aplicação fornece hooks personalizados para acessar a store Redux:

1. **useStore**: Fornece acesso às ações da store
   ```typescript
   const { incrementCounter, decrementCounter, getProductList } = useStore();
   ```

2. **useStoreSelector**: Fornece acesso ao estado da store
   ```typescript
   const { value } = useStoreSelector((state) => state.counter);
   ```

3. **useStoreDispatch**: Fornece acesso à função dispatch
   ```typescript
   const dispatch = useStoreDispatch();
   ```

### Compartilhamento de Estado Entre Aplicações

A aplicação container expõe sua store Redux e utilitários relacionados para a aplicação remote:

```javascript
// container/webpack.config.js
new ModuleFederationPlugin({
  exposes: {
    "./hooks/useStore": "./src/hooks/useStore.ts",
    "./hooks/useStoreSelector": "./src/hooks/useStoreSelector.ts",
    "./providers/StoreProvider": "./src/providers/StoreProvider.tsx",
    // Outros componentes e utilitários expostos
  },
  // ...
})
```

A aplicação remote envolve seu componente raiz com o StoreProvider do container:

```tsx
// remote/src/App.tsx
import StoreProvider from "container/providers/StoreProvider";

root.render(
  <StoreProvider>
    <App />
  </StoreProvider>
);
```

E usa os hooks do container para acessar a store:

```tsx
// remote/src/pages/test/index.tsx
import useStore from "container/hooks/useStore";
import { useStoreSelector } from "container/hooks/useStoreSelector";

export default function TestPage() {
  const { incrementCounter, getProductList } = useStore();
  const { value } = useStoreSelector((state) => state.counter);
  // ...
}
```

## Componentes

### Componentes do Container

A aplicação container fornece vários componentes:

1. **Button**: Um componente de botão personalizável
   ```tsx
   <Button label="Clique em mim" buttonType="primary" onClick={handleClick} />
   ```

2. **Navbar**: Um componente de barra de navegação com seleção de provedor
   ```tsx
   <Navbar className="border-b" />
   ```

3. **SideMenu**: Um componente de menu lateral com itens de navegação
   ```tsx
   <SideMenu className="border-r" />
   ```

### Componentes Remote

A aplicação remote fornece:

1. **TestPage**: Uma página que demonstra o uso de componentes e estado do container
   ```tsx
   <TestPage />
   ```

### Componentes Compartilhados

Componentes compartilhados do container para a aplicação remote:

1. **Button**: Usado na aplicação remote para interações do usuário
   ```tsx
   import Button from "container/Button";
   ```

## Fluxo de Desenvolvimento

### Adicionando Novos Recursos

Para adicionar um novo recurso à aplicação:

1. **Crie um novo slice** na aplicação container:
   ```typescript
   // container/src/store/features/novoRecurso/novoRecursoSlice.ts
   import { createSlice } from "@reduxjs/toolkit";
   
   const initialState = {
     // Estado inicial
   };
   
   export const novoRecursoSlice = createSlice({
     name: "novoRecurso",
     initialState,
     reducers: {
       // Reducers
     },
   });
   
   export const { /* ações */ } = novoRecursoSlice.actions;
   export default novoRecursoSlice.reducer;
   ```

2. **Adicione o reducer à store**:
   ```typescript
   // container/src/store/index.ts
   import novoRecursoReducer from "./features/novoRecurso/novoRecursoSlice";
   
   export const store = configureStore({
     reducer: {
       // Reducers existentes
       novoRecurso: novoRecursoReducer,
     },
   });
   ```

3. **Adicione o tipo de estado**:
   ```typescript
   // container/src/types/storeState.ts
   export interface NovoRecursoState {
     // Propriedades do estado
   }
   ```

4. **Atualize o hook useStore**:
   ```typescript
   // container/src/hooks/useStore.ts
   import { /* ações */ } from "../store/features/novoRecurso/novoRecursoSlice";
   
   export default function useStore() {
     // Código existente
     
     const novaAcaoRecurso = () => {
       dispatch(/* ação */);
     };
     
     return {
       // Funções existentes
       novaAcaoRecurso,
     };
   }
   ```

5. **Atualize o arquivo container.d.ts** na aplicação remote:
   ```typescript
   // remote/src/container.d.ts
   declare module "container/types/storeState" {
     // Tipos existentes
     export interface NovoRecursoState {
       // Propriedades do estado
     }
   }
   
   declare module "container/hooks/useStoreSelector" {
     import type { /* tipos existentes */, NovoRecursoState } from "container/types/storeState";
     export type RootState = {
       // Estado existente
       novoRecurso: NovoRecursoState,
     };
     // Resto do arquivo
   }
   
   declare module "container/hooks/useStore" {
     function useStore(): {
       // Funções existentes
       novaAcaoRecurso: () => void,
     };
     export default useStore;
   }
   ```

### Adicionando Novos Componentes

Para adicionar um novo componente à aplicação container e expô-lo para a aplicação remote:

1. **Crie o componente**:
   ```tsx
   // container/src/components/NovoComponente.tsx
   import React from "react";
   
   interface NovoComponenteProps {
     // Props
   }
   
   const NovoComponente: React.FC<NovoComponenteProps> = (props) => {
     // Implementação do componente
   };
   
   export default NovoComponente;
   ```

2. **Exponha o componente** na configuração do webpack:
   ```javascript
   // container/webpack.config.js
   new ModuleFederationPlugin({
     exposes: {
       // Exposições existentes
       "./NovoComponente": "./src/components/NovoComponente.tsx",
     },
     // Resto da configuração
   })
   ```

3. **Gere definições de tipos**:
   ```json
   // container/federation.config.json
   {
     "exposes": {
       // Exposições existentes
       "./NovoComponente": "./src/components/NovoComponente.tsx"
     }
   }
   ```
   
   ```bash
   npx make-federated-types
   ```

4. **Atualize o arquivo container.d.ts** na aplicação remote:
   ```typescript
   // remote/src/container.d.ts
   declare module "container/NovoComponente" {
     // Definições de tipos para o novo componente
   }
   ```

5. **Use o componente** na aplicação remote:
   ```tsx
   // remote/src/pages/AlgumaPagina.tsx
   import NovoComponente from "container/NovoComponente";
   
   const AlgumaPagina = () => {
     return (
       <div>
         <NovoComponente />
       </div>
     );
   };
   ```
