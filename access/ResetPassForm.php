<?php
require_once('header.php');
?>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Multi-Step Form</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<div class="bg-gray-100 flex flex-col min-h-screen">
  <?php require_once('header.php'); ?>

    <script>
        const submit_email = document.getElementById('submit_email');
        submit_email.addEventListener('click',()=>{
            
        });
    </script>


  <!-- Nội dung chính -->
  <main class="flex-grow flex items-center justify-center py-6">
    <div class="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
      <form id="form1" class="form-step">
        <h2 class="text-2xl font-bold text-center mb-6">Nhập Email</h2>
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700 mb-2">Email:</label>
          <input type="email" id="email" class="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3" required>
        </div>
        <button type="button" id="submit_email" onclick="nextForm(1)" class="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 focus:ring-4 focus:ring-blue-300">Xác nhận</button>
      </form>

      <form id="form2" class="form-step hidden">
        <h2 class="text-2xl font-bold text-center mb-6">Nhập mã xác nhận</h2>
        <div class="mb-4">
          <label for="code" class="block text-sm font-medium text-gray-700 mb-2">Mã xác nhận:</label>
          <input type="text" id="code" class="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3" required>
        </div>
        <button type="button" onclick="nextForm(2)" class="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 focus:ring-4 focus:ring-blue-300">Xác nhận</button>
      </form>

      <form id="form3" class="form-step hidden">
        <h2 class="text-2xl font-bold text-center mb-6">Đặt mật khẩu mới</h2>
        <div class="mb-4">
          <label for="new-password" class="block text-sm font-medium text-gray-700 mb-2">Mật khẩu mới:</label>
          <input type="password" id="new-password" class="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3" required>
        </div>
        <div class="mb-4">
          <label for="confirm-password" class="block text-sm font-medium text-gray-700 mb-2">Xác nhận mật khẩu:</label>
          <input type="password" id="confirm-password" class="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3" required>
        </div>
        <button type="submit" class="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 focus:ring-4 focus:ring-blue-300">Xác nhận</button>
      </form>
    </div>
  </main>
  <?php require_once('footer.php'); ?>
  <script>
    function nextForm(currentStep) {
      document.getElementById(`form${currentStep}`).classList.add('hidden');
      document.getElementById(`form${currentStep + 1}`).classList.remove('hidden');
    }
  </script>
</div>

