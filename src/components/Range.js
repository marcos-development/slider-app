
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import SliderRange from './SliderRange';
import SliderValues from './SliderValues';



const Range = ({ type }) => {
    const [ rango, setRango ] = useState({});
    const [ values, setValues ] = useState([]);

    useEffect(async () => {
        if (type === 'range') {
            const api = await axios.get('http://demo1812499.mockable.io/exercise1');
            setRango({ ...api.data });
        }
        if(type === 'values') {
            const api = await axios.get('http://demo1812499.mockable.io/exercise2');
            setValues([ ...api.data.values ]);
        }
    }, []);

    return (
        <div>
            
            { type === 'range' 
                ? rango.min || rango.max ? <SliderRange min={rango.min} max={rango.max} /> : null
                : values.length ? <SliderValues values={values} /> : null
            }
            
        </div>
    );
};
Range.propTypes = {
    type: PropTypes.string.isRequired,
};

export default Range;
