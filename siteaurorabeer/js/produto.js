class Produto {
    constructor(id, nome, preco, imagem, categoria) {
        this.id = id;
        this.nome = nome;
        this.preco = preco;
        this.imagem = imagem;
        this.categoria = categoria;
        this.quantidade = 0;
    }

    adicionar() {
        this.quantidade++;
        this.atualizarDisplay();
    }

    remover() {
        if (this.quantidade > 0) {
            this.quantidade--;
        }
        this.atualizarDisplay();
    }

    atualizarDisplay() {
        document.getElementById(`quantidade-${this.id}`).innerText = this.quantidade;
    }
}

// Lista de produtos
const produtos = [
    new Produto("h2o", "H20 Limão 500ML", 6.00, "./imagens/produtos/h2ohlimao.png", "refrigerante"),
    new Produto("aguagas", "Água com Gás Santa Joana 500ML", 3.00, "./imagens/produtos/garrafa-500-ml-com-gas-removebg-preview.png", "refrigerante"),
    new Produto("vinho", "Vinho Tinto Suave (750ML)", 19.00, "./imagens/produtos/Vinho-Quinta-do-Morgado-Tinto-Suave-750-ML.webp", "alcoolica"),
    new Produto("coca2l", "Coca-Cola 2L", 13.00, "./imagens/produtos/coca2l.png", "refrigerante"),
    new Produto("coca1.5l", "Coca-Cola 1.5L", 9.00, "./imagens/produtos/coca1.5l.png", "refrigerante"),
    new Produto("coca2lzero", "Coca-Cola Zero 2L", 13.00, "./imagens/produtos/coca2lzero.png", "refrigerante"),
    new Produto("cocalata", "Coca-Cola 350ML (Lata)", 6.00, "./imagens/produtos/cocacolalata.png", "refrigerante"),
    new Produto("guarana", "Guaraná 350ML (Lata)", 6.00, "./imagens/produtos/guaranalata500ml.png", "refrigerante"),
    new Produto("cocazero", "Coca-Cola Zero 350ML (Lata)", 6.00, "./imagens/produtos/cocacolazerolata.png", "refrigerante"),
    new Produto("budweiser", "Budweiser LN 330ml", 8.00, "./imagens/produtos/CERVEJA-BUDWEISER-LONG-NECK-330ML-ZERO-ALCOOL.png", "alcoolica"),
    new Produto("heineken", "Heineken LN 330ML", 8.00, "./imagens/produtos/CERVEJA-HEINEKEN-LONG-NECK-330ML.png", "alcoolica"),
    new Produto("itaipava", "Itaipava 473ML", 5.50, "./imagens/produtos/itaipava473ml.png", "alcoolica")
];

// Renderizar os produtos na página
function carregarProdutos(lista) {
    const container = document.getElementById("lista-produtos");
    container.innerHTML = "";

    lista.forEach(produto => {
        const produtoHTML = `
            <div class="produto ${produto.categoria}">
                <img src="${produto.imagem}" alt="${produto.nome}">
                <h3>${produto.nome}</h3>
                <p>R$ ${produto.preco.toFixed(2)}</p>
                <button onclick="removerDoCarrinho('${produto.id}')">-</button>
                <span id="quantidade-${produto.id}">${produto.quantidade}</span>
                <button onclick="adicionarAoCarrinho('${produto.id}')">+</button>
            </div>
        `;
        container.innerHTML += produtoHTML;
    });
}

// Filtrar produtos
function filtrarProdutos(tipo) {
    if (tipo === "todos") {
        carregarProdutos(produtos);
    } else {
        const filtrados = produtos.filter(produto => produto.categoria === tipo);
        carregarProdutos(filtrados);
    }
}
let carrinho = {};

function adicionarAoCarrinho(id) {
    const produto = produtos.find(p => p.id === id);
    if (produto) {
        // Verificar se o produto já está no carrinho
        if (carrinho[produto.id]) {
            // Se já estiver no carrinho, aumentar a quantidade
            carrinho[produto.id].quantidade++;
        } else {
            // Caso contrário, adicionar o produto ao carrinho com quantidade 1
            carrinho[produto.id] = {
                nome: produto.nome,
                preco: produto.preco,
                quantidade: 1
            };
        }

        // Atualizar o display do carrinho
        produto.adicionar();
        atualizarCarrinhoDisplay();
    }
}

// Função para atualizar o display do carrinho (exibe quantidade de produtos no carrinho)
function atualizarCarrinhoDisplay() {
    console.log("Carrinho atualizado:", carrinho);
    // Aqui você pode adicionar o código para atualizar a interface do usuário com os dados do carrinho
}


function removerDoCarrinho(id) {
    const produto = produtos.find(p => p.id === id);
    if (produto) {
        produto.remover();
    }
}

// Inicializa a página carregando todos os produtos
window.onload = () => carregarProdutos(produtos);
