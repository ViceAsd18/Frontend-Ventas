import { Typography } from "antd";
const { Title } = Typography;

interface Props {
    children : React.ReactNode;
    nivel? : 1 | 2 | 3 | 4 | 5;
    style? : React.CSSProperties;
}

const Titulo = ({children, nivel = 3, style}: Props) => {
    return (
        <Title level={nivel} style={style}>
            {children}
        </Title>
    )
}

export default Titulo;