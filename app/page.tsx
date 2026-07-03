import { getDeploymentStatus } from "@/lib/deployment-status";

export const dynamic = "force-dynamic";

export default async function Home() {
  const status = await getDeploymentStatus();

  return (
    <main className="shell">
      <section className="hero" aria-labelledby="page-title">
        <span className="eyebrow">Gym Checking</span>
        <h1 id="page-title">La pista está preparada.</h1>
        <p>
          Este despliegue mínimo comprueba que la aplicación puede construirse en
          Vercel y comunicarse con Supabase sin incluir todavía lógica del gimnasio.
        </p>
      </section>

      <section className="status-card" aria-labelledby="status-title">
        <div>
          <span className={`indicator indicator--${status.level}`} aria-hidden="true" />
          <h2 id="status-title">Estado de la integración</h2>
        </div>
        <p className="status-summary">{status.summary}</p>

        <dl>
          <div>
            <dt>Next.js</dt>
            <dd>Operativo</dd>
          </div>
          <div>
            <dt>Entorno</dt>
            <dd>{status.environment}</dd>
          </div>
          <div>
            <dt>Supabase</dt>
            <dd>{status.supabase}</dd>
          </div>
        </dl>

        {status.message ? <p className="database-message">“{status.message}”</p> : null}
      </section>

      <footer>
        <a href="/api/health">Consultar respuesta técnica</a>
      </footer>
    </main>
  );
}
