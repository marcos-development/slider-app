import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core';

const style = makeStyles({
    container: {
        height: '100vh',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
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
        '&:hover': {
            cursor: 'pointer',
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
        '&:hover': {
            cursor: 'pointer',
        }
    },
    labelPriceMin: {
        position: 'absolute',
        marginTop: '-4px',
        marginLeft: '-70px',
        color: 'black',
    },
    labelPriceMax: {
        position: 'absolute',
        marginTop: '-4px',
        color: 'black',
        marginLeft: props => `${props.sliderWidth + 20}px`,
    },
});

const SliderValues = ({ values }) => {
    const [ rango, setRango ] = useState({});
    const [ stylesProps, setStylesProps ] = useState({});
    const [amount, setAmount] = useState({});
    const classes = style(stylesProps);


    useEffect(() => {
        values.sort();
        let min = values[0];
        let max = values[values.length-1]
        setRango({ min , max });
        setAmount({ min, max });
        setStylesProps({
            button1MarginLeft: '0px',
            button2MarginLeft: `${max}px`,
            betweenMarginLeft: '0px',
            betweenWidth: `${max+20}px`,
            sliderWidth: max+20
        });
    }, [values])

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
                left1 = parseFloat(parseFloat(parseInt(left1) + '.99').toFixed(2));
                const marginRight = slider.offsetWidth - button1.offsetWidth;
                if (left1 < 0) left1 = 0;
                if (left1 > marginRight) left1 = marginRight;
                if (left1 >= rango.min && left1 < amount.max && values.includes(left1)) {
                    setAmount({...amount, min: left1});
                }
    
                if(left1 < amount.max && values.includes(left1)) {
                    setStylesProps({
                        ...stylesProps,
                        button1MarginLeft: left1,
                        betweenWidth: (parseInt(amount.max) - parseInt(left1)),
                        betweenMarginLeft: left1,
                    });
                }
            };
        }
        if (param === 'max') {
            document.onmousemove = (ev) => {
                const marginMove = ev.pageX;
                let left2 = marginMove - shiftX2 - sliderCoords.left;
                left2 = parseFloat(parseFloat(parseInt(left2) + '.99').toFixed(2));
                const marginRight = slider.offsetWidth - button2.offsetWidth;
                if (left2 < 0) left2 = 0;
                if (left2 > marginRight) left2 = marginRight;
                if (left2 <= rango.max && left2 > amount.min && values.includes(left2)) {
                    setAmount({...amount, max: left2});
                }
                
                if(amount.min < left2 && values.includes(left2)) {
                    setStylesProps({
                        ...stylesProps,
                        button2MarginLeft: left2,
                        betweenWidth: (parseInt(left2) - parseInt(amount.min)),
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


    return (
        <div className={classes.container}>
            {rango.min 
                ? <div id="sliderContent" className={classes.barra}>
                    <span className={classes.labelPriceMin}>{amount.min}€</span>
                    <div id="rangeBetween" className={classes.rangeBetween}></div>
                    <div id="buttonMin" className={classes.circuloMin} onMouseDown={e => handleMouseMove(e, 'min')}>
                        
                    </div>
                    <div id="buttonMax" className={classes.circuloMax} onMouseDown={e => handleMouseMove(e, 'max')}>
                    </div>
                    <span className={classes.labelPriceMax}>{amount.max}€</span>
                </div> 
                : null
            }
        </div>
    )
}

export default SliderValues
