const select = document.querySelector('#movie-select');
const seats = document.querySelectorAll(
  '.seat:not(.occupied):not(.legend .seat)'
);
const parentContainer = document.querySelector('#row-container');

let ticketPrice = select?.value;
let setSelectedSeats = new Array();

function updateTicketPrice(price) {
  ticketPrice = price;
}

select.addEventListener('change', function (e) {
  updateTicketPrice(e.target?.value);
  setSeatsText();
});

function setSeatsText() {
  const selectedSeatsSpan = document.querySelector('#seats-selected');
  const totalPriceSpan = document.querySelector('#total-price');
  const totalSeats = setSelectedSeats.length;
  selectedSeatsSpan.innerText = totalSeats;
  const totalPrice = ticketPrice * totalSeats;
  totalPriceSpan.innerText = totalPrice;
  window.sessionStorage.setItem(
    'priceSeat',
    JSON.stringify({ totalPrice, totalSeats, ticketPrice })
  );
}

function getIndexOfSelectedSeats() {
  setSelectedSeats.length = 0;
  seats.forEach((element, index) => {
    if (element.classList.contains('selected')) {
      setSelectedSeats.push(index);
    }
  });
  window.sessionStorage.setItem(
    'selectedSeats',
    JSON.stringify({ setSelectedSeats })
  );
  setSeatsText();
}

parentContainer.addEventListener('click', (e) => {
  if (
    e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied')
  ) {
    e.target.classList.toggle('selected');
    getIndexOfSelectedSeats();
  }
});

window.addEventListener('load', () => {
  const selectedSeats =
    JSON.parse(window.sessionStorage.getItem('selectedSeats')) ?? [];
  const { totalPrice, totalSeats, ticketPrice } = JSON.parse(
    window.sessionStorage.getItem('priceSeat')
  );
  const set = new Set(selectedSeats?.setSelectedSeats);

  seats.forEach((element, index) => {
    if (set.has(index)) {
      setSelectedSeats.push(index);
      element.classList.add('selected');
    }
  });
  updateTicketPrice(ticketPrice);
  setSeatsText();
  select.value = ticketPrice;
});
