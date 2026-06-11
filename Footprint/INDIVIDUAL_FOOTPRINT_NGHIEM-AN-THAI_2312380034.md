# Individual Footprint

## Thành viên 5: Nghiêm An Thái - 2312380034
|***Thông tin***|***Nội dung***|
| :- | :- |
|*Họ tên*|*Nghiêm An Thái*|
|*Mã sinh viên*|*2312380034*|
|*Dự án*|*FinFolio - Portfolio Insight & Optimizer*|
|*Môn học*|*Technology Applications in Finance and Banking - NHA408E*|
|Nhóm|Group 9|

### **Vai trò trong dự án**

***Bạn phụ trách vai trò gì trong dự án?***

Vai trò của tôi là Frontend Core Pages, người xây dựng toàn bộ các màn hình mà người dùng thực sự nhìn thấy và tương tác, bao gồm trang giới thiệu, form nhập danh mục, layout dashboard, và các trang phân tích mở rộng (Đánh giá, Mô phỏng, Tối ưu hóa). Vai trò này kết nối người dùng với sản phẩm của tất cả các thành viên còn lại trong nhóm.

***Vị trí trong workflow nhóm***

| **Thành viên** | **Vai trò**               | **Input cho tôi**                       | **Output của tôi**                               | **Flow**  |
| -------------- | ------------------------- | --------------------------------------- | ------------------------------------------------ | --------- |
| Minh Phương    | Product + Data            | User story, quy tắc input, phạm vi MVP  | Form hoạt động đúng theo yêu cầu của Phương      | → tôi     |
| Minh Ngọc      | Logic tài chính + Backend | Cấu trúc API response, các field chỉ số | Màn hình hiển thị đúng các field đó              | → tôi     |
| Thai Hưng      | UI/UX Design              | Wireframe, layout, visual hierarchy     | Các trang tuân theo thiết kế của Hưng            | → tôi     |
| **An Thái**    | **Frontend Core Pages**   | -                                       | Form nhập + layout dashboard                     | tôi →     |
| Thanh Hải      | Charts + Integration      | -                                       | Dashboard UI + data cho chart components của Hải | tôi → Hải |

### **Dấu ấn cá nhân trong sản phẩm**

***Phần nào trong sản phẩm thể hiện rõ đóng góp của bạn nhất?***

Phần thể hiện rõ đóng góp của tôi nhất là trang nhập danh mục (Portfolio Input) và layout dashboard. Form nhập là cổng vào của toàn bộ sản phẩm, mọi phân tích, biểu đồ và nhận xét AI trong FinFolio đều bắt đầu từ việc người dùng điền đúng form này. Dashboard là nơi chuyển 12 chỉ số tài chính do Ngọc xử lý thành một trang có thể đọc và điều hướng được. Tôi cũng xây dựng trang chủ, sidebar và các trang Đánh giá danh mục, Mô phỏng tài sản, Tối ưu hóa tỷ trọng.

### **Những việc đã thực sự làm**

**4.1 Thống nhất cấu trúc dữ liệu chung (Tuần 3)**

Trước khi xây dựng bất kỳ trang nào, tôi đã làm việc với Ngọc và Hải để thống nhất cấu trúc dữ liệu luân chuyển giữa form, backend và giao diện hiển thị. Điều này được ghi lại dưới dạng type definitions chung (types.ts) và phản ánh trong API schema do Hải thiết kế. Bước này chủ yếu là lập kế hoạch, gồm thống nhất tên field, kiểu dữ liệu và validation rules để integration tuần 4 không phải sửa nhiều lần.

**4.2 Trang nhập danh mục (Tuần 3-4, hoàn thiện Tuần 5-6)**

- Xây dựng form nhập danh mục theo input schema của Phương và wireframe của Hưng.
- Tự động tính tỷ trọng từ số lượng cổ phiếu và giá hiện tại: khi thêm hoặc xóa mã, tổng giá trị danh mục và tỷ trọng từng mã được cập nhật lại để tổng luôn bằng 100%.
- Validation 3 lớp (ticker trống, số lượng cổ phiếu không hợp lệ, thiếu benchmark) với thông báo lỗi.
- Dropdown benchmark với các lựa chọn chính (VN-Index/VNM proxy, S&P 500/SPY, MSCI Emerging Markets/EEM) và tùy chọn nhập ticker tùy chỉnh bổ sung sau feedback Tuần 5.
- Sửa validation và responsive layout theo sprint Tuần 5 sau feedback Demo 1.

**4.3 Layout Dashboard (Tuần 4, Tuần 6)**

- Sắp xếp 12 metric cards theo 3 hàng, đặt 4 chỉ số quan trọng nhất (Return, CAGR, Volatility, Sharpe) ở Hàng 1, thứ tự ưu tiên được thống nhất với Hưng sau feedback Demo 1.
- Mỗi card hiển thị: giá trị, màu sắc từ logic đánh giá của Ngọc, so sánh với benchmark, và tooltip giải thích chỉ số.
- Guard state cho tab chưa có dữ liệu: điều hướng sang Dashboard, Đánh giá, Mô phỏng, Tối ưu hóa khi chưa submit form sẽ hiện prompt thay vì trang trống.
- Chỉnh sửa, hoàn thiện giao diện chart labels, tooltip và visual hierarchy theo UI revision plan của Hưng vào tuần 6.

**4.4 Navigation và các trang còn lại (Tuần 3-4)**

- 6-tab sidebar giữ nguyên dữ liệu qua các tab, và chấm nhấp nháy trên tab Input khi đã có dữ liệu.
- Trang Home với 4 feature cards và nút bắt đầu.
- Layout trang Đánh giá danh mục: panel nhận xét AI (có loading state 'Đang phân tích AI…') + evaluation cards với viền màu.
- Trang Mô phỏng và Tối ưu hóa: so sánh chỉ số trước/sau với nhãn 'Tốt hơn / Kém hơn'.

**4.5 Code cleanup và final build (Tuần 6-7)**

- Dọn dẹp state handling và lỗi navigation.
- Gỡ bỏ 3 lựa chọn VN30, Nasdaq và Bitcoin khỏi thanh chọn benchmark, sau khi thảo luận thì chốt với team 3 lựa chọn benchmark là VN-Index, S&P 500 và MSCI Thị trường mới nổi.
- Thêm khung gợi ý chọn benchmark và chỉ dẫn cách điền mã cho users.
- Chạy build test và kiểm tra toàn bộ user flow trước khi nộp.

### **File, tính năng, dữ liệu, logic, giao diện, tài liệu hoặc phần demo đã đóng góp**

Các phần cụ thể có thể đối chiếu trong source package, proposal/pitch deck, progress review và demo:

|***Hạng mục***|***Phần đã đóng góp***|***Cách kiểm tra***|
| ------------------------------- | -------------------------------------------------------------------------- | ---------------------------- |
| **Cấu trúc dữ liệu chung**      | Thống nhất type definitions với Ngọc và Hải trước khi build                | Backend + charts             |
| **Trang Home**                  | Landing page với 4 feature cards và nút bắt đầu                            | Điểm vào của người dùng      |
| **Trang nhập danh mục**         | Form nhập số lượng cổ phiếu, tự tính tỷ trọng, validation 3 lớp, benchmark selector, date range | Người dùng → luồng phân tích |
| **Layout Dashboard**            | 12 metric cards theo 3 hàng ưu tiên, guard state, tooltips                 | Backend output → hiển thị    |
| **Sidebar navigation**          | 6-tab nav, active state, pulsing indicator, session persistence            | Kết nối 6 trang              |
| **Trang Đánh giá**              | Panel nhận xét AI + evaluation cards với loading state async               | AI + evaluation labels       |
| **Trang Mô phỏng + Tối ưu hóa** | So sánh chỉ số trước/sau với nhãn màu tốt hơn/kém hơn                      | Backend output → hiển thị    |
| **Code cleanup + build test**   | Sửa bug Tuần 6-7, dọn state/nav, kiểm tra npm run build                    | Sẵn sàng demo cuối           |

### **Bằng chứng đóng góp**

***Bằng chứng chính:*** `FinFolio_7_Week_Meeting_Minutes.docx`. Meeting minutes là evidence quan trọng nhất vì ghi rõ nhiệm vụ, output, deadline và trạng thái của từng thành viên theo từng tuần.

|***Tuần***|***Ghi trong meeting minutes***|***Output được ghi nhận***|***Vì sao chứng minh đóng góp cá nhân***|
| --- | --- | --- | --- |
| Tuần 1 | An Thái khảo sát khả năng dựng prototype web và luồng cơ bản. | Ghi chú feasibility prototype. | Chứng minh An Thái tham gia từ bước xác định hướng frontend. |
| Tuần 2 | An Thái tìm công cụ AI web builder và xác định cấu trúc prototype nhiều trang. | Cấu trúc prototype đa trang. | Là tiền đề cho Home/Input/Dashboard/Evaluation/Simulation/Optimization. |
| Tuần 3 | An Thái dựng prototype UI ban đầu: Home, Portfolio Input, Dashboard, Evaluation, Simulation, Optimization. | Prototype UI nhiều trang. | Đây là evidence trực tiếp cho vai trò Frontend Core Pages. |
| Tuần 4 | An Thái chuẩn bị demo frontend với Home, Input, Dashboard, validation/loading/error states. | Integrated frontend review. | Chứng minh phần frontend đã đi vào luồng demo giữa kỳ. |
| Tuần 5 | An Thái sửa form validation, loading/error states, responsive layout và navigation theo feedback Demo 1. | Patched frontend sau feedback. | Chứng minh An Thái chuyển feedback thành chỉnh sửa cụ thể. |
| Tuần 6 | An Thái dọn route/navigation, state handling, build test và fix lỗi form/loading. | Cleaned frontend + build test. | Giúp app ổn định hơn trước final demo. |
| Tuần 7 | An Thái sửa lỗi và hoàn thiện web. | Final frontend pages. | Chứng minh đóng góp ở giai đoạn hoàn thiện sản phẩm cuối kỳ. |

***Bằng chứng phụ có thể kiểm tra:***

***Kiểm tra prototype:***

- Thêm mã cổ phiếu và khối lượng → giá trị danh mục và tỷ trọng được tự tính lại theo giá hiện tại, tổng tỷ trọng vẫn là 100%.
- Vào Dashboard khi chưa submit → xuất hiện prompt guard thay vì trang trống.
- Chuyển tab sau khi nhập dữ liệu → dữ liệu từ form vẫn được giữ nguyên.
- Hover vào icon info trên metric card → tooltip giải thích chỉ số xuất hiện.
- Mở trang Đánh giá khi AI chưa xong → badge 'Đang phân tích AI…' hiện rõ.

***File nguồn:***

| **Tên file**                         | Mô tả          |
| ------------------------------------ | -------------------------------------------------------------------------------- |
| **frontend/src/types.ts**                     | Cấu trúc dữ liệu chung. Đã thống nhất với Ngọc trước khi bắt đầu build.          |
| **frontend/src/components/PortfolioForm.tsx** | Trang nhập danh mục: validation, tự tính tỷ trọng từ số lượng cổ phiếu, benchmark selector. |
| **frontend/src/components/MetricCard.tsx**    | Card chỉ số tái sử dụng với màu trạng thái, badge và tooltip.                    |
| **frontend/src/App.tsx**                      | File chính: 6 page layouts, navigation, global state, API call, tích hợp AI.     |

### **Phần đóng góp đó kết nối thế nào với sản phẩm cuối cùng**

Nếu không có trang nhập danh mục, không người dùng nào có thể bắt đầu phân tích, trang này là điểm đầu vào duy nhất cho mọi dữ liệu chạy qua phần còn lại của sản phẩm. Nếu không có layout dashboard, 12 chỉ số Ngọc tính sẽ không có nơi hiển thị. Guard state đảm bảo app không bao giờ hiện trang trắng. Sidebar navigation cho phép người dùng di chuyển giữa 6 phần mà không mất dữ liệu. Mọi kết quả tài chính, biểu đồ và nhận xét AI hiển thị trong demo cuối đều đi qua và hiển thị ở các trang tôi đã xây dựng.

### **Điều cá nhân học được**

**8.1 Hiển thị dữ liệu và truyền thông tin là hai việc khác nhau**

Dashboard phiên bản đầu hiển thị 12 chỉ số ở cùng mức độ nổi bật. Sau feedback Demo 1, tôi đã cải thiện giao diện bằng cách đặt các chỉ số Return, CAGR, Volatility, Sharpe lên hàng đầu tiên.

**8.2 AI-assisted development vẫn đòi hỏi phán đoán ở từng bước**

AI tạo ra web rất nhanh, nhưng phần lớn công sức nằm ở phần đánh giá output: Form có khớp schema của Phương không? Layout có theo wireframe của Hưng không? Giao diện có hoạt động với cấu trúc dữ liệu Ngọc định nghĩa không? Vòng review và re-prompting tốn thời gian hơn cả bước generation.

**8.3 Thống nhất cấu trúc dữ liệu trước khi xây dựng bất kỳ màn hình nào**

Handoff với chart components của Hải suôn sẻ nhất vì thống nhất data format từ Tuần 3. Phần khó nhất là trang Đánh giá phiên bản đầu khi tên field label của Ngọc khác với kỳ vọng của tôi - khiến màu trạng thái không áp dụng được. Sau đó nhóm thói quen review output mới của backend cùng nhau trước khi bắt đầu build display layer.

### **Khó khăn đã gặp và cách xử lý**

|***Khó khăn đã gặp***|***Cách xử lý***|
| --- | --- |
| Tính lại tỷ trọng từ số lượng cổ phiếu ban đầu xảy ra nhiều lỗi. | Sửa luồng nhập sang số lượng cổ phiếu, lấy giá hiện tại để tự tính tỷ trọng và thêm ghi chú giải thích rằng tỷ trọng được hệ thống cập nhật lại. |
| Dashboard cảm giác quá tải sau feedback Demo 1. | Sắp xếp lại metric rows theo mức độ ưu tiên, thêm tooltip và thống nhất hierarchy với UI revision plan của Hưng. |
| Trang Đánh giá trông bị lỗi khi đang chờ AI. | Thêm badge 'Đang phân tích AI…' cho trạng thái loading thay vì để trang trống. |

### **Lời nhắn cho sinh viên khóa sau**

- Thống nhất tên field API response với teammate backend trước khi build bất kỳ màn hình hiển thị nào. Một buổi họp 1 tiếng ở Tuần 3 để thống nhất có thể tiết kiệm nhiều thời gian khi chuyển qua các bước tiếp theo.
- Test với người ngoài nhóm. Teammate sẽ biết sản phẩm hoạt động thế nào nên cần người lạ trải nghiệm để tìm ra vấn đề tồn đọng.
- Khi dùng AI để tạo UI, hãy mô tả trải nghiệm bạn muốn thay vì mô tả công nghệ. 'Người dùng thấy giá trị danh mục và tỷ trọng cập nhật ngay khi nhập số lượng cổ phiếu' hiệu quả hơn 'dùng useState với onChange'
- Giữ log ngắn về những gì bạn đã prompt.
