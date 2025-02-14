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
    new Produto("aguagas", "Água com Gás Santa Joana 500ML", 3.00, "./imagens/produtos/garrafa-500-ml-com-gas-removebg-preview.png"), 
    

    new Produto("coca2l", "Coca-Cola 2L", 13.00, "./imagens/produtos/coca2l.png", "refrigerante"),
    new Produto("coca1.5l", "Coca-Cola 1.5L", 9.00, "./imagens/produtos/coca1.5l.png", "refrigerante"),
    new Produto("coca2lzero", "Coca-Cola Zero 2L", 13.00, "./imagens/produtos/coca2lzero.png", "refrigerante"),
    new Produto("cocalata", "Coca-Cola 350ML (Lata)", 6.00, "./imagens/produtos/cocacolalata.png", "refrigerante"),
    new Produto("guarana", "Guaraná 350ML (Lata)", 6.00, "./imagens/produtos/guaranalata500ml.png", "refrigerante"),
    new Produto("cocazero", "Coca-Cola Zero 350ML (Lata)", 6.00, "./imagens/produtos/cocacolazerolata.png", "refrigerante"),
    new Produto("caipirinhalimao","Caipirinha de Limão 400ML", 8.00, "./imagens/produtos/caipirinhalimao.png","alcoolica"),
    new Produto("budweiser", "Budweiser LN 330ml", 8.00, "./imagens/produtos/CERVEJA-BUDWEISER-LONG-NECK-330ML-ZERO-ALCOOL.png", "alcoolica"),
    new Produto("heineken", "Heineken LN 330ML", 8.00, "./imagens/produtos/CERVEJA-HEINEKEN-LONG-NECK-330ML.png", "alcoolica"),
    new Produto("itaipava", "Itaipava 473ML", 5.50, "./imagens/produtos/itaipava473ml.png", "alcoolica"),
    new Produto("vinho", "Vinho Tinto Suave (750ML)", 19.00, "./imagens/produtos/Vinho-Quinta-do-Morgado-Tinto-Suave-750-ML.webp", "alcoolica")
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

        // Se o produto tiver um método 'adicionar', chama ele
        if (produto.adicionar) produto.adicionar();

        // Atualizar o display do carrinho
        atualizarCarrinhoDisplay();
    }
}

// Função para remover um item do carrinho
function removerDoCarrinho(id) {
    const produto = produtos.find(p => p.id === id);
    if (produto && carrinho[produto.id]) {
        // Reduz a quantidade se for maior que 1
        if (carrinho[produto.id].quantidade > 1) {
            carrinho[produto.id].quantidade--;
        } else {
            // Se for 1, remove do carrinho
            delete carrinho[produto.id];
        }

        // Se o produto tiver um método 'remover', chama ele
        if (produto.remover) produto.remover();

        // Atualizar o display do carrinho
        atualizarCarrinhoDisplay();
    }
}

function calcularTotal() {
    let total = 0;

    // Percorrer todos os itens no carrinho
    for (let produtoId in carrinho) {
        const item = carrinho[produtoId];

        if (item.id === "caipirinhalimao") {
            let quantidade = item.quantidade;

            // Verificar se tem 2 caipirinhas: aplicar promoção
            if (quantidade >= 2) {
                // Calculando a quantidade de pares de 2 caipirinhas
                let pares = Math.floor(quantidade / 2);
                let resto = quantidade % 2;  // Restante das caipirinhas (se houver 1 caipirinha extra)

                // Calcula o total da promoção: cada par custa 15
                total += (pares * 15) + (resto * 8);  // O resto é cobrado pelo preço normal de R$ 8
            } else {
                // Se houver menos de 2 caipirinhas, calcula normalmente
                total += item.preco * item.quantidade;
            }
        } else {
            // Para outros produtos, soma o preço normalmente
            total += item.preco * item.quantidade;
        }
    }

    return total;
}

function atualizarCarrinhoDisplay() {
    console.log("Carrinho atualizado:", carrinho);
    console.log("Total calculado:", calcularTotal());
}

// Inicializa a página carregando todos os produtos
window.onload = () => carregarProdutos(produtos);
