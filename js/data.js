/* ================================================================
   js/data.js — Dữ liệu sản phẩm
   Thêm/sửa/xóa sản phẩm tại đây
   ================================================================ */

const PRODUCTS = [
  {
    id: 1,
    name: "Hoa Hồng Đỏ Tình Yêu",
    price: 300000,
    oldPrice: 350000,
    category: "HOA SINH NHẬT",
    img: "./img/hoahong.png",
    imgFallback: "https://images.unsplash.com/photo-1559563458-527698bf5295?w=400&h=400&fit=crop",
    desc: "Bó hoa hồng đỏ tươi tắn, biểu tượng của tình yêu nồng nàn.",
    fullDesc: "Hoa hồng đỏ được chọn lọc kỹ càng từ những nông trại hoa uy tín, đảm bảo tươi lâu 5-7 ngày. Mỗi bó gồm 12-15 bông hồng đỏ rực rỡ, kèm baby trắng và lá xanh tươi tắn. Giao hàng trong hộp giấy kraft sang trọng, kèm thiệp cứng miễn phí.",
    tags: ["Sinh nhật", "Valentine", "Kỷ niệm"],
    hot: true
  },
  {
    id: 2,
    name: "Hoa Mẫu Đơn Cao Cấp",
    price: 500000,
    oldPrice: 580000,
    category: "HOA KHAI TRƯƠNG",
    img: "./img/hoamaudon.png",
    imgFallback: "https://images.unsplash.com/photo-1490750967868-88df5691cc2c?w=400&h=400&fit=crop",
    desc: "Hoa mẫu đơn sang trọng, thích hợp cho các dịp khai trương.",
    fullDesc: "Mẫu đơn được nhập trực tiếp từ Đà Lạt, loại cao cấp với cánh hoa dày, màu sắc rực rỡ. Bó gồm 8-10 bông mẫu đơn mix màu hồng - trắng - tím, bọc giấy lụa cao cấp.",
    tags: ["Khai trương", "Chúc mừng", "Cao cấp"],
    hot: true
  },
  {
    id: 3,
    name: "Hoa Ly Trắng Tinh Khôi",
    price: 450000,
    oldPrice: 500000,
    category: "HOA SINH NHẬT",
    img: "./img/hoaly.png",
    imgFallback: "https://images.unsplash.com/photo-1612198636935-6b73b31a3a97?w=400&h=400&fit=crop",
    desc: "Hoa ly trắng thanh tao, lý tưởng tặng thầy cô, sinh nhật.",
    fullDesc: "Hoa ly (lily) trắng nhập khẩu từ Hà Lan, cánh hoa to đẹp, hương thơm nồng nàn. Mỗi cành có 3-5 bông, bó 5-7 cành kết hợp statice tím lãng mạn.",
    tags: ["Sinh nhật", "Tặng thầy cô", "Thuần khiết"],
    hot: true
  },
  {
    id: 4,
    name: "Hoa Tulip Hà Lan",
    price: 350000,
    oldPrice: 420000,
    category: "HOA THEO BÓ",
    img: "./img/hoatulip.png",
    imgFallback: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=400&h=400&fit=crop",
    desc: "Tulip nhập khẩu Hà Lan, đa màu sắc tươi sáng.",
    fullDesc: "Tulip nhập khẩu trực tiếp từ Hà Lan, giống cao cấp cánh hoa mềm mại. Bó 15-20 bông mix màu đỏ - vàng - tím - trắng.",
    tags: ["Nhập khẩu", "Mix màu", "Tình yêu"],
    hot: true
  },
  {
    id: 5,
    name: "Bó Hoa Hướng Dương",
    price: 280000,
    oldPrice: 320000,
    category: "HOA SINH NHẬT",
    img: "./img/5.png",
    imgFallback: "https://images.unsplash.com/photo-1487530811015-780b4c00fe3f?w=400&h=400&fit=crop",
    desc: "Hoa hướng dương tươi vui, mang lại năng lượng tích cực.",
    fullDesc: "Hướng dương vàng rực rỡ tượng trưng cho niềm vui. Bó 5-7 bông kết hợp baby trắng và lá xanh tươi.",
    tags: ["Vui vẻ", "Bạn bè", "Năng lượng"],
    hot: false
  },
  {
    id: 6,
    name: "Hoa Cát Tường Mix",
    price: 380000,
    oldPrice: 450000,
    category: "HOA TƯƠI",
    img: "./img/6.png",
    imgFallback: "https://images.unsplash.com/photo-1445297262591-0f5b26eb3ded?w=400&h=400&fit=crop",
    desc: "Cát tường dịu dàng, tinh tế. Thích hợp mọi dịp.",
    fullDesc: "Hoa cát tường trồng tại Đà Lạt, màu sắc từ tím nhạt đến trắng tinh. Bó 20-25 bông mix pastel dịu dàng.",
    tags: ["Pastel", "Lãng mạn", "Đà Lạt"],
    hot: false
  },
  {
    id: 7,
    name: "Hoa Hồng Pastel",
    price: 420000,
    oldPrice: 480000,
    category: "CHỦ ĐỀ ĐẶC BIỆT",
    img: "./img/7.png",
    imgFallback: "https://images.unsplash.com/photo-1495841674013-43ade6516c54?w=400&h=400&fit=crop",
    desc: "Hồng pastel tông màu dịu dàng, lý tưởng chụp ảnh, kỷ niệm.",
    fullDesc: "Hồng pastel xu hướng hot với màu sắc nhẹ nhàng, nữ tính. Bó 20 bông mix hồng phấn - trắng sữa - peach.",
    tags: ["Trendy", "Chụp ảnh", "Instagram"],
    hot: false
  },
  {
    id: 8,
    name: "Cappuccino",
    price: 450000,
    oldPrice: null,
    category: "CHỦ ĐỀ ĐẶC BIỆT",
    img: "./img/8.png",
    imgFallback: "https://images.unsplash.com/photo-1490750967868-88df5691cc2c?w=400&h=400&fit=crop",
    desc: "Bó hoa tông kem nâu ấm áp, độc đáo và sang trọng.",
    fullDesc: "Cappuccino là bó hoa theo chủ đề tone nâu caramel - kem đặc biệt. Phối hợp nhiều loài hoa tông màu nâu kem lãng mạn.",
    tags: ["Độc đáo", "Sang trọng", "Tặng đặc biệt"],
    hot: false
  }
];
