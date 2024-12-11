<?php
require_once '../admin/database.php';
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
$method = $_SERVER['REQUEST_METHOD'];
if($method = 'POST'){
    if(isset($_POST['token'])){
        $token = $_POST['token'];
        $db = new Database();
        $sql_CheckToken = "SELECT token FROM users WHERE token = '$token'";
        $result_Token = $db->select($sql_CheckToken);
        if ($result_Token) {
            $userQuery = $db->select("SELECT * FROM users WHERE token = '$token'");
            if ($userQuery && $userQuery->num_rows > 0) {
                $data_user = $userQuery->fetch_assoc();
                $emailUser = $data_user['email'];
                $nameUser = $data_user['name'];
                $rule = 'Thanh vien';
                echo json_encode([
                    "Code" => 200,
                    "data" => [
                        'email' => $emailUser,
                        'name' => $nameUser,
                        'rule' => $rule
                    ]
                    ]);
            } else {
                echo json_encode([
                    "Code" => 404,
                    "message" => "Invalid token or no user found."
                ]);
            }
        } else {
            echo json_encode([
                "Code" => 403,
                "message" => "Invalid token"
            ]);
        }
        
    }
}
?>