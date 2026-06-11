# Individual Footprint

## Thành viên 3: Phạm Minh Phương - 2312380027
|***Thông tin***|***Nội dung***|
| :- | :- |
|*Họ tên*|*Phạm Minh Phương*|
|*Mã sinh viên*|*2312380027*|
|*Dự án*|*FinFolio - Portfolio Insight & Optimizer*|
|*Môn học*|*Technology Applications in Finance and Banking - NHA408E*|
|Nhóm|Group 9|

### **Vai trò trong dự án**

***Bạn phụ trách vai trò gì trong dự án?***

Trong dự án FinFolio - Portfolio Insight & Optimizer, em phụ trách phần product planning, product proposition, customer journey, input schema, benchmark/data direction và một phần optimization flow.

Ở giai đoạn đầu, em tham gia xác định vấn đề chính của người dùng: nhiều nhà đầu tư cá nhân có danh mục cổ phiếu nhưng chưa biết cách đánh giá danh mục ở cấp độ tổng thể. Họ thường chỉ nhìn từng mã tăng/giảm, nhưng chưa biết danh mục có sinh lời tốt không, rủi ro có cao không, có tốt hơn thị trường không và nếu thay đổi tỷ trọng thì kết quả có cải thiện không.

Từ vấn đề đó, em định hình FinFolio là một công cụ web hỗ trợ phân tích danh mục dựa trên dữ liệu lịch sử, không phải nền tảng giao dịch và không đưa ra khuyến nghị mua/bán trực tiếp. Sản phẩm tập trung vào return, risk, benchmark comparison, diversification, simulation và optimization.

Em cũng xây dựng PRD, MVP scope, customer journey và input schema gồm ticker, số lượng cổ phiếu, benchmark, khoảng thời gian phân tích và risk-free rate. Ở bản cuối, tỷ trọng danh mục được hệ thống tự tính từ số lượng cổ phiếu và giá hiện tại. Ngoài ra, em tham gia định hình optimization flow, trong đó người dùng có thể chọn Maximize Sharpe Ratio hoặc Minimize Volatility, sau đó hệ thống trả về optimized weights, optimized metrics và re-analysis.

### **Dấu ấn cá nhân trong sản phẩm**

***Phần nào trong sản phẩm thể hiện rõ đóng góp của bạn nhất?***

Dấu ấn cá nhân rõ nhất của em nằm ở phần định hình sản phẩm từ đầu và thiết kế luồng input → analysis → simulation/optimization.

Ban đầu, ý tưởng website quản lý danh mục còn khá rộng. Em tham gia thu hẹp sản phẩm thành một portfolio analysis prototype, giúp người dùng hiểu danh mục thông qua dữ liệu lịch sử và các chỉ số tài chính có thể giải thích được.

Một dấu ấn khác là phần input schema và benchmark selection. Người dùng chỉ nhìn thấy một form nhập liệu, nhưng form này quyết định toàn bộ dữ liệu mà hệ thống dùng để tính toán phía sau. Vì vậy, em tập trung xác định người dùng cần nhập gì, điều kiện hợp lệ là gì, benchmark nào phù hợp và dữ liệu cần chuẩn bị theo hướng nào.

### **Những việc đã thực sự làm**

**3.1. Xác định problem statement và target user**

Em tham gia xác định vấn đề cốt lõi của FinFolio: nhà đầu tư cá nhân khó tự đánh giá danh mục ở cấp portfolio. Họ cần biết danh mục có hiệu quả không, rủi ro nằm ở đâu, có vượt benchmark không và thay đổi phân bổ có tạo khác biệt gì không.

Target user được xác định gồm individual investors, finance students và beginner-to-intermediate investors.

**3.2. Định hình product proposition**

Em tham gia định hình FinFolio là một web prototype giúp người dùng phân tích danh mục đầu tư dựa trên dữ liệu lịch sử. Sản phẩm không kết nối tài khoản chứng khoán, không đặt lệnh và không đưa ra khuyến nghị mua/bán tuyệt đối.

Product proposition của FinFolio là decision-support và finance-learning: giúp người dùng hiểu danh mục tốt hơn trước khi tự đưa ra quyết định phân bổ.

**3.3. Xây dựng PRD và MVP scope**

Em tham gia xây dựng PRD gồm product goal, use case, user flow, required input, expected output và success criteria cho prototype.

Trong MVP, em xác định sản phẩm cần có: portfolio input form, validation cho dữ liệu đầu vào, data direction qua API hoặc CSV fallback, dashboard metrics, benchmark comparison, correlation matrix, simulation/optimization và disclaimer rằng kết quả chỉ là historical analysis.

Em cũng xác định các phần chưa đưa vào MVP như real trading, brokerage connection, user account system, tax/fee/slippage modeling và forecasting model.

**3.4. Thiết kế customer journey**

Em định hình customer journey chính của FinFolio theo luồng:

> Home → Portfolio Input → Analyze → Dashboard → Evaluation → Simulation → Optimization → Re-analysis

Luồng này giúp sản phẩm có logic rõ ràng: người dùng nhập danh mục, xem phân tích, đọc đánh giá, thử thay đổi danh mục và so sánh lại kết quả sau simulation hoặc optimization.

**3.5. Thiết kế input schema và validation rules**

Em thiết kế các input chính gồm:

- Ticker list: danh sách mã tài sản.
- Shares: số lượng cổ phiếu/tài sản từng mã; hệ thống dùng giá hiện tại để suy ra tỷ trọng danh mục.
- Benchmark: chỉ số hoặc tài sản tham chiếu.
- Start date và end date: khoảng thời gian phân tích.
- Risk-free rate: dùng cho các chỉ số risk-adjusted return.
- Optimization inputs: mục tiêu tối ưu và giới hạn tỷ trọng min/max.

Các validation rules gồm: ticker không được để trống, số lượng cổ phiếu phải hợp lệ, benchmark hợp lệ, date range đủ dài và risk-free rate có default value. Tỷ trọng được hệ thống tính lại từ giá trị vị thế, nên người dùng không cần tự nhập tổng tỷ trọng bằng 100%.

**3.6. Định hướng benchmark và data source**

Em xác định benchmark là input quan trọng vì FinFolio cần so sánh danh mục với thị trường tham chiếu. Ví dụ, danh mục cổ phiếu Việt Nam có thể so với VN-Index hoặc VN30; danh mục cổ phiếu Mỹ có thể so với S&P 500 hoặc Nasdaq 100; danh mục crypto có thể so với Bitcoin hoặc custom benchmark.

Về data source, em đề xuất hướng linh hoạt: dùng API để lấy dữ liệu lịch sử, nhưng cần có CSV fallback hoặc demo dataset để đảm bảo sản phẩm vẫn demo được nếu API không ổn định.

**3.7. Tham gia xây dựng optimization flow**

Em tham gia định hình optimization flow cùng Hải. Người dùng có thể chọn Maximize Sharpe Ratio hoặc Minimize Volatility.

Optimization cần có constraints như tổng tỷ trọng bằng 100%, không có tỷ trọng âm, tỷ trọng từng mã nằm trong min/max do người dùng đặt. Output gồm optimized weights, optimized metrics và phần re-analysis để người dùng so sánh danh mục trước và sau tối ưu hóa.

### **File, tính năng, dữ liệu, logic, giao diện, tài liệu hoặc phần demo đã đóng góp**

Các phần cụ thể có thể đối chiếu trong source package, proposal/pitch deck, progress review và demo:

|***Hạng mục***|***Phần đã đóng góp***|***Cách kiểm tra***|
| --- | --- | --- |
| Problem statement và target user | Xác định vấn đề người dùng cá nhân khó đánh giá danh mục ở cấp portfolio. | Đối chiếu trong PRD, progress review và phần giới thiệu sản phẩm. |
| Product proposition | Định hình FinFolio là công cụ historical analysis/decision-support, không phải nền tảng giao dịch hay khuyến nghị mua bán. | Đối chiếu trong proposal, README và disclaimer của sản phẩm. |
| PRD và MVP boundary | Xác định product goal, use case, input/output, success criteria và các phần không đưa vào MVP. | Đối chiếu trong tài liệu PRD/progress review. |
| Customer journey | Luồng Home -> Portfolio Input -> Analyze -> Dashboard -> Evaluation -> Simulation -> Optimization -> Re-analysis. | Đối chiếu trong demo app và pitch deck. |
| Input schema | Ticker, số lượng cổ phiếu, benchmark, start/end date, risk-free rate và optimization inputs. | Đối chiếu trong `frontend/src/components/PortfolioForm.tsx` và `frontend/src/types.ts`. |
| Validation rules | Ticker không trống, số lượng hợp lệ, benchmark hợp lệ, date range đủ dài và risk-free rate có default. | Đối chiếu bằng cách chạy form nhập danh mục trong demo app. |
| Benchmark/data direction | Đề xuất benchmark phù hợp và hướng API/CSV fallback để giảm rủi ro dữ liệu. | Đối chiếu trong progress review và meeting minutes. |
| Optimization flow | Objective, constraints, optimized weights, optimized metrics và re-analysis. | Đối chiếu trong tab Optimization và phần mô tả workflow. |

### **Bằng chứng đóng góp**

***Bằng chứng chính:*** `FinFolio_7_Week_Meeting_Minutes.docx`. Meeting minutes là evidence quan trọng nhất vì ghi rõ nhiệm vụ, output, deadline và trạng thái của từng thành viên theo từng tuần.

|***Tuần***|***Ghi trong meeting minutes***|***Output được ghi nhận***|***Vì sao chứng minh đóng góp cá nhân***|
| --- | --- | --- | --- |
| Tuần 1 | Phương tham gia xác định vấn đề, target user và hướng sản phẩm FinFolio. | Problem statement + target user note. | Chứng minh Phương tham gia từ giai đoạn định nghĩa bài toán sản phẩm. |
| Tuần 2 | Phương xây dựng product proposition, MVP scope và customer journey sơ bộ. | PRD/MVP outline + customer journey. | Là cơ sở để nhóm thu hẹp ý tưởng thành prototype phân tích danh mục. |
| Tuần 3 | Phương chốt input schema, benchmark direction và validation rules cùng frontend/backend. | Input schema + validation checklist. | Đây là phần quyết định dữ liệu người dùng nhập và dữ liệu backend cần xử lý. |
| Tuần 4 | Phương rà soát progress review, product brief và luồng demo input -> dashboard. | Nội dung product/MVP cho review. | Chứng minh phần product planning được chuyển thành tài liệu nộp giữa kỳ. |
| Tuần 5 | Sau feedback demo, Phương hỗ trợ làm rõ wording historical analysis, simulation và not investment advice. | Điều chỉnh scope/wording sau feedback. | Giúp sản phẩm tránh bị hiểu nhầm là khuyến nghị đầu tư. |
| Tuần 6 | Phương phối hợp với Hải/Ngọc ở optimization flow và re-analysis. | Optimization objective + constraints + output description. | Kết nối product requirement với logic tối ưu hóa và màn hình cuối. |
| Tuần 7 | Phương hoàn thiện talk track product, MVP scope và phần giải thích luồng người dùng. | Final demo/product explanation. | Chứng minh đóng góp ở giai đoạn hoàn thiện sản phẩm cuối kỳ. |

***Bằng chứng phụ có thể kiểm tra:***

- Meeting minutes 7 tuần ghi rõ Phương phụ trách Product Planning & Input Design, PRD, input schema, validation rules và MVP boundary.
- Progress Review giữa kỳ ghi Phương phụ trách product brief, problem/user/MVP scope, input structure, benchmark/data-source plan và sample API/CSV direction.
- Workflow/prompt map của nhóm, trong đó Prompt 01, Prompt 02, Prompt 03 và Prompt 10 thuộc phần Phương.
- Phần workflow ghi Phương phối hợp với Hải ở optimization và re-analysis.
- Product brief, PRD, input schema, validation checklist, benchmark/data-source plan và slide/talk track phần problem, target user, MVP scope.

### **Phần đóng góp đó kết nối thế nào với sản phẩm cuối cùng**

Phần đóng góp của em kết nối trực tiếp với sản phẩm cuối cùng vì FinFolio cần một định hướng sản phẩm rõ ràng trước khi triển khai công thức, giao diện và backend.

Cụ thể, phần việc của em giúp xác định FinFolio giải quyết vấn đề gì, phục vụ ai, MVP gồm những gì, frontend cần form nhập liệu nào, backend cần nhận những field nào và financial logic cần dữ liệu đầu vào ra sao.

Đặc biệt, input schema là điểm nối giữa người dùng và financial engine. Nếu input không rõ, toàn bộ phần tính toán và dashboard phía sau sẽ khó chạy đúng và khó giải thích.

### **Điều cá nhân học được**

Qua phần việc của mình, em học được rằng một sản phẩm công nghệ tài chính không nên bắt đầu từ việc “có thể tính được gì”, mà nên bắt đầu từ câu hỏi “người dùng cần ra quyết định gì”.

Em cũng học được cách chuyển một vấn đề tài chính thành product requirement. Ví dụ, câu hỏi “danh mục có tốt không?” cần được chuyển thành input cụ thể như ticker, shares, benchmark, time frame và risk-free rate; sau đó mới chuyển thành metrics và dashboard output.

Ngoài ra, em hiểu hơn tầm quan trọng của input schema. Trong tài chính, nếu input sai hoặc thiếu validation, kết quả phía sau có thể sai hoàn toàn.

### **Khó khăn đã gặp và cách xử lý**

|***Khó khăn đã gặp***|***Cách xử lý***|
| --- | --- |
| Scope sản phẩm ban đầu khá rộng. | Em cùng nhóm xác định MVP boundary rõ hơn, tập trung vào input form, historical analysis, dashboard metrics, benchmark comparison, simulation/optimization và disclaimer. |
| Cần phân biệt sản phẩm phân tích với sản phẩm khuyến nghị đầu tư. | Các phần như optimization và AI explanation dễ bị hiểu nhầm là lời khuyên đầu tư, nên nhóm thống nhất dùng wording như historical analysis, simulation, decision-support và not investment advice. |
| Benchmark và data source không ổn định cho mọi danh mục. | Đề xuất benchmark options theo loại tài sản và chuẩn bị CSV/demo dataset fallback. |

### **Lời nhắn cho sinh viên khóa sau**

Nếu khóa sau tiếp tục phát triển FinFolio, nên bắt đầu từ việc xác định rõ người dùng và quyết định tài chính mà sản phẩm muốn hỗ trợ, trước khi thêm tính năng mới. Với sản phẩm tài chính, công thức đúng là cần thiết, nhưng product scope, input design, benchmark phù hợp và cách diễn giải kết quả cũng quan trọng không kém. Đặc biệt, với optimization hoặc AI explanation, cần luôn ghi rõ đây là phân tích dựa trên dữ liệu lịch sử, không phải khuyến nghị đầu tư chắc chắn.
