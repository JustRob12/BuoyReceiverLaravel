-- Create database if not exists
CREATE DATABASE IF NOT EXISTS dorsuedu_buoy;
USE dorsuedu_buoy;

-- Create table for buoy data
CREATE TABLE IF NOT EXISTS buoy_data (
    id INT AUTO_INCREMENT PRIMARY KEY,
    date DATE NOT NULL,
    time TIME NOT NULL,
    longitude DECIMAL(10, 6) NOT NULL,
    latitude DECIMAL(10, 6) NOT NULL,
    ph DECIMAL(4, 2) NOT NULL,
    temperature DECIMAL(5, 2) NOT NULL,
    tds DECIMAL(8, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Add indexes for better query performance
CREATE INDEX idx_date_time ON buoy_data(date, time);
CREATE INDEX idx_coordinates ON buoy_data(longitude, latitude); 