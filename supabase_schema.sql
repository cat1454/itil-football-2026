-- ==============================================================================
-- ITIL 2026: SUPABASE & POSTGRESQL DATABASE SCHEMA
-- Giải bóng đá nội bộ Liên Chi Đoàn CNTT (4 Đội Xoay Vòng)
-- ==============================================================================

-- 1. Create table for Teams
CREATE TABLE IF NOT EXISTS teams (
  id INT PRIMARY KEY,
  code VARCHAR(10) NOT NULL,
  name VARCHAR(100) NOT NULL,
  captain VARCHAR(100) NOT NULL,
  kit_color VARCHAR(20) NOT NULL,
  kit_name VARCHAR(50) NOT NULL,
  note TEXT,
  players JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Create table for Matches
CREATE TABLE IF NOT EXISTS matches (
  id VARCHAR(20) PRIMARY KEY,
  match_no INT NOT NULL,
  round INT NOT NULL,
  match_date VARCHAR(20) NOT NULL,
  match_time VARCHAR(50) NOT NULL,
  pitch VARCHAR(50) NOT NULL,
  home_team_id INT REFERENCES teams(id) ON DELETE CASCADE,
  away_team_id INT REFERENCES teams(id) ON DELETE CASCADE,
  home_goals INT NOT NULL DEFAULT 0,
  away_goals INT NOT NULL DEFAULT 0,
  played BOOLEAN NOT NULL DEFAULT false,
  status VARCHAR(20) DEFAULT 'upcoming', -- 'upcoming', 'live', 'finished'
  scorers JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Create table for Tournament Settings & Finals
CREATE TABLE IF NOT EXISTS tournament_settings (
  id VARCHAR(20) PRIMARY KEY DEFAULT 'itil_2026',
  tournament_mode VARCHAR(20) NOT NULL DEFAULT 'final', -- 'final' or 'direct'
  final_match JSONB NOT NULL DEFAULT '{"home": 0, "away": 0, "homePen": 0, "awayPen": 0, "played": false}'::jsonb,
  third_match JSONB NOT NULL DEFAULT '{"home": 0, "away": 0, "homePen": 0, "awayPen": 0, "played": false}'::jsonb,
  awards JSONB NOT NULL DEFAULT '{"topScorer": "Trần Lê Minh (Đội 1)", "mvp": "Tuấn Ngọc (Đội 2)", "bestGk": "Nghĩa Lê (Đội 4)", "fairPlayTeam": "Đội 3"}'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE tournament_settings ENABLE ROW LEVEL SECURITY;

-- 5. Policies: Public can read, authenticated or service role can write
CREATE POLICY "Public Read Access for Teams" ON teams FOR SELECT USING (true);
CREATE POLICY "Public Read Access for Matches" ON matches FOR SELECT USING (true);
CREATE POLICY "Public Read Access for Settings" ON tournament_settings FOR SELECT USING (true);

CREATE POLICY "Admin Write Access for Teams" ON teams FOR ALL USING (true);
CREATE POLICY "Admin Write Access for Matches" ON matches FOR ALL USING (true);
CREATE POLICY "Admin Write Access for Settings" ON tournament_settings FOR ALL USING (true);

-- 6. Insert Default Teams
INSERT INTO teams (id, code, name, captain, kit_color, kit_name, note, players)
VALUES 
  (0, 'Đ1', 'Đội 1', 'Trần Lê Minh', '#D9381E', 'Đỏ Vermilion', 'Đội hình tấn công sắc bén với nòng cốt Trần Lê Minh & Ngô V.Đắc Trí.', '["Trần Lê Minh", "Ngô V.Đắc Trí", "Trần Minh Triết", "Thanh Việt", "Bảo em Minh", "Hoàng Phương Lê"]'::jsonb),
  (1, 'Đ2', 'Đội 2', 'Tuấn Ngọc', '#16422B', 'Xanh Forest', 'Lối chơi kỷ luật, thể lực dồi dào với Tuấn Ngọc, Võ Như Khoa & Bá Sơn.', '["Tuấn Ngọc", "Võ Như Khoa", "Bá Sơn", "Thiên Phú", "Lương Duy Toàn", "Lê Doãn Hồng Phúc"]'::jsonb),
  (2, 'Đ3', 'Đội 3', 'Trần Phát', '#D97706', 'Vàng Amber', 'Đội hình tốc độ, kỹ thuật đồng đều dẫn dắt bởi Trần Phát & Hoàng Long.', '["Trần Phát", "Cáp Hữu Nhân", "Hoàng Long", "Bảo Duy", "Trần Hữu Đạt", "Huỳnh Phước Phú"]'::jsonb),
  (3, 'Đ4', 'Đội 4', 'Nghĩa Lê', '#1E40AF', 'Xanh Navy', 'Khung gỗ và tuyến thủ vững chắc, phản công nhanh cùng Nghĩa Lê & Nhân Phan.', '["Nghĩa Lê", "Nhân Phan", "Anh rể Trí", "Minh Thông", "Thanh Trường", "Nguyễn Đỗ Thắng"]'::jsonb)
ON CONFLICT (id) DO NOTHING;

-- 7. Insert Default Matches
INSERT INTO matches (id, match_no, round, match_date, match_time, pitch, home_team_id, away_team_id, home_goals, away_goals, played)
VALUES
  ('m1', 1, 1, '07/11', '19:30 - 20:15', 'Sân 5 Mini', 3, 0, 0, 0, false),
  ('m2', 2, 1, '07/11', '20:15 - 21:00', 'Sân 5 Mini', 1, 2, 0, 0, false),
  ('m3', 3, 2, '08/11', '19:30 - 20:15', 'Sân 5 Mini', 3, 1, 0, 0, false),
  ('m4', 4, 2, '08/11', '20:15 - 21:00', 'Sân 5 Mini', 0, 2, 0, 0, false),
  ('m5', 5, 3, '14/11', '18:30 - 19:30', 'Sân 5A', 3, 2, 0, 0, false),
  ('m6', 6, 3, '14/11', '18:30 - 19:30', 'Sân 5B', 0, 1, 0, 0, false)
ON CONFLICT (id) DO NOTHING;

-- 8. Insert Default Settings
INSERT INTO tournament_settings (id, tournament_mode)
VALUES ('itil_2026', 'final')
ON CONFLICT (id) DO NOTHING;
