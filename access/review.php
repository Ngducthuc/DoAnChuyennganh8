<?php
session_start();
require_once 'header.php'; ?>
<?php
if (!isset($_SESSION['emailUser'])) {
    header('Location: https://doanchuyenganh.site/index_login.php');
    exit();
}
?>
<?php
if(isset($_POST['product_id'])){
    $product_id = $_POST['product_id'];
    $result_product = data_product_id($product_id);
    $con_product = json_decode($result_product,true);
    $data_product = $con_product['Data'][0];
}
function data_product_id($product_id){
$url = 'https://doanchuyenganh.site/ModelApp/DetailProduct.php';
$data = [
    'product_id' => $product_id,
];
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
$headers = [
    'Content-Type: application/x-www-form-urlencoded'
];
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
$response = curl_exec($ch);
if(curl_errno($ch)) {
    echo 'Error:' . curl_error($ch);
}
curl_close($ch);
return $response;
}
?>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Đánh giá sản phẩm</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    .header-spacing {
      margin-bottom: 110px;
    }
    .footer-spacing {
      margin-top: 0px;
    }
    .content-wrapper {
      margin: 0 50px;
      padding: 0 50px;
    }
  </style>
</head>
<div class="bg-gray-100 flex flex-col min-h-screen">
  <div class="header-spacing"></div>
  <!-- Nội dung chính -->
  <main class="flex-grow content-wrapper">
    <div class="max-w-2xl mx-auto mt-6 bg-white shadow-md rounded-lg p-6">
      <!-- Thông tin sản phẩm -->
      <div class="flex items-center gap-6 mb-6">
        <img src="<?php echo 'https://doanchuyenganh.site/admin/uploads/giay%20'.$data_product['product_img'] ?>" alt="" class="w-32 h-32 object-cover rounded-md border">
        <div>
          <h2 class="text-2xl font-bold text-gray-800"><?php echo $data_product['product_name'] ?></h2>
          <p class="text-gray-600 mt-2">Giá: <span class="text-green-500 font-semibold"><?php echo number_format($data_product['product_price_new'])?></span></p>
          <p class="text-gray-600 mt-1"><?php echo $data_product['product_desc'] ?></p>
        </div>
      </div>
      <!-- Đánh giá sao -->
      <div class="mb-6">
        <h3 class="text-lg font-medium text-gray-800 mb-3">Đánh giá sản phẩm:</h3>
        <div class="flex gap-2 text-yellow-500 text-3xl cursor-pointer" id="stars">
          <span data-value="1" class="star">★</span>
          <span data-value="2" class="star">★</span>
          <span data-value="3" class="star">★</span>
          <span data-value="4" class="star">★</span>
          <span data-value="5" class="star">★</span>
        </div>
        <p id="rating" class="text-gray-600 mt-2">Bạn chưa chọn số sao.</p>
      </div>
      <!-- Nút đánh giá -->
      <form action="submit_review.php" method="POST">
        <input type="hidden" name="product_id" value="<?php echo $product_id ?>">
        <input type="hidden" name="rating" id="rating-value" value="0">
        <button 
          type="submit"
          id="buttonReview"
          class="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition">
          Gửi đánh giá
        </button>
      </form>
    </div>
  </main>
  <!-- Footer spacing -->
  <div class="footer-spacing"></div>
</div>
<?php require_once 'footer.php'; ?>
<script>
  const stars = document.querySelectorAll('.star');
  const ratingValue = document.getElementById('rating-value');
  const ratingText = document.getElementById('rating');
  stars.forEach(star => {
    star.addEventListener('click', () => {
      const value = star.getAttribute('data-value');
      ratingValue.value = value;
      ratingText.textContent = `Bạn đã chọn ${value} sao.`;
      stars.forEach(s => {
        s.style.color = s.getAttribute('data-value') <= value ? '#ffc107' : '#d1d5db';
      });
    });
  });
    const SendRevew = document.getElementById('buttonReview');
    SendRevew.addEventListener('click', async (event) => {
    event.preventDefault();
    const emailUser = '<?php echo $_SESSION["emailUser"]; ?>';
    const product_id = '<?php echo $product_id; ?>';
    const rating = document.getElementById('rating-value').value;
    if (!rating || rating <= 0) {
        alert('Vui lòng chọn số sao để đánh giá.');
        return;
    }
    try {
        const response = await Review(emailUser, product_id, rating);
        if (response.Code === 200) {
            alert('Đánh giá thành công!' + product_id);
            window.location.href = 'https://doanchuyenganh.site/access/index_check.php';
        } else {
            alert('Đánh giá thất bại: ' + response.Message);
        }
    } catch (error) {
        alert('Có lỗi xảy ra khi gửi đánh giá.');
        console.error(error);
    }
});
  async function Review(email,product_id,ratting){
    try {
        const params = new URLSearchParams();
        params.append('email', email);
        params.append('product_id', product_id);
        params.append('ratting', ratting);
        const response = await fetch('https://doanchuyenganh.site/ModelApp/ReviewAPI.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: params.toString(),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error;
    }
  }
</script>