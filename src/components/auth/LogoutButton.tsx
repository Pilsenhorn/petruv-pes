import { supabase } from "../../lib/supabase";  

export default function LogoutButton() {
    async function handleLogout() {
        await supabase.auth.signOut();
        window.location.href = "/clenska-zona"; 
    }

    return (
        <button onClick={handleLogout} className="px-4 py-2 rounded-lg border">
            Odhlásit se
        </button>
    );
}