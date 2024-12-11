<?php
require_once 'database.php';
$db = new Database();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = $_POST['id'];
    $name = $_POST['nameUser'];
    $email = $_POST['email'];
    password_verify($password,$_POST['password']);
    $role = $_POST['role'];
    $sql_update = "UPDATE users SET name = $name, password = $password, email = $email, rule = $role WHERE id = $id";
    $result_updateUser = $db->update($sql_update);
    if ($result_updateUser) {
        echo json_encode(['Code' => 200, 'Message' => 'User updated successfully']);
    } else {
        echo json_encode(['Code' => 500, 'Message' => 'Failed to update user']);
    }
}
?>
