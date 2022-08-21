interface Page {
  name: string;
  items: PageItem[];
}

interface PageItem {
  name: string | 'excluded';
  href: string;
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
    items: [
      {
        name: 'Lights',
        href: '/smart-home/lights',
      },
    ],
  },
];
