CREATE TABLE rum_windows (
  start_at_ms INTEGER PRIMARY KEY CHECK (start_at_ms > 0 AND start_at_ms % 86400000 = 0),
  end_at_ms INTEGER NOT NULL CHECK (end_at_ms = start_at_ms + 1209600000),
  last_maintenance_at_ms INTEGER NOT NULL,
  invalid_reason TEXT,
  snapshot_json TEXT
);

CREATE TABLE rum_measurements (
  window_start_at_ms INTEGER NOT NULL REFERENCES rum_windows(start_at_ms),
  name TEXT NOT NULL CHECK (name IN ('LCP', 'INP', 'CLS')),
  measurement_id TEXT NOT NULL,
  sequence INTEGER NOT NULL CHECK (sequence >= 1),
  value REAL NOT NULL CHECK (value >= 0),
  first_received_at_ms INTEGER NOT NULL,
  last_received_at_ms INTEGER NOT NULL,
  PRIMARY KEY (window_start_at_ms, name, measurement_id)
);
CREATE INDEX rum_measurements_retention ON rum_measurements(first_received_at_ms);
