export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: '2slit.btc',
  description: 'BTC L2 data.',
  navItems: [
    // {
    //   label: 'Home',
    //   href: '/',
    // },
    // {
    //   label: "About",
    //   href: "/about",
    // }
  ],
  navMenuItems: [
    {
      label: 'Profile',
      href: '/profile',
    },
    {
      label: 'Dashboard',
      href: '/dashboard',
    },
    {
      label: 'Projects',
      href: '/projects',
    },
    {
      label: 'Logout',
      href: '/logout',
    },
  ],
  links: {
    github: 'https://github.com/2slit-btc',
    twitter: 'https://twitter.com/2slit-btc',
  },
}
