let costs = [];
let total = 0;
let selectedCost = null;
const totalEl = document.getElementById('total');

document.addEventListener('DOMContentLoaded', () => {
  loadCosts();

  document.getElementById('costForm')
    .addEventListener('submit', (ev) => {
      ev.preventDefault();

      addCost();
  });
});

function loadCosts() {
  const costsFromValue = localStorage.getItem('costs') || '[]';
  const costsObj = JSON.parse(costsFromValue);

  if (costsObj.length === 0) {
    alert('No hay elementos para mostrar. Por favor agrega uno.');
    return;
  }

  costs = costsObj;

  costs.forEach(cost => addCostToUi(cost));
}

function addCost() {
  const id = Math.floor(Math.random() * 1000000);
  const balance = document.getElementById('balance').value;
  const category = document.getElementById('category').value;
  const details = document.getElementById('details').value;

  const cost = { id, balance: +balance, category, details };

  costs.push(cost);

  // Save on local storage
  localStorage.setItem('costs', JSON.stringify(costs));

  addCostToUi(cost);
}

function addCostToUi(cost) {
  const costListEl = document.getElementById('cost_list');

  const { id, balance, category, details } = cost;

  const listItem = document.createElement('li');
  const removeBtn = document.createElement('button');
  const editBtn = document.createElement('button');

  listItem.innerHTML = `Monto: $${balance}, Categoria: ${category}, Detalles: ${details}`;
  listItem.id = `cost_${id}`;
  listItem.setAttribute('data-id', id);

  removeBtn.innerHTML = 'Eliminar';
  removeBtn.addEventListener('click', () => {
    const itemToRemove = document.getElementById(`cost_${id}`);

    itemToRemove.remove();

    total -= balance;
    costs = costs.filter(c => c.id !== id);

    localStorage.setItem('costs', JSON.stringify(costs));
    totalEl.innerHTML = `$${total}`;
  });

  editBtn.innerHTML = 'Editar';
  editBtn.addEventListener('click', () => {
    const item = document.getElementById(`cost_${id}`);

    const item_id = +item.getAttribute('data-id');

    const balanceEl = document.getElementById('balance');
    const categoryEl = document.getElementById('category');
    const detailsEl = document.getElementById('details');

    const selectedItem = costs.find(c => c.id === item_id);

    selectedCost = selectedItem;

    const { balance, category, details } = selectedItem;

    balanceEl.value = balance;
    categoryEl.value = category;
    detailsEl.value = details;
  });

  total += balance;
  totalEl.innerHTML = `$${total}`;

  listItem.appendChild(removeBtn);
  listItem.appendChild(editBtn);

  costListEl.appendChild(listItem);
}
