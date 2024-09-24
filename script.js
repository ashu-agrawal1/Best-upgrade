let upgrades = JSON.parse(localStorage.getItem('upgrades')) || [];

// Function to convert shorthand notations like k, m, b to actual numbers
function parseValue(value) {
    value = value.trim().toLowerCase();
    const num = parseFloat(value);
    if (value.includes('k')) return num * 1e3;
    if (value.includes('m')) return num * 1e6;
    if (value.includes('b')) return num * 1e9;
    return num;
}

// Render upgrades to the table
function renderUpgrades() {
    const table = document.getElementById('upgrade-table');
    table.innerHTML = '';
    upgrades.forEach((upgrade, index) => {
        const efficiency = (upgrade.coinsPerHour / upgrade.cost).toFixed(2);
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${upgrade.name}</td>
            <td>${upgrade.coinsPerHour}</td>
            <td>${upgrade.cost}</td>
            <td>${efficiency}</td>
            <td>
                <button onclick="editUpgrade(${index})">Edit</button>
                <button onclick="deleteUpgrade(${index})">Delete</button>
            </td>
        `;
        table.appendChild(row);
    });
}

// Function to add a new upgrade
function addUpgrade() {
    const name = document.getElementById('upgrade-name').value;
    const coinsPerHour = parseValue(document.getElementById('coins-per-hour').value);
    const cost = parseValue(document.getElementById('cost').value);

    if (name && coinsPerHour && cost) {
        upgrades.push({ name, coinsPerHour, cost });
        localStorage.setItem('upgrades', JSON.stringify(upgrades));
        renderUpgrades();
        clearInputFields();
    } else {
        alert('Please fill in all fields correctly');
    }
}

// Clear input fields after adding an upgrade
function clearInputFields() {
    document.getElementById('upgrade-name').value = '';
    document.getElementById('coins-per-hour').value = '';
    document.getElementById('cost').value = '';
}

// Edit upgrade functionality
function editUpgrade(index) {
    const upgrade = upgrades[index];
    const newName = prompt('Edit Name:', upgrade.name);
    const newCoinsPerHour = prompt('Edit Coins per Hour:', upgrade.coinsPerHour);
    const newCost = prompt('Edit Cost:', upgrade.cost);

    if (newName && newCoinsPerHour && newCost) {
        upgrades[index] = {
            name: newName,
            coinsPerHour: parseValue(newCoinsPerHour),
            cost: parseValue(newCost)
        };
        localStorage.setItem('upgrades', JSON.stringify(upgrades));
        renderUpgrades();
    }
}

// Delete upgrade functionality
function deleteUpgrade(index) {
    upgrades.splice(index, 1);
    localStorage.setItem('upgrades', JSON.stringify(upgrades));
    renderUpgrades();
}

// Sort upgrades by efficiency (coins per hour / cost)
function sortUpgrades() {
    upgrades.sort((a, b) => (b.coinsPerHour / b.cost) - (a.coinsPerHour / a.cost));
    localStorage.setItem('upgrades', JSON.stringify(upgrades));
    renderUpgrades();
}

// Upload upgrades from a JSON file
function uploadUpgrades() {
    const fileInput = document.getElementById('file-input');
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const uploadedData = JSON.parse(event.target.result);
            uploadedData.forEach(upgrade => {
                upgrades.push({
                    name: upgrade.name,
                    coinsPerHour: parseValue(upgrade.coinsPerHour),
                    cost: parseValue(upgrade.cost)
                });
            });
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
