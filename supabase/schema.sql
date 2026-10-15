-- MANIFEST 2027 AI — schema inicial
-- Executar no SQL Editor do Supabase (https://enpomeljudnrrwvmrlqu.supabase.co)

-- Perfis (onboarding)
create table if not exists profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  name text,
  goal_2027 text,
  interests text[] default '{}',
  habits text[] default '{}',
  notifications boolean default true,
  onboarding_done boolean default false,
  created_at timestamptz default now()
);
alter table profiles enable row level security;
create policy "own profile" on profiles for all using (auth.uid() = user_id);

-- Diário de gratidão
create table if not exists journal_entries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  entry_date date not null default current_date,
  content text not null,
  created_at timestamptz default now()
);
alter table journal_entries enable row level security;
create policy "own entries" on journal_entries for all using (auth.uid() = user_id);

-- Vision board
create table if not exists vision_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  title text not null,
  description text,
  image_url text,
  category text default 'Personal Growth',
  done boolean default false,
  created_at timestamptz default now()
);
alter table vision_items enable row level security;
create policy "own items" on vision_items for all using (auth.uid() = user_id);

-- Progresso jornada 21 dias
create table if not exists journey_progress (
  user_id uuid references auth.users(id) on delete cascade not null,
  day int not null check (day between 1 and 21),
  completed boolean default true,
  notes text,
  completed_at timestamptz default now(),
  primary key (user_id, day)
);
alter table journey_progress enable row level security;
create policy "own progress" on journey_progress for all using (auth.uid() = user_id);

-- Chat AI Coach
create table if not exists coach_messages (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role text not null check (role in ('user','assistant')),
  content text not null,
  created_at timestamptz default now()
);
alter table coach_messages enable row level security;
create policy "own messages" on coach_messages for all using (auth.uid() = user_id);

-- Livros (biblioteca)
create table if not exists books (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  author text,
  file_path text not null,
  premium_only boolean default true,
  created_at timestamptz default now()
);
alter table books enable row level security;
create policy "read books" on books for select using (true);

-- Eventos de pagamento (Digistore24)
create table if not exists payment_events (
  id uuid primary key default gen_random_uuid(),
  provider text default 'digistore24',
  event_type text not null,
  external_id text,
  payload jsonb,
  processed boolean default false,
  created_at timestamptz default now()
);
alter table payment_events enable row level security;
-- sem policy pública: só service_role
