import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

type Props = {
  clientId: string;
};

export default function ClientCard({ clientId }: Props) {
  const [profile, setProfile] = useState<any>(null);
  const [appointments, setAppointments] = useState<any[]>(
    []
  );

  useEffect(() => {
    async function loadData() {
      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", clientId)
        .single();

      const { data: appointmentsData } = await supabase
        .from("appointments")
        .select("*")
        .eq("profile_id", clientId)
        .order("service_date", {
          ascending: false,
        });

      setProfile(profileData);
      setAppointments(appointmentsData ?? []);
    }

    loadData();
  }, [clientId]);

  if (!profile) return <p>Načítám...</p>;

  return (
    <div className="space-y-8">
      <div className="rounded-2xl border p-6">
        <h1 className="mb-4 text-3xl font-semibold">
          Karta klienta
        </h1>

        <p>Majitel: {profile.full_name}</p>
        <p>Pes: {profile.dog_name}</p>
        <p>Telefon: {profile.phone}</p>
        <p>Sleva: {profile.discount_percent}%</p>
      </div>

      <div className="rounded-2xl border p-6">
        <h2 className="mb-4 text-2xl font-semibold">
          Historie trimování
        </h2>

        {appointments.map((item) => (
          <div
            key={item.id}
            className="mb-4 rounded-lg border p-4"
          >
            <p>{item.service_date}</p>
            <p>{item.notes}</p>
            <p>{item.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}