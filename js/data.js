/* js/data.js — Dữ liệu sản phẩm
   Thêm/sửa/xóa sản phẩm tại đây*/

const PRODUCTS = [
  {
    id: 1,
    name: "Hoa Hồng Trắng Kem Dâu",
    price: 540000,
    oldPrice: 600000,
    category: ["HOA SINH NHẬT", "HOA THEO BÓ", "CHỦ ĐỀ ĐẶC BIỆT"],
    img: "./img/hoahongtrang.png",
    fullDesc: "Sự kết hợp tinh khôi giữa những đóa hồng kem dâu ngọt ngào cùng thạch thảo tím mộng mơ. Bó hoa mang phong cách hiện đại với giấy gói tổ ong độc đáo, là món quà hoàn hảo để thay lời muốn nói, gửi gắm sự chân thành và yêu thương đến người nhận.",
    tags: ["Hoa sinh nhật", "Kỷ niệm đặc biệt"],
    hot: true
  },
  {
    id: 2,
    name: "Hoa Hướng Dương Rực Rỡ",
    price: 400000,
    oldPrice: 450000,
    category: ["HOA KHAI TRƯƠNG", "HOA THEO BÓ", "CHỦ ĐỀ ĐẶC BIỆT"],
    img: "./img/hoahuongduong.png",
    fullDesc: "Ba đóa hướng dương to tròn, rực rỡ tỏa sáng trên nền hoa baby trắng tinh khôi như những đám mây. Giấy gói kraft nâu tối giản giúp tôn vinh vẻ đẹp tự nhiên, mộc mạc nhưng không kém phần sang trọng của hoa.",
    tags: ["Khai trương", "Chúc mừng sự kiện", "Hoa cao cấp"],
    hot: false
  },
  {
    id: 3,
    name: "Hoa Cát Tường Xanh Bơ",
    price: 730000,
    oldPrice: 750000,
    category: ["THIẾT KẾ RIÊNG", "HOA THEO BÓ", "CHỦ ĐỀ ĐẶC BIỆT"],
    img: "./img/hoacattuong.png",
    fullDesc: "Sự kết hợp tinh tế giữa những đóa Cát Tường xanh bơ nhẹ nhàng và nhánh Hồng Trắng thuần khiết. Điểm xuyến cùng lá Khuynh Diệp trên nền giấy gói đen huyền bí, bó hoa mang đến vẻ đẹp tối giản nhưng đầy quyền năng, là lựa chọn hoàn hảo cho những tâm hồn yêu sự thanh lịch.",
    tags: ["Chúc mừng sự kiện", "Tinh tế", "Thuần khiết"],
    hot: true,
    custom: true
  },
  {
    id: 4,
    name: "Hoa Hồng Đỏ Sang Trọng",
    price: 700000,
    oldPrice: 800000,
    category: ["HOA THEO BÓ", "HOA SINH NHẬT", "CHỦ ĐỀ ĐẶC BIỆT"],
    img: "./img/hoahongdo.png",
    fullDesc: "Một sự kết hợp đầy quyền lực giữa những đóa hồng đỏ thắm và giấy gói đen mờ cao cấp. Sắc trắng tinh khôi của hoa baby điểm xuyết như những vì sao, làm nổi bật lên vẻ đẹp kiêu sa của hoa hồng. Đây không chỉ là một bó hoa, mà là một lời khẳng định về tình yêu bền vững và nồng nhiệt.",
    tags: ["Hiện đại", "Sang trọng", "Tình yêu"],
    hot: true
  },
  {
    id: 5,
    name: "Hoa Tulip Hồng Pastel Dịu Dàng",
    price: 580000,
    oldPrice: 650000,
    category: ["HOA THEO BÓ", "HOA SINH NHẬT", "CHỦ ĐỀ ĐẶC BIỆT"],
    img: "./img/hoatulip.png",
    fullDesc: "Tulip hồng pastel với màu sắc dịu dàng, phù hợp cho những dịp đặc biệt. Bó hoa mang vẻ đẹp thanh tao, thoát tục, như một lời khen ngợi về sự duyên dáng và tâm hồn thuần khiết của người nhận.",
    tags: ["Nhẹ nhàng", "Nữ tính", "Đặc biệt"],
    hot: false
  },
  {
    id: 6,
    name: "Hoa Mẫu Đơn Hồng Mix",
    price: 1750000,
    oldPrice: 1800000,
    category: ["HOA THEO BÓ", "THIẾT KẾ RIÊNG", "CHỦ ĐỀ ĐẶC BIỆT"],
    img: "./img/hoamaudon.png", 
    fullDesc: "Một bản giao hưởng màu sắc đầy mê hoặc giữa sắc hồng lộng lẫy của Mẫu Đơn và vẻ đẹp độc bản của Tulip cánh xoăn xanh cốm. Bó hoa mang hơi thở của những khu vườn thượng uyển Châu Âu, vừa kiêu kỳ, vừa phóng khoáng, sẵn sàng chinh phục mọi ánh nhìn ngay từ giây đầu tiên.",
    tags: ["Pastel", "Lãng mạn", "Nhập khẩu"],
    hot: false
  },
  {
    id: 7,
    name: "Hoa Ly Kép (Rose Lily)",
    price: 1480000,
    oldPrice: 1500000,
    category: ["HOA THEO BÓ", "CHỦ ĐỀ ĐẶC BIỆT", "THIẾT KẾ RIÊNG", "HOA KHAI TRƯƠNG"],
    img: "./img/hoaly.png",
    fullDesc: "Một tuyệt tác từ dòng Ly kép nhập khẩu với những cánh hoa xếp lớp bồng bềnh như mây. Sắc hồng tươi tắn kết hợp cùng giấy gói xám tro hiện đại tạo nên một tổng thể vừa rực rỡ vừa sang trọng. Bó hoa là biểu tượng của sự quý phái và những lời chúc tốt đẹp nhất dành cho người nhận.",
    tags: ["Nhập khẩu", "Thịnh vượng", "Sang trọng"],
    hot: false,
    custom: true
  },
  {
    id: 8,
    name: "Hoa Cẩm Tú Cầu Xanh",
    price: 470000,
    oldPrice: null,
    category: ["HOA THEO BÓ", "CHỦ ĐỀ ĐẶC BIỆT", "HOA SINH NHẬT"],
    img: "./img/hoacamtucau.png",
    fullDesc: "Mang sắc xanh dịu mát như bầu trời sau cơn mưa, đóa Cẩm Tú Cầu khổng lồ kết hợp cùng những bông cúc Tana nhỏ nhắn tạo nên vẻ đẹp thuần khiết và bình dị. Lớp giấy gói Kraft nâu mộc mạc làm tôn lên sự tinh tế, rất phù hợp để gửi gắm sự quan tâm chân thành đến người thương yêu.",
    tags: ["Độc đáo", "Sang trọng", "Tặng đặc biệt"],
    hot: false
  },
  {
    id: 9,
    name: "Hoa hồng Ohara",
    price: 750000,
    oldPrice: null,
    category: ["HOA THEO BÓ", "CHỦ ĐỀ ĐẶC BIỆT", "HOA SINH NHẬT"],
    img: "./img/hoahongohara.png",
    fullDesc: "Một sự kết hợp đầy trẻ trung giữa sắc hồng ngọt ngào của những đóa Ohara và nét trong trẻo của cúc Tana. Điểm nhấn độc đáo nằm ở lớp giấy gói in chữ phong cách báo chí (News Diary) kết hợp cùng voan hồng mềm mại, mang đến vẻ đẹp vừa cổ điển vừa hiện đại cho món quà của bạn.",
    tags: ["Hiện đại", "Trẻ trung"],
    hot: false
  }, 
  {
    id: 10,
    name: "Capuccino",
    price: 700000,
    oldPrice: null,
    category: ["HOA THEO BÓ", "CHỦ ĐỀ ĐẶC BIỆT", "THIẾT KẾ RIÊNG"],
    img: "./img/hoadongtien.png",
    fullDesc: "Một sự kết hợp đầy ngẫu hứng giữa sắc cam đất của hoa đồng tiền nhí và vẻ trầm mặc của những loại lá phụ khô. Bó hoa mang phong cách Rustic mộc mạc, gói gọn cả một không gian hoàng hôn lãng mạn, là món quà độc đáo dành cho những tâm hồn yêu nét đẹp hoài cổ.",
    tags: ["Mộc mạc", "Giản dị", "Vintage"],
    hot: true,
    custom: true
  },
  {
    id: 11,
    name: "Rose Garden",
    price: 800000,
    oldPrice: null,
    category: ["HOA THEO BÓ", "CHỦ ĐỀ ĐẶC BIỆT", "THIẾT KẾ RIÊNG"],
    img: "./img/hoahongmix.png",
    fullDesc: "Bản giao hưởng của những sắc hồng từ dịu dàng đến nồng nhiệt. Sự kết hợp giữa hồng kem dâu thanh khiết và hồng sen rực rỡ, điểm xuyết cùng lá bạc nhập khẩu mang đến vẻ đẹp hiện đại, trẻ trung. Lớp giấy gói màu hồng cam đất và lưới trắng tạo nên phong cách vừa sang trọng vừa tinh tế.",
    tags: ["Nhẹ nhàng", "Ngọt ngào"],
    hot: false,
    custom: true
  },
];