// ==================== PRODUTOS INICIAIS ====================
const produtos = [
    // SUPLEMENTOS
    {
        id: 1,
        nome: "Whey Protein Premium",
        categoria: "suplementos",
        preco: 189.90,
        descricao: "Whey Protein isolado, 2kg, sabor chocolate",
        emoji: "💪"
    },
    {
        id: 2,
        nome: "BCAA Dark Lab",
        categoria: "suplementos",
        preco: 79.90,
        descricao: "BCAA 2:1:1, 250g, sabor maçã verde",
        emoji: "⚡"
    },
    {
        id: 3,
        nome: "Creatina Monohidratada",
        categoria: "suplementos",
        preco: 89.90,
        descricao: "Creatina 100% pura, 300g",
        emoji: "🔥"
    },
    {
        id: 4,
        nome: "Pré-Treino Dark Force",
        categoria: "suplementos",
        preco: 119.90,
        descricao: "Pré-treino explosivo, 300g",
        emoji: "💣"
    },
    {
        id: 5,
        nome: "Multivitamínico Premium",
        categoria: "suplementos",
        preco: 99.90,
        descricao: "Completo, 60 cápsulas",
        emoji: "💊"
    },
    {
        id: 6,
        nome: "Ômega 3 1000mg",
        categoria: "suplementos",
        preco: 69.90,
        descricao: "60 cápsulas, máxima pureza",
        emoji: "🐟"
    },
    
    // ROUPAS
    {
        id: 7,
        nome: "Camiseta Dark Lab Vermelha",
        categoria: "roupas",
        preco: 59.90,
        descricao: "Camiseta básica, 100% algodão",
        emoji: "👕"
    },
    {
        id: 8,
        nome: "Regata Dark Fitness Preta",
        categoria: "roupas",
        preco: 49.90,
        descricao: "Regata cavada, respirável",
        emoji: "🏋️"
    },
    {
        id: 9,
        nome: "Bermuda Fitness Cinza",
        categoria: "roupas",
        preco: 79.90,
        descricao: "Bermuda confortável, com bolsos",
        emoji: "⚫"
    },
    {
        id: 10,
        nome: "Jaqueta Dark Lab Preta",
        categoria: "roupas",
        preco: 199.90,
        descricao: "Jaqueta impermeável, logo bordado",
        emoji: "🧥"
    },
    {
        id: 11,
        nome: "Meia Técnica Dark",
        categoria: "roupas",
        preco: 29.90,
        descricao: "3 pares, antitranspirante",
        emoji: "🧦"
    },
    {
        id: 12,
        nome: "Boné Dark Fitness",
        categoria: "roupas",
        preco: 39.90,
        descricao: "Ajustável, proteção UV",
        emoji: "🧢"
    }
];

// ==================== ESTADO DO APP ====================
let carrinho = [];
let modo = localStorage.getItem('tema') || 'light';
let filtroAtual = 'todos';

// ==================== INICIALIZAÇÃO ====================
document.addEventListener('DOMContentLoaded', () => {
    inicializarTema();
    carregarProdutos();
    configurarEventos();
    carregarCarrinho();
});

// ==================== TEMA (CLARO/ESCURO) ====================
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

// ==================== CARREGAR PRODUTOS ====================
function carregarProdutos() {
    const grid = document.getElementById('products-grid');
    grid.innerHTML = '';
    
    let produtosFiltrados = produtos;
    if (filtroAtual !== 'todos') {
        produtosFiltrados = produtos.filter(p => p.categoria === filtroAtual);
    }
    
    produtosFiltrados.forEach(produto => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-image">${produto.emoji}</div>
            <div class="product-info">
                <div class="product-category">${produto.categoria}</div>
                <div class="product-name">${produto.nome}</div>
                <div class="product-description">${produto.descricao}</div>
                <div class="product-price">R$ ${produto.preco.toFixed(2)}</div>
                <div class="product-actions">
                    <button class="btn-small btn-add" onclick="adicionarCarrinho(${produto.id})">Comprar</button>
                    <button class="btn-small btn-view" onclick="abrirDetalheProduto(${produto.id})">Ver Mais</button>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

// ==================== FILTROS ====================
function configurarEventos() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            filtroAtual = e.target.dataset.filter;
            carregarProdutos();
        });
    });
}

// ==================== CARRINHO ====================
function adicionarCarrinho(produtoId) {
    const produto = produtos.find(p => p.id === produtoId);
    const itemCarrinho = carrinho.find(item => item.id === produtoId);
    
    if (itemCarrinho) {
        itemCarrinho.quantidade += 1;
    } else {
        carrinho.push({
            ...produto,
            quantidade: 1
        });
    }
    
    salvarCarrinho();
    atualizarCarrinho();
    
    // Feedback visual
    alert(`${produto.nome} adicionado ao carrinho! ✅`);
}

function abrirCarrinho() {
    const modal = document.getElementById('cart-modal');
    const cartItems = document.getElementById('cart-items');
    
    if (carrinho.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; padding: 20px;">Seu carrinho está vazio 😢</p>';
    } else {
        cartItems.innerHTML = carrinho.map(item => `
            <div class="cart-item">
                <div>
                    <div class="cart-item-name">${item.nome}</div>
                    <small>Quantidade: ${item.quantidade}</small>
                </div>
                <div>
                    <div class="cart-item-price">R$ ${(item.preco * item.quantidade).toFixed(2)}</div>
                    <button class="cart-item-remove" onclick="removerCarrinho(${item.id})">Remover</button>
                </div>
            </div>
        `).join('');
    }
    
    // Calcular total
    const total = carrinho.reduce((acc, item) => acc + (item.preco * item.quantidade), 0);
    document.getElementById('total-price').textContent = total.toFixed(2);
    
    modal.style.display = 'block';
}

function removerCarrinho(produtoId) {
    carrinho = carrinho.filter(item => item.id !== produtoId);
    salvarCarrinho();
    atualizarCarrinho();
    abrirCarrinho(); // Atualizar o modal
}

function atualizarCarrinho() {
    const count = carrinho.reduce((acc, item) => acc + item.quantidade, 0);
    document.getElementById('cart-count').textContent = count;
}

function salvarCarrinho() {
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
}

function carregarCarrinho() {
    const saved = localStorage.getItem('carrinho');
    if (saved) {
        carrinho = JSON.parse(saved);
        atualizarCarrinho();
    }
}

// ==================== MODAL DO PRODUTO ====================
function abrirDetalheProduto(produtoId) {
    const produto = produtos.find(p => p.id === produtoId);
    const modal = document.getElementById('product-modal');
    const modalBody = document.getElementById('modal-body');
    
    modalBody.innerHTML = `
        <div class="modal-image">${produto.emoji}</div>
        <div class="modal-details">
            <h3>${produto.nome}</h3>
            <p><strong>Categoria:</strong> ${produto.categoria}</p>
            <p>${produto.descricao}</p>
            <div class="modal-price">R$ ${produto.preco.toFixed(2)}</div>
            <div class="modal-quantity">
                <button onclick="mudarQuantidade('menos')">−</button>
                <input type="number" id="quantidade-input" value="1" min="1">
                <button onclick="mudarQuantidade('mais')">+</button>
            </div>
            <button class="btn-primary" onclick="adicionarCarrinho(${produto.id})" style="width: 100%;">Adicionar ao Carrinho</button>
        </div>
    `;
    
    modal.style.display = 'block';
}

function mudarQuantidade(direcao) {
    const input = document.getElementById('quantidade-input');
    let valor = parseInt(input.value);
    
    if (direcao === 'mais') {
        valor += 1;
    } else if (direcao === 'menos' && valor > 1) {
        valor -= 1;
    }
    
    input.value = valor;
}

// ==================== FECHAR MODAIS ====================
document.querySelectorAll('.close').forEach(closeBtn => {
    closeBtn.addEventListener('click', (e) => {
        e.target.closest('.modal').style.display = 'none';
    });
});

window.addEventListener('click', (e) => {
    const cartModal = document.getElementById('cart-modal');
    const productModal = document.getElementById('product-modal');
    
    if (e.target === cartModal) {
        cartModal.style.display = 'none';
    }
    if (e.target === productModal) {
        productModal.style.display = 'none';
    }
});

// ==================== CARRINHO ICON ====================
document.querySelector('.cart-icon').addEventListener('click', abrirCarrinho);

// ==================== MOSTRAR/OCULTAR MENU MOBILE ====================
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        document.querySelector('.nav-menu').style.display = 'flex';
    }
});