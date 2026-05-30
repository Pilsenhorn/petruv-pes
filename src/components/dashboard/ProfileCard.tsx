import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

type Profile = {
  id: string;
  full_name: string | null;
  dog_name: string | null;
  phone: string | null;
  membership_level: string;
  discount_percent: number;
};

export default function ProfileCard() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function loadProfile() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }

      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();

      setProfile(data);
      setLoading(false);
    }

    loadProfile();
  }, []);

  async function handleSave() {
    if (!profile) return;

    setSaving(true);

    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: profile.full_name,
        dog_name: profile.dog_name,
        phone: profile.phone,
      })
      .eq("id", profile.id);

    setSaving(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Profil uložen.");
  }

  if (loading) return <p>Načítám profil...</p>;
  if (!profile) return <p>Profil nebyl nalezen.</p>;

  return (
    <div className="rounded-2xl border p-6">
      <h2 className="mb-6 text-2xl font-semibold">
        Členský profil
      </h2>

      <div className="space-y-4">
        <input
          className="w-full rounded-lg border p-3"
          placeholder="Vaše jméno"
          value={profile.full_name ?? ""}
          onChange={(e) =>
            setProfile({
              ...profile,
              full_name: e.target.value,
            })
          }
        />

        <input
          className="w-full rounded-lg border p-3"
          placeholder="Jméno psa"
          value={profile.dog_name ?? ""}
          onChange={(e) =>
            setProfile({
              ...profile,
              dog_name: e.target.value,
            })
          }
        />

        <input
          className="w-full rounded-lg border p-3"
          placeholder="Telefon"
          value={profile.phone ?? ""}
          onChange={(e) =>
            setProfile({
              ...profile,
              phone: e.target.value,
            })
          }
        />

        <div className="pt-2 text-sm text-gray-600">
          <p>Úroveň: {profile.membership_level}</p>
          <p>Sleva: {profile.discount_percent}%</p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="rounded-lg bg-black px-4 py-3 text-white"
        >
          {saving ? "Ukládám..." : "Uložit profil"}
        </button>
        
      </div>
    </div>
  );
}