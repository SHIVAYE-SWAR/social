/*
  # Initial Schema Setup for Appointment Booking System

  1. New Tables
    - `services`: Available medical services
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `duration` (integer, minutes)
      - `price` (decimal)
      - `created_at` (timestamp)
    
    - `appointments`: User appointments
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `service_id` (uuid, references services)
      - `appointment_date` (timestamp)
      - `status` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create services table
CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  duration integer NOT NULL,
  price decimal(10,2) NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create appointments table
CREATE TABLE IF NOT EXISTS appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  service_id uuid REFERENCES services NOT NULL,
  appointment_date timestamptz NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  CONSTRAINT valid_status CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed'))
);

-- Enable RLS
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

-- Policies for services table
CREATE POLICY "Services are viewable by everyone"
  ON services
  FOR SELECT
  TO authenticated
  USING (true);

-- Policies for appointments table
CREATE POLICY "Users can view their own appointments"
  ON appointments
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own appointments"
  ON appointments
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own appointments"
  ON appointments
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Insert initial services
INSERT INTO services (title, description, duration, price) VALUES
  ('General Consultation', 'Regular check-ups and general health consultation', 30, 50),
  ('Virtual Meeting', 'Online consultation from the comfort of your home', 20, 35),
  ('Specialist Consultation', 'Consultation with specialized healthcare professionals', 45, 80),
  ('Group Session', 'Group therapy and support sessions', 60, 30),
  ('Cardiology', 'Heart and cardiovascular system check-up', 40, 90),
  ('Physical Therapy', 'Rehabilitation and physical therapy sessions', 50, 65);