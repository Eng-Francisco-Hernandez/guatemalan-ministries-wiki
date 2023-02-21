export interface NavbarProps {
    searchValue: string;
    onChangeSearchValue: (e:any) => void;
    onKeyDown: (e: any) => void;
}

export interface NavbarLayoutProps {
    children: React.ReactNode;
}
