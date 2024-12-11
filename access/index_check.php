<?php
session_start();
require_once('header.php');
require_once('../admin/config.php');
?>
<?php
$sql_Check_user_id = "SELECT * FROM users WHERE email = '" . $_SESSION['emailUser'] . "'";
$result_user_id = $db->select($sql_Check_user_id);
$data_user_id = $result_user_id->fetch_assoc()['id'];
?>
<div class="breadcrumbs">
    <a href="../index.php"><span class="trangchu">Trang chủ</span></a>
    <span style="padding: 0 5px;">/</span>
    <span class="font-nomal">Kiểm tra đơn hàng</span>
</div>
<head>
<style>
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: Arial, sans-serif;
    }
    .breadcrumbs {
        background-color: #f8f9fa;
        padding: 10px 20px;
        font-size: 16px;
    }
    .breadcrumbs a {
        color: #007bff;
        text-decoration: none;
    }
    .breadcrumbs a:hover {
        text-decoration: underline;
    }

    body {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        background-color: #f3f3f3;
        margin: 0;
    }
    .content {
        flex: 1;
        padding: 20px;
    }
    table {
        width: 100%;
        max-width: 1400px;
        margin: 20px auto;
        border-collapse: collapse;
        font-size: 16px;
        text-align: center;
        background-color: #fff;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        border-radius: 8px;
        overflow: hidden;
    }

    thead {
        background-color: #007bff;
        color: #fff;
    }
    thead th {
        padding: 15px;
        font-weight: bold;
        border-bottom: 1px solid #ddd;
    }
    tbody tr {
        transition: background-color 0.3s;
    }
    tbody tr:nth-child(even) {
        background-color: #f2f2f2;
    }
    tbody tr:hover {
        background-color: #e9ecef;
    }
    tbody td {
        padding: 15px;
        border-bottom: 1px solid #ddd;
        white-space: nowrap;
    }
    tbody td[colspan="8"] {
        text-align: center;
        color: #888;
        font-style: italic;
        padding: 20px;
    }
    .footer {
        background-color: #343a40;
        color: #fff;
        text-align: center;
        padding: 20px;
        font-size: 18px;
    }
    .fooe {
        padding-top: 87px;
    }
    .pay-again {
        display: inline-block;
        padding: 10px 20px;
        background-color: #28a745;
        color: #fff;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        text-decoration: none;
        font-size: 16px;
        transition: background-color 0.3s, transform 0.3s;
    }
    .pay-again:hover {
        background-color: #218838;
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
</style>
</head>
<body>
    <table>
        <thead>
            <tr>
            <th style="width: 80px;">STT</th>
            <th style="width: 200px;">Sản phẩm</th>
            <th style="width: 150px;">Số lượng</th>
            <th style="width: 150px;">Số Tiền</th>
            <th style="width: 200px;">Loại thanh toán</th>
            <th style="width: 150px;">Tình trạng</th>
            <th style="width: 250px;">Địa chỉ</th>
            <th style="width: 150px;">Ngày đặt</th>
            </tr>
        </thead>
        <tbody>
            <?php
            if(isset($_SESSION['emailUser'])){
            $query = "SELECT * FROM tbl_oder WHERE email = '" . $_SESSION['emailUser'] . "'";
            $result = mysqli_query($con, $query);
            if (mysqli_num_rows($result) > 0) {
                $stt = 1;
                while ($row = mysqli_fetch_assoc($result)) {
                    $productId = $row['product_id'];
                    $productQuery = "SELECT * FROM tbl_product WHERE product_id = '$productId'";
                    $productResult = mysqli_query($con, $productQuery);
                    $product = mysqli_fetch_assoc($productResult);
                    $TypePay = $row['payment_method'];
                    $TypePay = ($TypePay == 'PayBank') ? 'Thanh toán qua ngân hàng' : 'Thanh toán khi nhận hàng';
                    $paymentStatus = $row['payment_status'];
                    echo "<tr>
						<td>{$stt}</td>
						<td>" . ($product ? $product['product_name'] : 'Không tìm thấy') . "</td>
						<td>{$row['quantity']}</td>
						<td>" . number_format($row['price'], 0, ',', '.') . " ₫</td>
						<td>{$TypePay}</td>
						<td style='color:" . ($paymentStatus == 'Da thanh toan' || $paymentStatus == 'Da nhan' ? 'green' : 'red') . "'>
							{$paymentStatus}";
					if ($TypePay == 'Thanh toán qua ngân hàng' && $paymentStatus == 'Chưa thanh toán') {
						echo "<form action='pay_again.php' method='post' style='margin-top: 10px;'>
								<input type='hidden' name='order_id' value='{$row['order_code']}'>
								<input type='hidden' name='total_price' value='{$row['price']}'>
								<button type='submit' name='payUrl' class='pay-again'>Thanh toán</button>
							  </form>";
					}
					if ($paymentStatus == 'Da nhan') {
                        $sql_user_ratings = "SELECT * FROM user_ratings WHERE user_id = '$data_user_id' AND product_id = '$productId'";
                        $result_data_ratting = $db->select($sql_user_ratings);
                        if ($result_data_ratting && $result_data_ratting->num_rows > 0) {
                            $Check_Ratting = true;
                        }
                        if (!$Check_Ratting) {
                            echo "<form action='review.php' method='post' style='margin-top: 10px;'>
                                    <input type='hidden' name='order_id' value='{$row['order_code']}'>
                                    <input type='hidden' name='product_id' value='{$productId}'>
                                    <button type='submit' class='pay-again' style='background-color: #ffc107; color: #000;'>Đánh giá</button>
                                  </form>";
                        }
                    }                    
					echo "</td>
						<td>{$row['deliveryAddress']}</td>
						<td>{$row['day_create']}</td>
					</tr>";
                    $stt++;
                }
            }
            }else {
                if(isset($_SESSION['emailUser'])){
                    echo "<tr><td colspan='8'>Không có dữ liệu đơn hàng nào.</td></tr>";
                }else{
                    echo "<tr><td colspan='8'>Bạn cần đăng nhập để xem đơn hàng của mình.</td></tr>";
                }
            }
            ?>
        </tbody>
    </table>
    <div class="fooe"><?php require_once('footer.php'); ?></div>
</body>
