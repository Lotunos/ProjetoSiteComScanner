import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";
export async function criarConexao(){
    const supaBaseUrl = "https://cjfcbxoxgndyyvuqahkx.supabase.co";
    const supaBaseKey = "sb_publishable_M4LoTOR8Fi4h9zV7_ACDNw_qXDYOOi7";
    const supaBase = createClient(supaBaseUrl,supaBaseKey);
    return supaBase;
}