import { Image } from "antd";

interface Props {
    src : string;
    alt? : string;
    size? : number;
}

const ImagenProducto = ({ src, alt = "Imagen del producto", size = 64 } : Props) => {
    return (
        <Image
            width={size}
            height={size}
            src={src}
            alt={alt}
            style={{borderRadius: 8, objectFit: "cover"}}
            preview={false}
            fallback="https://via.placeholder.com/150?text=Sin+Imagen"
        />
    )
}

export default ImagenProducto;