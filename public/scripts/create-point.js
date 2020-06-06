const apiUrl = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados';

let selectedItems = [];

const collectedItems = document.querySelector('input[name=items]');

function fetchResource(resource) {
  return new Promise((resolve, reject) => {
    fetch(`${apiUrl}${resource}`)
      .then(response => response.json())
      .then(data => resolve(data))
      .catch(err => reject(err));
  });
}

function resetSelectElement(element) {
  const placeholder = element.firstElementChild;
  element.innerHTML = '';

  if (placeholder) {
    placeholder.disabled = false;
    element.appendChild(placeholder);
  }
}

function populateUFs() {
  const ufSelect = document.querySelector('select[name=uf]');

  resetSelectElement(ufSelect);

  fetchResource('/')
    .then(ufs => {
      ufs.map(uf => {
        ufSelect.innerHTML += `<option value="${uf.id}">${uf.nome}</option>`;
      });
    })
    .catch(err => console.error(err));
}

async function getCities(event) {
  const ufSelect = event.target;
  const citySelect = document.querySelector('select[name=city]');
  const stateInput = document.querySelector('input[name=state]');

  resetSelectElement(citySelect);
  citySelect.disabled = true;

  const indexOfSelectedState = ufSelect.selectedIndex;
  stateInput.value = ufSelect.options[indexOfSelectedState].text;

  const ufId = ufSelect.value;

  fetchResource(`/${ufId}/municipios`)
    .then(cities => {
      cities.map(city => {
        citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`;

        citySelect.disabled = false;
        ufSelect.firstElementChild.disabled = true;
      });
    })
    .catch(err => console.error(err));
}

function handleSelectedItem(event) {
  const itemLi = event.target;
  const itemId = itemLi.dataset.id;
  const alreadySelected = selectedItems.findIndex(item => item === itemId);

  itemLi.classList.toggle('selected');

  if (alreadySelected > -1) {
    const filteredItems = selectedItems.filter(item => item !== itemId);
    selectedItems = filteredItems;
  } else {
    selectedItems.push(itemId);
  }

  collectedItems.value = selectedItems.join(', ');
}

populateUFs();

document.querySelector('select[name=uf]').addEventListener('change', getCities);

document.querySelectorAll('.items-grid li').forEach(item => {
  item.addEventListener('click', handleSelectedItem);
});
