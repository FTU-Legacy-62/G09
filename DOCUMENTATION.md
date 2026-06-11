# TÀI LIỆU DỰ ÁN FINFOLIO

## 1. Tổng quan dự án
**FinFolio** là một ứng dụng web chuyên sâu về phân tích, đánh giá và tối ưu hóa danh mục đầu tư cá nhân. Ứng dụng cho phép người dùng nhập danh mục cổ phiếu hiện tại, so sánh với các chỉ số thị trường (VN-Index), và thực hiện các mô phỏng "What-if" để tối ưu hóa tỷ trọng dựa trên các mục tiêu tài chính cụ thể.

## 2. Phân công nhiệm vụ (Workflow Team)
Dựa trên kế hoạch phát triển, dự án được chia thành các vai trò cốt lõi như sau:

| Thành viên | Vai trò chính | Nhiệm vụ chi tiết | Sản phẩm bàn giao |
| :--- | :--- | :--- | :--- |
| **Phương** | Product + Data/API | Xác định vấn đề, đối tượng người dùng, MVP; chuẩn bị cấu trúc dữ liệu đầu vào; thu thập dữ liệu qua API hoặc CSV mẫu. | Product brief, kế hoạch dữ liệu, bộ dữ liệu chuẩn. |
| **Ngọc** | Financial Logic + Backend | Xây dựng logic tính toán lợi nhuận (Return), độ biến động (Volatility), Sharpe Ratio, Drawdown và ma trận tương quan. | Module tính toán tài chính, công thức và kết quả xử lý. |
| **Hưng** | UI/UX Design | Thiết kế Wireframe, Layout website, Dashboard và các thành phần trực quan hóa dữ liệu (biểu đồ/bảng). | Mockup UI, thiết kế luồng người dùng (User Flow). |
| **An Thái** | Frontend Core | Lập trình các trang chính: Trang chủ (Home), Form nhập liệu danh mục, khung Dashboard. | Giao diện cơ bản, form nhập liệu, khung ứng dụng. |
| **Hải** | Integration + Simulation | Lập trình biểu đồ PnL, ma trận tương quan; kết nối Frontend với Backend; xây dựng tính năng so sánh "What-if". | Thành phần biểu đồ, bảng kết quả mô phỏng, bản mẫu tích hợp hoàn thiện. |

## 3. Quy trình phát triển & Prompting (AI-Assisted Workflow)
Ứng dụng được xây dựng thông qua quy trình tương tác với AI (Prompt Engineering) theo các bước:

### Giai đoạn 1: Khởi tạo & Cấu trúc (An Thái & Phương)
*   **Prompt mẫu:** "Xây dựng khung ứng dụng React với Tailwind CSS, bao gồm Sidebar điều hướng và các trang: Home, Nhập danh mục, Phân tích Dashboard."
*   **Kết quả:** Hệ thống giao diện cơ bản với định dạng chuẩn, hỗ trợ Responsive.

### Giai đoạn 2: Xây dựng Core Logic (Ngọc & Hưng)
*   **Prompt mẫu:** "Viết module tính toán tài chính bằng TypeScript: CAGR, Standard Deviation (Volatility), Sharpe Ratio và ma trận tương quan cho danh mục chứng khoán."
*   **Kỹ thuật:** Sử dụng các thư viện toán học và xử lý dữ liệu để đảm bảo độ chính xác của các chỉ số tài chính.

### Giai đoạn 3: Tích hợp & Mô phỏng (Hải)
*   **Prompt mẫu:** "Thêm tính năng mô phỏng: Người dùng có thể thử thêm một mã cổ phiếu mới và so sánh PnL của danh mục trước và sau khi thêm mã đó trên cùng một biểu đồ."
*   **Cải tiến:** Sử dụng `Recharts` để vẽ biểu đồ so sánh đa tầng (Area Layer).

### Giai đoạn 4: Tối ưu hóa & Nâng cấp Hiệu năng (Phản hồi mới nhất)
*   **Vấn đề:** Thời gian tải và xử lý dữ liệu lâu do gọi API tuần tự; thiếu biểu hiện trực quan so sánh hiệu suất trước và sau tối ưu hóa. Lỗi kết nối timeout khi lấy chỉ số VN-Index trực tiếp từ VNDIRECT trong môi trường sandbox Cloud Run.
*   **Dịch vụ API Cấu trúc (Đa nguồn dự phòng):** 
    *   Tích hợp thêm **API Entrade** (Cung cấp đồ thị TradingView thời gian thực, ổn định và cực kỳ nhanh chóng).
    *   Giới hạn thời gian kết nối (strict timeout 3000ms) khi gọi **API VNDIRECT** để tránh hiện tượng nghẽn ứng dụng nếu server VNDIRECT chặn IP từ Google Cloud Run.
    *   Tự động bổ sung dự phòng **Yahoo Finance (`^VNINDEX`)** làm lớp bảo vệ thứ 3 trước khi sử dụng proxy dự phòng `VNM`.
*   **Tối ưu hiệu năng:** Song song hóa toàn bộ luồng tải thông tin lịch sử của nhóm mã cổ phiếu thông qua `Promise.all` thay cho vòng lặp tuần tự. Giúp giảm thiểu thời gian chờ xuống gấp nhiều lần (tương đương với thời gian của một yêu cầu đơn lẻ lâu nhất).
*   **Giao diện & Tính năng:** 
    *   Bổ sung biểu đồ **So sánh hiệu suất PnL (Tối ưu hóa)** sử dụng Recharts (AreaChart đa tầng) giúp trực hóa tổng quan lợi ích giữa Danh mục hiện tại và Danh mục sau tối ưu.
    *   Nâng cấp bảng phân bổ tỷ trọng thành **Chi tiết thay đổi tỷ trọng**: so sánh cụ thể tỷ trọng ban đầu, tỷ trọng tối ưu mới và mức chênh lệch đạt được từng mã.

## 4. Các tính năng chính đã hoàn thiện
1.  **Dashboard Phân tích:** Hiển thị CAGR, Volatility, Sharpe Ratio và Max Drawdown.
2.  **Ma trận tương quan:** Giúp người dùng đánh giá mức độ đa dạng hóa của danh mục.
3.  **Tối ưu hóa danh mục nâng cao:** Hai chế độ (Tối đa Sharpe hoặc Tối thiểu Volatility) kèm theo **Biểu đồ so sánh trước/sau tối ưu** và **Bảng cấu trúc thay đổi tỷ trọng**.
4.  **Mô phỏng "What-if":** So sánh trực quan hiệu suất khi thay đổi cấu trúc danh mục. Đã cải tiến giao diện hiển thị chú thích trực quan và nhãn chú giải biểu đồ từ `"Mô phỏng (MÃ_CP)"` chung chung thành `"Danh mục sau khi thêm mã (MÃ_CP)"` rõ ràng, giúp người dùng dễ hiểu bản chất mô phỏng hơn.
5.  **Phân tích AI:** Tích hợp Gemini API để đưa ra nhận xét chuyên sâu về danh mục của người dùng.

---
*Tài liệu này được soạn thảo để giải trình chi tiết quy trình thực hiện dự án cho giáo viên và khách hàng.*
