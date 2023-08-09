import NavBar from './nawBar/NavBar';
import styles from './Header.module.scss'


function Header() {
   return (
       <div className={styles.header}>
       <NavBar/>
   </div>
   )
}

export default Header;
