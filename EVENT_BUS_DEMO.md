# Event Bus vs StoreProvider Demo

Este projeto demonstra duas abordagens diferentes para comunicação entre micro frontends:

## 🏗️ Arquitetura

### 1. **StoreProvider Approach** (remote - porta 3001)
- Usa Redux StoreProvider compartilhado
- Estado centralizado no container
- Micro frontend acessa o store diretamente

### 2. **Event Bus Approach** (remote-event-bus - porta 3002)  
- Usa Event Bus para comunicação por eventos
- Sem dependência do Redux StoreProvider
- Comunicação assíncrona via eventos

## 🚀 Como Executar

### Opção 1: Executar Todos os Serviços
```bash
npm run dev:all
```

### Opção 2: Executar Individualmente
```bash
# Terminal 1 - Container (porta 3000)
npm run dev:container

# Terminal 2 - Remote com StoreProvider (porta 3001) 
npm run dev:remote

# Terminal 3 - Remote com Event Bus (porta 3002)
npm run dev:remote-event-bus
```

## 🔗 URLs dos Serviços

- **Container**: http://localhost:3000
- **Remote (StoreProvider)**: http://localhost:3001  
- **Remote (Event Bus)**: http://localhost:3002

## 🧪 Como Testar

1. **Acesse o Container**: http://localhost:3000
2. **Navegue entre as páginas**:
   - **Home**: Usa o remote com StoreProvider
   - **Event Bus Demo**: Usa o remote-event-bus 
3. **Teste a Comunicação**:
   - Vá para o Navbar
   - Mude o "Provider" no dropdown
   - Observe como ambas as páginas reagem à mudança

## 📊 Comparação das Abordagens

| Aspecto | StoreProvider | Event Bus |
|---------|---------------|-----------|
| **Complexidade** | Média | Baixa |
| **Acoplamento** | Alto | Baixo |
| **Performance** | Boa | Boa |
| **Debugging** | Redux DevTools | Console logs |
| **Tipo Safety** | Excelente | Boa (com interfaces) |
| **Flexibilidade** | Limitada ao Redux | Alta |

## 🔧 Implementação

### StoreProvider (remote)
```tsx
import StoreProvider from "container/providers/StoreProvider";
import { useStoreSelector } from "container/hooks/useStoreSelector";

root.render(
  <StoreProvider>
    <App />
  </StoreProvider>
);
```

### Event Bus (remote-event-bus)
```tsx
import eventBus, { EVENT_TYPES } from "container/services/eventBus";

useEffect(() => {
  const unsubscribe = eventBus.subscribe(
    EVENT_TYPES.PROVIDER_CHANGED, 
    (data) => setSelectedProvider(data.selectedProvider)
  );
  return unsubscribe;
}, []);

// Sem StoreProvider!
root.render(<App />);
```

## 🎯 Quando Usar Cada Abordagem

### Use **StoreProvider** quando:
- ✅ Estado complexo e centralizado
- ✅ Necessidade de Redux DevTools  
- ✅ Múltiplas operações no mesmo estado
- ✅ Time já familiarizado com Redux

### Use **Event Bus** quando:
- ✅ Comunicação simples por eventos
- ✅ Micro frontends independentes
- ✅ Diferentes tecnologias (React, Vue, Angular)
- ✅ Baixo acoplamento é prioridade

## 🚨 Observações Importantes

1. **Event Bus** permite mais independência entre micro frontends
2. **StoreProvider** oferece melhor debugging e ferramentas
3. Ambas as abordagens podem coexistir no mesmo projeto
4. A escolha depende dos requisitos específicos de cada caso 