import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    console.log('Notfound')
    const styles = {
        container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center',
        backgroundColor: '#000',
        color: '#f3f4f6',
        },
        title: {
        fontSize: '6rem',
        margin: '0',
        animation: 'fadeIn 1s ease-in-out',
        },
        subtitle: {
        fontSize: '1.5rem',
        color: '#666',
        marginBottom: '2rem',
        animation: 'fadeIn 1.5s ease-in-out',
        },
        button: {
        padding: '10px 20px',
        fontSize: '1rem',
        color: '#fff',
        backgroundColor: '#4a90e2',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        textDecoration: 'none',
        animation: 'fadeIn 2s ease-in-out',
        },
        '@keyframes fadeIn': {
        '0%': { opacity: 0 },
        '100%': { opacity: 1 },
        },
    };

    return (
        <div style={styles.container}>
        <h1 style={styles.title}>404</h1>
        <p style={styles.subtitle}>Oops! The page you're looking for doesn't exist.</p>
        <Link to="/" style={styles.button}>
            Go Back Home
        </Link>
        </div>
    );
};

export default NotFound;
