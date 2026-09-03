# Dark Fitness - Backend

Backend API para a loja Dark Fitness, desenvolvido com Node.js, Express e MySQL.

## 🚀 Instalação

1. **Instalar dependências:**
```bash
npm install
```

2. **Configurar variáveis de ambiente (.env):**
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=dark_fitness
JWT_SECRET=seu_secret_key_aqui
PORT=5000
```

3. **Criar banco de dados MySQL:**
```sql
CREATE DATABASE dark_fitness;
```

4. **Iniciar servidor:**
```bash
npm start
# ou para desenvolvimento
npm run dev
```

## 📋 Endpoints da API

### Produtos
- `GET /api/produtos` - Listar todos os produtos
- `GET /api/produtos/:id` - Buscar produto por ID
- `GET /api/produtos/categoria/:categoria` - Filtrar por categoria
- `POST /api/produtos` - Criar produto (requer autenticação admin)
- `PUT /api/produtos/:id` - Atualizar produto (requer autenticação admin)
- `DELETE /api/produtos/:id` - Excluir produto (requer autenticação admin)

### Autenticação
- `POST /api/auth/login` - Fazer login
- `POST /api/auth/registrar` - Registrar novo usuário

### Pedidos
- `POST /api/pedidos` - Criar novo pedido
- `GET /api/pedidos` - Listar pedidos (requer autenticação admin)
- `GET /api/pedidos/:id` - Buscar pedido por ID
- `PUT /api/pedidos/:id` - Atualizar status pedido (requer autenticação admin)

## 🔐 Autenticação

Use o token JWT retornado no login para acessar endpoints protegidos:

```bash
curl -H "Authorization: Bearer SEU_TOKEN" http://localhost:5000/api/pedidos
```

## 💾 Estrutura do Banco de Dados

### Tabela: usuarios
- id (INT)
- username (VARCHAR)
- password (VARCHAR - hash)
- email (VARCHAR)
- role (VARCHAR)

### Tabela: produtos
- id (INT)
- nome (VARCHAR)
- categoria (VARCHAR)
- preco (DECIMAL)
- descricao (TEXT)
- emoji (VARCHAR)
- estoque (INT)

### Tabela: pedidos
- id (INT)
- cliente_nome (VARCHAR)
- cliente_email (VARCHAR)
- cliente_telefone (VARCHAR)
- endereco (TEXT)
- valor_total (DECIMAL)
- status (VARCHAR)

### Tabela: itens_pedido
- id (INT)
- pedido_id (INT - FK)
- produto_id (INT - FK)
- quantidade (INT)
- preco_unitario (DECIMAL)
- subtotal (DECIMAL)

## 🔑 Credenciais Padrão

- **Usuário:** admin
- **Senha:** 123
- **Email:** admin@darkfitness.com

## 📝 Exemplos de Requisições

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"123"}'
```

### Listar Produtos
```bash
curl http://localhost:5000/api/produtos
```

### Criar Produto
```bash
curl -X POST http://localhost:5000/api/produtos \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN" \
  -d '{
    "nome":"Novo Produto",
    "categoria":"suplementos",
    "preco":99.90,
    "descricao":"Descrição do produto",
    "emoji":"💊",
    "estoque":50
  }'
```

### Criar Pedido
```bash
curl -X POST http://localhost:5000/api/pedidos \
  -H "Content-Type: application/json" \
  -d '{
    "cliente_nome":"João Silva",
    "cliente_email":"joao@email.com",
    "cliente_telefone":"11999999999",
    "endereco":"Rua X, 123",
    "itens":[
      {"produto_id":1,"quantidade":2},
      {"produto_id":3,"quantidade":1}
    ]
  }'
```

## ⚙️ Desenvolvimento

Para desenvolver com nodemon (auto-reload):
```bash
npm run dev
```

## 📦 Dependências

- **express** - Framework web
- **mysql2** - Driver MySQL
- **cors** - Compartilhamento de recursos
- **dotenv** - Variáveis de ambiente
- **jsonwebtoken** - Autenticação JWT
- **bcryptjs** - Hash de senhas

## 🐛 Troubleshooting

**Erro de conexão com banco:**
- Verifique se MySQL está rodando
- Confirme as credenciais no .env
- Verifique se o banco de dados foi criado

**Erro de autenticação:**
- Verifique se o token está correto
- Confirme se o token não expirou
- Use a credencial padrão (admin/123)

## 📄 Licença

MIT
