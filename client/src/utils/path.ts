const path = {
  PUBLIC: "/",
  HOME: "",
  ALL: "*",
  LOGIN: "login",
  PRODUCTS: ":category",
  BLOGS: "blogs",
  OUR_SERVICES: "services",
  FAQ: "faq",
  DETAIL_PRODUCT__CATEGORY__PID__TITLE: ":category/:pid/:title",
  FINAL_REGISTER: "finalregister/:status",
  RESET_PASSWORD: "reset-password/:token",

  // Admin
  ADMIN: "admin",
  DASHBOARD: "dashboard",
  MANAGE_USERS: "manage-users",
  MANAGE_PRODUCTS: "manage-products",
  MANAGE_ORDERS: "manage-orders",
  CREATE_PRODUCTS: "create-products",

  // Member
  MEMBER: "member",
  PERSONAL: "personal",
}

export default path
