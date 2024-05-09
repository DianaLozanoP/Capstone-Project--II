const bcrypt = require("bcrypt");

const db = require("../db.js");
const { BCRYPT_WORK_FACTOR } = require("../config");

const testWorkOrders = [];
const testClientIds = [];
const testGenMethods = [];
const testChapters = [];

async function commonBeforeAll() {
    //DELETE WITHOUT WHERE
    await db.query("DELETE FROM users");
    await db.query("DELETE FROM notes");
    await db.query("DELETE FROM media");
    await db.query("DELETE FROM equipment");
    await db.query("DELETE FROM media_used");
    await db.query("DELETE FROM equipment_used");
    await db.query("DELETE FROM validations");
    await db.query("DELETE FROM samples");
    await db.query("DELETE FROM clients");
    await db.query("DELETE FROM genmethods");


    await db.query(`
    INSERT INTO users(username, 
                    first_name,
                    last_name,
                    password,
                    email,
                    is_admin)
    VALUES 
    ('u1', 'Testing', 'Number1', $1, 'andrea@testing.com', FALSE),
    ('u2', 'Testing', 'Number2', $2, 'peter@testing.com', FALSE)
    RETURNING username`,
        [
            await bcrypt.hash("password1", BCRYPT_WORK_FACTOR),
            await bcrypt.hash("password2", BCRYPT_WORK_FACTOR)
        ]);

    const methods = await db.query(`INSERT INTO genmethods (m_name)
                    VALUES 
                    ('USP-NF 2024, Issue 1'), 
                    ('EP 11.0')`);
    testGenMethods.splice(0, 0, ...methods.rows.map(r => r.method_id));

    const chapters = await db.query(`INSERT INTO chapters (chapter)
                    VALUES ('<71>'),('2.6.1')`);
    testChapters.splice(0, 0, ...chapters.rows.map(r => r.chapter_id));

    const resultClients = await db.query(`INSERT INTO clients 
        (client_name, email, contact_info)
        VALUES 
        ('Client1', 'jackson@botanical.ca', 'contactInfo1'),
        ('Client2', 'andrea@vitlab.ca', 'contactInfo2'),
        ('Client3', 'rmejia@biohacking.com', 'contactInfo3')
        RETURNING client_id, client_name, email, contact_info`);

    testClientIds.splice(0, 0, ...resultClients.rows.map(r => r.client_id));

    const resultSamples = await db.query(
        `INSERT INTO samples 
        (client_id, description_, storage,method_id, chapter_id)
        VALUES 
            ($1, 'Honey Healing Ointment 35g', 'Room Temperature', $2, $3),
            ($4, 'Magnesium 200 mg ultra strenght', 'Room Temperature', $5, $6)
        RETURNING work_order,client_id, description_, storage,method_id, chapter_id`,
        [testClientIds[0], testGenMethods[0], testChapters[0],
        testClientIds[1], testGenMethods[0], testChapters[1]]);

    testWorkOrders.splice(0, 0, ...resultSamples.rows.map(r => r.work_order));

    await db.query(`
        INSERT INTO validations 
        (client_id, work_order, description_ ,method_id,chapter_id,val_date, val_method )
        VALUES 
        ($1, $2,'Honey Healing Ointment 35g',
        $3, $4, 
        '2024-04-21', 
        'Testing the models.')`,
        [testClientIds[0], testWorkOrders[0], testGenMethods[0], testChapters[0]]);

    await db.query(`
        INSERT INTO media (daycode, media_name, exp, reviewed) 
        VALUES 
        ('1144', 'Tryptic Soy Broth', '2024-05-15', NULL),
        ('1154', 'Fluid Thioglycollate Medium', '2024-05-16', NULL);`);

    await db.query(`
        INSERT INTO equipment (equip_name, cal_due)
        VALUES
        ('Incubator #1', '2025-01-30'),
        ('Incubator #2', '2025-01-30'),
        ('Vortex #1', NULL),
        ('Stomacher', '2025-03-25')`);
}

async function commonBeforeEach() {
    await db.query("BEGIN");
}

async function commonAfterEach() {
    await db.query("ROLLBACK");
}

async function commonAfterAll() {
    await db.end();
}


module.exports = {
    commonBeforeAll,
    commonBeforeEach,
    commonAfterEach,
    commonAfterAll,
    testClientIds,
    testWorkOrders
};