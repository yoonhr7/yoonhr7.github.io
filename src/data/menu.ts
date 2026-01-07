import { MenuData } from '@/types/menu';

export const menuData: MenuData = {
  main: [
    {
      label: 'Home',
      path: '/',
    },
    {
      label: 'Work',
      path: '/work',
      children: [
        { label: 'Interactive UI', path: '/work/interactive-ui' },
        { label: 'Data Visualization', path: '/work/data-visualization' },
        { label: 'Experiments', path: '/work/experiments' },
      ],
    },
    {
      label: 'Log',
      path: '/log',
      children: [
        { label: 'Markup & CSS', path: '/log/markup-css' },
        { label: 'Animation', path: '/log/animation' },
        { label: 'Framework', path: '/log/framework' },
        { label: 'Map & Visualization', path: '/log/map-visualization' },
        { label: 'API & Integration', path: '/log/api-integration' },
        { label: 'Performance & Debugging', path: '/log/performance-debugging' },
      ],
    },
    {
      label: 'Notes',
      path: '/notes',
      children: [
        { label: 'Dev Workflow', path: '/notes/dev-workflow' },
        { label: 'AI & Tools', path: '/notes/ai-tools' },
        { label: 'Career', path: '/notes/career' },
      ],
    },
    {
      label: 'About',
      path: '/about',
      children: [
        { label: 'Profile', path: '/about/profile' },
        { label: 'Principles', path: '/about/principles' },
        { label: 'Stack', path: '/about/stack' },
        { label: 'Contact', path: '/about/contact' },
      ],
    },
  ],
};
