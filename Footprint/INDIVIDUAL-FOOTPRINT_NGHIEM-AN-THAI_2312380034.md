**INDIVIDUAL FOOTPRINT**

FinFolio - Portfolio Insight & Optimizer

Ứng dụng công nghệ trong Tài chính Ngân hàng - NHA408E \| Nhóm 9

**1. Thông tin thành viên**

  -----------------------------------------------------------------------
  **Họ và tên**      Nghiêm An Thái
  ------------------ ----------------------------------------------------
  **Mã sinh viên**   2312380034

  **Môn học**        Ứng dụng công nghệ trong Tài chính Ngân hàng -
                     NHA408E

  **Nhóm**           Nhóm 9

  **Vai trò**        Frontend Core Pages
  -----------------------------------------------------------------------

**2. Vai trò trong dự án**

**2.1 Vai trò được phân công**

Vai trò của tôi là Frontend Core Pages, người xây dựng toàn bộ các màn
hình mà người dùng thực sự nhìn thấy và tương tác, bao gồm trang giới
thiệu, form nhập danh mục, layout dashboard, và các trang phân tích mở
rộng (Đánh giá, Mô phỏng, Tối ưu hóa). Vai trò này kết nối người dùng
với sản phẩm của tất cả các thành viên còn lại trong nhóm.

**2.2 Vị trí trong workflow nhóm**

  ----------------------------------------------------------------------------
  **Thành   **Vai trò**   **Input cho tôi**  **Output của tôi**     **Flow**
  viên**                                                            
  --------- ------------- ------------------ ---------------------- ----------
  Minh      Product +     User story, quy    Form hoạt động đúng    → tôi
  Phương    Data          tắc input, phạm vi theo yêu cầu của       
                          MVP                Phương                 

  Minh Ngọc Logic tài     Cấu trúc API       Màn hình hiển thị đúng → tôi
            chính +       response, các      các field đó           
            Backend       field chỉ số                              

  Thai Hưng UI/UX Design  Wireframe, layout, Các trang tuân theo    → tôi
                          visual hierarchy   thiết kế của Hưng      

  **An      **Frontend    ---                Form nhập + layout     tôi →
  Thái**    Core Pages**                     dashboard              

  Thanh Hải Charts +      ---                Dashboard UI + data    tôi → Hải
            Integration                      cho chart components   
                                             của Hải                
  ----------------------------------------------------------------------------

**3. Dấu ấn cá nhân trong sản phẩm**

Phần thể hiện rõ đóng góp của tôi nhất là trang nhập danh mục (Portfolio
Input) và layout dashboard. Form nhập là cổng vào của toàn bộ sản phẩm,
mọi phân tích, biểu đồ và nhận xét AI trong FinFolio đều bắt đầu từ việc
người dùng điền đúng form này. Dashboard là nơi chuyển 12 chỉ số tài
chính do Ngọc xử lý thành một trang có thể đọc và điều hướng được. Tôi
cũng xây dựng trang chủ, sidebar và các trang Đánh giá danh mục, Mô
phỏng tài sản, Tối ưu hóa tỷ trọng.

**4. Những việc đã thực sự làm**

**4.1 Thống nhất cấu trúc dữ liệu chung (Tuần 3)**

Trước khi xây dựng bất kỳ trang nào, tôi đã làm việc với Ngọc và Hải để
thống nhất cấu trúc dữ liệu luân chuyển giữa form, backend và giao diện
hiển thị. Điều này được ghi lại dưới dạng type definitions chung
(types.ts) và phản ánh trong API schema do Hải thiết kế. Bước này chủ
yếu là lập kế hoạch, gồm thống nhất tên field, kiểu dữ liệu và
validation rules để integration tuần 4 không phải sửa nhiều lần.

**4.2 Trang nhập danh mục (Tuần 3--4, hoàn thiện Tuần 5--6)**

-   Xây dựng form nhập danh mục theo input schema của Phương và
    wireframe của Hưng.

-   Tự động phân phối lại tỷ trọng: khi thêm hoặc xóa mã, tỷ trọng được
    tính đều lại để tổng luôn bằng 100%, tránh lỗi nhập liệu.

-   Validation 3 lớp (ticker trống, tổng tỷ trọng ≠ 100%, thiếu
    benchmark) với thông báo lỗi.

-   Dropdown benchmark với 5 tùy chọn có sẵn (VN-Index, VN30, S&P 500,
    Nasdaq, Bitcoin) và tùy chọn nhập ticker tùy chỉnh bổ sung sau
    feedback Tuần 5.

-   Sửa validation và responsive layout theo sprint Tuần 5 sau feedback
    Demo 1.

**4.3 Layout Dashboard (Tuần 4, Tuần 6)**

-   Sắp xếp 12 metric cards theo 3 hàng, đặt 4 chỉ số quan trọng nhất
    (Return, CAGR, Volatility, Sharpe) ở Hàng 1, thứ tự ưu tiên được
    thống nhất với Hưng sau feedback Demo 1.

-   Mỗi card hiển thị: giá trị, màu sắc từ logic đánh giá của Ngọc, so
    sánh với benchmark, và tooltip giải thích chỉ số.

-   Guard state cho tab chưa có dữ liệu: điều hướng sang Dashboard, Đánh
    giá, Mô phỏng, Tối ưu hóa khi chưa submit form sẽ hiện prompt thay
    vì trang trống.

-   Chỉnh sửa, hoàn thiện giao diện chart labels, tooltip và visual
    hierarchy theo UI revision plan của Hưng vào tuần 6.

**4.4 Navigation và các trang còn lại (Tuần 3--4)**

-   6-tab sidebar giữ nguyên dữ liệu qua các tab, và chấm nhấp nháy trên
    tab Input khi đã có dữ liệu.

-   Trang Home với 4 feature cards và nút bắt đầu.

-   Layout trang Đánh giá danh mục: panel nhận xét AI (có loading state
    \'Đang phân tích AI...\') + evaluation cards với viền màu.

-   Trang Mô phỏng và Tối ưu hóa: so sánh chỉ số trước/sau với nhãn
    \'Tốt hơn / Kém hơn\'.

**4.5 Code cleanup và final build (Tuần 6--7)**

-   Dọn dẹp state handling và lỗi navigation.

-   Gỡ bỏ 3 lựa chọn VN30, Nasdaq và Bitcoin khỏi thanh chọn benchmark,
    sau khi thảo luận thì chốt với team 3 lựa chọn benchmark là
    VN-Index, S&P 500 và MSCI Thị trường mới nổi.

-   Thêm khung gợi ý chọn benchmark và chỉ dẫn cách điền mã cho users.

-   Chạy build test và kiểm tra toàn bộ user flow trước khi nộp.

**5. Sản phẩm bàn giao**

  ------------------------------------------------------------------------
  **Sản phẩm bàn     **Mô tả**                           **Kết nối với**
  giao**                                                 
  ------------------ ----------------------------------- -----------------
  **Cấu trúc dữ liệu Thống nhất type definitions với     Backend + charts
  chung**            Ngọc và Hải trước khi build         

  **Trang Home**     Landing page với 4 feature cards và Điểm vào của
                     nút bắt đầu                         người dùng

  **Trang nhập danh  Form auto-redistribution,           Người dùng →
  mục**              validation 3 lớp, benchmark         luồng phân tích
                     selector, date range                

  **Layout           12 metric cards theo 3 hàng ưu      Backend output →
  Dashboard**        tiên, guard state, tooltips         hiển thị

  **Sidebar          6-tab nav, active state, pulsing    Kết nối 6 trang
  navigation**       indicator, session persistence      

  **Trang Đánh giá** Panel nhận xét AI + evaluation      AI + evaluation
                     cards với loading state async       labels

  **Trang Mô phỏng + So sánh chỉ số trước/sau với nhãn   Backend output →
  Tối ưu hóa**       màu tốt hơn/kém hơn                 hiển thị

  **Code cleanup +   Sửa bug Tuần 6--7, dọn state/nav,   Sẵn sàng demo
  build test**       kiểm tra npm run build              cuối
  ------------------------------------------------------------------------

**6. Bằng chứng đóng góp**

**6.1 Ghi chú các buổi họp**

Các mục sau trong biên bản họp 7 tuần ghi trực tiếp task tôi được phân
công và hoàn thành

  ---------------------------------------------------------------------------
  **Tuần**   **Task phân công cho An Thái**                   **Trạng thái
                                                              trong biên
                                                              bản**
  ---------- ------------------------------------------------ ---------------
  Tuần 1     Khảo sát khả năng dựng prototype web và luồng cơ Hoàn thành
             bản                                              

  Tuần 2     Tìm công cụ AI web builder, xác định cấu trúc    Hoàn thành
             prototype nhiều trang                            

  Tuần 3     Dựng prototype UI ban đầu: Home, Portfolio       Đang phát triển
             Input, Dashboard, Evaluation, Simulation,        → Tuần 4
             Optimization                                     

  Tuần 4     Chuẩn bị demo frontend: Home, Input, Dashboard,  Đang hoàn thiện
             các trạng thái validation/loading/error          sau review

  Tuần 5     Sửa form validation, loading/error states,       Đang hoàn thiện
             responsive layout và navigation theo feedback    
             Demo 1                                           

  Tuần 6     Code cleanup, route/navigation, state handling,  Hoàn thành
             build test, fix lỗi form/loading                 

  Tuần 7     Sửa lỗi và hoàn thiện web                        Hoàn thành
  ---------------------------------------------------------------------------

**6.2 Kiểm tra prototype**

-   Thêm mã cổ phiếu và khối lượng → tỷ trọng tự phân phối lại với giá
    hiện tại, tổng vẫn là 100%.

-   Vào Dashboard khi chưa submit → xuất hiện prompt guard thay vì trang
    trống.

-   Chuyển tab sau khi nhập dữ liệu → dữ liệu từ form vẫn được giữ
    nguyên.

-   Hover vào icon info trên metric card → tooltip giải thích chỉ số
    xuất hiện.

-   Mở trang Đánh giá khi AI chưa xong → badge \'Đang phân tích AI...\'
    hiện rõ.

**6.3 File nguồn**

  ----------------------------------------------------------------------------------
  **src/types.ts**                       Cấu trúc dữ liệu chung. Đã thống nhất với
                                         Ngọc trước khi bắt đầu build.
  -------------------------------------- -------------------------------------------
  **src/components/PortfolioForm.tsx**   Trang nhập danh mục: validation,
                                         auto-weight redistribution, benchmark
                                         selector.

  **src/components/MetricCard.tsx**      Card chỉ số tái sử dụng với màu trạng thái,
                                         badge và tooltip.

  **src/App.tsx**                        File chính: 6 page layouts, navigation,
                                         global state, API call, tích hợp AI.
  ----------------------------------------------------------------------------------

**7. Đóng góp kết nối với sản phẩm cuối như thế nào**

Nếu không có trang nhập danh mục, không người dùng nào có thể bắt đầu
phân tích, trang này là điểm đầu vào duy nhất cho mọi dữ liệu chạy qua
phần còn lại của sản phẩm. Nếu không có layout dashboard, 12 chỉ số Ngọc
tính sẽ không có nơi hiển thị. Guard state đảm bảo app không bao giờ
hiện trang trắng. Sidebar navigation cho phép người dùng di chuyển giữa
6 phần mà không mất dữ liệu. Mọi kết quả tài chính, biểu đồ và nhận xét
AI hiển thị trong demo cuối đều đi qua và hiển thị ở các trang tôi đã
xây dựng.

**8. Điều tôi đã học được**

**8.1 Hiển thị dữ liệu và truyền thông tin là hai việc khác nhau**

Dashboard phiên bản đầu hiển thị 12 chỉ số ở cùng mức độ nổi bật. Sau
feedback Demo 1, tôi đã cải thiện giao diện bằng cách đặt các chỉ số
Return, CAGR, Volatility, Sharpe lên hàng đầu tiên.

**8.2 AI-assisted development vẫn đòi hỏi phán đoán ở từng bước**

AI tạo ra web rất nhanh, nhưng phần lớn công sức nằm ở phần đánh giá
output: Form có khớp schema của Phương không? Layout có theo wireframe
của Hưng không? Giao diện có hoạt động với cấu trúc dữ liệu Ngọc định
nghĩa không? Vòng review và re-prompting tốn thời gian hơn cả bước
generation.

**8.3 Thống nhất cấu trúc dữ liệu trước khi xây dựng bất kỳ màn hình
nào**

Handoff với chart components của Hải suôn sẻ nhất vì thống nhất data
format từ Tuần 3. Phần khó nhất là trang Đánh giá phiên bản đầu khi tên
field label của Ngọc khác với kỳ vọng của tôi --- khiến màu trạng thái
không áp dụng được. Sau đó nhóm thói quen review output mới của backend
cùng nhau trước khi bắt đầu build display layer.

**9. Khó khăn tôi đã gặp và cách xử lý**

**9.1: Phân phối lại tỷ trọng ban đầu xảy ra nhiều lỗi**

Phiên bản đầu tiên đã cố định tỷ trọng tùy chỉnh và đôi khi không reset
khi thêm mã mới. Tôi xử lý bằng cách sửa code và thêm ghi chú giải thích
bên dưới rằng tỷ trọng đã được tính lại đều và có thể điều chỉnh thủ
công.

**Khó khăn 2 --- Dashboard cảm giác quá tải (feedback Demo 1)**

Xử lý trong Tuần 5: Sắp xếp lại metric rows theo mức độ ưu tiên, thêm
tooltip, thống nhất hierarchy với UI revision plan của Hưng.

**Khó khăn 3 --- Trang Đánh giá trông bị lỗi khi đang chờ AI**

AI call mất vài giây. Phiên bản đầu hiện trang trốn.. Xử lý: thêm badge
hiện \'Đang phân tích AI...\' cho trạng thái loading.

**10. Lời nhắn cho sinh viên khóa sau**

-   Thống nhất tên field API response với teammate backend trước khi
    build bất kỳ màn hình hiển thị nào. Một buổi họp 1 tiếng ở Tuần 3 để
    thống nhất có thể tiết kiệm nhiều thời gian khi chuyển qua các bước
    tiếp theo.

-   Test với người ngoài nhóm. Teammate sẽ biết sản phẩm hoạt động thế
    nào nên cần người lạ trải nghiệm để tìm ra vấn đề tồn đọng.

-   Khi dùng AI để tạo UI, hãy mô tả trải nghiệm bạn muốn thay vì mô tả
    công nghệ. \'Người dùng thấy tổng tỷ trọng cập nhật ngay khi gõ\'
    hiệu quả hơn \'dùng useState với onChange\'

-   Giữ log ngắn về những gì bạn đã prompt.
