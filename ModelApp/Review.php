<?php
require_once '../admin/database.php';
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
$db = new Database();
$method = $_SERVER['REQUEST_METHOD'];
if ($method === 'POST') {
        if (isset($_POST['email']) && isset($_POST['product_id']) && isset($_POST['ratting'])) {
            $email = $_POST['email'];
            $product_id = $_POST['product_id'];
            $ratting = $_POST['ratting'];
            $sql_Email = "SELECT * FROM users WHERE email = '$email'";
            $result_user_id = $db->select($sql_Email);
            $data_user_id = $result_user_id->fetch_assoc()['id'];
            $sql_InserRatting = "INSERT INTO user_ratings(user_id,product_id,rating) VALUES ('$data_user_id','$product_id','$ratting') ";
            $result_InserRating = $db->insert($sql_InserRatting);
            if($result_InserRating){
                echo json_encode([
                    "Code" => 200,
                    "Messenge" => "Insert rating sussess"
                ]);
            }else{
                echo json_encode([
                    "Code" => 401,
                    "Messenge" => "Insert rating false"
                ]);
            }
        }else{
            echo json_encode([
                "Code" => 402,
                "Messenge" => "Data No Exit"
            ]);
        }
    }
                
?>