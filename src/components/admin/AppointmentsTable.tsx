import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

type Appointment = {
  id: string;
  dog_name: string;
  service_type: string;
  service_date: string;
  notes: string | null;
  next_recommended_date: string | null;
  status: string;
};

export default function AppointmentsTable() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    async function loadAppointments() {
      const { data, error } = await supabase
        .from("appointments")
        .select("*")
        .order("service_date", { ascending: false });

      console.log("APPOINTMENTS:", data);
      console.log("ERROR:", error);

      setAppointments(data ?? []);
    }

    loadAppointments();
  }, []);

  return (
    <div className="overflow-hidden rounded-2xl border">
      <div className="border-b p-4 text-xl font-semibold">
        Historie trimování
      </div>

      <table className="w-full">
        <thead>
          <tr className="border-b text-left">
            <th className="p-4">Pes</th>
            <th className="p-4">Služba</th>
            <th className="p-4">Datum</th>
            <th className="p-4">Poznámka</th>
            <th className="p-4">Další termín</th>
            <th className="p-4">Stav</th>
          </tr>
        </thead>

        <tbody>
          {appointments.map((item) => (
            <tr key={item.id} className="border-b">
              <td className="p-4">{item.dog_name}</td>
              <td className="p-4">{item.service_type}</td>
              <td className="p-4">{item.service_date}</td>
              <td className="p-4">{item.notes}</td>
              <td className="p-4">
                {item.next_recommended_date ?? "-"}
              </td>
              <td className="p-4">{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}