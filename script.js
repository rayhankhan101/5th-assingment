// Sample data for emergency services
const services = [
  { id: 1, name: 'National Emergency', nameEn: 'National Emergency', number: '999', category: 'All', icon: 'assets/emergency.png' },
  { id: 2, name: 'Police', nameEn: 'Police', number: '999', category: 'Police', icon: 'assets/police.png' },
  { id: 3, name: 'Fire Service', nameEn: 'Fire Service', number: '999', category: 'Fire', icon: 'assets/fire-service.png' },
  { id: 4, name: 'Ambulance', nameEn: 'Ambulance', number: '1994-999999', category: 'Health', icon: 'assets/ambulance.png' },
  { id: 5, name: 'Women & Child Helpline', nameEn: 'Women & Child Helpline', number: '109', category: 'Help', icon: 'assets/emergency.png' },
  { id: 6, name: 'Anti-Corruption', nameEn: 'Anti-Corruption', number: '106', category: 'Govt.', icon: 'assets/emergency.png' },
  { id: 7, name: 'Electricity Outage', nameEn: 'Electricity Outage', number: '16216', category: 'Electricity', icon: 'assets/emergency.png' },
  { id: 8, name: 'Brac', nameEn: 'Brac', number: '16445', category: 'NGO', icon: 'assets/brac.png' },
  { id: 9, name: 'Bangladesh Railway', nameEn: 'Bangladesh Railway', number: '163', category: 'Travel', icon: 'assets/Bangladesh-Railway.png' }
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

  // Delegate click events (for dynamic elements)
  document.addEventListener('click', onGlobalClick);
}

// Render service cards
function renderCards() {
  cardContainer.innerHTML = '';
  services.forEach(service => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <div class="card-content">
        <!-- Simple heart icon without background, larger size -->
        <button class="heart-btn" data-id="${service.id}" aria-label="Like">
          <i class="fa-regular fa-heart"></i>
        </button>

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
}

// Global click handler (for copy/call/heart)
function onGlobalClick(e) {
  // Copy number
  const copyBtn = e.target.closest('.btn-copy');
  if (copyBtn) {
    const number = copyBtn.getAttribute('data-number');
    copyNumber(number);
    return;
  }

  // Call service
  const callBtn = e.target.closest('.btn-call');
  if (callBtn) {
    const id = callBtn.getAttribute('data-id');
    const name = callBtn.getAttribute('data-name');
    const number = callBtn.getAttribute('data-number');
    callService(id, name, number);
    return;
  }

  // Heart toggle
  const heartBtn = e.target.closest('.heart-btn');
  if (heartBtn) {
    toggleHeart(heartBtn);
    return;
  }
}

// Toggle heart state and update header count
function toggleHeart(btn) {
  const icon = btn.querySelector('i');

  if (btn.classList.contains('liked')) {
    btn.classList.remove('liked');
    icon.classList.remove('fa-solid');
    icon.classList.add('fa-regular');
    heartCount = Math.max(0, heartCount - 1);
  } else {
    btn.classList.add('liked');
    icon.classList.remove('fa-regular');
    icon.classList.add('fa-solid');
    heartCount += 1;
  }
  updateStats();
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

// Update stats (top bar)
function updateStats() {
  heartCountElement.textContent = heartCount;
  coinCountElement.textContent = coinCount;
  copyCountElement.textContent = copyCount;
}

// Run app
init();