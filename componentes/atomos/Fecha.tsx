import { format } from "date-fns";
import { es } from "date-fns/locale";

type Props = {
  fecha: string | Date;
  variante?: "corto" | "largo";
};

export default function Fecha({ fecha, variante = "corto" }: Props) {
    if (!fecha) return <span>-</span>;

    let date: Date;

    if (typeof fecha === "string") {
      // Formato SQL: "YYYY-MM-DD HH:mm:ss"
      const sql = fecha.replace(" ", "T"); // → "2025-11-28T09:15:00"
      date = new Date(sql);
    } else {
      date = fecha;
    }

    if (isNaN(date.getTime())) {
      return <span>Fecha inválida</span>;
    }

    const formato = variante === "largo"
      ? "dd 'de' MMMM yyyy"
      : "dd/MM/yyyy";

    return <span>{format(date, formato, { locale: es })}</span>;
}
