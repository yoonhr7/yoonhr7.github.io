export interface MenuItem {
  label: string;
  path: string;
  children?: MenuItem[];
}

export interface MenuData {
  main: MenuItem[];
}
