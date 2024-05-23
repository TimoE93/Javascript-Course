const form = document.querySelector('#item-form');
const inputItem = form.querySelector('#item-input');
const itemList = document.querySelector('#item-list');
const clearBtn = document.querySelector('#clear');
const filter = document.querySelector('#filter');
const submitBtn = form.querySelector('.btn');
let isEditMode = false;

form.addEventListener('submit', (e) => {
  e.preventDefault();

  if (inputItem.value === '') {
    alert('Bitte einen Text eingeben');

    return;
  }

  if (isEditMode) {
    const itemToEdit = itemList.querySelector('.edit-mode');
    itemToEdit.classList.remove('edit-mode');

    removeItemFromStorage(itemToEdit.textContent);
    itemToEdit.remove();

    isEditMode = false;
  }

  if (itemExits(inputItem)) {
    alert('Item already exists.');
    return;
  }

  itemList.appendChild(createListItem(inputItem.value));
  addItemToStorage(inputItem.value);

  checkUI();

  inputItem.value = '';
});

itemList.addEventListener('click', (e) => {
  if (e.target.parentElement.classList.contains('remove-item')) {
    e.target.parentElement.parentElement.remove();
    removeItemFromStorage(
      e.target.parentElement.parentElement.firstChild.textContent
    );
    checkUI();
  } else {
    setItemToEdit(e.target);
  }
});

clearBtn.addEventListener('click', (e) => {
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
    localStorage.clear();
    checkUI();
  }
});

filter.addEventListener('input', (e) => {
  const listItems = itemList.querySelectorAll('li');
  const filterInput = e.target.value.toLowerCase();

  listItems.forEach((item) => {
    if (item.firstChild.textContent.toLowerCase().includes(filterInput)) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  });
});

document.addEventListener('DOMContentLoaded', (e) => {
  let itemsFromStorage = getItemsFromStorage();

  itemsFromStorage.forEach((item) => {
    itemList.appendChild(createListItem(item));
  });

  checkUI();
});

function createListItem(item) {
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(item));

  li.appendChild(createBtn('remove-item btn-link text-red'));

  return li;
}

function createBtn(classes) {
  const button = document.createElement('button');
  button.className = classes;

  const icon = createIcon('fa-solid fa-xmark');

  button.appendChild(icon);

  return button;
}

function createIcon(classes) {
  const icon = document.createElement('i');
  icon.className = classes;

  return icon;
}

function checkUI() {
  if (itemList.querySelectorAll('li').length == 0) {
    clearBtn.style.display = 'none';
    filter.style.display = 'none';
  } else {
    clearBtn.style.display = 'block';
    filter.style.display = 'block';
  }

  if (isEditMode === false) {
    submitBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';
  }
}

function getItemsFromStorage() {
  let itemsFromStorage;
  if (localStorage.getItem('items') === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem('items'));
  }

  return itemsFromStorage;
}

function addItemToStorage(item) {
  let itemsFromStorage = getItemsFromStorage();
  itemsFromStorage.push(item);
  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function removeItemFromStorage(item) {
  let itemsFromStorage = getItemsFromStorage();

  let index = itemsFromStorage.indexOf(item);

  itemsFromStorage.splice(index, 1);

  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function setItemToEdit(item) {
  itemList.querySelectorAll('li').forEach((list) => {
    list.classList.remove('edit-mode');
  });

  inputItem.value = item.textContent;
  item.classList.add('edit-mode');
  submitBtn.innerHTML = '<i class="fa-solid fa-pen"></i> Update';
  isEditMode = true;
}

function itemExits(inputItem) {
  return getItemsFromStorage().includes(inputItem.value);
}

checkUI();
