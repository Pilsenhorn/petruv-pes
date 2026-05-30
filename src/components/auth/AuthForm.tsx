import { useState } from "react";
import { supabase } from "../../lib/supabase";

export default function AuthForm() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit() {
    if (mode === "register") {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        alert(error.message);
        return;
      }

      const user = data.user;

      if (!user) {
        alert("Uživatel nebyl vytvořen.");
        return;
      }

      const { error: profileError } = await supabase
        .from("profiles")
        .insert({
          id: user.id,
          full_name: "",
          dog_name: "",
          membership_level: "basic",
          discount_percent: 10,
        });

      if (profileError) {
        alert(profileError.message);
        return;
      }

      window.location.href = "/dashboard";
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    window.location.href = "/dashboard";
  }

  return (
    <div className="max-w-md space-y-4 rounded-2xl border p-6">
      <h2 className="text-2xl font-semibold">
        {mode === "login" ? "Přihlášení" : "Registrace"}
      </h2>

      <input
        className="w-full rounded-lg border p-3"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="w-full rounded-lg border p-3"
        type="password"
        placeholder="Heslo"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={handleSubmit}
        className="w-full rounded-lg bg-black p-3 text-white"
      >
        {mode === "login" ? "Přihlásit" : "Registrovat"}
      </button>

      <button
        onClick={() =>
          setMode(mode === "login" ? "register" : "login")
        }
        className="text-sm underline"
      >
        {mode === "login"
          ? "Nemáte účet? Registrace"
          : "Máte účet? Přihlášení"}
      </button>
    </div>
  );
}