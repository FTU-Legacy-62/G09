# Group Footprint
## Tên sản phẩm

**FinFolio - Portfolio Insight & Optimizer**

## Mã nhóm

**G09**

## Link repo

https://github.com/FTU-Legacy-62/G09

## Link demo

https://finfolio-axub.onrender.com/

## Vấn đề nhóm muốn giải quyết

Nhóm muốn giải quyết vấn đề: nhà đầu tư cá nhân thường nhìn danh mục theo từng mã riêng lẻ, nhưng chưa có cách đơn giản để hiểu chất lượng của toàn bộ danh mục ở cấp portfolio. Một cổ phiếu có thể đang tăng giá, nhưng toàn bộ danh mục vẫn có thể quá tập trung, biến động mạnh, tương quan cao hoặc kém hơn benchmark.

Vấn đề này xảy ra trong bối cảnh người dùng cá nhân thường tự theo dõi danh mục bằng bảng tính, app chứng khoán hoặc ghi chú rời rạc. Những công cụ đó cho thấy giá và lãi/lỗ từng mã, nhưng không luôn giải thích rõ danh mục đang có return, risk, diversification và benchmark performance như thế nào.

Những người bị ảnh hưởng là cá nhân đang quản lý danh mục đầu tư, sinh viên tài chính muốn học phân tích danh mục và nhà đầu tư mới đến trung cấp chưa quen tự tính các chỉ số như CAGR, Volatility, Sharpe Ratio, Max Drawdown, Beta, Alpha, Tracking Error hoặc Correlation Matrix.

## Người dùng mục tiêu

Người dùng chính của sản phẩm là:

- Nhà đầu tư cá nhân đang có một danh mục cổ phiếu/tài sản tài chính và muốn tự review danh mục.
- Sinh viên tài chính cần công cụ học cách đọc return, risk, benchmark và diversification ở mức danh mục.
- Nhà đầu tư beginner-to-intermediate muốn có dashboard dễ hiểu thay vì tự tính.

Người dùng cần:

- Nhập được danh mục đang nắm giữ.
- Xem được danh mục tăng trưởng thế nào trong quá khứ.
- Biết danh mục rủi ro ra sao qua volatility, drawdown và tail risk.
- Biết danh mục có đa dạng hóa không qua correlation và allocation.
- So sánh danh mục với benchmark.
- Thử một thay đổi, ví dụ thêm ticker mới hoặc thay đổi tỷ trọng, trước khi tự nghiên cứu thêm.

Người dùng sẽ dùng sản phẩm trong tình huống đang chuẩn bị review danh mục định kỳ, học một case study tài chính, chuẩn bị thảo luận với nhóm học tập hoặc muốn kiểm tra nhanh một kịch bản “what-if”.

## Sản phẩm hiện làm được gì

FinFolio hiện là một web prototype có thể demo theo luồng: Home -> Portfolio Input -> Dashboard -> Evaluation -> Simulation -> Optimization.

Các phần chính sản phẩm đã làm được:

1. **Home / Product introduction**  
   Giới thiệu FinFolio là công cụ phân tích và tối ưu hóa danh mục, không phải nền tảng giao dịch thật.

2. **Portfolio input form**  
   Người dùng nhập danh mục gồm ticker, weight, shares, benchmark, start date và end date. Form có logic chuẩn hóa ticker, ví dụ một số mã Việt Nam có thể được thêm hậu tố `.VN`.

3. **Backend API `/api/analyze`**  
   API nhận danh mục, lấy hoặc xử lý dữ liệu giá lịch sử, căn ngày giao dịch, tính daily returns, portfolio returns, benchmark returns và các metrics tài chính.

4. **Dashboard phân tích danh mục**  
   Dashboard hiển thị metric cards, đường hiệu suất danh mục, so sánh benchmark, bảng chỉ số tài sản, allocation chart và correlation matrix.

5. **Portfolio evaluation**  
   Sản phẩm giải thích các chỉ số theo ngôn ngữ dễ hiểu hơn, ví dụ portfolio đang vượt/kém benchmark, drawdown có cao không, risk-adjusted return có hiệu quả không.

6. **What-if simulation**  
   Người dùng thử thêm ticker mới với tỷ trọng mục tiêu. Hệ thống scale lại tỷ trọng cũ để tổng danh mục vẫn bằng 100%, sau đó so sánh danh mục hiện tại với danh mục mô phỏng.

7. **Optimization**  
   Người dùng chọn mục tiêu maximize Sharpe Ratio hoặc minimize Volatility. Sản phẩm tạo tỷ trọng tối ưu lịch sử trong phạm vi ràng buộc và hiển thị so sánh trước/sau.

8. **AI-supported analysis**  
   Nếu có Gemini API key, sản phẩm có thể tạo phần diễn giải bằng tiếng Việt dựa trên metrics. Phần này chỉ dùng để hỗ trợ giải thích, không phải quyết định đầu tư cuối cùng.

9. **Documentation và evidence**  
   Nhóm đã chuẩn bị project progress review, pitch/proposal, workflow diagram, meeting minutes 7 tuần và individual footprints để làm bằng chứng quá trình làm việc.

## Input

Sản phẩm nhận các thông tin đầu vào sau:

- **Ticker list**: danh sách mã tài sản, ví dụ `FPT.VN`, `HPG.VN`, `MWG.VN`, `VNM`, `SPY` hoặc benchmark tương ứng.
- **Weights**: tỷ trọng từng mã trong danh mục, tính theo phần trăm.
- **Shares**: số lượng cổ phiếu/tài sản, dùng để hỗ trợ hiển thị danh mục và mô phỏng.
- **Benchmark**: mã benchmark dùng để so sánh, ví dụ `VNM` hoặc `^VNINDEX` nếu dữ liệu khả dụng.
- **Start date và end date**: khoảng thời gian backtest/phân tích lịch sử.
- **Risk-free rate**: lãi suất phi rủi ro dùng trong Sharpe Ratio và Sortino Ratio, hiện có giá trị mặc định trong API.
- **Scenario input**: ticker mới và tỷ trọng thêm vào danh mục trong what-if simulation.
- **Optimization goal**: mục tiêu tối ưu hóa như maximize Sharpe Ratio hoặc minimize Volatility, kèm ràng buộc min/max weight nếu được bật trong giao diện.
- **Historical price data**: dữ liệu giá lịch sử từ API công khai hoặc dataset/CSV mẫu trong trường hợp API không ổn định.

## Logic hoặc quy tắc xử lý

Sản phẩm xử lý input theo pipeline chính sau:

1. **Chuẩn hóa và kiểm tra input**  
   Ticker được chuẩn hóa về dạng phù hợp. Một số ticker phổ biến hoặc benchmark được giữ nguyên; mã Việt Nam có thể thêm hậu tố `.VN`. Form cần bảo đảm ticker không rỗng, weight là số hợp lệ, tổng weight hợp lý và ngày phân tích không bị sai thứ tự.

2. **Lấy dữ liệu giá lịch sử**  
   Backend gọi dữ liệu giá lịch sử qua API công khai, đồng thời có cơ chế thử các hậu tố ticker nếu mã ban đầu không có dữ liệu. Với benchmark, hệ thống cũng lấy chuỗi giá tương ứng để so sánh.

3. **Căn ngày giao dịch chung**  
   Vì các tài sản có thể thiếu ngày giao dịch hoặc trả dữ liệu lệch timezone, hệ thống lấy tập ngày chung để bảo đảm khi tính return thì các mã được so sánh trên cùng một mốc thời gian.

4. **Tính daily return**  
   Với mỗi tài sản, daily return được tính theo công thức:

   ```text
   daily_return_t = price_t / price_(t-1) - 1
   ```

5. **Tính portfolio daily return**  
   Danh mục được tính bằng tổng daily return từng tài sản nhân với tỷ trọng của tài sản đó:

   ```text
   portfolio_return_t = sum(weight_i * asset_return_i_t)
   ```

6. **Tính return metrics**  
   Hệ thống tính cumulative return, total return và CAGR để đánh giá mức tăng trưởng lịch sử của danh mục.

7. **Tính risk metrics**  
   Hệ thống tính annualized volatility, Max Drawdown, VaR 95% và CVaR 95% để mô tả mức độ biến động, mức giảm sâu nhất và rủi ro đuôi trong dữ liệu lịch sử.

8. **Tính risk-adjusted return**  
   Hệ thống tính Sharpe Ratio và Sortino Ratio để xem danh mục tạo ra lợi nhuận lịch sử có tương xứng với rủi ro không.

9. **So sánh benchmark**  
   Hệ thống tính beta, alpha, tracking error, information ratio và correlation với benchmark. Mục tiêu là giúp người dùng biết danh mục có vượt benchmark không và sự vượt/kém đó đi kèm rủi ro như thế nào.

10. **Diversification analysis**  
    Hệ thống tính correlation matrix giữa các tài sản để đánh giá tài sản có di chuyển cùng chiều quá mạnh không. Allocation chart giúp phát hiện danh mục có bị tập trung vào một mã hay không.

11. **What-if simulation**  
    Khi người dùng thêm một ticker mới, hệ thống scale lại các tỷ trọng cũ để tổng vẫn bằng 100%, thêm ticker mới vào danh mục và tính lại toàn bộ metrics. Kết quả được so sánh với danh mục ban đầu.

12. **Optimization**  
    Với mục tiêu maximize Sharpe hoặc minimize Volatility, hệ thống thử các tổ hợp weight trong phạm vi ràng buộc, sau đó trả về weight set có chỉ số mục tiêu tốt nhất trong dữ liệu lịch sử. Output được gắn nhãn là historical simulation, không phải dự báo tương lai.

13. **AI-supported explanation**  
    Metrics được đưa vào prompt để sinh phần giải thích bằng ngôn ngữ tự nhiên. Phần này cần kiểm soát wording để tránh biến thành lời khuyên mua/bán.

## User flow

```text
1. Người dùng mở sản phẩm FinFolio.
2. Người dùng đọc phần giới thiệu ở Home để hiểu đây là portfolio analysis prototype, không phải trading platform.
3. Người dùng vào Portfolio Input.
4. Người dùng nhập ticker, weight, shares, benchmark, start date và end date.
5. Người dùng bấm Phân tích ngay.
6. Backend lấy dữ liệu giá lịch sử, căn ngày giao dịch chung và tính các chỉ số.
7. Người dùng xem Dashboard: metric cards, return curve, benchmark comparison, asset table, allocation chart và correlation matrix.
8. Người dùng đọc phần Evaluation/AI-supported explanation để hiểu ý nghĩa chỉ số.
9. Người dùng vào Simulation để thử thêm ticker mới và xem so sánh trước/sau.
10. Người dùng vào Optimization để thử maximize Sharpe Ratio hoặc minimize Volatility.
11. Người dùng dùng kết quả như thông tin học tập hoặc chuẩn bị nghiên cứu thêm, không xem đó là khuyến nghị đầu tư chắc chắn.
```

## Output

Sản phẩm tạo ra các output sau:

- **Metric cards**: CAGR, Volatility, Sharpe Ratio, Sortino Ratio, Max Drawdown, VaR/CVaR, Beta, Alpha, Tracking Error, Information Ratio, Correlation.
- **Portfolio performance chart**: đường hiệu suất/lợi nhuận tích lũy của danh mục qua thời gian.
- **Benchmark comparison**: so sánh danh mục với benchmark.
- **Asset metric table**: bảng kết quả theo từng tài sản hoặc theo cấu phần danh mục.
- **Allocation chart**: biểu đồ phân bổ tỷ trọng.
- **Correlation matrix**: ma trận tương quan giữa các mã.
- **Evaluation text**: nhận xét dễ hiểu về rủi ro, hiệu suất và điểm cần chú ý.
- **What-if comparison**: bảng và biểu đồ so sánh danh mục hiện tại với danh mục mô phỏng sau khi thêm ticker.
- **Optimized weights**: tỷ trọng đề xuất theo mục tiêu tối ưu hóa lịch sử, kèm thay đổi so với tỷ trọng ban đầu.
- **AI-supported commentary**: phần diễn giải bằng tiếng Việt nếu cấu hình API key.
- **Error/loading states**: thông báo khi ticker không có dữ liệu, dữ liệu không đủ, hoặc backend/API lỗi.

## Cách demo sản phẩm từ repo

1. Clone repo nhóm `https://github.com/FTU-Legacy-62/G09`.
2. Chạy `npm install`.
3. Tạo `.env.local` trên máy local nếu muốn bật AI analysis. Không commit API key lên GitHub.
4. Chạy `npm run dev`.
5. Mở `http://localhost:3000`.
6. Dùng dữ liệu mẫu `FPT.VN` 50%, `HPG.VN` 50%, benchmark `VNM` hoặc `^VNINDEX`, thời gian từ `2023-05-12` đến ngày demo.
7. Demo dashboard trước, sau đó demo Simulation với `MWG.VN` và demo Optimization.
8. Khi trình bày, nhấn mạnh sản phẩm là historical analysis/learning tool, không phải trading platform hoặc financial advice.

## Các lựa chọn thiết kế quan trọng

### 1. Chọn portfolio dashboard thay vì news scanner hoặc DCF

Nhóm chọn portfolio dashboard vì đề tài này có đủ ba phần yêu cầu của môn học: vấn đề tài chính rõ, logic xử lý có công thức và output có thể demo bằng sản phẩm số. News scanner bị loại vì phụ thuộc nhiều vào NLP và dữ liệu tin tức, khó chứng minh logic tài chính cốt lõi. DCF bị loại vì quá hẹp và sản phẩm có thể trở thành một form tính toán đơn giản, khó chia vai trò cho 5 thành viên.

### 2. Chọn người dùng cá nhân và sinh viên tài chính

Nhóm không chọn professional investors vì nhóm người dùng đó cần hệ thống dữ liệu chuyên sâu, độ tin cậy cao, kiểm thử nghiêm ngặt và compliance. Với phạm vi môn học, nhóm chọn cá nhân/sinh viên để tập trung vào education, portfolio review và decision preparation.

### 3. Chọn web app/dashboard làm giao diện chính

Dashboard phù hợp vì bài toán có nhiều loại output: số liệu, bảng, biểu đồ, ma trận và giải thích. Giao diện web giúp demo trực tiếp hơn so với một file tính toán tĩnh.

### 4. Chọn React/Vite + Express + TypeScript

React/Vite giúp dựng giao diện nhanh, dễ chia component và dễ demo. Express xử lý API route như `/api/analyze`. TypeScript giúp định nghĩa rõ dữ liệu input-output giữa frontend và backend.

### 5. Chọn historical analysis thay vì recommendation tuyệt đối

Nhóm cố ý ghi rõ sản phẩm không mua/bán thật và không bảo đảm lợi nhuận tương lai. Tất cả kết quả simulation, optimization và AI analysis đều được hiểu là phân tích lịch sử.

### 6. Chọn API công khai và CSV/dataset fallback

Dữ liệu thị trường công khai giúp prototype có thể demo nhanh, nhưng nhóm nhận thấy ticker Việt Nam có thể lỗi hoặc thiếu dữ liệu. Vì vậy nhóm đưa hướng fallback bằng ticker-format guidance và sample CSV/dataset cho demo.

### 7. Chọn giảm tải thông tin cho beginner users

Dashboard có nhiều metrics nên nhóm cần hierarchy: hiển thị chỉ số chính trước, dùng tooltip/label cho chỉ số khó và chuyển metric nâng cao xuống phần chi tiết. Đây là thay đổi đến từ feedback demo.

## Meeting minutes

Nhóm dùng meeting minutes theo 7 tuần để ghi lại tiến trình, quyết định và phân công. 
| Tuần | Trọng tâm | Quyết định / kết quả chính | Evidence có thể đối chiếu |
|---|---|---|---|
| Tuần 1 | Xác định user pain point | Nhóm xác định pain point chính là người dùng khó đánh giá danh mục ở cấp portfolio, đặc biệt về risk, diversification, benchmark và portfolio-level return. | Meeting Minutes Tuần 1; phần Project Logic Chain trong proposal/review. |
| Tuần 2 | Tiếp tục lên ý tưởng và chốt FinFolio | Nhóm loại bỏ ý tưởng quét báo vì không khả thi, loại bỏ DCF vì quá đơn giản, sau đó chốt FinFolio cuối tuần 2. | Meeting Minutes Tuần 2; product brief; proposal Project Overview. |
| Tuần 3 | Workflow và phân rã công việc | Nhóm chốt workflow theo lane: Product/Input, Financial Logic, Prototype/UI, User Interaction, Integration, Feedback/Testing/Documentation. | Meeting Minutes Tuần 3; workflow diagram; prompt library. |
| Tuần 4 | Phát triển sản phẩm và nộp progress review | Nhóm phát triển frontend/backend/chart/simulation, chuẩn bị midterm review và nộp FinFolio Project Progress Review cuối tuần 4. | Meeting Minutes Tuần 4; `FinFolio_Project_Progress_Review`; source files `src/App.tsx`, `server.ts`, `src/types.ts`. |
| Tuần 5 | Nhận feedback sau demo 1 | Nhóm nhận feedback về dashboard quá nhiều metrics, thiếu giải thích Sharpe/drawdown, data API chưa ổn định, what-if cần giải thích scale weight, optimization dễ bị hiểu là advice. | Meeting Minutes Tuần 5; feedback log; issue/task list sau demo. |
| Tuần 6 | Nhận feedback sau demo 2 và hardening | Nhóm sửa UI hierarchy, tooltip, disclaimer, API/data handling, chart labels, loading/error states và chuẩn bị demo dataset. | Meeting Minutes Tuần 6; cập nhật giao diện và documentation. |
| Tuần 7 | Tuần cuối cùng | Nhóm hoàn thiện repo, README, group footprint, individual footprint, demo script, talk track và checklist nộp bài. | Meeting Minutes Tuần 7; README; GROUP_FOOTPRINT; Individual Footprints; final source package. |

### Phân công tổng quát theo thành viên

| Thành viên | Vai trò chính | Output chính dùng để đối chiếu |
|---|---|---|
| Phương | Product Planning + Input/Data Design | Problem statement, target user, MVP boundary, input schema, validation rules, data/API plan, sample data/fallback direction. |
| Ngọc | Financial Logic + Backend Calculation | Formula checklist, metrics logic, return/risk/benchmark/correlation/optimization logic, thresholds và explanation. |
| Hưng | UI/UX Design + Dashboard Visualization Plan | Wireframe, dashboard hierarchy, chart/table plan, tooltip direction, user flow từ input đến dashboard/simulation. |
| An Thái | Frontend Core Pages | Home, Portfolio Input, Dashboard layout, core state, form validation và page navigation. |
| Hải | Backend/Frontend Integration + Charts + Simulation | `/api/analyze` integration, metric cards, line chart/PnL chart, correlation matrix, what-if comparison table, optimization chart và demo script. |


## Điểm nhóm thấy làm tốt

1. **Chuyển được vấn đề tài chính thành logic sản phẩm rõ ràng**  
   Nhóm không chỉ tạo giao diện, mà xác định được chuỗi input -> data processing -> financial metrics -> dashboard -> user decision preparation.

2. **Có phân công role-output cụ thể**  
   Mỗi thành viên không chỉ có chức danh, mà có output gắn với sản phẩm: product brief, formula logic, UI plan, frontend pages, backend integration, charts, simulation và documentation.

3. **Có workflow và meeting minutes làm bằng chứng quá trình**  
   Meeting minutes 7 tuần cho thấy nhóm đi từ pain point, lựa chọn ý tưởng, workflow, development, feedback iteration đến final submission.

4. **Có nhiều tầng output để demo**  
   Sản phẩm có dashboard metrics, benchmark chart, correlation matrix, what-if simulation, optimization và AI-supported explanation, giúp demo có câu chuyện rõ ràng.

5. **Có nhận thức về rủi ro của financial advice**  
   Nhóm phân biệt rõ historical analysis với investment advice và đưa disclaimer vào các phần nhạy cảm như optimization và AI commentary.

6. **Có kế hoạch xử lý data reliability**  
   Nhóm nhận ra rủi ro API/ticker Việt Nam từ sớm và chuẩn bị hướng fallback bằng ticker guidance hoặc dataset mẫu.

## Hạn chế hiện tại

1. **Dữ liệu công khai chưa luôn ổn định**  
   Một số mã chứng khoán Việt Nam hoặc benchmark có thể không trả đủ dữ liệu từ API, gây lỗi khi phân tích. Cần dataset mẫu ổn định cho demo và unit test dữ liệu.

2. **Kết quả chỉ dựa trên lịch sử**  
   CAGR, volatility, Sharpe, drawdown, beta, alpha và optimization đều dựa trên dữ liệu quá khứ. Sản phẩm không dự báo tương lai và không bảo đảm danh mục tối ưu sẽ tốt hơn trong tương lai.

3. **Optimization có nguy cơ overfitting**  
   Tỷ trọng tối ưu trong quá khứ có thể chỉ phù hợp với giai đoạn dữ liệu đã chọn. Cần kiểm thử out-of-sample, rolling window hoặc ràng buộc thực tế hơn nếu phát triển tiếp.

4. **Chưa tính phí, thuế, thanh khoản, cổ tức và slippage đầy đủ**  
   Kết quả backtest có thể lạc quan hơn thực tế vì chưa mô hình hóa các chi phí và ràng buộc giao dịch.

5. **AI analysis phụ thuộc API key và prompt control**  
   Phần AI chỉ hoạt động đầy đủ khi có Gemini API key. Ngoài ra cần kiểm soát wording để tránh câu chữ quá giống khuyến nghị đầu tư.

6. **Prototype chưa phải production system**  
   Sản phẩm chưa có account system, database bền vững, phân quyền, bảo mật production, monitoring hoặc test coverage đầy đủ.

7. **Dashboard có thể vẫn còn nhiều thông tin với người mới**  
   Dù đã có cải thiện hierarchy, người dùng beginner vẫn có thể cần thêm tooltip, hướng dẫn từng bước và ví dụ diễn giải.

## Điều nhóm học được

1. **Hiểu vấn đề trước khi code quan trọng hơn chọn công nghệ**  
   Tuần 1 và tuần 2 giúp nhóm nhận ra một ý tưởng nghe hay chưa chắc phù hợp. Phải chọn vấn đề có người dùng, input, logic, output và demo rõ.

2. **Finance logic cần được giải thích đơn giản**  
   Một dashboard nhiều chỉ số không đủ tốt nếu người dùng không hiểu Sharpe, drawdown, volatility hoặc correlation nghĩa là gì. Nhóm học cách viết giải thích ngắn, tooltip và disclaimer.

3. **Dữ liệu là phần rủi ro lớn của sản phẩm tài chính**  
   API có thể thiếu dữ liệu, đổi format hoặc lỗi ticker. Nhóm học rằng cần fallback, sample dataset và kiểm tra dữ liệu trước demo.

4. **Làm việc nhóm cần handoff rõ**  
   Frontend cần biết backend trả field nào; backend cần biết dashboard cần dữ liệu nào; UI cần biết financial logic để trình bày đúng. Workflow và meeting minutes giúp giảm hiểu nhầm.

5. **Demo cần kể được câu chuyện sản phẩm**  
   Nhóm học cách demo theo flow: pain point -> input -> processing -> output -> what-if -> limitation. Điều này quan trọng hơn chỉ mở từng màn hình.

6. **AI hữu ích nhưng cần kiểm soát**  
   AI hỗ trợ ideation, UI refinement, code hướng dẫn và explanation, nhưng nhóm phải review công thức, sửa wording và không để AI trở thành người ra quyết định đầu tư.

7. **Quản lý thời gian cần chia theo tuần**  
   Vì thời gian môn học ngắn, nhóm phải chốt ý tưởng cuối tuần 2, workflow tuần 3, nộp review tuần 4, nhận feedback tuần 5-6 và hoàn thiện tuần 7.

## Gợi ý cho khóa sau

1. **Đừng chốt ý tưởng mà chưa tìm hiểu kỹ**  
   Hãy kiểm tra sớm xem ý tưởng có finance logic rõ, input-output rõ và demo được không. Nếu ý tưởng phụ thuộc quá nhiều vào dữ liệu khó kiểm soát, nên cân nhắc lại.

2. **Bắt đầu từ sample dataset trước khi gọi API thật**  
   API giúp sản phẩm sống động hơn, nhưng dataset mẫu giúp demo ổn định. Nên có cả hai: dữ liệu mẫu để đảm bảo demo và API để thể hiện khả năng mở rộng.

3. **Viết formula checklist sớm**  
   Với sản phẩm tài chính, công thức sai sẽ làm mất độ tin cậy. Nên có bảng công thức, giải thích và test bằng ví dụ nhỏ trước khi code dashboard.

4. **Giữ MVP gọn**  
   Dashboard, simulation, optimization, AI explanation đều hấp dẫn, nhưng nếu quá rộng sẽ khó hoàn thiện. Nên ưu tiên một core flow thật chắc trước.

5. **Đừng bỏ qua UX cho người mới**  
   Người dùng beginner không chỉ cần số liệu, họ cần biết số đó tốt hay xấu, vì sao quan trọng và giới hạn của nó là gì.

6. **Luôn ghi meeting minutes và evidence**  
   Cuối kỳ giảng viên không chỉ nhìn sản phẩm, mà còn hỏi ai làm gì và vì sao làm như vậy. Meeting minutes, screenshots, file map, commit hoặc task log giúp trả lời chắc hơn.

7. **Không đưa secret lên GitHub**  
   Nếu dùng API key, token hoặc mật khẩu, hãy dùng `.env.local` ở máy cá nhân và `.gitignore`. Trước khi public repo phải kiểm tra lại toàn bộ file.

8. **Chuẩn bị demo script trước ngày thi**  
   Nên có một bộ input mẫu, expected output, câu giải thích từng màn hình và phương án dự phòng nếu API lỗi.
