// ==================== AUTENTICAÇÃO ====================
let usuarioLogado = false;
let modo = localStorage.getItem('tema') || 'light';

// Dados de autenticação (simulado - em produção seria um backend)
const usuariosValidos = {
    'admin': '123',
    'user': '123'
};

// ==================== INICIALIZAÇÃO ====================
document.addEventListener('DOMContentLoaded', () => {
    inicializarTema();
    verificarLogin();
});

// ==================== TEMA ====================
function inicializarTema() {
    if (modo === 'dark') {
        document.body.classList.add('dark-mode');
        document.getElementById('theme-toggle').textContent = '☀️';
    }
}

document.getElementById('theme-toggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    if (document.body.classList.contains('dark-mode')) {
        modo = 'dark';
        document.getElementById('theme-toggle').textContent = '☀️';
    } else {
        modo = 'light';
        document.getElementById('theme-toggle').textContent = '🌙';
    }
    
    localStorage.setItem('tema', modo);
});

// ==================== LOGIN ====================
function fazerLogin(event) {
    event.preventDefault();
    
    const usuario = document.getElementById('username').value;
    const senha = document.getElementById('password').value;
    
    if (usuariosValidos[usuario] && usuariosValidos[usuario] === senha) {
        usuarioLogado = true;
        localStorage.setItem('usuarioLogado', 'true');
        localStorage.setItem('usuarioAtual', usuario);
        localStorage.setItem('loginTime', new Date().toLocaleString('pt-BR'));
        
        document.getElementById('login-screen').style.display = 'none';
        document.getElementById('admin-panel').style.display = 'block';
        
        carregarDashboard();
        carregarProdutos();
    } else {
        alert('❌ Usuário ou senha incorretos!');
    }
}

function verificarLogin() {
    const estaLogado = localStorage.getItem('usuarioLogado') === 'true';
    
    if (estaLogado) {
        usuarioLogado = true;
        document.getElementById('login-screen').style.display = 'none';
        document.getElementById('admin-panel').style.display = 'block';
        carregarDashboard();
        carregarProdutos();
    }
}

function logout() {
    usuarioLogado = false;
    localStorage.removeItem('usuarioLogado');
    localStorage.removeItem('usuarioAtual');
    
    document.getElementById('login-screen').style.display = 'flex';
    document.getElementById('admin-panel').style.display = 'none';
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
}

// ==================== NAVEGAÇÃO ====================
function mudarSecao(secao) {
    // Ocultar todas as seções
    const secoes = document.querySelectorAll('.admin-section');
    secoes.forEach(s => s.classList.remove('active'));
    
    // Desativar todos os botões
    const botoes = document.querySelectorAll('.admin-menu button');
    botoes.forEach(b => b.classList.remove('active'));
    
    // Ativar seção e botão selecionados
    document.getElementById(secao).classList.add('active');
    event.target.classList.add('active');
}

// ==================== DASHBOARD ====================
function carregarDashboard() {
    const produtos = JSON.parse(localStorage.getItem('produtosAdmin') || '[]');
    
    const totalProdutos = produtos.length;
    const totalSupl = produtos.filter(p => p.categoria === 'suplementos').length;
    const totalRoupas = produtos.filter(p => p.categoria === 'roupas').length;
    const valorTotal = produtos.reduce((acc, p) => acc + (p.preco * (p.estoque || 1)), 0);
    
    document.getElementById('total-produtos').textContent = totalProdutos;
    document.getElementById('total-suplementos').textContent = totalSupl;
    document.getElementById('total-roupas').textContent = totalRoupas;
    document.getElementById('valor-estoque').textContent = 'R$ ' + valorTotal.toFixed(2);
    
    // Atualizar último login
    const ultimoLogin = localStorage.getItem('loginTime');
    if (ultimoLogin) {
        document.getElementById('last-login').textContent = ultimoLogin;
    }
}

// ==================== PRODUTOS ====================
function carregarProdutos() {
    let produtos = JSON.parse(localStorage.getItem('produtosAdmin') || '[]');
    
    // Se estiver vazio, carregar produtos padrão
    if (produtos.length === 0) {
        produtos = [
            { id: 1, nome: "Whey Protein Premium", categoria: "suplementos", preco: 189.90, descricao: "Whey Protein isolado, 2kg, sabor chocolate", emoji: "💪", estoque: 50 },
            { id: 2, nome: "BCAA Dark Lab", categoria: "suplementos", preco: 79.90, descricao: "BCAA 2:1:1, 250g, sabor maçã verde", emoji: "⚡", estoque: 30 },
            { id: 3, nome: "Creatina Monohidratada", categoria: "suplementos", preco: 89.90, descricao: "Creatina 100% pura, 300g", emoji: "🔥", estoque: 25 },
            { id: 4, nome: "Pré-Treino Dark Force", categoria: "suplementos", preco: 119.90, descricao: "Pré-treino explosivo, 300g", emoji: "💣", estoque: 20 },
            { id: 5, nome: "Multivitamínico Premium", categoria: "suplementos", preco: 99.90, descricao: "Completo, 60 cápsulas", emoji: "💊", estoque: 35 },
            { id: 6, nome: "Ômega 3 1000mg", categoria: "suplementos", preco: 69.90, descricao: "60 cápsulas, máxima pureza", emoji: "🐟", estoque: 40 },
            { id: 7, nome: "Camiseta Dark Lab Vermelha", categoria: "roupas", preco: 59.90, descricao: "Camiseta básica, 100% algodão", emoji: "👕", estoque: 100 },
            { id: 8, nome: "Regata Dark Fitness Preta", categoria: "roupas", preco: 49.90, descricao: "Regata cavada, respirável", emoji: "🏋️", estoque: 80 },
            { id: 9, nome: "Bermuda Fitness Cinza", categoria: "roupas", preco: 79.90, descricao: "Bermuda confortável, com bolsos", emoji: "⚫", estoque: 60 },
            { id: 10, nome: "Jaqueta Dark Lab Preta", categoria: "roupas", preco: 199.90, descricao: "Jaqueta impermeável, logo bordado", emoji: "🧥", estoque: 30 },
            { id: 11, nome: "Meia Técnica Dark", categoria: "roupas", preco: 29.90, descricao: "3 pares, antitranspirante", emoji: "🧦", estoque: 150 },
            { id: 12, nome: "Boné Dark Fitness", categoria: "roupas", preco: 39.90, descricao: "Ajustável, proteção UV", emoji: "🧢", estoque: 75 }
        ];
        localStorage.setItem('produtosAdmin', JSON.stringify(produtos));
    }
    
    const tbody = document.getElementById('products-list');
    tbody.innerHTML = '';
    
    produtos.forEach(produto => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${produto.id}</td>
            <td>${produto.nome}</td>
            <td>${produto.categoria}</td>
            <td>R$ ${produto.preco.toFixed(2)}</td>
            <td>${produto.descricao}</td>
            <td>
                <div class="table-actions">
                    <button class="btn-edit" onclick="editarProduto(${produto.id})">Editar</button>
                    <button class="btn-delete" onclick="excluirProduto(${produto.id})">Excluir</button>
                </div>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function adicionarProduto(event) {
    event.preventDefault();
    
    const produtos = JSON.parse(localStorage.getItem('produtosAdmin') || '[]');
    
    const novoId = Math.max(...produtos.map(p => p.id), 0) + 1;
    
    const novoProduto = {
        id: novoId,
        nome: document.getElementById('novo-nome').value,
        categoria: document.getElementById('novo-categoria').value,
        preco: parseFloat(document.getElementById('novo-preco').value),
        descricao: document.getElementById('novo-descricao').value,
        emoji: document.getElementById('novo-emoji').value,
        estoque: 50
    };
    
    produtos.push(novoProduto);
    localStorage.setItem('produtosAdmin', JSON.stringify(produtos));
    
    alert(`✅ Produto "${novoProduto.nome}" adicionado com sucesso!`);
    
    limparFormulario();
    carregarProdutos();
    carregarDashboard();
    
    // Atualizar produtos no script.js também
    sincronizarProdutos(produtos);
}

function editarProduto(id) {
    const produtos = JSON.parse(localStorage.getItem('produtosAdmin') || '[]');
    const produto = produtos.find(p => p.id === id);
    
    if (!produto) return;
    
    const novoNome = prompt('Nome do produto:', produto.nome);
    if (!novoNome) return;
    
    const novoPreco = prompt('Novo preço:', produto.preco);
    if (!novoPreco) return;
    
    const novaDescricao = prompt('Nova descrição:', produto.descricao);
    if (!novaDescricao) return;
    
    produto.nome = novoNome;
    produto.preco = parseFloat(novoPreco);
    produto.descricao = novaDescricao;
    
    localStorage.setItem('produtosAdmin', JSON.stringify(produtos));
    
    alert('✅ Produto atualizado com sucesso!');
    
    carregarProdutos();
    carregarDashboard();
    
    // Sincronizar com script.js
    sincronizarProdutos(produtos);
}

function excluirProduto(id) {
    if (!confirm('⚠️ Tem certeza que deseja excluir este produto?')) {
        return;
    }
    
    let produtos = JSON.parse(localStorage.getItem('produtosAdmin') || '[]');
    const produto = produtos.find(p => p.id === id);
    
    produtos = produtos.filter(p => p.id !== id);
    localStorage.setItem('produtosAdmin', JSON.stringify(produtos));
    
    alert(`✅ Produto "${produto.nome}" excluído com sucesso!`);
    
    carregarProdutos();
    carregarDashboard();
    
    // Sincronizar com script.js
    sincronizarProdutos(produtos);
}

function limparFormulario() {
    document.getElementById('novo-nome').value = '';
    document.getElementById('novo-categoria').value = '';
    document.getElementById('novo-preco').value = '';
    document.getElementById('novo-descricao').value = '';
    document.getElementById('novo-emoji').value = '';
}

function sincronizarProdutos(produtos) {
    // Atualizar os produtos no localStorage para que script.js também veja
    localStorage.setItem('produtosAtualizados', JSON.stringify(produtos));
}