<?php
require_once '../admin/database.php';
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");

$db = new Database();
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'POST') {
    if (isset($_POST['token'])) {
        $token = $_POST['token'];
        $sql_CheckToken = "SELECT token FROM users WHERE token = '$token'";
        $result_Token = $db->select($sql_CheckToken);
        if ($result_Token) {
            $userQuery = $db->select("SELECT email FROM users WHERE token = '$token'");
            if ($userQuery && $userQuery->num_rows > 0) {
                $emailUser = $userQuery->fetch_assoc()['email'];
                $sql_Data_Recent = "SELECT * FROM tbl_data_log_user WHERE email = '$emailUser'";
                $result_Data_Recent = $db->select($sql_Data_Recent);

                if ($result_Data_Recent && $result_Data_Recent->num_rows > 0) {
                    $data_Recent_Detail = [];
                    while ($Data_Recent = $result_Data_Recent->fetch_assoc()) {
                        $product_id = $Data_Recent['product_id'];
                        array_unshift($data_Recent_Detail, [
                            "id" => $Data_Recent['id'],
                            "data_product_id" => Data_Product_id($product_id, $db),
                        ]);
                    }
                    echo json_encode([
                        "Code" => 200,
                        "data" => $data_Recent_Detail
                    ]);
                } else {
                    echo json_encode([
                        "Code" => 404,
                        "message" => "No recent data found"
                    ]);
                }
            }
        } else {
            echo json_encode([
                "Code" => 402,
                "message" => "Error"
            ]);
        }
    } else {
        echo json_encode([
            "Code" => 401,
            "message" => "Invalid token"
        ]);
    }
} else {
    http_response_code(400);
    echo json_encode([
        "Code" => 404,
        "message" => "Invalid token or request method"
    ]);
}

function Data_Product_id($product_id, $db) {
    $sql_Product_id = "SELECT * FROM tbl_product WHERE product_id = '$product_id'";
    $result_Product_id = $db->select($sql_Product_id);
    $data_Product_id_Detail = [];

    if ($result_Product_id && $result_Product_id->num_rows > 0) {
        while ($data_Product_id = $result_Product_id->fetch_assoc()) {
            $data_Product_id_Detail[] = [
                'product_id' => $data_Product_id['product_id'],
                'product_name' => $data_Product_id['product_name'],
                'cartegory_id' => $data_Product_id['cartegory_id'],
                'brand_id' => $data_Product_id['brand_id'],
                'product_price' => $data_Product_id['product_price'],
                'product_price_new' => $data_Product_id['product_price_new'],
                'product_desc' => $data_Product_id['product_desc'],
                'product_img' => $data_Product_id['product_img']
            ];
        }
    }

    return $data_Product_id_Detail;
}
?>
