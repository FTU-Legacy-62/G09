# Individual Footprint

File này tổng hợp đóng góp cá nhân của toàn bộ thành viên nhóm G09. Các bản tách riêng vẫn được lưu trong thư mục `Footprint/` để tiện đối chiếu.


## Thành viên 1: Bùi Thanh Hải - 2313380008
|***Thông tin***|***Nội dung***|
| :- | :- |
|*Họ tên*|*Bùi Thanh Hải*|
|*Mã sinh viên*|*2313380008*|
|*Dự án*|*FinFolio - Portfolio Insight & Optimizer*|
|*Môn học*|*Technology Applications in Finance and Banking - NHA408E*|
|Nhóm|Group 9|

### **Vai trò trong dự án**

***Bạn phụ trách vai trò gì trong dự án?***

Trong dự án FinFolio, tôi phụ trách chính phần lập trình/tích hợp giữa backend và frontend, kết nối dữ liệu phân tích danh mục với dashboard, biểu đồ, bảng kết quả, mô phỏng what-if, tối ưu hóa và phần chuẩn bị demo cuối kỳ. Vai trò của tôi nằm ở đoạn biến dữ liệu và logic tài chính thành phần sản phẩm có thể thao tác được.

- Thiết kế và kiểm tra hướng dữ liệu/API, benchmark và fallback dữ liệu lịch sử.
- Thiết kế response schema cho endpoint /api/analyze để frontend có đủ metric cards, chart data, asset table và correlation matrix.
- Tích hợp dashboard với API response: metric cards, line chart, asset metrics, correlation matrix và error handling.
- Phát triển/tinh chỉnh phần What-if Simulation và trước-sau Optimization để người dùng thấy tác động khi thay đổi danh mục.
- Kiểm tra run/build, đóng gói source, chuẩn bị demo script, handoff log và final documentation.

### **Dấu ấn cá nhân trong sản phẩm**

***Phần nào trong sản phẩm thể hiện rõ đóng góp của bạn nhất?***

Dấu ấn rõ nhất của tôi là phần dashboard và luồng demo có thể chạy được: người dùng nhập danh mục, hệ thống gọi phân tích, sau đó hiển thị metric cards, biểu đồ performance/PnL, bảng asset metrics, correlation matrix, kết quả what-if, kết quả optimization và phần giải thích AI/rule-based. Phần này thể hiện rõ đóng góp vì nó nối trực tiếp financial logic của Ngọc, input/data plan của Phương và UI của Hưng/An Thái thành sản phẩm cuối cùng.

### **Những việc đã thực sự làm**

- **Việc 1.** Kiểm tra tính khả thi của historical price data, benchmark proxy và hướng API/fallback dữ liệu trong giai đoạn chọn ý tưởng.
- **Việc 2.** Thiết kế contract dữ liệu cho /api/analyze: tickers, weights đã được suy ra từ số lượng cổ phiếu, benchmark, date range, risk-free rate và các output cần trả về cho dashboard.
- **Việc 3.** Kết nối backend/frontend để dashboard nhận đúng portfolio metrics, benchmark metrics, chart data, asset metrics và correlation matrix.
- **Việc 4.** Sửa integration bugs, API error handling và các trường hợp thiếu ticker/thiếu dữ liệu lịch sử sau feedback demo.
- **Việc 5.** Tối ưu What-if Simulation: giải thích việc tính lại tỷ trọng từ số lượng cổ phiếu và giá hiện tại, hiển thị before/after table và chart để người dùng hiểu tác động thêm mã mới.
- **Việc 6.** Hỗ trợ phần Optimization Comparison: hiển thị optimized weights, chart trước-sau và cảnh báo đây chỉ là historical simulation.
- **Việc 7.** Tích hợp hoặc kiểm tra phần AI/rule-based explanation fallback để demo không phụ thuộc hoàn toàn vào một response AI.
- **Việc 8.** Đóng gói source, kiểm tra npm run dev/build, chuẩn bị demo script và final handoff log cho tuần cuối.

### **File, tính năng, dữ liệu, logic, giao diện, tài liệu hoặc phần demo đã đóng góp**

Các phần cụ thể có thể đối chiếu trong source package, proposal/pitch deck, progress review và demo:

|***Hạng mục***|***Phần đã đóng góp***|***Cách kiểm tra***|
| --- | --- | --- |
| backend/server.ts | Endpoint /api/analyze, /api/price, /api/optimize; fetch historical data; align dates; calculate/return dashboard-ready data. | Đối chiếu trong source package cuối kỳ. |
| frontend/src/App.tsx | State quản lý portfolio, benchmark, dashboard tabs, handleAnalyze, simulation state, optimization state, AI analysis flow. | Đối chiếu trong source package và demo app. |
| frontend/src/types.ts | Kiểu dữ liệu AnalysisRequest, AnalysisResponse, PortfolioMetrics, AssetMetrics giúp frontend/backend thống nhất dữ liệu. | Đối chiếu trong source package. |
| Dashboard output | Metric cards, performance/PnL line chart, benchmark comparison, asset table, correlation matrix. | Đối chiếu bằng demo Dashboard và pitch deck phần Portfolio Dashboard. |
| What-if Simulation | Thêm mã/số lượng cổ phiếu, tính lại giá trị và tỷ trọng danh mục, so sánh before/after metrics, table và chart. | Đối chiếu bằng tab Simulation và Meeting Minutes tuần 5-7. |
| Optimization display | Hiển thị optimized weights, before/after comparison và diễn giải kết quả như historical simulation. | Đối chiếu bằng tab Optimization và final demo script. |
| Final documentation/demo | Run guide, demo script, source packaging, handoff log, workflow evidence. | Đối chiếu bằng Meeting Minutes tuần 7 và bộ nộp cuối. |

### **Bằng chứng đóng góp**

***Bằng chứng chính:*** `FinFolio_7_Week_Meeting_Minutes.docx`. Meeting minutes là evidence quan trọng nhất vì ghi rõ nhiệm vụ, output, deadline và trạng thái của từng thành viên theo từng tuần.

|***Tuần***|***Ghi trong meeting minutes***|***Output được ghi nhận***|***Vì sao chứng minh đóng góp cá nhân***|
| --- | --- | --- | --- |
| Tuần 1 | Meeting Minutes ghi Hải kiểm tra khả năng lấy dữ liệu lịch sử, benchmark và hướng backend/API cho các ý tưởng. | Ghi chú technical feasibility + rủi ro data/API. | Chứng minh Hải tham gia từ bước đánh giá feasibility, không chỉ làm phần demo cuối. |
| Tuần 2 | Hải kiểm tra historical price, benchmark proxy và thiết kế API response cho dashboard sau khi loại quét báo và DCF. | Feasibility note về Yahoo/Vietstock/VNDIRECT + API sơ bộ. | Góp phần giúp nhóm chốt FinFolio vì ý tưởng có dữ liệu và luồng xử lý khả thi. |
| Tuần 3 | Hải thiết kế API response /api/analyze và xác định field trả về cho metric cards, line chart, asset table, correlation matrix. | API schema + integration plan. | Đây là contract quan trọng để financial engine và frontend dashboard nối được với nhau. |
| Tuần 4 | Hải được giao kết nối backend/frontend: /api/analyze, metric cards, line chart, asset table, correlation matrix, what-if comparison; tổng hợp review file. | Integrated prototype + review document. | Là evidence trực tiếp cho phần sản phẩm được nộp cuối tuần 4. |
| Tuần 5 | Sau demo, Hải sửa integration bugs, API error handling, correlation matrix display, what-if simulation note và before/after result table. | Patched integrated prototype + simulation explanation. | Chứng minh Hải xử lý feedback giảng viên/người dùng thành task sửa sản phẩm. |
| Tuần 6 | Hải tối ưu API/fetch flow, before-after optimization chart, simulation result table, Gemini/rule-based AI explanation fallback và run instructions. | Stable integrated prototype + run guide. | Giúp prototype ổn định hơn và giảm rủi ro demo lỗi. |
| Tuần 7 | Hải đóng gói source, kiểm tra npm run dev/build, demo /api/analyze, charts, simulation, optimization, AI explanation và final documentation. | Source package + final demo script + handoff log. | Chứng minh đóng góp ở giai đoạn hoàn thiện nộp bài và demo cuối kỳ. |

***Bằng chứng phụ có thể kiểm tra:***

- Source package: portfolio-insight-&-optimizer FINAL.zip, đặc biệt các file backend/server.ts, frontend/src/App.tsx, frontend/src/types.ts, frontend/src/components/MetricCard.tsx.
- Pitch Deck/Proposal: các phần Portfolio Dashboard, Portfolio Simulation, Portfolio Optimization và Post-Simulation AI Analysis thể hiện output do phần integration/chart/simulation tạo ra.
- Midterm Progress Review: Part E ghi Hải phụ trách Frontend Chart + Backend Integration, PnL/performance chart, correlation matrix, result table, what-if simulation comparison và integrated prototype.
- Ghi chú: nếu không có commit/PR riêng do nhóm làm ngoài GitHub ở giai đoạn đầu, meeting minutes + source package + demo screen là bằng chứng thay thế có thể kiểm tra được.

### **Phần đóng góp đó kết nối thế nào với sản phẩm cuối cùng**

- Giúp người dùng đi từ input danh mục sang dashboard có kết quả trực quan thay vì chỉ có công thức rời rạc.
- Giúp financial logic trở thành output có thể đọc: metric cards, chart, bảng, matrix và so sánh benchmark.
- Giúp phần what-if/optimization trở thành decision-support flow: người dùng thấy trước-sau và hiểu đây là mô phỏng lịch sử.
- Giúp demo cuối kỳ rõ ràng hơn vì có kịch bản: nhập dữ liệu -> analyze -> dashboard -> simulation -> optimization -> explanation.

### **Điều cá nhân học được**

- Tôi học được rằng sản phẩm tài chính không chỉ cần công thức đúng mà còn cần dữ liệu được align date, normalize ticker và handle lỗi rõ ràng.
- Tôi hiểu rõ hơn cách thiết kế API response cho frontend: field phải đủ cho chart/table/card, nếu thiếu sẽ làm UI không thể hiển thị đúng.
- Tôi học cách biến feedback demo thành task kỹ thuật cụ thể: API error, missing data, before/after table, ghi chú tính lại tỷ trọng từ số lượng cổ phiếu, run guide.
- Tôi nhận ra optimization và AI explanation phải có wording cẩn thận để tránh bị hiểu là lời khuyên đầu tư.

### **Khó khăn đã gặp và cách xử lý**

|***Khó khăn đã gặp***|***Cách xử lý***|
| --- | --- |
| Dữ liệu lịch sử và ticker có thể lỗi hoặc không đồng nhất. | Thiết kế normalize ticker, kiểm tra benchmark proxy, thêm hướng fallback và error message rõ hơn. |
| Frontend cần đúng field từ backend để render chart/table. | Chốt /api/analyze schema ở tuần 3 và kiểm tra lại trong tuần 4-6 khi tích hợp. |
| What-if/optimization dễ bị hiểu nhầm là khuyến nghị đầu tư. | Thêm before/after comparison, note về cách tính lại tỷ trọng sau khi thêm số lượng cổ phiếu mới và disclaimer “historical simulation only”. |
| Demo có rủi ro lỗi nếu API hoặc AI response chậm. | Chuẩn bị run instructions, kiểm tra npm run dev/build và có Gemini/rule-based explanation fallback. |

### **Lời nhắn cho sinh viên khóa sau**

Nếu khóa sau tiếp tục phần này, nên chốt API schema thật sớm, viết sample response trước khi code UI, chuẩn bị CSV/sample data fallback và luôn kiểm thử bằng vài bộ portfolio khác nhau. Với sản phẩm tài chính, đừng chỉ cố làm nhiều metric; hãy ưu tiên dữ liệu ổn định, giải thích rõ và disclaimer đúng chỗ.


## Thành viên 2: Nguyễn Trịnh Thái Hưng - 2312380805
|***Thông tin***|***Nội dung***|
| :- | :- |
|*Họ tên*|*Nguyễn Trịnh Thái Hưng*|
|*Mã sinh viên*|*2312380805*|
|*Dự án*|*FinFolio - Portfolio Insight & Optimizer*|
|*Môn học*|*Technology Applications in Finance and Banking - NHA408E*|
|Nhóm|Group 9|

### **Vai trò trong dự án**

***Bạn phụ trách vai trò gì trong dự án?***

Trong dự án FinFolio, tôi phụ trách chính phần UI/UX Design và Dashboard Visualization Plan. Tôi tập trung vào việc biến bài toán tài chính thành luồng giao diện dễ hiểu: người dùng biết nhập gì, xem kết quả ở đâu, đọc metric như thế nào, và chuyển sang simulation/optimization ra sao. Tôi cũng tham gia chuẩn bị screenshot evidence và phần trình bày UI/UX cho demo cuối kỳ.

- Tổng hợp pain point trải nghiệm của người dùng mới khi đọc dashboard tài chính.
- Vẽ user journey: nhập danh mục -> xem dashboard -> mô phỏng -> đánh giá/tối ưu.
- Thiết kế wireframe, dashboard hierarchy, chart/table plan, tooltip plan và visual flow.
- Tinh chỉnh UI sau feedback demo: giảm metric overload, thêm hierarchy, tooltip, labels, loading/error state và warning labels.
- Chuẩn bị screenshot/mockup, UI/UX talk track và giải thích quyết định thiết kế trong final demo.

### **Dấu ấn cá nhân trong sản phẩm**

***Phần nào trong sản phẩm thể hiện rõ đóng góp của bạn nhất?***

Dấu ấn rõ nhất của tôi nằm ở cấu trúc giao diện và cách dashboard dẫn người dùng đọc kết quả. Thay vì chỉ hiển thị nhiều con số tài chính, phần UI/UX sắp xếp key metrics trước, chart/table sau, thêm tooltip/label/cảnh báo và flow qua Evaluation, Simulation, Optimization. Nhờ đó người dùng mới không bị quá tải khi gặp CAGR, volatility, Sharpe Ratio, drawdown hoặc correlation.

### **Những việc đã thực sự làm**

- **Việc 1.** Ghi nhận pain point UX của người mới: khó hiểu số liệu tài chính, không biết đọc dashboard và dễ nhầm analysis với advice.
- **Việc 2.** Vẽ user journey sơ bộ sau khi nhóm chốt FinFolio: input danh mục -> dashboard -> simulation -> evaluation/optimization.
- **Việc 3.** Thiết kế wireframe/dashboard hierarchy, chart/table plan, tooltip plan và user flow ở tuần workflow.
- **Việc 4.** Chuẩn hóa dashboard layout và UI evidence cho proposal/review nộp cuối tuần 4.
- **Việc 5.** Sau feedback demo, thiết kế lại hierarchy dashboard: key metrics trước, advanced details sau; thêm tooltip, labels và warning labels.
- **Việc 6.** Polish dashboard UI, chart labels, tooltip, spacing, color-coded evaluation và mobile responsiveness trước final demo.
- **Việc 7.** Chuẩn bị phần trình bày UI/UX, before/after feedback changes và screenshot evidence trong tuần cuối.

### **File, tính năng, dữ liệu, logic, giao diện, tài liệu hoặc phần demo đã đóng góp**

Các phần cụ thể có thể đối chiếu trong source package, proposal/pitch deck, progress review và demo:

|***Hạng mục***|***Phần đã đóng góp***|***Cách kiểm tra***|
| --- | --- | --- |
| Workflow lane Prototype & UI | Lane An Thái + Hưng trong workflow: prototype pages, screenshot-based UI/UX review, React/TypeScript/Tailwind layout. | Đối chiếu trong workflow diagram và Meeting Minutes tuần 3. |
| User journey | Luồng Home -> Portfolio Input -> Dashboard -> Evaluation -> Simulation -> Optimization. | Đối chiếu trong pitch deck/proposal và demo app. |
| Dashboard hierarchy | Key metrics trước, chart/table/correlation sau, advanced detail và warning/tooltip đặt gần điểm người dùng cần hiểu. | Đối chiếu trong dashboard screens và UI/UX revision plan. |
| Pitch Deck/Proposal pages UI | Home page, Portfolio Input, Portfolio Dashboard, Portfolio Valuation, Portfolio Simulation, Portfolio Optimization. | Đối chiếu trong Finfolio - Multi-design.pdf, đặc biệt các trang 24-30. |
| frontend/src/App.tsx | Cấu trúc tabs/sidebar/screens, dashboard sections, simulation/optimization flow theo user journey. | Đối chiếu trong source package. |
| frontend/src/components/PortfolioForm.tsx | Input form về ticker, số lượng cổ phiếu, benchmark, date range và trạng thái validation/loading/error liên quan đến trải nghiệm nhập dữ liệu. | Đối chiếu trong source package và demo input screen. |
| frontend/src/components/MetricCard.tsx | Cách trình bày chỉ số bằng card, label, icon/trạng thái để người dùng đọc nhanh. | Đối chiếu trong source package và dashboard screen. |

### **Bằng chứng đóng góp**

***Bằng chứng chính:*** `FinFolio_7_Week_Meeting_Minutes.docx`. Meeting minutes là evidence quan trọng nhất vì ghi rõ nhiệm vụ, output, deadline và trạng thái của từng thành viên theo từng tuần.

|***Tuần***|***Ghi trong meeting minutes***|***Output được ghi nhận***|***Vì sao chứng minh đóng góp cá nhân***|
| --- | --- | --- | --- |
| Tuần 1 | Meeting Minutes ghi Hưng tổng hợp pain point trải nghiệm: người mới khó đọc số liệu, dashboard tài chính thường quá phức tạp. | Ghi chú UX pain point + ví dụ màn hình tham khảo. | Chứng minh Hưng tham gia từ giai đoạn xác định user pain point, không chỉ trang trí giao diện cuối. |
| Tuần 2 | Hưng vẽ user journey sơ bộ: nhập danh mục -> xem dashboard -> mô phỏng -> đánh giá. | User journey + layout idea. | Giúp nhóm chuyển từ ý tưởng FinFolio sang flow sản phẩm có thể demo. |
| Tuần 3 | Hưng thiết kế wireframe/dashboard hierarchy, chart/table plan, tooltip plan và user flow. | Mockup UI + dashboard layout. | Đây là evidence trực tiếp cho vai trò UI/UX Design + Dashboard Visualization Plan. |
| Tuần 4 | Hưng chuẩn hóa dashboard layout, wireframe, chart/table plan và UI evidence cho proposal/review. | UI mockup + dashboard visualization plan. | Là output giữa kỳ được dùng trong progress review và pitch deck/proposal. |
| Tuần 5 | Sau feedback demo, Hưng thiết kế lại hierarchy dashboard: key metrics trước, advanced details sau; thêm tooltip, labels và warning labels. | UI/UX revision plan + mockup điều chỉnh. | Chứng minh Hưng biến feedback thành cải tiến sản phẩm cụ thể. |
| Tuần 6 | Hưng polish dashboard UI, chart labels, tooltip, spacing, color-coded evaluation và mobile responsiveness. | Final UI polish screenshots. | Giúp sản phẩm dễ nhìn, dễ demo và giảm hiểu nhầm khi đọc metric tài chính. |
| Tuần 7 | Hưng chuẩn bị phần trình bày UI/UX, dashboard hierarchy, before/after feedback changes và screenshot evidence. | UI/UX talk track + screenshots. | Chứng minh Hưng chịu trách nhiệm giải thích quyết định thiết kế trong final demo. |

***Bằng chứng phụ có thể kiểm tra:***

- Pitch Deck/Proposal: các trang Home page, Portfolio Input, Portfolio Dashboard, Portfolio Valuation, Portfolio Simulation và Portfolio Optimization thể hiện rõ output UI/UX.
- Midterm Progress Review: Part E ghi Hưng phụ trách wireframe, dashboard layout, chart/table plan, metric display structure và user flow.
- Workflow diagram: Lane An Thái + Hưng - Prototype & UI, Prompt 05-06 về prototype pages và screenshot-based UI/UX refinement.
- Source package: frontend/src/App.tsx, frontend/src/components/PortfolioForm.tsx và frontend/src/components/MetricCard.tsx là nơi có thể đối chiếu cấu trúc giao diện/flow/component liên quan.
- Ghi chú: nếu không có commit/PR riêng do nhóm làm ngoài GitHub ở giai đoạn đầu, meeting minutes + pitch deck screenshots + source package là bằng chứng thay thế có thể kiểm tra được.

### **Phần đóng góp đó kết nối thế nào với sản phẩm cuối cùng**

- Giúp người dùng mới hiểu luồng sử dụng: bắt đầu từ Home/Input, sau đó đọc Dashboard, rồi mới sang Simulation/Optimization.
- Giúp các chỉ số tài chính không bị “rơi” vào một bảng số khô: mỗi metric được đặt trong card/chart/table và có hierarchy dễ theo dõi.
- Giúp frontend của An Thái và phần chart/integration của Hải có layout rõ để triển khai thống nhất.
- Giúp demo cuối kỳ kể được câu chuyện sản phẩm: pain point -> input -> dashboard -> feedback -> cải tiến UI -> final output.

### **Điều cá nhân học được**

- Tôi học được rằng UI cho sản phẩm tài chính cần ưu tiên giải thích và giảm hiểu nhầm, không chỉ làm đẹp màn hình.
- Dashboard cần hierarchy rõ: key metrics trước, metric nâng cao sau, tooltip và cảnh báo đặt sát nơi người dùng đọc kết quả.
- Feedback demo rất quan trọng; khi người dùng nói “quá nhiều số”, cần chuyển thành task cụ thể như thêm label, tooltip, spacing và warning state.
- AI builder/Google AI Studio có thể giúp nhanh về layout, nhưng nhóm vẫn phải tự chọn thiết kế phù hợp với user task và financial logic.

### **Khó khăn đã gặp và cách xử lý**

|***Khó khăn đã gặp***|***Cách xử lý***|
| --- | --- |
| Dashboard có quá nhiều metric, dễ gây quá tải. | Thiết kế lại hierarchy ở tuần 5: key metrics trước, advanced details sau, thêm tooltip/labels/warning labels. |
| Người dùng mới khó hiểu Sharpe, drawdown, correlation. | Phối hợp với Ngọc để bổ sung diễn giải và với An Thái/Hải để đặt label/tooltip đúng vị trí. |
| UI phải thay đổi theo output backend và logic simulation/optimization. | Chốt wireframe/hierarchy ở tuần 3-4, sau đó polish và đồng bộ chart/table ở tuần 6-7. |
| Cần chứng minh đóng góp UI/UX bằng evidence cụ thể, không chỉ nói “thiết kế giao diện”. | Dùng meeting minutes, workflow lane, pitch deck screenshots, UI/UX revision plan và final screenshots làm evidence. |

### **Lời nhắn cho sinh viên khóa sau**

Nếu khóa sau tiếp tục phần UI/UX, nên test sớm với người chưa biết tài chính để xem họ có hiểu metric không. Đừng đưa tất cả chỉ số lên màn hình đầu tiên; hãy chọn key metrics, thêm tooltip ngắn, dùng before/after screenshots để chứng minh cải tiến sau feedback.


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


## Thành viên 4: Hoàng Minh Ngọc - 2312380023
|***Thông tin***|***Nội dung***|
| :- | :- |
|*Họ tên*|*Hoàng Minh Ngọc*|
|*Mã sinh viên*|*2312380023*|
|*Dự án*|*FinFolio - Portfolio Insight & Optimizer*|
|*Môn học*|*Technology Applications in Finance and Banking - NHA408E*|
|Nhóm|Group 9|

### **Vai trò trong dự án**

***Bạn phụ trách vai trò gì trong dự án?***

Trong project FinFolio, em đảm nhiệm vai trò phụ trách logic tài chính, cơ chế đánh giá danh mục đầu tư và logic tối ưu hóa danh mục. Đây là phần nền tảng giúp sản phẩm chuyển đổi dữ liệu đầu vào của người dùng thành các chỉ số tài chính, kết quả so sánh với benchmark, kết luận về hiệu quả danh mục và đề xuất tỷ trọng tối ưu theo mục tiêu phân tích. Vai trò của em không tập trung vào thiết kế giao diện hay bố cục hiển thị, mà tập trung vào việc xác định hệ thống cần xử lý dữ liệu tài chính như thế nào, tính toán các chỉ số theo trình tự nào và sử dụng các kết quả đó để đánh giá cũng như tối ưu danh mục ra sao.

Cụ thể, em phụ trách xác định hệ thống chỉ số cần thiết để đánh giá một danh mục đầu tư, bao gồm các chỉ số về lợi nhuận, rủi ro, hiệu quả lợi nhuận trên rủi ro, so sánh với benchmark và đa dạng hóa. Từ đó, em xây dựng bảng công thức và làm rõ ý nghĩa tài chính của các chỉ số như Daily Return, Portfolio Return, Cumulative Return, CAGR, Volatility, Sharpe Ratio, Sortino Ratio, Max Drawdown, VaR, CVaR, Beta, Alpha, Tracking Error, Information Ratio và Correlation Matrix. Những chỉ số này tạo thành cơ sở để hệ thống đánh giá danh mục không chỉ theo mức sinh lời, mà còn theo mức rủi ro và hiệu quả so với thị trường tham chiếu.

Một phần quan trọng khác trong vai trò của em là thiết kế logic so sánh danh mục với benchmark. Em xác định rằng portfolio và benchmark cần được tính trên cùng giai đoạn thời gian và cùng tập ngày giao dịch đã được căn chỉnh để kết quả so sánh có ý nghĩa. Trên cơ sở đó, portfolio CAGR được so sánh với benchmark CAGR để đánh giá mức độ vượt trội hoặc kém hơn về tăng trưởng; portfolio volatility được so sánh với benchmark volatility để đánh giá mức rủi ro tương đối; beta và alpha được dùng để đo độ nhạy cũng như phần lợi nhuận vượt mức kỳ vọng so với benchmark; còn tracking error và information ratio được dùng để đánh giá mức độ lệch khỏi benchmark và hiệu quả của phần active return.

Bên cạnh phần tính toán và so sánh, em cũng phụ trách logic kết luận danh mục theo hướng rule-based. Điều này có nghĩa là hệ thống không kết luận danh mục tốt chỉ vì lợi nhuận cao, mà phải xét đồng thời các yếu tố rủi ro và hiệu quả lợi nhuận trên rủi ro. Cụ thể, CAGR được đánh giá tương đối so với benchmark, volatility được đánh giá so với benchmark, Max Drawdown được kiểm tra theo ngưỡng rủi ro, và Sharpe Ratio được sử dụng làm tiêu chí trọng tâm để xác định overall rating của danh mục. Nhờ đó, kết luận của sản phẩm có cơ sở tài chính rõ ràng hơn, tránh việc đưa ra nhận xét cảm tính hoặc chỉ dựa trên một chỉ số đơn lẻ.

Ngoài ra, em phụ trách phần định nghĩa logic tài chính cho chức năng tối ưu hóa danh mục. Trong FinFolio, tối ưu hóa được xây dựng theo hai mục tiêu chính: maximize Sharpe Ratio và minimize Volatility. Mục tiêu maximize Sharpe Ratio được thiết kế để tìm danh mục có hiệu quả lợi nhuận trên rủi ro tốt nhất dựa trên dữ liệu lịch sử, trong khi mục tiêu minimize Volatility hướng tới việc tìm danh mục có mức biến động thấp nhất. Em cũng xác định các ràng buộc cần có trong quá trình tối ưu hóa, bao gồm tổng tỷ trọng bằng 100%, tỷ trọng từng tài sản phải nằm trong khoảng min/max do người dùng đặt, không sử dụng tỷ trọng âm và kết quả tối ưu hóa chỉ được diễn giải như một phân tích lịch sử, không phải khuyến nghị đầu tư chắc chắn.

Như vậy, vai trò của em trong dự án là xây dựng nền tảng logic giúp FinFolio trả lời bốn câu hỏi cốt lõi: danh mục được tính toán như thế nào, danh mục được so sánh với benchmark ra sao, hệ thống kết luận danh mục dựa trên tiêu chí nào và tỷ trọng danh mục có thể được tối ưu hóa theo nguyên tắc tài chính nào. Phần việc này đóng vai trò kết nối giữa input của người dùng, dữ liệu giá lịch sử, financial engine, benchmark comparison, evaluation logic và optimization logic của sản phẩm cuối cùng.

### **Dấu ấn cá nhân trong sản phẩm**

***Phần nào trong sản phẩm thể hiện rõ đóng góp của bạn nhất?***

Dấu ấn cá nhân rõ nhất của em trong sản phẩm nằm ở phần logic phân tích danh mục đầu tư. Đây là phần không trực tiếp thể hiện qua giao diện, nhưng quyết định ý nghĩa của các kết quả mà người dùng nhìn thấy. Nếu giao diện là phần giúp người dùng tương tác với sản phẩm, thì logic tài chính là phần giúp sản phẩm có khả năng đưa ra các kết quả phân tích đáng tin cậy.

Khi người dùng nhập các thông tin như mã cổ phiếu, số lượng cổ phiếu từng mã, benchmark, khoảng thời gian phân tích và risk-free rate, hệ thống cần định giá các vị thế để suy ra tỷ trọng, rồi chuyển các thông tin đó thành daily return, portfolio return, benchmark return và các chỉ số như CAGR, Volatility, Sharpe Ratio, Sortino Ratio, Max Drawdown, VaR, CVaR, Beta, Alpha, Tracking Error, Information Ratio và Correlation Matrix. Phần đóng góp của em là xác định vai trò của từng chỉ số, cách tính các chỉ số đó và cách dùng chúng để đánh giá danh mục.

Đóng góp này giúp FinFolio không dừng lại ở việc hiển thị các con số riêng lẻ, mà có thể giải thích danh mục từ nhiều góc độ: lợi nhuận, rủi ro, hiệu quả lợi nhuận trên rủi ro, mức độ so sánh với benchmark và mức độ đa dạng hóa. Nhờ đó, sản phẩm có cơ sở để đưa ra các kết luận như danh mục đang hoạt động tốt, đang có rủi ro cao, đang kém hơn benchmark hoặc cần được cải thiện về hiệu quả risk-return.

### **Những việc đã thực sự làm**

**3.1 Xác định hệ thống chỉ số tài chính cần dùng trong FinFolio**

Em đã xác định các nhóm chỉ số cần có để đánh giá một danh mục đầu tư, gồm:

- Nhóm return: Daily return, Daily portfolio return, Total return, Cumulative return và CAGR.

- Nhóm risk: Volatility, Max Drawdown, VaR 95% và CVaR 95%.

- Nhóm risk-adjusted return: Sharpe Ratio, Sortino Ratio và Information Ratio

- Nhóm benchmark comparison: Beta, Alpha, Tracking error và Information ratio

- Nhóm diversification: Correlation matrix và Allocation chart.

- Em phân loại các chỉ số này để nhóm biết mỗi chỉ số được dùng để trả lời câu hỏi gì. Ví dụ, CAGR dùng để đo tốc độ tăng trưởng lịch sử; volatility dùng để đo mức biến động; Sharpe Ratio dùng để đánh giá lợi nhuận có xứng đáng với rủi ro hay không; Information Ratio dùng để đánh giá excess return so với benchmark trên mỗi đơn vị tracking error.

**3.2 Xây dựng bảng công thức và financial checklist**

Em đã xây dựng bảng công thức cho các chỉ số tài chính chính của sản phẩm. Bảng này bao gồm:

- Tên chỉ số.

- Input cần có.

- Công thức hoặc logic tính toán.

- Ý nghĩa tài chính.

- Cách đọc kết quả.

- Lỗi thường gặp cần tránh.

Bảng công thức: https://drive.google.com/file/d/1GAmYUeR_LVicPm9WCznNQNF5ftXIkiox/view?usp=drive_link

Ví dụ, với daily return, em xác định rằng hệ thống phải dùng tỷ lệ thay đổi giá:

```text
Daily Return = Price[t] / Price[t-1] - 1
```

Với portfolio return, em xác định rằng return của danh mục phải là tổng có trọng số của return từng mã:

```text
Portfolio Return = Sum(Asset Return × Asset Weight)
```

Với benchmark comparison, em xác định rằng portfolio và benchmark phải được tính trên cùng giai đoạn thời gian và cùng tập ngày giao dịch đã được căn chỉnh.

Em cũng lập checklist các lỗi cần tránh như không dùng chênh lệch giá tuyệt đối thay cho phần trăm return, không được so sánh portfolio và benchmark nếu ngày giao dịch chưa được căn chỉnh, không tính correlation bằng price level mà dùng return series, không kết luận danh mục tốt chỉ vì return cao mà bỏ qua rủi ro và không trình bày kết quả tối ưu hóa như khuyến nghị đầu tư chắc chắn

**3.3 Thiết kế logic tính toán của financial engine**

Em đã thiết kế trình tự tính toán tài chính cho hệ thống theo hướng: User input -> Historical price data -> Portfolio metrics -> Benchmark comparison -> Portfolio conclusion. Cụ thể, sau khi người dùng nhập input bao gồm tickers và số lượng cổ phiếu nắm giữ, web sẽ tự lấy giá hiện tại hoặc giá gần nhất từ nguồn dữ liệu để tính ra tỷ trọng từng mã trong danh mục. Bên cạnh đó, người dùng cũng sẽ chọn benchmark so sánh (em cũng đưa ra khuyến nghị người dùng nên lấy benchmark là gì để phù hợp với danh mục) và khoảng thời gian đánh giá danh mục. Sau khi có các thông tin trên, web sẽ lấy dữ liệu giá lịch sử cho các mã cổ phiếu và benchmark. Từ đây, web sẽ tính toán các metrics như em đã đề cập trong bảng công thức và sẽ là output để các thành viên khác có thể dùng cho hiển thị, diễn giải và demo.

**3.4 Làm rõ logic so sánh với benchmark**

Em đã làm rõ cách danh mục được so sánh với benchmark. Đây là phần quan trọng vì FinFolio không chỉ phân tích danh mục một cách độc lập, mà còn đánh giá danh mục đó so với thị trường tham chiếu.

Bảng so sánh benchmark: https://drive.google.com/file/d/1cuStN-li87mIINnqioWI3GWME9kv94T_/view?usp=drive_link

Trong phần này, bên cạnh dashboard các chỉ số của danh mục, em còn có phần kiểm thử hai mẫu độc lập (In-Sample và Out-Sample) với mốc ranh giới phân tách là lùi về 6 tháng cuối cho các chỉ số CAGR, Volatility và Sharpe ratio (Trường hợp khoảng thời gian ngắn dưới 6 tháng, web sẽ chia đều cho In-Sample và Out-Sample). Nếu kết quả hiệu suất trong mẫu (In-Sample Sharpe) vượt xa đáng kể so với hiệu suất ngoài mẫu (Out-of-Sample Sharpe), danh mục có thể đang bị tối ưu quá đà trên dữ liệu quá khứ và khó duy trì kết quả sinh lời thực tế trong tương lai.

**3.5 Thiết kế logic kết luận danh mục**

Ngoài các khuyến nghị và kết luận từ AI, em xác định thêm logic để hệ thống kết luận danh mục theo hướng rule-based. Hệ thống không nên kết luận danh mục tốt chỉ vì return cao, mà phải xét cả rủi ro. Các rule chính gồm:

- CAGR được so sánh với benchmark CAGR.

- Volatility được so sánh với benchmark volatility.

- Max Drawdown được kiểm tra theo ngưỡng rủi ro.

- Sharpe Ratio được dùng để đánh giá hiệu quả lợi nhuận trên rủi ro.

Overall rating chủ yếu dựa trên Sharpe Ratio do chỉ số này bao quát được cả return và risk (Nếu Sharpe Ratio < 1: Overall rating = Cần cải thiện, ngược lại thì Overall rating = Tốt). Do đó, nếu danh mục có return cao nhưng volatility cũng cao và Sharpe Ratio thấp, hệ thống không nên đánh giá danh mục là tốt. Điều này giúp kết luận của sản phẩm có cơ sở tài chính hơn.

**3.6 Thiết kế logic tối ưu hóa danh mục**

Em đã xác định logic tài chính cho phần optimization của FinFolio bao gồm 2 mục tiêu tối ưu hóa:

- Maximize Sharpe Ratio: Tìm danh mục có lợi nhuận lịch sử tốt nhất trên mỗi đơn vị rủi ro.

- Minimize Volatility: Tìm danh mục có mức biến động lịch sử thấp nhất.

Em cũng xác định các ràng buộc tài chính cho optimization bao gồm:

- Tổng tỷ trọng phải bằng 100%.

- Tỷ trọng từng mã phải nằm trong khoảng min/max do người dùng đặt.

- Không có tỷ trọng âm.

- Kết quả tối ưu hóa chỉ dựa trên dữ liệu lịch sử, không phải khuyến nghị đầu tư chắc chắn.

Logic optimization có thể hiểu như sau:

- Input: Asset returns + asset volatility + correlation matrix + constraints + objective

- Rule: Generate candidate weights  calculate portfolio return  calculate portfolio volatility  calculate Sharpe Ratio  choose weights based on selected objective

- Output: Optimized weights + recalculated portfolio metrics

Sau khi có optimized weights, các tỷ trọng mới được đưa lại vào financial engine để tính lại toàn bộ chỉ số và kết luận danh mục.

**3.7 Kiểm tra logic bằng dữ liệu thực tế**

Em cũng hỗ trợ kiểm tra logic tính toán bằng dữ liệu thực tế của FPT, HPG và VN-Index. Cụ thể, em dùng dữ liệu giá lịch sử để kiểm tra: Daily return, Portfolio return, Benchmark return, CAGR, Volatility, Max Drawdown, Sharpe Ratio, Benchmark comparison, Rule-based conclusion. Việc kiểm tra này giúp đảm bảo rằng công thức không chỉ đúng về lý thuyết mà còn chạy được với dữ liệu thật.

### **File, tính năng, dữ liệu, logic, giao diện, tài liệu hoặc phần demo đã đóng góp**

Các phần cụ thể có thể đối chiếu trong source package, proposal/pitch deck, progress review và demo:

|***Hạng mục***|***Phần đã đóng góp***|***Cách kiểm tra***|
| --- | --- | --- |
| Bảng công thức | Công thức và ý nghĩa các chỉ số Daily Return, Portfolio Return, CAGR, Volatility, Sharpe Ratio, Sortino Ratio, Max Drawdown, VaR, CVaR, Beta, Alpha, Tracking Error, Information Ratio và Correlation Matrix. | https://drive.google.com/file/d/1GAmYUeR_LVicPm9WCznNQNF5ftXIkiox/view?usp=drive_link |
| Bảng so sánh benchmark | Logic căn chỉnh dữ liệu portfolio/benchmark, so sánh CAGR, volatility, beta, alpha, tracking error và information ratio. | https://drive.google.com/file/d/1cuStN-li87mIINnqioWI3GWME9kv94T_/view?usp=drive_link |
| Bảng logic đánh giá danh mục | Rule-based conclusion dựa trên CAGR, volatility, drawdown và Sharpe Ratio. | https://drive.google.com/file/d/1_OxwrC7sUTpH3_wTJzXkBlJhraR9hL8r/view?usp=drive_link |
| Bảng logic optimization | Hai mục tiêu Maximize Sharpe Ratio và Minimize Volatility, kèm constraints và output optimized weights. | https://drive.google.com/file/d/19hpXCA3BPJi-t7gv_6mOuMacj94B-vCY/view?usp=drive_link |
| backend/server.ts | Logic tính toán chỉ số, benchmark comparison và output metric cho dashboard. | Đối chiếu trong source package cuối kỳ. |
| Demo app | Kết quả hiển thị CAGR, Volatility, Sharpe Ratio, Max Drawdown, Beta, Alpha, Tracking Error, Information Ratio và Correlation Matrix. | Chạy demo Dashboard sau khi nhập danh mục. |

### **Bằng chứng đóng góp**

***Bằng chứng chính:*** `FinFolio_7_Week_Meeting_Minutes.docx`. Meeting minutes là evidence quan trọng nhất vì ghi rõ nhiệm vụ, output, deadline và trạng thái của từng thành viên theo từng tuần.

|***Tuần***|***Ghi trong meeting minutes***|***Output được ghi nhận***|***Vì sao chứng minh đóng góp cá nhân***|
| --- | --- | --- | --- |
| Tuần 1 | Ngọc khảo sát logic tài chính cần có cho ý tưởng phân tích danh mục. | Danh sách metric và yêu cầu dữ liệu ban đầu. | Chứng minh Ngọc tham gia từ bước xác định nền tảng tính toán. |
| Tuần 2 | Ngọc làm rõ hệ thống chỉ số và hướng benchmark comparison. | Bảng công thức/bảng benchmark sơ bộ. | Là cơ sở để nhóm chốt FinFolio có financial logic rõ ràng. |
| Tuần 3 | Ngọc thống nhất input/output logic với Phương, An Thái và Hải. | Financial checklist + mapping input -> metric output. | Kết nối input schema, backend và dashboard. |
| Tuần 4 | Ngọc hoàn thiện công thức, rule đánh giá và kiểm tra output cho progress review. | Formula table + rule-based evaluation. | Chứng minh đóng góp trực tiếp vào phần phân tích danh mục. |
| Tuần 5 | Sau feedback demo, Ngọc rà lại logic đánh giá, benchmark và cách diễn giải metric. | Điều chỉnh rule/wording để tránh kết luận cảm tính. | Giúp sản phẩm giải thích kết quả tài chính nhất quán hơn. |
| Tuần 6 | Ngọc phối hợp hoàn thiện optimization logic và kiểm tra với dữ liệu FPT, HPG, VN-Index. | Optimization logic + test case dữ liệu thực tế. | Chứng minh logic không chỉ viết lý thuyết mà có kiểm tra bằng dữ liệu. |
| Tuần 7 | Ngọc hoàn thiện tài liệu logic tài chính và phần giải thích cho final demo. | Final financial logic evidence. | Chứng minh đóng góp ở giai đoạn nộp bài cuối kỳ. |

***Bằng chứng phụ có thể kiểm tra:***

- Bảng công thức, bảng so sánh benchmark, bảng logic đánh giá danh mục và bảng logic optimization trong các link ở trên.
- Meeting minutes 7 tuần ghi rõ Ngọc phụ trách Financial Logic + Backend Calculation.
- Source package có thể đối chiếu phần logic thông qua `backend/server.ts` và các metric được hiển thị ở dashboard.
- Demo app thể hiện các chỉ số CAGR, Volatility, Sharpe Ratio, Max Drawdown, Beta, Alpha, Tracking Error, Information Ratio và Correlation Matrix.

### **Phần đóng góp đó kết nối thế nào với sản phẩm cuối cùng**

Phần đóng góp của em kết nối trực tiếp với sản phẩm cuối cùng vì FinFolio là một website phân tích danh mục đầu tư. Nếu không có logic tài chính, sản phẩm chỉ có giao diện nhập liệu và hiển thị, nhưng không thể đưa ra kết quả phân tích có ý nghĩa. Cụ thể, phần việc của em giúp sản phẩm cuối cùng ở các điểm sau:

- Giúp hệ thống xử lý dữ liệu đầu vào của người dùng: Khi người dùng nhập mã cổ phiếu, số lượng cổ phiếu, benchmark và khoảng thời gian, logic của em giúp xác định cách định giá vị thế, suy ra tỷ trọng, rồi chuyển dữ liệu đó thành return series và portfolio metrics.

- Giúp sản phẩm tạo ra các chỉ số tài chính chính xác: Các chỉ số như CAGR, volatility, Sharpe Ratio, Max Drawdown, Beta, Alpha và Information Ratio là nền tảng để sản phẩm đánh giá danh mục.

- Giúp người dùng so sánh danh mục với benchmark: Người dùng không chỉ biết danh mục tăng hay giảm, mà còn biết danh mục có tốt hơn hay kém hơn benchmark, rủi ro hơn hay ít rủi ro hơn benchmark.

- Giúp phần đánh giá danh mục có cơ sở rõ ràng: Kết luận như “Cần cải thiện” hoặc “Tốt” không đến từ cảm tính, mà dựa trên rule tài chính, đặc biệt là Sharpe Ratio.

- Giúp phần AI interpretation có dữ liệu đầu vào hợp lý: AI có thể diễn giải kết quả bằng ngôn ngữ tự nhiên, nhưng phần em làm cung cấp các chỉ số tài chính để AI không nhận xét chung chung.

- Giúp phần optimization có mục tiêu tài chính rõ ràng: Hai lựa chọn optimize không phải ngẫu nhiên, mà dựa trên hai mục tiêu khác nhau: tăng hiệu quả risk-return hoặc giảm biến động danh mục.

### **Điều cá nhân học được**

Qua phần việc của mình, em học được nhiều điều cụ thể. Thứ nhất, em hiểu rõ hơn rằng một sản phẩm tài chính không thể chỉ chú ý đến return. Một danh mục có return cao chưa chắc đã tốt nếu volatility cao, drawdown lớn hoặc Sharpe Ratio thấp. Vì vậy, khi đánh giá danh mục, cần nhìn đồng thời nhiều chỉ số. Thứ hai, em học được cách chuyển kiến thức tài chính lý thuyết thành logic có thể đưa vào sản phẩm. Trước đây, các công thức như Sharpe Ratio, Beta, Alpha hay Tracking Error thường chỉ xuất hiện trong bài học. Khi làm dự án, em phải hiểu input của từng công thức là gì, output sẽ được dùng ở đâu và lỗi tính toán nào có thể xảy ra. Thứ ba, em học được tầm quan trọng của benchmark. Nếu chỉ nhìn danh mục riêng lẻ, người dùng khó biết kết quả đó tốt hay xấu. Khi có benchmark như VN-Index, hệ thống có thể so sánh danh mục với thị trường và đưa ra nhận xét có cơ sở hơn. Thứ tư, em học được rằng AI không nên thay thế hoàn toàn logic tài chính. AI có thể giúp diễn giải kết quả dễ hiểu hơn, nhưng phần kết luận chính vẫn cần dựa trên công thức và rule rõ ràng để tránh nhận xét cảm tính hoặc sai lệch. Thứ năm, em học được cách làm việc với nhóm trong một sản phẩm có nhiều phần liên kết với nhau. Phần logic tài chính của em phải đủ rõ để các bạn phụ trách backend, frontend và UI có thể dùng được trong sản phẩm cuối cùng.

### **Khó khăn đã gặp và cách xử lý**

|***Khó khăn đã gặp***|***Cách xử lý***|
| --- | --- |
| Phân loại đúng vai trò của từng chỉ số. | Em phân loại lại hệ thống metric thành các nhóm rõ ràng: return, risk, risk-adjusted return, benchmark-relative analysis và diversification. |
| Xác định cách kết luận danh mục khi các chỉ số đưa ra tín hiệu trái chiều. | Em làm rõ rằng hệ thống cần xem xét thêm các chỉ số risk-adjusted, đặc biệt là Sharpe Ratio, để kết luận cân bằng hơn giữa return và risk. |
| Đảm bảo dữ liệu portfolio và benchmark được so sánh trên cùng cơ sở. | Em đưa yêu cầu căn chỉnh ngày giao dịch chung vào checklist tài chính và nhấn mạnh đây là điều kiện cần trước khi tính benchmark-relative metrics. |
| Làm rõ ý nghĩa của optimization để tránh hiểu nhầm là khuyến nghị đầu tư. | Em xác định cách diễn giải optimization theo hướng hỗ trợ phân tích, không phải lời khuyên mua bán chắc chắn. |

### **Lời nhắn cho sinh viên khóa sau**

Nếu sinh viên khóa sau muốn tiếp tục phát triển FinFolio hoặc học từ dự án này, điều quan trọng nhất là nên xem sản phẩm như một hệ thống hoàn chỉnh, không chỉ là một tập hợp các tính năng riêng lẻ. Một sản phẩm phân tích danh mục đầu tư cần có sự liên kết chặt chẽ giữa dữ liệu đầu vào, nguồn dữ liệu thị trường, logic tính toán, giao diện hiển thị, phần đánh giá kết quả, phần tối ưu hóa và tài liệu giải thích. Nếu một trong các phần này không thống nhất, kết quả cuối cùng có thể trở nên khó kiểm tra hoặc khó giải thích trong buổi bảo vệ.

Trước khi mở rộng thêm tính năng mới, nhóm sau nên kiểm tra thật kỹ chất lượng và độ ổn định của dữ liệu. Trong quá trình thực hiện dự án, nhóm em nhận thấy rằng vấn đề dữ liệu có thể ảnh hưởng trực tiếp đến phạm vi sản phẩm. Ví dụ, benchmark VN30 ban đầu được cân nhắc đưa vào hệ thống, nhưng do dữ liệu không ổn định để xử lý nhất quán trong flow phân tích, nhóm đã phải loại bỏ lựa chọn này để đảm bảo kết quả cuối cùng đáng tin cậy hơn. Điều này cho thấy rằng không phải tính năng nào cũng nên giữ lại nếu dữ liệu nền không đủ tốt. Với một sản phẩm tài chính, việc giảm bớt một lựa chọn benchmark nhưng đảm bảo các benchmark còn lại chạy đúng sẽ tốt hơn việc giữ nhiều lựa chọn nhưng kết quả khó kiểm chứng.

Ngoài dữ liệu, sinh viên khóa sau cũng nên chú ý đến sự thống nhất giữa frontend, backend và tài liệu. Những gì người dùng nhập trên giao diện phải khớp với những gì backend có thể xử lý. Những gì backend trả ra phải khớp với các chỉ số được giải thích trong báo cáo. Những gì nhóm trình bày trong demo cũng cần đúng với logic thật trong code. Nếu báo cáo viết một công thức nhưng code sử dụng logic khác, nhóm sẽ rất khó giải thích khi được hỏi chi tiết. Vì vậy, nên duy trì một bảng mapping rõ ràng giữa input, logic xử lý và output cho từng tính năng chính.

Về phần kiểm thử, nhóm sau không nên chỉ kiểm tra sản phẩm bằng cách chạy thử trên giao diện. Cần có thêm các file kiểm tra riêng, chẳng hạn file Excel hoặc test case đơn giản, để đối chiếu các kết quả quan trọng như daily return, portfolio return, CAGR, volatility, Sharpe Ratio, max drawdown và benchmark comparison. Việc này giúp phát hiện lỗi nhanh hơn, đặc biệt là các lỗi liên quan đến dữ liệu thiếu, ngày giao dịch không khớp, tỷ trọng không bằng 100%, hoặc benchmark không có đủ dữ liệu trong giai đoạn người dùng chọn.

Đối với phần tối ưu hóa, sinh viên khóa sau nên tiếp tục nhấn mạnh rằng kết quả tối ưu chỉ dựa trên dữ liệu lịch sử và các ràng buộc do người dùng đặt ra. Optimization không nên được trình bày như một khuyến nghị đầu tư chắc chắn. Nếu phát triển thêm, nhóm sau có thể làm rõ hơn lý do tỷ trọng thay đổi sau optimization, ví dụ bằng cách giải thích tài sản nào làm tăng Sharpe Ratio, tài sản nào làm giảm volatility, và correlation giữa các tài sản ảnh hưởng đến kết quả như thế nào.

Cuối cùng, em nghĩ bài học lớn nhất từ dự án này là một sản phẩm tài chính cần được xây dựng theo hướng có thể giải thích được. Giao diện đẹp và demo mượt là cần thiết, nhưng chưa đủ. Nhóm thực hiện cần hiểu rõ dữ liệu đến từ đâu, công thức nào được sử dụng, vì sao một chỉ số được tính như vậy, vì sao một benchmark bị loại bỏ, và vì sao hệ thống đưa ra kết luận cuối cùng. Nếu tiếp tục phát triển FinFolio, sinh viên khóa sau nên ưu tiên tính nhất quán, khả năng kiểm chứng và khả năng giải thích của sản phẩm trước khi mở rộng thêm nhiều tính năng mới.


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
| Tuần 1 | Khảo sát khả năng dựng prototype web và luồng cơ bản. | Ghi chú feasibility prototype. | Tham gia từ bước xác định hướng frontend. |
| Tuần 2 | Tìm công cụ AI web builder và xác định cấu trúc prototype nhiều trang. | Cấu trúc prototype đa trang. | Là tiền đề cho Home/Input/Dashboard/Evaluation/Simulation/Optimization. |
| Tuần 3 | Dựng prototype UI ban đầu: Home, Portfolio Input, Dashboard, Evaluation, Simulation, Optimization. | Prototype UI nhiều trang. | Đây là evidence trực tiếp cho vai trò Frontend Core Pages. |
| Tuần 4 | Chuẩn bị demo frontend với Home, Input, Dashboard, validation/loading/error states. | Integrated frontend review. | Chứng minh phần frontend đã đi vào luồng demo giữa kỳ. |
| Tuần 5 | Sửa form validation, loading/error states, responsive layout và navigation theo feedback Demo 1. | Patched frontend sau feedback. | Tiếp thu feedback để chỉnh sửa cụ thể. |
| Tuần 6 | Dọn route/navigation, state handling, build test và fix lỗi form/loading. | Cleaned frontend + build test. | Giúp app ổn định hơn trước final demo. |
| Tuần 7 | Sửa lỗi và hoàn thiện web. | Final frontend pages. | Đóng góp ở giai đoạn hoàn thiện sản phẩm cuối kỳ. |

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

