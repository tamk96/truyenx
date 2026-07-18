// sw.js

self.addEventListener('push', function(event) {
  const data = event.data.json(); // Nhận dữ liệu gửi từ server (nếu có)
  const title = data.title || 'Tin nhắn mới';
  const options = {
    body: data.body,
    icon: data.icon || 'https://www.audiovn.site/favicon.ico', // Thay bằng link icon của bạn
    badge: data.badge || '/badge-icon.png' // Icon nhỏ cho Android
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

// (Tùy chọn) Xử lý khi người dùng nhấn vào thông báo
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  // Mở lại cửa sổ chat hoặc focus vào nó nếu đã mở
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then(function(clientList) {
      for (var i = 0; i < clientList.length; i++) {
        var client = clientList[i];
        if (client.url == 'https://www.audiovn.site/p/phong-chat.html' && 'focus' in client) { // Thay '/' bằng URL của trang chat
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow('https://www.audiovn.site/p/phong-chat.html'); // Thay '/' bằng URL của trang chat
      }
    })
  );
});
