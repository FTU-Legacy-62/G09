# FINFOLIO

## Meeting Minutes: 7 Tuần Thực Hiện Dự Án

**Project:** FinFolio - Portfolio Insight & Optimizer  
**Môn học:** Technology Applications in Finance and Banking, NHA408E  
**Group members:** Phương, Ngọc, Hưng, An Thái, Hải

| **Nội dung**      | **Mô tả**                                                                                                                   |
|-------------------|-----------------------------------------------------------------------------------------------------------------------------|
| Mục đích tài liệu | Ghi lại 7 biên bản họp theo tuần để thể hiện quá trình phát triển dự án và nhiệm vụ được phân công cho từng thành viên.     |
| Căn cứ xây dựng   | Workflow công việc nhóm, project proposal/pitch deck, progress review nộp cuối tuần 4 và source package của dự án FinFolio. |
| Ghi chú thời gian | Tài liệu ghi theo Tuần 1-Tuần 7 vì chưa có ngày họp cụ thể; có thể thay bằng ngày thực tế nếu giảng viên yêu cầu.           |

## Document map

| **\#** | **Phần**                    | **Mục đích**                                                                                   |
|--------|-----------------------------|------------------------------------------------------------------------------------------------|
| 1      | Tóm tắt phân công theo tuần | Ma trận ngắn để giảng viên thấy từng thành viên làm gì ở mỗi tuần.                             |
| 2      | Meeting Minutes Tuần 1-7    | Biên bản đầy đủ gồm mục tiêu, agenda, thảo luận, quyết định, task table, rủi ro và next focus. |
| 3      | Phụ lục                     | Workflow evidence và bảng role-output cuối cùng.                                               |

## 1. Tóm tắt phân công nhiệm vụ theo 7 tuần

Bảng này giúp nhìn nhanh trách nhiệm của từng thành viên theo từng tuần. Các biên bản chi tiết nằm ở phần 2.

| **Tuần** | **Trọng tâm**                              | **Phương**                                                                                                        | **Ngọc**                                                                                                              | **Hưng**                                                                                    | **An Thái**                                                                                        | **Hải**                                                                                                               |
|----------|--------------------------------------------|-------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------|
| Tuần 1   | Xác định user pain point                   | Dẫn dắt nghiên cứu vấn đề, phác thảo nhóm người dùng cá nhân/finance students và pain point portfolio-level risk. | Liệt kê các quyết định tài chính người dùng cần hỗ trợ; xác định cần metric return, risk, diversification, benchmark. | Ghi nhận khó khăn UX của người mới: không hiểu số liệu, không biết đọc dashboard tài chính. | Khảo sát khả năng dựng prototype web và luồng Home/Input/Dashboard.                                | Kiểm tra hướng dữ liệu/API, benchmark và khả năng tính toán backend.                                                  |
| Tuần 2   | Tiếp tục chọn ý tưởng và chốt FinFolio     | So sánh các ý tưởng: quét báo, DCF, portfolio dashboard; hoàn thiện product brief cho FinFolio.                   | Đánh giá DCF quá đơn điệu; đề xuất logic tài chính đủ sâu cho FinFolio.                                               | Vẽ user journey và dashboard sơ bộ sau khi loại bỏ ý tưởng không khả thi.                   | Tìm công cụ AI web builder/Reflex và xác định cấu trúc trang prototype.                            | Kiểm tra dữ liệu historical price, VN-Index proxy, Yahoo/Vietstock/VNDIRECT fallback.                                 |
| Tuần 3   | Workflow và phân rã công việc              | Viết PRD ngắn, input schema, validation rules và MVP boundary.                                                    | Viết formula checklist, metric logic, common errors và financial engine spec.                                         | Thiết kế wireframe, dashboard hierarchy, chart/table plan và user flow.                     | Dựng prototype UI ban đầu: Home, Portfolio Input, Dashboard, Evaluation, Simulation, Optimization. | Thiết kế /api/analyze response schema và plan kết nối frontend-backend.                                               |
| Tuần 4   | Phát triển sản phẩm và nộp progress review | Hoàn thiện input/data plan, sample ticker/API hoặc CSV fallback; viết phần product/MVP trong review.              | Hoàn thiện logic daily return, CAGR, volatility, Sharpe, drawdown, correlation, beta/alpha.                           | Tinh chỉnh UI dashboard, tooltips, layout và visual evidence cho review.                    | Code core pages, state/form validation và khung dashboard.                                         | Kết nối API, metric cards, line chart, asset table, correlation matrix, what-if table; tổng hợp review nộp cuối tuần. |
| Tuần 5   | Nhận feedback sau demo 1                   | Tổng hợp feedback của giảng viên; ưu tiên giảm scope, làm rõ CSV/API fallback và input guide.                     | Sửa giải thích Sharpe/volatility/drawdown, kiểm tra công thức bằng manual sample.                                     | Giảm overload trên dashboard, thêm hierarchy, tooltip và trạng thái lỗi/loading.            | Sửa form nhập liệu, thông báo lỗi, responsive layout và điều hướng.                                | Sửa lỗi integration/API, giải thích việc rescale weight trong what-if simulation.                                     |
| Tuần 6   | Nhận feedback sau demo 2 và hardening      | Chốt demo dataset, acceptance checklist và cách nói “historical analysis, not advice”.                            | Hoàn thiện thresholds, disclaimer, optimization assumptions và Q&A về công thức.                                      | Polish UI, chart labels, screen consistency, mobile/responsive.                             | Code cleanup, build test, fix navigation/state bugs.                                               | Tối ưu xử lý dữ liệu/API, cải thiện before-after optimization chart, Gemini/rule-based AI explanation fallback.       |
| Tuần 7   | Tuần cuối - hoàn thiện nộp bài             | Chuẩn bị talk track phần problem, user, MVP, scope; kiểm tra tài liệu nộp.                                        | Chuẩn bị talk track finance logic; kiểm tra số liệu và câu hỏi phản biện.                                             | Chuẩn bị screenshot/mockup cuối và giải thích UX decisions.                                 | Chuẩn bị demo các trang chính và kiểm tra build chạy được.                                         | Đóng gói source, demo script, final documentation, workflow evidence và checklist submit.                             |

## 2. Meeting Minutes chi tiết theo tuần

Mỗi biên bản được viết theo cấu trúc thống nhất: thông tin cuộc họp, agenda, nội dung thảo luận, quyết định, phân công nhiệm vụ, rủi ro và trọng tâm tiếp theo.


---

### Meeting Minutes - Tuần 1: Xác định user pain point và phạm vi vấn đề tài chính

| **Thông tin**      | **Nội dung**                                                                                                                                     |
|--------------------|--------------------------------------------------------------------------------------------------------------------------------------------------|
| Project            | FinFolio - Portfolio Insight & Optimizer                                                                                                         |
| Thời gian          | Tuần 1 của dự án                                                                                                                                 |
| Thành phần tham dự | Phương, Ngọc, Hưng, An Thái, Hải                                                                                                                 |
| Chủ trì            | Phương                                                                                                                                           |
| Người ghi biên bản | Hải                                                                                                                                              |
| Mục tiêu cuộc họp  | Hiểu vấn đề người dùng trước khi chọn giải pháp; xác định nhóm người dùng, pain point, quyết định tài chính cần hỗ trợ và tiêu chí chọn ý tưởng. |

#### Agenda

- Thống nhất cách làm việc nhóm, vai trò ban đầu và kênh trao đổi.
- Thảo luận các khó khăn của nhà đầu tư cá nhân khi theo dõi danh mục.
- Tách pain point thật khỏi các tính năng “nghe hay nhưng khó chứng minh giá trị”.
- Lập danh sách ý tưởng ban đầu để tiếp tục đánh giá ở tuần 2.

#### Nội dung thảo luận chính

- Nhóm nhận thấy nhiều người chỉ nhìn từng cổ phiếu tăng/giảm mà không hiểu chất lượng danh mục ở cấp portfolio: mức rủi ro, độ biến động, tương quan, tỷ trọng tập trung và so sánh với benchmark.
- Người dùng mục tiêu ban đầu gồm individual investors, finance students và beginner-to-intermediate investors. Nhóm thống nhất sản phẩm nên hỗ trợ review và học tài chính, không phải hệ thống giao dịch thật.
- Các hướng ý tưởng ban đầu gồm: công cụ quét tin/báo tài chính, công cụ định giá DCF đơn giản, và dashboard phân tích danh mục. Chưa chốt ý tưởng trong tuần 1 vì cần kiểm tra tính khả thi và phản hồi giảng viên.
- Nhóm thống nhất tiêu chí chọn ý tưởng: phải có finance logic rõ, có input-output cụ thể, có thể dựng prototype trong thời gian môn học, và mỗi thành viên có đầu việc chứng minh được.

#### Quyết định/Kết luận

- Pain point chính: nhà đầu tư khó tự đánh giá danh mục ở cấp tổng thể bằng spreadsheet thủ công.
- Ý tưởng được ưu tiên khảo sát tiếp: portfolio analysis/optimizer vì có đủ dữ liệu đầu vào, công thức tài chính, dashboard và khả năng demo.
- Tuần 2 sẽ tiếp tục rà soát các ý tưởng khác trước khi chốt chính thức.

#### Phân công nhiệm vụ

| **Thành viên** | **Nhiệm vụ được phân công**                                                                                 | **Sản phẩm bàn giao**                                  | **Deadline**     | **Trạng thái** |
|----------------|-------------------------------------------------------------------------------------------------------------|--------------------------------------------------------|------------------|----------------|
| Phương         | Dẫn dắt nghiên cứu user pain point; viết nháp problem statement, target user và persona.                    | Bảng pain point + persona + ghi chú vấn đề người dùng. | Trước họp tuần 2 | Hoàn thành     |
| Ngọc           | Liệt kê các quyết định tài chính mà người dùng cần hỗ trợ; đề xuất nhóm metric return/risk/diversification. | Danh sách finance decision + metric cần có.            | Trước họp tuần 2 | Hoàn thành     |
| Hưng           | Tổng hợp pain point về trải nghiệm: người mới khó đọc số liệu, dashboard tài chính thường quá phức tạp.     | Ghi chú UX pain point + ví dụ màn hình tham khảo.      | Trước họp tuần 2 | Hoàn thành     |
| An Thái        | Khảo sát khả năng dựng prototype web và các trang có thể demo trong MVP.                                    | Danh sách trang prototype khả thi và luồng cơ bản.     | Trước họp tuần 2 | Hoàn thành     |
| Hải            | Kiểm tra khả năng lấy dữ liệu lịch sử, benchmark và hướng backend/API cho các ý tưởng.                      | Ghi chú technical feasibility + rủi ro data/API.       | Trước họp tuần 2 | Hoàn thành     |

#### Rủi ro/Vấn đề cần theo dõi

- Ý tưởng có thể quá rộng nếu vừa phân tích, vừa tối ưu, vừa AI recommendation.
- Dữ liệu thị trường Việt Nam có thể không ổn định nếu phụ thuộc một nguồn API duy nhất.

#### Trọng tâm cho buổi họp tiếp theo

Đánh giá và loại bỏ ý tưởng chưa phù hợp; chọn một ý tưởng có finance logic và khả năng demo rõ ràng.


---

### Meeting Minutes - Tuần 2: Tiếp tục lên ý tưởng, loại bỏ phương án chưa khả thi và chốt FinFolio

| **Thông tin**      | **Nội dung**                                                                                        |
|--------------------|-----------------------------------------------------------------------------------------------------|
| Project            | FinFolio - Portfolio Insight & Optimizer                                                            |
| Thời gian          | Tuần 2 của dự án                                                                                    |
| Thành phần tham dự | Phương, Ngọc, Hưng, An Thái, Hải                                                                    |
| Chủ trì            | Phương                                                                                              |
| Người ghi biên bản | Ngọc                                                                                                |
| Mục tiêu cuộc họp  | So sánh các ý tưởng sau feedback ban đầu; chốt sản phẩm cuối tuần 2 để chuyển sang workflow và PRD. |

#### Agenda

- Review ba hướng ý tưởng: quét báo/tin tức tài chính, DCF, portfolio dashboard.
- Ghi nhận phản hồi giảng viên về tính khả thi và độ sâu của từng ý tưởng.
- Chọn ý tưởng cuối cùng và xác định tên, hướng MVP, sản phẩm đầu ra.
- Phân công chuẩn bị PRD, công thức, UI flow và feasibility technical cho tuần 3.

#### Nội dung thảo luận chính

- Ý tưởng “quét báo” bị đánh giá không phù hợp với phạm vi nhóm vì khó kiểm soát nguồn dữ liệu, khó chứng minh logic tài chính, dễ lệch sang NLP/news summarization thay vì ứng dụng finance-banking rõ ràng.
- Ý tưởng DCF được xem là quá đơn điệu và quá đơn giản cho một prototype nhóm: người dùng không nhất thiết cần một công cụ chỉ nhập vài giả định rồi ra valuation, đồng thời khó chia việc đều cho 5 thành viên.
- Nhóm chuyển trọng tâm sang FinFolio - Portfolio Insight & Optimizer: người dùng nhập tickers, weights, benchmark, date range, risk-free rate; hệ thống tính return/risk/benchmark/correlation, what-if simulation và có thể tối ưu tỷ trọng.
- FinFolio được chọn vì có chuỗi logic rõ: user input -\> historical data -\> financial calculations -\> charts/dashboard -\> feedback/decision preparation.

#### Quyết định/Kết luận

- Không tiếp tục ý tưởng quét báo vì không khả thi và khó bám rubric finance-to-technology.
- Không chọn DCF vì scope quá hẹp, ít điểm công nghệ và ít nhu cầu cấp thiết trong bối cảnh bài nhóm.
- Chốt ý tưởng cuối tuần 2: FinFolio - Portfolio Insight & Optimizer.
- MVP không phải trading platform và không đưa ra lời khuyên mua/bán tuyệt đối; chỉ là historical analysis và decision-support prototype.

#### Phân công nhiệm vụ

| **Thành viên** | **Nhiệm vụ được phân công**                                                                       | **Sản phẩm bàn giao**                                     | **Deadline** | **Trạng thái** |
|----------------|---------------------------------------------------------------------------------------------------|-----------------------------------------------------------|--------------|----------------|
| Phương         | Chuyển pain point thành product brief: problem, target user, MVP boundary, feature ngoài MVP.     | Product brief bản 1 + scope FinFolio.                     | Đầu tuần 3   | Hoàn thành     |
| Ngọc           | So sánh độ sâu logic tài chính giữa DCF và FinFolio; đề xuất metric core cho portfolio dashboard. | Danh sách metric core + lý do chọn.                       | Đầu tuần 3   | Hoàn thành     |
| Hưng           | Vẽ user journey sơ bộ: nhập danh mục -\> xem dashboard -\> mô phỏng -\> đánh giá.                 | User journey + layout idea.                               | Đầu tuần 3   | Hoàn thành     |
| An Thái        | Tìm công cụ AI web builder/Reflex và kiểm tra khả năng tạo prototype nhiều trang.                 | Ghi chú công cụ + đề xuất stack UI.                       | Đầu tuần 3   | Hoàn thành     |
| Hải            | Kiểm tra khả năng lấy historical price, benchmark proxy và thiết kế API response cho dashboard.   | Feasibility note về Yahoo/Vietstock/VNDIRECT + API sơ bộ. | Đầu tuần 3   | Hoàn thành     |

#### Rủi ro/Vấn đề cần theo dõi

- FinFolio có thể quá rộng nếu giữ tất cả: dashboard, AI explanation, simulation, optimization.
- Cần phân biệt “analysis” và “recommendation” để tránh hiểu nhầm là tư vấn đầu tư.

#### Trọng tâm cho buổi họp tiếp theo

Tạo workflow chính thức, PRD, prompt library và phân công từng lane theo thành viên.


---

### Meeting Minutes - Tuần 3: Xây dựng workflow, PRD, input schema, financial logic và prototype plan

| **Thông tin**      | **Nội dung**                                                                                                                                                                            |
|--------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Project            | FinFolio - Portfolio Insight & Optimizer                                                                                                                                                |
| Thời gian          | Tuần 3 của dự án                                                                                                                                                                        |
| Thành phần tham dự | Phương, Ngọc, Hưng, An Thái, Hải                                                                                                                                                        |
| Chủ trì            | Phương và Ngọc                                                                                                                                                                          |
| Người ghi biên bản | Hưng                                                                                                                                                                                    |
| Mục tiêu cuộc họp  | Biến ý tưởng FinFolio thành workflow công việc rõ ràng theo lane: Product/Input, Financial Logic, Prototype/UI, User Interaction, Backend/Frontend Integration, Feedback/Documentation. |

#### Agenda

- Chuyển product brief thành PRD ngắn và MVP definition.
- Xác định input schema: tickers, weights, benchmark, start/end date, risk-free rate, optional scenario/optimization inputs.
- Thiết kế financial logic: return, volatility, Sharpe, drawdown, benchmark, correlation, simulation, optimization.
- Vẽ workflow và handoff giữa các thành viên để tránh trùng việc.

#### Nội dung thảo luận chính

- Workflow chia theo lane: Phương phụ trách Product Planning & Input Design; Ngọc phụ trách Financial Logic; An Thái + Hưng phụ trách Prototype & UI; User lane mô tả điểm người dùng nhập portfolio/chọn optimization; Hải + Phương phụ trách Backend/Frontend Integration; cả nhóm phụ trách Feedback, Testing & Documentation.
- Nhóm thống nhất mỗi prompt/output phải có sản phẩm bàn giao rõ: product brief, PRD, input schema, formula table, financial engine spec, prototype UI, API response, dashboard components, simulation, optimization, feedback log và final documentation.
- Input schema phải có validation: ticker không rỗng, weight hợp lệ/tổng 100%, date range đủ dài, benchmark hợp lệ, risk-free rate có giá trị mặc định.
- Financial logic cần giải thích đơn giản để giảng viên thấy mối liên hệ giữa bài toán tài chính và giải pháp công nghệ.

#### Quyết định/Kết luận

- Workflow được chốt làm bằng chứng tổ chức công việc cho nhóm.
- MVP gồm: input form, data fetch/CSV fallback, calculation module, metric cards, chart, correlation matrix, what-if simulation, optional constrained optimization, disclaimer.
- Từ tuần 4 bắt đầu phát triển sản phẩm và chuẩn bị progress review.

#### Phân công nhiệm vụ

| **Thành viên** | **Nhiệm vụ được phân công**                                                                                                                             | **Sản phẩm bàn giao**                      | **Deadline** | **Trạng thái**  |
|----------------|---------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------|--------------|-----------------|
| Phương         | Viết PRD 1-2 trang; thiết kế input schema và validation rules; xác định MVP boundary.                                                                   | PRD + input schema + validation checklist. | Trong tuần 3 | Hoàn thành      |
| Ngọc           | Viết formula table và financial checklist: daily return, portfolio return, CAGR, volatility, Sharpe, drawdown, beta/alpha, tracking error, correlation. | Formula checklist + financial engine spec. | Trong tuần 3 | Hoàn thành      |
| Hưng           | Thiết kế wireframe/dashboard hierarchy, chart/table plan, tooltip plan và user flow.                                                                    | Mockup UI + dashboard layout.              | Trong tuần 3 | Hoàn thành      |
| An Thái        | Dựng prototype UI ban đầu bằng React/Tailwind: Home, Portfolio Input, Dashboard, Evaluation, Simulation, Optimization.                                  | Prototype screens + main frontend pages.   | Cuối tuần 3  | Đang phát triển |
| Hải            | Thiết kế API response /api/analyze; xác định dữ liệu cần trả về cho metric cards, line chart, asset table, correlation matrix.                          | API schema + integration plan.             | Cuối tuần 3  | Hoàn thành      |

#### Rủi ro/Vấn đề cần theo dõi

- Nếu không có handoff rõ, frontend có thể thiếu field từ backend hoặc backend trả dữ liệu không dùng được cho dashboard.
- Một số metric nâng cao có thể gây quá tải cho beginner users; cần hierarchy và tooltip.

#### Trọng tâm cho buổi họp tiếp theo

Code prototype, nối frontend-backend, chuẩn bị evidence cho progress review nộp cuối tuần 4.


---

### Meeting Minutes - Tuần 4: Phát triển sản phẩm và hoàn thiện midterm progress review

| **Thông tin**      | **Nội dung**                                                                                                                                          |
|--------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------|
| Project            | FinFolio - Portfolio Insight & Optimizer                                                                                                              |
| Thời gian          | Tuần 4 của dự án                                                                                                                                      |
| Thành phần tham dự | Phương, Ngọc, Hưng, An Thái, Hải                                                                                                                      |
| Chủ trì            | Hải                                                                                                                                                   |
| Người ghi biên bản | Phương                                                                                                                                                |
| Mục tiêu cuộc họp  | Tạo bản prototype có thể demo và nộp progress review cuối tuần 4, chứng minh product logic, financial logic, workflow và trách nhiệm từng thành viên. |

#### Agenda

- Review tiến độ code frontend, backend, chart và simulation.
- Kiểm tra công thức tính toán và dữ liệu lịch sử.
- Chuẩn bị progress review: project overview, logic chain, input-financial logic-output, MVP, evidence, role-output map, feedback questions.
- Chốt nội dung nộp cuối tuần 4 và đầu việc sau midterm.

#### Nội dung thảo luận chính

- Prototype/source package đã có hướng React/Vite frontend, Express backend, TypeScript data types, chart components, financial calculation logic, historical data source hoặc CSV fallback plan, và Gemini/Google AI Studio support cho phần giải thích.
- Nhóm chuẩn bị evidence theo ba nhóm: product logic flow, prototype/code structure và role-output map. Các file/code được liên hệ với output: App.tsx quản lý tab/state/dashboard; PortfolioForm.tsx xử lý input; server.ts xử lý API/financial calculations; types.ts định nghĩa dữ liệu; MetricCard.tsx hiển thị chỉ số.
- Progress review cần làm rõ FinFolio là công cụ phân tích lịch sử và học tài chính, không phải trading platform hoặc lời khuyên đầu tư tuyệt đối.
- Nội dung review cuối tuần 4 phải thể hiện mọi thành viên có output cụ thể, không chỉ ghi vai trò chung.

#### Quyết định/Kết luận

- Nộp “FinFolio - Midterm Project Progress Review” vào cuối tuần 4.
- Giữ scope midterm ở mức prototype: dashboard metrics, benchmark comparison, correlation, simulation, optional optimization, AI explanation dạng hỗ trợ.
- Ghi lại feedback questions cho giảng viên: scope có quá rộng không, financial logic có rõ không, data input strategy có ổn không, cách tránh investment advice.

#### Phân công nhiệm vụ

| **Thành viên** | **Nhiệm vụ được phân công**                                                                                                                  | **Sản phẩm bàn giao**                        | **Deadline** | **Trạng thái**             |
|----------------|----------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------|--------------|----------------------------|
| Phương         | Hoàn thiện product brief, problem/user/MVP scope, input structure, benchmark/data-source plan và phần product trong review.                  | Phần Product Overview, MVP, input/data plan. | Cuối tuần 4  | Đã nộp                     |
| Ngọc           | Hoàn thiện formula list và calculation logic cho return, CAGR, volatility, Sharpe, drawdown, correlation, beta/alpha và evaluation rules.    | Formula table + financial logic section.     | Cuối tuần 4  | Đã nộp                     |
| Hưng           | Chuẩn hóa dashboard layout, wireframe, chart/table plan và UI evidence cho proposal/review.                                                  | UI mockup + dashboard visualization plan.    | Cuối tuần 4  | Đã nộp                     |
| An Thái        | Code core frontend pages: Home, Portfolio Input, Dashboard layout, state và validation cơ bản.                                               | Frontend core pages + input form.            | Cuối tuần 4  | Đang hoàn thiện sau review |
| Hải            | Kết nối backend/frontend: /api/analyze, metric cards, line chart, asset table, correlation matrix, what-if comparison; tổng hợp review file. | Integrated prototype + review document.      | Cuối tuần 4  | Đã nộp                     |

#### Rủi ro/Vấn đề cần theo dõi

- API có thể lỗi ticker hoặc thiếu dữ liệu lịch sử, cần CSV/sample fallback.
- Optimization và AI analysis có nguy cơ bị hiểu nhầm là khuyến nghị đầu tư; cần disclaimer rõ.

#### Trọng tâm cho buổi họp tiếp theo

Demo để nhận feedback, sau đó sửa UI/UX, data reliability, error handling, formula validation và disclaimer.


---

### Meeting Minutes - Tuần 5: Nhận feedback sau demo 1 và chuyển feedback thành task sửa sản phẩm

| **Thông tin**      | **Nội dung**                                                                                                                                     |
|--------------------|--------------------------------------------------------------------------------------------------------------------------------------------------|
| Project            | FinFolio - Portfolio Insight & Optimizer                                                                                                         |
| Thời gian          | Tuần 5 của dự án                                                                                                                                 |
| Thành phần tham dự | Phương, Ngọc, Hưng, An Thái, Hải                                                                                                                 |
| Chủ trì            | Hưng và Hải                                                                                                                                      |
| Người ghi biên bản | An Thái                                                                                                                                          |
| Mục tiêu cuộc họp  | Phân loại feedback sau demo thành bugs, finance-logic issues, UI/UX issues, data/API issues và risk/disclaimer issues; phân công sprint sửa lỗi. |

#### Agenda

- Tổng hợp nhận xét của giảng viên sau demo.
- Phân loại feedback theo mức độ ưu tiên và người phụ trách.
- Chốt các sửa đổi bắt buộc trước demo tiếp theo.
- Cập nhật feedback log và acceptance criteria.

#### Nội dung thảo luận chính

- Giảng viên góp ý dashboard đang có nhiều metric, có thể làm người mới khó hiểu. Nhóm cần ưu tiên vài chỉ số chính trước, đưa metric nâng cao xuống phần chi tiết hoặc tooltip.
- Sharpe Ratio, Max Drawdown, VaR/CVaR, correlation cần được giải thích bằng ngôn ngữ đơn giản, tránh để người dùng nhìn số nhưng không biết tốt/xấu.
- Data/API với ticker Việt Nam có nguy cơ fail hoặc thiếu lịch sử. Nhóm cần chuẩn bị ticker-format guidance và sample CSV/dataset fallback cho demo.
- What-if simulation cần ghi rõ khi thêm ticker mới thì weight cũ được scale lại để tổng bằng 100%, nếu không người dùng sẽ hiểu sai kết quả.
- Optimization output và AI explanation phải có nhãn “historical simulation only”, không dùng từ ngữ như buy/sell recommendation.

#### Quyết định/Kết luận

- Cập nhật feedback log với owner và acceptance criteria.
- Ưu tiên cao: tooltip Sharpe/metric, API fallback, what-if rescale note, investment-advice disclaimer.
- Mỗi thành viên phải sửa đúng phần của mình và chuẩn bị bằng chứng trước demo tuần 6.

#### Phân công nhiệm vụ

| **Thành viên** | **Nhiệm vụ được phân công**                                                                                                 | **Sản phẩm bàn giao**                                  | **Deadline**      | **Trạng thái**  |
|----------------|-----------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------|-------------------|-----------------|
| Phương         | Tổng hợp feedback, cập nhật MVP scope, viết input guide/ticker-format guidance và kế hoạch CSV fallback.                    | Feedback log + input/data fallback checklist.          | Trước demo tuần 6 | Hoàn thành      |
| Ngọc           | Validate công thức bằng sample thủ công; viết giải thích Sharpe/volatility/drawdown/correlation bằng ngôn ngữ dễ hiểu.      | Manual formula check + metric explanation notes.       | Trước demo tuần 6 | Hoàn thành      |
| Hưng           | Thiết kế lại hierarchy dashboard: key metrics trước, advanced details sau; thêm tooltip, labels và warning labels.          | UI/UX revision plan + mockup điều chỉnh.               | Trước demo tuần 6 | Hoàn thành      |
| An Thái        | Sửa form validation, loading/error states, responsive layout và navigation theo UI plan.                                    | Frontend fixes + screenshots.                          | Trước demo tuần 6 | Đang hoàn thiện |
| Hải            | Sửa integration bugs, API error handling, correlation matrix display, what-if simulation note và before/after result table. | Patched integrated prototype + simulation explanation. | Trước demo tuần 6 | Đang hoàn thiện |

#### Rủi ro/Vấn đề cần theo dõi

- Nếu chỉ sửa giao diện mà không kiểm tra công thức, giảng viên có thể hỏi sâu về financial logic.
- Nếu demo live API lỗi, nhóm cần có dataset mẫu để bảo đảm demo chạy được.

#### Trọng tâm cho buổi họp tiếp theo

Chạy demo lần 2 với bản đã sửa; kiểm tra data fallback, công thức, UI và disclaimer.


---

### Meeting Minutes - Tuần 6: Nhận feedback sau demo 2, hardening sản phẩm và chuẩn bị final demo

| **Thông tin**      | **Nội dung**                                                                                                                                    |
|--------------------|-------------------------------------------------------------------------------------------------------------------------------------------------|
| Project            | FinFolio - Portfolio Insight & Optimizer                                                                                                        |
| Thời gian          | Tuần 6 của dự án                                                                                                                                |
| Thành phần tham dự | Phương, Ngọc, Hưng, An Thái, Hải                                                                                                                |
| Chủ trì            | Hải và Ngọc                                                                                                                                     |
| Người ghi biên bản | Phương                                                                                                                                          |
| Mục tiêu cuộc họp  | Ổn định prototype sau feedback; kiểm tra performance, data reliability, formula correctness, UI polish, AI explanation và final demo readiness. |

#### Agenda

- Review các lỗi còn lại sau demo 2.
- Kiểm tra luồng người dùng đầy đủ: input → analyze → dashboard → simulation → optimization → AI explanation.
- Tối ưu tốc độ xử lý dữ liệu và fallback cho benchmark/ticker.
- Chuẩn bị final talk track và Q&A.

#### Nội dung thảo luận chính

- Nhóm thống nhất bản cuối phải chứng minh một luồng xuyên suốt, không chỉ là các màn hình rời rạc. Người dùng nhập portfolio, hệ thống trả metric, chart, benchmark comparison, correlation, simulation và optimization output.
- Hải cập nhật hướng xử lý dữ liệu song song thay vì tuần tự để giảm thời gian chờ khi fetch nhiều mã. Cần giữ error message rõ khi ticker không tìm thấy.
- Phương và Ngọc nhấn mạnh wording: “historical backtesting”, “simulation”, “not financial advice”, vì output tối ưu và AI analysis có thể bị hiểu nhầm là khuyến nghị đầu tư.
- Hưng và An Thái tập trung làm UI rõ hơn: chart labels, tooltip, visual hierarchy, loading/error states, responsive layout.
- Nhóm chuẩn bị thêm demo dataset để không phụ thuộc hoàn toàn vào live API trong buổi final.

#### Quyết định/Kết luận

- Chốt final feature set: Dashboard analysis, benchmark comparison, correlation matrix, what-if simulation, constrained optimization, AI/rule-based explanation.
- Chỉ trình bày optimization như exploratory allocation support, không phải lời khuyên đầu tư.
- Tuần 7 sẽ tập trung final packaging, rehearsal và tài liệu nộp.

#### Phân công nhiệm vụ

| **Thành viên** | **Nhiệm vụ được phân công**                                                                                                                             | **Sản phẩm bàn giao**                          | **Deadline** | **Trạng thái** |
|----------------|---------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------|--------------|----------------|
| Phương         | Chốt demo dataset, input guide, disclaimer wording và acceptance checklist cho final.                                                                   | Demo data + final checklist + disclaimer text. | Đầu tuần 7   | Hoàn thành     |
| Ngọc           | Kiểm tra lại thresholds, formula notes, in-sample/out-of-sample explanation và Q&A finance logic.                                                       | Final formula notes + Q&A sheet.               | Đầu tuần 7   | Hoàn thành     |
| Hưng           | Polish dashboard UI, chart labels, tooltip, spacing, color-coded evaluation và mobile responsiveness.                                                   | Final UI polish screenshots.                   | Đầu tuần 7   | Hoàn thành     |
| An Thái        | Code cleanup, route/page navigation, state handling, build test và sửa lỗi form/loading.                                                                | Clean frontend build + bug checklist.          | Đầu tuần 7   | Hoàn thành     |
| Hải            | Tối ưu API/fetch flow, improve before-after optimization chart, simulation result table, Gemini/rule-based AI explanation fallback và run instructions. | Stable integrated prototype + run guide.       | Đầu tuần 7   | Hoàn thành     |

#### Rủi ro/Vấn đề cần theo dõi

- Performance/API timeout vẫn có thể xảy ra nếu dùng live data; phải có fallback và demo scenario ổn định.
- Final presentation có thể bị quá dài nếu giải thích tất cả metric; cần talk track rõ, ưu tiên metric chính.

#### Trọng tâm cho buổi họp tiếp theo

Final rehearsal, nộp source package, tài liệu, proposal/review, workflow evidence và meeting minutes.


---

### Meeting Minutes - Tuần 7: Tuần cuối: hoàn thiện deliverables, rehearsal và nộp bài

| **Thông tin**      | **Nội dung**                                                                                                       |
|--------------------|--------------------------------------------------------------------------------------------------------------------|
| Project            | FinFolio - Portfolio Insight & Optimizer                                                                           |
| Thời gian          | Tuần 7 của dự án                                                                                                   |
| Thành phần tham dự | Phương, Ngọc, Hưng, An Thái, Hải                                                                                   |
| Chủ trì            | Cả nhóm                                                                                                            |
| Người ghi biên bản | Hải                                                                                                                |
| Mục tiêu cuộc họp  | Đóng gói toàn bộ sản phẩm, tài liệu và bằng chứng phân công; thống nhất demo script và câu trả lời cho giảng viên. |

#### Agenda

- Kiểm tra final prototype và source package.
- Review lại proposal, midterm review, workflow, feedback log và meeting minutes.
- Chạy final demo rehearsal theo đúng talk track.
- Phân công người trình bày từng phần và checklist nộp bài.

#### Nội dung thảo luận chính

- Nhóm review lại thông điệp chính: FinFolio giúp cá nhân/finance students phân tích danh mục bằng historical data, metric tài chính, benchmark comparison, correlation, simulation và optimization, không thực hiện giao dịch thật.
- Phần trình bày được chia theo đóng góp cá nhân để giảng viên thấy accountability: Phương trình bày problem/user/MVP/input; Ngọc trình bày formulas và financial logic; Hưng trình bày UI/UX; An Thái trình bày frontend flow; Hải trình bày backend integration, charts, simulation/optimization và demo.
- Cả nhóm kiểm tra lại các bằng chứng: workflow diagram, project proposal, progress review tuần 4, source package, feedback log và meeting minutes 7 tuần.
- Nhóm thống nhất dùng demo dataset ổn định trước, sau đó có thể demo live API nếu điều kiện cho phép.

#### Quyết định/Kết luận

- Final submission bao gồm source package, proposal, progress review, workflow evidence và file meeting minutes 7 tuần.
- Giữ wording cẩn trọng trong final demo: “historical analysis”, “backtest”, “simulation”, “not investment advice”.
- Hoàn tất final rehearsal trước khi nộp để bảo đảm mọi thành viên nắm phần trình bày của mình.

#### Phân công nhiệm vụ

| **Thành viên** | **Nhiệm vụ được phân công**                                                                                                              | **Sản phẩm bàn giao**                             | **Deadline**  | **Trạng thái** |
|----------------|------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------|---------------|----------------|
| Phương         | Chuẩn bị phần trình bày problem, target user, user pain point, MVP scope, input schema và product decisions.                             | Talk track mở đầu + product/MVP slides notes.     | Ngày nộp cuối | Hoàn thành     |
| Ngọc           | Chuẩn bị phần trình bày financial logic, công thức, interpretation rules, limitations và câu hỏi phản biện.                              | Finance Q&A sheet + formula notes.                | Ngày nộp cuối | Hoàn thành     |
| Hưng           | Chuẩn bị phần trình bày UI/UX, dashboard hierarchy, before/after feedback changes và screenshot evidence.                                | UI/UX talk track + screenshots.                   | Ngày nộp cuối | Hoàn thành     |
| An Thái        | Chuẩn bị demo frontend: Home, Portfolio Input, Dashboard layout, validation/loading/error states.                                        | Frontend demo checklist.                          | Ngày nộp cuối | Hoàn thành     |
| Hải            | Đóng gói source, kiểm tra npm run dev/build, demo /api/analyze, charts, simulation, optimization, AI explanation và final documentation. | Source package + final demo script + handoff log. | Ngày nộp cuối | Hoàn thành     |

#### Rủi ro/Vấn đề cần theo dõi

- Nếu final demo bị lỗi live API, chuyển ngay sang scenario fallback và giải thích data limitation.
- Nếu giảng viên hỏi scope quá rộng, nhóm cần trả lời rằng MVP core là input + metrics + dashboard; simulation/optimization là extension trong prototype.

#### Trọng tâm cho buổi họp tiếp theo

Nộp bài và chuẩn bị trả lời câu hỏi sau final presentation.


---

## 3. Phụ lục A - Workflow công việc nhóm

Workflow thể hiện các lane công việc chính: Product Planning & Input Design, Financial Logic, Prototype & UI, User Interaction, Backend/Frontend Integration, Feedback/Testing/Documentation.

![Workflow công việc nhóm](media/image1.jpeg)

**Tóm tắt lane theo workflow:**

| **Lane**                                       | **Nội dung**                                                                                               |
|------------------------------------------------|------------------------------------------------------------------------------------------------------------|
| Phương - Product Planning & Input Design       | Prompt 01-03: product idea, PRD, input schema/validation. Prompt 10: đưa optimization vào app flow.        |
| Ngọc - Financial Logic                         | Prompt 04/07/10: công thức, daily return, portfolio return, benchmark return, metrics, optimization logic. |
| An Thái + Hưng - Prototype & UI                | Prompt 05-06: prototype pages, screenshot-based UI/UX review, React/TypeScript/Tailwind layout.            |
| User - End User Interaction                    | User enters portfolio; user selects optimization objective.                                                |
| Hải + Phương - Backend/Frontend Integration    | Prompt 07-10: /api/analyze, dashboard components, simulation, optimization display.                        |
| Whole Team - Feedback, Testing & Documentation | Prompt 11-12: classify feedback, prepare final workflow documentation and talk track.                      |


---

## 4. Phụ lục B - Bảng role-output cuối cùng theo thành viên

Bảng này dùng để đối chiếu trách nhiệm xuyên suốt 7 tuần với sản phẩm bàn giao cuối cùng.

| **Thành viên** | **Vai trò chính**                           | **Output chính**                                                                                                                                   | **Đóng góp theo giai đoạn**                                                                                            |
|----------------|---------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------|
| Phương         | Product + Data/API                          | Product brief; PRD; input schema; validation rules; benchmark/data-source plan; CSV/API fallback; product/MVP documentation.                       | Tuần 1-2: pain point/idea; Tuần 3: PRD/input; Tuần 4: review; Tuần 5-7: feedback, final input guide, talk track.       |
| Ngọc           | Financial Logic + Backend Calculation       | Formula checklist; daily return/portfolio return/CAGR/volatility/Sharpe/drawdown/correlation/beta/alpha logic; optimization objective/constraints. | Tuần 1-2: finance feasibility; Tuần 3: formula; Tuần 4: calculation logic; Tuần 5-7: validation, thresholds, Q&A.      |
| Hưng           | UI/UX Design + Dashboard Visualization Plan | Wireframe; dashboard layout; user flow; chart/table hierarchy; tooltip and UX improvement plan.                                                    | Tuần 1-2: UX pain/user journey; Tuần 3: wireframe; Tuần 4: UI evidence; Tuần 5-7: UI polish and final screenshots.     |
| An Thái        | Frontend Core Pages                         | Home page; Portfolio Input page; Dashboard layout; state handling; validation; loading/error states; responsive layout.                            | Tuần 2-3: prototype setup; Tuần 4: core pages; Tuần 5-7: bug fixes, build test, final frontend demo.                   |
| Hải            | Frontend Chart + Backend Integration        | API integration; metric cards; PnL/performance chart; asset table; correlation matrix; what-if simulation; optimization; final demo script.        | Tuần 1-2: data/API feasibility; Tuần 3: API schema; Tuần 4: integration; Tuần 5-7: bug fixes, optimization, packaging. |


---

## 5. Checklist nộp bài cuối cùng

| **Hạng mục**                | **Bằng chứng/ghi chú**                                                                                                              | **Trạng thái** |
|-----------------------------|-------------------------------------------------------------------------------------------------------------------------------------|----------------|
| Workflow evidence           | Có workflow diagram và prompt/output map.                                                                                           | Done           |
| Project proposal/pitch deck | Mô tả project overview, product characteristics, logic chain, financial logic, MVP và questions for feedback.                       | Done           |
| Midterm progress review     | Đã nộp cuối tuần 4; có project logic, input-output, MVP, current evidence, individual outputs và next steps.                        | Done           |
| Source package              | Có React/Vite frontend, Express backend, TypeScript types, dashboard components, simulation/optimization và AI explanation support. | Done           |
| Meeting minutes 7 tuần      | File Word này ghi rõ phân công nhiệm vụ theo từng tuần và từng thành viên.                                                          | Done           |
| Final demo script           | Có kịch bản demo input → analyze → dashboard → simulation → optimization → AI explanation.                                | Done           |
