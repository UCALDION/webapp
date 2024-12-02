const userForm = document.getElementById('userForm');
const usersList = document.getElementById('usersList');

// Fetch and display users
function fetchUsers() {
  fetch('/users')
    .then(response => response.json())
    .then(users => {
      usersList.innerHTML = ''; // Clear the list
      users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${user.id}</td><td>${user.name}</td><td>${user.description}</td>`;
        usersList.appendChild(row);
      });
    })
    .catch(error => console.error('Error fetching users:', error));
}

// Add event listener for form submission
userForm.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent page reload

  const name = document.getElementById('name').value;
  const description = document.getElementById('description').value;

  // Send POST request to add a new user
  fetch('/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, description })
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(user => {
    userForm.reset(); // Clear the form
    fetchUsers(); // Refresh the user list
  })
  .catch(error => console.error('Error adding user:', error));
});

// Initial fetch of users
fetchUsers();