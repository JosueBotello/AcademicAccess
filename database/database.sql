-- Create departments table
CREATE TABLE departments (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT
);

-- Create staff_members table
CREATE TABLE staff_members (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone_number VARCHAR(20),
  position VARCHAR(255),
  department_id INTEGER REFERENCES departments(id),
  office_location VARCHAR(255),
  bio TEXT,
  profile_picture VARCHAR(255)
);

-- Create contact_information table
CREATE TABLE contact_information (
  id SERIAL PRIMARY KEY,
  staff_member_id INTEGER REFERENCES staff_members(id),
  email VARCHAR(255),
  website VARCHAR(255)
);

-- Insert sample departments
INSERT INTO departments (name, description)
VALUES
  ('Computer Science', 'Department of Computer Science'),
  ('Mathematics', 'Department of Mathematics'),
  ('Physics', 'Department of Physics');

-- Insert sample staff members
INSERT INTO staff_members (first_name, last_name, email, phone_number, position, department_id, office_location, bio, profile_picture)
VALUES
  ('John', 'Doe', 'john.doe@example.com', '123-456-7890', 'Professor', 1, 'Building A, Room 101', 'Professor of Computer Science', 'john_doe.jpg'),
  ('Jane', 'Smith', 'jane.smith@example.com', '987-654-3210', 'Assistant Professor', 2, 'Building B, Room 202', 'Assistant Professor of Mathematics', 'jane_smith.jpg'),
  ('Michael', 'Johnson', 'michael.johnson@example.com', '555-123-4567', 'Lecturer', 3, 'Building C, Room 303', 'Lecturer in Physics', 'michael_johnson.jpg');

-- Insert sample contact information
INSERT INTO contact_information (staff_member_id, email, website)
VALUES
  (1, 'john.doe@example.com', 'johndoe.com'),
  (2, 'jane.smith@example.com', 'janesmith.com'),
  (3, 'michael.johnson@example.com', 'michaeljohnson.com');