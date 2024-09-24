let upgrades = JSON.parse(localStorage.getItem('upgrades')) || [];

function renderUpgrades() {
    const table = document.getElementById('upgrade-table');
    table.innerHTML = '';
    upgrades.forEach((upgrade, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${upgrade.name}</td>
            <td>${upgrade.coinsPerHour}</td>
            <td>${upgrade.cost}</td>
            <td>
                <button onclick="editUpgrade(${index})">Edit</button>
                <button onclick="deleteUpgrade(${index})">Delete</button>
            </td>
        `;
        table.appendChild(row);
    });
}

function addUpgrade() {
    const name = document.getElementById('upgrade-name').value;
    const coinsPerHour = parseFloat(document.getElementById('coins-per-hour').value);
    const cost = parseFloat(document.getElementById('cost').value);

    if (name && coinsPerHour && cost) {
        upgrades.push({ name, coinsPerHour, cost });
        localStorage.setItem('upgrades', JSON.stringify(upgrades));
        renderUpgrades();
    } else {
        alert('Please fill in all fields');
    }
}

function editUpgrade(index) {
    const upgrade = upgrades[index];
    const newName = prompt('Edit Name:', upgrade.name);
    const newCoinsPerHour = prompt('Edit Coins per Hour:', upgrade.coinsPerHour);
    const newCost = prompt('Edit Cost:', upgrade.cost);

    if (newName && newCoinsPerHour && newCost) {
        upgrades[index] = { name: newName, coinsPerHour: parseFloat(newCoinsPerHour), cost: parseFloat(newCost) };
        localStorage.setItem('upgrades', JSON.stringify(upgrades));
        renderUpgrades();
    }
}

function deleteUpgrade(index) {
    upgrades.splice(index, 1);
    localStorage.setItem('upgrades', JSON.stringify(upgrades));
    renderUpgrades();
}

function sortUpgrades() {
    upgrades.sort((a, b) => (b.coinsPerHour / b.cost) - (a.coinsPerHour / a.cost));
    localStorage.setItem('upgrades', JSON.stringify(upgrades));
    renderUpgrades();
}

function uploadUpgrades() {
    const fileInput = document.getElementById('file-input');
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const uploadedData = JSON.parse(event.target.result);
            upgrades = [...upgrades, ...uploadedData];
            localStorage.setItem('upgrades', JSON.stringify(upgrades));
            renderUpgrades();
        };
        reader.readAsText(file);
    } else {
        alert('Please select a file');
    }
}

// Initialize the table with stored upgrades
renderUpgrades();
