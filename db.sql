CREATE DATABASE auth;

CREATE TABLE IF NOT EXISTS users(
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR ( 50 ) UNIQUE NOT NULL,
  password VARCHAR ( 255 ) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  is_admin BOOLEAN NOT NULL DEFAULT false
)