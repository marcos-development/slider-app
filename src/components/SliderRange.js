import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
// import { debounce } from '../helpers/functions';

const debounce = (fn, delay) => {
  let timeoutId;
  return function(...args) {
    clearInterval(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  };
};

const style = makeStyles({
    container: {
        height: '100vh',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    subtitle: {
        marginTop: '-200px',
        position: 'absolute',
        fontFamily: 'arial, Helvetica, sans-serif',
        fontSize: '40px',
        color: '#0da520'
    },
    barra: {
        height: '10px',
        width: props => `${props.sliderWidth}px`,
        background: 'black',
        borderRadius: '20px',
        position: 'absolute',
        zIndex: 1
    },
    rangeBetween: {
        position: 'absolute',
        height: '5px',
        width: props => props.betweenWidth,
        marginLeft: props => props.betweenMarginLeft,
        marginTop: '3px',
        border: 'none',
        backgroundColor: '#559933',
    },
    circuloMin: {
        height: '20px',
        width: '20px',
        borderRadius: '50%',
        background: 'green',
        position: 'absolute',
        marginLeft: props => props.button1MarginLeft,
        transform: 'translateY(-30%)',
        zIndex: 1,
        transition: 'padding .5s',
        '&:hover': {
            cursor: 'pointer',
            padding: '1px',
        }
    },
    circuloMax: {
        height: '20px',
        width: '20px',
        borderRadius: '50%',
        background: 'green',
        marginLeft: props => props.button2MarginLeft,
        position: 'absolute',
        transform: 'translateY(-30%)',
        zIndex: 1,
        transition: 'padding .5s',
        '&:hover': {
            cursor: 'pointer',
            padding: '1px',
        }
    },
    labelPriceMin: {
        width: '60px',
        position: 'absolute',
        marginTop: '-4px',
        marginLeft: '-80px',
        color: 'black',
    },
    labelPriceMax: {
        width: '60px',
        position: 'absolute',
        marginTop: '-4px',
        color: 'black',
        marginLeft: props => `${props.sliderWidth + 20}px`,
    },
    buttonStyle: {
        backgroundColor: '#067909',
        display: 'flex',
        color: 'white',
        margin: '20px',
        marginTop: '200px',
        padding: '5px 8px',
        borderRadius: '10px',
        '&:hover': {
            cursor: 'pointer',
            backgroundColor: '#36b34b',
        }
    }
});

const SliderRange = ({ min, max }) => {
    const history = useHistory();
    const [ rango, setRango ] = useState({});
    const [ stylesProps, setStylesProps ] = useState({});
    const [amount, setAmount] = useState({});
    const classes = style(stylesProps);

    useEffect(() => {
        setRango({ min, max });
        setAmount({ min, max });
        setStylesProps({
            button1MarginLeft: '0px',
            button2MarginLeft: `${max}px`,
            betweenMarginLeft: '0px',
            betweenWidth: `${max+20}px`,
            sliderWidth: max+20
        });
    }, [])


    const handleMouseMove = (e, param) => {
        const slider = document.getElementById("sliderContent");
        const button1 = document.getElementById("buttonMin");
        const button2 = document.getElementById("buttonMax");
        const sliderCoords = getCoords(slider);
        const button1Coords = getCoords(button1);
        const button2Coords = getCoords(button2);
        let shiftX1 = e.pageX - button1Coords.left;
        let shiftX2 = e.pageX - button2Coords.left;
        e.target.style.cursor = "grabbing";
        
        if (param === 'min') {
            document.onmousemove = (ev) => {
                const marginMove = ev.pageX;
                let left1 = marginMove - shiftX1 - sliderCoords.left;
                const marginRight = slider.offsetWidth - button1.offsetWidth;
                if (left1 < 0) left1 = 0;
                if (left1 > marginRight) left1 = marginRight;
                if (left1 >= rango.min && left1 < amount.max) setAmount({...amount, min: left1});

                // Calculate range between min and max
                if(left1 < amount.max) {
                    setStylesProps({
                        ...stylesProps,
                        button1MarginLeft: left1,
                        betweenWidth: (amount.max - left1),
                        betweenMarginLeft: left1,
                    });
                }
            };
        }
        if (param === 'max') {
            document.onmousemove = (ev) => {
                const marginMove = ev.pageX;
                let left2 = marginMove - shiftX2 - sliderCoords.left;
                const marginRight = slider.offsetWidth - button2.offsetWidth;
                if (left2 < 0) left2 = 0;
                if (left2 > marginRight) left2 = marginRight;
                if (left2 <= rango.max && left2 > amount.min) setAmount({...amount, max: left2});
                
                // Calculate range between min and max
                if(amount.min < left2) {
                    setStylesProps({
                        ...stylesProps,
                        button2MarginLeft: left2,
                        betweenWidth: (left2 - amount.min),
                        betweenMarginLeft: amount.min,
                    });
                }
            };
        }

        document.onmouseup = function(ev) {
            ev.target.style.cursor = "pointer";
            document.onmousemove = document.onmouseup = null;
        };
    };

    const getCoords = element => {
        const box = element.getBoundingClientRect();
        return {
            top: box.top + pageYOffset,
            left: box.left + pageXOffset
        }
    };

    const debounceCallback = useCallback(
        debounce((value, type) => {
            if (type === 'min') {
                if (value >= rango.min && value < amount.max) {
                    setAmount({
                        ...amount,
                        [type]: value
                    });
                    setStylesProps({
                        ...stylesProps,
                        button1MarginLeft: value,
                        betweenWidth: (amount.max - value),
                        betweenMarginLeft: value,
                    });
                } else {
                    setAmount({
                        ...amount,
                        [type]: rango.min
                    });
                    setStylesProps({
                        ...stylesProps,
                        button1MarginLeft: 0,
                        betweenWidth: (amount.max),
                        betweenMarginLeft: 0,
                    });
                }
            } else {
                if (value <= rango.max && value > amount.min) {
                    setAmount({
                        ...amount,
                        [type]: value
                    });
                    setStylesProps({
                        ...stylesProps,
                        button2MarginLeft: value,
                        betweenWidth: (value - amount.min),
                        betweenMarginLeft: amount.min,
                    });
                } else {
                    setAmount({
                        ...amount,
                        [type]: rango.max
                    });
                    setStylesProps({
                        ...stylesProps,
                        button2MarginLeft: rango.max,
                        betweenWidth: (rango.max - amount.min),
                        betweenMarginLeft: amount.min,
                    });
                }
            }
        }, 2000)
        , [amount, rango]);

    const handleChangeAmount = ({ target: { value } }, type) => {
        setAmount({...amount, [type]: value});
        debounceCallback(parseInt(value), type);
    };

    return (
        <div className={classes.container}>
            <h1 className={classes.subtitle}>Normal Range</h1>
            {rango.min 
                ? <div id="sliderContent" className={classes.barra}>
                    <input type="number" className={classes.labelPriceMin} onChange={(e)=>handleChangeAmount(e, 'min')} value={`${amount.min}`} />
                    <div id="rangeBetween" className={classes.rangeBetween}></div>
                    <div id="buttonMin" className={classes.circuloMin} onMouseDown={e => handleMouseMove(e, 'min')}></div>
                    <div id="buttonMax" className={classes.circuloMax} onMouseDown={e => handleMouseMove(e, 'max')}></div>
                    <input type="numer" className={classes.labelPriceMax} onChange={(e)=>handleChangeAmount(e, 'max')} value={`${amount.max}`} />
                </div>
                : null
            }

            <span
                className={classes.buttonStyle}
                onClick={()=>history.push('/')}
            >Go to Menu</span>
        </div>
    );
};
SliderRange.propTypes = {
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
};

export default SliderRange;
