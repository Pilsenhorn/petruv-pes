import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

type Profile = {
  id: string;
  full_name: string | null;
  dog_name: string | null;
};

export default function AddAppointmentForm() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [profileId, setProfileId] = useState("");
  const [dogName, setDogName] = useState("");
  const [serviceDate, setServiceDate] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    async function loadProfiles() {
      const { data } = await supabase
        .from("profiles")
        .select("id, full_name, dog_name");

      setProfiles(data ?? []);
    }

    loadProfiles();
  }, []);

  async function handleSubmit() {
    const { error } = await supabase
      .from("appointments")
      .insert({
        profile_id: profileId,
        dog_name: dogName,
        service_type: "trimování",
        service_date: serviceDate,
        notes,
        status: "planned",
      });

    if (error) {
      alert(error.message);
      return;
    }

    alert("Termín uložen.");
    window.location.reload();
  }

  return (
    <div className=" mt-10 mb-10 rounded-2xl border p-6">
      <h2 className="mb-4 text-2xl font-semibold">
        Přidat termín trimování
      </h2>

      <div className="space-y-4">
        <select
          title="Vyber klienta"
          className="w-full rounded-lg border p-3"
          value={profileId}
          onChange={(e) => setProfileId(e.target.value)}
        >
          <option value="">Vyber klienta</option>

          {profiles.map((profile) => (
            <option key={profile.id} value={profile.id}>
              {profile.full_name} — {profile.dog_name}
            </option>
          ))}
        </select>

        <input
          className="w-full rounded-lg border p-3"
          placeholder="Jméno psa"
          value={dogName}
          onChange={(e) => setDogName(e.target.value)}
        />

        <input
          className="w-full rounded-lg border p-3"
          type="date"
          aria-label="vyber klienta"
          value={serviceDate}
          onChange={(e) => setServiceDate(e.target.value)}
        />

        <textarea
          className="w-full rounded-lg border p-3"
          placeholder="Poznámka"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          className="rounded-lg bg-black px-4 py-3 text-white"
        >
          Uložit termín
        </button>
      </div>
    </div>
  );
}