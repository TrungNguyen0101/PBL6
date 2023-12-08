const routes = {
  // Public
  HOME: '/',
  INTRODUCE: '/introduce',
  PRIVACY: '/privacy',

  // Auth
  LOGIN: '/sign-in',
  REGISTER: '/sign-up',
  FORGOTTEN: '/forgotten',
  VERIFYCODE: '/verify-code',
  CHANGEPASSWORD: '/change-password',

  // Private

  PROFILE: '/profile',
  SETTINGS: '/settings',

  // Manage
  DASHBOARD: '/admin',
  ACCOUNT: '/admin-accounts',
  PRODUCT: '/admin-products',
  ORDER: '/admin-orders',

  // BOOK
  ALLBOOK: '/all-book',
  CUSTOMERHISTORY: '/customer-history',
};

export default routes;
