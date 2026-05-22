# Math Quest Live

Deployment-ready React/Vite multiplayer classroom game.

## Supabase SQL

Run this in Supabase SQL Editor:

```sql
create table if not exists public.math_rooms (
  room_code text primary key,
  state jsonb not null,
  updated_at timestamptz default now()
);

alter table public.math_rooms enable row level security;

create policy "Anyone can read math rooms"
on public.math_rooms for select
using (true);

create policy "Anyone can create math rooms"
on public.math_rooms for insert
with check (true);

create policy "Anyone can update math rooms"
on public.math_rooms for update
using (true)
with check (true);
```

Enable Realtime for `math_rooms`.

## Vercel Environment Variables

Add:

VITE_SUPABASE_URL  
VITE_SUPABASE_ANON_KEY
