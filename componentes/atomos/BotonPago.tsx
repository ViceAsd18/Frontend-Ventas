import { Button } from "antd";

interface Props {
    onClick: () => void;
}

const BotonPago = ({ onClick }: Props) => (
    <Button type="primary" onClick={onClick}>
    Registrar Pago
    </Button>
);

export default BotonPago;
