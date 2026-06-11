# INDIVIDUAL REPORT

**Thành viên: Hoàng Minh Ngọc**

**MSV: 2312380023**

---

## 1. Vai trò trong dự án

Trong project FinFolio, em đảm nhiệm vai trò phụ trách logic tài chính, cơ chế đánh giá danh mục đầu tư và logic tối ưu hóa danh mục. Đây là phần nền tảng giúp sản phẩm chuyển đổi dữ liệu đầu vào của người dùng thành các chỉ số tài chính, kết quả so sánh với benchmark, kết luận về hiệu quả danh mục và đề xuất tỷ trọng tối ưu theo mục tiêu phân tích. Vai trò của em không tập trung vào thiết kế giao diện hay bố cục hiển thị, mà tập trung vào việc xác định hệ thống cần xử lý dữ liệu tài chính như thế nào, tính toán các chỉ số theo trình tự nào và sử dụng các kết quả đó để đánh giá cũng như tối ưu danh mục ra sao.

Cụ thể, em phụ trách xác định hệ thống chỉ số cần thiết để đánh giá một danh mục đầu tư, bao gồm các chỉ số về lợi nhuận, rủi ro, hiệu quả lợi nhuận trên rủi ro, so sánh với benchmark và đa dạng hóa. Từ đó, em xây dựng bảng công thức và làm rõ ý nghĩa tài chính của các chỉ số như Daily Return, Portfolio Return, Cumulative Return, CAGR, Volatility, Sharpe Ratio, Sortino Ratio, Max Drawdown, VaR, CVaR, Beta, Alpha, Tracking Error, Information Ratio và Correlation Matrix. Những chỉ số này tạo thành cơ sở để hệ thống đánh giá danh mục không chỉ theo mức sinh lời, mà còn theo mức rủi ro và hiệu quả so với thị trường tham chiếu.

Một phần quan trọng khác trong vai trò của em là thiết kế logic so sánh danh mục với benchmark. Em xác định rằng portfolio và benchmark cần được tính trên cùng giai đoạn thời gian và cùng tập ngày giao dịch đã được căn chỉnh để kết quả so sánh có ý nghĩa. Trên cơ sở đó, portfolio CAGR được so sánh với benchmark CAGR để đánh giá mức độ vượt trội hoặc kém hơn về tăng trưởng; portfolio volatility được so sánh với benchmark volatility để đánh giá mức rủi ro tương đối; beta và alpha được dùng để đo độ nhạy cũng như phần lợi nhuận vượt mức kỳ vọng so với benchmark; còn tracking error và information ratio được dùng để đánh giá mức độ lệch khỏi benchmark và hiệu quả của phần active return.

Bên cạnh phần tính toán và so sánh, em cũng phụ trách logic kết luận danh mục theo hướng rule-based. Điều này có nghĩa là hệ thống không kết luận danh mục tốt chỉ vì lợi nhuận cao, mà phải xét đồng thời các yếu tố rủi ro và hiệu quả lợi nhuận trên rủi ro. Cụ thể, CAGR được đánh giá tương đối so với benchmark, volatility được đánh giá so với benchmark, Max Drawdown được kiểm tra theo ngưỡng rủi ro, và Sharpe Ratio được sử dụng làm tiêu chí trọng tâm để xác định overall rating của danh mục. Nhờ đó, kết luận của sản phẩm có cơ sở tài chính rõ ràng hơn, tránh việc đưa ra nhận xét cảm tính hoặc chỉ dựa trên một chỉ số đơn lẻ.

Ngoài ra, em phụ trách phần định nghĩa logic tài chính cho chức năng tối ưu hóa danh mục. Trong FinFolio, tối ưu hóa được xây dựng theo hai mục tiêu chính: maximize Sharpe Ratio và minimize Volatility. Mục tiêu maximize Sharpe Ratio được thiết kế để tìm danh mục có hiệu quả lợi nhuận trên rủi ro tốt nhất dựa trên dữ liệu lịch sử, trong khi mục tiêu minimize Volatility hướng tới việc tìm danh mục có mức biến động thấp nhất. Em cũng xác định các ràng buộc cần có trong quá trình tối ưu hóa, bao gồm tổng tỷ trọng bằng 100%, tỷ trọng từng tài sản phải nằm trong khoảng min/max do người dùng đặt, không sử dụng tỷ trọng âm và kết quả tối ưu hóa chỉ được diễn giải như một phân tích lịch sử, không phải khuyến nghị đầu tư chắc chắn.

Như vậy, vai trò của em trong dự án là xây dựng nền tảng logic giúp FinFolio trả lời bốn câu hỏi cốt lõi: danh mục được tính toán như thế nào, danh mục được so sánh với benchmark ra sao, hệ thống kết luận danh mục dựa trên tiêu chí nào và tỷ trọng danh mục có thể được tối ưu hóa theo nguyên tắc tài chính nào. Phần việc này đóng vai trò kết nối giữa input của người dùng, dữ liệu giá lịch sử, financial engine, benchmark comparison, evaluation logic và optimization logic của sản phẩm cuối cùng.

## 2. Dấu ấn cá nhân trong sản phẩm

Dấu ấn cá nhân rõ nhất của em trong sản phẩm nằm ở phần logic phân tích danh mục đầu tư. Đây là phần không trực tiếp thể hiện qua giao diện, nhưng quyết định ý nghĩa của các kết quả mà người dùng nhìn thấy. Nếu giao diện là phần giúp người dùng tương tác với sản phẩm, thì logic tài chính là phần giúp sản phẩm có khả năng đưa ra các kết quả phân tích đáng tin cậy.

Khi người dùng nhập các thông tin như mã cổ phiếu, tỷ trọng từng mã, benchmark, khoảng thời gian phân tích và risk-free rate, hệ thống cần chuyển các thông tin đó thành daily return, portfolio return, benchmark return và các chỉ số như CAGR, Volatility, Sharpe Ratio, Sortino Ratio, Max Drawdown, VaR, CVaR, Beta, Alpha, Tracking Error, Information Ratio và Correlation Matrix. Phần đóng góp của em là xác định vai trò của từng chỉ số, cách tính các chỉ số đó và cách dùng chúng để đánh giá danh mục.

Đóng góp này giúp FinFolio không dừng lại ở việc hiển thị các con số riêng lẻ, mà có thể giải thích danh mục từ nhiều góc độ: lợi nhuận, rủi ro, hiệu quả lợi nhuận trên rủi ro, mức độ so sánh với benchmark và mức độ đa dạng hóa. Nhờ đó, sản phẩm có cơ sở để đưa ra các kết luận như danh mục đang hoạt động tốt, đang có rủi ro cao, đang kém hơn benchmark hoặc cần được cải thiện về hiệu quả risk-return.

## 3. Những việc đã thực sự làm

### 3.1 Xác định hệ thống chỉ số tài chính cần dùng trong FinFolio

Em đã xác định các nhóm chỉ số cần có để đánh giá một danh mục đầu tư, gồm:

- Nhóm return: Daily return, Daily portfolio return, Total return, Cumulative return và CAGR.

- Nhóm risk: Volatility, Max Drawdown, VaR 95% và CVaR 95%.

- Nhóm risk-adjusted return: Sharpe Ratio, Sortino Ratio và Information Ratio

- Nhóm benchmark comparison: Beta, Alpha, Tracking error và Information ratio

- Nhóm diversification: Correlation matrix và Allocation chart.

- Em phân loại các chỉ số này để nhóm biết mỗi chỉ số được dùng để trả lời câu hỏi gì. Ví dụ, CAGR dùng để đo tốc độ tăng trưởng lịch sử; volatility dùng để đo mức biến động; Sharpe Ratio dùng để đánh giá lợi nhuận có xứng đáng với rủi ro hay không; Information Ratio dùng để đánh giá excess return so với benchmark trên mỗi đơn vị tracking error.

### 3.2 Xây dựng bảng công thức và financial checklist

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

### 3.3 Thiết kế logic tính toán của financial engine

Em đã thiết kế trình tự tính toán tài chính cho hệ thống theo hướng: User input  Historical price data  Portfolio metrics  Benchmark comparison  Portfolio conclusion. Cụ thể, sau khi người dùng nhập input bao gồm tickers và số lượng cổ phiếu nắm giữ, web sẽ tự lấy giá đóng cửa của ngày giao dịch gần nhất để tính ra tỷ trọng từng mã trong danh mục. Bên cạnh đó, người dùng cũng sẽ chọn benchmark so sánh (em cũng đưa ra khuyến nghị người dùng nên lấy benchmark là gì để phù hợp với danh mục) và khoảng thời gian đánh giá danh mục. Sau khi có các thông tin trên, web sẽ lấy dữ liệu giá lịch sử cho các mã cổ phiếu và benchmark. Từ đây, web sẽ tính toán các metrics như em đã đề cập trong bảng công thức và sẽ là output để các thành viên khác có thể dùng cho hiển thị, diễn giải và demo.

### 3.4 Làm rõ logic so sánh với benchmark

Em đã làm rõ cách danh mục được so sánh với benchmark. Đây là phần quan trọng vì FinFolio không chỉ phân tích danh mục một cách độc lập, mà còn đánh giá danh mục đó so với thị trường tham chiếu.

Bảng so sánh benchmark: https://drive.google.com/file/d/1cuStN-li87mIINnqioWI3GWME9kv94T_/view?usp=drive_link

Trong phần này, bên cạnh dashboard các chỉ số của danh mục, em còn có phần kiểm thử hai mẫu độc lập (In-Sample và Out-Sample) với mốc ranh giới phân tách là lùi về 6 tháng cuối cho các chỉ số CAGR, Volatility và Sharpe ratio (Trường hợp khoảng thời gian ngắn dưới 6 tháng, web sẽ chia đều cho In-Sample và Out-Sample). Nếu kết quả hiệu suất trong mẫu (In-Sample Sharpe) vượt xa đáng kể so với hiệu suất ngoài mẫu (Out-of-Sample Sharpe), danh mục có thể đang bị tối ưu quá đà trên dữ liệu quá khứ và khó duy trì kết quả sinh lời thực tế trong tương lai.

### 3.5 Thiết kế logic kết luận danh mục

Ngoài các khuyến nghị và kết luận từ AI, em xác định thêm logic để hệ thống kết luận danh mục theo hướng rule-based. Hệ thống không nên kết luận danh mục tốt chỉ vì return cao, mà phải xét cả rủi ro. Các rule chính gồm:

- CAGR được so sánh với benchmark CAGR.

- Volatility được so sánh với benchmark volatility.

- Max Drawdown được kiểm tra theo ngưỡng rủi ro.

- Sharpe Ratio được dùng để đánh giá hiệu quả lợi nhuận trên rủi ro.

Overall rating chủ yếu dựa trên Sharpe Ratio do chỉ số này bao quát được cả return và risk (Nếu Sharpe Ratio < 1: Overall rating = Cần cải thiện, ngược lại thì Overall rating = Tốt). Do đó, nếu danh mục có return cao nhưng volatility cũng cao và Sharpe Ratio thấp, hệ thống không nên đánh giá danh mục là tốt. Điều này giúp kết luận của sản phẩm có cơ sở tài chính hơn.

### 3.6 Thiết kế logic tối ưu hóa danh mục

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

### 3.7 Kiểm tra logic bằng dữ liệu thực tế

Em cũng hỗ trợ kiểm tra logic tính toán bằng dữ liệu thực tế của FPT, HPG và VN-Index. Cụ thể, em dùng dữ liệu giá lịch sử để kiểm tra: Daily return, Portfolio return, Benchmark return, CAGR, Volatility, Max Drawdown, Sharpe Ratio, Benchmark comparison, Rule-based conclusion. Việc kiểm tra này giúp đảm bảo rằng công thức không chỉ đúng về lý thuyết mà còn chạy được với dữ liệu thật.

## 4. File, logic, dữ liệu và bằng chứng đóng góp

- Bảng công thức: https://drive.google.com/file/d/1GAmYUeR_LVicPm9WCznNQNF5ftXIkiox/view?usp=drive_link

- Bảng so sánh benchmark: https://drive.google.com/file/d/1cuStN-li87mIINnqioWI3GWME9kv94T_/view?usp=drive_link

- Bảng logic đánh giá danh mục: https://drive.google.com/file/d/1_OxwrC7sUTpH3_wTJzXkBlJhraR9hL8r/view?usp=drive_link

- Bảng logic optimization: https://drive.google.com/file/d/19hpXCA3BPJi-t7gv_6mOuMacj94B-vCY/view?usp=drive_link

## 5. Phần đóng góp đó kết nối thế nào với sản phẩm cuối cùng

Phần đóng góp của em kết nối trực tiếp với sản phẩm cuối cùng vì FinFolio là một website phân tích danh mục đầu tư. Nếu không có logic tài chính, sản phẩm chỉ có giao diện nhập liệu và hiển thị, nhưng không thể đưa ra kết quả phân tích có ý nghĩa. Cụ thể, phần việc của em giúp sản phẩm cuối cùng ở các điểm sau:

- Giúp hệ thống xử lý dữ liệu đầu vào của người dùng: Khi người dùng nhập mã cổ phiếu, tỷ trọng, benchmark và khoảng thời gian, logic của em giúp xác định cách chuyển dữ liệu đó thành return series và portfolio metrics.

- Giúp sản phẩm tạo ra các chỉ số tài chính chính xác: Các chỉ số như CAGR, volatility, Sharpe Ratio, Max Drawdown, Beta, Alpha và Information Ratio là nền tảng để sản phẩm đánh giá danh mục.

- Giúp người dùng so sánh danh mục với benchmark: Người dùng không chỉ biết danh mục tăng hay giảm, mà còn biết danh mục có tốt hơn hay kém hơn benchmark, rủi ro hơn hay ít rủi ro hơn benchmark.

- Giúp phần đánh giá danh mục có cơ sở rõ ràng: Kết luận như “Cần cải thiện” hoặc “Tốt” không đến từ cảm tính, mà dựa trên rule tài chính, đặc biệt là Sharpe Ratio.

- Giúp phần AI interpretation có dữ liệu đầu vào hợp lý: AI có thể diễn giải kết quả bằng ngôn ngữ tự nhiên, nhưng phần em làm cung cấp các chỉ số tài chính để AI không nhận xét chung chung.

- Giúp phần optimization có mục tiêu tài chính rõ ràng: Hai lựa chọn optimize không phải ngẫu nhiên, mà dựa trên hai mục tiêu khác nhau: tăng hiệu quả risk-return hoặc giảm biến động danh mục.

## 6. Điều cá nhân học được

Qua phần việc của mình, em học được nhiều điều cụ thể. Thứ nhất, em hiểu rõ hơn rằng một sản phẩm tài chính không thể chỉ chú ý đến return. Một danh mục có return cao chưa chắc đã tốt nếu volatility cao, drawdown lớn hoặc Sharpe Ratio thấp. Vì vậy, khi đánh giá danh mục, cần nhìn đồng thời nhiều chỉ số. Thứ hai, em học được cách chuyển kiến thức tài chính lý thuyết thành logic có thể đưa vào sản phẩm. Trước đây, các công thức như Sharpe Ratio, Beta, Alpha hay Tracking Error thường chỉ xuất hiện trong bài học. Khi làm dự án, em phải hiểu input của từng công thức là gì, output sẽ được dùng ở đâu và lỗi tính toán nào có thể xảy ra. Thứ ba, em học được tầm quan trọng của benchmark. Nếu chỉ nhìn danh mục riêng lẻ, người dùng khó biết kết quả đó tốt hay xấu. Khi có benchmark như VN-Index, hệ thống có thể so sánh danh mục với thị trường và đưa ra nhận xét có cơ sở hơn. Thứ tư, em học được rằng AI không nên thay thế hoàn toàn logic tài chính. AI có thể giúp diễn giải kết quả dễ hiểu hơn, nhưng phần kết luận chính vẫn cần dựa trên công thức và rule rõ ràng để tránh nhận xét cảm tính hoặc sai lệch. Thứ năm, em học được cách làm việc với nhóm trong một sản phẩm có nhiều phần liên kết với nhau. Phần logic tài chính của em phải đủ rõ để các bạn phụ trách backend, frontend và UI có thể dùng được trong sản phẩm cuối cùng.

## 7. Khó khăn đã gặp và cách xử lý

- Khó khăn đầu tiên em gặp phải là phân loại đúng vai trò của từng chỉ số. Một số chỉ số có thể dễ bị hiểu nhầm nếu chỉ nhìn tên gọi. Ví dụ, Information Ratio ban đầu có thể bị nhầm với diversification, nhưng khi xem xét kỹ công thức và ý nghĩa, em xác định rằng chỉ số này thuộc nhóm benchmark-relative analysis vì nó đo excess return trên tracking error. Để xử lý khó khăn này, em phân loại lại hệ thống metric thành các nhóm rõ ràng: return, risk, risk-adjusted return, benchmark-relative analysis và diversification.

- Khó khăn thứ hai là xác định cách kết luận danh mục trong trường hợp các chỉ số đưa ra tín hiệu trái chiều. Một danh mục có thể có return cao hơn benchmark nhưng cũng có volatility và drawdown cao hơn. Nếu chỉ kết luận dựa trên return thì sẽ không phản ánh đúng rủi ro. Để xử lý vấn đề này, em làm rõ rằng hệ thống cần xem xét thêm các chỉ số risk-adjusted, đặc biệt là Sharpe Ratio. Theo logic trong code, overall rating chủ yếu dựa trên Sharpe Ratio, từ đó giúp kết luận danh mục cân bằng hơn giữa return và risk.

- Khó khăn thứ ba là đảm bảo dữ liệu portfolio và benchmark được so sánh trên cùng cơ sở. Khi tính beta, alpha, tracking error hoặc information ratio, nếu portfolio return và benchmark return không cùng ngày, kết quả sẽ không đáng tin cậy. Vì vậy, em đưa yêu cầu căn chỉnh ngày giao dịch chung vào checklist tài chính và nhấn mạnh đây là điều kiện cần trước khi tính benchmark-relative metrics.

- Khó khăn cuối cùng là làm rõ ý nghĩa của optimization để tránh hiểu nhầm đây là khuyến nghị đầu tư. Trong thực tế, kết quả tối ưu hóa chỉ phản ánh kết quả tốt nhất theo dữ liệu lịch sử và theo constraints người dùng đặt. Do đó, em xác định cách diễn giải optimization theo hướng hỗ trợ phân tích, không phải lời khuyên mua bán chắc chắn. Cách xử lý này giúp sản phẩm phù hợp hơn với mục tiêu học thuật và tránh gây hiểu nhầm cho người dùng.

## 8. Lời nhắn cho sinh viên khóa sau

Nếu sinh viên khóa sau muốn tiếp tục phát triển FinFolio hoặc học từ dự án này, điều quan trọng nhất là nên xem sản phẩm như một hệ thống hoàn chỉnh, không chỉ là một tập hợp các tính năng riêng lẻ. Một sản phẩm phân tích danh mục đầu tư cần có sự liên kết chặt chẽ giữa dữ liệu đầu vào, nguồn dữ liệu thị trường, logic tính toán, giao diện hiển thị, phần đánh giá kết quả, phần tối ưu hóa và tài liệu giải thích. Nếu một trong các phần này không thống nhất, kết quả cuối cùng có thể trở nên khó kiểm tra hoặc khó giải thích trong buổi bảo vệ.

Trước khi mở rộng thêm tính năng mới, nhóm sau nên kiểm tra thật kỹ chất lượng và độ ổn định của dữ liệu. Trong quá trình thực hiện dự án, nhóm em nhận thấy rằng vấn đề dữ liệu có thể ảnh hưởng trực tiếp đến phạm vi sản phẩm. Ví dụ, benchmark VN30 ban đầu được cân nhắc đưa vào hệ thống, nhưng do dữ liệu không ổn định để xử lý nhất quán trong flow phân tích, nhóm đã phải loại bỏ lựa chọn này để đảm bảo kết quả cuối cùng đáng tin cậy hơn. Điều này cho thấy rằng không phải tính năng nào cũng nên giữ lại nếu dữ liệu nền không đủ tốt. Với một sản phẩm tài chính, việc giảm bớt một lựa chọn benchmark nhưng đảm bảo các benchmark còn lại chạy đúng sẽ tốt hơn việc giữ nhiều lựa chọn nhưng kết quả khó kiểm chứng.

Ngoài dữ liệu, sinh viên khóa sau cũng nên chú ý đến sự thống nhất giữa frontend, backend và tài liệu. Những gì người dùng nhập trên giao diện phải khớp với những gì backend có thể xử lý. Những gì backend trả ra phải khớp với các chỉ số được giải thích trong báo cáo. Những gì nhóm trình bày trong demo cũng cần đúng với logic thật trong code. Nếu báo cáo viết một công thức nhưng code sử dụng logic khác, nhóm sẽ rất khó giải thích khi được hỏi chi tiết. Vì vậy, nên duy trì một bảng mapping rõ ràng giữa input, logic xử lý và output cho từng tính năng chính.

Về phần kiểm thử, nhóm sau không nên chỉ kiểm tra sản phẩm bằng cách chạy thử trên giao diện. Cần có thêm các file kiểm tra riêng, chẳng hạn file Excel hoặc test case đơn giản, để đối chiếu các kết quả quan trọng như daily return, portfolio return, CAGR, volatility, Sharpe Ratio, max drawdown và benchmark comparison. Việc này giúp phát hiện lỗi nhanh hơn, đặc biệt là các lỗi liên quan đến dữ liệu thiếu, ngày giao dịch không khớp, tỷ trọng không bằng 100%, hoặc benchmark không có đủ dữ liệu trong giai đoạn người dùng chọn.

Đối với phần tối ưu hóa, sinh viên khóa sau nên tiếp tục nhấn mạnh rằng kết quả tối ưu chỉ dựa trên dữ liệu lịch sử và các ràng buộc do người dùng đặt ra. Optimization không nên được trình bày như một khuyến nghị đầu tư chắc chắn. Nếu phát triển thêm, nhóm sau có thể làm rõ hơn lý do tỷ trọng thay đổi sau optimization, ví dụ bằng cách giải thích tài sản nào làm tăng Sharpe Ratio, tài sản nào làm giảm volatility, và correlation giữa các tài sản ảnh hưởng đến kết quả như thế nào.

Cuối cùng, em nghĩ bài học lớn nhất từ dự án này là một sản phẩm tài chính cần được xây dựng theo hướng có thể giải thích được. Giao diện đẹp và demo mượt là cần thiết, nhưng chưa đủ. Nhóm thực hiện cần hiểu rõ dữ liệu đến từ đâu, công thức nào được sử dụng, vì sao một chỉ số được tính như vậy, vì sao một benchmark bị loại bỏ, và vì sao hệ thống đưa ra kết luận cuối cùng. Nếu tiếp tục phát triển FinFolio, sinh viên khóa sau nên ưu tiên tính nhất quán, khả năng kiểm chứng và khả năng giải thích của sản phẩm trước khi mở rộng thêm nhiều tính năng mới.
