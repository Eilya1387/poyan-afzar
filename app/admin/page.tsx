"use client";

import React, { useState, useEffect } from "react";
import { useAdminStore } from "@/lib/admin-store";
import { AdminLogin } from "@/components/admin/admin-login";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { AdminHeader } from "@/components/admin/admin-header";
import { DashboardView } from "@/components/admin/dashboard-view";
import { OrdersView } from "@/components/admin/orders-view";
import { ProductsView } from "@/components/admin/products-view";
import { CategoriesView } from "@/components/admin/categories-view";
import { BrandsView } from "@/components/admin/brands-view";
import { InventoryView } from "@/components/admin/inventory-view";
import { CustomersView } from "@/components/admin/customers-view";
import { DiscountsView } from "@/components/admin/discounts-view";
import { ReviewsView } from "@/components/admin/reviews-view";
import { ReportsView } from "@/components/admin/reports-view";

export default function AdminPage() {
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const adminUser = useAdminStore((state) => state.adminUser);
  const activeTab = useAdminStore((state) => state.activeTab);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white" dir="rtl">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 border-3 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm font-bold text-slate-300">در حال بارگذاری پنل مدیریت...</span>
        </div>
      </div>
    );
  }

  // Not logged in -> Show login view
  if (!adminUser) {
    return <AdminLogin />;
  }

  // Logged in -> Render Admin Panel
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 antialiased" dir="rtl">
      {/* Sidebar Navigation (Fixed on right for desktop) */}
      <AdminSidebar
        isOpenMobile={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
      />

      {/* Main Content Area (offset by sidebar width on desktop) */}
      <div className="lg:mr-64 min-h-screen flex flex-col bg-slate-50">
        {/* Top Header */}
        <AdminHeader onOpenMobileMenu={() => setMobileMenuOpen(true)} />

        {/* Dynamic Tab Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto pb-16">
          {activeTab === "dashboard" && <DashboardView />}
          {activeTab === "orders" && <OrdersView />}
          {activeTab === "products" && <ProductsView />}
          {activeTab === "categories" && <CategoriesView />}
          {activeTab === "brands" && <BrandsView />}
          {activeTab === "inventory" && <InventoryView />}
          {activeTab === "customers" && <CustomersView />}
          {activeTab === "discounts" && <DiscountsView />}
          {activeTab === "reviews" && <ReviewsView />}
          {activeTab === "reports" && <ReportsView />}
        </main>
      </div>
    </div>
  );
}
