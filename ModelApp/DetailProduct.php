<?php
require_once '../admin/database.php';
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
$db = new Database();
$method = $_SERVER['REQUEST_METHOD'];
if ($method === 'POST') {
    if (isset($_POST['product_id'])) {
        $product_id = $_POST['product_id'];
        echo json_encode([
            "Code" => 200,
            "Data" => Data_Product_id($product_id,$db)
        ]);
    }
}
function Data_Product_id($product_id,$db){
    $sql_Product_id = "SELECT * FROM tbl_product WHERE product_id = '$product_id'";
    $result_Product_id = $db->select($sql_Product_id);
    $data_Product_id_Detail = [];
    if($result_Product_id && $result_Product_id->num_rows > 0){
        while($data_Product_id = $result_Product_id->fetch_assoc()){
            $data_Product_id_Detail [] = [
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