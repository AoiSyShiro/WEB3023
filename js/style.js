$(document).ready(function () {
  // Tương tác menu: Dùng .on() để gắn sự kiện cho phần tử động
  $(document).on("click", "#logo", function () {
    $(".sidebar").toggleClass("open");

    if ($(".sidebar").hasClass("open")) {
      $(".menu-separator").hide();
    } else {
      $(".menu-separator").show();
    }
  });

  // Hiển thị trang dashboard
  $(document).on("click", "#show-dashboard", function (e) {
    e.preventDefault();

    $("#loading").show(); // Hiển thị ảnh GIF tải

    $("#content-area").slideUp(200, function () {
      $(this).empty(); // Xóa nội dung cũ trong #content-area
      $(this).load("/dashboard.html", function () {
        $(this)
          .hide()
          .slideDown(300, function () {
            checkIfAllLoaded(); // Kiểm tra xem tất cả đã được tải
          });

        rebindSidebarEvents(); // Gán lại sự kiện cho sidebar
      });
    });

    $(".sidebar-links li a").removeClass("active");
    $(this).addClass("active");
  });

  // Hiển thị trang lịch sử đặt vé
  $(document).on("click", "#show-booking-history", function (e) {
    e.preventDefault();
    $("#loading").show(); // Hiển thị ảnh GIF tải

    $("#content-area").slideUp(200, function () {
      $(this).empty(); // Xóa nội dung cũ trong #content-area
      $(this).load("/booking_history.html", function () {
        $(this)
          .hide()
          .slideDown(300, function () {
            checkIfAllLoaded(); // Kiểm tra xem tất cả đã được tải
          });

        rebindSidebarEvents(); // Gán lại sự kiện cho sidebar
      });
    });

    $(".sidebar-links li a").removeClass("active");
    $(this).addClass("active");
  });

  // Hiển thị trang thông báo
  $(document).on("click", "#show-notifications", function (e) {
    e.preventDefault();
    $("#loading").show(); // Hiển thị ảnh GIF tải
    $("#content-area").slideUp(200, function () {
      $(this).empty(); // Xóa nội dung cũ trong #content-area
      $(this).load("/notification.html", function () {
        $(this)
          .hide()
          .slideDown(300, function () {
            checkIfAllLoaded(); // Kiểm tra xem tất cả đã được tải
          });

        rebindSidebarEvents(); // Gán lại sự kiện cho sidebar
      });
    });

    $(".sidebar-links li a").removeClass("active");
    $(this).addClass("active");
  });

  // Hàm để gán lại sự kiện cho menu sau khi tải trang mới
  function rebindSidebarEvents() {
    $(document).on("click", "#logo", function () {
      $(".sidebar").toggleClass("open");

      if ($(".sidebar").hasClass("open")) {
        $(".menu-separator").hide();
      } else {
        $(".menu-separator").show();
      }
    });
  }

  // Hàm kiểm tra xem tất cả tài nguyên đã được tải chưa
  function checkIfAllLoaded() {
    // Sử dụng setTimeout để kiểm tra việc tải CSS
    setTimeout(function () {
      $("#loading").hide(); // Ẩn ảnh GIF sau khi kiểm tra
    }, 100); // Bạn có thể thay đổi thời gian này nếu cần
  }

  // Hàm để cập nhật phần trăm tải trang
  function updateLoadingPercent() {
    let percent = 0;
    const interval = setInterval(function () {
      percent += 10; // Tăng 10% mỗi lần
      $("#loading-percent").text(percent + "%"); // Cập nhật phần trăm hiển thị
      if (percent >= 100) {
        clearInterval(interval); // Dừng khi đã đạt 100%
        checkIfAllLoaded(); // Kiểm tra tải xong
      }
    }, 500); // Thay đổi thời gian để điều chỉnh tốc độ tải
  }

  // Gọi hàm cập nhật phần trăm khi trang bắt đầu tải
  updateLoadingPercent();
});

//Trạng thái Color
$(document).ready(function () {
  $(".booking-history-table tbody tr").each(function () {
    // Lấy nội dung của cột trạng thái
    const status = $(this).find("td:last").text().trim();

    // Áp dụng màu nền dựa trên trạng thái
    if (status === "Đã Xác Nhận") {
      $(this).css("background-color", "#d4edda"); // Xanh nhạt
    } else if (status === "Chờ Thanh Toán") {
      $(this).css("background-color", "#fff3cd"); // Vàng nhạt
    } else if (status === "Đã Hủy") {
      $(this).css("background-color", "#f8d7da"); // Đỏ nhạt
    }
  });
});

$(document).ready(function () {
  // Hàm tạo số ngẫu nhiên trong khoảng [min, max]
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Hàm tạo dữ liệu ngẫu nhiên thỏa mãn điều kiện
  function generateRandomBookingData() {
    const totalTickets = getRandomInt(30, 100); // Tổng vé đặt từ 30 đến 100
    const canceledTickets = getRandomInt(0, Math.floor(totalTickets * 0.2)); // Vé hủy tối đa 20% tổng vé
    const confirmedTickets = totalTickets - canceledTickets; // Vé đã xác nhận = Tổng vé - Vé hủy
    const revenue = confirmedTickets * getRandomInt(50000, 200000); // Doanh thu = Vé xác nhận * giá vé (50k-200k)

    return { totalTickets, canceledTickets, confirmedTickets, revenue };
  }

  // Hàm để cập nhật dữ liệu vào các thẻ Lịch Sử Vé
  function updateBookingData(data) {
    $("#total-tickets").text(data.totalTickets); // Cập nhật số vé đã đặt
    $("#canceled-tickets").text(data.canceledTickets); // Cập nhật số vé đã hủy
    $("#revenue").text(
      new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(data.revenue)
    ); // Cập nhật doanh thu với định dạng VND
    $("#confirmed-tickets").text(data.confirmedTickets); // Cập nhật số vé đã xác nhận
  }

  // Sinh dữ liệu ngẫu nhiên và cập nhật ngay khi trang tải
  const bookingData = generateRandomBookingData();
  updateBookingData(bookingData);
});

$(document).ready(function () {
  // Hàm tạo số ngẫu nhiên trong khoảng [min, max]
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Hàm tạo dữ liệu ngẫu nhiên cho các thẻ thanh toán
  function generateRandomPaymentData() {
    const ticketPrice = getRandomInt(100000, 200000); // Giá vé từ 100k đến 200k
    const comboPrice = getRandomInt(200000, 500000); // Combo từ 200k đến 500k
    const bookingFee = getRandomInt(100000, 300000); // Phí đặt chỗ từ 100k đến 300k
    const totalPayment = ticketPrice + comboPrice + bookingFee; // Tổng thanh toán

    return {
      ticketPrice,
      comboPrice,
      bookingFee,
      totalPayment,
    };
  }

  // Hàm để cập nhật dữ liệu vào các thẻ Danh Thu
  function updatePaymentData(data) {
    $("#total-payment").text(
      new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(data.totalPayment)
    ); // Cập nhật tổng thanh toán
    $("#combo-price").text(
      new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(data.comboPrice)
    ); // Cập nhật giá combo
    $("#booking-fee").text(
      new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(data.bookingFee)
    ); // Cập nhật phí đặt chỗ
    $("#ticket-price").text(
      new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(data.ticketPrice)
    ); // Cập nhật giá vé
  }

  // Sinh dữ liệu ngẫu nhiên và cập nhật ngay khi trang tải
  const paymentData = generateRandomPaymentData();
  updatePaymentData(paymentData);
});


$(document).ready(function () {
  // Đánh dấu tất cả thông báo là đã đọc
  $("#mark_all").click(function () {
    $(".unread").removeClass("unread");
    $("#notifes").text('0'); // Cập nhật số lượng thông báo
  });
});


$(document).ready(function () {
  // Đánh dấu tất cả thông báo là đã đọc
  $("#mark_all").click(function () {
      $(".unread").removeClass("unread");
      $("#notifes").text('0'); // Cập nhật số lượng thông báo
  });
});