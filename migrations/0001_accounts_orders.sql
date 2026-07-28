-- Customer accounts + order management
-- Applied with: wrangler d1 migrations apply emptywine  (add --local for dev)

CREATE TABLE IF NOT EXISTS users (
  id             TEXT PRIMARY KEY,           -- usr_<random>
  email          TEXT NOT NULL UNIQUE,       -- stored lowercased; UNIQUE blocks duplicate signups
  password_hash  TEXT NOT NULL,              -- pbkdf2$<iters>$<saltB64>$<hashB64>
  name           TEXT,
  company        TEXT,
  phone          TEXT,
  email_verified INTEGER NOT NULL DEFAULT 0, -- 0 | 1
  created_at     TEXT NOT NULL               -- ISO 8601
);

CREATE TABLE IF NOT EXISTS orders (
  rowid       INTEGER PRIMARY KEY AUTOINCREMENT,
  id          TEXT NOT NULL UNIQUE,          -- ord_<random>
  order_no    TEXT,                          -- human ref 'EW-<1000+rowid>', set just after insert
  user_id     TEXT NOT NULL REFERENCES users(id),
  design_json TEXT NOT NULL,                 -- serialized LabelConfig
  quantity    INTEGER,
  notes       TEXT,
  status      TEXT NOT NULL DEFAULT 'received', -- received | in_production | shipped | cancelled
  lang        TEXT NOT NULL DEFAULT 'en',
  created_at  TEXT NOT NULL,
  updated_at  TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_orders_user ON orders(user_id, rowid DESC);
