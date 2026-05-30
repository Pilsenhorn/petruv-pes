import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

type Member = {
  id: string;
  full_name: string | null;
  dog_name: string | null;
  phone: string | null;
  membership_level: string;
  discount_percent: number;
};

export default function AdminMembersTable() {
  const [members, setMembers] = useState<Member[]>([]);

  useEffect(() => {
    async function loadMembers() {
      const { data } = await supabase
        .from("profiles")
        .select("*");

      setMembers(data ?? []);
    }

    loadMembers();
  }, []);

  return (
    <div className="overflow-hidden rounded-2xl border">
      <table className="w-full">
        <thead className="p-4">Detail
          <tr className="border-b text-left">
            <th className="p-4">Majitel</th>
            <th className="p-4">Pes</th>
            <th className="p-4">Telefon</th>
            <th className="p-4">Členství</th>
            <th className="p-4">Sleva</th>
          </tr>
        </thead>

        <tbody>
          {members.map((member) => (
            <tr key={member.id} className="border-b">
              <td className="p-4">
                <a
                  href={`/admin/client/${member.id}`}
                  className="underline"
                >
                  Otevřít
                </a>
              </td>
              <td className="p-4">{member.full_name}</td>
              <td className="p-4">{member.dog_name}</td>
              <td className="p-4">{member.phone}</td>
              <td className="p-4">
                {member.membership_level}
              </td>
              <td className="p-4">
                {member.discount_percent}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}