document.getElementById("modal").style.display = "none";

// Função para abrir o modal
function abrirModal() {
    document.getElementById("modal").style.display = "flex";
}

// Função para fechar o modal
function fecharModal() {
    document.getElementById("modal").style.display = "none";
}

function enviarPedidoWhatsApp() {
    const nome = document.getElementById("nome").value;
    const endereco = document.getElementById("endereco").value;
    const metodoPagamento = document.getElementById("pagamento").value;

    // Verificar se todos os campos estão preenchidos
    if (!nome || !endereco || !metodoPagamento) {
        alert("Por favor, preencha todos os campos antes de enviar o pedido.");
        return;
    }

    const numeroDono = "5581993113251";  // Número do WhatsApp do dono da loja
    let mensagem = "Meu Pedido:\n\n";  // Emote diretamente aqui
 
    if (Object.keys(carrinho).length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    // Adicionando os produtos do carrinho à mensagem
    for (let produto in carrinho) {
        mensagem += `${carrinho[produto].quantidade}x ${carrinho[produto].nome} - R$ ${carrinho[produto].preco.toFixed(2)}\n`;
    }

    mensagem += `\nTotal: R$ ${calcularTotal().toFixed(2)}\n\n`;

    // Adicionando as informações do usuário
    mensagem += `Nome: ${nome}`;
    mensagem += `\nEndereço: ${endereco}`;
    mensagem += `\nMétodo de Pagamento: ${metodoPagamento}`;

    mensagem += "\n\nQuero receber meu pedido!";

    // Codificando a mensagem para que o WhatsApp possa processá-la corretamente
    const mensagemCodificada = encodeURIComponent(mensagem);

    // Enviar para o WhatsApp
    const linkWhatsApp = `https://api.whatsapp.com/send/?phone=5581993113251&text=${mensagemCodificada}&type=phone_number&app_absent=0`;

    window.open(linkWhatsApp, "_blank");
    console.log(linkWhatsApp);

    // Fechar o modal após enviar
    fecharModal();
}

// Função para calcular o total do pedido
function calcularTotal() {
    let total = 0;
    for (let produto in carrinho) {
        total += carrinho[produto].preco * carrinho[produto].quantidade;
    }
    return total;
}
