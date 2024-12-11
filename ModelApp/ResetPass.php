<?php
require_once '../admin/database.php';
require_once '../mail/sendmail.php';
if($_SERVER['REQUEST_METHOD'] == 'POST'){
    $db = new Database();
    if(isset($_POST['email'])){
        $sql_CheckEmail = "SELECT * FROM users WHERE email = '$email'";
        $result_Email = $db->select($sql_CheckEmail);
        if($result_Email && $result_Email->num_rows > 0){
            $Code = create_Code();
            $sql_InsertCode = "INSERT INTO data_code(email,code,create_at) VALUES ('$email','$Code',NOW())";
            if($sql_InsertCode){
                SendMail($email,$Code);
                echo json_encode([
                    "Code" => 200,
                    "Messenge" => "Code send sussess"
                ]);
            }else{
                echo json_encode([
                    "Code" => 402,
                    "Messange" => "Create code false"
                ]);
            }
        }else{
            echo json_encode([
                "Code" => 401,
                "Messange" => "Email exist"
            ]);
        }
    }else{
        if(isset($_POST['code']) && isset($_POST['email_check'])){
            $code = $_POST['code'];
            $email_Com = $_POST['email_check'];
            $result_CheckCode = CheckCode($email_Com,$code,$db);
            if($result_CheckCode){
                echo json_encode([
                    "Code" => 200,
                    "Messenge" => "Authentic sussess"
                ]);
            }else{
                echo json_encode([
                    "Code" => 501,
                    "Messenge" => "Authentic false"
                ]);
            }
        }
    }
    if(isset($_POST['email_reset']) && isset($_POST['password'])){
        $email = $_POST['email_reset'];
        $password = $_POST['password'];
        $result_ResetPass = ResetPass($email,$password,$db);
        if($result_ResetPass){
            echo json_encode([
                "Code" => 200,
                "Messenge" => "Reset password sussess"
            ]);
        }else{
            echo json_encode([
                "Code" => 401,
                "Messenge" => "Reset password false"
            ]);
        }
    }
}
function ResetPass($email,$password,$db){
    $sql_ResetPass = "UPDATE users SET password = '$password' WHERE email = '$email'";
    $result_ResetPass = $db->update($sql_ResetPass);
    if($result_ResetPass){
        return true;
    }else{
        return false;
    }
}
function CheckCode($email,$code,$db){
    $sql_CheckCode = "SELECT * FROM data_code WHERE code = '$code' AND email = '$email'";
    $result_CheckCode = $db->select($sql_CheckCode);
    if($result_CheckCode && $result_CheckCode->num_rows > 0){
        return true;
    }else{
        return false;
    }
}
function create_Code($length = 6){
    $charset = '0123456789';
    $CharacterLength = strlen($charset);
    $CreCode = '';
    for ($i = 0; $i < $length; $i++) {
        $CreCode .= $charset[rand(0, $CharacterLength - 1)];
    }
    return $CreCode;
}
function SendMail($email,$Code){
    $noidung ='';
    $lienket = "https://doanchuyenganh.site/login.php";
    $lienket_text = "tại đây";
    $noidung ='';
        $tieude = "Thông báo code reset password";
        $noidung_befo = "<h1 style='text-align: center; font-size: 25px; font-family: Arial, sans-serif; color: #333333; margin-bottom: 20px;'>Thông tin đơn hàng</h1>";
        $noidung_affter = "<ul style='border: 1px solid #e2e2e2; padding: 20px; background-color: #f9f9f9; margin: 10px; list-style-type: none; font-family: Arial, sans-serif;'>
        <li><strong>Mã xác nhận: </strong>".$Code."</li>
        <li>Bạn có thể truy cập WEBSITE <a href='" . $lienket . "'>" . $lienket_text . "</a></li>
        </ul>";
        $noidung .= $noidung_befo . $noidung_affter;
        $maildathang = $email;
        $mail = new Mailer();
        $result = $mail->dathangmail($tieude, $noidung, $maildathang);
}
?>