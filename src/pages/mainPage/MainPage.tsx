import CryptoTable from '../../stories/table/CryptoTable';
import styles from './MainPage.module.scss';

function MainPage() {

    return (
        <div className={styles.main}>
            <CryptoTable />
        </div>
    );
}

export default MainPage;
