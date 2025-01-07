import { lang } from "@/utils";

export default (string) => {
  const language = lang?.value || "vi";
  const languageTranslations = translations[string];
  return languageTranslations
    ? languageTranslations[language] || "lang không hợp lệ!"
    : string;
};

const translations = {
  "Đăng nhập": {
    en: "Sign in", // Tiếng Anh
    vi: "Đăng nhập", // Tiếng Việt
    la: "ເຂົ້າສູ່ລະບົບ", // Tiếng Lào
  },
  Email: {
    en: "Email",
    vi: "Email",
    la: "ອີເມວ",
  },
  "Mật khẩu": {
    en: "Password",
    vi: "Mật khẩu",
    la: "ລະຫັດຜ່ານ",
  },
  "Xem Mật khẩu": {
    en: "Show Password",
    vi: "Xem Mật khẩu",
    la: "ເບິ່ງລະຫັດຜ່ານ",
  },
  "Ghi nhớ đăng nhập": {
    en: "Remember Me",
    vi: "Ghi nhớ đăng nhập",
    la: "ບັນທຶກລະຫັດຜ່ານ",
  },
  hoặc: {
    en: "or",
    vi: "hoặc",
    la: "ຫຼື",
  },
  "Quên mật khẩu": {
    en: "Forgot Password",
    vi: "Quên mật khẩu",
    la: "ລືມລະຫັດຜ່ານ",
  },
  "Bạn chưa có tài khoản": {
    en: "Don't have an account",
    vi: "Bạn chưa có tài khoản",
    la: "ທ່ານຍັງບໍ່ມີບັນຊີ",
  },
  "Bạn đã có tài khoản": {
    en: "Already have an account",
    vi: "Bạn đã có tài khoản",
    la: "ທ່ານມີບັນຊີແລ້ວ",
  },
  "Đăng ký ngay": {
    en: "Sign up now",
    vi: "Đăng ký ngay",
    la: "ສະໝັກເລີຍທີ່ນີ້",
  },
  "Tạo mới tài khoản": {
    en: "Create New Account",
    vi: "Tạo mới tài khoản",
    la: "ສ້າງບັນຊີໃໝ່",
  },
  "Vui lòng nhập chính xác thông tin email của bạn, để chúng tôi tiến hành xác thực":
    {
      en: "Please enter your correct email for verification",
      vi: "Vui lòng nhập chính xác thông tin email của bạn, để chúng tôi tiến hành xác thực",
      la: "ກະ​ລຸ​ນາ​ໃສ່​ຂໍ້​ມູນ​ອີ​ເມວ​ຂອງ​ທ່ານ​ໃຫ້​ຖືກ​ຕ້ອງ ​ເພື່ອ​ໃຫ້​ພວກ​ເຮົາ​ສາ​ມາດ​ຢືນຢັນຕົວຕົນ​ໄດ້​",
    },
  "Nhập email của bạn vào đây": {
    en: "Enter your email here",
    vi: "Nhập email của bạn vào đây",
    la: "ໃສ່ອີເມວຂອງທ່ານໄດ້ທີ່ນີ້",
  },
  "Gửi mã OTP đến email": {
    en: "Send OTP to email",
    vi: "Gửi mã OTP đến email",
    la: "ສົ່ງລະຫັດ OTP ຫາອີເມວ",
  },
  "Bạn đã có tài khoản?": {
    en: "Already have an account?",
    vi: "Bạn đã có tài khoản?",
    la: "ທ່ານມີບັນຊີແລ້ວ?",
  },
  "Đăng nhập ngay": {
    en: "Sign in now",
    vi: "Đăng nhập ngay",
    la: "ເຂົ້າສູ່ລະບົບເລີຍທີ່ນີ້",
  },
  "Vui lòng nhập chính xác mã OTP mà chúng tôi đã gửi cho bạn qua email": {
    en: "Please enter the correct OTP we sent to your email",
    vi: "Vui lòng nhập chính xác mã OTP mà chúng tôi đã gửi cho bạn qua email",
    la: "ກະລຸນາໃສ່ລະຫັດ OTP ທີ່ພວກເຮົາສົ່ງໃຫ້ທ່ານທາງອີເມວ.",
  },
  "Xác thực": {
    en: "Verify",
    vi: "Xác thực",
    la: "ຢືນຢັນ",
  },
  "Đổi Email khác": {
    en: "Change another Email",
    vi: "Đổi Email khác",
    la: "ປ່ຽນອີເມວອື່ນ",
  },
  Họ: {
    en: "Last Name",
    vi: "Họ",
    la: "ນາມສະກຸນ",
  },
  Tên: {
    en: "First Name",
    vi: "Tên",
    la: "ຊື່",
  },
  "Số điện thoại": {
    en: "Phone",
    vi: "Số điện thoại",
    la: "ເບີໂທລະສັບ",
  },
  "Địa chỉ": {
    en: "Address",
    vi: "Địa chỉ",
    la: "ທີ່ຢູ່",
  },
  "Ngày sinh": {
    en: "Date of Birth",
    vi: "Ngày sinh",
    la: "ວັນເກີດ",
  },
  "Giới tính": {
    en: "Gender",
    vi: "Giới tính",
    la: "ເພດ",
  },
  "Giới thiệu bản thân": {
    en: "Introduce yourself",
    vi: "Giới thiệu bản thân",
    la: "ແນະນໍາຕົວເອງ",
  },
  Nam: {
    en: "Male",
    vi: "Nam",
    la: "ຊາຍ",
  },
  Nữ: {
    en: "Female",
    vi: "Nữ",
    la: "ຍິງ",
  },
  Khác: {
    en: "Other",
    vi: "Khác",
    la: "ອື່ນໆ",
  },
  "Mật khẩu xác nhận": {
    en: "Confirm Password",
    vi: "Mật khẩu xác nhận",
    la: "ຢືນຢັນລະຫັດຜ່ານ",
  },
  "Tạo tài khoản": {
    en: "Create Account",
    vi: "Tạo tài khoản",
    la: "ສ້າງລະຫັດຜ່ານ",
  },
  "Trang chủ": {
    en: "Home",
    vi: "Trang chủ",
    la: "ໜ້າຫຼັກ",
  },
  "Phổ biến": {
    en: "Popular",
    vi: "Phổ biến",
    la: "ຍອດນິຍົມ",
  },
  "Bài đăng của tôi": {
    en: "My Posts",
    vi: "Bài đăng của tôi",
    la: "ໂພສຂອງທ່ານ",
  },
  "Tạo câu hỏi": {
    en: "Create Question",
    vi: "Tạo câu hỏi",
    la: "ສ້າງໂພສ",
  },
  "Cài đặt": {
    en: "Settings",
    vi: "Cài đặt",
    la: "ຕັ້ງຄ່່າ",
  },
  "Màn hình": {
    en: "Display",
    vi: "Màn hình",
    la: "ຕັ້ງຄ່າໜ້າຈໍ",
  },
  "Đổi mật khẩu": {
    en: "Change Password",
    vi: "Đổi mật khẩu",
    la: "ປ່ຽນລະຫັດຜ່ານ",
  },
  "Bạn cần tìm gì?": {
    en: "What are you looking for?",
    vi: "Bạn cần tìm gì?",
    la: "ທ່ານຕ້ອງການຄົ້ນຫາ?",
  },
  "3 kết quả gợi ý tìm kiếm...": {
    en: "3 suggested search results...",
    vi: "3 kết quả gợi ý tìm kiếm...",
    la: "3 ຜົນການຄົ້ນຫາ...",
  },
  "Kết quả tìm kiếm bài viết": {
    en: "Search results for posts",
    vi: "Kết quả tìm kiếm bài viết",
    la: "ຜົນຫານຄົ້ນຫາຊອກຫາໂພສ",
  },
  "Không tìm thấy bài viết": {
    en: "No posts found",
    vi: "Không tìm thấy bài viết",
    la: "ບໍ່ພົບຜົນການຄົ້ນຫາທີ່ທ່ານຊອກຫາ",
  },
  "Có 21 kết quả được tìm thấy": {
    en: "21 results found",
    vi: "Có 21 kết quả được tìm thấy",
    la: "ພົບມີ 21 ຜົນການຄົ້ນຫາ",
  },
  "Bài đăng của tôi": {
    en: "My posts",
    vi: "Bài đăng của tôi",
    la: "ໂພສຂອງທ່ານ",
  },
  "Công khai": {
    en: "Public",
    vi: "Công khai",
    la: "ສາທາລະນະ",
  },
  "Bản nháp": {
    en: "Draft",
    vi: "Bản nháp",
    la: "ຮ່າງ",
  },
  "Văn bản": {
    en: "Text",
    vi: "Văn bản",
    la: "ບົດຄວາມ",
  },
  "Phương tiện": {
    en: "Media",
    vi: "Phương tiện",
    la: "ໄຟລ໌ພາບ",
  },
  thích: {
    en: "like",
    vi: "thích",
    la: "ຖືກໃຈ",
  },
  "trả lời": {
    en: "answer",
    vi: "trả lời",
    la: "ຄວາມຄິດເຫັນ",
  },
  "lượt xem": {
    en: "views",
    vi: "lượt xem",
    la: "ຍອດວິວ",
  },
  "Chỉnh sửa bài viết": {
    en: "Edit post",
    vi: "Chỉnh sửa bài viết",
    la: "ແກ້ໄຂໂພສ",
  },
  "Xóa bài viết": {
    en: "Delete post",
    vi: "Xóa bài viết",
    la: "ລົບໂພສ",
  },
  "Chi tiết bài đăng": {
    en: "Post details",
    vi: "Chi tiết bài đăng",
    la: "ລາຍລະອຽດໂພສ",
  },
  "Trả lời bài viết": {
    en: "Reply to post",
    vi: "Trả lời bài viết",
    la: "ສະແດງຄວາມຄິດເຫັນ",
  },
  "Chưa có bài viết nào": {
    en: "No posts available",
    vi: "Chưa có bài viết nào",
    la: "ບໍ່ມີໂພສທີ່ມີຢູ່",
  },
  "Câu trả lời": {
    en: "Answers",
    vi: "Câu trả lời",
    la: "ຄວາມຄິດເຫັນ",
  },
  "phải hồi": {
    en: "Feedback",
    vi: "phải hồi",
    la: "ຕອບກັບ",
  },
  ngày: {
    en: "Day",
    vi: "ngày",
    la: "ວັນ",
  },
  giờ: {
    en: "Hour",
    vi: "giờ",
    la: "ຊົ່ວໂມງ",
  },
  phút: {
    en: "Minute",
    vi: "phút",
    la: "ນາທີ",
  },
  "Tiêu đề": {
    en: "Title",
    vi: "Tiêu đề",
    la: "ຫົວຂໍ້",
  },
  "Mô tả": {
    en: "Description",
    vi: "Mô tả",
    la: "ອະທິບາຍ",
  },
  Tags: {
    en: "Tags",
    vi: "Tags",
    la: "ແທັກ",
  },
  "(Ví dụ: example 1, example 2, ...)": {
    en: "(For example: example 1, example 2, ...)",
    vi: "(Ví dụ: example 1, example 2, ...)",
    la: "(ຕົວຢ່າງ: Tag1, Tag2, ...)",
  },
  "Trở lại": {
    en: "Back",
    vi: "Trở lại",
    la: "ກັບຄືນ",
  },
  "Lưu vào bản nháp": {
    en: "Save to drafts",
    vi: "Lưu vào bản nháp",
    la: "ບັນທຶກຮ່າງ",
  },
  "Đăng bài": {
    en: "Post",
    vi: "Đăng bài",
    la: "ໂພສ",
  },
  Ảnh: {
    en: "Image",
    vi: "Ảnh",
    la: "ຮູບພາບ",
  },
  "Thêm tiệp tin": {
    en: "Add file",
    vi: "Thêm tiệp tin",
    la: "ເພີ່ມໄຟລ໌",
  },
  "Phổ biến": {
    en: "Popular",
    vi: "Phổ biến",
    la: "ຍອດນິຍົມ",
  },
  "Top.9 bài viết phổ biến": {
    en: "Top.9 popular posts",
    vi: "Top.9 bài viết phổ biến",
    la: "ທອັປ.9 ໂພສຍອດນິຍົມ",
  },
  "Top.90 bài viết phổ biến": {
    en: "Top.90 popular posts",
    vi: "Top.90 bài viết phổ biến",
    la: "ທອັປ.90 ໂພສຍອດນິຍົມ",
  },
  "Cài đặt màn hình": {
    en: "Screen settings",
    vi: "Cài đặt màn hình",
    la: "ຕັ້ງຄ່າໜ້າຈໍ",
  },
  "Chế độ sáng / tối": {
    en: "Light / Dark mode",
    vi: "Chế độ sáng / tối",
    la: "ໂໝດສະຫວ່າງ / ມືດ",
  },
  "Chọn chế độ hiển thị sáng hoặc tối phù hợp với sở thích của bạn": {
    en: "Choose light or dark mode that suits your preference",
    vi: "Chọn chế độ hiển thị sáng hoặc tối phù hợp với sở thích của bạn",
    la: "ເລືອກໂໝດຈໍສະແດງຜົນສະຫວ່າງ ຫຼື ມືດ ທີ່ເໝາະສົມກັບຄວາມມັກຂອງທ່ານ",
  },
  Sáng: {
    en: "Light",
    vi: "Sáng",
    la: "ສະຫວ່າງ",
  },
  Tối: {
    en: "Dark",
    vi: "Tối",
    la: "ມືດ",
  },
  "Tự động": {
    en: "Automatic",
    vi: "Tự động",
    la: "ອັດຕະໂນມັດ",
  },
  "Điều chỉnh màn hình sáng vào ban ngày và tối vào ban đêm.": {
    en: "Adjust screen brightness during the day and darken at night.",
    vi: "Điều chỉnh màn hình sáng vào ban ngày và tối vào ban đêm.",
    la: "ປັບໜ້າຈໍໃຫ້ສະຫວ່າງໃນເວລາກາງເວັນ ແລະ ມືດໃນຕອນກາງຄືນ.",
  },
  "Thay đổi mật khẩu": {
    en: "Change Password",
    vi: "Thay đổi mật khẩu",
    la: "ປ່ຽນລະຫັດຜ່ານ",
  },
  "Mật khẩu hiện tại": {
    en: "Current Password",
    vi: "Mật khẩu hiện tại",
    la: "ລະຫັດຜ່ານປັດຈຸບັນ",
  },
  "Mật khẩu mới": {
    en: "New Password",
    vi: "Mật khẩu mới",
    la: "ລະຫັດຜ່ານໃໝ່",
  },
  "Xác nhận mật khẩu mới": {
    en: "Confirm New Password",
    vi: "Xác nhận mật khẩu mới",
    la: "ຢືນຢັນລະຫັດຜ່ານໃໝ່",
  },
  "Thông báo": {
    en: "Notification",
    vi: "Thông báo",
    la: "ແຈ້ງເຕືອນ",
  },
  "đã trả lời bài viết của bạn:": {
    en: "has replied to your post:",
    vi: "đã trả lời bài viết của bạn:",
    la: "ສະແດງຄວາມຄິດເຫັນໃນໂພສຂອງທ່ານ:",
  },
  "bài viết của bạn:": {
    en: "your post:",
    vi: "bài viết của bạn:",
    la: "ໃນໂພສຂອງທ່ານ:",
  },
  "ngày trước": {
    en: "days ago",
    vi: "ngày trước",
    la: "ວັນທີ່ແລ້ວ",
  },
  "giờ trước": {
    en: "hours ago",
    vi: "giờ trước",
    la: "ຊົ່ວໂມງທີ່ແລ້ວ",
  },
  "phút trước": {
    en: "minutes ago",
    vi: "phút trước",
    la: "ນາທີທີ່ແລ້ວ",
  },
  "Xem tất cả 12 thông báo": {
    en: "View all 12 notifications",
    vi: "Xem tất cả 12 thông báo",
    la: "ສະແດງທັງໝົດ 12 ແຈ້ງເຕືອນ",
  },
  "Cỡ chữ": {
    en: "Font Size",
    vi: "Cỡ chữ",
    la: "ຂະຫນາດຕົວອັກສອນ",
  },
  "Chọn cỡ chữ hiển thị to hoặc nhỏ": {
    en: "Choose a larger or smaller display font size",
    vi: "Chọn cỡ chữ hiển thị to hoặc nhỏ",
    la: "ເລືອກຂະຫນາດຕົວອັກສອນທີ່ໃຫຍ່ກວ່າ ຫຼື ນ້ອຍກວ່າ",
  },
  Nhỏ: {
    en: "Small",
    vi: "Nhỏ",
    la: "ນ້ອຍ",
  },
  "Vừa (Mặc định)": {
    en: "Medium (Default)",
    vi: "Vừa (Mặc định)",
    la: "ຂະຫນາດກາງ (ຄ່າເລີ່ມຕົ້ນ)",
  },
  Lớn: {
    en: "Large",
    vi: "Lớn",
    la: "ໃຫຍ່",
  },
};
