const form = document.querySelector('#item-form');
const inputItem = form.querySelector('#item-input');
const itemList = document.querySelector('#item-list');
const clearBtn = document.querySelector('#clear');
const filter = document.querySelector('#filter');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  if (inputItem.value === '') {
    alert('Bitte einen Text eingeben');

    return;
  }

  itemList.appendChild(createListItem(inputItem.value));

  checkUI();

  inputItem.value = '';
});

itemList.addEventListener('click', (e) => {
  if (e.target.parentElement.classList.contains('remove-item')) {
    e.target.parentElement.parentElement.remove();
    checkUI();
  }
});

clearBtn.addEventListener('click', (e) => {
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
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
}

checkUI();
