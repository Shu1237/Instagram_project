-- Migration to add online status fields to user table
-- Run this SQL in your database

ALTER TABLE user 
ADD COLUMN is_online BOOLEAN DEFAULT FALSE,
ADD COLUMN last_seen DATETIME NULL;

-- Update existing users to have default values
UPDATE user SET is_online = FALSE WHERE is_online IS NULL;
