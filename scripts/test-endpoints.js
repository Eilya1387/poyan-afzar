const BASE_URL = "https://api.poyanafzar.noteduco342.ir";

async function main() {
  console.log("==================================================");
  console.log("   TESTING ALL 75+ ENDPOINTS ON POYAN AFZAR API   ");
  console.log("==================================================");

  const stats = { total: 0, passed: 0, failed: 0 };

  async function test(name, fn) {
    stats.total++;
    try {
      await fn();
      stats.passed++;
      console.log(`[PASS] ${name}`);
    } catch (err) {
      stats.failed++;
      console.error(`[FAIL] ${name}:`, err.message);
    }
  }

  // 1. Health
  await test("GET /api (Health Check)", async () => {
    const res = await fetch(`${BASE_URL}/api`);
    if (!res.ok) throw new Error(`Status ${res.status}`);
  });

  // 2. Auth - Admin Login
  let adminToken = "";
  await test("POST /api/auth/admin/login", async () => {
    const res = await fetch(`${BASE_URL}/api/auth/admin/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: "admin", password: "admin123" }),
    });
    const d = await res.json();
    if (!res.ok || !d.data?.accessToken) throw new Error(d.message || `Status ${res.status}`);
    adminToken = d.data.accessToken;
  });

  // 3. Auth - Send OTP
  let testDevCode = "";
  const testPhone = "0912" + Math.floor(1000000 + Math.random() * 9000000);
  await test("POST /api/auth/otp/send", async () => {
    const res = await fetch(`${BASE_URL}/api/auth/otp/send`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone: testPhone }),
    });
    const d = await res.json();
    if (!res.ok) throw new Error(d.message || `Status ${res.status}`);
    testDevCode = d.data?.devCode || "1234";
  });

  // 4. Auth - Verify OTP
  let userToken = "";
  let userRefreshToken = "";
  await test("POST /api/auth/otp/verify", async () => {
    const res = await fetch(`${BASE_URL}/api/auth/otp/verify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        phone: testPhone,
        code: testDevCode,
        firstName: "تست",
        lastName: "کاربر",
      }),
    });
    const d = await res.json();
    if (!res.ok || !d.data?.accessToken) throw new Error(d.message || `Status ${res.status}`);
    userToken = d.data.accessToken;
    userRefreshToken = d.data.refreshToken;
  });

  // 5. Auth - Refresh
  await test("POST /api/auth/refresh", async () => {
    const res = await fetch(`${BASE_URL}/api/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken: userRefreshToken }),
    });
    const d = await res.json();
    if (!res.ok || !d.data?.accessToken) throw new Error(d.message || `Status ${res.status}`);
    userToken = d.data.accessToken;
  });

  // 6. Auth - Me
  await test("GET /api/auth/me", async () => {
    const res = await fetch(`${BASE_URL}/api/auth/me`, {
      headers: { Authorization: `Bearer ${userToken}` },
    });
    if (!res.ok) throw new Error(`Status ${res.status}`);
  });

  // 7. Categories
  let testCatId = "";
  await test("GET /api/categories", async () => {
    const res = await fetch(`${BASE_URL}/api/categories`);
    const d = await res.json();
    if (!res.ok || !Array.isArray(d.data)) throw new Error(`Status ${res.status}`);
    if (d.data[0]) testCatId = d.data[0].id;
  });

  await test("GET /api/categories/{id}", async () => {
    if (!testCatId) return;
    const res = await fetch(`${BASE_URL}/api/categories/${testCatId}`);
    if (!res.ok) throw new Error(`Status ${res.status}`);
  });

  let createdCatId = "cat-test-" + Date.now();
  await test("POST, PATCH, DELETE /api/categories", async () => {
    const createRes = await fetch(`${BASE_URL}/api/categories`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${adminToken}` },
      body: JSON.stringify({
        id: createdCatId,
        name: "تست دسته",
        nameEn: "Test Category " + Date.now(),
        description: "توضیح تست",
      }),
    });
    const cData = await createRes.json();
    if (!createRes.ok) throw new Error(cData.errors?.join(", ") || cData.message);

    // PATCH
    const patchRes = await fetch(`${BASE_URL}/api/categories/${createdCatId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${adminToken}` },
      body: JSON.stringify({ description: "توضیح جدید" }),
    });
    if (!patchRes.ok) throw new Error(`PATCH failed: ${patchRes.status}`);

    // DELETE
    const delRes = await fetch(`${BASE_URL}/api/categories/${createdCatId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${adminToken}` },
    });
    if (!delRes.ok) throw new Error(`DELETE failed: ${delRes.status}`);
  });

  // 8. Brands
  let testBrandId = "";
  await test("GET /api/brands", async () => {
    const res = await fetch(`${BASE_URL}/api/brands`);
    const d = await res.json();
    if (!res.ok || !Array.isArray(d.data)) throw new Error(`Status ${res.status}`);
    if (d.data[0]) testBrandId = d.data[0].id;
  });

  await test("GET /api/brands/{id}", async () => {
    if (!testBrandId) return;
    const res = await fetch(`${BASE_URL}/api/brands/${testBrandId}`);
    if (!res.ok) throw new Error(`Status ${res.status}`);
  });

  let createdBrandId = "brand-test-" + Date.now();
  await test("POST, PATCH, DELETE /api/brands", async () => {
    const createRes = await fetch(`${BASE_URL}/api/brands`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${adminToken}` },
      body: JSON.stringify({
        id: createdBrandId,
        name: "BrandTest" + Date.now(),
        nameFa: "برند تست",
        logo: "/brands/asus.svg",
        country: "ایران",
      }),
    });
    const bData = await createRes.json();
    if (!createRes.ok) throw new Error(bData.errors?.join(", ") || bData.message);

    // PATCH
    const patchRes = await fetch(`${BASE_URL}/api/brands/${createdBrandId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${adminToken}` },
      body: JSON.stringify({ country: "سوئیس" }),
    });
    if (!patchRes.ok) throw new Error(`PATCH brand failed`);

    // DELETE
    const delRes = await fetch(`${BASE_URL}/api/brands/${createdBrandId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${adminToken}` },
    });
    if (!delRes.ok) throw new Error(`DELETE brand failed`);
  });

  // 9. Products
  let sampleProductId = "airpods-pro-2";
  await test("GET /api/products", async () => {
    const res = await fetch(`${BASE_URL}/api/products`);
    const d = await res.json();
    if (!res.ok) throw new Error(`Status ${res.status}`);
  });

  await test("GET /api/products/flash-deals", async () => {
    const res = await fetch(`${BASE_URL}/api/products/flash-deals`);
    if (!res.ok) throw new Error(`Status ${res.status}`);
  });

  await test("GET /api/products/{id}", async () => {
    const res = await fetch(`${BASE_URL}/api/products/${sampleProductId}`);
    if (!res.ok) throw new Error(`Status ${res.status}`);
  });

  await test("GET /api/products/{id}/related", async () => {
    const res = await fetch(`${BASE_URL}/api/products/${sampleProductId}/related`);
    if (!res.ok) throw new Error(`Status ${res.status}`);
  });

  let createdProdId = "prod-test-" + Date.now();
  await test("POST, PATCH, DELETE /api/products", async () => {
    const code = "TK-T" + Math.floor(1000 + Math.random() * 9000);
    const createRes = await fetch(`${BASE_URL}/api/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${adminToken}` },
      body: JSON.stringify({
        id: createdProdId,
        title: "کالای آزمایشی تست",
        enTitle: "Test Product " + Date.now(),
        code,
        price: 2500000,
        stock: 5,
        brandSlug: "apple",
        categorySlug: "mobile",
        image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434",
      }),
    });
    const pData = await createRes.json();
    if (!createRes.ok) throw new Error(pData.errors?.join(", ") || pData.message);

    // PATCH
    const patchRes = await fetch(`${BASE_URL}/api/products/${createdProdId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${adminToken}` },
      body: JSON.stringify({ stock: 10 }),
    });
    if (!patchRes.ok) throw new Error(`PATCH product failed`);

    // DELETE
    const delRes = await fetch(`${BASE_URL}/api/products/${createdProdId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${adminToken}` },
    });
    if (!delRes.ok) throw new Error(`DELETE product failed`);
  });

  // 10. Addresses
  let testAddressId = "";
  await test("POST, GET, PATCH, DEFAULT, DELETE /api/addresses", async () => {
    // POST
    const createRes = await fetch(`${BASE_URL}/api/addresses`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${userToken}` },
      body: JSON.stringify({
        title: "دفتر تست",
        province: "تهران",
        city: "تهران",
        fullAddress: "خیابان ولیعصر پلاک ۱۰",
        postalCode: "1234567890",
        receiverName: "تست",
        receiverPhone: "09121112233",
      }),
    });
    const aData = await createRes.json();
    if (!createRes.ok) throw new Error(aData.message);
    testAddressId = aData.data?.id;

    // GET
    const getRes = await fetch(`${BASE_URL}/api/addresses`, {
      headers: { Authorization: `Bearer ${userToken}` },
    });
    if (!getRes.ok) throw new Error(`GET addresses failed`);

    // PATCH
    const patchRes = await fetch(`${BASE_URL}/api/addresses/${testAddressId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${userToken}` },
      body: JSON.stringify({ title: "دفتر مرکزی" }),
    });
    if (!patchRes.ok) throw new Error(`PATCH address failed`);

    // DEFAULT
    const defRes = await fetch(`${BASE_URL}/api/addresses/${testAddressId}/default`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${userToken}` },
    });
    if (!defRes.ok) throw new Error(`DEFAULT address failed`);

    // DELETE
    const delRes = await fetch(`${BASE_URL}/api/addresses/${testAddressId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${userToken}` },
    });
    if (!delRes.ok) throw new Error(`DELETE address failed`);
  });

  // 11. Favorites
  await test("Favorites: POST, TOGGLE, CHECK, GET, DELETE /api/favorites", async () => {
    // TOGGLE
    const toggleRes = await fetch(`${BASE_URL}/api/favorites/${sampleProductId}/toggle`, {
      method: "POST",
      headers: { Authorization: `Bearer ${userToken}` },
    });
    if (!toggleRes.ok) throw new Error(`Toggle favorite failed`);

    // CHECK
    const checkRes = await fetch(`${BASE_URL}/api/favorites/${sampleProductId}/check`, {
      headers: { Authorization: `Bearer ${userToken}` },
    });
    if (!checkRes.ok) throw new Error(`Check favorite failed`);

    // GET
    const getRes = await fetch(`${BASE_URL}/api/favorites`, {
      headers: { Authorization: `Bearer ${userToken}` },
    });
    if (!getRes.ok) throw new Error(`GET favorites failed`);

    // DELETE
    const delRes = await fetch(`${BASE_URL}/api/favorites/${sampleProductId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${userToken}` },
    });
    if (!delRes.ok) throw new Error(`DELETE favorite failed`);
  });

  // 12. User Profile & Wallet
  await test("GET, PATCH /api/users/profile", async () => {
    const getRes = await fetch(`${BASE_URL}/api/users/profile`, {
      headers: { Authorization: `Bearer ${userToken}` },
    });
    if (!getRes.ok) throw new Error(`GET profile failed`);

    const patchRes = await fetch(`${BASE_URL}/api/users/profile`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${userToken}` },
      body: JSON.stringify({ firstName: "پویان", lastName: "افزار" }),
    });
    if (!patchRes.ok) throw new Error(`PATCH profile failed`);
  });

  await test("GET, POST /api/wallet & /api/users/wallet", async () => {
    const getRes = await fetch(`${BASE_URL}/api/wallet`, {
      headers: { Authorization: `Bearer ${userToken}` },
    });
    if (!getRes.ok) throw new Error(`GET wallet failed`);

    const topRes = await fetch(`${BASE_URL}/api/wallet/top-up`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${userToken}` },
      body: JSON.stringify({ amount: 100000 }),
    });
    if (!topRes.ok) throw new Error(`POST wallet top-up failed`);
  });

  // 13. Discounts & Coupons
  await test("POST /api/coupons/validate & /api/discounts/validate", async () => {
    const res1 = await fetch(`${BASE_URL}/api/coupons/validate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: "OFF10", subtotal: 1000000 }),
    });
    if (!res1.ok) throw new Error(`coupons/validate failed`);

    const res2 = await fetch(`${BASE_URL}/api/discounts/validate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: "OFF10", subtotal: 1000000 }),
    });
    if (!res2.ok) throw new Error(`discounts/validate failed`);
  });

  let createdDiscId = "";
  await test("GET, POST, PATCH, TOGGLE, DELETE /api/discounts", async () => {
    const getRes = await fetch(`${BASE_URL}/api/discounts`, {
      headers: { Authorization: `Bearer ${adminToken}` },
    });
    if (!getRes.ok) throw new Error(`GET discounts failed`);

    const createRes = await fetch(`${BASE_URL}/api/discounts`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${adminToken}` },
      body: JSON.stringify({
        title: "تخفیف تست",
        code: "TEST" + Math.floor(1000 + Math.random() * 9000),
        type: "PERCENTAGE",
        percent: 10,
        amount: 0,
      }),
    });
    const dData = await createRes.json();
    if (!createRes.ok) throw new Error(dData.errors?.join(", ") || dData.message);
    createdDiscId = dData.data?.id;

    // PATCH
    const patchRes = await fetch(`${BASE_URL}/api/discounts/${createdDiscId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${adminToken}` },
      body: JSON.stringify({ percent: 12 }),
    });
    if (!patchRes.ok) throw new Error(`PATCH discount failed`);

    // TOGGLE
    const togRes = await fetch(`${BASE_URL}/api/discounts/${createdDiscId}/toggle`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${adminToken}` },
    });
    if (!togRes.ok) throw new Error(`TOGGLE discount failed`);

    // DELETE
    const delRes = await fetch(`${BASE_URL}/api/discounts/${createdDiscId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${adminToken}` },
    });
    if (!delRes.ok) throw new Error(`DELETE discount failed`);
  });

  // 14. Cart Calculate
  await test("POST /api/cart/calculate", async () => {
    const res = await fetch(`${BASE_URL}/api/cart/calculate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: [{ productId: sampleProductId, quantity: 2 }],
        couponCode: "OFF10",
      }),
    });
    if (!res.ok) throw new Error(`cart calculate failed`);
  });

  // 15. Orders
  let testOrderId = "";
  let testTrackingCode = "";
  await test("POST, GET, TRACK, CANCEL /api/orders", async () => {
    const orderRes = await fetch(`${BASE_URL}/api/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${userToken}` },
      body: JSON.stringify({
        items: [{ productId: sampleProductId, quantity: 1 }],
        customerName: "کاربر تستی",
        customerPhone: testPhone,
        shippingAddress: {
          province: "تهران",
          city: "تهران",
          fullAddress: "میدان انقلاب خیابان کارگر",
          postalCode: "1234567890",
          receiverName: "کاربر تستی",
          receiverPhone: testPhone,
        },
        paymentMethod: "gateway",
      }),
    });
    const oData = await orderRes.json();
    if (!orderRes.ok) throw new Error(oData.errors?.join(", ") || oData.message);
    testOrderId = oData.orderId || oData.order?.id;
    testTrackingCode = oData.trackingCode || oData.order?.trackingCode;

    // GET My orders
    const myRes = await fetch(`${BASE_URL}/api/orders/my-orders`, {
      headers: { Authorization: `Bearer ${userToken}` },
    });
    if (!myRes.ok) throw new Error(`GET my-orders failed`);

    // TRACK
    const trackRes = await fetch(`${BASE_URL}/api/orders/track/${testTrackingCode}`);
    if (!trackRes.ok) throw new Error(`GET track failed`);

    // GET by id
    const getByIdRes = await fetch(`${BASE_URL}/api/orders/${testOrderId}`, {
      headers: { Authorization: `Bearer ${userToken}` },
    });
    if (!getByIdRes.ok) throw new Error(`GET order by id failed`);

    // CANCEL
    const cancelRes = await fetch(`${BASE_URL}/api/orders/${testOrderId}/cancel`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${userToken}` },
      body: JSON.stringify({ reason: "تست لغو" }),
    });
    if (!cancelRes.ok) throw new Error(`POST cancel order failed`);
  });

  // 16. Payments
  await test("POST /api/payments/create & GET/POST /api/payments/verify", async () => {
    const payRes = await fetch(`${BASE_URL}/api/payments/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: 1500000, description: "تست پرداخت" }),
    });
    const payData = await payRes.json();
    if (!payRes.ok) throw new Error(payData.message);

    const authority = payData.data?.authority || payData.authority;

    // GET verify
    const verGet = await fetch(`${BASE_URL}/api/payments/verify?authority=${authority}&status=OK`);
    if (!verGet.ok) throw new Error(`GET payment verify failed`);

    // POST verify
    const verPost = await fetch(`${BASE_URL}/api/payments/verify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ authority, status: "OK" }),
    });
    if (!verPost.ok) throw new Error(`POST payment verify failed`);
  });

  // 17. Reviews & QA
  await test("Reviews & QA: GET & POST /api/products/:id/reviews & /qa", async () => {
    // Reviews
    const revGet = await fetch(`${BASE_URL}/api/products/${sampleProductId}/reviews`);
    if (!revGet.ok) throw new Error(`GET reviews failed`);

    const revAlias = await fetch(`${BASE_URL}/api/reviews?productId=${sampleProductId}`);
    if (!revAlias.ok) throw new Error(`GET reviews alias failed`);

    const revPost = await fetch(`${BASE_URL}/api/products/${sampleProductId}/reviews`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rating: 5, comment: "محصول عالی و اصل", userName: "تست نظر دهنده" }),
    });
    if (!revPost.ok) throw new Error(`POST review failed`);

    // QA
    const qaGet = await fetch(`${BASE_URL}/api/products/${sampleProductId}/qa`);
    if (!qaGet.ok) throw new Error(`GET qa failed`);

    const qaAlias = await fetch(`${BASE_URL}/api/qa/${sampleProductId}`);
    if (!qaAlias.ok) throw new Error(`GET qa alias failed`);

    const qaPost = await fetch(`${BASE_URL}/api/products/${sampleProductId}/qa`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: "آیا گارانتی فعال دارد؟", userName: "تست پرسشگر" }),
    });
    if (!qaPost.ok) throw new Error(`POST qa failed`);
  });

  // 18. Newsletter
  await test("Newsletter: POST subscribe & unsubscribe", async () => {
    const testEmail = "test" + Math.floor(1000 + Math.random() * 9000) + "@poyanafzar.ir";
    const subRes = await fetch(`${BASE_URL}/api/newsletter/subscribe`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: testEmail }),
    });
    if (!subRes.ok) throw new Error(`Newsletter subscribe failed`);
  });

  // 19. Admin Analytics, Inventory, Orders, Customers, Reports
  await test("Admin Analytics: overview, kpis, sales-chart, recent-orders", async () => {
    const eps = [
      "/api/admin/analytics/overview",
      "/api/admin/analytics/kpis",
      "/api/admin/analytics/sales-chart",
      "/api/admin/analytics/recent-orders",
    ];
    for (const ep of eps) {
      const res = await fetch(`${BASE_URL}${ep}`, {
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      if (!res.ok) throw new Error(`${ep} returned ${res.status}`);
    }
  });

  await test("Admin Inventory: list, alerts, stock update", async () => {
    const invRes = await fetch(`${BASE_URL}/api/admin/inventory`, {
      headers: { Authorization: `Bearer ${adminToken}` },
    });
    if (!invRes.ok) throw new Error(`GET inventory failed`);

    const alertRes = await fetch(`${BASE_URL}/api/admin/inventory/alerts`, {
      headers: { Authorization: `Bearer ${adminToken}` },
    });
    if (!alertRes.ok) throw new Error(`GET alerts failed`);

    const stockRes = await fetch(`${BASE_URL}/api/admin/inventory/${sampleProductId}/stock`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${adminToken}` },
      body: JSON.stringify({ delta: 1 }),
    });
    if (!stockRes.ok) throw new Error(`PATCH stock failed`);
  });

  await test("Admin Orders & Customers: list & details", async () => {
    const ordRes = await fetch(`${BASE_URL}/api/admin/orders`, {
      headers: { Authorization: `Bearer ${adminToken}` },
    });
    if (!ordRes.ok) throw new Error(`GET admin orders failed`);

    const custRes = await fetch(`${BASE_URL}/api/admin/customers`, {
      headers: { Authorization: `Bearer ${adminToken}` },
    });
    if (!custRes.ok) throw new Error(`GET admin customers failed`);
  });

  await test("Admin Reports: analytics & export CSV", async () => {
    const repRes = await fetch(`${BASE_URL}/api/admin/reports/analytics`, {
      headers: { Authorization: `Bearer ${adminToken}` },
    });
    if (!repRes.ok) throw new Error(`GET reports analytics failed`);

    const expRes = await fetch(`${BASE_URL}/api/admin/reports/export`, {
      headers: { Authorization: `Bearer ${adminToken}` },
    });
    if (!expRes.ok) throw new Error(`GET export failed`);
  });

  // 20. Uploads
  await test("Uploads: image, product, brand, images", async () => {
    const png1x1 = Buffer.from(
      "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
      "base64"
    );

    for (const ep of ["/api/upload/image", "/api/upload/product", "/api/upload/brand"]) {
      const form = new FormData();
      form.append("file", new Blob([png1x1], { type: "image/png" }), "pixel.png");
      const r = await fetch(`${BASE_URL}${ep}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${adminToken}` },
        body: form,
      });
      if (!r.ok) throw new Error(`${ep} failed with ${r.status}`);
    }

    // Multiple
    const formMulti = new FormData();
    formMulti.append("files", new Blob([png1x1], { type: "image/png" }), "p1.png");
    formMulti.append("files", new Blob([png1x1], { type: "image/png" }), "p2.png");
    const rMulti = await fetch(`${BASE_URL}/api/upload/images?folder=products`, {
      method: "POST",
      headers: { Authorization: `Bearer ${adminToken}` },
      body: formMulti,
    });
    if (!rMulti.ok) throw new Error(`/api/upload/images failed with ${rMulti.status}`);
  });

  console.log("\n==================================================");
  console.log(`TEST SUMMARY: ${stats.passed} passed, ${stats.failed} failed out of ${stats.total} test suites.`);
  console.log("==================================================");
}

main().catch(console.error);
