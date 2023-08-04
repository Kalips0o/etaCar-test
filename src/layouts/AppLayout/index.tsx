import {Layout, Space} from 'antd';
import NavBar from "../../components/header/NavBar";

const {Header, Content} = Layout;

const headerStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#000101',
    height: 80,
    paddingInline: 50,
    lineHeight: '64px',
    backgroundColor: '#7dbcea',
};

const contentStyle: React.CSSProperties = {
    textAlign: 'center',
    height: '100vh',
    lineHeight: '120px',
    color: '#fff',
    backgroundColor: 'rgba(159,161,161,0.49)',
};


export const AppLayout: React.FC = () => (
    <Space direction="vertical" style={{width: '100%'}} size={[0, 48]}>
        <Layout>
            <Header style={headerStyle}>
                <NavBar />
            </Header>
            <Content style={contentStyle}>Content</Content>
        </Layout>
    </Space>
);


