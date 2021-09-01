import { CoreConfig } from '@core/types';
// prettier-ignore
export const coreConfig: CoreConfig = {
  app: {
    appName: 'Next invest office',                                        // App Name
    appTitle: 'Backoffice - Next invest', // App Title
    appLogoImage: 'assets/images/logo/logo.svg',                  // App Logo
    appLanguage: 'en',                                           // App Default Language (en, fr, de, pt etc..)
  },
  layout: {
    skin: 'dark',                        // default, dark, bordered, semi-dark
    type: 'vertical',                       // vertical, horizontal
    animation: 'fadeInLeft',                     // fadeInLeft, zoomIn , fadeIn, none
    menu: {
      hidden: false,           // Boolean: true, false
      collapsed: false,           // Boolean: true, false
    },
    // ? For horizontal menu, navbar type will work for navMenu type
    navbar: {
      hidden: false,           // Boolean: true, false
      type: 'navbar-static-top',  // navbar-static-top, fixed-top, floating-nav, d-none
      background: 'navbar-light',  // navbar-light. navbar-dark
      customBackgroundColor: true,            // Boolean: true, false
      backgroundColor: ''               // BS color i.e bg-primary, bg-success
    },
    footer: {
      hidden: false,           // Boolean: true, false
      type: 'footer-static', // footer-static, footer-sticky, d-none
      background: 'footer-light',  // footer-light. footer-dark
      customBackgroundColor: false,           // Boolean: true, false
      backgroundColor: ''               // BS color i.e bg-primary, bg-success
    },
    enableLocalStorage: true,
    customizer: false,                       // Boolean: true, false (Enable theme customizer)
    scrollTop: true,                       // Boolean: true, false (Enable scroll to top button)
    buyNow: false                        // Boolean: true, false (Set false in real project, For demo purpose only)
  }
}
