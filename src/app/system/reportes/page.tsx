import Link from "next/link";
import CardHeaderReport from "./card-header-report";

function Page() {
  const tableItems = [
    {
      name: "Reporte 1",
      date: "Oct 9, 2023",
      status: "Sin cambios",
      price: "100",
      plan: "Monthly subscription",
    },
    {
      name: "Reporte 2",
      date: "Oct 12, 2023",
      status: "Modificado",
      price: "100",
      plan: "Monthly subscription",
    },
    {
      name: "Reporte 3",
      date: "Oct 22, 2023",
      status: "Sin cambios",
      price: "100",
      plan: "Annually subscription",
    },
    {
      name: "Reporte 4",
      date: "Jan 5, 2023",
      status: "Modificado",
      price: "100",
      plan: "Monthly subscription",
    },
    {
      name: "Reporte 5",
      date: "Jan 6, 2023",
      status: "Sin cambios",
      price: "100",
      plan: "Annually subscription",
    },
  ];

  return (
    <div className="w-full bg-white p-8 rounded-lg">
      <CardHeaderReport></CardHeaderReport>
      <div className="mt-8 relative h-max overflow-auto">
        <table className="w-full table-auto text-sm text-left">
          <thead className="text-gray-600 font-medium border-b">
            <tr>
              <th className="py-3 pr-6">Nombre</th>
              <th className="py-3 pr-6">Fecha</th>
              <th className="py-3 pr-6">Estado</th>

              <th className="py-3 pr-6">Registros</th>
              <th className="py-3 pr-6"></th>
            </tr>
          </thead>
          <tbody className="text-gray-600 divide-y">
            {tableItems.map((item, idx) => (
              <tr key={idx}>
                <td className="pr-6 py-4 whitespace-nowrap">{item.name}</td>
                <td className="pr-6 py-4 whitespace-nowrap">{item.date}</td>
                <td className="pr-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-3 py-2 rounded-full font-semibold text-xs ${
                      item.status !== "Modificado"
                        ? "text-green-600 bg-green-50"
                        : "text-blue-600 bg-blue-50"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>

                <td className="pr-6 py-4 whitespace-nowrap">{item.price}</td>
                <td className="text-right whitespace-nowrap">
                  <Link
                    href={"/system/reportes/" + idx}
                    className="py-1.5 px-3 text-gray-600 hover:text-gray-500 duration-150 hover:bg-gray-50 border rounded-lg"
                  >
                    Detalle
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Page;
