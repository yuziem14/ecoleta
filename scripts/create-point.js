const apiUrl = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados';

function fetchResource(resource) {
  return new Promise((resolve, reject) => {
    fetch(`${apiUrl}${resource}`)
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch((err) => reject(err));
  });
}

function resetElement(element) {
  const placeholder = element.firstElementChild;
  element.innerHTML = '';

  if (placeholder) {
    element.appendChild(placeholder);
  }
}

function populateUFs() {
  const ufSelect = document.querySelector('select[name=uf]');

  resetElement(ufSelect);

  fetchResource('/')
    .then((ufs) => {
      ufs.map((uf) => {
        ufSelect.innerHTML += `<option value="${uf.id}">${uf.nome}</option>`;
      });
    })
    .catch((err) => console.error(err));
}

async function getCities(event) {
  const ufSelect = event.target;
  const citySelect = document.querySelector('select[name=city]');
  const stateInput = document.querySelector('input[name=state]');

  resetElement(citySelect);

  const indexOfSelectedState = ufSelect.selectedIndex;
  stateInput.value = ufSelect.options[indexOfSelectedState].text;

  const ufId = ufSelect.value;

  fetchResource(`/${ufId}/municipios`)
    .then((cities) => {
      cities.map((city) => {
        citySelect.innerHTML += `<option value="${city.id}">${city.nome}</option>`;

        citySelect.disabled = false;
        ufSelect.firstElementChild.disabled = true;
      });
    })
    .catch((err) => console.error(err));
}

populateUFs();

document.querySelector('select[name=uf]').addEventListener('change', getCities);
