import { getDeploymentStatus } from "@/lib/deployment-status";

export const dynamic = "force-dynamic";

export async function GET() {
  const status = await getDeploymentStatus();

  return Response.json(
    {
      application: "gym-checking",
      status: status.level === "ok" ? "ok" : "degraded",
      checks: {
        nextjs: "ok",
        supabase: status.supabase,
      },
      timestamp: new Date().toISOString(),
    },
    {
      status: status.level === "error" ? 503 : 200,
      headers: { "Cache-Control": "no-store" },
    },
  );
}
