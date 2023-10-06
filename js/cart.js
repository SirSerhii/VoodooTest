let cartItems = [];

function addToCart(title, price, imageUrl) {
  const existingItem = cartItems.find(item => item.title === title);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    const newItem = {
      title: title,
      price: price,
      imageUrl: imageUrl,
      quantity: 1
    };
    cartItems.push(newItem);
  }

  const cartContainer = document.getElementById('cart-container');
  cartContainer.innerHTML = '';

  cartItems.forEach(renderCartItem);

  updateCartTotal();
}

function renderCartItem(item) {
  const totalPrice = item.price * item.quantity;

  const itemContainer = document.createElement('div');
  itemContainer.classList.add('p-2', 'flex', 'items-center' );

  const itemImage = document.createElement('img');
  itemImage.src = item.imageUrl;
  itemImage.alt = item.title;
  itemImage.classList.add('w-16', 'h-16', 'mr-2');
  itemContainer.appendChild(itemImage);

  const itemInfo = document.createElement('div');
  itemInfo.classList.add('flex', 'flex-col', 'justify-between', 'flex-grow');

  const itemName = document.createElement('h4');
  itemName.textContent = item.title;
  itemName.classList.add('text-orange-50', 'text-sm', 'mb-1', 'capitalize');
  itemInfo.appendChild(itemName);
  
  const itemPrice = document.createElement('p');
  itemPrice.textContent = `Price: ${totalPrice.toFixed(2)} KR.`;
  itemPrice.classList.add('text-orange-50', 'text-sm', 'mb-1');
  itemInfo.appendChild(itemPrice);

  const itemQuantity = document.createElement('div');
  itemQuantity.classList.add('flex', 'items-center');

  const decreaseButton = document.createElement('button');
  decreaseButton.textContent = '-';
  decreaseButton.classList.add('text-orange-50', 'text-lg', 'mr-1', 'id=decreaseButton');
  itemQuantity.appendChild(decreaseButton);
  decreaseButton.addEventListener("click", decreaseItemQuantity);

  function decreaseItemQuantity() {
    const existingItem = cartItems.find(item => item.title === itemName.textContent);
    
  if (existingItem && existingItem.quantity > 1) {
    existingItem.quantity -= 1;
    updateCart();
  }
  updateCartTotal();
  }

  const quantityDisplay = document.createElement('span');
  quantityDisplay.textContent = item.quantity;
  quantityDisplay.classList.add('text-orange-50', 'text-lg', 'mx-2');
  itemQuantity.appendChild(quantityDisplay);

  const increaseButton = document.createElement('button');
  increaseButton.textContent = '+';
  increaseButton.classList.add('text-orange-50', 'text-lg', 'ml-1', 'increaseButton');
  itemQuantity.appendChild(increaseButton);
  increaseButton.addEventListener("click", increaseItemQuantity);

  function increaseItemQuantity () {
    const existingItem = cartItems.find(item => item.title === itemName.textContent);
    
  if (existingItem) {
    existingItem.quantity += 1;
    updateCart();
  }
  updateCartTotal();

}
  const removeButtonDiv = document.createElement('div');
  removeButtonDiv.classList.add('absolute', 'flex', 'items-center', 'right-8');
  
  const removeButton = document.createElement('img');
  removeButton.src = './img/deleteButton.svg'; 
  removeButton.alt = 'Remove';
  removeButton.id = 'item-remove-button';
  removeButton.classList.add('w-6', 'h-6',); 
  
  removeButtonDiv.appendChild(removeButton);

  removeButton.addEventListener("click", removeItemFromCart);

  function removeItemFromCart() {
    const itemIndex = cartItems.findIndex(item => item.title === itemName.textContent);
    if (itemIndex !== -1) {
      cartItems.splice(itemIndex, 1);
      updateCart();
      }
      updateCartTotal();
}

  function updateCart(){
    cartContainer.innerHTML = '';
  cartItems.forEach(renderCartItem);
  }
    
  function updateCartTotal() {
  const cartTotalTextElement = document.getElementById('cart-total-text');

  const totalAmount = cartItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  cartTotalTextElement.textContent = `${totalAmount.toFixed(2)} KR.`;
}

  itemInfo.appendChild(removeButtonDiv);
  itemInfo.appendChild(itemQuantity);
 
  itemInfo.appendChild(itemQuantity);

  itemContainer.appendChild(itemInfo);

  const cartContainer = document.getElementById('cart-container');
  cartContainer.appendChild(itemContainer);

  updateCartTotal();
}