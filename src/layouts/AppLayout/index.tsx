import NavBar from "../../components/header/NavBar";
import CryptoTable from "../../components/currencyTable/CurrencyTable";



const headerStyle: React.CSSProperties = {
    display:'flex',
    textAlign: 'center',
    justifyContent:'center',
    color: '#000101',
    height: 70,
    paddingTop:'20px',
    paddingInline: 30,
    lineHeight: '64px',
    backgroundColor: 'rgba(159,161,161,0.49)',
};

const contentStyle: React.CSSProperties = {

    textAlign: 'center',
    height: '100vh',
    lineHeight: '50px',
    color: '#000101',
    backgroundColor: 'rgb(253,255,255)',
};


export const AppLayout: React.FC = () => (

       <div>
            <div style={headerStyle}>
                <NavBar />
            </div>
            <div style={contentStyle}>
                <CryptoTable/>
            </div>
</div>

);


