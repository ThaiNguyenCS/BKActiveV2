declare type LanguageVersion = '1' | '2' | '3';

declare type LanguageProps = {
    version?: LanguageVersion;
};

declare type LanguageVersionProps = {
    handleSwitchLanguage: (_language: LocaleType) => void;
};

declare type LanguageButtonType = {
    label: string;
    localeLabel: LocaleType;
};