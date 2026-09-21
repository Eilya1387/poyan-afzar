// @ts-check
/**
 * Seed 21 rich, realistic digital and computer hardware products to Poyan Afzar backend
 */

const BASE_URL = "https://api.poyanafzar.noteduco342.ir";

const productsToSeed = [
  // ===================== LAPTOPS =====================
  {
    id: "macbook-pro-m3",
    title: "لپ‌تاپ ۱۴.۲ اینچی اپل مدل MacBook Pro M3 (رم ۸ گیگابایت / حافظه ۵۱۲ گیگابایت SSD)",
    enTitle: "Apple MacBook Pro 14 (Late 2023) M3 Chip - 8GB / 512GB SSD Space Gray",
    code: "TK-941011",
    categorySlug: "laptop",
    brandSlug: "apple",
    price: 104500000,
    originalPrice: 115000000,
    stock: 7,
    minStockThreshold: 2,
    inStock: true,
    stockText: "موجود در انبار مرکزی پویان افزار",
    seller: "پویان افزار (انبار مرکزی)",
    warranty: "گارانتی ۱۸ ماهه شرکتی + ضمانت اصالت کالا",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=800&q=80"
    ],
    description: "مک‌بوک پرو ۱۴ اینچ با تراشه نوآورانه M3 اپل، راندمان مصرف انرژی خارق‌العاده و عملکرد محاسباتی خیره‌کننده‌ای را در شاسی آلومینیومی مستحکم ارائه می‌دهد. نمایشگر خیره‌کننده Liquid Retina XDR، پورت‌های متنوع MagSafe، HDMI و کارت‌خوان SDXC، این دستگاه را به ایده‌آل‌ترین لپ‌تاپ حرفه‌ای بازار تبدیل ساخته است.",
    introTitle: "قدرت بی‌رقیب پردازش حرفه‌ای با تراشه اختصاصی M3 اپل",
    introDesc: "مک‌بوک پرو جدید ۱۴ اینچی با تراشه M3، معماری گرافیکی نسل بعد با قابلیت Dynamic Caching و رهگیری پرتو سخت‌افزاری (Hardware-accelerated Ray Tracing) را به دنیای مک وارد می‌کند. شارژدهی شگفت‌انگیز تا ۲۲ ساعت، سیستم صوتی شش‌گانه مجهز به اسپیکرهای استودیو و وب‌کم 1080p FaceTime HD، تجربه کاری بی‌نقصی برای شما رقم می‌زند.",
    specs: [
      { label: "پردازنده اصلی (CPU)", value: "Apple M3 Chip (8 Cores: 4 Performance + 4 Efficiency)" },
      { label: "پردازنده گرافیکی (GPU)", value: "10 Core GPU with Hardware Ray Tracing" },
      { label: "حافظه یکپارچه (RAM)", value: "8 گیگابایت Unified Memory" },
      { label: "حافظه داخلی (SSD)", value: "512 گیگابایت PCIe NVMe پرسرعت" },
      { label: "صفحه نمایش", value: "14.2 اینچ Liquid Retina XDR با وضوح 3024x1964 و ProMotion 120Hz" },
      { label: "شارژدهی باتری", value: "تا ۲۲ ساعت تماشای ویدیو / باتری ۷۰ وات‌ساعت" },
      { label: "وزن دستگاه", value: "۱.۵۵ کیلوگرم" }
    ],
    featureCards: [
      { title: "تراشه ۳ نانومتری M3", desc: "سرعت پردازش چشمگیر با بهینه‌ترین مصرف باتری در تاریخ", icon: "Cpu" },
      { title: "نمایشگر Liquid Retina XDR", desc: "روشنایی حداکثری ۱۶۰۰ نیت با تفکیک رنگ فوق‌العاده", icon: "Monitor" },
      { title: "عمر باتری ۲۲ ساعته", desc: "آزادی عمل کامل در پروژه‌های طولانی بدون نیاز به شارژر", icon: "BatteryCharging" }
    ],
    colors: [
      { name: "خاکستری فضایی (Space Gray)", hex: "#535150" },
      { name: "نقره‌ای (Silver)", hex: "#E3E4E5" }
    ],
    badges: ["پرفروش", "ضمانت اصالت", "ارسال اکسپرس"],
    highlights: [
      "مجهز به لیتوگرافی پیشرفته ۳ نانومتری M3 برای افزایش سرعت و پایداری عملکرد",
      "سیستم صوتی ۶ اسپیکره های‌فای مجهز به ووفرهای Force-Cancelling",
      "پشتیبانی از فناوری ProMotion با نرخ بازسازی متغیر تا ۱۲۰ هرتز",
      "طراحی خنک‌کننده پیشرفته و بی‌صدا در اکثر سناریوهای پردازشی"
    ]
  },
  {
    id: "asus-rog-zephyrus-g16",
    title: "لپ‌تاپ گیمینگ ۱۶ اینچی ایسوس مدل ROG Zephyrus G16 GU605MI (Core Ultra 9 / 32GB / 1TB SSD / RTX 4070 / OLED 240Hz)",
    enTitle: "ASUS ROG Zephyrus G16 GU605MI Core Ultra 9 185H / 32GB DDR5 / 1TB SSD / RTX 4070 8GB / 2.5K 240Hz OLED",
    code: "TK-941012",
    categorySlug: "laptop",
    brandSlug: "asus",
    price: 139000000,
    originalPrice: 148000000,
    stock: 5,
    minStockThreshold: 2,
    inStock: true,
    stockText: "موجود در انبار مرکزی پویان افزار",
    seller: "پویان افزار (انبار مرکزی)",
    warranty: "گارانتی ۲۴ ماهه یکپارچه ایسوس (سازگار / ماتریس / حامی)",
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80"
    ],
    description: "لپ‌تاپ ROG Zephyrus G16 مدل ۲۰۲۴ شاهکار مهندسی ایسوس است. این لپ‌تاپ باریک با وزن تنها ۱.۸۵ کیلوگرم، پردازنده نسل جدید Intel Core Ultra 9 مجهز به هوش مصنوعی NPU و کارت گرافیک پرقدرت RTX 4070 را درون شاسی تمام آلومینیومی CNC جای داده است.",
    introTitle: "نهایت قدرت در کالبدی فوق‌باریک و نمایشگر اعجاب‌انگیز OLED ROG Nebula",
    introDesc: "زفیروس G16 نخستین لپ‌تاپ گیمینگ جهان با نمایشگر OLED ROG Nebula Display با زمان پاسخ‌گویی ۰.۲ میلی‌ثانیه و نرخ نوسازی ۲۴۰ هرتز است. سیستم خنک‌کننده ROG Intelligent Cooling با فلز مایع و ۳ فن خنک‌کننده اجازه می‌دهد سخت‌افزار در بالاترین پایداری کار کند.",
    specs: [
      { label: "پردازنده (CPU)", value: "Intel Core Ultra 9 185H (16 Cores, 22 Threads, Up to 5.1GHz, Intel AI Boost NPU)" },
      { label: "کارت گرافیک (GPU)", value: "NVIDIA GeForce RTX 4070 Laptop GPU 8GB GDDR6 (TGP 105W with Dynamic Boost)" },
      { label: "حافظه رم (RAM)", value: "32 گیگابایت LPDDR5X-7467 Dual Channel" },
      { label: "حافظه داخلی (SSD)", value: "1 ترابایت PCIe 4.0 NVMe M.2 SSD" },
      { label: "صفحه نمایش", value: "16 اینچ 2.5K ROG Nebula OLED (2560x1600), 240Hz, 0.2ms, 100% DCI-P3, G-Sync" },
      { label: "باتری و شارژ", value: "۹۰ وات‌ساعت ۴ سلولی با شارژ سریع ۱۰۰ واتی Type-C" },
      { label: "وزن", value: "۱.۸۵ کیلوگرم با ضخامت ۱۴.۹ میلی‌متر" }
    ],
    featureCards: [
      { title: "نمایشگر 240Hz OLED", desc: "کنتراست بی‌نهایت، زمان پاسخ‌گویی 0.2ms و گواهی DisplayHDR True Black", icon: "Monitor" },
      { title: "هوش مصنوعی Intel AI", desc: "شتاب‌دهنده NPU برای تسریع پردازش‌های هوش مصنوعی و تولید محتوا", icon: "Zap" },
      { title: "طراحی شاسی یکپارچه CNC", desc: "فوق‌باریک با سیستم نورپردازی انیماتریس مورب Slash Lighting", icon: "Sparkles" }
    ],
    colors: [
      { name: "خاکستری تیره (Eclipse Gray)", hex: "#2B2D31" },
      { name: "سفید پلاتینیومی (Platinum White)", hex: "#E7E8EB" }
    ],
    badges: ["پیشنهاد ویژه", "گیمینگ پرچمدار", "ضمانت اصالت"],
    highlights: [
      "مجهز به پردازنده هوش مصنوعی Core Ultra 9 185H با واحد پردازش عصبی اختصاصی NPU",
      "نمایشگر ROG Nebula OLED با تفکیک رنگ ۱۰۰ درصدی DCI-P3 و عمق رنگ ۱۰ بیتی",
      "سیستم نورپردازی Slash Lighting در قاب پشتی با ۷ سناریوی انیمیشنی قابل تنظیم",
      "بلندگوهای ۴ تایی با پشتیبانی از Dolby Atmos و صدای با وضوح بالا (Hi-Res)"
    ]
  },
  {
    id: "lenovo-legion-pro-5",
    title: "لپ‌تاپ گیمینگ ۱۶ اینچی لنوو مدل Legion Pro 5 16IRX9 (Core i7 14700HX / 32GB / 1TB SSD / RTX 4060 / WQXGA 240Hz)",
    enTitle: "Lenovo Legion Pro 5 16IRX9 Intel Core i7 14700HX / 32GB DDR5 / 1TB SSD / RTX 4060 8GB / 240Hz IPS",
    code: "TK-941013",
    categorySlug: "laptop",
    brandSlug: "lenovo",
    price: 89500000,
    originalPrice: 97000000,
    stock: 8,
    minStockThreshold: 3,
    inStock: true,
    stockText: "موجود در انبار مرکزی پویان افزار",
    seller: "پویان افزار (انبار مرکزی)",
    warranty: "گارانتی ۲۴ ماهه سازگار ارقام / آواژنگ",
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80"
    ],
    description: "لپ‌تاپ Legion Pro 5 لنوو یکی از محبوب‌ترین لپ‌تاپ‌های گیمینگ و رندرینگ بازار با سیستم خنک‌کننده Legion Coldfront 5.0، پردازنده نسل ۱۴ با ۲۰ هسته پردازشی و توان گرافیکی کامل ۱۴۰ وات است.",
    introTitle: "شاهکار پردازشی با پایداری استثنایی و تراشه هوش مصنوعی Lenovo LA1",
    introDesc: "لپ‌تاپ لنوو لژیون پرو ۵ با تکیه بر پردازنده Core i7 14700HX و کارت گرافیک RTX 4060 به همراه تراشه اختصاصی هوش مصنوعی Lenovo AI Engine+ بهترین تنظیمات فریم‌ریت و توان مصرفی را در بازی‌های سنگین به صورت خودکار اعمال می‌کند.",
    specs: [
      { label: "پردازنده (CPU)", value: "Intel Core i7 14700HX (20 Cores, 28 Threads, Up to 5.5GHz, 33MB Cache)" },
      { label: "کارت گرافیک (GPU)", value: "NVIDIA GeForce RTX 4060 8GB GDDR6 (Full TGP 140W)" },
      { label: "حافظه رم", value: "32 گیگابایت DDR5-5600MHz (قابلیت ارتقا تا 64GB)" },
      { label: "حافظه اس‌اس‌دی", value: "1 ترابایت M.2 NVMe PCIe 4.0 SSD" },
      { label: "صفحه نمایش", value: "16 اینچ WQXGA (2560x1600) IPS 240Hz, 500 nits, 100% sRGB, DisplayHDR 400, G-SYNC" },
      { label: "کیبورد", value: "Legion TrueStrike با نورپردازی 4-Zone RGB و سوئیچ‌های نرم با جابجایی 1.5mm" },
      { label: "وزن", value: "۲.۵ کیلوگرم" }
    ],
    featureCards: [
      { title: "سیستم خنک‌کننده Coldfront 5.0", desc: "لوله‌های حرارتی مسی ضخیم و دو فن پرپره برای پایداری ۱۰۰ درصدی سخت‌افزار", icon: "Layers" },
      { title: "پنل IPS با نرخ ۲۴۰ هرتز", desc: "روشنایی پانصد نیت به همراه تفکیک رنگ بی‌نظیر برای بازی و طراحی", icon: "Monitor" },
      { title: "تراشه هوش مصنوعی LA1", desc: "تنظیم هوشمند توان پردازنده و گرافیک در لحظه برای بالاترین فریم‌ریت", icon: "Cpu" }
    ],
    colors: [
      { name: "خاکستری مات (Onyx Grey)", hex: "#353839" }
    ],
    badges: ["پرفروش", "ضمانت اصالت", "ارسال سریع"],
    highlights: [
      "پردازنده ۲۰ هسته‌ای قدرتمند سری HX اینتل نسل ۱۴",
      "گرافیک ۱۴۰ وات با بهره‌گیری از هوش مصنوعی DLSS 3 و Frame Generation",
      "کیبورد گیمینگ ارگونومیک با کلیدهای جهت‌نما در اندازه کامل و نام‌پد",
      "پورت‌های کامل شامل Ethernet گیگابیت، پورت‌های Type-C و HDMI 2.1"
    ]
  },

  // ===================== MOBILE =====================
  {
    id: "iphone-15-pro-max",
    title: "گوشی موبایل اپل مدل iPhone 15 Pro Max ظرفیت 256 گیگابایت رم 8 گیگابایت",
    enTitle: "Apple iPhone 15 Pro Max 256GB - 8GB RAM Natural Titanium",
    code: "TK-842011",
    categorySlug: "mobile",
    brandSlug: "apple",
    price: 88500000,
    originalPrice: 95000000,
    stock: 12,
    minStockThreshold: 4,
    inStock: true,
    stockText: "موجود در انبار مرکزی پویان افزار",
    seller: "پویان افزار (انبار مرکزی)",
    warranty: "گارانتی ۱۸ ماهه شرکتی معتبر + رجیستری شرکتی",
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1695048065036-0f33190b4d4a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80"
    ],
    description: "آیفون ۱۵ پرو مکس قدرتمندترین پرچمدار اپل با بدنه از جنس تیتانیوم گرید هوافضا، دکمه اکشن قابل شخصی‌سازی، پورت استاندارد USB-C با سرعت انتقال ۱۰ گیگابیت بر ثانیه و دوربین پریسکوپ تله‌فوتو با زوم اپتیکال ۵ برابری است.",
    introTitle: "انقلاب تیتانیومی؛ اوج خلاقیت و نوآوری اپل با تراشه A17 Pro",
    introDesc: "آیفون ۱۵ پرو مکس با وزن بهینه‌تر و حاشیه‌های نمایشگر بسیار باریک، مجهز به نخستین تراشه ۳ نانومتری صنعت موبایل یعنی Apple A17 Pro با معماری ۶ هسته‌ای و موتور عصبی ۱۶ هسته‌ای است که امکان اجرای روان بازی‌های کلاس کنسول را روی موبایل فراهم می‌کند.",
    specs: [
      { label: "پردازنده (SoC)", value: "Apple A17 Pro (3nm) با پردازنده گرافیکی 6 هسته‌ای" },
      { label: "حافظه داخلی و رم", value: "256 گیگابایت حافظه داخلی NVMe / 8 گیگابایت رم" },
      { label: "صفحه نمایش", value: "6.7 اینچ Super Retina XDR OLED (120Hz ProMotion), 2000 nits" },
      { label: "دوربین اصلی", value: "48 مگاپیکسل واید + 12 مگاپیکسل اولتراواید + 12 مگاپیکسل تله‌فوتو 5X" },
      { label: "باتری و شارژ", value: "۴۴۲۲ میلی‌آمپرساعت / شارژ مگ‌سیف ۱۵ وات و پورت USB-C 3.0" },
      { label: "جنس بدنه", value: "فریم تیتانیوم گرید ۵ با پوشش سرامیک شیلد مقاوم" }
    ],
    featureCards: [
      { title: "تراشه A17 Pro", desc: "نخستین چیپست ۳ نانومتری با اجرای مستقیم بازی‌های گرافیکی سنگین کنسولی", icon: "Cpu" },
      { title: "زوم اپتیکال ۵ برابری", desc: "لنز پریسکوپی تتراپریسم برای عکاسی تله‌فوتوی با جزئیات خیره‌کننده", icon: "Camera" },
      { title: "بدنه تیتانیومی سبک", desc: "مقاوم‌ترین و در عین حال سبک‌ترین متریال بدنه در تاریخ آیفون‌های پرو", icon: "ShieldCheck" }
    ],
    colors: [
      { name: "تیتانیوم طبیعی (Natural Titanium)", hex: "#9C958C" },
      { name: "تیتانیوم مشکی (Black Titanium)", hex: "#3C3B37" },
      { name: "تیتانیوم سفید (White Titanium)", hex: "#F2F1ED" },
      { name: "تیتانیوم آبی (Blue Titanium)", hex: "#2F3846" }
    ],
    badges: ["پرفروش", "ضمانت اصالت", "ارسال اکسپرس"],
    highlights: [
      "فریم سبک و مقاوم از جنس آلیاژ تیتانیوم هوافضا",
      "پورت USB-C با پهنای باند پرسرعت USB 3.0 تا 10Gbps برای فیلمبرداری ProRes مستقیم روی SSD",
      "دکمه Action Button چندمنظوره برای دسترسی آنی به دوربین، چراغ‌قوه یا میان‌برها",
      "سیستم جزیره پویا (Dynamic Island) با اعلان‌های روان و کارآمد"
    ]
  },
  {
    id: "xiaomi-14-ultra",
    title: "گوشی موبایل شیائومی مدل Xiaomi 14 Ultra 5G ظرفیت 512 گیگابایت رم 16 گیگابایت",
    enTitle: "Xiaomi 14 Ultra 5G 512GB - 16GB RAM Leica Quad Camera System",
    code: "TK-842012",
    categorySlug: "mobile",
    brandSlug: "xiaomi",
    price: 79900000,
    originalPrice: 86000000,
    stock: 6,
    minStockThreshold: 2,
    inStock: true,
    stockText: "موجود در انبار مرکزی پویان افزار",
    seller: "پویان افزار (انبار مرکزی)",
    warranty: "گارانتی ۱۸ ماهه شرکتی + کد فعال‌سازی رجیستری",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80"
    ],
    description: "شیائومی ۱۴ اولترا اوج هنر عکاسی موبایل با همکاری کمپانی معتبر لایکا (Leica) است. سنسور ۱ اینچی سونی LYT-900 با دیافراگم متغیر بدون پله، چهار سنسور ۵۰ مگاپیکسلی حرفه‌ای، پردازنده Snapdragon 8 Gen 3 و شارژ سریع ۹۰ واتی، این محصول را به سلاح بی‌رقیب عکاسان بدل کرده است.",
    introTitle: "عکاسی حرفه‌ای با سنسور افسانه‌ای ۱ اینچی و لنزهای اپتیکال لایکا",
    introDesc: "شیائومی ۱۴ اولترا با ترکیب پنل فوق‌العاده باکیفیت 2K C8 OLED، شارژدهی ۵۰۰۰ میلی‌آمپر ساعتی، شارژ بی‌سیم ۸۰ واتی و بدنه مقاوم در برابر آب و گرد و غبار IP68، نهایت استاندارد یک پرچمدار اندرویدی تمام‌عیار را به نمایش می‌گذارد.",
    specs: [
      { label: "پردازنده (SoC)", value: "Qualcomm Snapdragon 8 Gen 3 (4nm) با پردازشگر گرافیکی Adreno 750" },
      { label: "حافظه داخلی و رم", value: "512 گیگابایت UFS 4.0 / 16 گیگابایت رم LPDDR5X" },
      { label: "صفحه نمایش", value: "6.73 اینچ LTPO AMOLED با وضوح 1440x3200 (120Hz, 3000 nits, Dolby Vision)" },
      { label: "مجموعه دوربین چهارگانه", value: "چهار سنسور 50 مگاپیکسلی با لنزهای Summilux لایکا (اصلی ۱ اینچی سونی LYT-900)" },
      { label: "فیلمبرداری", value: "8K با 30 فریم بر ثانیه و 4K با 120 فریم و پروفایل 10-bit Log" },
      { label: "باتری و سرعت شارژ", value: "۵۰۰۰ میلی‌آمپرساعت / شارژ باسیم ۹۰ وات و شارژ بی‌سیم ۸۰ وات" }
    ],
    featureCards: [
      { title: "سنسور ۱ اینچی سونی LYT-900", desc: "دامنه دینامیکی بی‌نظیر ۱۴ استاپ با دیافراگم متغیر f/1.63 تا f/4.0", icon: "Camera" },
      { title: "شارژ فوق سریع ۹۰ وات", desc: "شارژ کامل باتری در کمتر از ۳۳ دقیقه با شارژر داخل جعبه", icon: "Zap" },
      { title: "پردازنده اسنپدراگون ۸ نسل ۳", desc: "بالاترین بازده پردازشی و هوش مصنوعی در پلتفرم اندروید", icon: "Cpu" }
    ],
    colors: [
      { name: "مشکی با قاب چرم گیاهی نانو", hex: "#1A1A1A" },
      { name: "سفید ابریشمی لایکا", hex: "#F5F5F5" }
    ],
    badges: ["پرچمدار عکاسی", "ضمانت اصالت", "ارسال اکسپرس"],
    highlights: [
      "مجهز به چهار سنسور ۵۰ مگاپیکسلی همگام شده با سیستم رنگ اختصاصی Leica Authentic",
      "نمایشگر خمیده چهار لبه با شیشه اختصاصی Xiaomi Shield Glass",
      "پشتیبانی از شارژ فوق‌العاده سریع بی‌سیم ۸۰ واتی",
      "فیلمبرداری سینمایی با عمق رنگ ۱۰ بیتی Rec.2020"
    ]
  },
  {
    id: "samsung-s23-fe",
    title: "گوشی موبایل سامسونگ مدل Galaxy S23 FE 5G ظرفیت 256 گیگابایت رم 8 گیگابایت",
    enTitle: "Samsung Galaxy S23 FE 5G 256GB - 8GB RAM Graphite",
    code: "TK-842013",
    categorySlug: "mobile",
    brandSlug: "samsung",
    price: 29800000,
    originalPrice: 33500000,
    stock: 15,
    minStockThreshold: 5,
    inStock: true,
    stockText: "موجود در انبار مرکزی پویان افزار",
    seller: "پویان افزار (انبار مرکزی)",
    warranty: "گارانتی ۱۸ ماهه شرکتی داریا همراه / مایکروتل + کد رجیستری",
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80"
    ],
    description: "سامسونگ گلکسی S23 FE نسخه فن ادیشن پرچمدار سامسونگ با طراحی شیک مینیمال، فریم آلومینیومی، دوربین ۵۰ مگاپیکسلی با کیفیت پرچمداران و پشتیبانی کامل از هوش مصنوعی Galaxy AI گزینه‌ای فوق‌العاده با ارزش خرید بالا است.",
    introTitle: "تجربه پرچمدار با قیمت مقرون‌به‌صرفه و هوش مصنوعی Galaxy AI",
    introDesc: "گوشی Galaxy S23 FE با نمایشگر درخشان Dynamic AMOLED 2X، پشتیبانی از استاندارد ضدآب IP68 و بهینه‌سازی‌های نرم‌افزاری رابط کاربری One UI به همراه ۴ سال آپدیت سیستم‌عامل اندروید، دوام و کارایی طولانی‌مدت را تضمین می‌کند.",
    specs: [
      { label: "پردازنده (CPU)", value: "Exynos 2200 (4nm) با پردازشگر گرافیکی Xclipse 920 بر پایه معماری AMD RDNA 2" },
      { label: "حافظه داخلی و رم", value: "256 گیگابایت / 8 گیگابایت رم" },
      { label: "صفحه نمایش", value: "6.4 اینچ Dynamic AMOLED 2X با نرخ 120Hz و HDR10+, 1450 nits" },
      { label: "دوربین اصلی", value: "50 مگاپیکسل واید با لرزشگیر اپتیکال OIS + 12 مگاپیکسل اولتراواید + 8 مگاپیکسل تله‌فوتو 3X" },
      { label: "باتری و شارژ", value: "۴۵۰۰ میلی‌آمپرساعت / شارژ ۲۵ وات و شارژ بی‌سیم ۱۵ وات" },
      { label: "استاندارد مقاومت", value: "IP68 مقاوم در برابر نفوذ آب و گرد و غبار (عمق ۱.۵ متر به مدت ۳۰ دقیقه)" }
    ],
    featureCards: [
      { title: "هوش مصنوعی Galaxy AI", desc: "قابلیت‌های ترجمه زنده مکالمه، Circle to Search و ادیت هوشمند عکس", icon: "Sparkles" },
      { title: "نمایشگر Dynamic AMOLED 2X", desc: "کنتراست فوق‌العاده و رنگ‌های شفاف با نرخ نوسازی روان ۱۲۰ هرتز", icon: "Monitor" },
      { title: "دوربین ۵۰ مگاپیکسلی با OIS", desc: "عکاسی باکیفیت در شب و تثبیت اپتیکال تصویر در ضبط ویدیوها", icon: "Camera" }
    ],
    colors: [
      { name: "گرافیتی (خاکستری تیره)", hex: "#3A3B3C" },
      { name: "سبز نعنایی (Mint)", hex: "#D6E5D8" },
      { name: "کرم روشن (Cream)", hex: "#F2EBD9" },
      { name: "بنفش ارغوانی (Purple)", hex: "#7E6E85" }
    ],
    badges: ["پرفروش", "ضمانت اصالت", "ارزش خرید بالا"],
    highlights: [
      "مجهز به امکانات پیشرفته هوش مصنوعی سامسونگ Galaxy AI",
      "دوربین پرچمدار با زوم اپتیکال ۳ برابری تله‌فوتو و سنسور ۵۰ مگاپیکسلی",
      "بدنه مرغوب از ترکیب شیشه محافظ Gorilla Glass 5 و آلومینیوم مات",
      "پشتیبانی نرم‌افزاری طولانی‌مدت تا ۴ نسخه ارتقای اندروید"
    ]
  },

  // ===================== AUDIO =====================
  {
    id: "sony-wh-1000xm5",
    title: "هدفون بی‌سیم سونی مدل WH-1000XM5 با قابلیت نویز کنسلینگ فعال",
    enTitle: "Sony WH-1000XM5 Wireless Noise Canceling Headphones Black",
    code: "TK-671011",
    categorySlug: "audio",
    brandSlug: "sony",
    price: 18400000,
    originalPrice: 20500000,
    stock: 10,
    minStockThreshold: 3,
    inStock: true,
    stockText: "موجود در انبار مرکزی پویان افزار",
    seller: "پویان افزار (انبار مرکزی)",
    warranty: "گارانتی ۱۸ ماهه شرکتی + ضمانت اصالت فیزیکی کالا",
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80"
    ],
    description: "هدفون پرچمدار WH-1000XM5 سونی استانداردی زرین در حذف نویز فعال (ANC) در سراسر جهان است. مجهز به ۲ پردازنده مجزا و ۸ میکروفون اختصاصی، پشتیبانی از کدک باکیفیت LDAC و درایورهای فیبر کربنی ۳۰ میلی‌متری صدایی زلال و بدون هرگونه اعوجاج را به گوش شما می‌رساند.",
    introTitle: "سکوت مطلق در اوج شلوغی با قدرتمندترین هدفون نویز کنسلینگ سونی",
    introDesc: "هدفون سونی با طراحی بسیار سبک و ارگونومیک، پدهای چرم نرم و قابلیت هوشمند Auto NC Optimizer نویز محیط را در هر لحظه بر اساس نحوه قرارگیری و شرایط فشار هوا تنظیم می‌کند. قابلیت Speak-to-Chat و شارژدهی تا ۴۰ ساعت این محصول را بی‌رقیب ساخته است.",
    specs: [
      { label: "نوع اتصال", value: "بلوتوث نسخه 5.2 / کابل جک 3.5 میلی‌متری با روکش طلا" },
      { label: "قطر درایور", value: "30 میلی‌متر با دیافراگم کامپوزیت فیبر کربن سبک" },
      { label: "کدک‌های صوتی پشتیبانی شده", value: "LDAC, AAC, SBC با پشتیبانی از صوتی Hi-Res Audio Wireless" },
      { label: "تعداد میکروفون", value: "8 میکروفون جهت حذف نویز محیطی و ۴ میکروفون بیم‌فورمینگ برای مکالمه" },
      { label: "شارژدهی باتری", value: "تا ۳۰ ساعت با ANC روشن / تا ۴۰ ساعت با ANC خاموش" },
      { label: "شارژ سریع", value: "۳ دقیقه شارژ = ۳ ساعت پخش مداوم موسیقی" },
      { label: "وزن", value: "۲۵۰ گرم" }
    ],
    featureCards: [
      { title: "پردازنده دوگانه QN1 و V1", desc: "مهار کامل نویز فرکانس بالا و مکالمات انسانی اطراف با دو تراشه اختصاصی", icon: "Headphones" },
      { title: "کدک Hi-Res LDAC", desc: "انتقال داده صوتی با نرخ بیت فوق‌العاده 990kbps بدون افت کیفیت", icon: "Zap" },
      { title: "شارژدهی ۳۰ ساعته", desc: "شارژ فوق سریع تایپ C با همراهی کیس تاشو و لوکس آهنربایی", icon: "BatteryCharging" }
    ],
    colors: [
      { name: "مشکی مات مخملی", hex: "#1C1C1E" },
      { name: "نقره‌ای پلاتینیومی", hex: "#D8D6CD" },
      { name: "آبی نیمه‌شب (Midnight Blue)", hex: "#1D2330" }
    ],
    badges: ["پرفروش‌ترین هدفون", "ضمانت اصالت", "ارسال اکسپرس"],
    highlights: [
      "مجهز به پردازنده‌های دوگانه یکپارچه V1 و HD QN1 جهت حذف هوشمند نویز",
      "تفکیک و وضوح استثنایی صدا با پشتیبانی کامل از استاندارد Hi-Res و DSEE Extreme",
      "سیستم مکالمه کریستالی با ۴ میکروفون بیم‌فورمینگ و هوش مصنوعی کاهش صدای باد",
      "اتصال همزمان به دو دستگاه (Multipoint Connection) با جابه‌جایی آنی"
    ]
  },
  {
    id: "anker-space-one",
    title: "هدفون بی‌سیم انکر ساندکور مدل Soundcore Space One با نویز کنسلینگ هوشمند",
    enTitle: "Anker Soundcore Space One Active Noise Cancelling Wireless Headphones Jet Black",
    code: "TK-671012",
    categorySlug: "audio",
    brandSlug: "anker",
    price: 5650000,
    originalPrice: 6500000,
    stock: 18,
    minStockThreshold: 5,
    inStock: true,
    stockText: "موجود در انبار مرکزی پویان افزار",
    seller: "پویان افزار (انبار مرکزی)",
    warranty: "گارانتی ۱۸ ماهه طلایی ایستا / فارِس",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80"
    ],
    description: "هدفون انکر Soundcore Space One با درایورهای ۴۰ میلی‌متری سفارشی، کاهش ۹۸ درصدی صدای اطراف با نویز کنسلینگ تطبیق‌پذیر و پشتیبانی از LDAC، کیفیت صدای های-فای را با قیمتی باورنکردنی در دسترس همگان قرار داده است.",
    introTitle: "سکوت شگفت‌انگیز و شارژدهی فوق‌العاده ۵۵ ساعته با قیمتی اقتصادی",
    introDesc: "هدفون اسپیس وان انکر با تمرکز ویژه بر کاهش صدای صحبت افراد در محیط‌های شلوغ و مترو طراحی شده است. از طریق اپلیکیشن Soundcore می‌توانید پروفایل شخصی‌سازی اکولایزر HearID را تنظیم کنید و تا ۵۵ ساعت مداوم از گوش دادن به موزیک لذت ببرید.",
    specs: [
      { label: "نوع اتصال", value: "بی‌سیم بلوتوث نسخه 5.3 و باسیم AUX" },
      { label: "درایورها", value: "40 میلی‌متری داینامیک با گواهی Hi-Res Wireless" },
      { label: "فناوری نویز کنسلینگ", value: "Adaptive ANC با کاهش نویز تا 98 درصد به خصوص صدای افراد" },
      { label: "کدک‌های صوتی", value: "LDAC, AAC, SBC" },
      { label: "شارژدهی باتری", value: "۴۰ ساعت با ANC روشن / ۵۵ ساعت با ANC خاموش" },
      { label: "شارژ سریع", value: "۵ دقیقه شارژ = ۴ ساعت پخش موسیقی" },
      { label: "وزن", value: "۲۶۵ گرم" }
    ],
    featureCards: [
      { title: "کاهش ۹۸٪ نویز محیط", desc: "نویزکنسلینگ هوشمند با ارتقای ویژه در فیلتر کردن صدای همکاران و شلوغی", icon: "Headphones" },
      { title: "شارژدهی اعجاب‌انگیز ۵۵ ساعته", desc: "بیش از دو هفته استفاده روزمره با یک مرتبه شارژ کامل", icon: "BatteryCharging" },
      { title: "صدای دارای استاندارد Hi-Res", desc: "پشتیبانی از فناوری کدک LDAC با انتقال ۳ برابری جزئیات نسبت به بلوتوث معمولی", icon: "Zap" }
    ],
    colors: [
      { name: "مشکی جتی (Jet Black)", hex: "#1E1E1E" },
      { name: "آبی آسمانی (Sky Blue)", hex: "#A4B3C6" },
      { name: "سفید لاته (Latte Cream)", hex: "#E8E2D5" }
    ],
    badges: ["پیشنهاد اقتصادی", "ضمانت اصالت", "ارسال اکسپرس"],
    highlights: [
      "کاهش نویز دو برابری صدای مکالمات نسبت به مدل‌های قبلی",
      "قابلیت شخصی‌سازی اکولایزر شنیداری با فناوری HearID در نرم‌افزار",
      "پدهای چرمی با چرخش ۸ درجه هماهنگ با فرم سر کاربر",
      "امکان اتصال به دو دیوایس و سوئیچ هوشمند بین لپ‌تاپ و گوشی"
    ]
  },
  {
    id: "airpods-max",
    title: "هدفون بلوتوثی روی گوش اپل مدل AirPods Max با درایور اختصاصی Hi-Fi",
    enTitle: "Apple AirPods Max Over-Ear Wireless Headphones Space Gray",
    code: "TK-671013",
    categorySlug: "audio",
    brandSlug: "apple",
    price: 34200000,
    originalPrice: 38000000,
    stock: 5,
    minStockThreshold: 2,
    inStock: true,
    stockText: "موجود در انبار مرکزی پویان افزار",
    seller: "پویان افزار (انبار مرکزی)",
    warranty: "گارانتی ۱۸ ماهه شرکتی + ضمانت اورجینال بودن پویان افزار",
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80"
    ],
    description: "هدفون لوکس ایرپادز مکس اپل با فریم فولادی ضدزنگ، کاپ‌های آلومینیومی آنودایز شده و هدبند پارچه‌ای توری تنفس‌پذیر، آکوستیک صوتی بی‌نظیری ایجاد می‌کند. تراشه قدرتمند Apple H1 در هر کاپ پردازش رایانشی صدا را در میلی‌ثانیه مدیریت می‌نماید.",
    introTitle: "معماری صوتی استودیویی و طراحی پیشرو در هدفون پرچمدار اپل",
    introDesc: "ایرپادز مکس با بهره‌گیری از درایورهای ۴۰ میلی‌متری داینامیک طراحی شده توسط اپل با آهنرباهای دوگانه نئودیمیوم، اعوجاج هارمونیک را حتی در بلندترین حجم صدا به صفر می‌رساند. صدای فراگیر فضایی (Spatial Audio) با ردیابی پویای حرکات سر تجربه‌ای مانند سالن سینما خلق می‌کند.",
    specs: [
      { label: "تراشه‌ها", value: "دو تراشه مجزای Apple H1 (یک عدد در هر گوشی)" },
      { label: "درایور صوتی", value: "40 میلی‌متر داینامیک طراحی اختصاصی اپل" },
      { label: "قابلیت‌های صوتی", value: "حذف نویز فعال (ANC)، حالت شفافیت (Transparency)، صدای فضایی با ردیابی سر" },
      { label: "تعداد میکروفون‌ها", value: "۹ میکروفون (۸ عدد برای نویز کنسلینگ و ۳ عدد جهت مکالمه)" },
      { label: "کنترلر", value: "کلید Digital Crown برگرفته از اپل واچ جهت کنترل ولوم، پخش و Siri" },
      { label: "شارژدهی", value: "۲۰ ساعت با فعال بودن نویزکنسلینگ و اسپشیال آودیو" },
      { label: "وزن", value: "۳۸۴.۸ گرم با تعادل وزنی کامل روی سر" }
    ],
    featureCards: [
      { title: "صدای محاسباتی با تراشه‌های H1", desc: "استفاده از ۱۰ هسته صوتی در هر کاپ برای تنظیم بلادرنگ اکولایزر", icon: "Zap" },
      { title: "طراحی لوکس آلومینیومی", desc: "کاپ‌های فلزی ماشین‌کاری شده با هدبند مشبک توزیع‌کننده وزن", icon: "Sparkles" },
      { title: "Spatial Audio سینمایی", desc: "ردیابی حرکات سر با ژیروسکوپ و شتاب‌سنج داخلی برای صدای سه‌بعدی فراگیر", icon: "Headphones" }
    ],
    colors: [
      { name: "خاکستری فضایی (Space Gray)", hex: "#434446" },
      { name: "نقره‌ای مات (Silver)", hex: "#E3E4E5" },
      { name: "آبی آسمانی (Sky Blue)", hex: "#8DA2B5" },
      { name: "سبز ملایم (Green)", hex: "#ADC1AE" }
    ],
    badges: ["لوکس", "ضمانت اصالت کالا", "ارسال اکسپرس"],
    highlights: [
      "فریم استیل ضدزنگ با بازوهای تلسکوپی نرم و دقیق",
      "سیستم تعلیق توری مشبک تنفسی برای حذف فشار از بالای سر",
      "کلید دیجیتال کراون جهت تنظیم روان صدا و رفتن به آهنگ بعدی",
      "کیس هوشمند اسمارت کیس با قرارگیری در حالت مصرف انرژی بسیار کم Ultra-Low Power"
    ]
  },

  // ===================== GPU & HARDWARE =====================
  {
    id: "gigabyte-rtx-4080-super",
    title: "کارت گرافیک گیگابایت مدل AORUS GeForce RTX 4080 SUPER Master 16G",
    enTitle: "GIGABYTE AORUS GeForce RTX 4080 SUPER Master 16GB GDDR6X",
    code: "TK-551011",
    categorySlug: "gpu",
    brandSlug: "gigabyte",
    price: 69500000,
    originalPrice: 76000000,
    stock: 4,
    minStockThreshold: 2,
    inStock: true,
    stockText: "موجود در انبار مرکزی پویان افزار",
    seller: "پویان افزار (انبار مرکزی)",
    warranty: "گارانتی ۳۶ ماهه رسمی آواژنگ",
    image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=800&q=80"
    ],
    description: "کارت گرافیک قدرتمند آئوروس مستر RTX 4080 Super مجهز به سیستم خنک‌کننده پرچمدار WINDFORCE با فن‌های Bionic Shark، محفظه بخار بزرگ مس و نمایشگر LCD جانبی اختصاصی Edge View جهت نمایش دمای لحظه‌ای کارت و تصاویر GIF است.",
    introTitle: "اوج کارایی گیمینگ 4K و رندرینگ با معماری Ada Lovelace و DLSS 3.5",
    introDesc: "کارت گرافیک AORUS Master RTX 4080 SUPER با ۱۰۲۴۰ هسته کودا و ۱۶ گیگابایت حافظه فوق‌العاده سریع GDDR6X اجرای تمامی بازی‌های روز دنیا با رزولوشن 4K و جزئیات Ray Tracing کامل را به آسانی ممکن می‌سازد.",
    specs: [
      { label: "موتور پردازشی", value: "NVIDIA GeForce RTX 4080 SUPER" },
      { label: "هسته‌های CUDA", value: "10,240 Cores" },
      { label: "فرکانس بوست هسته", value: "2625 مگاهرتز (اورکلاک کارخانه‌ای)" },
      { label: "حافظه ویدیویی", value: "16 گیگابایت GDDR6X با باس 256 بیت و سرعت 23Gbps" },
      { label: "درگاه‌های خروجی", value: "3 عدد DisplayPort 1.4a و 1 عدد HDMI 2.1a" },
      { label: "پاور پیشنهادی", value: "حداقل ۸۵۰ وات با کانکتور 16 پین 12VHPWR" },
      { label: "ابعاد کارت", value: "357x163x75 میلی‌متر (اشغال ۴ اسلات کیس)" }
    ],
    featureCards: [
      { title: "سیستم کولینگ WINDFORCE", desc: "محفظه بخار مسی بزرگ، لوله‌های کامپوزیت و سه فن ۱۱۰ میلی‌متری بیونیک", icon: "Layers" },
      { title: "نمایشگر اختصاصی LCD Edge View", desc: "پایش دمای چیپ گرافیک، فریم‌ریت یا نمایش انیمیشن‌های دلخواه روی کارت", icon: "Monitor" },
      { title: "فناوری NVIDIA DLSS 3.5", desc: "تولید فریم مبتنی بر هوش مصنوعی با بازسازی پرتوها Ray Reconstruction", icon: "Zap" }
    ],
    colors: [
      { name: "مشکی تیره متالیک با نورپردازی RGB Fusion", hex: "#1A1A1A" }
    ],
    badges: ["کارت گرافیک پرچمدار", "ضمانت آواژنگ", "ارسال با محافظ"],
    highlights: [
      "مجهز به ۱۰۲۴۰ هسته کوا و حافظه ۱۶ گیگابایتی GDDR6X",
      "نمایشگر رنگی ال‌سی‌دی جانبی با امکان نمایش پارامترهای عملکردی سیستم",
      "نورپردازی حلقه سه پره‌ای RGB Halo اطراف پره‌های فن‌ها",
      "بک‌پلیت فلزی مستحکم با براکت ضد خمیدگی ضد لرزش کارت گرافیک"
    ]
  },
  {
    id: "amd-rx-7900-xtx",
    title: "کارت گرافیک ای‌ام‌دی مدل AMD Radeon RX 7900 XTX 24GB GDDR6",
    enTitle: "AMD Radeon RX 7900 XTX 24GB GDDR6 Reference Edition",
    code: "TK-551012",
    categorySlug: "gpu",
    brandSlug: "amd",
    price: 58900000,
    originalPrice: 64000000,
    stock: 5,
    minStockThreshold: 2,
    inStock: true,
    stockText: "موجود در انبار مرکزی پویان افزار",
    seller: "پویان افزار (انبار مرکزی)",
    warranty: "گارانتی ۲۴ ماهه اصلی شرکتی + ضمانت سلامت تست",
    image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=800&q=80"
    ],
    description: "کارت گرافیک پرچمدار معماری RDNA 3 با ۲۴ گیگابایت حافظه ویدیویی پرسرعت، خروجی‌های نسل آینده DisplayPort 2.1 و ۹۶ واحد محاسباتی یکپارچه انتخابی رؤیایی برای گیمرهای 4K و رندرینگ‌های سه‌بعدی و هوش مصنوعی محلی است.",
    introTitle: "قدرتمندترین کارت گرافیک گیمینگ ای‌ام‌دی با ۲۴ گیگابایت VRAM",
    introDesc: "کارت Radeon RX 7900 XTX با نخستین طراحی چیپلت در پردازنده‌های گرافیکی دنیا، شتاب‌دهنده‌های هوش مصنوعی اختصاصی و پشتیبانی از فناوری ارتقای فریم AMD FSR 3 و Fluid Motion Frames، بازی‌ها را در بالاترین رزولوشن با حداکثر نرخ فریم اجرا می‌کند.",
    specs: [
      { label: "معماری گرافیکی", value: "AMD RDNA 3 Chiplet Architecture (5nm GCD + 6nm MCD)" },
      { label: "حافظه ویدیویی", value: "24 گیگابایت GDDR6 با رابط حافظه 384 بیت" },
      { label: "واحدهای محاسباتی (CU)", value: "96 Compute Units با ۹۶ شتاب‌دهنده Ray Tracing" },
      { label: "حافظه کش", value: "96 مگابایت AMD Infinity Cache نسل دو" },
      { label: "فرکانس گیم / بوست", value: "2300 مگاهرتز گیمینگ / تا 2500 مگاهرتز در حالت بوست" },
      { label: "درگاه‌های تصویری", value: "DisplayPort 2.1 با پهنای باند 54Gbps و HDMI 2.1a و پورت USB Type-C" },
      { label: "توان مصرفی و کانکتورها", value: "355 وات با ۲ کانکتور استاندارد 8 پین بدون نیاز به تبدیل" }
    ],
    featureCards: [
      { title: "۲۴ گیگابایت حافظه ویدیویی", desc: "فضای فوق‌العاده برای تکسچرهای سنگین 4K و مدل‌های زبان بزرگ هوش مصنوعی (LLM)", icon: "HardDrive" },
      { title: "خروجی تصویر DisplayPort 2.1", desc: "پشتیبانی از مانیتورهای آینده‌نگرانه 4K با نرخ نوسازی ۴۸۰ هرتز و 8K در ۱۶۵ هرتز", icon: "Monitor" },
      { title: "فناوری FSR 3 با Fluid Motion", desc: "افزایش چندبرابری فریم‌ریت بازی‌ها با فریم جنریشن بدون افت کیفیت", icon: "Zap" }
    ],
    colors: [
      { name: "مشکی رفرنس با نوارهای قرمز آلومینیومی", hex: "#222222" }
    ],
    badges: ["۲۴ گیگابایت حافظه", "ضمانت اصالت", "ارسال اکسپرس"],
    highlights: [
      "نخستین پردازنده گرافیکی چیپلت دنیا با معماری پیشرفته ۵ نانومتری",
      "استفاده از کانکتورهای ایمن و استاندارد 8-Pin بدون داغ شدن کابل‌ها",
      "پشتیبانی نرم‌افزاری از AMD HYPR-RX جهت بهینه‌سازی یک‌کلیکه بازی‌ها",
      "طراحی خنک‌کننده جمع‌وجور ۲.۵ اسلاتی مناسب انواع کیس‌های گیمینگ"
    ]
  },
  {
    id: "intel-core-i9-14900k",
    title: "پردازنده اینتل مدل Core i9 14900K نسل 14 با فرکانس بوست 6.0 گیگاهرتز",
    enTitle: "Intel Core i9-14900K 14th Gen 24-Core LGA1700 Desktop Processor",
    code: "TK-551013",
    categorySlug: "cpu",
    brandSlug: "intel",
    price: 34500000,
    originalPrice: 38000000,
    stock: 11,
    minStockThreshold: 3,
    inStock: true,
    stockText: "موجود در انبار مرکزی پویان افزار",
    seller: "پویان افزار (انبار مرکزی)",
    warranty: "ضمانت اصالت فیزیکی و تست ۷ روزه + اصالت کالا",
    image: "https://images.unsplash.com/photo-1555617778-02518510b9fa?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1555617778-02518510b9fa?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=800&q=80"
    ],
    description: "پردازنده پرچمدار Core i9 14900K با ۲۴ هسته پردازشی (۸ هسته قدرتمند پرفورمنس و ۱۶ هسته بهینه افیشنسی) و ۳۲ رشته محاسباتی قادر است به فرکانس اعجاب‌انگیز ۶.۰ گیگاهرتز دست یابد و سنگین‌ترین تسک‌های مهندسی و گیمینگ را پردازش کند.",
    introTitle: "شکستن مرز فرکانس ۶ گیگاهرتز؛ هیولای پردازش دسکتاپ نسل ۱۴ اینتل",
    introDesc: "پردازنده اینتل مدل i9-14900K بر روی سوکت محبوب LGA1700 سازگار با چیپست‌های سری Z790 و Z690 قرار می‌گیرد. با پشتیبانی همزمان از حافظه‌های رم DDR4 و DDR5 و پهنای باند PCIe Gen 5، انتخابی ایده‌آل برای ارتقای سیستم‌های ورک‌استیشن است.",
    specs: [
      { label: "سوکت پردازنده", value: "LGA1700 سازگار با مادربردهای سری 600 و 700" },
      { label: "تعداد هسته‌ها", value: "24 هسته (8 هسته P-Core + 16 هسته E-Core)" },
      { label: "تعداد رشته‌ها (Threads)", value: "32 رشته پردازشی همزمان" },
      { label: "فرکانس بوست ماکسیمم", value: "6.0 گیگاهرتز با فناوری Intel Thermal Velocity Boost" },
      { label: "حافظه کش هوشمند (Smart Cache)", value: "36 مگابایت اینتل اسمارت کش + 32MB کش L2" },
      { label: "پردازنده گرافیکی مجتمع", value: "Intel UHD Graphics 770 با خروجی 8K 60Hz" },
      { label: "پشتیبانی حافظه رم", value: "DDR5 تا 5600MT/s و DDR4 تا 3200MT/s دو کاناله تا 192GB" },
      { label: "توان مصرفی پایه / حداکثر", value: "125 وات Base / حداکثر 253 وات Turbo Power" }
    ],
    featureCards: [
      { title: "فرکانس شگفت‌انگیز ۶.۰ گیگاهرتز", desc: "بالاترین سرعت تک‌هسته‌ای در دنیای بازی‌ها و نرم‌افزارهای مدلسازی", icon: "Zap" },
      { title: "معماری هیبریدی ۲۴ هسته‌ای", desc: "تقسیم بار پردازشی هوشمند بین کارهای سنگین و پس‌زمینه با Intel Thread Director", icon: "Cpu" },
      { title: "پشتیبانی از PCIe 5.0", desc: "آمادگی کامل برای نسل جدید کارت‌های گرافیک و حافظه‌های اس‌اس‌دی M.2 Gen5", icon: "HardDrive" }
    ],
    colors: [],
    badges: ["فرکانس 6GHz", "پرفروش", "ضمانت اصالت"],
    highlights: [
      "اورکلاک‌پذیری بی‌نظیر با ضریب فرکانس باز (Unlocked K-Series)",
      "پشتیبانی از رابط اینتل XTU با بهینه‌سازی خودکار هوش مصنوعی Intel AI Assist",
      "پشتیبانی کامل از استاندارد مدرن اتصال Wi-Fi 7 و Thunderbolt 4",
      "سازگاری گسترده با خنک‌کننده‌های مایع ۳۶۰ میلی‌متری LGA1700"
    ]
  },
  {
    id: "amd-ryzen-7-7800x3d",
    title: "پردازنده ای‌ام‌دی مدل Ryzen 7 7800X3D با فناوری پیشرفته 3D V-Cache",
    enTitle: "AMD Ryzen 7 7800X3D 8-Core 16-Thread Gaming Processor AM5",
    code: "TK-551014",
    categorySlug: "cpu",
    brandSlug: "amd",
    price: 27900000,
    originalPrice: 31000000,
    stock: 9,
    minStockThreshold: 3,
    inStock: true,
    stockText: "موجود در انبار مرکزی پویان افزار",
    seller: "پویان افزار (انبار مرکزی)",
    warranty: "ضمانت اصالت کالا و مهلت تست ۷ روزه پویان افزار",
    image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1555617778-02518510b9fa?auto=format&fit=crop&w=800&q=80"
    ],
    description: "پردازنده Ryzen 7 7800X3D سلطان بلامنازع دنیای گیمینگ است. با تکیه بر فناوری چیدمان سه‌بعدی لایه‌های کش موسوم به 3D V-Cache، حجم حافظه کش سطح سه این پردازنده به رقم باورنکردنی ۹۶ مگابایت می‌رسد که باعث افزایش چشمگیر 1% Low FPS در سنگین‌ترین بازی‌ها می‌شود.",
    introTitle: "بهترین و پربازده‌ترین پردازنده گیمینگ جهان بر روی سوکت مدرن AM5",
    introDesc: "پردازنده 7800X3D علاوه بر فریم‌ریت‌های باورنکردنی، مصرف برقی فوق‌العاده پایین (حدود ۵۰ تا ۸۰ وات در حین بازی) دارد. معماری ۵ نانومتری Zen 4 به همراه پلتفرم با دوام AM5 تضمین می‌کند سیستم گیمینگ شما تا سال‌ها از پشتیبانی پردازنده‌های جدید بهره‌مند باشد.",
    specs: [
      { label: "سوکت پردازنده", value: "AMD Socket AM5 با پشتیبانی تا سال 2027+" },
      { label: "تعداد هسته و رشته", value: "8 هسته فیزیکی Zen 4 و 16 رشته پردازشی" },
      { label: "حافظه کش سطح ۳ (L3)", value: "96 مگابایت 3D V-Cache + 8MB کش L2 (مجموع ۱۰۴ مگابایت)" },
      { label: "فرکانس پایه / بوست", value: "4.2 گیگاهرتز پایه / 5.0 گیگاهرتز در حالت Max Boost" },
      { label: "لیتوگرافی چیپست", value: "TSMC 5nm FinFET برای هسته‌ها و 6nm برای چیپ I/O" },
      { label: "توان مصرفی رسمی (TDP)", value: "120 وات (مصرف واقعی گیمینگ بسیار پایین‌تر است)" },
      { label: "پشتیبانی حافظه", value: "فقط حافظه‌های DDR5 دو کاناله با پشتیبانی از پروفایل AMD EXPO" }
    ],
    featureCards: [
      { title: "فناوری ۳D V-Cache", desc: "حافظه کش غول‌آسای ۹۶ مگابایتی برای به صفر رساندن لگ و افت فریم در بازی‌ها", icon: "Layers" },
      { title: "بهره‌وری انرژی فوق‌العاده", desc: "ارائه بیشترین فریم به ازای هر وات انرژی مصرفی در میان پردازنده‌های بازار", icon: "BatteryCharging" },
      { title: "پلتفرم پایدار AM5", desc: "سوکت بادوام با پشتیبانی تضمین شده از چندین نسل آینده پردازنده‌های رایزن", icon: "Cpu" }
    ],
    colors: [],
    badges: ["سلطان گیمینگ", "بهترین راندمان", "ضمانت اصالت"],
    highlights: [
      "برترین پردازنده گیمینگ دنیا بر اساس بنچمارک‌های مستقل جهانی",
      "دمای کاری و مصرف بسیار معقول بدون نیاز به خنک‌کننده‌های گران‌قیمت",
      "پشتیبانی از حافظه‌های DDR5 مجهز به پروفایل AMD EXPO با یک کلیک",
      "پشتیبانی کامل از مسیرهای ارتباطی PCIe Gen 5 برای کارت گرافیک و SSD"
    ]
  },
  {
    id: "asus-rog-maximus-z790",
    title: "مادربرد ایسوس مدل ROG MAXIMUS Z790 HERO سوکت LGA1700 با پشتیبانی DDR5",
    enTitle: "ASUS ROG MAXIMUS Z790 HERO LGA1700 ATX Gaming Motherboard",
    code: "TK-551015",
    categorySlug: "motherboard",
    brandSlug: "asus",
    price: 38800000,
    originalPrice: 42500000,
    stock: 6,
    minStockThreshold: 2,
    inStock: true,
    stockText: "موجود در انبار مرکزی پویان افزار",
    seller: "پویان افزار (انبار مرکزی)",
    warranty: "گارانتی ۳۶ ماهه اصلی ایسوس (ماتریس / سازگار / الماس رایان)",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80"
    ],
    description: "مادربرد افسانه‌ای ROG Maximus Z790 Hero ایسوس با مدار تغذیه ۲۰+۱ فاز با ماسفت‌های ۹۰ آمپری، آرایه‌های خنک‌کننده غول‌پیکر با پوشش آینه‌ای Polymo Lighting و ۵ اسلات حافظه اس‌اس‌دی M.2 گزینه‌ای بی‌نقص برای اورکلاکرهای حرفه‌ای است.",
    introTitle: "شاهکار مهندسی ایسوس ROG برای ساخت لوکس‌ترین سیستم‌های گیمینگ دسکتاپ",
    introDesc: "این مادربرد با تجهیز به دو پورت تاندربولت ۴ با سرعت ۴۰ گیگابیت، شبکه پرسرعت ۲.۵ گیگابیتی و کارت شبکه Wi-Fi 6E، سیستم صوتی حرفه‌ای ROG SupremeFX 7.1 با مبدل ESS ES9218 QUAD DAC و ابزارهای اورکلاک هوش مصنوعی AI Overclocking تجربه‌ای بی‌همتا ارائه می‌دهد.",
    specs: [
      { label: "چیپست و سوکت", value: "Intel Z790 Chipset / Socket LGA1700 نسل ۱۲، ۱۳ و ۱۴" },
      { label: "مدار تغذیه (VRM)", value: "20+1 فاز با استیج‌های توان 90 آمپری و چوک‌های آلیاژی MicroFine" },
      { label: "پشتیبانی حافظه RAM", value: "4 اسلات DDR5 تا فرکانس +7800MHz (اورکلاک) تا 192GB" },
      { label: "اسلات‌های توسعه", value: "2 اسلات PCIe 5.0 x16 با قابلیت اجرای دوگانه و اسلات PCIe 4.0 x16" },
      { label: "شکاف‌های ذخیره‌سازی M.2", value: "مجموعاً 5 اسلات M.2 (شامل ۱ اسلات PCIe 5.0 با کارت PCIe ROG)" },
      { label: "اتصالات پشت (I/O)", value: "دو پورت Thunderbolt 4 Type-C (40Gbps)، شش پورت USB 3.2 Gen 2 و HDMI 2.1" },
      { label: "سیستم صوتی", value: "ROG SupremeFX ALC4082 با آمپلی‌فایر اختصاصی ESS SABRE9218" }
    ],
    featureCards: [
      { title: "مدار تغذیه ۲۰+۱ فاز ۹۰ آمپر", desc: "تأمین بدون نوسان بالاترین جریان الکتریکی برای اورکلاک پردازنده‌های i9 نسل ۱۴", icon: "Cpu" },
      { title: "نورپردازی Polymo Lighting", desc: "پنل ماتریکسی آینه‌ای با انعکاس دوگانه افکت‌های زیبای نورپردازی لوگوی ROG", icon: "Sparkles" },
      { title: "پورت‌های دوگانه تاندربولت ۴", desc: "انتقال داده با پهنای باند ۴۰ گیگابیت در ثانیه و خروجی نمایشگرهای 8K", icon: "Zap" }
    ],
    colors: [
      { name: "مشکی مات با زره متالیک ROG Polymo", hex: "#1C1C1E" }
    ],
    badges: ["مادربرد پرچمدار", "ضمانت ۳۶ ماهه", "ارسال اکسپرس"],
    highlights: [
      "دکمه آزادسازی سریع کارت گرافیک PCIe Slot Q-Release با یک کلیک",
      "قابلیت‌های پیشرفته هوش مصنوعی شامل AI Overclocking, AI Cooling II و AI Networking",
      "هیت‌سینک‌های حجیم آلومینیومی سراسری جهت مهار گرمای SSD های پرسرعت",
      "بک‌پلیت فلزی مستحکم در پنل پشت مادربرد جهت کاهش انحنای برد مدار چاپی"
    ]
  },

  // ===================== RAM & SSD =====================
  {
    id: "corsair-vengeance-ddr5-32gb",
    title: "رم کامپیوتر کورسیر مدل VENGEANCE RGB DDR5 6000MHz CL30 ظرفیت 32 گیگابایت (2x16GB)",
    enTitle: "Corsair Vengeance RGB 32GB (2x16GB) DDR5 6000MHz CL30 Desktop Memory Black",
    code: "TK-331011",
    categorySlug: "ram",
    brandSlug: "corsair",
    price: 8700000,
    originalPrice: 9900000,
    stock: 20,
    minStockThreshold: 5,
    inStock: true,
    stockText: "موجود در انبار مرکزی پویان افزار",
    seller: "پویان افزار (انبار مرکزی)",
    warranty: "گارانتی مادام‌العمر الماس رایان ایرانیان / تخت جمشید",
    image: "https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1541029071515-84cc54f84dc5?auto=format&fit=crop&w=800&q=80"
    ],
    description: "کیت حافظه پرسرعت ۳۲ گیگابایتی کورسیر ونجنس آر جی بی DDR5 با فرکانس ایده‌آل ۶۰۰۰ مگاهرتز و زمان‌بندی کم‌نظیر CL30-36-36-76، بهترین کارایی و کمترین تأخیر را به خصوص در پردازنده‌های AMD Ryzen سری 7000 و اینتل نسل 14 ارائه می‌کند.",
    introTitle: "سرعت خیره‌کننده با کمترین زمان‌بندی CL30 و نورپردازی ۱۰ ناحیه‌ای iCUE",
    introDesc: "رم Corsair Vengeance RGB DDR5 مجهز به پخش‌کننده حرارت آلومینیومی باکیفیت و مدار مدیریت توان آنبرد (PMIC) است. از طریق نرم‌افزار قدرتمند Corsair iCUE می‌توانید هر یک از ال‌ای‌دی‌های آدرس‌پذیر را با سایر قطعات کیس خود هماهنگ سازید.",
    specs: [
      { label: "ظرفیت کل", value: "32 گیگابایت در قالب کیت دو کاناله (دو ماژول 16 گیگابایتی)" },
      { label: "نوع حافظه و فرکانس", value: "DDR5 با فرکانس 6000MT/s (مگاهرتز)" },
      { label: "تایمینگ / زمان تاخیر", value: "CL30 (30-36-36-76) پایین‌ترین تاخیر ممکن" },
      { label: "ولتاژ کاری", value: "1.35 ولت با رگولاتور ولتاژ یکپارچه آنبرد PMIC" },
      { label: "پروفایل‌های اورکلاک", value: "پشتیبانی همزمان از Intel XMP 3.0 و AMD EXPO" },
      { label: "نورپردازی", value: "Dynamic Ten-Zone RGB با ۱۰ ال‌ای‌دی در هر ماژول" },
      { label: "جنس هیت‌سینک", value: "آلومینیوم آندایز شده مشکی مات با دفع حرارت سریع" }
    ],
    featureCards: [
      { title: "تایمینگ ایده‌آل CL30", desc: "نقطه عطف کارایی و تاخیر مینیمم در بازی‌ها و پردازش‌های سنگین", icon: "Zap" },
      { title: "پشتیبانی XMP 3.0 و EXPO", desc: "سازگاری دوگانه و فعال‌سازی فوری اورکلاک رم روی پلتفرم اینتل و رایزن", icon: "Layers" },
      { title: "اکوسیستم نورپردازی iCUE", desc: "سفارشی‌سازی میلیون‌ها رنگ با افکت‌های دینامیک ۱۰ ناحیه‌ای در بالای ماژول", icon: "Sparkles" }
    ],
    colors: [
      { name: "مشکی مات کلاسیک", hex: "#151515" },
      { name: "سفید برفی (Arctic White)", hex: "#F5F5F5" }
    ],
    badges: ["تایمینگ CL30", "گارانتی مادام‌العمر", "ضمانت اصالت"],
    highlights: [
      "مجهز به چیپ‌های دستچین‌شده و باکیفیت شرکت SK Hynix (A-Die)",
      "پایداری ولتاژ بالا به لطف مدار مدیریت توان یکپارچه بر روی ماژول",
      "قابلیت ذخیره پروفایل‌های اختصاصی اورکلاک مستقیم روی ماژول از طریق iCUE",
      "ارتفاع استاندارد هیت‌سینک جهت عدم تداخل با اکثر خنک‌کننده‌های بادی"
    ]
  },
  {
    id: "samsung-990-pro-2tb",
    title: "اس‌اس‌دی سامسونگ مدل 990 PRO NVMe M.2 2280 ظرفیت 2 ترابایت با هیت‌سینک",
    enTitle: "Samsung 990 PRO with Heatsink 2TB PCIe Gen4 x4 NVMe M.2 Internal SSD",
    code: "TK-331012",
    categorySlug: "ssd",
    brandSlug: "samsung",
    price: 11900000,
    originalPrice: 13200000,
    stock: 14,
    minStockThreshold: 4,
    inStock: true,
    stockText: "موجود در انبار مرکزی پویان افزار",
    seller: "پویان افزار (انبار مرکزی)",
    warranty: "گارانتی ۲۴ ماهه تعویض معتبر شرکتی + ضمانت اصالت فیزیکی",
    image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80"
    ],
    description: "حافظه پرسرعت Samsung 990 PRO با سرعت خواندن ترتیبی تا ۷۴۵۰ مگابایت بر ثانیه و نوشتن تا ۶۹۰۰ مگابایت بر ثانیه، به بالاترین سقف پهنای باند استاندارد PCIe 4.0 دست یافته است. این نسخه دارای هیت‌سینک فابریک برای پلی‌استیشن 5 و کامپیوتر است.",
    introTitle: "سریع‌ترین اس‌اس‌دی PCIe 4.0 جهان با هیت‌سینک اختصاصی و سازگار با PS5",
    introDesc: "سامسونگ با کنترلر پیشرفته Pascal و نسل جدید حافظه‌های V-NAND، راندمان مصرف انرژی را تا ۵۰ درصد نسبت به مدل 980 Pro بهبود بخشیده است. هیت‌سینک شیک با ضخامت باریک ۸.۲ میلی‌متری دمای تراشه‌ها را کنترل کرده و مانع از افت کارایی حرارتی (Thermal Throttling) می‌شود.",
    specs: [
      { label: "فرم فاکتور و رابط", value: "M.2 2280 با رابط پرسرعت PCIe Gen 4.0 x4, NVMe 2.0" },
      { label: "ظرفیت ذخیره‌سازی", value: "2 ترابایت (2000 گیگابایت)" },
      { label: "سرعت خواندن متوالی", value: "تا 7450 مگابایت بر ثانیه (نزدیک به سقف تئوری PCIe 4.0)" },
      { label: "سرعت نوشتن متوالی", value: "تا 6900 مگابایت بر ثانیه" },
      { label: "سرعت خواندن / نوشتن تصادفی", value: "تا 1,400,000 IOPS و 1,550,000 IOPS" },
      { label: "طول عمر نوشتن (TBW)", value: "1200 ترابایت نوشتن تضمین شده با MTBF برابر 1.5 میلیون ساعت" },
      { label: "حافظه کش DRAM", value: "2 گیگابایت LPDDR4 اختصاصی کم‌مصرف" },
      { label: "سازگاری کنسول", value: "کاملاً منطبق بر ابعاد و استاندارد خنک‌کننده PlayStation 5" }
    ],
    featureCards: [
      { title: "سرعت اعجاب‌انگیز 7450MB/s", desc: "بارگذاری بازی‌های سنگین در چند ثانیه و رندر ویدیوهای بدون فشرده‌سازی", icon: "HardDrive" },
      { title: "هیت‌سینک اختصاصی با نور RGB", desc: "دفع بهینه حرارت با ظاهری جذاب و ابعاد سازگار با اسلات کنسول PS5", icon: "Layers" },
      { title: "کنترل هوشمند با Samsung Magician", desc: "به‌روزرسانی فریم‌ور، رمزگذاری سخت‌افزاری و پایش سلامت درایو", icon: "ShieldCheck" }
    ],
    colors: [
      { name: "مشکی فیبر کربن با خطوط قرمز و نشانگر LED", hex: "#222222" }
    ],
    badges: ["سریع‌ترین SSD", "سازگار با PS5", "ضمانت اصالت"],
    highlights: [
      "عملکرد تصادفی خارق‌العاده تا ۱.۵۵ میلیون IOPS برای واکنش آنی سیستم‌عامل",
      "هیت‌سینک اسلیم استاندارد با قابلیت دفع حرارت حتی در فشارهای کاری پیوسته",
      "کاهش ۵۰ درصدی مصرف برق به ازای هر مگابایت انتقال داده نسبت به نسل قبل",
      "پشتیبانی از فناوری Microsoft DirectStorage جهت حذف زمان لودینگ بازی‌ها"
    ]
  },
  {
    id: "kingston-fury-renegade-1tb",
    title: "اس‌اس‌دی کینگستون مدل FURY Renegade PCIe 4.0 NVMe M.2 ظرفیت 1 ترابایت",
    enTitle: "Kingston FURY Renegade PCIe 4.0 NVMe M.2 SSD 1TB (7300MB/s Read)",
    code: "TK-331013",
    categorySlug: "ssd",
    brandSlug: "kingston",
    price: 6200000,
    originalPrice: 6900000,
    stock: 16,
    minStockThreshold: 4,
    inStock: true,
    stockText: "موجود در انبار مرکزی پویان افزار",
    seller: "پویان افزار (انبار مرکزی)",
    warranty: "گارانتی ۲۴ ماهه سریر سرویس / ایمانتک + ضمانت اصالت کالا",
    image: "https://images.unsplash.com/photo-1541029071515-84cc54f84dc5?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1541029071515-84cc54f84dc5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=800&q=80"
    ],
    description: "اس‌اس‌دی حرفه‌ای Kingston FURY Renegade با کنترلر قدرتمند Phison E18 و حافظه‌های پیشرفته 3D TLC، سرعت خواندن تا ۷۳۰۰ مگابایت بر ثانیه و نوشتن تا ۶۰۰۰ مگابایت بر ثانیه را ارائه می‌دهد. این درایو مجهز به پخش‌کننده حرارت گرافن-آلومینیوم باریک برای سازگاری حداکثری با لپ‌تاپ و کنسول است.",
    introTitle: "عملکرد رده‌بالا با کنترلر Phison E18 و پد خنک‌کننده گرافنی باریک",
    introDesc: "کینگستون فیوری رنگید با دوام نوشتاری شگفت‌انگیز ۱۰۰۰ ترابایت برای نسخه ۱ ترابایتی، یکی از با استقامت‌ترین درایوهای ذخیره‌سازی گیمینگ در بازار محسوب می‌شود. پد حرارتی گرافن باریک اجازه می‌دهد این درایو در باریک‌ترین لپ‌تاپ‌ها نیز به راحتی نصب شود.",
    specs: [
      { label: "رابط و فرم فاکتور", value: "PCIe 4.0 x4 NVMe در فرم فاکتور استاندارد M.2 2280" },
      { label: "ظرفیت", value: "1 ترابایت (1000GB)" },
      { label: "کنترلر حافظه", value: "Phison PS5018-E18 با هشت کانال ارتباطی" },
      { label: "سرعت خواندن ترتیبی", value: "تا 7300 مگابایت بر ثانیه" },
      { label: "سرعت نوشتن ترتیبی", value: "تا 6000 مگابایت بر ثانیه" },
      { label: "طول عمر نوشتن (TBW)", value: "1000 ترابایت نوشتن تضمین شده (فوق‌العاده بالاتر از میانگین رقبا)" },
      { label: "پد حرارتی", value: "Graphene Aluminum Heat Spreader فوق‌باریک با هدایت گرمایی بالا" }
    ],
    featureCards: [
      { title: "سرعت فوق‌العاده ۷۳۰۰MB/s", desc: "انتقال فایل‌های حجیم و لودینگ بازی‌ها با حداکثر سرعت نسل چهارم", icon: "HardDrive" },
      { title: "استقامت بالای 1000TBW", desc: "دوام دو برابری نسبت به حافظه‌های هم‌رده برای استفاده فشرده چندساله", icon: "ShieldCheck" },
      { title: "هیت‌اسپریدر گرافنی نانو", desc: "ضخامت مینیمال بدون برآمدگی، مناسب ارتقای فضای انواع لپ‌تاپ و PS5", icon: "Layers" }
    ],
    colors: [
      { name: "مشکی گرافنی با حکاکی سفید لوگوی FURY", hex: "#2B2B2B" }
    ],
    badges: ["دوام فوق‌العاده", "ضمانت اصالت", "ارسال اکسپرس"],
    highlights: [
      "مجهز به تراشه‌های ۱۷۶ لایه میکرون 3D TLC و کنترلر پیشرفته فایسون E18",
      "پوشش حرارتی گرافنی نانو برای خنک‌سازی کارآمد در فضاهای بسته لپ‌تاپ",
      "پشتیبانی عالی از PS5 جهت ارتقای فضای ذخیره‌سازی کنسول سونی",
      "حافظه کش سریع DDR4 DRAM جهت حفظ سرعت حتی هنگام پر شدن فضای درایو"
    ]
  },

  // ===================== ACCESSORIES =====================
  {
    id: "logitech-mx-master-3s",
    title: "ماوس بی‌سیم ارگونومیک لاجیتک مدل MX Master 3S با سنسور 8000DPI و کلیک بی‌صدا",
    enTitle: "Logitech MX Master 3S Wireless Performance Mouse Graphite 8K DPI Silent Clicks",
    code: "TK-221011",
    categorySlug: "accessories",
    brandSlug: "logitech",
    price: 5800000,
    originalPrice: 6500000,
    stock: 22,
    minStockThreshold: 6,
    inStock: true,
    stockText: "موجود در انبار مرکزی پویان افزار",
    seller: "پویان افزار (انبار مرکزی)",
    warranty: "گارانتی ۲۴ ماهه پانا / اسپیرو + ضمانت اصالت کالا",
    image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=800&q=80"
    ],
    description: "ماوس بی‌نظیر MX Master 3S لاجیتک بهترین ماوس ارگونومیک دنیا برای برنامه‌نویسان، طراحان و مدیران است. مجهز به کلیک‌های بی‌صدا با ۹۰ درصد کاهش نویز، سنسور اپتیکال ارتقایافته ۸۰۰۰ دی‌پی‌آی با قابلیت ردیابی حتی روی شیشه و اسکرول مغناطیسی الکترومغناطیسی MagSpeed با سرعت پیمایش ۱۰۰۰ خط در ثانیه.",
    introTitle: "تجربه نهایت ارگونومی و بازدهی کاری با محبوب‌ترین ماوس حرفه‌ای دنیا",
    introDesc: "ماوس لاجیتک ام ایکس مستر تری اس با اسکرول افقی جانبی، دکمه ژست‌های حرکتی انگشت شست و قابلیت نرم‌افزاری Logitech Flow امکان جابه‌جایی نشانگر ماوس و کپی فایل‌ها را میان سه کامپیوتر مختلف (ویندوز و مک) به طور همزمان فراهم می‌آورد.",
    specs: [
      { label: "دقت سنسور", value: "200 تا 8000 DPI با قابلیت تنظیم در گام‌های 50DPI (سنسور Darkfield با ردیابی روی شیشه)" },
      { label: "نوع کلیک‌ها", value: "Quiet Clicks با ۹۰٪ کاهش صدای ضربه کلیک و حفظ فیدبک لمسی" },
      { label: "چرخ اسکرول اصلی", value: "MagSpeed Electromagnetic با قابلیت چرخش آزاد و پله‌ای و اسکرول ۱۰۰۰ خط در ثانیه" },
      { label: "اتصالات", value: "بلوتوث کم‌مصرف (BLE) + دانگل اختصاصی Logi Bolt USB" },
      { label: "شارژدهی باتری", value: "تا ۷۰ روز با یک بار شارژ کامل باتری ۵۰۰ میلی‌آمپری لیتیوم پلیمری" },
      { label: "شارژ سریع", value: "۱ دقیقه شارژ با پورت Type-C = ۳ ساعت کار مداوم" },
      { label: "تعداد کلیدها", value: "7 کلید با قابلیت شخصی‌سازی کامل در نرم‌افزار Logi Options+" }
    ],
    featureCards: [
      { title: "اسکرول مغناطیسی MagSpeed", desc: "دقت میلی‌متری و سرعت خارق‌العاده ۱۰۰۰ خط در ثانیه با چرخش بی‌صدا", icon: "MousePointer" },
      { title: "کلیک‌های سایلنت ۹۰ درصدی", desc: "کارکرد بدون مزاحمت صوتی در محیط‌های کاری با حفظ لذت لمسی کلیک", icon: "Headphones" },
      { title: "فناوری Logitech Flow", desc: "کنترل همزمان مک و ویندوز با انتقال مستقیم متن و فایل بین سیستم‌ها", icon: "Zap" }
    ],
    colors: [
      { name: "گرافیتی (مشکی خاکستری)", hex: "#2B2B2C" },
      { name: "خاکستری روشن (Pale Grey)", hex: "#D6D6D6" }
    ],
    badges: ["پرفروش‌ترین ماوس", "ارگونومیک برتر", "ضمانت اصالت"],
    highlights: [
      "ردیابی بی‌نقص بر روی تمامی سطوح حتی میزهای شیشه‌ای با ضخامت ۴ میلی‌متر",
      "چرخ اسکرول فلزی جانبی انگشت شست جهت پیمایش روان تایم‌لاین و فایل‌های اکسل",
      "ارگونومی بی‌نظیر با پشتیبانی کامل از کف دست و مچ جهت جلوگیری از خستگی دست",
      "اتصال همزمان به سه دیوایس از طریق Easy-Switch با دکمه زیر ماوس"
    ]
  },
  {
    id: "razer-blackwidow-v4",
    title: "کیبورد مکانیکال گیمینگ ریزر مدل BlackWidow V4 Pro با سوییچ‌های سبز و نورپردازی Chroma RGB",
    enTitle: "Razer BlackWidow V4 Pro Mechanical Gaming Keyboard Green Clicky Switches",
    code: "TK-221012",
    categorySlug: "accessories",
    brandSlug: "razer",
    price: 12400000,
    originalPrice: 13900000,
    stock: 8,
    minStockThreshold: 2,
    inStock: true,
    stockText: "موجود در انبار مرکزی پویان افزار",
    seller: "پویان افزار (انبار مرکزی)",
    warranty: "گارانتی ۲۴ ماهه رسمی پانا / تخت جمشید + ضمانت اصالت",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=800&q=80"
    ],
    description: "کیبورد مکانیکال پرچمدار BlackWidow V4 Pro ریزر با سوییچ‌های کلیکی مکانیکال سبز رنگ، غلتک چندکاره Razer Command Dial، هشت کلید اختصاصی ماکرو، استراحتگاه مچ دست مجهز به نورپردازی و نرخ نمونه‌برداری خیره‌کننده ۸۰۰۰ هرتز (HyperPolling) مرکز فرماندهی هر گیمر حرفه‌ای است.",
    introTitle: "فرماندهی نبرد گیمینگ با کلیدهای ماکرو اختصاصی، دیال فرمانی و فرکانس 8000Hz",
    introDesc: "کیبورد بلک‌ویدو وی ۴ پرو با شاسی آلومینیومی باکیفیت 5052 و عایق‌بندی صوتی دوگانه، حس تایپ بسیار دلنشین با فیدبک کلیکی مطمئن ارائه می‌دهد. نورپردازی ۳ طرفه اطراف کیبورد و پد مچ دست حس غوطه‌وری فوق‌العاده‌ای به ستاپ گیمینگ شما می‌بخشد.",
    specs: [
      { label: "نوع سوئیچ‌ها", value: "Razer Green Mechanical Switches (کلیکی با صدای مشخص و نقطه فعال‌سازی 1.9mm)" },
      { label: "عمر مفید کلیدها", value: "100 میلیون بار فشردن کلیدها" },
      { label: "نرخ نمونه‌برداری (Polling Rate)", value: "8000Hz Razer HyperPolling (تاخیر نزدیک به صفر 0.125ms)" },
      { label: "کلیدهای اختصاصی", value: "8 کلید ماکرو اختصاصی (۵ کلید ستونی + ۳ کلید جانبی)، غلتک غول‌پیکر Command Dial" },
      { label: "جنس بدنه و کلاهک‌ها", value: "آلیاژ آلومینیوم درجه ۵۰۵۲ با کلاهک‌های Doubleshot ABS" },
      { label: "استراحتگاه مچ دست", value: "چرم مصنوعی ارگونومیک مغناطیسی دارای نورپردازی زیرین Underglow" },
      { label: "پورت عبوری (USB Passthrough)", value: "دارد (یک پورت USB 2.0 در پشت کیبورد)" }
    ],
    featureCards: [
      { title: "نرخ نمونه‌برداری 8000Hz", desc: "انتقال فرمان‌ها با سرعت هشت برابر سریع‌تر از استاندارد کیبوردهای گیمینگ", icon: "Zap" },
      { title: "کلید چرخشی Razer Command Dial", desc: "کنترل سریع زوم، سوئیچ بین برنامه‌ها و تنظیم نورپردازی با چرخش دیال", icon: "Sparkles" },
      { title: "استراحتگاه مچ با نورپردازی", desc: "راحتی طولانی مدت با اتصال مغناطیسی و امتداد نورپردازی کروما به زیر دست", icon: "Layers" }
    ],
    colors: [
      { name: "مشکی مات ریزر با نورپردازی چندرنگ RGB", hex: "#111111" }
    ],
    badges: ["کیبورد پرچمدار ریزر", "ضمانت اصالت", "ارسال اکسپرس"],
    highlights: [
      "مجهز به سوییچ‌های کلیکی مکانیکی ریزر با شفافیت دیواره سوئیچ برای نور پرنورتر",
      "فوم عایق صوتی داخلی جهت کاهش ارتعاشات فلزی و صدای توخالی کلیدها",
      "حافظه آنبرد هیبریدی با ظرفیت ذخیره‌سازی ۵ پروفایل تنظیمات بدون نیاز به نرم‌افزار",
      "پورت USB Passthrough کاربردی جهت اتصال آسان ماوس یا هدست به کیبورد"
    ]
  },
  {
    id: "tsco-th5345",
    title: "هدفون بلوتوثی تسکو مدل TH 5345 با قابلیت رم‌خور و اتصال AUX",
    enTitle: "TSCO TH 5345 Wireless Bluetooth Stereo Headphone with MicroSD Support",
    code: "TK-221013",
    categorySlug: "accessories",
    brandSlug: "tsco",
    price: 1250000,
    originalPrice: 1450000,
    stock: 35,
    minStockThreshold: 8,
    inStock: true,
    stockText: "موجود در انبار مرکزی پویان افزار",
    seller: "پویان افزار (انبار مرکزی)",
    warranty: "گارانتی ۱۲ ماهه توسن سیستم شرق (تسکو)",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80"
    ],
    description: "هدفون بی‌سیم تسکو مدل TH 5345 یک هدفون سبک، اقتصادی و چندکاره با درایورهای ۴۰ میلی‌متری، بدنه تاشو، شیار کارت حافظه MicroSD، رادیو FM و ورودی جک ۳.۵ میلی‌متری است که گزینه‌ای ایده‌آل برای موسیقی روزمره و کلاس‌های آنلاین محسوب می‌شود.",
    introTitle: "صدای شفاف با امکانات کامل، اتصال کارت حافظه و ارزش خرید استثنایی",
    introDesc: "هدفون تسکو ۵۳۴۵ بدون نیاز به گوشی موبایل و با قراردادن کارت حافظه موسیقی را با کیفیت استریو پخش می‌کند. بدنه این هدفون امکان تا شدن دارد و پدهای چرمی نرم آن به خوبی گوش را در بر می‌گیرند.",
    specs: [
      { label: "نوع اتصال", value: "بی‌سیم بلوتوث نسخه 5.0 / باسیم کابل AUX / کارت حافظه TF Card" },
      { label: "برد عملکرد بلوتوث", value: "۱۰ متر بدون مانع" },
      { label: "قطر درایور", value: "40 میلی‌متر با تفکیک صدای استریو" },
      { label: "شیار کارت حافظه", value: "پشتیبانی از کارت حافظه MicroSD تا ظرفیت 32 گیگابایت" },
      { label: "باتری و کارکرد", value: "باتری ۲۵۰ میلی‌آمپری با بازدهی ۶ تا ۸ ساعت پخش مداوم" },
      { label: "زمان شارژ کامل", value: "حدود ۱.۵ ساعت با کابل MicroUSB" },
      { label: "امکانات جانبی", value: "رادیو FM، میکروفون داخلی جهت مکالمه، کلیدهای کنترل صدا روی کاپ" }
    ],
    featureCards: [
      { title: "پشتیبانی از کارت حافظه", desc: "پخش مستقیم موزیک از رم بدون نیاز به همراه داشتن گوشی یا تبلت", icon: "HardDrive" },
      { title: "طراحی تاشو و پرتابل", desc: "جمع شدن کاپ‌ها به داخل برای حمل آسان داخل کوله‌پشتی", icon: "Layers" },
      { title: "ارزش خرید اقتصادی", desc: "ارائه کلیه قابلیت‌های اتصال بلوتوث، رم و کابل با گارانتی معتبر شرکتی", icon: "ShieldCheck" }
    ],
    colors: [
      { name: "مشکی کلاسیک", hex: "#1A1A1A" },
      { name: "قرمز مشکی اسپرت", hex: "#C53030" }
    ],
    badges: ["پرفروش اقتصادی", "گارانتی تسکو", "ارسال سریع"],
    highlights: [
      "مجهز به شیار کارت حافظه برای استقلال کامل از گوشی هوشمند",
      "امکان اتصال باسیم حتی پس از اتمام شارژ باتری هدفون",
      "هدبند قابل تنظیم متناسب با اندازه سر با روکش نرم چرمی",
      "میکروفون داخلی جهت پاسخگویی به تماس‌های تلفنی و ویس چت"
    ]
  },
  {
    id: "redragon-k552",
    title: "کیبورد مکانیکال گیمینگ ردراگون مدل K552 Kumara با سوییچ آبی و نورپردازی قرمز",
    enTitle: "Redragon K552 Kumara Tenkeyless Mechanical Gaming Keyboard Blue Switches",
    code: "TK-221014",
    categorySlug: "accessories",
    brandSlug: "redragon",
    price: 2190000,
    originalPrice: 2550000,
    stock: 25,
    minStockThreshold: 5,
    inStock: true,
    stockText: "موجود در انبار مرکزی پویان افزار",
    seller: "پویان افزار (انبار مرکزی)",
    warranty: "گارانتی ۱۲ ماهه شرکتی معتبر تخت جمشید / پی‌سی ماد",
    image: "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80"
    ],
    description: "کیبورد مکانیکال گیمینگ ردراگون کومارا K552 محبوب‌ترین کیبورد TKL اقتصادی گیمرهای جهان با شاسی تقویت‌شده فلزی-ABS، سوئیچ‌های مکانیکال کلیکی آبی معادل Cherry Blue با صدای جذاب و عملکرد مقاوم در برابر پاشش تصادفی مایعات است.",
    introTitle: "معروف‌ترین کیبورد مکانیکی جمع‌وجور TKL برای ورود مقتدرانه به دنیای گیمینگ",
    introDesc: "ردراگون K552 فرم فاکتور ده کلید کمتر (TKL) دارد که باعث آزاد شدن فضای روی میز برای حرکت گسترده‌تر ماوس گیمینگ می‌شود. قابلیت تعویض سوئیچ‌ها (Hot-Swappable) و آنتی‌گوستینگ کامل تمامی ۸۷ کلید تجربه بدون نقصی به ارمغان می‌آورد.",
    specs: [
      { label: "نوع کیبورد و فرم فاکتور", value: "مکانیکال TKL جمع‌وجور ۸۷ کلید (Tenkeyless بدون نام‌پد)" },
      { label: "نوع سوئیچ‌ها", value: "Custom Mechanical Blue Switches (کلیکی با صدای رضایت‌بخش و بازخورد سریع)" },
      { label: "طول عمر سوئیچ‌ها", value: "بیش از 50 میلیون کلیک با پین‌های تعویض آسان Hot-Swap" },
      { label: "تکنولوژی آنتی‌گوستینگ", value: "100% Anti-Ghosting با پشتیبانی کامل از N-Key Rollover" },
      { label: "نورپردازی پس‌زمینه", value: "نورپردازی LED قرمز درخشان با ۱۹ حالت نورپردازی و تنظیم شدت نور" },
      { label: "شاسی و متریال", value: "صفحه پایه فلزی مستحکم آلومینیومی با فریم ضد ضربه ABS" },
      { label: "رابط اتصال", value: "کابل با روکش بافته شده و کانکتور طلای USB ضد اکسیداسیون" }
    ],
    featureCards: [
      { title: "سوئیچ‌های مکانیکال کلیکی آبی", desc: "حس لمسی فوق‌العاده با صدای کلاسیک کلیک برای دقت حداکثری در تایپ و بازی", icon: "Zap" },
      { title: "فرم فاکتور جمع‌وجور TKL", desc: "اشغال حداقل فضا روی میز و فضای بازتر برای چرخش ماوس در بازی‌های شوتر", icon: "Layers" },
      { title: "شاسی مقاوم فلزی", desc: "پایداری استوار کیبورد روی میز و مقاومت بالا در برابر ضربه و فرسودگی", icon: "ShieldCheck" }
    ],
    colors: [
      { name: "مشکی مات گیمینگ", hex: "#222222" },
      { name: "سفید برفی (White Edition)", hex: "#FAFAFA" }
    ],
    badges: ["محبوب‌ترین TKL", "قیمت اقتصادی", "ضمانت اصالت"],
    highlights: [
      "سوئیچ‌های هات‌سواپ مجهز به انبر فلزی تعویض سوئیچ داخل جعبه",
      "حروف کلاهک‌ها با تزریق دوگانه Doubleshot بدون امکان پاک شدن در استفاده مداوم",
      "طراحی مقاوم در برابر نفوذ رطوبت و پاشش تصادفی آب",
      "پایه‌های زیرین ضد لغزش با زاویه ارگونومیک جهت جلوگیری از خستگی مچ"
    ]
  }
];

async function main() {
  console.log("==================================================");
  console.log("   SEEDING 21 REALISTIC PRODUCTS TO POYAN AFZAR   ");
  console.log("==================================================");

  // 1. Admin login
  console.log("\n[1/3] Logging in as Admin...");
  const loginRes = await fetch(`${BASE_URL}/api/auth/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: "admin@poyanafzar.ir",
      password: "admin123"
    })
  });

  if (!loginRes.ok) {
    const text = await loginRes.text();
    console.error("Admin login failed:", loginRes.status, text);
    process.exit(1);
  }

  const loginJson = await loginRes.json();
  const token = loginJson.data?.accessToken;
  console.log("Admin login successful. Token acquired.");

  // 2. Post products
  console.log(`\n[2/3] Creating ${productsToSeed.length} products on ${BASE_URL}...`);
  const results = [];

  for (let i = 0; i < productsToSeed.length; i++) {
    const p = productsToSeed[i];
    console.log(`\n(${i + 1}/${productsToSeed.length}) Creating product: ${p.id} (${p.categorySlug} / ${p.brandSlug})...`);

    // Prepare payload (using warranty for guarantee, specs for technicalSpecs to comply with backend DTO)
    const payload = {
      id: p.id,
      title: p.title,
      enTitle: p.enTitle,
      code: p.code,
      categorySlug: p.categorySlug,
      brandSlug: p.brandSlug,
      price: p.price,
      originalPrice: p.originalPrice,
      stock: p.stock,
      minStockThreshold: p.minStockThreshold,
      inStock: p.inStock,
      stockText: p.stockText,
      seller: p.seller,
      warranty: p.warranty,
      image: p.image,
      images: p.images,
      description: p.description,
      introTitle: p.introTitle,
      introDesc: p.introDesc,
      specs: p.specs,
      featureCards: p.featureCards,
      colors: p.colors,
      badges: p.badges,
      highlights: p.highlights
    };

    const res = await fetch(`${BASE_URL}/api/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    });

    const status = res.status;
    let body = null;
    try {
      body = await res.json();
    } catch {
      body = await res.text();
    }

    if (status === 201) {
      console.log(`  -> SUCCESS (Status 201): ${p.id} created!`);
      results.push({ id: p.id, status: 201, title: p.title, success: true });
    } else {
      console.error(`  -> FAILED (Status ${status}):`, JSON.stringify(body));
      results.push({ id: p.id, status, error: body, success: false });
    }
  }

  // 3. Summary & verification
  console.log("\n[3/3] Creation Summary & Verification:");
  console.log("--------------------------------------------------");
  const successes = results.filter(r => r.success);
  const failures = results.filter(r => !r.success);

  console.log(`Total Products: ${results.length}`);
  console.log(`Successful:     ${successes.length}`);
  console.log(`Failed:         ${failures.length}`);

  if (failures.length > 0) {
    console.error("\nFailed products:");
    for (const f of failures) {
      console.error(`- ${f.id}: status ${f.status} -> ${JSON.stringify(f.error)}`);
    }
  }

  console.log("\nVerifying all products via GET /api/products/:id ...");
  let verifiedCount = 0;
  for (const s of successes) {
    const checkRes = await fetch(`${BASE_URL}/api/products/${s.id}`);
    if (checkRes.ok) {
      const pData = await checkRes.json();
      console.log(`  [OK] ${s.id} | Price: ${pData.data.priceString || pData.data.price} T | Brand: ${pData.data.brandSlug} | Cat: ${pData.data.categorySlug}`);
      verifiedCount++;
    } else {
      console.error(`  [MISSING] ${s.id} verification returned status ${checkRes.status}`);
    }
  }

  console.log(`\nVerified ${verifiedCount} of ${successes.length} products on the remote API!`);
}

main().catch(err => {
  console.error("Unexpected error:", err);
  process.exit(1);
});
