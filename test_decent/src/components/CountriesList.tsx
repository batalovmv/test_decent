import { useEffect } from 'react';
import { fetchCountries } from '../features/countries/countriesSlice';
import { List, Avatar, Spin,} from 'antd';
import { useAppDispatch, useAppSelector } from '../app/store';
import { styles } from './Styles';
import { Link } from 'react-router-dom';


const CountriesList = () => {
    const dispatch = useAppDispatch();
    const { allCountries, status, error } = useAppSelector(state => state.countries);

    useEffect(() => {
        if (status === 'idle' && allCountries.length === 0) {
            dispatch(fetchCountries());
        }
    }, [status]);

    if (error) return <div>Error: {error}</div>;
    if (status === 'loading') return <Spin size="large" />;

    return (
        <List
            grid={{ gutter: 16, column: 1 }}
            dataSource={allCountries}
            renderItem={country => (
                <List.Item style={styles.listItemStyle}>
                    <List.Item.Meta
                        avatar={<Avatar src={country.flags.svg} />}
                        title={<Link to={`/countries/${country.cca3}`}>{country.name.common}</Link>}
                        description={country.capital}
                    />
                </List.Item>
            )}
        />
    );
};

export default CountriesList;