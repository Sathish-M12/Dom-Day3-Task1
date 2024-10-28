let currentPage = 1;
const itemsPerPage = 10;

async function fetchData() {
    const response = await fetch('../dataTable.js');
    const data = await response.json();
    return data;
}

function renderTable(data) {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedItems = data.slice(start, end);
    const tableBody = document.getElementById('table-body');
    tableBody.innerHTML = '';

    paginatedItems.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.email}</td>
        `;
        tableBody.appendChild(row);
    });

    document.getElementById('page-info').textContent = `Page ${currentPage} of ${Math.ceil(data.length / itemsPerPage)}`;
}

function updateButtons(data) {
    document.getElementById('prevBtn').disabled = currentPage === 1;
    document.getElementById('nextBtn').disabled = currentPage === Math.ceil(data.length / itemsPerPage);
}

async function init() {
    const data = await fetchData();
    renderTable(data);
    updateButtons(data);

    document.getElementById('prevBtn').addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderTable(data);
            updateButtons(data);
        }
    });

    document.getElementById('nextBtn').addEventListener('click', () => {
        if (currentPage < Math.ceil(data.length / itemsPerPage)) {
            currentPage++;
            renderTable(data);
            updateButtons(data);
        }
    });
}

init();
