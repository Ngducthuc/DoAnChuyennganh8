<?php
require_once '../admin/database.php';
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
$method = $_SERVER['REQUEST_METHOD'];
if($method = 'POST'){
    if(isset($_POST['token'])){
        $token = $_POST['token'];
        $product_id = 0;
        if(isset($_POST['product_id'])){
            $product_id = $_POST['product_id'];
        }
        $db = new Database();
        $sql_CheckToken = "SELECT token FROM users WHERE token = '$token'";
        $result_Token = $db->select($sql_CheckToken);
        if ($result_Token) {
            $userQuery = $db->select("SELECT email FROM users WHERE token = '$token'");
            if ($userQuery && $userQuery->num_rows > 0) {
                $emailUser = $userQuery->fetch_assoc()['email'];
                if($product_id != 0){
                    $sql_AddFavorite = "INSERT INTO tbl_favourite(email,product_id,create_at) VALUE('$emailUser','$product_id',NOW())";
                    $result_AddFavorite = $db->insert($sql_AddFavorite);
                    if($result_AddFavorite){
                        echo json_encode([
                            "Code" => 200,
                            "message" => "Sussess"
                        ]);
                    }else{
                        echo json_encode([
                            "Code" => 401,
                            "message" => "Add Eroor"
                        ]);
                    }
                }else{
                    $sql_ShowFavorite = "SELECT * FROM tbl_favourite WHERE email = '$emailUser'";
                    $result_ShowFavorite = $db->select($sql_ShowFavorite);
                    if($result_ShowFavorite && $result_ShowFavorite->num_rows > 0){
                       while($data_Favorite = $result_ShowFavorite->fetch_assoc()){
                        $product_id = $data_Favorite['product_id'];
                        $data_Favorite_Detail [] =[
                            "id" => $data_Favorite['id'],
                            "data_product_id" => Data_Product_id($product_id,$db),
                            "create" => $data_Favorite['create_at']
                        ];
                       }
                       echo json_encode([
                        "Code" => 200,
                        "data" => $data_Favorite_Detail
                    ]);
                    }else{
                        echo json_encode([
                            "Code" => 201,
                            "data" => "No data"
                        ]);
                    }
                   
                }
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