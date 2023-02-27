export interface NavbarProps {
  searchValue: string;
  onChangeSearchValue: (e: any) => void;
  onKeyDown: (e: any) => void;
  showHomeIcon?: boolean;
}

export interface NavbarLayoutProps {
  children: React.ReactNode;
  showHomeIcon?: boolean;
}
