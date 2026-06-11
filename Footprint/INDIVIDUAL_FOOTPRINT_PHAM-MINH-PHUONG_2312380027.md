# INDIVIDUAL REPORT

**Thành viên:** Phạm Minh Phương
**MSV:** 2312380027

---

## 1. Vai trò trong dự án

Trong dự án FinFolio - Portfolio Insight & Optimizer, em phụ trách phần product planning, product proposition, customer journey, input schema, benchmark/data direction và một phần optimization flow.

Ở giai đoạn đầu, em tham gia xác định vấn đề chính của người dùng: nhiều nhà đầu tư cá nhân có danh mục cổ phiếu nhưng chưa biết cách đánh giá danh mục ở cấp độ tổng thể. Họ thường chỉ nhìn từng mã tăng/giảm, nhưng chưa biết danh mục có sinh lời tốt không, rủi ro có cao không, có tốt hơn thị trường không và nếu thay đổi tỷ trọng thì kết quả có cải thiện không.

Từ vấn đề đó, em định hình FinFolio là một công cụ web hỗ trợ phân tích danh mục dựa trên dữ liệu lịch sử, không phải nền tảng giao dịch và không đưa ra khuyến nghị mua/bán trực tiếp. Sản phẩm tập trung vào return, risk, benchmark comparison, diversification, simulation và optimization.

Em cũng xây dựng PRD, MVP scope, customer journey và input schema gồm ticker, tỷ trọng, benchmark, khoảng thời gian phân tích và risk-free rate. Ngoài ra, em tham gia định hình optimization flow, trong đó người dùng có thể chọn Maximize Sharpe Ratio hoặc Minimize Volatility, sau đó hệ thống trả về optimized weights, optimized metrics và re-analysis.

## 2. Dấu ấn cá nhân trong sản phẩm

Dấu ấn cá nhân rõ nhất của em nằm ở phần định hình sản phẩm từ đầu và thiết kế luồng input → analysis → simulation/optimization.

Ban đầu, ý tưởng website quản lý danh mục còn khá rộng. Em tham gia thu hẹp sản phẩm thành một portfolio analysis prototype, giúp người dùng hiểu danh mục thông qua dữ liệu lịch sử và các chỉ số tài chính có thể giải thích được.

Một dấu ấn khác là phần input schema và benchmark selection. Người dùng chỉ nhìn thấy một form nhập liệu, nhưng form này quyết định toàn bộ dữ liệu mà hệ thống dùng để tính toán phía sau. Vì vậy, em tập trung xác định người dùng cần nhập gì, điều kiện hợp lệ là gì, benchmark nào phù hợp và dữ liệu cần chuẩn bị theo hướng nào.

## 3. Những việc đã thực sự làm

### 3.1. Xác định problem statement và target user

Em tham gia xác định vấn đề cốt lõi của FinFolio: nhà đầu tư cá nhân khó tự đánh giá danh mục ở cấp portfolio. Họ cần biết danh mục có hiệu quả không, rủi ro nằm ở đâu, có vượt benchmark không và thay đổi phân bổ có tạo khác biệt gì không.

Target user được xác định gồm individual investors, finance students và beginner-to-intermediate investors.

### 3.2. Định hình product proposition

Em tham gia định hình FinFolio là một web prototype giúp người dùng phân tích danh mục đầu tư dựa trên dữ liệu lịch sử. Sản phẩm không kết nối tài khoản chứng khoán, không đặt lệnh và không đưa ra khuyến nghị mua/bán tuyệt đối.

Product proposition của FinFolio là decision-support và finance-learning: giúp người dùng hiểu danh mục tốt hơn trước khi tự đưa ra quyết định phân bổ.

### 3.3. Xây dựng PRD và MVP scope

Em tham gia xây dựng PRD gồm product goal, use case, user flow, required input, expected output và success criteria cho prototype.

Trong MVP, em xác định sản phẩm cần có: portfolio input form, validation cho dữ liệu đầu vào, data direction qua API hoặc CSV fallback, dashboard metrics, benchmark comparison, correlation matrix, simulation/optimization và disclaimer rằng kết quả chỉ là historical analysis.

Em cũng xác định các phần chưa đưa vào MVP như real trading, brokerage connection, user account system, tax/fee/slippage modeling và forecasting model.

### 3.4. Thiết kế customer journey

Em định hình customer journey chính của FinFolio theo luồng:

> Home → Portfolio Input → Analyze → Dashboard → Evaluation → Simulation → Optimization → Re-analysis

Luồng này giúp sản phẩm có logic rõ ràng: người dùng nhập danh mục, xem phân tích, đọc đánh giá, thử thay đổi danh mục và so sánh lại kết quả sau simulation hoặc optimization.

### 3.5. Thiết kế input schema và validation rules

Em thiết kế các input chính gồm:

- Ticker list: danh sách mã tài sản.
- Portfolio weights: tỷ trọng từng mã.
- Benchmark: chỉ số hoặc tài sản tham chiếu.
- Start date và end date: khoảng thời gian phân tích.
- Risk-free rate: dùng cho các chỉ số risk-adjusted return.
- Optimization inputs: mục tiêu tối ưu và giới hạn tỷ trọng min/max.

Các validation rules gồm: ticker không được để trống, tỷ trọng phải hợp lệ, tổng tỷ trọng bằng 100%, benchmark hợp lệ, date range đủ dài và risk-free rate có default value.

### 3.6. Định hướng benchmark và data source

Em xác định benchmark là input quan trọng vì FinFolio cần so sánh danh mục với thị trường tham chiếu. Ví dụ, danh mục cổ phiếu Việt Nam có thể so với VN-Index hoặc VN30; danh mục cổ phiếu Mỹ có thể so với S&P 500 hoặc Nasdaq 100; danh mục crypto có thể so với Bitcoin hoặc custom benchmark.

Về data source, em đề xuất hướng linh hoạt: dùng API để lấy dữ liệu lịch sử, nhưng cần có CSV fallback hoặc demo dataset để đảm bảo sản phẩm vẫn demo được nếu API không ổn định.

### 3.7. Tham gia xây dựng optimization flow

Em tham gia định hình optimization flow cùng Hải. Người dùng có thể chọn Maximize Sharpe Ratio hoặc Minimize Volatility.

Optimization cần có constraints như tổng tỷ trọng bằng 100%, không có tỷ trọng âm, tỷ trọng từng mã nằm trong min/max do người dùng đặt. Output gồm optimized weights, optimized metrics và phần re-analysis để người dùng so sánh danh mục trước và sau tối ưu hóa.

## 4. File, tính năng, logic, dữ liệu hoặc tài liệu đã đóng góp

Các phần em đã đóng góp gồm:

- Problem statement và target user.
- Product proposition của FinFolio.
- PRD và MVP boundary.
- Customer journey.
- Input schema: ticker, weight, benchmark, start/end date, risk-free rate.
- Validation rules.
- Benchmark options và data direction.
- Optimization flow: objective, constraints, optimized weights, optimized metrics và re-analysis.
- Nội dung product/MVP phục vụ progress review và demo cuối kỳ.

## 5. Bằng chứng đóng góp

Các bằng chứng có thể kiểm tra gồm:

- Meeting minutes 7 tuần ghi rõ Phương phụ trách Product Planning & Input Design, PRD, input schema, validation rules và MVP boundary.
- Progress Review giữa kỳ ghi Phương phụ trách product brief, problem/user/MVP scope, input structure, benchmark/data-source plan và sample API/CSV direction.
- Workflow/prompt map của nhóm, trong đó Prompt 01, Prompt 02, Prompt 03 và Promt 10 thuộc phần Phương.
- Phần workflow ghi Phương phối hợp với Hải ở optimization và re-analysis.
- Product brief, PRD, input schema, validation checklist, benchmark/data-source plan và slide/talk track phần problem, target user, MVP scope.

## 6. Phần đóng góp đó kết nối thế nào với sản phẩm cuối cùng

Phần đóng góp của em kết nối trực tiếp với sản phẩm cuối cùng vì FinFolio cần một định hướng sản phẩm rõ ràng trước khi triển khai công thức, giao diện và backend.

Cụ thể, phần việc của em giúp xác định FinFolio giải quyết vấn đề gì, phục vụ ai, MVP gồm những gì, frontend cần form nhập liệu nào, backend cần nhận những field nào và financial logic cần dữ liệu đầu vào ra sao.

Đặc biệt, input schema là điểm nối giữa người dùng và financial engine. Nếu input không rõ, toàn bộ phần tính toán và dashboard phía sau sẽ khó chạy đúng và khó giải thích.

## 7. Điều cá nhân học được

Qua phần việc của mình, em học được rằng một sản phẩm công nghệ tài chính không nên bắt đầu từ việc “có thể tính được gì”, mà nên bắt đầu từ câu hỏi “người dùng cần ra quyết định gì”.

Em cũng học được cách chuyển một vấn đề tài chính thành product requirement. Ví dụ, câu hỏi “danh mục có tốt không?” cần được chuyển thành input cụ thể như ticker, weight, benchmark, time frame và risk-free rate; sau đó mới chuyển thành metrics và dashboard output.

Ngoài ra, em hiểu hơn tầm quan trọng của input schema. Trong tài chính, nếu input sai hoặc thiếu validation, kết quả phía sau có thể sai hoàn toàn.

## 8. Khó khăn đã gặp và cách xử lý

Khó khăn đầu tiên là scope sản phẩm ban đầu khá rộng. Để xử lý, em cùng nhóm xác định MVP boundary rõ hơn, tập trung vào input form, historical analysis, dashboard metrics, benchmark comparison, simulation/optimization và disclaimer.

Khó khăn thứ hai là phân biệt sản phẩm phân tích với sản phẩm khuyến nghị đầu tư. Các phần như optimization và AI explanation dễ bị hiểu nhầm là lời khuyên đầu tư, nên nhóm thống nhất dùng wording như historical analysis, simulation, decision-support và not investment advice.

Khó khăn thứ ba là benchmark và data source. Không phải danh mục nào cũng nên so với cùng một benchmark, và API dữ liệu có thể không ổn định. Cách xử lý là đề xuất benchmark options theo loại tài sản và chuẩn bị CSV/demo dataset fallback.

## 9. Lời nhắn cho sinh viên khóa sau

Nếu khóa sau tiếp tục phát triển FinFolio, nên bắt đầu từ việc xác định rõ người dùng và quyết định tài chính mà sản phẩm muốn hỗ trợ, trước khi thêm tính năng mới. Với sản phẩm tài chính, công thức đúng là cần thiết, nhưng product scope, input design, benchmark phù hợp và cách diễn giải kết quả cũng quan trọng không kém. Đặc biệt, với optimization hoặc AI explanation, cần luôn ghi rõ đây là phân tích dựa trên dữ liệu lịch sử, không phải khuyến nghị đầu tư chắc chắn.
