import { createClient } from "@supabase/supabase-js";

type StatusLevel = "ok" | "warning" | "error";

type DeploymentStatus = {
  level: StatusLevel;
  summary: string;
  environment: string;
  supabase: string;
  message?: string;
};

const getEnvironment = () =>
  process.env.VERCEL_ENV ?? process.env.NODE_ENV ?? "desconocido";

export async function getDeploymentStatus(): Promise<DeploymentStatus> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !publishableKey) {
    return {
      level: "warning",
      summary: "Next.js funciona; faltan las variables de Supabase.",
      environment: getEnvironment(),
      supabase: "Sin configurar",
    };
  }

  const supabase = createClient(url, publishableKey, {
    auth: { persistSession: false },
  });
  const { data, error } = await supabase
    .from("deployment_checks")
    .select("message")
    .eq("id", 1)
    .single();

  if (error) {
    return {
      level: "error",
      summary: "La aplicación arrancó, pero Supabase no respondió como se esperaba.",
      environment: getEnvironment(),
      supabase: "Error de conexión o esquema",
    };
  }

  return {
    level: "ok",
    summary: "Next.js, Vercel y Supabase están comunicándose correctamente.",
    environment: getEnvironment(),
    supabase: "Operativo",
    message: data.message,
  };
}
