import VendedorLayout from "componentes/layout/VendedorLayout";
import AgregarProductoForm from "componentes/organismo/Vendedor/AgregarProductoForm";
import Titulo from "componentes/atomos/Titulo";

const AgregarProductoPage = () => {
  return (
    <VendedorLayout>
      <Titulo>Agregar Nuevo Producto</Titulo>
      <AgregarProductoForm />
    </VendedorLayout>
  );
};

export default AgregarProductoPage;
