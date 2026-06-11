# Individual Footprint

## Thành viên 1: Bùi Thanh Hải - 2313380008
- **Họ tên:** Bùi Thanh Hải
- **Mã sinh viên:** 2313380008
- **Dự án:** FinFolio - Portfolio Insight & Optimizer
- **Môn học:** Technology Applications in Finance and Banking - NHA408E
- **Nhóm:** Group 9

### Vai trò trong dự án

**Bạn phụ trách vai trò gì trong dự án?**

Trong dự án FinFolio, tôi phụ trách chính phần lập trình/tích hợp giữa backend và frontend, kết nối dữ liệu phân tích danh mục với dashboard, biểu đồ, bảng kết quả, mô phỏng what-if, tối ưu hóa và phần chuẩn bị demo cuối kỳ. Vai trò của tôi nằm ở đoạn biến dữ liệu và logic tài chính thành phần sản phẩm có thể thao tác được.

- Thiết kế và kiểm tra hướng dữ liệu/API, benchmark và fallback dữ liệu lịch sử.
- Thiết kế response schema cho endpoint /api/analyze để frontend có đủ metric cards, chart data, asset table và correlation matrix.
- Tích hợp dashboard với API response: metric cards, line chart, asset metrics, correlation matrix và error handling.
- Phát triển/tinh chỉnh phần What-if Simulation và trước-sau Optimization để người dùng thấy tác động khi thay đổi danh mục.
- Kiểm tra run/build, đóng gói source, chuẩn bị demo script, handoff log và final documentation.

### Dấu ấn cá nhân trong sản phẩm

**Phần nào trong sản phẩm thể hiện rõ đóng góp của bạn nhất?**

Dấu ấn rõ nhất của tôi là phần dashboard và luồng demo có thể chạy được: người dùng nhập danh mục, hệ thống gọi phân tích, sau đó hiển thị metric cards, biểu đồ performance/PnL, bảng asset metrics, correlation matrix, kết quả what-if, kết quả optimization và phần giải thích AI/rule-based. Phần này thể hiện rõ đóng góp vì nó nối trực tiếp financial logic của Ngọc, input/data plan của Phương và UI của Hưng/An Thái thành sản phẩm cuối cùng.

### Những việc đã thực sự làm

- **Việc 1.** Kiểm tra tính khả thi của historical price data, benchmark proxy và hướng API/fallback dữ liệu trong giai đoạn chọn ý tưởng.
- **Việc 2.** Thiết kế contract dữ liệu cho /api/analyze: tickers, weights, benchmark, date range, risk-free rate và các output cần trả về cho dashboard.
- **Việc 3.** Kết nối backend/frontend để dashboard nhận đúng portfolio metrics, benchmark metrics, chart data, asset metrics và correlation matrix.
- **Việc 4.** Sửa integration bugs, API error handling và các trường hợp thiếu ticker/thiếu dữ liệu lịch sử sau feedback demo.
- **Việc 5.** Tối ưu What-if Simulation: giải thích việc tính lại weight, hiển thị before/after table và chart để người dùng hiểu tác động thêm mã mới.
- **Việc 6.** Hỗ trợ phần Optimization Comparison: hiển thị optimized weights, chart trước-sau và cảnh báo đây chỉ là historical simulation.
- **Việc 7.** Tích hợp hoặc kiểm tra phần AI/rule-based explanation fallback để demo không phụ thuộc hoàn toàn vào một response AI.
- **Việc 8.** Đóng gói source, kiểm tra npm run dev/build, chuẩn bị demo script và final handoff log cho tuần cuối.

### File, tính năng, dữ liệu, logic, giao diện, tài liệu hoặc phần demo đã đóng góp

Các phần cụ thể có thể đối chiếu trong source package, proposal/pitch deck, progress review và demo:

| Hạng mục | Phần đã đóng góp | Cách kiểm tra |
| --- | --- | --- |
| server.ts | Endpoint /api/analyze, /api/price, /api/optimize; fetch historical data; align dates; calculate/return dashboard-ready data. | Đối chiếu trong source package cuối kỳ. |
| src/App.tsx | State quản lý portfolio, benchmark, dashboard tabs, handleAnalyze, simulation state, optimization state, AI analysis flow. | Đối chiếu trong source package và demo app. |
| src/types.ts | Kiểu dữ liệu AnalysisRequest, AnalysisResponse, PortfolioMetrics, AssetMetrics giúp frontend/backend thống nhất dữ liệu. | Đối chiếu trong source package. |
| Dashboard output | Metric cards, performance/PnL line chart, benchmark comparison, asset table, correlation matrix. | Đối chiếu bằng demo Dashboard và pitch deck phần Portfolio Dashboard. |
| What-if Simulation | Thêm mã/tỷ trọng, tính lại danh mục, so sánh before/after metrics, table và chart. | Đối chiếu bằng tab Simulation và Meeting Minutes tuần 5-7. |
| Optimization display | Hiển thị optimized weights, before/after comparison và diễn giải kết quả như historical simulation. | Đối chiếu bằng tab Optimization và final demo script. |
| Final documentation/demo | Run guide, demo script, source packaging, handoff log, workflow evidence. | Đối chiếu bằng Meeting Minutes tuần 7 và bộ nộp cuối. |

### Bằng chứng đóng góp

**Bằng chứng chính:** `FinFolio_7_Week_Meeting_Minutes.docx`. Meeting minutes là evidence quan trọng nhất vì ghi rõ nhiệm vụ, output, deadline và trạng thái của từng thành viên theo từng tuần.

| Tuần | Ghi trong meeting minutes | Output được ghi nhận | Vì sao chứng minh đóng góp cá nhân |
| --- | --- | --- | --- |
| Tuần 1 | Meeting Minutes ghi Hải kiểm tra khả năng lấy dữ liệu lịch sử, benchmark và hướng backend/API cho các ý tưởng. | Ghi chú technical feasibility + rủi ro data/API. | Chứng minh Hải tham gia từ bước đánh giá feasibility, không chỉ làm phần demo cuối. |
| Tuần 2 | Hải kiểm tra historical price, benchmark proxy và thiết kế API response cho dashboard sau khi loại quét báo và DCF. | Feasibility note về Yahoo/Vietstock/VNDIRECT + API sơ bộ. | Góp phần giúp nhóm chốt FinFolio vì ý tưởng có dữ liệu và luồng xử lý khả thi. |
| Tuần 3 | Hải thiết kế API response /api/analyze và xác định field trả về cho metric cards, line chart, asset table, correlation matrix. | API schema + integration plan. | Đây là contract quan trọng để financial engine và frontend dashboard nối được với nhau. |
| Tuần 4 | Hải được giao kết nối backend/frontend: /api/analyze, metric cards, line chart, asset table, correlation matrix, what-if comparison; tổng hợp review file. | Integrated prototype + review document. | Là evidence trực tiếp cho phần sản phẩm được nộp cuối tuần 4. |
| Tuần 5 | Sau demo, Hải sửa integration bugs, API error handling, correlation matrix display, what-if simulation note và before/after result table. | Patched integrated prototype + simulation explanation. | Chứng minh Hải xử lý feedback giảng viên/người dùng thành task sửa sản phẩm. |
| Tuần 6 | Hải tối ưu API/fetch flow, before-after optimization chart, simulation result table, Gemini/rule-based AI explanation fallback và run instructions. | Stable integrated prototype + run guide. | Giúp prototype ổn định hơn và giảm rủi ro demo lỗi. |
| Tuần 7 | Hải đóng gói source, kiểm tra npm run dev/build, demo /api/analyze, charts, simulation, optimization, AI explanation và final documentation. | Source package + final demo script + handoff log. | Chứng minh đóng góp ở giai đoạn hoàn thiện nộp bài và demo cuối kỳ. |

**Bằng chứng phụ có thể kiểm tra:**

- Source package: portfolio-insight-&-optimizer FINAL.zip, đặc biệt các file server.ts, src/App.tsx, src/types.ts, src/components/MetricCard.tsx.
- Pitch Deck/Proposal: các phần Portfolio Dashboard, Portfolio Simulation, Portfolio Optimization và Post-Simulation AI Analysis thể hiện output do phần integration/chart/simulation tạo ra.
- Midterm Progress Review: Part E ghi Hải phụ trách Frontend Chart + Backend Integration, PnL/performance chart, correlation matrix, result table, what-if simulation comparison và integrated prototype.
- Ghi chú: nếu không có commit/PR riêng do nhóm làm ngoài GitHub ở giai đoạn đầu, meeting minutes + source package + demo screen là bằng chứng thay thế có thể kiểm tra được.

### Phần đóng góp đó kết nối thế nào với sản phẩm cuối cùng

- Giúp người dùng đi từ input danh mục sang dashboard có kết quả trực quan thay vì chỉ có công thức rời rạc.
- Giúp financial logic trở thành output có thể đọc: metric cards, chart, bảng, matrix và so sánh benchmark.
- Giúp phần what-if/optimization trở thành decision-support flow: người dùng thấy trước-sau và hiểu đây là mô phỏng lịch sử.
- Giúp demo cuối kỳ rõ ràng hơn vì có kịch bản: nhập dữ liệu -> analyze -> dashboard -> simulation -> optimization -> explanation.

### Điều cá nhân học được

- Tôi học được rằng sản phẩm tài chính không chỉ cần công thức đúng mà còn cần dữ liệu được align date, normalize ticker và handle lỗi rõ ràng.
- Tôi hiểu rõ hơn cách thiết kế API response cho frontend: field phải đủ cho chart/table/card, nếu thiếu sẽ làm UI không thể hiển thị đúng.
- Tôi học cách biến feedback demo thành task kỹ thuật cụ thể: API error, missing data, before/after table, weight rescale note, run guide.
- Tôi nhận ra optimization và AI explanation phải có wording cẩn thận để tránh bị hiểu là lời khuyên đầu tư.

### Khó khăn đã gặp và cách xử lý

| Khó khăn đã gặp | Cách xử lý |
| --- | --- |
| Dữ liệu lịch sử và ticker có thể lỗi hoặc không đồng nhất. | Thiết kế normalize ticker, kiểm tra benchmark proxy, thêm hướng fallback và error message rõ hơn. |
| Frontend cần đúng field từ backend để render chart/table. | Chốt /api/analyze schema ở tuần 3 và kiểm tra lại trong tuần 4-6 khi tích hợp. |
| What-if/optimization dễ bị hiểu nhầm là khuyến nghị đầu tư. | Thêm before/after comparison, note về rescale weight và disclaimer “historical simulation only”. |
| Demo có rủi ro lỗi nếu API hoặc AI response chậm. | Chuẩn bị run instructions, kiểm tra npm run dev/build và có Gemini/rule-based explanation fallback. |

### Lời nhắn cho sinh viên khóa sau

Nếu khóa sau tiếp tục phần này, nên chốt API schema thật sớm, viết sample response trước khi code UI, chuẩn bị CSV/sample data fallback và luôn kiểm thử bằng vài bộ portfolio khác nhau. Với sản phẩm tài chính, đừng chỉ cố làm nhiều metric; hãy ưu tiên dữ liệu ổn định, giải thích rõ và disclaimer đúng chỗ.
