interface Page {
  name: string;
  items: PageItem[];
  auth?: boolean;
}

interface PageItem {
  name: string | 'excluded';
  href: string;
  auth?: boolean;
  hidden?: true;
  highlightAnotherItem?: string;
  icon?: string;
  badge?: string;
}

export const pagesWithoutSidebar: string[] = ['/auth/login'];

export const pages: Page[] = [
  {
    name: 'Home',
    items: [
      {
        name: 'Home',
        href: '/',
      },
    ],
  },
  {
    name: 'Smart Home',
    auth: true,
    items: [
      {
        name: 'Lights',
        href: '/smart-home/lights',
      },
    ],
  },
];

export const protectedPages = [
  ...new Set(
    pages.flatMap(({ auth, items }) => {
      if (auth) return items.map(({ href }) => href);

      return items.filter(({ auth }) => !!auth).map(({ href }) => href);
    })
  ),
];
