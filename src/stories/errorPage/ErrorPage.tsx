import styles from './ErrorPage.module.scss';
import { NavLink } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <section className={styles.page_404}>
            <div className={styles.container}>
                <div className={styles.row}>
                    <div className={styles.four_zero_four_bg}>
                        <h1 className={styles.text_center}>404</h1>
                    </div>
                    <div className={styles.contant_box_404}>
                        <h2>Look like you're lost...</h2>
                        <NavLink className={styles.link_404} to={'/'}>
                            Go to Home
                        </NavLink>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ErrorPage;
