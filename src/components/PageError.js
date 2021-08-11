import React from 'react';
import { makeStyles } from '@material-ui/core';
import image from '../images/error404.png';


const styles = makeStyles({
    container: {
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageStyle: {
        border: '1px solid green',
    }
});

const PageError = () => {
    const classes = styles();

    return (
        <div className={classes.container}>
            <img className={classes.imageStyle} src={image} />
        </div>
    );
};

export default PageError;
