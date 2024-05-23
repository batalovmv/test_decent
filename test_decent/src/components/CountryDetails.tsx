import  { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCountryByCode } from '../features/countries/countriesSlice';
import { Card, Spin } from 'antd';
import { useAppDispatch, useAppSelector } from '../app/store';
import { styles } from './Styles';

const CountryDetails = () => {
    const { countryCode } = useParams();
    const dispatch = useAppDispatch();
    const country = useAppSelector(state =>
        state.countries.allCountries.find(c => c.cca3 === countryCode)
    );
    const { status, error } = useAppSelector(state => state.countries);
 

    useEffect(() => {
        if (status === 'idle' && countryCode) {
            dispatch(fetchCountryByCode(countryCode));
        }
    }, [countryCode, status]);

    if (error) return <p>Error: {error}</p>;
    if (status === 'loading' || !country) return <Spin size="large" />;
    console.log(`country`, country);

    return (
        <Card
            title={country.name.common}
            style={styles.card}
            cover={
                <img
                    alt={`Flag of ${country.name.common}`}
                    src={country.flags.png}
                    style={styles.flagImage}
                />
            }
        >
            <p>Capital: {country.capital[0]}</p>
            <p>Population: {country.population.toLocaleString()}</p>
            <img
                src={country.coatOfArms.png}
                alt={`Coat of arms of ${country.name.common}`}
                style={styles.coatOfArmsImage}
            />
            <p style={styles.linkMargin}>
                <a href={country.maps.googleMaps} target="_blank" rel="noopener noreferrer">View on Google Maps</a>
            </p>
            <p>
                <a href={country.maps.openStreetMaps} target="_blank" rel="noopener noreferrer">View on OpenStreetMap</a>
            </p>
        </Card>
    );
};

export default CountryDetails;