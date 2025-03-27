declare type ThemeVersion = '1' | '2';

declare type ThemeProps = {
    version?: ThemeVersion;
};

declare type ThemeVersionProps = {
    checked: boolean;
    handleToggleTheme: () => void;
};

declare type ThemeButtonType = {
    label: string;
    localeLabel: ThemeType;
};