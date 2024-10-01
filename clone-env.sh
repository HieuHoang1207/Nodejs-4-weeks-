#!/bin/bash

# File .env.dev chứa các cấu hình mặc định
SOURCE_FILE=".env.dev"

# File .env sẽ được tạo từ .env.dev
TARGET_FILE=".env"

# Kiểm tra xem file .env.dev có tồn tại hay không
if [ ! -f "$SOURCE_FILE" ]; then
  echo "File $SOURCE_FILE không tồn tại. Hãy chắc chắn file cấu hình gốc tồn tại."
  exit 1
fi

# Clone nội dung từ .env.dev sang .env
cp "$SOURCE_FILE" "$TARGET_FILE"

# Thiết lập một số biến môi trường tùy chỉnh nếu cần
echo "NODE_ENV=development" >> "$TARGET_FILE"
echo "APP_NAME=MyApp" >> "$TARGET_FILE"

# Xuất thông báo hoàn thành
echo "Đã tạo file $TARGET_FILE với các cấu hình cần thiết!"
