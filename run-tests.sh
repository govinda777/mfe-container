#!/bin/bash

# Obtém o diretório onde o script está localizado
BASE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Define os diretórios do container e remote dinamicamente
CONTAINER_DIR="$BASE_DIR/container"
REMOTE_DIR="$BASE_DIR/remote"

# Inicia o Container em segundo plano
echo "Iniciando o Container..."
cd "$CONTAINER_DIR"
npm run start & 
CONTAINER_PID=$!

# Inicia o Remote em segundo plano
echo "Iniciando o Remote..."
cd "$REMOTE_DIR"
npm run start &
REMOTE_PID=$!

# Aguardar um tempo para garantir que os servidores estejam rodando antes dos testes
echo "Aguardando servidores iniciarem..."
sleep 10

# Executar os testes do Cypress
echo "Executando testes do Cypress..."
cd "$CONTAINER_DIR"
npm run cypress:run

# Encerrar os servidores após os testes
echo "Encerrando os servidores..."
kill $CONTAINER_PID
kill $REMOTE_PID

echo "Processo concluído!"
