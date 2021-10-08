const CARS = JSON.parse(DATA)
console.log(CARS);
const showcaseEl = document.getElementById('showcase')
console.log(showcaseEl);
const sortSelectEl = document.getElementById('sortSelect')

// {
//     "id": "89aed5b8c686ebd713a62873e4cd756abab7a106",
//     "make": "BMW",
//     "model": "M3",
//     "year": 2010,
//     "img": "https://images.unsplash.com/photo-1523983302122-73e869e1f850?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
//     "color": "Goldenrod",
//     "vin": "1G6DW677550624991",
//     "country": "United States",
//     "rating": 1.5,
//     "price": 2000,
//     "views": 5,
//     "seller": "Ellery Girardin",
//     "vin_check": true,
//     "top": false,
//     "timestamp": 1601652988000,
//     "phone": "+1 (229) 999-8553",
//     "fuel": "Benzin",
//     "engine_volume": 1.4,
//     "transmission": null,
//     "mileage": 394036,
//     "consume": {
//       "city": 12.3,
//       "mixed": 8.4
//     }
//   }

renderCards(CARS, showcaseEl)

sortSelectEl.addEventListener('change', e => {
  const [key, order] = e.target.value.split('/')
  CARS.sort((a, b) => {
    return String(a[key]).localeCompare(String(b[key]), undefined, { numeric: true }) * order
  })
  renderCards(CARS, showcaseEl)
})






function renderCards(cardsDataArray, cardsShowcase) {
  const cardsTemplates = createCardsTemplates(cardsDataArray)
  const strCardsTemplates = cardsTemplates.join('')
  cardsShowcase.innerHTML = strCardsTemplates
}

function createCardsTemplates(cardsDataArray) {
  const cardsTemplates = []
  for (let i = 0; i < cardsDataArray.length; i++) {
    const cardDataObject = cardsDataArray[i];
    const cardTemplate = createCardTemplate(cardDataObject)
    cardsTemplates.push(cardTemplate)
  }
  return cardsTemplates
}

function createCardTemplate(cardData) {
  let starsHtml = ''
  for (let i = 0; i < 5; i++) {
    if (cardData.rating > i + 0.5) {
      starsHtml += '<i class="fas fa-star"></i>'
    } else if (cardData.rating > i) {
      starsHtml += '<i class="fas fa-star-half-alt"></i>'
    } else {
      starsHtml += '<i class="far fa-star"></i>'
    }
  }

  return `<div class="card mb-3">
    <div class="row g-0">
      <div class="col-md-4">
        <img src="${cardData.img}" class="card-img rounded-start" alt="${cardData.make} ${cardData.model}" />
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h2 class="card-title h3">${cardData.make} ${cardData.model} ${cardData.engine_volume}L (${cardData.year})</h2>
          <div class="card-rating text-warning h3">
           ${starsHtml}
          </div>
          <h3 class="card-price text-success fw-bolder h2">${cardData.price} $</h3>
          <ul class="card-details">
            <li><i class="fas fa-tachometer-alt fa-fw me-3"></i>${cardData.mileage} km</li>
            <li><i class="fas fa-map-marker-alt fa-fw me-3"></i>${cardData.country}</li>
            <li><i class="fas fa-gas-pump fa-fw me-3"></i>${cardData.fuel}, ${cardData.engine_volume}L</li>
            <li><i class="fas fa-cogs fa-fw me-3"></i>${cardData.transmission || '-'}</li>
            <li><i class="fas fa-road"></i>Road:${cardData.consume?.road?? '-'}</li>
            <li><i class="fas fa-city"></i>City:${cardData.consume?.city?? '-'}</li>
            <li><i class="fas fa-infinity"></i>Mixed:${cardData.consume?.mixed?? '-'}</li>
          </ul>
          <p>Seller: ${cardData.seller} (<a href="tel:${cardData.phone}">${cardData.phone}</a>)</p>
          <ul class="list-group list-group-horizontal">
            <li class="list-group-item p-0 d-flex align-items-center">
              ${cardData.vin && cardData.vin_check ? `<i class="fas fa-check-circle px-1 text-success"></i>` : `<i class="fas fa-times px-1 text-danger"></i>`}
            </li>
            <li class="list-group-item text-uppercase p-1">${cardData.vin || 'vin is not specified'}</li>
          </ul>
          <div class="d-flex justify-content-between text-muted mt-3">
            <span class="card-text"><small>${cardData.timestamp}</small></span>
            <span><i class="fas fa-eye me-1"></i><span>${cardData.views}</span></span>
          </div>
        </div>
      </div>
    </div>
  </div>`
}






// const arr = ['а','я','ё','г']
// // const arr = [5, 2, 10, 18, 3, 4, 7, 11]

// console.log(arr);
// arr.sort((a, b) => {
//   return String(a).localeCompare(String(b), undefined, { numeric: true }) * 1
// })

// console.log(arr);


// 'en'
// 'en-US'
// 'en-GB'
// "ru"
// 'ru-RU'
// 'ru-UA'
// 'ru-KZ'


// console.log('Hello'.localeCompare('Hello', undefined, {
//   usage: 'search'
// }));



// sum(1,1)
// sum(2,1)

// function sum(a,b) {
//   return a + b
// }


// const arr = [1,2,3]

// let [one] = arr




// const nums = [4, undefined, 1, false, 7, 8, null]
// // const result = nums.forEach((num) => {
// //   console.log(num);
// // })
// const result = nums.filter((num) => {
//   return !num
// })
// console.log(result);
