# Dự Án Web Employees Expense Management

Chào mừng bạn đến với dự án Web Employees Expense Management! Dưới đây là cấu trúc thư mục của dự án cùng với các mô tả chi tiết về từng thư mục:

## Cấu trúc Thư mục

employees_expense_management

├── public/               # Các tài nguyên tĩnh (hình ảnh, fonts, v.v.) sẽ được phục vụ trực tiếp

├── src/                  # Thư mục chứa toàn bộ mã nguồn chính của dự án

│   ├── api/              # Các API routes cho server-side logic

│   ├── app/              # # Các trang chính của ứng dụng, tuân theo cấu trúc routing của Next.js

│   ├── components/       # Các React components dùng chung

│   ├── hooks/            # Các custom hooks

│   ├── layouts/          # Các layout dùng chung cho các page

│   ├── lib/              # Các thư viện hoặc utilities dùng chung

│   ├── services/         # Các service functions để kết nối với backend (API, GraphQL)

│   ├── store/            # Quản lý trạng thái (Redux, Zustand, hoặc Context API)

│   ├── types/            # Định nghĩa TypeScript types hoặc interfaces

│   ├── utils/            # Các hàm tiện ích khác, không thuộc thư viện chính

│   └── views/            # Các thành phần giao diện lớn, kết hợp các components nhỏ

├── .env.local            # Các biến môi trường cho cấu hình local

├── next.config.js        # Cấu hình của Next.js

├── tsconfig.json         # Cấu hình TypeScript

├── package.json          # Các dependency của dự án

└── README.md             # Tài liệu dự án


## Giải thích chi tiết

- **`public/`**: Chứa các tài nguyên tĩnh như hình ảnh, fonts, và các tệp khác có thể được phục vụ trực tiếp từ máy chủ. Bất kỳ tệp nào nằm trong thư mục này đều có thể được truy cập qua đường dẫn gốc của ứng dụng.

- **`src/`**: Thư mục chính chứa toàn bộ mã nguồn của dự án.
  - **`api/`**: Chứa các route API cho logic server-side, cho phép chúng ta xử lý các yêu cầu HTTP từ client, ví dụ như đăng nhập, lấy dữ liệu sản phẩm.
  - **`app/`**: Chứa các trang của ứng dụng (ví dụ: Trang chính, Trang sản phẩm). Mỗi thư mục con trong thư mục này tương ứng với một trang trong ứng dụng, tuân theo quy tắc routing của Next.js.
  - **`components/`**: Các thành phần React dùng chung (ví dụ: button, form, modal) có thể được sử dụng lại trên nhiều trang khác nhau.
  - **`hooks/`**: Chứa các custom hooks để tái sử dụng logic giữa các components (ví dụ: useFetch để lấy dữ liệu từ API).
  - **`layouts/`**: Các layout dùng chung cho các trang (ví dụ: header, footer), giúp duy trì tính nhất quán trong thiết kế.
  - **`lib/`**: Chứa các thư viện hoặc utility functions (ví dụ: định dạng ngày giờ, mã hóa) mà nhiều phần khác của ứng dụng có thể sử dụng.
  - **`services/`**: Các hàm chức năng để kết nối với backend (ví dụ: API REST hoặc GraphQL) và xử lý dữ liệu nhận về.
  - **`store/`**: Quản lý trạng thái ứng dụng (ví dụ: trạng thái đăng nhập, giỏ hàng), có thể sử dụng Redux, Zustand hoặc Context API tùy theo nhu cầu.
  - **`types/`**: Định nghĩa các kiểu hoặc interface của TypeScript (ví dụ: kiểu dữ liệu cho sản phẩm, người dùng), giúp đảm bảo tính chính xác trong mã nguồn.
  - **`utils/`**: Các hàm tiện ích khác (ví dụ: hàm chuyển đổi đơn vị, lọc dữ liệu) không thuộc thư viện chính nhưng cần thiết cho các hoạt động hàng ngày trong ứng dụng.
  - **`views/`**: Các thành phần giao diện lớn (ví dụ: Trang sản phẩm, Trang giỏ hàng), kết hợp từ các components nhỏ để tạo thành giao diện hoàn chỉnh.

- **`.env.local`**: Chứa các biến môi trường cho cấu hình local, cho phép chúng ta giữ thông tin nhạy cảm ngoài mã nguồn (ví dụ: mật khẩu API, chuỗi kết nối cơ sở dữ liệu).

- **`next.config.js`**: Tệp cấu hình của Next.js, nơi chúng ta có thể tùy chỉnh các thiết lập của ứng dụng như cấu hình các plugin hoặc định nghĩa các biến môi trường.

- **`tsconfig.json`**: Tệp cấu hình TypeScript, định nghĩa cách thức biên dịch mã TypeScript sang JavaScript, bao gồm các quy tắc và cài đặt cho TypeScript.

- **`package.json`**: Chứa danh sách các dependency của dự án (ví dụ: React, Next.js) cùng với các scripts để chạy ứng dụng (ví dụ: khởi động ứng dụng, chạy kiểm tra).

- **`README.md`**: Tài liệu mô tả dự án, cung cấp thông tin cần thiết cho người dùng và các nhà phát triển khác, bao gồm cách cài đặt, cấu hình và chạy ứng dụng.

## Cách chạy dự án

Để chạy dự án:

1. **Cài đặt các dependency**:  
   ```bash
   npm install

2. **Chạy ứng dụng**:  
   ```bash
   npm run dev

Dự án sẽ chạy tại http://localhost:3002.