document.addEventListener('DOMContentLoaded', () => {
  const table = document.querySelector('.user-table');
  const tbody = table.querySelector('tbody');
  const searchInput = document.querySelector('.search-input');
  const searchButton = document.querySelector('.search-button');
  const nameSortButton = document.querySelectorAll('.filter-btn')[0]; // Assuming first is still name sort
  const roleFilterButton = document.getElementById('role-filter-btn'); // Get button by ID

  const originalRows = Array.from(tbody.querySelectorAll('tr'));

  let isNameSortedAsc = false;
  const rolesCycle = ['All', 'Student', 'Teacher', 'Admin'];
  let currentRoleFilterIndex = 0; // Start with 'All'


  function renderTable(rowsToRender) {
    tbody.innerHTML = '';
    rowsToRender.forEach(row => tbody.appendChild(row));
  }

  function applySearchFilterAndSort() {
    const searchTerm = searchInput.value.trim().toLowerCase();

    let filteredRows = originalRows;


    // 1. Filter by Search Term
    if (searchTerm) {
      filteredRows = originalRows.filter(row => {
        const userId = row.children[0].textContent.trim().toLowerCase();
        const name = row.children[1].textContent.trim().toLowerCase();
        return userId.includes(searchTerm) || name.includes(searchTerm);
      });
    }

    // 2. Filter by Role
    const currentRole = rolesCycle[currentRoleFilterIndex];
    if (currentRole !== 'All') {
      filteredRows = filteredRows.filter(row => {
        // Assuming Role is in the 5th column (index 4)
        const role = row.children[4].textContent.trim();
        return role === currentRole;
      });
    }


    // 3. Sort by Name or UserID
    if (isNameSortedAsc) {
      filteredRows.sort((a, b) => {
        const nameA = a.children[1].textContent.trim().toLowerCase();
        const nameB = b.children[1].textContent.trim().toLowerCase();
        return nameA.localeCompare(nameB);
      });
    } else {

      filteredRows.sort((a, b) => {

         const idTextA = a.children[0].querySelector('a') ? a.children[0].querySelector('a').textContent.trim() : a.children[0].textContent.trim();
         const idTextB = b.children[0].querySelector('a') ? b.children[0].querySelector('a').textContent.trim() : b.children[0].textContent.trim();

         const idA = parseInt(idTextA, 10);
         const idB = parseInt(idTextB, 10);
         if (!isNaN(idA) && !isNaN(idB)) {
            return idA - idB;
         }
         return idTextA.localeCompare(idTextB);
      });
    }

    renderTable(filteredRows);
  }



  searchButton.addEventListener('click', applySearchFilterAndSort);
  searchInput.addEventListener('keyup', (event) => {

    if (event.key === 'Enter') {
      applySearchFilterAndSort();
    }

  });


  nameSortButton.addEventListener('click', () => {
    isNameSortedAsc = !isNameSortedAsc;
    nameSortButton.classList.toggle('active', isNameSortedAsc);

    applySearchFilterAndSort();
  });


  // Role Filter Button
  roleFilterButton.addEventListener('click', () => {
    // Cycle to the next role
    currentRoleFilterIndex = (currentRoleFilterIndex + 1) % rolesCycle.length;
    const nextRole = rolesCycle[currentRoleFilterIndex];

    // Update button text
    roleFilterButton.textContent = `Filter Role: ${nextRole}`;

    // Optional: Manage active class if needed, though text indicates state
    // roleFilterButton.classList.toggle('active', nextRole !== 'All');
    // nameSortButton.classList.remove('active'); // Deactivate other filters if needed

    applySearchFilterAndSort(); // Re-apply filters and sort
  });


  applySearchFilterAndSort();
});
