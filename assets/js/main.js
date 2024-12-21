const cartCount = document.querySelector(".cart-count");
const cartModal = document.querySelector(".cart-modal");
const cartModalContent = document.querySelector(".cart-modal-content .cart-items");
const cartIcon = document.querySelector(".cart-icon");
const closeModalButton = document.querySelector(".close-modal");
const buttons = document.querySelectorAll(".box-button");

let cartItems = [];

function updateCartCount() {
  cartCount.textContent = cartItems.length;
}

function updateModal() {
  cartModalContent.innerHTML = "";

  cartItems.forEach((item, index) => {
    const itemElement = document.createElement("div");
    itemElement.className = "cart-item";
    itemElement.innerHTML = `
      <span>${item.name} - R$ ${item.price}</span>
      <button class="remove-item" data-index="${index}">Remover</button>
    `;
    cartModalContent.appendChild(itemElement);
  });

  const removeButtons = document.querySelectorAll(".remove-item");
  removeButtons.forEach(button => {
    button.addEventListener("click", () => {
      const index = button.getAttribute("data-index");
      cartItems.splice(index, 1);
      updateCartCount();
      updateModal();
    });
  });
}

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const itemName = button.getAttribute("data-name");
    const itemPrice = button.getAttribute("data-price");
    cartItems.push({ name: itemName, price: itemPrice });
    updateCartCount();
    updateModal();
  });
});

cartIcon.addEventListener("click", () => {
  cartModal.classList.add("show");
});

closeModalButton.addEventListener("click", () => {
  cartModal.classList.remove("show");
});

const navLinks = document.querySelectorAll(".nav-links ul");

navLinks.forEach((menu) => {
  menu.addEventListener("click", () => {
    const dropdown = menu.querySelector(".dropdown");

    if (dropdown) {
      dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
    }

    navLinks.forEach((otherMenu) => {
      if (otherMenu !== menu) {
        const otherDropdown = otherMenu.querySelector(".dropdown");
        if (otherDropdown) {
          otherDropdown.style.display = "none";
        }
      }
    });
  });
});

const sendWhatsAppButton = document.querySelector(".send-whatsapp");

sendWhatsAppButton.addEventListener("click", () => {
  if (cartItems.length === 0) {
    alert("Seu carrinho está vazio!");
    return;
  }

  let message = "Olá, gostaria de finalizar o pedido com os seguintes itens: ";

  cartItems.forEach(item => {
    message += `- ${item.name}: R$ ${item.price}%0A`;
  });

  const total = cartItems.reduce((sum, item) => sum + parseFloat(item.price), 0);
  message += `%0A*Total: R$ ${total.toFixed(2)}*`;

  const phone = "5524993197746";
  const whatsappURL = `https://wa.me/${phone}?text=${message}`;
  window.open(whatsappURL, "_blank");
});
