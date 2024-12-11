<?PHP
require_once 'database.php';
$_SESSION['emailUser'];
$db = new Database();
$sql_accout = "SELECT * FROM users";
$result_accout = $db->select($sql_accout);
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>User Management</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 text-gray-800">
    <div class="min-h-screen flex flex-col">
        <div class="flex flex-grow">
            <aside class="bg-gray-800 text-white w-1/4 min-h-screen px-4 py-6">
                <?php include "slider.php"; ?>
            </aside>
            <div class="flex-grow">
                <header class="bg-blue-600 text-white py-4 shadow">
                    <div class="container mx-auto flex justify-between items-center px-4">
                        <h1 class="text-2xl font-bold">User Management</h1>
                        <button 
                            id="addUserButton" 
                            class="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-200">
                            Add User
                        </button>
                    </div>
                </header>
                <main class="container mx-auto p-4">
                    <div class="bg-white shadow-md rounded-lg overflow-hidden">
                        <table class="min-w-full bg-white">
                            <thead>
                                <tr class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                    <th class="py-3 px-6 text-left">Name</th>
                                    <th class="py-3 px-6 text-left">Email</th>
                                    <th class="py-3 px-6 text-center">Role</th>
                                    <th class="py-3 px-6 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody class="text-gray-600 text-sm">
                                <?php 
                                if ($result_accout) {
                                    while ($Data_Accout = mysqli_fetch_assoc($result_accout)) {
                                        $Name = $Data_Accout['name'];
                                        $email = $Data_Accout['email'];
                                        $role = $Data_Accout['rule'] == 0 ? 'User' : 'Admin';
                                        echo "
                                        <tr class='border-b border-gray-200 hover:bg-gray-100'>
                                            <td class='py-3 px-6 text-left'>{$Name}</td>
                                            <td class='py-3 px-6 text-left'>{$email}</td>
                                            <td class='py-3 px-6 text-center'>{$role}</td>
                                           <td class='py-3 px-6 text-center'>
                                        <button 
                                            class='editUser bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600' 
                                            data-id='{$Data_Accout['id']}' 
                                            data-name='{$Name}' 
                                            data-email='{$email}' 
                                            data-role='{$Data_Accout['rule']}'>
                                            Edit
                                        </button>
                                        <button id='delete' class='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600'
                                        data-id='{$Data_Accout['id']}'>
                                            Delete
                                        </button>
                                    </td>
                                        </tr>
                                        ";
                                    }
                                } else {
                                    echo "
                                    <tr>
                                        <td colspan='4' class='py-3 px-6 text-center text-gray-500'>
                                            No users found
                                        </td>
                                    </tr>
                                    ";
                                }
                                ?>
                                
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>
        </div>
    </div>
    <div id="addUserModal" class="hidden fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
        <div class="bg-white rounded-lg shadow-lg w-1/3 p-6">
            <h2 class="text-xl font-bold mb-4">Add New User</h2>
            <form id="addUserForm">
                <div class="mb-4">
                    <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
                    <input 
                        type="text" 
                        id="name" 
                        class="mt-1 p-2 w-full border border-gray-300 rounded">
                </div>
                <div class="mb-4">
                    <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                    <input 
                        type="email" 
                        id="email" 
                        class="mt-1 p-2 w-full border border-gray-300 rounded">
                </div>
                <div class="mb-4">
                    <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
                    <input 
                        type="password" 
                        id="password" 
                        class="mt-1 p-2 w-full border border-gray-300 rounded">
                </div>
                <div class="mb-4">
                    <label for="role" class="block text-sm font-medium text-gray-700">Role</label>
                    <select id="role" class="mt-1 p-2 w-full border border-gray-300 rounded">
                        <option value="0">User</option>
                        <option value="1">Admin</option>
                    </select>
                </div>
                <div class="flex justify-end space-x-2">
                    <button 
                        type="button" 
                        id="cancelButton" 
                        class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
                        Cancel
                    </button>
                    <button 
                        type="submit" 
                        class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                        ADD
                    </button>
                </div>
            </form>
        </div>
    </div>
    <!-- Edit -->
    <div id="editUserModal" class="hidden fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
    <div class="bg-white rounded-lg shadow-lg w-1/3 p-6">
        <h2 class="text-xl font-bold mb-4">Edit User</h2>
        <form id="editUserForm">
            <div class="mb-4">
                <label for="editName" class="block text-sm font-medium text-gray-700">Name</label>
                <input 
                    type="text" 
                    id="editName" 
                    class="mt-1 p-2 w-full border border-gray-300 rounded">
            </div>
            <div class="mb-4">
                <label for="editEmail" class="block text-sm font-medium text-gray-700">Email</label>
                <input 
                    type="email" 
                    id="editEmail" 
                    class="mt-1 p-2 w-full border border-gray-300 rounded">
            </div>
            <div class="mb-4">
                <label for="Password" class="block text-sm font-medium text-gray-700">Password</label>
                <input 
                    type="Password" 
                    id="editPassword" 
                    class="mt-1 p-2 w-full border border-gray-300 rounded">
            </div>
            <div class="mb-4">
                <label for="editRole" class="block text-sm font-medium text-gray-700">Role</label>
                <select id="editRole" class="mt-1 p-2 w-full border border-gray-300 rounded">
                    <option value="0">User</option>
                    <option value="1">Admin</option>
                </select>
            </div>
            <div class="flex justify-end space-x-2">
                <button 
                    type="button" 
                    id="cancelEditButton" 
                    class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
                    Cancel
                </button>
                <button 
                    type="submit" 
                    class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Save
                </button>
            </div>
        </form>
    </div>
</div>
    <script>
       document.querySelectorAll('#delete').forEach(button => {
        button.addEventListener('click', () => {
        const id = button.getAttribute('data-id');
        if (confirm('Are you sure you want to delete this user?')) {
            Delete_User(id)
                .then(response => {
                    if (response.Code == 200) {
                        alert('User deleted successfully');
                        location.reload();
                    } else {
                        alert('Failed to delete user');
                    }
                })
                .catch(error => {
                    alert('An error occurred: ');
                });
        }
    });
});

async function Delete_User(id) {
    try {
        const params = new URLSearchParams();
        params.append('id_user', id);
        const response = await fetch('https://doanchuyenganh.site/ModelApp/DeleteUser.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: params.toString(),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error;
    }
}
    </script>
        <style>
        .hidden {
    display: none;
}
    </style>
    <script>
const addUserButton = document.getElementById('addUserButton');
const addUserModal = document.getElementById('addUserModal');
const cancelButton = document.getElementById('cancelButton');
const successMessage = document.createElement('div');
successMessage.className = 'hidden bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative';
successMessage.id = 'successMessage';
successMessage.innerText = 'Registration successful!';
successMessage.style.position = 'fixed';
successMessage.style.top = '20px';
successMessage.style.right = '20px';
document.body.appendChild(successMessage);
addUserButton.addEventListener('click', () => {
    addUserModal.classList.remove('hidden');
});
cancelButton.addEventListener('click', () => {
    addUserModal.classList.add('hidden');
});
const addUserForm = document.getElementById('addUserForm');
addUserForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;
    try {
        const response = await addUsers(name, email, password, role);
        if (response.Code === 200) {
            showSuccessMessage('Registration successful!');
            addUserModal.classList.add('hidden');
            addUserForm.reset();
        } else if (response.Code === 401) {
            showErrorMessage('Email already registered!');
        } else {
            console.error('Unexpected API response:', response);
        }
    } catch (error) {
        console.error('Error adding user:', error);
        showErrorMessage('An error occurred while adding the user.');
    }
});
async function addUsers(name, email, password, role) {
    try {
        const params = new URLSearchParams();
        params.append('nameUser', name);
        params.append('email', email);
        params.append('password', password);
        params.append('role', role);
        const response = await fetch('https://doanchuyenganh.site/ModelApp/Register.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: params.toString(),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error;
    }
}
function showSuccessMessage(message) {
    const successMessage = document.getElementById('successMessage');
    if (successMessage) {
        successMessage.innerText = message;
        successMessage.classList.remove('hidden');
        successMessage.style.display = 'block';
        setTimeout(() => {
            successMessage.classList.add('hidden');
            successMessage.style.display = 'none';
        }, 5000);
    }
}
    </script>
    <script>
const editUserModal = document.getElementById('editUserModal');
const editNameInput = document.getElementById('editName');
const editEmailInput = document.getElementById('editEmail');
const editRoleInput = document.getElementById('editRole');
const editPassword =document.getElementById('editPassword');
const cancelEditButton = document.getElementById('cancelEditButton');
const editUserForm = document.getElementById('editUserForm');
document.querySelectorAll('.editUser').forEach(button => {
    button.addEventListener('click', () => {
        const userId = button.getAttribute('data-id');
        const userName = button.getAttribute('data-name');
        const userEmail = button.getAttribute('data-email');
        const userRole = button.getAttribute('data-role');
        editNameInput.value = userName;
        editEmailInput.value = userEmail;
        editPassword.value = '';
        editRoleInput.value = userRole;
        editUserModal.classList.remove('hidden');
        editUserForm.onsubmit = async (event) => {
            event.preventDefault();
            await editUser(userId, editNameInput.value, editPassword.value, editEmailInput.value, editRoleInput.value);
        };
    });
});
async function editUser(id, name, password, email, role) {
    try {
        const params = new URLSearchParams();
        params.append('id', id);
        params.append('nameUser', name);
        params.append('email', email);
        params.append('password', password);
        params.append('role', role);
        const response = await fetch('https://doanchuyenganh.site/ModelApp/EditUser.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: params.toString(),
        });
        const result = await response.json();
        if (result.Code === 200) {
            showSuccessMessage('User updated successfully!');
            editUserModal.classList.add('hidden');
            updateUserRow(id, name, email, role);
        } else {
            showErrorMessage(result.Message || 'Failed to update user.');
        }
    } catch (error) {
        console.error('Error updating user:', error);
        showErrorMessage('An error occurred while updating the user.');
    }
}
function updateUserRow(id, name, email, role) {
    const userRow = document.querySelector(`[data-id="${id}"]`).closest('tr');
    userRow.querySelector('.userName').textContent = name;
    userRow.querySelector('.userEmail').textContent = email;
    userRow.querySelector('.userRole').textContent = role === '0' ? 'User' : 'Admin';
}
cancelEditButton.addEventListener('click', () => {
    editUserModal.classList.add('hidden');
});
    </script>
</body>
</html>