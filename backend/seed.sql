INSERT INTO genmethods (m_name)
VALUES 
    ('USP-NF 2024, Issue 1'), 
    ('EP 11.0'), 
    ('USP-NF 2023, Issue 2'), 
    ('EP 10.0'),
    ('ANSI/AAMI/ISO');

INSERT INTO chapters (chapter)
VALUES 
    ('<61>'),
    ('<62>'),
    ('<1231>'),
    ('<71>'),
    ('<81>'), 
    ('<60>'),
    ('11737-2:2018'),
    ('2.6.1');

INSERT INTO clients (client_name, email, contact_info)
VALUES 
    ('Botanical Pharmaceuticals', 'jackson@botanical.ca', 'Jackson Davis, Quality Assurance, +1 (647) 987-3321'),
    ('Vitamins Lab Inc', 'andrea@vitlab.ca', 'Andrea Evans Director of Quality Assurance, Mitchell Brown Quality Assurance Associate'),
    ('Biohacking Inc', 'rmejia@biohacking.com', 'Ryan Mejia'), 
    ('Another Bayern Company Inc', 'elee@bayern.com', 'Edwards Lee');

INSERT INTO samples (client_id, description_, storage,method_id, chapter_id)
VALUES 
    (1, 'Honey Healing Ointment 35g', 'Room Temperature', 1, 4),
    (2, 'Magnesium 200 mg ultra strenght', 'Room Temperature', 1, 4),
    (3, 'Laparoscopic Grasping Forceps', 'Room Temperature', 1, 4);

INSERT INTO validations (client_id, work_order, description_ ,method_id,chapter_id,val_date, val_method )
VALUES 
    (1, 1,'Honey Healing Ointment 35g',1, 4, 
    '2024-04-21', 
    'Dispense all contents of one tube into 200 mL of Tryptic Soy Broth, and dispense all contents of one tube into 200 ml of Fluid Thioglycollate Medium.');

INSERT INTO media (daycode, media_name, exp, reviewed) 
VALUES 
    ('1144', 'Tryptic Soy Broth', '2024-05-15', NULL),
    ('1154', 'Fluid Thioglycollate Medium', '2024-05-16', NULL);

INSERT INTO equipment (equip_name, cal_due)
VALUES
    ('Incubator #1', '2025-01-30'),
    ('Incubator #2', '2025-01-30'),
    ('Vortex #1', NULL),
    ('Stomacher', '2025-03-25');

INSERT INTO users(username, 
                first_name,
                last_name,
                password,
                email,
                is_admin)
VALUES 
('AL', 'Andrea', 'Lopez', 'abc123456', 'andrea@testing.com', FALSE),
('PT', 'Peter', 'Thompson', 'abc123456', 'peter@testing.com', FALSE)
