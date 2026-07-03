# Deployment spike: Next.js, Vercel and Supabase

## Purpose

This spike proves the deployment path before product development begins:

1. Next.js builds with the project runtime.
2. Vercel deploys changes from GitHub.
3. Environment variables reach the server safely.
4. The application reads a table protected by Supabase Row Level Security.
5. Pull requests can receive isolated preview deployments.

It intentionally excludes authentication, payments and gym business rules.

## Cost boundary

Use the Vercel Hobby plan and one Supabase Free project for this validation.
Do not enable paid add-ons, custom domains, extra compute or point-in-time
recovery. Free services provide no production SLA; reassess the plans before
onboarding real gym users.

## 1. Local runtime

The project uses Node 24. With NVM installed:

```bash
nvm install
nvm use
npm install
```

Copy `.env.example` to `.env.local` only after creating Supabase. Environment
files are ignored by Git and must never be committed.

## 2. Create the Supabase project

1. Sign in to Supabase with the project owner's account.
2. Create a Free project named `gym-checking-dev`.
3. Choose an EU region close to the gym and save the database password in a
   password manager.
4. Wait for the database to become available.
5. Open the SQL Editor.
6. Paste and run
   `supabase/migrations/202607030001_create_deployment_checks.sql`.
7. Verify that `public.deployment_checks` contains one row.

The migration grants only `SELECT` to public API roles and enables RLS. The
publishable key is therefore sufficient; this spike does not use a secret or
service-role key.

## 3. Configure local integration

From the Supabase project **Connect** dialog, copy the Project URL and
Publishable key into `.env.local`:

```dotenv
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_replace_me
```

Then run:

```bash
npm run dev
```

Open `http://localhost:3000`. A successful database read displays
“Conexión verificada con Supabase”. The machine-readable probe is available at
`http://localhost:3000/api/health`.

## 4. Import the repository into Vercel

1. Sign in to Vercel with the `mgvinuesa` GitHub account.
2. Select **Add New → Project**.
3. Import `mgvinuesa/gym-checking`.
4. Keep the framework preset detected as Next.js and the root directory as `.`.
5. Set Node.js to `24.x` if Vercel does not infer it from `package.json`.
6. Add both Supabase variables to Production, Preview and Development.
7. Deploy.

No Vercel CLI, Supabase integration or paid marketplace integration is required
for the spike. Connecting GitHub through Vercel is enough to create deployments
for commits and preview deployments for pull requests.

## 5. Verify the deployment

Check the generated `vercel.app` URL:

- The page reports Next.js and Supabase as operational.
- `/api/health` returns HTTP 200 with `status: "ok"`.
- No secret values appear in logs, HTML or the health response.
- The Vercel deployment log reports Node 24 and a successful Next.js build.

Open a small follow-up pull request and verify that Vercel adds a preview URL
without replacing the production deployment.

## 6. Failure guide

| Symptom | Likely cause | Check |
| --- | --- | --- |
| “Sin configurar” | Variables are absent from the active environment | Vercel project settings or `.env.local` |
| “Error de conexión o esquema” | Migration missing, URL/key incorrect, or RLS/privileges differ | Supabase SQL Editor and deployment logs |
| Vercel build rejects Node | Runtime does not satisfy `package.json` | Project Node.js setting must be 24.x |
| Local shell uses Node 18 | NVM version was not activated | Run `nvm use` and `node --version` |

## Exit criteria

The spike is complete when local and production URLs both report a successful
Supabase read and a pull request receives an independent Vercel preview. After
that, replace the probe table through normal migrations as the real domain model
is introduced.
