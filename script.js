const menu = document.getElementById("menu")
const cartBtn = document.getElementById("cart-btn")
const cartModal = document.getElementById("cart-modal")
const cartItemsContainer = document.getElementById("cart-items")
const cartTotal = document.getElementById("cart-total")
const checkoutBtn = document.getElementById("checkout-btn")
const closeModalBtn = document.getElementById("close-modal-btn")
const cartCounter = document.getElementById("cart-count")
const addressInput = document.getElementById("address")
const addressWarn = document.getElementById("address-warn")

let cart = [];

// clicar o botão do carrinho irá abrir o menu MODAL, o update serve para atualizar sempre que clicar novamente
cartBtn.addEventListener("click", function(){
    updateCartModal();
    cartModal.style.display = "flex"
})

// clicar fora do carrinho irá fechar o MODAL
cartModal.addEventListener("click", function(event){
    if(event.target === cartModal){
        cartModal.style.display = "none"
    }
})

// clicar no botão fechar no carrinho irá fechar o MODAL, depois criar um alerta para saber se quer fechar mesmo
closeModalBtn.addEventListener("click", function(){
    // alert("certeza que quer fechar o carrinho?")
    cartModal.style.display = "none"
})

menu.addEventListener("click", function(event){
    // lembrar do ponto(.) que referencia a classe e se fosse o id seria o (#)
    let parentButton = event.target.closest(".add-to-cart-btn")
    
    if(parentButton){
        const name = parentButton.getAttribute("data-name")
        const price = parseFloat(parentButton.getAttribute("data-price"))
        addToCart(name, price)
    }
})

// função para adicionar no carrinho CART
function addToCart(name, price){
    // o find irá procurar se já existe um item igual na lista
    const existingItem = cart.find(item => item.name === name)

    if(existingItem){
        //Se o item já existe, aumenta apenas a quantidade + 1
        existingItem.quantity += 1;
    }else{
        cart.push({
            name,
            price,
            quantity: 1,
        })

    }
    
    updateCartModal()
    
}

// Atualiza carrinho no front
function updateCartModal(){
    cartItemsContainer.innerHTML = "";
    let total = 0;
    // ele percorre a lista [] e cria um elemento (div)
    cart.forEach(item => {
        const cartItemElement = document.createElement("div");
        cartItemElement.classList.add("flex", "justify-between", "mb-4", "flex-col")

        //prestar atenção nas (``)
        cartItemElement.innerHTML = `
        <div class="flex items-center justify-between">
            <div>
                <p class="font-medium">${item.name}</p>
                <p>Qtd: ${item.quantity}</p>
                <p class="font-medium mt-2">R$ ${item.price.toFixed(2)}</p>
            </div>


            <button class="remove-from_cart-btn" data-name="${item.name}">
                Remover
            </button>

        </div>    
        `
        // aqui o total vai somar o valor que já tem vezes a quantidade selecionada
        total += item.price * item.quantity;

        cartItemsContainer.appendChild(cartItemElement)

    })

cartTotal.textContent = total.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
});

cartCounter.innerHTML = cart.length;

}

// Função para remover item do carrinho
cartItemsContainer.addEventListener("click", function (event){
    if(event.target.classList.contains("remove-from_cart-btn")){
        const name = event.target.getAttribute("data-name")

        removeItemCart(name);
    }
})

function removeItemCart(name){
    const index = cart.findIndex(item => item.name === name);

    if(index !== -1){
        const item = cart[index];
        //aqui cria a condição para diminuir apenas -1 se você clicar em remover uma vez
        if(item.quantity > 1){
            item.quantity -= 1;
            updateCartModal();
            return;
        }
        //o comando splice vai remover geral se tiver o valor de 1 ao apertar o botao
        cart.splice(index, 1);
        updateCartModal();
    }
}

//feito para monitorar o input do endereço
addressInput.addEventListener("input", function(event){
    let inputValue = event.target.value;

    if(inputValue !== ""){
        addressInput.classList.remove("border-red-500")
        // addressInput.classList.add("hidden") DESCOBRIR PQ EU BOTEI ISSO, DANDO ERRO APAGANDO O ENDEREÇO
    }

})

// Finalizar pedido
checkoutBtn.addEventListener("click", function(){

    const isOpen = checkDogaoOpen();
    if(!isOpen){
        
        Toastify({
        text: "Sentimos muito mas estamos fechados no momento! Favor Tentar no horário entre 18h40 e 22h30 de Sexta à Domingo!",
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "#ef4444",
        },
        }).showToast();

        return;
    }

    if(cart.length === 0) return; // se não tiver nenhum pedido no carrinho
    if(addressInput.value === ""){
        addressWarn.classList.remove("hidden")
        addressInput.classList.add("border-red-500") //se não escrever endereço fica vermelho
        return;
    }

    //Enviar pedido para API WHATS
    const cartItems = cart.map((item) => {
        return (
            ` ${item.name} Quantidade: (${item.quantity}) Preço: R$ ${item.price} |`
        )
    }).join("") //serve para juntar o array e transforma o pedido num texto

    const message = encodeURIComponent(cartItems)
    const phone = "83999434000"

    window.open(`https://wa.me/${phone}?text=${message} Endereço: ${addressInput.value}`, "_blank")
    // API do whatsapp Business é paga
    cart = [];
    updateCartModal();
    //cart.length = 0; faz a mesma coisa que cart = [];

})

// Verificar se a hora da lanchonete está funcionando, card horario
function checkDogaoOpen(){
    const data = new Date();
    const hora = data.getHours();
    return hora >= 21 && hora < 23;
    
    //true = restaurante aberto (checar como colcoar horário quebrado)
}

// testar porque não está mudando a cor //////////////////////////
const spanItem = document.getElementById("date-span")
const isOpen = checkDogaoOpen();

if(isOpen){
    spanItem.classList.remove("bg-red-500");
    spanItem.classList.add("bg-green-500")
}else{
    spanItem.classList.remove("bg-green-500");
    spanItem.classList.add("bg-red-500")
}