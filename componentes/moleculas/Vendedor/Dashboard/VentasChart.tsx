import { Card } from "antd";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import type { Orden } from "services/orden";

interface Props {
  ordenes: Orden[];
}

const VentasGrafico = ({ ordenes }: Props) => {
    //Mapear las fechas a los días de la semana
    const diasSemana = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

    const datos = ordenes.reduce<Record<string, number>>((acc, orden) => {
    if (orden.estado === "completada") {
        const fecha = new Date(orden.fecha_venta);
        const dia = diasSemana[fecha.getDay()]; // 'Lun', 'Mar', etc.
        acc[dia] = (acc[dia] || 0) + orden.total;
    }
    return acc;
    }, {});


    //Convertir a array para el chart
    const chartData = diasSemana.map((dia) => ({
        fecha: dia,
        total: datos[dia] || 0,
    }));

    return (
        <Card title="Ventas de la Semana" style={{ borderRadius: 8, boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
            <ResponsiveContainer width="100%" height={250}>
                <LineChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <XAxis 
                    dataKey="fecha" 
                    stroke="#1890ff" 
                    tick={{ fill: "#1754cf", fontSize: 12 }} 
                />
                <YAxis 
                    stroke="#1890ff" 
                    tick={{ fill: "#1754cf", fontSize: 12 }} 
                    tickFormatter={(value) => `$${value}`} 
                />
                <Tooltip 
                    formatter={(value: number) => `$${value.toFixed(2)}`} 
                    contentStyle={{ backgroundColor: "#fff", borderRadius: 8, border: "none", boxShadow: "0 2px 6px rgba(0,0,0,0.15)" }} 
                />
                <Line 
                    type="monotone" 
                    dataKey="total" 
                    stroke="#1754cf" 
                    strokeWidth={3} 
                    dot={{ r: 4, fill: "#1754cf" }} 
                    activeDot={{ r: 6 }} 
                />
                </LineChart>
            </ResponsiveContainer>
        </Card>
    );
};

export default VentasGrafico;
