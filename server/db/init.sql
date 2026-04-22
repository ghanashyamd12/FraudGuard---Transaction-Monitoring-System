CREATE TABLE IF NOT EXISTS transactions (
  id SERIAL PRIMARY KEY,
  amount FLOAT,
  currency TEXT,
  location TEXT,
  is_fraud BOOLEAN,
  fraud_score FLOAT,
  reasons TEXT[],
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);