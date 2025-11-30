import { Row, Col } from "antd";
import VendedorLayout from "componentes/layout/VendedorLayout";
import DashboardPanel from "componentes/organismo/Vendedor/DashboardPanel";

const DashboardPage = () => {
    return (
        <VendedorLayout>
            <Row gutter={16}>
                <Col span={24}>
                    <DashboardPanel></DashboardPanel>
                </Col>
            </Row>
        </VendedorLayout>
    );
};

export default DashboardPage;
