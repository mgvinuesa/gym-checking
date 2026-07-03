create table public.deployment_checks (
  id bigint primary key,
  message text not null,
  created_at timestamptz not null default now()
);

alter table public.deployment_checks enable row level security;

revoke all on table public.deployment_checks from anon, authenticated;
grant select on table public.deployment_checks to anon, authenticated;

create policy "deployment checks are publicly readable"
on public.deployment_checks
for select
to anon, authenticated
using (true);

insert into public.deployment_checks (id, message)
values (1, 'Conexión verificada con Supabase');
