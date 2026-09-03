require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { inicializarBD } = require('./database');

// ==================== IMPORTAR ROTAS ====================
const produtosRouter = require('./routes/produtos');
const authRouter = require('./routes/auth');
const pedidosRouter = require('./routes/pedidos');

// ==================== CONFIGURAÇÃO ====================
const app = express();
const PORT = process.env.PORT || 5000;

// ==================== MIDDLEWARES ====================
app.use(cors());
app.use(express.json());

// ==================== ROTA DE TESTE ====================
app.get('/', (req, res) => {
    res.json({
        mensagem: '🔥 Bem-vindo à API Dark Fitness!',
        versao: '1.0.0',
        endpoints: {
            produtos: '/api/produtos',
            autenticacao: '/api/auth/login',
            pedidos: '/api/pedidos'
        }
    });
});

// ==================== ROTAS DA API ====================
app.use('/api/produtos', produtosRouter);
app.use('/api/auth', authRouter);
app.use('/api/pedidos', pedidosRouter);

// ==================== TRATAMENTO DE ERROS ====================
app.use((err, req, res, next) => {
    console.error('Erro:', err);
    res.status(500).json({ erro: 'Erro interno do servidor' });
});

// ==================== INICIAR SERVIDOR ====================
async function iniciar() {
    try {
        await inicializarBD();
        
        app.listen(PORT, () => {
            console.log(`
╔═══════════════════════════════════╗
║   🔥 DARK FITNESS - API v1.0.0   ║
╚═══════════════════════════════════╝

✅ Servidor rodando em: http://localhost:${PORT}
📍 Endpoints:
   GET  /api/produtos - Listar produtos
   POST /api/produtos - Criar produto (admin)
   POST /api/auth/login - Fazer login
   POST /api/pedidos - Criar pedido
   GET  /api/pedidos - Listar pedidos (admin)
            `);
        });
    } catch (error) {
        console.error('❌ Erro ao iniciar servidor:', error);
        process.exit(1);
    }
}

iniciar();

module.exports = app;
