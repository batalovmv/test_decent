import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAllCountries, fetchCountryDetails } from '../../api/countriesAPI';
interface Maps {
    googleMaps: string;
    openStreetMaps: string;
}
interface links {
    png: string;
    svg: string;
}
interface Country {
    maps: Maps;
    coatOfArms: links;
    cca3: string;
    flags: links;
    name: { common: string; };
    capital: string[];
    population: number;
}
interface CountryDetails {
    name: {
        common: string;
    };
    capital: string[];
    population: number;
    flags: {
        png: string;
    };
    coatOfArms: {
        png?: string;
    };
    maps: {
        googleMaps: string;
        openStreetMaps: string;
    };
}
interface CountriesState {
    allCountries: Country[];
    detailedCountry: CountryDetails | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: CountriesState = {
    allCountries: [],
    detailedCountry: null,
    status: 'idle',
    error: null
};

export const fetchCountries = createAsyncThunk('countries/fetchCountries', async () => {
    return await fetchAllCountries();
});

export const fetchCountryByCode = createAsyncThunk(
    'countries/fetchCountryByCode',
    async (countryCode: string) => {
        return await fetchCountryDetails(countryCode);
    }
);

const countriesSlice = createSlice({
    name: 'countries',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchCountries.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCountries.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.allCountries = action.payload;
            })
            .addCase(fetchCountries.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message ?? "An unknown error occurred";
            })
            .addCase(fetchCountryByCode.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCountryByCode.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.detailedCountry = action.payload;
            })
            .addCase(fetchCountryByCode.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message ?? "An unknown error occurred";
            });
    }
});
export default countriesSlice.reducer;