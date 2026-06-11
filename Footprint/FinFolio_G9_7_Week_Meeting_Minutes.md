**FINFOLIO**

**Meeting Minutes\
7 Tuần Thực Hiện Dự Án**

**Project: FinFolio - Portfolio Insight & Optimizer**

Môn học: Technology Applications in Finance and Banking, NHA408E

Group members: Phương, Ngọc, Hưng, An Thái, Hải

  -----------------------------------------------------------------------
  **Nội dung**  **Mô tả**
  ------------- ---------------------------------------------------------
  Mục đích tài  Ghi lại 7 biên bản họp theo tuần để thể hiện quá trình
  liệu          phát triển dự án và nhiệm vụ được phân công cho từng
                thành viên.

  Căn cứ xây    Workflow công việc nhóm, project proposal/pitch deck,
  dựng          progress review nộp cuối tuần 4 và source package của dự
                án FinFolio.

  Ghi chú thời  Tài liệu ghi theo Tuần 1-Tuần 7 vì chưa có ngày họp cụ
  gian          thể; có thể thay bằng ngày thực tế nếu giảng viên yêu
                cầu.
  -----------------------------------------------------------------------

**Document map**

  -----------------------------------------------------------------------------
  **\#**   **Phần**         **Mục đích**
  -------- ---------------- ---------------------------------------------------
  1        Tóm tắt phân     Ma trận ngắn để giảng viên thấy từng thành viên làm
           công theo tuần   gì ở mỗi tuần.

  2        Meeting Minutes  Biên bản đầy đủ gồm mục tiêu, agenda, thảo luận,
           Tuần 1-7         quyết định, task table, rủi ro và next focus.

  3        Phụ lục          Workflow evidence và bảng role-output cuối cùng.
  -----------------------------------------------------------------------------

# 1. Tóm tắt phân công nhiệm vụ theo 7 tuần

Bảng này giúp nhìn nhanh trách nhiệm của từng thành viên theo từng tuần.
Các biên bản chi tiết nằm ở phần 2.

  ----------------------------------------------------------------------------------------------------------------------------------------------
  **Tuần**   **Trọng     **Phương**        **Ngọc**                      **Hưng**             **An Thái**             **Hải**
             tâm**                                                                                                    
  ---------- ----------- ----------------- ----------------------------- -------------------- ----------------------- --------------------------
  Tuần 1     Xác định    Dẫn dắt nghiên    Liệt kê các quyết định tài    Ghi nhận khó khăn UX Khảo sát khả năng dựng  Kiểm tra hướng dữ
             user pain   cứu vấn đề, phác  chính người dùng cần hỗ trợ;  của người mới: không prototype web và luồng  liệu/API, benchmark và khả
             point       thảo nhóm người   xác định cần metric return,   hiểu số liệu, không  Home/Input/Dashboard.   năng tính toán backend.
                         dùng cá           risk, diversification,        biết đọc dashboard                           
                         nhân/finance      benchmark.                    tài chính.                                   
                         students và pain                                                                             
                         point                                                                                        
                         portfolio-level                                                                              
                         risk.                                                                                        

  Tuần 2     Tiếp tục    So sánh các ý     Đánh giá DCF quá đơn điệu; đề Vẽ user journey và   Tìm công cụ AI web      Kiểm tra dữ liệu
             chọn ý      tưởng: quét báo,  xuất logic tài chính đủ sâu   dashboard sơ bộ sau  builder/Reflex và xác   historical price, VN-Index
             tưởng và    DCF, portfolio    cho FinFolio.                 khi loại bỏ ý tưởng  định cấu trúc trang     proxy,
             chốt        dashboard; hoàn                                 không khả thi.       prototype.              Yahoo/Vietstock/VNDIRECT
             FinFolio    thiện product                                                                                fallback.
                         brief cho                                                                                    
                         FinFolio.                                                                                    

  Tuần 3     Workflow và Viết PRD ngắn,    Viết formula checklist,       Thiết kế wireframe,  Dựng prototype UI ban   Thiết kế /api/analyze
             phân rã     input schema,     metric logic, common errors   dashboard hierarchy, đầu: Home, Portfolio    response schema và plan
             công việc   validation rules  và financial engine spec.     chart/table plan và  Input, Dashboard,       kết nối frontend-backend.
                         và MVP boundary.                                user flow.           Evaluation, Simulation, 
                                                                                              Optimization.           

  Tuần 4     Phát triển  Hoàn thiện        Hoàn thiện logic daily        Tinh chỉnh UI        Code core pages,        Kết nối API, metric cards,
             sản phẩm và input/data plan,  return, CAGR, volatility,     dashboard, tooltips, state/form validation   line chart, asset table,
             nộp         sample ticker/API Sharpe, drawdown,             layout và visual     và khung dashboard.     correlation matrix,
             progress    hoặc CSV          correlation, beta/alpha.      evidence cho review.                         what-if table; tổng hợp
             review      fallback; viết                                                                               review nộp cuối tuần.
                         phần product/MVP                                                                             
                         trong review.                                                                                

  Tuần 5     Nhận        Tổng hợp feedback Sửa giải thích                Giảm overload trên   Sửa form nhập liệu,     Sửa lỗi integration/API,
             feedback    của giảng viên;   Sharpe/volatility/drawdown,   dashboard, thêm      thông báo lỗi,          giải thích việc rescale
             sau demo 1  ưu tiên giảm      kiểm tra công thức bằng       hierarchy, tooltip   responsive layout và    weight trong what-if
                         scope, làm rõ     manual sample.                và trạng thái        điều hướng.             simulation.
                         CSV/API fallback                                lỗi/loading.                                 
                         và input guide.                                                                              

  Tuần 6     Nhận        Chốt demo         Hoàn thiện thresholds,        Polish UI, chart     Code cleanup, build     Tối ưu xử lý dữ liệu/API,
             feedback    dataset,          disclaimer, optimization      labels, screen       test, fix               cải thiện before-after
             sau demo 2  acceptance        assumptions và Q&A về công    consistency,         navigation/state bugs.  optimization chart,
             và          checklist và cách thức.                         mobile/responsive.                           Gemini/rule-based AI
             hardening   nói "historical                                                                              explanation fallback.
                         analysis, not                                                                                
                         advice".                                                                                     

  Tuần 7     Tuần cuối - Chuẩn bị talk     Chuẩn bị talk track finance   Chuẩn bị             Chuẩn bị demo các trang Đóng gói source, demo
             hoàn thiện  track phần        logic; kiểm tra số liệu và    screenshot/mockup    chính và kiểm tra build script, final
             nộp bài     problem, user,    câu hỏi phản biện.            cuối và giải thích   chạy được.              documentation, workflow
                         MVP, scope; kiểm                                UX decisions.                                evidence và checklist
                         tra tài liệu nộp.                                                                            submit.
  ----------------------------------------------------------------------------------------------------------------------------------------------

# 

# 2. Meeting Minutes chi tiết theo tuần

Mỗi biên bản được viết theo cấu trúc thống nhất: thông tin cuộc họp,
agenda, nội dung thảo luận, quyết định, phân công nhiệm vụ, rủi ro và
trọng tâm tiếp theo.

# Meeting Minutes - Tuần 1: Xác định user pain point và phạm vi vấn đề tài chính

  -----------------------------------------------------------------------
  **Thông     **Nội dung**
  tin**       
  ----------- -----------------------------------------------------------
  Project     FinFolio - Portfolio Insight & Optimizer

  Thời gian   Tuần 1 của dự án

  Thành phần  Phương, Ngọc, Hưng, An Thái, Hải
  tham dự     

  Chủ trì     Phương

  Người ghi   Hải
  biên bản    

  Mục tiêu    Hiểu vấn đề người dùng trước khi chọn giải pháp; xác định
  cuộc họp    nhóm người dùng, pain point, quyết định tài chính cần hỗ
              trợ và tiêu chí chọn ý tưởng.
  -----------------------------------------------------------------------

## Agenda

• Thống nhất cách làm việc nhóm, vai trò ban đầu và kênh trao đổi.

• Thảo luận các khó khăn của nhà đầu tư cá nhân khi theo dõi danh mục.

• Tách pain point thật khỏi các tính năng "nghe hay nhưng khó chứng minh
giá trị".

• Lập danh sách ý tưởng ban đầu để tiếp tục đánh giá ở tuần 2.

## Nội dung thảo luận chính

• Nhóm nhận thấy nhiều người chỉ nhìn từng cổ phiếu tăng/giảm mà không
hiểu chất lượng danh mục ở cấp portfolio: mức rủi ro, độ biến động,
tương quan, tỷ trọng tập trung và so sánh với benchmark.

• Người dùng mục tiêu ban đầu gồm individual investors, finance students
và beginner-to-intermediate investors. Nhóm thống nhất sản phẩm nên hỗ
trợ review và học tài chính, không phải hệ thống giao dịch thật.

• Các hướng ý tưởng ban đầu gồm: công cụ quét tin/báo tài chính, công cụ
định giá DCF đơn giản, và dashboard phân tích danh mục. Chưa chốt ý
tưởng trong tuần 1 vì cần kiểm tra tính khả thi và phản hồi giảng viên.

• Nhóm thống nhất tiêu chí chọn ý tưởng: phải có finance logic rõ, có
input-output cụ thể, có thể dựng prototype trong thời gian môn học, và
mỗi thành viên có đầu việc chứng minh được.

## Quyết định/Kết luận

• Pain point chính: nhà đầu tư khó tự đánh giá danh mục ở cấp tổng thể
bằng spreadsheet thủ công.

• Ý tưởng được ưu tiên khảo sát tiếp: portfolio analysis/optimizer vì có
đủ dữ liệu đầu vào, công thức tài chính, dashboard và khả năng demo.

• Tuần 2 sẽ tiếp tục rà soát các ý tưởng khác trước khi chốt chính thức.

## Phân công nhiệm vụ

  -------------------------------------------------------------------------------------
  **Thành   **Nhiệm vụ được phân công**    **Sản phẩm bàn      **Deadline**   **Trạng
  viên**                                   giao**                             thái**
  --------- ------------------------------ ------------------- -------------- ---------
  Phương    Dẫn dắt nghiên cứu user pain   Bảng pain point +   Trước họp tuần Hoàn
            point; viết nháp problem       persona + ghi chú   2              thành
            statement, target user và      vấn đề người dùng.                 
            persona.                                                          

  Ngọc      Liệt kê các quyết định tài     Danh sách finance   Trước họp tuần Hoàn
            chính mà người dùng cần hỗ     decision + metric   2              thành
            trợ; đề xuất nhóm metric       cần có.                            
            return/risk/diversification.                                      

  Hưng      Tổng hợp pain point về trải    Ghi chú UX pain     Trước họp tuần Hoàn
            nghiệm: người mới khó đọc số   point + ví dụ màn   2              thành
            liệu, dashboard tài chính      hình tham khảo.                    
            thường quá phức tạp.                                              

  An Thái   Khảo sát khả năng dựng         Danh sách trang     Trước họp tuần Hoàn
            prototype web và các trang có  prototype khả thi   2              thành
            thể demo trong MVP.            và luồng cơ bản.                   

  Hải       Kiểm tra khả năng lấy dữ liệu  Ghi chú technical   Trước họp tuần Hoàn
            lịch sử, benchmark và hướng    feasibility + rủi   2              thành
            backend/API cho các ý tưởng.   ro data/API.                       
  -------------------------------------------------------------------------------------

## Rủi ro/Vấn đề cần theo dõi

• Ý tưởng có thể quá rộng nếu vừa phân tích, vừa tối ưu, vừa AI
recommendation.

• Dữ liệu thị trường Việt Nam có thể không ổn định nếu phụ thuộc một
nguồn API duy nhất.

## Trọng tâm cho buổi họp tiếp theo

Đánh giá và loại bỏ ý tưởng chưa phù hợp; chọn một ý tưởng có finance
logic và khả năng demo rõ ràng.

# Meeting Minutes - Tuần 2: Tiếp tục lên ý tưởng, loại bỏ phương án chưa khả thi và chốt FinFolio

  -----------------------------------------------------------------------
  **Thông     **Nội dung**
  tin**       
  ----------- -----------------------------------------------------------
  Project     FinFolio - Portfolio Insight & Optimizer

  Thời gian   Tuần 2 của dự án

  Thành phần  Phương, Ngọc, Hưng, An Thái, Hải
  tham dự     

  Chủ trì     Phương

  Người ghi   Ngọc
  biên bản    

  Mục tiêu    So sánh các ý tưởng sau feedback ban đầu; chốt sản phẩm
  cuộc họp    cuối tuần 2 để chuyển sang workflow và PRD.
  -----------------------------------------------------------------------

## Agenda

• Review ba hướng ý tưởng: quét báo/tin tức tài chính, DCF, portfolio
dashboard.

• Ghi nhận phản hồi giảng viên về tính khả thi và độ sâu của từng ý
tưởng.

• Chọn ý tưởng cuối cùng và xác định tên, hướng MVP, sản phẩm đầu ra.

• Phân công chuẩn bị PRD, công thức, UI flow và feasibility technical
cho tuần 3.

## Nội dung thảo luận chính

• Ý tưởng "quét báo" bị đánh giá không phù hợp với phạm vi nhóm vì khó
kiểm soát nguồn dữ liệu, khó chứng minh logic tài chính, dễ lệch sang
NLP/news summarization thay vì ứng dụng finance-banking rõ ràng.

• Ý tưởng DCF được xem là quá đơn điệu và quá đơn giản cho một prototype
nhóm: người dùng không nhất thiết cần một công cụ chỉ nhập vài giả định
rồi ra valuation, đồng thời khó chia việc đều cho 5 thành viên.

• Nhóm chuyển trọng tâm sang FinFolio - Portfolio Insight & Optimizer:
người dùng nhập tickers, weights, benchmark, date range, risk-free rate;
hệ thống tính return/risk/benchmark/correlation, what-if simulation và
có thể tối ưu tỷ trọng.

• FinFolio được chọn vì có chuỗi logic rõ: user input -\> historical
data -\> financial calculations -\> charts/dashboard -\>
feedback/decision preparation.

## Quyết định/Kết luận

• Không tiếp tục ý tưởng quét báo vì không khả thi và khó bám rubric
finance-to-technology.

• Không chọn DCF vì scope quá hẹp, ít điểm công nghệ và ít nhu cầu cấp
thiết trong bối cảnh bài nhóm.

• Chốt ý tưởng cuối tuần 2: FinFolio - Portfolio Insight & Optimizer.

• MVP không phải trading platform và không đưa ra lời khuyên mua/bán
tuyệt đối; chỉ là historical analysis và decision-support prototype.

## Phân công nhiệm vụ

  -----------------------------------------------------------------------------------------
  **Thành   **Nhiệm vụ được phân      **Sản phẩm bàn giao**        **Deadline**   **Trạng
  viên**    công**                                                                thái**
  --------- ------------------------- ---------------------------- -------------- ---------
  Phương    Chuyển pain point thành   Product brief bản 1 + scope  Đầu tuần 3     Hoàn
            product brief: problem,   FinFolio.                                   thành
            target user, MVP                                                      
            boundary, feature ngoài                                               
            MVP.                                                                  

  Ngọc      So sánh độ sâu logic tài  Danh sách metric core + lý   Đầu tuần 3     Hoàn
            chính giữa DCF và         do chọn.                                    thành
            FinFolio; đề xuất metric                                              
            core cho portfolio                                                    
            dashboard.                                                            

  Hưng      Vẽ user journey sơ bộ:    User journey + layout idea.  Đầu tuần 3     Hoàn
            nhập danh mục -\> xem                                                 thành
            dashboard -\> mô phỏng                                                
            -\> đánh giá.                                                         

  An Thái   Tìm công cụ AI web        Ghi chú công cụ + đề xuất    Đầu tuần 3     Hoàn
            builder/Reflex và kiểm    stack UI.                                   thành
            tra khả năng tạo                                                      
            prototype nhiều trang.                                                

  Hải       Kiểm tra khả năng lấy     Feasibility note về          Đầu tuần 3     Hoàn
            historical price,         Yahoo/Vietstock/VNDIRECT +                  thành
            benchmark proxy và thiết  API sơ bộ.                                  
            kế API response cho                                                   
            dashboard.                                                            
  -----------------------------------------------------------------------------------------

## Rủi ro/Vấn đề cần theo dõi

• FinFolio có thể quá rộng nếu giữ tất cả: dashboard, AI explanation,
simulation, optimization.

• Cần phân biệt "analysis" và "recommendation" để tránh hiểu nhầm là tư
vấn đầu tư.

## Trọng tâm cho buổi họp tiếp theo

Tạo workflow chính thức, PRD, prompt library và phân công từng lane theo
thành viên.

# Meeting Minutes - Tuần 3: Xây dựng workflow, PRD, input schema, financial logic và prototype plan

  -----------------------------------------------------------------------
  **Thông     **Nội dung**
  tin**       
  ----------- -----------------------------------------------------------
  Project     FinFolio - Portfolio Insight & Optimizer

  Thời gian   Tuần 3 của dự án

  Thành phần  Phương, Ngọc, Hưng, An Thái, Hải
  tham dự     

  Chủ trì     Phương và Ngọc

  Người ghi   Hưng
  biên bản    

  Mục tiêu    Biến ý tưởng FinFolio thành workflow công việc rõ ràng theo
  cuộc họp    lane: Product/Input, Financial Logic, Prototype/UI, User
              Interaction, Backend/Frontend Integration,
              Feedback/Documentation.
  -----------------------------------------------------------------------

## Agenda

• Chuyển product brief thành PRD ngắn và MVP definition.

• Xác định input schema: tickers, weights, benchmark, start/end date,
risk-free rate, optional scenario/optimization inputs.

• Thiết kế financial logic: return, volatility, Sharpe, drawdown,
benchmark, correlation, simulation, optimization.

• Vẽ workflow và handoff giữa các thành viên để tránh trùng việc.

## Nội dung thảo luận chính

• Workflow chia theo lane: Phương phụ trách Product Planning & Input
Design; Ngọc phụ trách Financial Logic; An Thái + Hưng phụ trách
Prototype & UI; User lane mô tả điểm người dùng nhập portfolio/chọn
optimization; Hải + Phương phụ trách Backend/Frontend Integration; cả
nhóm phụ trách Feedback, Testing & Documentation.

• Nhóm thống nhất mỗi prompt/output phải có sản phẩm bàn giao rõ:
product brief, PRD, input schema, formula table, financial engine spec,
prototype UI, API response, dashboard components, simulation,
optimization, feedback log và final documentation.

• Input schema phải có validation: ticker không rỗng, weight hợp lệ/tổng
100%, date range đủ dài, benchmark hợp lệ, risk-free rate có giá trị mặc
định.

• Financial logic cần giải thích đơn giản để giảng viên thấy mối liên hệ
giữa bài toán tài chính và giải pháp công nghệ.

## Quyết định/Kết luận

• Workflow được chốt làm bằng chứng tổ chức công việc cho nhóm.

• MVP gồm: input form, data fetch/CSV fallback, calculation module,
metric cards, chart, correlation matrix, what-if simulation, optional
constrained optimization, disclaimer.

• Từ tuần 4 bắt đầu phát triển sản phẩm và chuẩn bị progress review.

## Phân công nhiệm vụ

  --------------------------------------------------------------------------------
  **Thành   **Nhiệm vụ được phân      **Sản phẩm bàn      **Deadline**   **Trạng
  viên**    công**                    giao**                             thái**
  --------- ------------------------- ------------------- -------------- ---------
  Phương    Viết PRD 1-2 trang; thiết PRD + input         Trong tuần 3   Hoàn
            kế input schema và        schema + validation                thành
            validation rules; xác     checklist.                         
            định MVP boundary.                                           

  Ngọc      Viết formula table và     Formula checklist + Trong tuần 3   Hoàn
            financial checklist:      financial engine                   thành
            daily return, portfolio   spec.                              
            return, CAGR, volatility,                                    
            Sharpe, drawdown,                                            
            beta/alpha, tracking                                         
            error, correlation.                                          

  Hưng      Thiết kế                  Mockup UI +         Trong tuần 3   Hoàn
            wireframe/dashboard       dashboard layout.                  thành
            hierarchy, chart/table                                       
            plan, tooltip plan và                                        
            user flow.                                                   

  An Thái   Dựng prototype UI ban đầu Prototype screens + Cuối tuần 3    Đang phát
            bằng React/Tailwind:      main frontend                      triển
            Home, Portfolio Input,    pages.                             
            Dashboard, Evaluation,                                       
            Simulation, Optimization.                                    

  Hải       Thiết kế API response     API schema +        Cuối tuần 3    Hoàn
            /api/analyze; xác định dữ integration plan.                  thành
            liệu cần trả về cho                                          
            metric cards, line chart,                                    
            asset table, correlation                                     
            matrix.                                                      
  --------------------------------------------------------------------------------

## Rủi ro/Vấn đề cần theo dõi

• Nếu không có handoff rõ, frontend có thể thiếu field từ backend hoặc
backend trả dữ liệu không dùng được cho dashboard.

• Một số metric nâng cao có thể gây quá tải cho beginner users; cần
hierarchy và tooltip.

## Trọng tâm cho buổi họp tiếp theo

Code prototype, nối frontend-backend, chuẩn bị evidence cho progress
review nộp cuối tuần 4.

# Meeting Minutes - Tuần 4: Phát triển sản phẩm và hoàn thiện midterm progress review

  -----------------------------------------------------------------------
  **Thông     **Nội dung**
  tin**       
  ----------- -----------------------------------------------------------
  Project     FinFolio - Portfolio Insight & Optimizer

  Thời gian   Tuần 4 của dự án

  Thành phần  Phương, Ngọc, Hưng, An Thái, Hải
  tham dự     

  Chủ trì     Hải

  Người ghi   Phương
  biên bản    

  Mục tiêu    Tạo bản prototype có thể demo và nộp progress review cuối
  cuộc họp    tuần 4, chứng minh product logic, financial logic, workflow
              và trách nhiệm từng thành viên.
  -----------------------------------------------------------------------

## Agenda

• Review tiến độ code frontend, backend, chart và simulation.

• Kiểm tra công thức tính toán và dữ liệu lịch sử.

• Chuẩn bị progress review: project overview, logic chain,
input-financial logic-output, MVP, evidence, role-output map, feedback
questions.

• Chốt nội dung nộp cuối tuần 4 và đầu việc sau midterm.

## Nội dung thảo luận chính

• Prototype/source package đã có hướng React/Vite frontend, Express
backend, TypeScript data types, chart components, financial calculation
logic, historical data source hoặc CSV fallback plan, và Gemini/Google
AI Studio support cho phần giải thích.

• Nhóm chuẩn bị evidence theo ba nhóm: product logic flow,
prototype/code structure và role-output map. Các file/code được liên hệ
với output: App.tsx quản lý tab/state/dashboard; PortfolioForm.tsx xử lý
input; server.ts xử lý API/financial calculations; types.ts định nghĩa
dữ liệu; MetricCard.tsx hiển thị chỉ số.

• Progress review cần làm rõ FinFolio là công cụ phân tích lịch sử và
học tài chính, không phải trading platform hoặc lời khuyên đầu tư tuyệt
đối.

• Nội dung review cuối tuần 4 phải thể hiện mọi thành viên có output cụ
thể, không chỉ ghi vai trò chung.

## Quyết định/Kết luận

• Nộp "FinFolio - Midterm Project Progress Review" vào cuối tuần 4.

• Giữ scope midterm ở mức prototype: dashboard metrics, benchmark
comparison, correlation, simulation, optional optimization, AI
explanation dạng hỗ trợ.

• Ghi lại feedback questions cho giảng viên: scope có quá rộng không,
financial logic có rõ không, data input strategy có ổn không, cách tránh
investment advice.

## Phân công nhiệm vụ

  --------------------------------------------------------------------------------
  **Thành   **Nhiệm vụ được phân      **Sản phẩm bàn      **Deadline**   **Trạng
  viên**    công**                    giao**                             thái**
  --------- ------------------------- ------------------- -------------- ---------
  Phương    Hoàn thiện product brief, Phần Product        Cuối tuần 4    Đã nộp
            problem/user/MVP scope,   Overview, MVP,                     
            input structure,          input/data plan.                   
            benchmark/data-source                                        
            plan và phần product                                         
            trong review.                                                

  Ngọc      Hoàn thiện formula list   Formula table +     Cuối tuần 4    Đã nộp
            và calculation logic cho  financial logic                    
            return, CAGR, volatility, section.                           
            Sharpe, drawdown,                                            
            correlation, beta/alpha                                      
            và evaluation rules.                                         

  Hưng      Chuẩn hóa dashboard       UI mockup +         Cuối tuần 4    Đã nộp
            layout, wireframe,        dashboard                          
            chart/table plan và UI    visualization plan.                
            evidence cho                                                 
            proposal/review.                                             

  An Thái   Code core frontend pages: Frontend core       Cuối tuần 4    Đang hoàn
            Home, Portfolio Input,    pages + input form.                thiện sau
            Dashboard layout, state                                      review
            và validation cơ bản.                                        

  Hải       Kết nối backend/frontend: Integrated          Cuối tuần 4    Đã nộp
            /api/analyze, metric      prototype + review                 
            cards, line chart, asset  document.                          
            table, correlation                                           
            matrix, what-if                                              
            comparison; tổng hợp                                         
            review file.                                                 
  --------------------------------------------------------------------------------

## Rủi ro/Vấn đề cần theo dõi

• API có thể lỗi ticker hoặc thiếu dữ liệu lịch sử, cần CSV/sample
fallback.

• Optimization và AI analysis có nguy cơ bị hiểu nhầm là khuyến nghị đầu
tư; cần disclaimer rõ.

## Trọng tâm cho buổi họp tiếp theo

Demo để nhận feedback, sau đó sửa UI/UX, data reliability, error
handling, formula validation và disclaimer.

# Meeting Minutes - Tuần 5: Nhận feedback sau demo 1 và chuyển feedback thành task sửa sản phẩm

  -----------------------------------------------------------------------
  **Thông     **Nội dung**
  tin**       
  ----------- -----------------------------------------------------------
  Project     FinFolio - Portfolio Insight & Optimizer

  Thời gian   Tuần 5 của dự án

  Thành phần  Phương, Ngọc, Hưng, An Thái, Hải
  tham dự     

  Chủ trì     Hưng và Hải

  Người ghi   An Thái
  biên bản    

  Mục tiêu    Phân loại feedback sau demo thành bugs, finance-logic
  cuộc họp    issues, UI/UX issues, data/API issues và risk/disclaimer
              issues; phân công sprint sửa lỗi.
  -----------------------------------------------------------------------

## Agenda

• Tổng hợp nhận xét của giảng viên sau demo.

• Phân loại feedback theo mức độ ưu tiên và người phụ trách.

• Chốt các sửa đổi bắt buộc trước demo tiếp theo.

• Cập nhật feedback log và acceptance criteria.

## Nội dung thảo luận chính

• Giảng viên góp ý dashboard đang có nhiều metric, có thể làm người mới
khó hiểu. Nhóm cần ưu tiên vài chỉ số chính trước, đưa metric nâng cao
xuống phần chi tiết hoặc tooltip.

• Sharpe Ratio, Max Drawdown, VaR/CVaR, correlation cần được giải thích
bằng ngôn ngữ đơn giản, tránh để người dùng nhìn số nhưng không biết
tốt/xấu.

• Data/API với ticker Việt Nam có nguy cơ fail hoặc thiếu lịch sử. Nhóm
cần chuẩn bị ticker-format guidance và sample CSV/dataset fallback cho
demo.

• What-if simulation cần ghi rõ khi thêm ticker mới thì weight cũ được
scale lại để tổng bằng 100%, nếu không người dùng sẽ hiểu sai kết quả.

• Optimization output và AI explanation phải có nhãn "historical
simulation only", không dùng từ ngữ như buy/sell recommendation.

## Quyết định/Kết luận

• Cập nhật feedback log với owner và acceptance criteria.

• Ưu tiên cao: tooltip Sharpe/metric, API fallback, what-if rescale
note, investment-advice disclaimer.

• Mỗi thành viên phải sửa đúng phần của mình và chuẩn bị bằng chứng
trước demo tuần 6.

## Phân công nhiệm vụ

  -----------------------------------------------------------------------------------------------
  **Thành   **Nhiệm vụ được phân công**              **Sản phẩm bàn      **Deadline**   **Trạng
  viên**                                             giao**                             thái**
  --------- ---------------------------------------- ------------------- -------------- ---------
  Phương    Tổng hợp feedback, cập nhật MVP scope,   Feedback log +      Trước demo     Hoàn
            viết input guide/ticker-format guidance  input/data fallback tuần 6         thành
            và kế hoạch CSV fallback.                checklist.                         

  Ngọc      Validate công thức bằng sample thủ công; Manual formula      Trước demo     Hoàn
            viết giải thích                          check + metric      tuần 6         thành
            Sharpe/volatility/drawdown/correlation   explanation notes.                 
            bằng ngôn ngữ dễ hiểu.                                                      

  Hưng      Thiết kế lại hierarchy dashboard: key    UI/UX revision      Trước demo     Hoàn
            metrics trước, advanced details sau;     plan + mockup điều  tuần 6         thành
            thêm tooltip, labels và warning labels.  chỉnh.                             

  An Thái   Sửa form validation, loading/error       Frontend fixes +    Trước demo     Đang hoàn
            states, responsive layout và navigation  screenshots.        tuần 6         thiện
            theo UI plan.                                                               

  Hải       Sửa integration bugs, API error          Patched integrated  Trước demo     Đang hoàn
            handling, correlation matrix display,    prototype +         tuần 6         thiện
            what-if simulation note và before/after  simulation                         
            result table.                            explanation.                       
  -----------------------------------------------------------------------------------------------

## Rủi ro/Vấn đề cần theo dõi

• Nếu chỉ sửa giao diện mà không kiểm tra công thức, giảng viên có thể
hỏi sâu về financial logic.

• Nếu demo live API lỗi, nhóm cần có dataset mẫu để bảo đảm demo chạy
được.

## Trọng tâm cho buổi họp tiếp theo

Chạy demo lần 2 với bản đã sửa; kiểm tra data fallback, công thức, UI và
disclaimer.

# Meeting Minutes - Tuần 6: Nhận feedback sau demo 2, hardening sản phẩm và chuẩn bị final demo

  -----------------------------------------------------------------------
  **Thông     **Nội dung**
  tin**       
  ----------- -----------------------------------------------------------
  Project     FinFolio - Portfolio Insight & Optimizer

  Thời gian   Tuần 6 của dự án

  Thành phần  Phương, Ngọc, Hưng, An Thái, Hải
  tham dự     

  Chủ trì     Hải và Ngọc

  Người ghi   Phương
  biên bản    

  Mục tiêu    Ổn định prototype sau feedback; kiểm tra performance, data
  cuộc họp    reliability, formula correctness, UI polish, AI explanation
              và final demo readiness.
  -----------------------------------------------------------------------

## Agenda

• Review các lỗi còn lại sau demo 2.

• Kiểm tra luồng người dùng đầy đủ: input -\> analyze -\> dashboard -\>
simulation -\> optimization -\> AI explanation.

• Tối ưu tốc độ xử lý dữ liệu và fallback cho benchmark/ticker.

• Chuẩn bị final talk track và Q&A.

## Nội dung thảo luận chính

• Nhóm thống nhất bản cuối phải chứng minh một luồng xuyên suốt, không
chỉ là các màn hình rời rạc. Người dùng nhập portfolio, hệ thống trả
metric, chart, benchmark comparison, correlation, simulation và
optimization output.

• Hải cập nhật hướng xử lý dữ liệu song song thay vì tuần tự để giảm
thời gian chờ khi fetch nhiều mã. Cần giữ error message rõ khi ticker
không tìm thấy.

• Phương và Ngọc nhấn mạnh wording: "historical backtesting",
"simulation", "not financial advice", vì output tối ưu và AI analysis có
thể bị hiểu nhầm là khuyến nghị đầu tư.

• Hưng và An Thái tập trung làm UI rõ hơn: chart labels, tooltip, visual
hierarchy, loading/error states, responsive layout.

• Nhóm chuẩn bị thêm demo dataset để không phụ thuộc hoàn toàn vào live
API trong buổi final.

## Quyết định/Kết luận

• Chốt final feature set: Dashboard analysis, benchmark comparison,
correlation matrix, what-if simulation, constrained optimization,
AI/rule-based explanation.

• Chỉ trình bày optimization như exploratory allocation support, không
phải lời khuyên đầu tư.

• Tuần 7 sẽ tập trung final packaging, rehearsal và tài liệu nộp.

## Phân công nhiệm vụ

  --------------------------------------------------------------------------------
  **Thành   **Nhiệm vụ được phân      **Sản phẩm bàn      **Deadline**   **Trạng
  viên**    công**                    giao**                             thái**
  --------- ------------------------- ------------------- -------------- ---------
  Phương    Chốt demo dataset, input  Demo data + final   Đầu tuần 7     Hoàn
            guide, disclaimer wording checklist +                        thành
            và acceptance checklist   disclaimer text.                   
            cho final.                                                   

  Ngọc      Kiểm tra lại thresholds,  Final formula       Đầu tuần 7     Hoàn
            formula notes,            notes + Q&A sheet.                 thành
            in-sample/out-of-sample                                      
            explanation và Q&A                                           
            finance logic.                                               

  Hưng      Polish dashboard UI,      Final UI polish     Đầu tuần 7     Hoàn
            chart labels, tooltip,    screenshots.                       thành
            spacing, color-coded                                         
            evaluation và mobile                                         
            responsiveness.                                              

  An Thái   Code cleanup, route/page  Clean frontend      Đầu tuần 7     Hoàn
            navigation, state         build + bug                        thành
            handling, build test và   checklist.                         
            sửa lỗi form/loading.                                        

  Hải       Tối ưu API/fetch flow,    Stable integrated   Đầu tuần 7     Hoàn
            improve before-after      prototype + run                    thành
            optimization chart,       guide.                             
            simulation result table,                                     
            Gemini/rule-based AI                                         
            explanation fallback và                                      
            run instructions.                                            
  --------------------------------------------------------------------------------

## Rủi ro/Vấn đề cần theo dõi

• Performance/API timeout vẫn có thể xảy ra nếu dùng live data; phải có
fallback và demo scenario ổn định.

• Final presentation có thể bị quá dài nếu giải thích tất cả metric; cần
talk track rõ, ưu tiên metric chính.

## Trọng tâm cho buổi họp tiếp theo

Final rehearsal, nộp source package, tài liệu, proposal/review, workflow
evidence và meeting minutes.

# Meeting Minutes - Tuần 7: Tuần cuối: hoàn thiện deliverables, rehearsal và nộp bài

  -----------------------------------------------------------------------
  **Thông     **Nội dung**
  tin**       
  ----------- -----------------------------------------------------------
  Project     FinFolio - Portfolio Insight & Optimizer

  Thời gian   Tuần 7 của dự án

  Thành phần  Phương, Ngọc, Hưng, An Thái, Hải
  tham dự     

  Chủ trì     Cả nhóm

  Người ghi   Hải
  biên bản    

  Mục tiêu    Đóng gói toàn bộ sản phẩm, tài liệu và bằng chứng phân
  cuộc họp    công; thống nhất demo script và câu trả lời cho giảng viên.
  -----------------------------------------------------------------------

## Agenda

• Kiểm tra final prototype và source package.

• Review lại proposal, midterm review, workflow, feedback log và meeting
minutes.

• Chạy final demo rehearsal theo đúng talk track.

• Phân công người trình bày từng phần và checklist nộp bài.

## Nội dung thảo luận chính

• Nhóm review lại thông điệp chính: FinFolio giúp cá nhân/finance
students phân tích danh mục bằng historical data, metric tài chính,
benchmark comparison, correlation, simulation và optimization, không
thực hiện giao dịch thật.

• Phần trình bày được chia theo đóng góp cá nhân để giảng viên thấy
accountability: Phương trình bày problem/user/MVP/input; Ngọc trình bày
formulas và financial logic; Hưng trình bày UI/UX; An Thái trình bày
frontend flow; Hải trình bày backend integration, charts,
simulation/optimization và demo.

• Cả nhóm kiểm tra lại các bằng chứng: workflow diagram, project
proposal, progress review tuần 4, source package, feedback log và
meeting minutes 7 tuần.

• Nhóm thống nhất dùng demo dataset ổn định trước, sau đó có thể demo
live API nếu điều kiện cho phép.

## Quyết định/Kết luận

• Final submission bao gồm source package, proposal, progress review,
workflow evidence và file meeting minutes 7 tuần.

• Giữ wording cẩn trọng trong final demo: "historical analysis",
"backtest", "simulation", "not investment advice".

• Hoàn tất final rehearsal trước khi nộp để bảo đảm mọi thành viên nắm
phần trình bày của mình.

## Phân công nhiệm vụ

  ---------------------------------------------------------------------------------
  **Thành   **Nhiệm vụ được phân       **Sản phẩm bàn      **Deadline**   **Trạng
  viên**    công**                     giao**                             thái**
  --------- -------------------------- ------------------- -------------- ---------
  Phương    Chuẩn bị phần trình bày    Talk track mở đầu + Ngày nộp cuối  Hoàn
            problem, target user, user product/MVP slides                 thành
            pain point, MVP scope,     notes.                             
            input schema và product                                       
            decisions.                                                    

  Ngọc      Chuẩn bị phần trình bày    Finance Q&A sheet + Ngày nộp cuối  Hoàn
            financial logic, công      formula notes.                     thành
            thức, interpretation                                          
            rules, limitations và câu                                     
            hỏi phản biện.                                                

  Hưng      Chuẩn bị phần trình bày    UI/UX talk track +  Ngày nộp cuối  Hoàn
            UI/UX, dashboard           screenshots.                       thành
            hierarchy, before/after                                       
            feedback changes và                                           
            screenshot evidence.                                          

  An Thái   Chuẩn bị demo frontend:    Frontend demo       Ngày nộp cuối  Hoàn
            Home, Portfolio Input,     checklist.                         thành
            Dashboard layout,                                             
            validation/loading/error                                      
            states.                                                       

  Hải       Đóng gói source, kiểm tra  Source package +    Ngày nộp cuối  Hoàn
            npm run dev/build, demo    final demo script +                thành
            /api/analyze, charts,      handoff log.                       
            simulation, optimization,                                     
            AI explanation và final                                       
            documentation.                                                
  ---------------------------------------------------------------------------------

## Rủi ro/Vấn đề cần theo dõi

• Nếu final demo bị lỗi live API, chuyển ngay sang scenario fallback và
giải thích data limitation.

• Nếu giảng viên hỏi scope quá rộng, nhóm cần trả lời rằng MVP core là
input + metrics + dashboard; simulation/optimization là extension trong
prototype.

## Trọng tâm cho buổi họp tiếp theo

Nộp bài và chuẩn bị trả lời câu hỏi sau final presentation.

# 3. Phụ lục A - Workflow công việc nhóm

Workflow thể hiện các lane công việc chính: Product Planning & Input
Design, Financial Logic, Prototype & UI, User Interaction,
Backend/Frontend Integration, Feedback/Testing/Documentation.

![](./image1.jpeg){width="10.4in" height="5.789062773403325in"}

**\
**

**Tóm tắt lane theo workflow:**

  -----------------------------------------------------------------------
  **Lane**              **Nội dung**
  --------------------- -------------------------------------------------
  Phương - Product      Prompt 01-03: product idea, PRD, input
  Planning & Input      schema/validation. Prompt 10: đưa optimization
  Design                vào app flow.

  Ngọc - Financial      Prompt 04/07/10: công thức, daily return,
  Logic                 portfolio return, benchmark return, metrics,
                        optimization logic.

  An Thái + Hưng -      Prompt 05-06: prototype pages, screenshot-based
  Prototype & UI        UI/UX review, React/TypeScript/Tailwind layout.

  User - End User       User enters portfolio; user selects optimization
  Interaction           objective.

  Hải + Phương -        Prompt 07-10: /api/analyze, dashboard components,
  Backend/Frontend      simulation, optimization display.
  Integration           

  Whole Team -          Prompt 11-12: classify feedback, prepare final
  Feedback, Testing &   workflow documentation and talk track.
  Documentation         
  -----------------------------------------------------------------------

# 4. Phụ lục B - Bảng role-output cuối cùng theo thành viên

Bảng này dùng để đối chiếu trách nhiệm xuyên suốt 7 tuần với sản phẩm
bàn giao cuối cùng.

  ---------------------------------------------------------------------------------------------------------------
  **Thành   **Vai trò       **Output chính**                                                **Đóng góp theo giai
  viên**    chính**                                                                         đoạn**
  --------- --------------- --------------------------------------------------------------- ---------------------
  Phương    Product +       Product brief; PRD; input schema; validation rules;             Tuần 1-2: pain
            Data/API        benchmark/data-source plan; CSV/API fallback; product/MVP       point/idea; Tuần 3:
                            documentation.                                                  PRD/input; Tuần 4:
                                                                                            review; Tuần 5-7:
                                                                                            feedback, final input
                                                                                            guide, talk track.

  Ngọc      Financial       Formula checklist; daily return/portfolio                       Tuần 1-2: finance
            Logic + Backend return/CAGR/volatility/Sharpe/drawdown/correlation/beta/alpha   feasibility; Tuần 3:
            Calculation     logic; optimization objective/constraints.                      formula; Tuần 4:
                                                                                            calculation logic;
                                                                                            Tuần 5-7: validation,
                                                                                            thresholds, Q&A.

  Hưng      UI/UX Design +  Wireframe; dashboard layout; user flow; chart/table hierarchy;  Tuần 1-2: UX
            Dashboard       tooltip and UX improvement plan.                                pain/user journey;
            Visualization                                                                   Tuần 3: wireframe;
            Plan                                                                            Tuần 4: UI evidence;
                                                                                            Tuần 5-7: UI polish
                                                                                            and final
                                                                                            screenshots.

  An Thái   Frontend Core   Home page; Portfolio Input page; Dashboard layout; state        Tuần 2-3: prototype
            Pages           handling; validation; loading/error states; responsive layout.  setup; Tuần 4: core
                                                                                            pages; Tuần 5-7: bug
                                                                                            fixes, build test,
                                                                                            final frontend demo.

  Hải       Frontend        API integration; metric cards; PnL/performance chart; asset     Tuần 1-2: data/API
            Chart + Backend table; correlation matrix; what-if simulation; optimization;    feasibility; Tuần 3:
            Integration     final demo script.                                              API schema; Tuần 4:
                                                                                            integration; Tuần
                                                                                            5-7: bug fixes,
                                                                                            optimization,
                                                                                            packaging.
  ---------------------------------------------------------------------------------------------------------------

# 

# 5. Checklist nộp bài cuối cùng

  --------------------------------------------------------------------------
  **Hạng mục**     **Bằng chứng/ghi chú**                          **Trạng
                                                                   thái**
  ---------------- ----------------------------------------------- ---------
  Workflow         Có workflow diagram và prompt/output map.       Done
  evidence                                                         

  Project          Mô tả project overview, product                 Done
  proposal/pitch   characteristics, logic chain, financial logic,  
  deck             MVP và questions for feedback.                  

  Midterm progress Đã nộp cuối tuần 4; có project logic,           Done
  review           input-output, MVP, current evidence, individual 
                   outputs và next steps.                          

  Source package   Có React/Vite frontend, Express backend,        Done
                   TypeScript types, dashboard components,         
                   simulation/optimization và AI explanation       
                   support.                                        

  Meeting minutes  File Word này ghi rõ phân công nhiệm vụ theo    Done
  7 tuần           từng tuần và từng thành viên.                   

  Final demo       Có kịch bản demo input -\> analyze -\>          Done
  script           dashboard -\> simulation -\> optimization -\>   
                   AI explanation.                                 
  --------------------------------------------------------------------------
