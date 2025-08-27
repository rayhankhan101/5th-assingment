// Sample data for emergency services
const services = [
  { id: 1, name: 'National Emergency Number', nameEn: 'National Emergency', number: '999', category: 'All', icon: 'assets/emergency.png' },
  { id: 2, name: 'Police Helpline Number', nameEn: 'Police', number: '999', category: 'Police', icon: 'assets/police.png' },
  { id: 3, name: 'Fire Service Number', nameEn: 'Fire Service', number: '999', category: 'Fire', icon: 'assets/fire-service.png' },
  { id: 4, name: 'Ambulance Service', nameEn: 'Ambulance', number: '1994-999999', category: 'Health', icon: 'assets/ambulance.png' },
  { id: 5, name: 'Women & Child Helpline', nameEn: 'Women & Child Helpline', number: '109', category: 'Help', icon: 'assets/emergency.png' },
  { id: 6, name: 'Anti-Corruption Helpline', nameEn: 'Anti-Corruption', number: '106', category: 'Govt.', icon: 'assets/emergency.png' },
  { id: 7, name: 'Electricity Outage', nameEn: 'Electricity Outage', number: '16216', category: 'Electricity', icon: 'assets/emergency.png' },
  { id: 8, name: 'Brac Helpline', nameEn: 'Brac', number: '16445', category: 'NGO', icon: 'assets/brac.png' },
  { id: 9, name: 'Bangladesh Railway Helpline', nameEn: 'Bangladesh Railway', number: '163', category: 'Travel', icon: 'assets/Bangladesh-Railway.png' }
];

// DOM Elements
const cardContainer = document.getElementById('card-container');
const historyList = document.getElementById('history-list');
const clearHistoryBtn = document.getElementById('clear-history');
const heartCountElement = document.getElementById('heart-count');
const coinCountElement = document.getElementById('coin-count');
const copyCountElement = document.getElementById('copy-count');

// State variables
let heartCount = 0;
let coinCount = 100;
let copyCount = 0;
let callHistory = [];

// Initialize the page
function init() {
  renderCards();
  updateStats();
  clearHistoryBtn.addEventListener('click', clearHistory);
}

// Render service cards
function renderCards() {
  cardContainer.innerHTML = '';
  services.forEach(service => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <div class="card-content">
        <img src="${service.icon}" alt="${service.name}" class="service-icon">
        <h3 class="service-name">${service.name}</h3>
        <p class="service-name-en">${service.nameEn}</p>
        <div class="hotline-number">${service.number}</div>
        <div class="category-badge">${service.category}</div>
        <div class="card-actions">
          <button class="btn btn-copy" data-number="${service.number}">
            <i class="far fa-copy"></i> Copy
          </button>
          <button class="btn btn-call" data-id="${service.id}" data-name="${service.name}" data-number="${service.number}">
            <i class="fas fa-phone"></i> Call
          </button>
        </div>
      </div>`;
    cardContainer.appendChild(card);
  });
  addCardEventListeners();
}

// Add event listeners
function addCardEventListeners() {
  document.querySelectorAll('.btn-copy').forEach(btn => {
    btn.addEventListener('click', function() {
      const number = this.getAttribute('data-number');
      copyNumber(number);
    });
  });

  document.querySelectorAll('.btn-call').forEach(btn => {
    btn.addEventListener('click', function() {
      const id = this.getAttribute('data-id');
      const name = this.getAttribute('data-name');
      const number = this.getAttribute('data-number');
      callService(id, name, number);
    });
  });
}

// Copy number
function copyNumber(number) {
  navigator.clipboard.writeText(number).then(() => {
    alert(`Number ${number} copied to clipboard!`);
    copyCount++;
    updateStats();
  }).catch(err => {
    console.error('Failed to copy: ', err);
    alert('Failed to copy number. Please try again.');
  });
}

// Call service
function callService(id, name, number) {
  if (coinCount < 20) {
    alert(`You don't have enough coins to call. Required: 20, Available: ${coinCount}`);
    return;
  }
  coinCount -= 20;
  alert(`Calling ${name} at ${number}`);
  const callTime = new Date().toLocaleTimeString();
  callHistory.push({ name, number, time: callTime });
  updateCallHistory();
  updateStats();
}

// Update call history
function updateCallHistory() {
  if (callHistory.length === 0) {
    historyList.innerHTML = '<div class="empty-history">No call history yet</div>';
    return;
  }
  historyList.innerHTML = '';
  callHistory.forEach(item => {
    const historyItem = document.createElement('div');
    historyItem.className = 'history-item';
    historyItem.innerHTML = `
      <div class="history-info">
        <div class="history-name">${item.name}</div>
        <div class="history-number">${item.number}</div>
      </div>
      <div class="history-time">${item.time}</div>`;
    historyList.appendChild(historyItem);
  });
}

// Clear history
function clearHistory() {
  callHistory = [];
  updateCallHistory();
}

// Update stats
function updateStats() {
  heartCountElement.textContent = heartCount;
  coinCountElement.textContent = coinCount;
  copyCountElement.textContent = copyCount;
}

// Run app
init();