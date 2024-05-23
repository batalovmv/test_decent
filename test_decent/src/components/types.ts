export interface Country {
    name: {
        common: string;
    };
    capital: string[];
    population: number;
    flags: {
        png: string;
        svg: string;
    };
    cca3: string;
}

export interface CountryDetailsProps {
    // country может быть undefined, если указанный countryCode не найден
    country: Country | null | undefined;
    // Добавляем все возможные состояния загрузки
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

export interface CountriesListProps {
    countries: Country[];
    // Добавляем все возможные состояния загрузки
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}