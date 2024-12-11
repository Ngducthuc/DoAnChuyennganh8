<?php
require_once '../admin/database.php';
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
$db = new Database();
$method = $_SERVER['REQUEST_METHOD'];
if ($method === 'POST') {
        if (isset($_POST['cartegory_id'])) {
            $cartegory_id = $_POST['cartegory_id'];
            $sql_cartegory_id = "SELECT * FROM tbl_product WHERE cartegory_id = '$cartegory_id'";
            $result_cartegory_id = $db->select($sql_cartegory_id);
            if($result_cartegory_id && $result_cartegory_id->num_rows > 0 ){
                $data_cartegory_Detail = [];
                while($data_cartegory_id = $result_cartegory_id->fetch_assoc()){
                    array_unshift($data_cartegory_Detail,[
                        "data_product_id" => Data_Product_id($data_cartegory_id['product_id'], $db)
                    ]);
                }
                echo json_encode([
                    "Code" => 200,
                    "Data" => $data_cartegory_Detail
                ]);
            }else{
                echo json_encode([
                    "Code" => 401,
                    "Messenge" => "Not Defen"
                ]);
            }
            
        }else{
            echo json_encode([
                "Code" => 402,
                "Messenge" => "Requets False"
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