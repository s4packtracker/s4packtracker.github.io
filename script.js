let packs = [];

const packTypes = {
  "Erweiterungspacks": 39.99,
  "Gameplaypacks": 19.99,
  "Accessoires-Packs": 9.99,
  "Sets": 4.99
};

const packsList = {
  "Erweiterungspacks": [
    "An die Arbeit", "Zeit für Freunde", "Großstadtleben", "Katzen & Hunde", "Jahreszeiten", "Werde berühmt", 
    "Inselleben", "An die Uni!", "Nachhaltig leben", "Ab ins Schneeparadies", "Landhausleben", "Highschool-Jahre", 
    "Zusammen wachsen", "Pferderanch", "Zu vermieten"
  ],
  "Gameplaypacks": [
    "Outdoor-Leben", "Wellness-Tag", "Gaumenfreuden", "Vampire", "Elternfreuden", "Dschungel-Abenteuer", 
    "StrangerVille", "Reich der Magie", "Star WarsTM: Reise nach Batuu", "Traumhaftes Innendesign", 
    "Meine Hochzeitsgeschichten", "Werwölfe"
  ],
  "Accessoires-Packs": [
    "Luxus-Party", "Sonnenterassen", "Coole Küchen", "Grusel", "Heimkino", "Romantischer Garten", 
    "Kinderzimmer", "Gartenspaß", "Vintage Glamour", "Bowling-Abend", "Fitness", "Kleinkind", 
    "Waschtag", "Mein erstes Haustier", "Moschino", "Tiny Houses", "Schick mit Strick", 
    "Paranormale Phänomene", "Lukrative Hobbyküche", "Kristallkreationen"
  ],
  "Sets": [
    "Retro Fit & Chic", "Landhausküche", "Hausputz", "Innenhof-Oase", "Industrie-Loft", 
    "Incheon-Style", "Fashion Street", "Karneval-Streetwear", "Maximalistischer Wohnstil", 
    "Mode zum Verlieben", "Kleine Camper", "Erste Outfits", "Wüstenoase", "Pastell-Pop", 
    "Krimskrams", "Unterwäsche", "Badutensilien", "Gewächshaus", "Dachbodenschätze", 
    "Grunge-Revival", "Leseecke", "Pool-Style", "Moderner Luxus", "Gothic-Style", 
    "Burgen- & Schlösser"
  ]
};

function calculateTotalCost() {
  let totalCost = 0;
  packs.forEach(pack => {
    totalCost += pack.price;
  });
  return totalCost;
}

function calculateMaxBudget() {
  let maxBudget = 0;
  Object.values(packTypes).forEach(price => {
    maxBudget += price;
  });
  return maxBudget;
}

function renderPacks() {
  const packsContainer = document.getElementById('packs-container');
  packsContainer.innerHTML = '';

  packs.forEach((pack, index) => {
    const packDiv = document.createElement('div');
    packDiv.classList.add('pack');
    packDiv.innerHTML = `
      <select onchange="updatePack(${index}, null, this.value)">
        ${Object.keys(packsList).map(type => `
          <optgroup label="${type}">
            ${packsList[type].map(packName => `
              <option value="${packName}" ${packName === pack.name ? 'selected' : ''}>${packName}</option>
            `).join('')}
          </optgroup>
        `).join('')}
      </select>
      <input type="number" value="${pack.price}" min="0.01" step="0.01" onchange="updatePack(${index}, this.value)">
      <button class="delete-btn" onclick="deletePack(${index})">Delete</button>
    `;
    packsContainer.appendChild(packDiv);
  });

  const totalCostElement = document.getElementById('total-cost');
  const totalCost = calculateTotalCost();
  const maxBudget = calculateMaxBudget();
  totalCostElement.textContent = `Gesamtausgaben: ${totalCost.toFixed(2)}€ | Maximaler ausstehender Betrag: ${maxBudget.toFixed(2)}€`;
}

function addPack() {
  packs.push({ name: Object.keys(packsList)[0], price: packTypes[Object.keys(packsList)[0]] });
  renderPacks();
}

function updatePack(index, price, name) {
  if (price !== null) packs[index].price = parseFloat(price);
  if (name !== null) packs[index].name = name;
  renderPacks();
}

function deletePack(index) {
  packs.splice(index, 1);
  renderPacks();
}

function exportData() {
  const data = JSON.stringify(packs);
  console.log(data);
}

function importData() {
  const inputData = prompt('Paste your exported data here:');
  try {
    const parsedData = JSON.parse(inputData);
    if (Array.isArray(parsedData)) {
      packs = parsedData;
      renderPacks();
    } else {
      throw new Error('Invalid data format');
    }
  } catch (error) {
    alert('Error importing data. Please make sure you provide valid JSON data.');
  }
}

window.onload = function() {
  const storedData = localStorage.getItem('sims4packs');
  if (storedData) {
    packs = JSON.parse(storedData);
    renderPacks();
  }
}

window.onbeforeunload = function() {
  localStorage.setItem('sims4packs', JSON.stringify(packs));
}
