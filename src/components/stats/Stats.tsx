import React, {useContext} from "react";

import styles from "./Stats.module.scss";
import { StatsContext, StatsContextState } from '../../context/stats.context';


function Stats() {
    const {errorMessage, shouldShowStats, setShouldShowStats} = useContext<StatsContextState>(StatsContext);

    const statsClassName = `{${styles.toast} ${shouldShowStats ? styles.show : styles.do_not_show}`;

    return (
        <div className={statsClassName}>
            <div className={styles.stats_header}>
                <strong>Error Message</strong>
                <div className={styles.close} onClick={() => setShouldShowStats(false)}>×</div>
            </div>
            <div className={styles.stats_body}>{errorMessage}</div>
        </div>
    );
}

export default Stats;
