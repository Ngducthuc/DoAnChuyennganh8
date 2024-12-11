<?php
require_once 'database.php';
$db = new Database();
if($_SERVER['REQUEST_METHOD'] === 'POST'){
    $id = $_POST['id_user'];
    $sql_Delete_User = "DELETE FROM users WHERE id = '$id'";
    $result_Delete = $db->delete($sql_Delete_User);
    if ($result_Delete) {
        echo json_encode(['Code' => 200, 'Message' => 'Delete User successfully']);
    } else {
        echo json_encode(['Code' => 500, 'Message' => 'Delete Failed']);
    }
}
?>