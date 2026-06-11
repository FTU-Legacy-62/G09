# FinFolio - Portfolio Insight & Optimizer

## Mã nhóm

G09

## Thành viên

| Họ tên | Mã sinh viên | Vai trò chính |
|---|---|---|
| Phương | Chưa cập nhật | Product Planning + Input/Data Design |
| Ngọc | Chưa cập nhật | Financial Logic + Backend Calculation |
| Hưng | Chưa cập nhật | UI/UX Design + Dashboard Visualization Plan |
| An Thái | Chưa cập nhật | Frontend Core Pages |
| Hải | Chưa cập nhật | Backend/Frontend Integration + Charts + Simulation |

## Mô tả ngắn về sản phẩm

FinFolio là một web prototype hỗ trợ người dùng phân tích danh mục đầu tư cá nhân. Người dùng nhập mã tài sản, số lượng cổ phiếu, benchmark và khoảng thời gian phân tích; hệ thống tự lấy giá, quy đổi thành giá trị danh mục, tính tỷ trọng và xử lý dữ liệu giá lịch sử để tạo dashboard về lợi nhuận, rủi ro, tương quan, so sánh benchmark và mô phỏng thay đổi danh mục. Sản phẩm hướng tới mục tiêu học tập và chuẩn bị quyết định đầu tư, không phải nền tảng giao dịch thật. FinFolio không thực hiện mua/bán và không đưa ra khuyến nghị đầu tư được bảo đảm.

## Vấn đề sản phẩm giải quyết

Nhiều nhà đầu tư cá nhân chỉ nhìn từng cổ phiếu tăng hay giảm mà chưa hiểu chất lượng của toàn bộ danh mục. Khi phân tích thủ công, người dùng phải tự thu thập giá lịch sử, căn ngày giao dịch, tính lợi nhuận, độ biến động, drawdown, Sharpe Ratio, tương quan và so sánh benchmark. Quá trình này tốn thời gian, dễ sai công thức và khó trình bày thành dashboard dễ hiểu.

FinFolio giải quyết vấn đề này bằng cách gom quá trình phân tích danh mục vào một luồng web app: nhập danh mục, xử lý dữ liệu, tính toán chỉ số tài chính, hiển thị biểu đồ và mô phỏng thay đổi tỷ trọng.

## Người dùng mục tiêu

Người dùng chính của FinFolio là cá nhân đang theo dõi danh mục đầu tư, sinh viên tài chính và nhà đầu tư mới đến trung cấp. Họ dùng sản phẩm khi muốn xem danh mục hiện tại có tăng trưởng tốt không, rủi ro có quá cao không, tài sản có quá tương quan không, danh mục có tốt hơn benchmark không và việc thêm một cổ phiếu mới có thể làm kết quả lịch sử thay đổi như thế nào.

## Tính năng chính

- Nhập danh mục gồm ticker, số lượng cổ phiếu, benchmark, ngày bắt đầu và ngày kết thúc; hệ thống tự tính giá trị và tỷ trọng.
- Phân tích dashboard với các chỉ số như CAGR, Volatility, Sharpe Ratio, Sortino Ratio, Max Drawdown, VaR/CVaR, Beta, Alpha, Tracking Error, Information Ratio và Correlation.
- So sánh hiệu suất danh mục với benchmark qua đường lợi nhuận/tăng trưởng lịch sử.
- Hiển thị asset table, allocation chart và correlation matrix để hỗ trợ đánh giá diversification.
- Mô phỏng what-if khi thêm một ticker mới và so sánh danh mục hiện tại với danh mục sau mô phỏng.
- Tối ưu hóa tỷ trọng theo hai hướng: maximize Sharpe Ratio hoặc minimize Volatility trong phạm vi ràng buộc.
- Tạo phần giải thích bằng ngôn ngữ tự nhiên/AI-supported analysis để giúp người dùng hiểu kết quả, với nhãn rõ ràng rằng đây là historical analysis, không phải lời khuyên mua/bán.

## Cách mở hoặc chạy sản phẩm

Phần này dành cho cả người chưa có kinh nghiệm lập trình. Không cần mở file `index.html` trực tiếp bằng trình duyệt, vì app này cần chạy qua một server local.

### 1. Cài phần mềm cần thiết

Bạn chỉ cần cài 2 phần mềm:

1. Visual Studio Code
   - Tải tại: `https://code.visualstudio.com/`
   - Cài như phần mềm bình thường.

2. Node.js
   - Tải tại: `https://nodejs.org/`
   - Chọn bản `LTS` nếu trang web có nhiều lựa chọn.
   - Cài như phần mềm bình thường.

Sau khi cài Node.js, mở Terminal/Command Prompt và kiểm tra bằng 2 lệnh:

```bash
node -v
npm -v
```

Nếu cả hai lệnh đều hiện số phiên bản, ví dụ `v20.x.x` và `10.x.x`, nghĩa là đã cài thành công.

### 2. Tải source code từ GitHub

Nếu bạn biết dùng Git, có thể clone repo:

```bash
git clone https://github.com/FTU-Legacy-62/G09.git
cd G09
```

Nếu bạn chưa biết dùng Git, làm theo cách tải ZIP:

1. Mở link GitHub của repo.
2. Bấm nút `Code` màu xanh.
3. Chọn `Download ZIP`.
4. Giải nén file ZIP vừa tải.
5. Bạn sẽ có một thư mục chứa project, ví dụ `G09` hoặc `portfolio-insight-optimizer`.

### 3. Mở project trong Visual Studio Code

1. Mở Visual Studio Code.
2. Chọn `File` -> `Open Folder...`.
3. Chọn đúng thư mục project vừa tải/giải nén.
4. Bấm `Open`.

Sau khi mở đúng thư mục, bạn sẽ thấy các file như:

```text
package.json
server.ts
src/
README.md
```

### 4. Mở Terminal trong Visual Studio Code

Trong Visual Studio Code:

1. Chọn menu `Terminal`.
2. Chọn `New Terminal`.
3. Một khung terminal sẽ hiện ở phía dưới màn hình.

Tất cả các lệnh bên dưới đều nhập vào khung terminal này.

### 5. Cài thư viện cho project

Chạy lệnh:

```bash
npm install
```

Lệnh này có thể mất vài phút. Sau khi chạy xong, trong project sẽ có thêm thư mục `node_modules`.

Nếu thấy nhiều dòng chữ hiện ra trong terminal thì bình thường. Chỉ cần đợi terminal chạy xong và hiện lại dòng nhập lệnh.

### 6. Lấy Gemini API key từ Google AI Studio

API key là một đoạn mã bí mật để app gọi Gemini AI. Mỗi người chạy project nên dùng API key của riêng mình.

Làm theo các bước sau:

1. Mở trình duyệt và vào trang:

```text
https://aistudio.google.com/app/apikey
```

2. Đăng nhập bằng tài khoản Google của bạn.
3. Nếu Google hỏi điều khoản sử dụng, đọc và bấm đồng ý/continue để tiếp tục.
4. Bấm `Create API key`.
5. Nếu được hỏi chọn project, có thể chọn tạo key trong project mới hoặc project có sẵn.
6. Sau khi key được tạo, bấm copy để sao chép API key.

API key thường là một chuỗi ký tự dài. Ví dụ minh họa:

```text
AIzaSy...
```

Không chụp màn hình, không đăng API key lên GitHub, không gửi API key cho người khác.

### 7. Tạo file môi trường `.env.local`

Trong thư mục project, tạo file mới tên:

```text
.env.local
```

Nội dung file:

```env
GEMINI_API_KEY=your_gemini_api_key_here
APP_URL=http://localhost:3000
```

Thay `your_gemini_api_key_here` bằng Gemini API key của bạn.

Nếu bạn chưa có Gemini API key, app vẫn có thể chạy các phần phân tích danh mục chính. Phần AI analysis có thể không hoạt động cho đến khi bạn thêm key.

Lưu ý quan trọng:

- Không đăng file `.env.local` lên GitHub.
- Không gửi API key cho người khác.
- File `.gitignore` của project đã được cấu hình để bỏ qua `.env.local`.

### 8. Chạy web trên máy cá nhân

Chạy lệnh:

```bash
npm run dev
```

Nếu chạy thành công, terminal sẽ giữ trạng thái đang chạy server. Không tắt terminal này khi đang dùng app.

Sau đó mở trình duyệt Chrome, Edge, Safari hoặc Firefox và truy cập:

```text
http://localhost:3000
```

Nếu bạn thấy giao diện FinFolio, nghĩa là đã chạy thành công.

### 9. Cách tắt app

Quay lại terminal đang chạy app, bấm:

```text
Ctrl + C
```

Nếu terminal hỏi xác nhận, nhập `Y` rồi bấm Enter.

### 10. Lần sau muốn mở lại app

Bạn không cần chạy lại `npm install` nếu đã cài thư viện trước đó.

Chỉ cần:

1. Mở thư mục project bằng Visual Studio Code.
2. Mở Terminal.
3. Chạy:

```bash
npm run dev
```

4. Mở:

```text
http://localhost:3000
```

### Demo flow gợi ý

1. Mở trang Home để xem giới thiệu FinFolio.
2. Vào tab `Nhập danh mục`.
3. Dùng dữ liệu mẫu:
   - `FPT.VN`: 500 cổ phiếu
   - `HPG.VN`: 1000 cổ phiếu
   - Benchmark: `VNM`
   - Start date: `2023-05-12`
   - End date: ngày hiện tại hoặc ngày demo
4. Bấm `Phân tích ngay`.
5. Xem Dashboard: metric cards, performance chart, benchmark comparison, asset table và correlation matrix.
6. Vào tab `Mô phỏng tài sản`, thử thêm:
   - `MWG.VN`: 100 cổ phiếu
7. Xem tỷ trọng dự kiến mới của từng cổ phiếu trong danh mục sau khi thêm mã.
8. Vào tab `Tối ưu hóa tỷ trọng`, chọn mục tiêu tối ưu để xem tỷ trọng tối ưu lịch sử và bảng so sánh trước/sau.
9. Nếu đã cấu hình Gemini API key, xem thêm phần diễn giải AI.

### Lỗi thường gặp và cách xử lý

#### Lỗi: `npm` hoặc `node` không được nhận diện

Nguyên nhân thường là Node.js chưa được cài hoặc terminal chưa nhận được cài đặt mới.

Cách xử lý:

1. Cài lại Node.js bản LTS từ `https://nodejs.org/`.
2. Đóng Visual Studio Code.
3. Mở lại Visual Studio Code.
4. Mở Terminal mới và thử lại:

```bash
node -v
npm -v
```

#### Lỗi: không mở được `http://localhost:3000`

Kiểm tra:

1. Terminal chạy `npm run dev` còn đang mở không.
2. Có lỗi màu đỏ trong terminal không.
3. Bạn có nhập đúng địa chỉ `http://localhost:3000` không.

#### Lỗi: port 3000 đã được sử dụng

Nếu terminal báo port `3000` đang được dùng, hãy tắt terminal/app cũ bằng `Ctrl + C`, rồi chạy lại:

```bash
npm run dev
```

#### Lỗi liên quan Gemini API key

Kiểm tra file `.env.local` có đúng tên và đúng format chưa:

```env
GEMINI_API_KEY=your_real_key_here
APP_URL=http://localhost:3000
```

Sau khi sửa `.env.local`, tắt app bằng `Ctrl + C`, rồi chạy lại:

```bash
npm run dev
```

### Build và chạy bản production local

Phần này không bắt buộc cho demo thông thường. Chỉ dùng khi muốn kiểm tra bản build gần giống môi trường deploy.

```bash
npm run build
npm run start
```

## Deploy web lên Render

Render là nền tảng giúp đưa web lên Internet để người khác có thể mở bằng link công khai. Với project này, hãy deploy bằng loại `Web Service`, không dùng `Static Site`, vì app có backend Express trong file `server.ts`.

### 1. Chuẩn bị trước khi deploy

Trước khi lên Render, cần đảm bảo:

1. Code đã được đưa lên GitHub.
2. File `.env.local` không được commit lên GitHub.
3. Bạn đã có Gemini API key nếu muốn dùng phần AI analysis.
4. Project chạy được ở máy bằng:

```bash
npm run dev
```

### 2. Tạo tài khoản Render

1. Vào trang:

```text
https://render.com/
```

2. Bấm `Get Started` hoặc `Sign Up`.
3. Đăng nhập bằng GitHub để Render có thể đọc repo của bạn.
4. Nếu Render hỏi quyền truy cập GitHub, cho phép Render truy cập repo chứa project.

### 3. Tạo Web Service mới

Trong Render Dashboard:

1. Bấm `New`.
2. Chọn `Web Service`.
3. Chọn repo GitHub của project.
4. Bấm `Connect`.

Nếu không thấy repo:

- Kiểm tra repo đã được push lên GitHub chưa.
- Kiểm tra bạn đã cấp quyền cho Render đọc repo đó chưa.

### 4. Cấu hình service

Điền các thông tin như sau:

```text
Name: finfolio hoặc tên bạn muốn
Language: Node
Branch: main
Root Directory: để trống nếu package.json nằm ở thư mục gốc
Build Command: npm install && npm run build
Start Command: npm run start
```

Chọn plan phù hợp. Nếu chỉ demo, có thể chọn gói free nếu Render còn cung cấp cho tài khoản của bạn.

### 5. Thêm Environment Variables trên Render

Không upload file `.env.local` lên Render. Thay vào đó, nhập biến môi trường trực tiếp trong Render.

Trong màn hình tạo service hoặc sau khi tạo service:

1. Vào mục `Environment`.
2. Bấm `Add Environment Variable`.
3. Thêm các biến sau:

```text
GEMINI_API_KEY = API key Gemini của bạn
NODE_ENV = production
```

Sau lần deploy đầu tiên, Render sẽ tạo cho bạn một link dạng:

```text
https://ten-service-cua-ban.onrender.com
```

Nếu muốn, bạn có thể quay lại `Environment` và thêm:

```text
APP_URL = https://ten-service-cua-ban.onrender.com
```

Sau khi thêm hoặc sửa biến môi trường, chọn `Save, rebuild, and deploy`.

### 6. Deploy

Sau khi điền xong cấu hình:

1. Bấm `Create Web Service`.
2. Render sẽ tự chạy build.
3. Chờ đến khi trạng thái chuyển thành `Live`.
4. Mở link `.onrender.com` mà Render cung cấp.

Nếu deploy thành công, bạn sẽ thấy giao diện FinFolio.

### 7. Cập nhật web sau khi sửa code

Sau này nếu bạn sửa code:

1. Commit code.
2. Push lên GitHub.
3. Render sẽ tự deploy lại nếu `Auto Deploy` đang bật.

Nếu Render không tự deploy:

1. Vào service trên Render.
2. Bấm `Manual Deploy`.
3. Chọn `Deploy latest commit`.

### 8. Lỗi thường gặp khi deploy Render

#### Lỗi build fail

Kiểm tra lại `Build Command`:

```text
npm install && npm run build
```

Nếu build vẫn lỗi, mở tab `Logs` trên Render để xem dòng lỗi màu đỏ.

#### Lỗi app deploy xong nhưng không mở được

Kiểm tra lại `Start Command`:

```text
npm run start
```

Project này đã được cấu hình để đọc port từ `process.env.PORT`, nên Render có thể tự cấp port khi chạy.

#### Lỗi AI analysis không hoạt động

Kiểm tra trong Render `Environment` đã có biến:

```text
GEMINI_API_KEY
```

Không để dấu ngoặc kép quanh key. Ví dụ đúng:

```text
GEMINI_API_KEY = AIzaSy...
```

Sau khi sửa key, bấm `Save, rebuild, and deploy`.

#### Lỗi dữ liệu chứng khoán không tải được

App dùng nguồn dữ liệu bên ngoài như Yahoo Finance. Nếu một mã không có dữ liệu hoặc nguồn bên ngoài tạm lỗi, hãy thử:

- Kiểm tra lại ticker.
- Dùng ticker có hậu tố `.VN`, ví dụ `FPT.VN`, `HPG.VN`, `MWG.VN`.
- Thử lại sau vài phút.

## Link demo nếu có

- Link demo: Chưa cập nhật.
- Tài khoản demo nếu có: Không cần tài khoản demo.

## Ghi chú về dữ liệu nếu có

Sản phẩm sử dụng dữ liệu giá lịch sử công khai qua các nguồn API như Yahoo Finance hoặc nguồn thị trường tương đương trong phạm vi demo. Với mã chứng khoán Việt Nam, nhóm có chuẩn hóa ticker bằng hậu tố như `.VN` và có định hướng chuẩn bị CSV/dataset mẫu để tránh lỗi khi API không trả đủ dữ liệu. Dữ liệu dùng cho demo chỉ phục vụ phân tích lịch sử, không phải dữ liệu riêng tư của người dùng và không dùng để đảm bảo kết quả tương lai.

Không đưa API key, mật khẩu, token, dữ liệu cá nhân hoặc dữ liệu riêng tư lên GitHub. Nếu cần chạy AI analysis, tạo `.env.local` ở máy local và giữ file này ngoài repo.

## Ghi chú thêm

- Repo chính thức của nhóm: `https://github.com/FTU-Legacy-62/G09`.
- Sản phẩm chính là web app/prototype trong repo, không phải slide thuyết trình.
- File `GROUP_FOOTPRINT.md` giải thích chi tiết hơn về vấn đề, input, logic xử lý, user flow, output, lựa chọn thiết kế, hạn chế và bài học của nhóm.
- File `INDIVIDUAL_FOOTPRINT.md` cần ghi rõ đóng góp riêng của từng thành viên và bằng chứng liên quan.
