<?php
session_start();
require_once('header.php');
$db = new Database();
$product_id = isset($_GET['product_id']) ? intval($_GET['product_id']) : 0;
$category_name = "";
$brand_name = "";
$product_name = "";
if ($db->link) {
    $query_product = "SELECT p.*, c.cartegory_name, b.brand_name
                      FROM tbl_product p
                      LEFT JOIN tbl_cartegory c ON p.cartegory_id = c.cartegory_id
                      LEFT JOIN tbl_brand b ON p.brand_id = b.brand_id
                      WHERE p.product_id = $product_id";
    $result_product = $db->select($query_product);
    if ($result_product && $result_product->num_rows > 0) {
        $product = $result_product->fetch_assoc();
        $category_name = isset($product['cartegory_name']) ? $product['cartegory_name'] : "";
        $brand_name = isset($product['brand_name']) ? $product['brand_name'] : "";
        $product_name = isset($product['product_name']) ? $product['product_name'] : "";
        $query_imgs = "SELECT product_img_desc FROM tbl_product_img_desc WHERE product_id = $product_id";
        $result_imgs = $db->select($query_imgs);
        $product_imgs = [];
        if ($result_imgs && $result_imgs->num_rows > 0) {
            while ($img = $result_imgs->fetch_assoc()) {
                $product_imgs[] = $img;
            }
        }
    } else {
        echo "Không tìm thấy sản phẩm";
        exit;
    }
} else {
    echo "Kết nối cơ sở dữ liệu không thành công.";
    exit;
}
?>
<?php
if (isset($_SESSION['emailUser'])) {
    $emailUser = $_SESSION['emailUser'];
}
?>
<script>
    let startTime = Date.now();
    window.addEventListener("beforeunload", function () {
        let timeSpent = Math.floor((Date.now() - startTime) / 1000);
        navigator.sendBeacon("save_time.php", JSON.stringify({
            time_spent: timeSpent,
            email: <?php echo json_encode($emailUser); ?>,
            product_id: <?php echo json_encode($product_id); ?>
        }));
    });
</script>
<div class="breadcrumbs">
    <a href="../index.php"><span class="trangchu">Trang chủ</span></a>
    <span style="padding: 0 5px;">/</span>
    <?php if (!empty($category_name)) { ?>
        <a href="#"><span class="trangchu"><?php echo htmlspecialchars($category_name); ?></span></a>
        <span style="padding: 0 5px;">/</span>
    <?php } ?>
    <?php if (!empty($brand_name)) { ?>
        <a href="#"><span class="trangchu"><?php echo htmlspecialchars($brand_name); ?></span></a>
        <span style="padding: 0 5px;">/</span>
    <?php } ?>
    <span class="font-nomal"><?php echo htmlspecialchars($product_name); ?></span>
</div>
<section class="product">
    <div class="container_product">
        <div class="product-content">
            <div class="product-content-left">
                <div class="product-content-left-big-img" id="bigImgContainer">
                    <img src="../admin/uploads/<?php echo htmlspecialchars($product['product_img']); ?>" alt="" id="bigImg">
                </div>
                <div class="product-content-left-small-img">
                    <?php foreach ($product_imgs as $img) { ?>
                        <img src="../admin/uploads/<?php echo htmlspecialchars($img['product_img_desc']); ?>" alt="">
                    <?php } ?>
                </div>
            </div>
            <div class="product-content-right">
                <div class="product-content-right-product-name">
                    <h1><?php echo htmlspecialchars($product['product_name']); ?></h1>
                    <p>Mã sản phẩm: <?php echo htmlspecialchars($product['product_id']); ?></p>
                </div>
                <div class="product-content-right-product-price">
                    <p><?php echo number_format(htmlspecialchars($product['product_price_new'])); ?><sup>đ</sup></p>
                </div>
                <div class="product-content-right-product-size">
                    <p style="font-weight: bold;">Size</p>
                    <div class="size">
                        <span>S</span>
                        <span>M</span>
                        <span>L</span>
                        <span>XL</span>
                    </div>
                </div>
                <div class="quantity">
                    <p style="font-weight: bold;">Số lượng</p>
                    <input type="number" min="1" value="1" id="quantity">
                </div>
                <p style="color: red;">Vui lòng chọn size</p>
                <div class="product-content-right-product-button">
                    <form action="add_to_cart.php" method="post">
                        <input type="hidden" name="product_id" value="<?php echo $product_id; ?>">
                        <input type="hidden" name="product_name" value="<?php echo htmlspecialchars($product['product_name']); ?>">
                        <input type="hidden" name="product_price" value="<?php echo htmlspecialchars($product['product_price_new']); ?>">
                        <input type="hidden" name="product_img" value="<?php echo htmlspecialchars($product['product_img']); ?>">
                        <input type="hidden" name="quantity" id="form_quantity" value="1">
                        <button type="submit" onclick="document.getElementById('form_quantity').value = document.getElementById('quantity').value;">
                            <i class="fas fa-shopping-cart"></i>
                            <p>THÊM VÀO GIỎ HÀNG</p>
                        </button>
                    </form>
                    <button><p>MUA HÀNG</p></button>
                </div>
                <div class="product-content-right-product-contact">
                        <p>BẠN CẦN ĐẶT ÁO ĐỘI BÓNG? BẠN CẦN ĐẶT IN TÊN SỐ?</p>
                        <div class="product-content-right-product-icon">
                            <div class="product-content-right-product-icon-item">
                                <i class="fas fa-phone-alt"></i>
                                <p>Hotline</p>
                            </div>
                            <div class="product-content-right-product-icon-item">
                                <i class="fas fa-comments"></i>
                                <p>Chat</p>
                            </div>
                        </div>
                    </div>
                <div class="product-content-right-bottom">
                    <div class="product-content-right-bottom-top">
                        &#8744;
                    </div>
                    <div class="product-content-right-bottom-content-big hidden">
                        <div class="product-content-right-bottom-content-title">
                            <div class="product-content-right-bottom-content-title-item">
                                <p>Hướng dẫn chọn size</p>
                            </div>
                        </div>
                        <div class="product-content-right-bottom-content">
                            <div class="product-content-right-bottom-content-chitiet">
                                <table>
                                    <tr>
                                        <th>Chiều cao (cm)</th>
                                        <th>Cân nặng (kg)</th>
                                        <th>Size áo (form châu Á)</th>
                                    </tr>
                                    <tr>
                                        <td>150 - 159</td>
                                        <td>46 - 55</td>
                                        <td>S</td>
                                    </tr>
                                    <tr>
                                        <td>160 - 165</td>
                                        <td>56 - 65</td>
                                        <td>M</td>
                                    </tr>
                                    <tr>
                                        <td>166 - 170</td>
                                        <td>66 - 70</td>
                                        <td>L</td>
                                    </tr>
                                    <tr>
                                        <td>>170</td>
                                        <td>71 - 80</td>
                                        <td>XL</td>
                                    </tr>
                                </table>
                                <p>Lưu ý: Khi chọn size theo chiều cao và cân nặng: nếu chiều cao và cân nặng không cùng 1 dòng, bạn phải chọn size theo mức nào lớn hơn.</p>
                                <ul>
                                    <li>Nếu chiều cao & cân nặng cùng 1 dòng, size áo vừa vặn cơ thể. Không rộng và cũng không chật. Không ngắn và cũng không dài.</li>
                                    <li>Nếu mức chiều cao lớn hơn cân nặng, bạn hơi gầy. Bề dài vừa vặn, nhưng áo mặc sẽ hơi rộng.</li>
                                    <li>Nếu mức cân nặng lớn hơn chiều cao, bạn hơi mập. Bề rộng vừa vặn, nhưng áo mặc sẽ hơi dài.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <script>
                    document.addEventListener('DOMContentLoaded', function() {
                        var toggleButton = document.querySelector('.product-content-right-bottom-top');
                        var contentBig = document.querySelector('.product-content-right-bottom-content-big');
                        toggleButton.addEventListener('click', function() {
                            contentBig.classList.toggle('hidden');
                        });
                    });
                </script>
            </div>
        </div>
    </div>
</section>
<!-- Gợi ý -->
 <style>
    .suggested-product-item img {
    width: 100%;
    height: 150px;
    object-fit: cover;
    border-radius: 8px;
    margin-bottom: 10px;
}
    .suggested-products {
    margin-top: 40px;
    padding: 20px 0;
    background-color: #f9f9f9;
    overflow: hidden;
}

.container_suggested {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 15px;
}

.suggested-products h2 {
    font-size: 24px;
    margin-bottom: 20px;
    text-align: center;
    color: #333;
}

.carousel-wrapper {
    position: relative;
    display: flex;
    align-items: center;
}

.carousel {
    display: flex;
    gap: 20px;
    overflow-x: auto;
    scroll-behavior: smooth;
    scrollbar-width: none;
}

.carousel::-webkit-scrollbar {
    display: none;
}

.suggested-product-item {
    min-width: 200px;
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 8px;
    text-align: center;
    padding: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.suggested-product-item img {
    width: 100%;
    height: auto;
    border-radius: 8px;
    margin-bottom: 10px;
}

.suggested-product-item .product-name {
    font-size: 14px;
    font-weight: bold;
    margin: 5px 0;
    color: #333;
}

.suggested-product-item .product-price {
    font-size: 12px;
    color: #e74c3c;
}

.suggested-product-item a {
    text-decoration: none;
    color: inherit;
}

.suggested-product-item:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.carousel-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 50%;
    font-size: 18px;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    z-index: 10;
    transition: background 0.3s;
}

.carousel-btn:hover {
    background: #ddd;
}

.left-btn {
    left: 10px;
}
.right-btn {
    right: 10px;
}
 </style>
<section class="suggested-products">
    <div class="container_suggested">
        <h2>Sản phẩm gợi ý</h2>
        <div class="carousel-wrapper">
            <button class="carousel-btn left-btn" id="prevBtn">&#10094;</button>
            <div class="carousel">
                <?php
                $query_suggested = "SELECT product_id, product_name, product_price_new, product_img FROM tbl_product WHERE cartegory_id = {$product['cartegory_id']} AND product_id != $product_id LIMIT 10";
                $result_suggested = $db->select($query_suggested);
                if ($result_suggested && $result_suggested->num_rows > 0) {
                    while ($suggested = $result_suggested->fetch_assoc()) { ?>
                        <div class="suggested-product-item">
                            <a href="index_chitiet.php?product_id=<?php echo $suggested['product_id']; ?>">
                                <img src="../admin/uploads/<?php echo htmlspecialchars($suggested['product_img']); ?>" alt="<?php echo htmlspecialchars($suggested['product_name']); ?>">
                                <p class="product-name"><?php echo htmlspecialchars($suggested['product_name']); ?></p>
                                <p class="product-price"><?php echo number_format(htmlspecialchars($suggested['product_price_new'])); ?><sup>đ</sup></p>
                            </a>
                        </div>
                    <?php }
                } else { ?>
                    <p>Không có sản phẩm gợi ý.</p>
                <?php } ?>
            </div>
            <button class="carousel-btn right-btn" id="nextBtn">&#10095;</button>
        </div>
    </div>
</section>
<script>
document.addEventListener("DOMContentLoaded", function () {
    const carousel = document.querySelector(".carousel");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    prevBtn.addEventListener("click", function () {
        carousel.scrollBy({
            left: -200,
            behavior: "smooth",
        });
    });
    nextBtn.addEventListener("click", function () {
        carousel.scrollBy({
            left: 200, 
            behavior: "smooth",
        });
    });
});
    const bigImg = document.querySelector(".product-content-left-big-img img");
    const smallImg = document.querySelectorAll(".product-content-left-small-img img");
    smallImg.forEach(function(imgItem) {
        imgItem.addEventListener("click", function() {
            bigImg.src = imgItem.src;
        });
    });
</script>
<?php
if ($result_product) { $result_product->free(); }
if ($result_imgs) { $result_imgs->free(); }
$db->link->close();
require_once('footer.php');
?>