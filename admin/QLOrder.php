<?php include "slider.php"; ?>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Order Management</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 min-h-screen p-6">
  <div class="container mx-auto">
    <h1 class="text-2xl font-bold mb-4 text-gray-800">Order Management</h1>
    <div class="overflow-x-auto">
      <table class="table-auto w-full bg-white shadow-md rounded-lg border border-gray-200">
        <thead>
          <tr class="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
            <th class="py-3 px-6 text-left">Email</th>
            <th class="py-3 px-6 text-left">Phone</th>
            <th class="py-3 px-6 text-left">Order Code</th>
            <th class="py-3 px-6 text-left">Price</th>
            <th class="py-3 px-6 text-left">Payment Method</th>
            <th class="py-3 px-6 text-left">Payment Status</th>
            <th class="py-3 px-6 text-left">Delivery</th>
            <th class="py-3 px-6 text-left">Quantity</th>
            <th class="py-3 px-6 text-left">Product ID</th>
            <th class="py-3 px-6 text-left">Created At</th>
            <th class="py-3 px-6 text-left">Order Status</th>
          </tr>
        </thead>
        <tbody class="text-gray-700 text-sm">
          <!-- Sample Row -->
          <tr class="border-b border-gray-200 hover:bg-gray-100">
            <td class="py-3 px-6 text-left">example@example.com</td>
            <td class="py-3 px-6 text-left">123-456-7890</td>
            <td class="py-3 px-6 text-left">ORD12345</td>
            <td class="py-3 px-6 text-left">$100.00</td>
            <td class="py-3 px-6 text-left">Credit Card</td>
            <td class="py-3 px-6 text-left text-green-500">Paid</td>
            <td class="py-3 px-6 text-left">In Transit</td>
            <td class="py-3 px-6 text-left">2</td>
            <td class="py-3 px-6 text-left">PROD001</td>
            <td class="py-3 px-6 text-left">2023-12-10</td>
            <td class="py-3 px-6 text-left text-blue-500">Processing</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</body>

<?php
if($paymentStatus == 'Da thanh toan' ? 'green' : 'red')


?>

