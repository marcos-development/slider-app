import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';

const styles = makeStyles({
    container: {
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonStyle: {
        backgroundColor: '#067909',
        display: 'flex',
        color: 'white',
        margin: '20px',
        padding: '5px 8px',
        borderRadius: '10px',
        '&:hover': {
            cursor: 'pointer',
            backgroundColor: '#36b34b',
        }
    }
});

const Home = () => {
    const classes = styles();
    const history = useHistory();

    return (
        <div className={classes.container}>
            <h1>Range Exercise:</h1>
            <span
                className={classes.buttonStyle}
                onClick={()=>history.push('/exercise1')}
            >Go to Normal</span>
            <span
                className={classes.buttonStyle}
                onClick={()=>history.push('/exercise2')}
            >Go to Fixed</span>
        </div>
    );
};

export default Home;
