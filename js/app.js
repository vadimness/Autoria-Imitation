let CARS = JSON.parse(DATA);
const showcaseEl = document.getElementById('showcase');
const sortSelectEl = document.getElementById('sortSelect');
const searchFormEl = document.getElementById('searchForm');
const filterFormEl = document.getElementById('filterForm');
const filterFields = ['make', 'fuel', 'transmission'];


render(createCardsTemplates(CARS), showcaseEl);
render(createFilterForm(CARS), filterFormEl, 'afterbegin');

filterFormEl.addEventListener('submit', (e) => {
  e.preventDefault();
  const filterQuery = serializeFilterFormData(e.target);
  CARS = filterCars(JSON.parse(DATA), filterQuery);
  render(createCardsTemplates(CARS), showcaseEl);
});

sortSelectEl.addEventListener('change', (e) => {
  const [key, order] = e.target.value.split('/');
  CARS.sort((a, b) => {
    return String(a[key]).localeCompare(String(b[key]), undefined, { numeric: true }) * order;
  });
  render(createCardsTemplates(CARS), showcaseEl);
});

searchFormEl.addEventListener('submit', (e) => {
  e.preventDefault();
  const searchQuery = serializeQueryString(e.target.search.value);
  CARS = searchCars(JSON.parse(DATA), searchQuery);
  render(createCardsTemplates(CARS), showcaseEl);
});

function filterCars(cars, query) {
  return cars.filter((car) => {
    return query.every((values, i) => {
      return values.length > 0 ? values.includes(car[filterFields[i]]) : true;
    });
  });
}

function serializeFilterFormData(form) {
  return filterFields.map((filterField) => {
    const checkedInputs = Array.from(form[filterField]).filter((input) => input.checked);
    return checkedInputs.map((checkedInput) => checkedInput.value);
  });
}

function searchCars(cars, query) {
  const searchFields = ['make', 'model', 'year', 'vin'];
  return cars.filter((car) => {
    return query.every((word) => {
      return searchFields.some((field) => {
        return String(car[field]).toLowerCase().includes(word);
      });
    });
  });
}

function serializeQueryString(str = '') {
  if (typeof str !== 'string') {
    console.warn('Param "str" is not a string!');
    str = '';
  }
  return str
    .trim()
    .replaceAll(/[\s]{2,}/g, ' ')
    .toLowerCase()
    .split(' ');
}

function createFilterForm(cars) {
  const fieldsetsHTML = filterFields
    .map((filterField) => {
      const uValues = Array.from(new Set(cars.map((car) => car[filterField])));
      return createFilterFieldset(filterField, uValues);
    })
    .join('');
  return `
    <div>
      ${fieldsetsHTML}
    </div>
  `;
}
function createFilterFieldset(fieldName, values) {
  const labelsHTML = values.map((value) => createFilterField(fieldName, value)).join('');
  return `
  <fieldset>
    <legend>${fieldName}</legend>
    <div class="labels-wrap">
    ${labelsHTML}
    </div>
  </fieldset>
  `;
}
function createFilterField(fieldName, value) {
  return `
    <label>
      <input type="checkbox" name="${fieldName}" value="${value}">
      <span>${value}</span>
    </label>
  `;
}

function render(htmlStr, elem, insert) {
  if (insert) {
    elem.insertAdjacentHTML(insert, htmlStr);
  } else {
    elem.innerHTML = htmlStr;
  }
}

function createCardsTemplates(cardsDataArray) {
 
  return cardsDataArray.map((car) => createCardTemplate(car)).join('');
}

function createCardTemplate(cardData) {
  let starsHtml = '';
  for (let i = 0; i < 5; i++) {
    if (cardData.rating > i + 0.5) {
      starsHtml += '<i class="fas fa-star"></i>';
    } else if (cardData.rating > i) {
      starsHtml += '<i class="fas fa-star-half-alt"></i>';
    } else {
      starsHtml += '<i class="far fa-star"></i>';
    }
  }

  return `<div class="card mb-3">
    <div class="row g-0">
      <div class="col-md-4">
        <img src="${cardData.img}" class="card-img rounded-start" alt="${cardData.make} ${cardData.model}" />
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h2 class="card-title h3">${cardData.make} ${cardData.model} ${cardData.engine_volume}L (${
    cardData.year
  })</h2>
          <div class="card-rating text-warning h3">
           ${starsHtml}
          </div>
          <h3 class="card-price text-success fw-bolder h2">${cardData.price} $</h3>
          <ul class="card-details">
            <li><i class="fas fa-tachometer-alt fa-fw me-3"></i>${cardData.mileage} km</li>
            <li><i class="fas fa-map-marker-alt fa-fw me-3"></i>${cardData.country}</li>
            <li><i class="fas fa-gas-pump fa-fw me-3"></i>${cardData.fuel}, ${cardData.engine_volume}L</li>
            <li><i class="fas fa-cogs fa-fw me-3"></i>${cardData.transmission || '-'}</li>
            <li><i class="fas fa-road fa-fw me-3"></i>Road: ${cardData.consume?.road || '-'} L/100km</li>
            <li><i class="fas fa-city fa-fw me-3"></i>City: ${cardData.consume?.city || '-'} L/100km</li>
            <li><i class="fas fa-infinity fa-fw me-3"></i>Mixed: ${cardData.consume?.mixed || '-'} L/100km</li>
          </ul>
          <p>Seller: ${cardData.seller} (<a href="tel:${cardData.phone}">${cardData.phone}</a>)</p>
          <ul class="list-group list-group-horizontal">
            <li class="list-group-item p-0 d-flex align-items-center">
              ${
                cardData.vin && cardData.vin_check
                  ? `<i class="fas fa-check-circle px-1 text-success"></i>`
                  : `<i class="fas fa-times px-1 text-danger"></i>`
              }
            </li>
            <li class="list-group-item text-uppercase p-1">${cardData.vin || 'vin is not specified'}</li>
          </ul>
          <div class="d-flex justify-content-between text-muted mt-3">
            <span class="card-text"><small>${new Date(cardData.timestamp).toLocaleString()}</small></span>
            <span><i class="fas fa-eye me-1"></i><span>${cardData.views}</span></span>
          </div>
        </div>
      </div>
    </div>
  </div>`;
}


