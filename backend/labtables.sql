
-- Table for users

CREATE TABLE users (
    username VARCHAR(25) PRIMARY KEY, 
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    password TEXT NOT NULL,
    email TEXT NOT NULL
    CHECK (position('@' IN email) > 1),
    is_admin BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE clients (
    client_id SERIAL PRIMARY KEY,
    client_name VARCHAR(100) UNIQUE NOT NULL, 
    email VARCHAR(255) UNIQUE, 
    contact_info TEXT
);

CREATE TABLE genmethods (
    method_id SERIAL PRIMARY KEY,
    m_name TEXT NOT NULL
);

CREATE TABLE chapters (
    chapter_id SERIAL PRIMARY KEY, 
    chapter TEXT NOT NULL
);

CREATE TABLE samples (
    work_order SERIAL PRIMARY KEY, 
    client_id INTEGER REFERENCES clients(client_id),
    description_ TEXT NOT NULL, 
    storage TEXT NOT NULL, 
    method_id INTEGER REFERENCES genmethods(method_id), 
    chapter_id INTEGER REFERENCES chapters (chapter_id)
);

CREATE TABLE validations (
    val_id SERIAL PRIMARY KEY,
    client_id INTEGER REFERENCES clients(client_id), 
    work_order INTEGER REFERENCES samples(work_order),
    description_ TEXT NOT NULL,
    method_id INTEGER REFERENCES genmethods (method_id),
    chapter_id INTEGER REFERENCES chapters (chapter_id),
    val_date DATE, 
    val_method TEXT
);


CREATE TABLE notes (
    work_order INTEGER PRIMARY KEY REFERENCES samples (work_order), 
    test_date DATE NOT NULL, 
    analyst VARCHAR(25) REFERENCES users(username),
    procedure_ TEXT NOT NULL, 
    release_date  DATE NOT NULL, 
    results TEXT NOT NULL, 
    reviewed VARCHAR(25) REFERENCES users(username)
);

CREATE TABLE media (
    media_id SERIAL PRIMARY KEY,
    daycode TEXT NOT NULL, 
    media_name TEXT NOT NULL, 
    exp TEXT NOT NULL, 
    reviewed VARCHAR(25) REFERENCES users(username)
);

CREATE TABLE equipment (
    equip_id SERIAL PRIMARY KEY,
    equip_name TEXT NOT NULL, 
    cal_due DATE
);

CREATE TABLE media_used(
    media_id INTEGER REFERENCES media(media_id), 
    work_order INTEGER REFERENCES samples(work_order)
);

CREATE TABLE equipment_used (
    equip_id INTEGER REFERENCES equipment(equip_id),
    work_order INTEGER REFERENCES samples(work_order)
);