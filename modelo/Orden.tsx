export interface Orden {
    id: number;
    cliente: string;
    fecha: string;
    montoTotal: number;
    estado: "Pendiente" | "Pagado" | "Cancelado";
}

const ordenesMock: Orden[] = [
    { id: 85572, cliente: "Carlos Santana", fecha: "15 Oct, 2023", montoTotal: 1250, estado: "Pagado" },
    { id: 85571, cliente: "Elena Rodríguez", fecha: "14 Oct, 2023", montoTotal: 850.5, estado: "Cancelado"},
    { id: 85570, cliente: "Javier Gómez", fecha: "14 Oct, 2023", montoTotal: 2300, estado: "Pendiente" },
    { id: 85569, cliente: "Sofía López", fecha: "12 Oct, 2023", montoTotal: 450.75, estado: "Pagado" },
    { id: 85568, cliente: "Miguel Hernández", fecha: "11 Oct, 2023", montoTotal: 1980.2, estado: "Pagado" },
];

export default ordenesMock;