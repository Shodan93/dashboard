-- ============================================================
-- COCKPIT — Supabase-Schema (Projekt "Orbit", eqrzazmdamiplqiizrat)
-- Cockpit nutzt DASSELBE Supabase-Projekt wie ORBIT (gemeinsame
-- Nutzer/Logins), aber EIGENE Tabellen mit Präfix "cockpit_".
-- Das ORBIT-Schema (boards, board_members, board_codes, RPCs)
-- bleibt unangetastet — ORBIT läuft als Standalone-Projekt weiter.
--
-- Bereits angewendet als Migration "cockpit_prefs" (2026-07-12).
-- ============================================================

-- Ein Datensatz pro Nutzer: Dashboard-Einstellungen
-- (z. B. welche Orbit-Boards im Cockpit angezeigt werden, aktives Board).
create table if not exists public.cockpit_prefs (
  user_id uuid primary key default auth.uid() references auth.users(id) on delete cascade,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.cockpit_prefs enable row level security;

-- RLS: jeder Nutzer sieht/ändert ausschließlich den eigenen Datensatz.
drop policy if exists cockpit_prefs_select on public.cockpit_prefs;
create policy cockpit_prefs_select on public.cockpit_prefs for select using (user_id = auth.uid());
drop policy if exists cockpit_prefs_insert on public.cockpit_prefs;
create policy cockpit_prefs_insert on public.cockpit_prefs for insert with check (user_id = auth.uid());
drop policy if exists cockpit_prefs_update on public.cockpit_prefs;
create policy cockpit_prefs_update on public.cockpit_prefs for update using (user_id = auth.uid()) with check (user_id = auth.uid());
drop policy if exists cockpit_prefs_delete on public.cockpit_prefs;
create policy cockpit_prefs_delete on public.cockpit_prefs for delete using (user_id = auth.uid());

-- Hinweis: Das Orbit-Widget im Cockpit liest public.boards direkt.
-- Dafür sind KEINE neuen Policies nötig — die bestehenden ORBIT-RLS-Regeln
-- (Besitzer oder Mitglied) gelten automatisch auch für das Cockpit,
-- weil derselbe Supabase-Auth-Nutzer angemeldet ist.
