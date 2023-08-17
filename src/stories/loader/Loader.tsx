import React from 'react';
import styles from './Loader.module.scss';

const Loader = () => {
    return (
        <div className={styles.container}>
            <div className={styles.loader}>
                <div className={styles.loader_dot} />
                <div className={styles.loader_dot} />
                <div className={styles.loader_dot} />
                <div className={styles.loader_dot} />
                <div className={styles.loader_dot} />
                <div className={styles.loader_dot} />
                <div className={styles.loader_text}>Loading...</div>
            </div>
        </div>
    );
};

export default Loader;
