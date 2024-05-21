const form = document.querySelector('#item-form');
const inputItem = form.querySelector('#item-input');
const itemList = document.querySelector('#item-list');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  if (inputItem.value === '') {
    alert('Bitte einen Text eingeben');

    return;
  }

  itemList.appendChild(createListItem(inputItem.value));

  inputItem.value = '';
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
