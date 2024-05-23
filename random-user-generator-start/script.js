const generateUserBtn = document.getElementById('generate');

function fetchUser() {
  showSpinner();
  fetch('https://randomuser.me/api/')
    .then((response) => response.json())
    .then((data) => {
      displayUser(data.results[0]);
      hideSpinner();
    });
}

function displayUser(data) {
  const user = document.getElementById('user');
  const image = user.querySelector('img');

  if (data.gender === 'female') {
    document.body.style.backgroundColor = 'steelblue';
  } else {
    document.body.style.backgroundColor = 'grey';
  }

  user.innerHTML = ` <div class="flex justify-between">
  <div class="flex">
    <img
      class="w-48 h-48 rounded-full mr-8"
      src="${data.picture.large}"
    />
    <div class="space-y-3">
      <p class="text-xl">
        <span class="font-bold">Name: </span>${data.name.first} ${data.name.last}
      </p>
      <p class="text-xl">
        <span class="font-bold">Email: </span> ${data.email}
      </p>
      <p class="text-xl">
        <span class="font-bold">Phone: </span> ${data.phone}
      </p>
      <p class="text-xl">
        <span class="font-bold">Location: </span> ${data.location.state} ${data.location.country}
      </p>
      <p class="text-xl"><span class="font-bold">Age: </span> ${data.registered.age}</p>
    </div>
  </div>
</div>`;
}

function showSpinner() {
  document.querySelector('.spinner').style.display = 'block';
}

function hideSpinner() {
  document.querySelector('.spinner').style.display = 'none';
}

generateUserBtn.addEventListener('click', fetchUser);

fetchUser();
