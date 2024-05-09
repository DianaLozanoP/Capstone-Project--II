
DROP DATABASE doculab;
CREATE DATABASE doculab;
\connect doculab

\i labtables.sql
\i seed.sql

DROP DATABASE doculab_test;
CREATE DATABASE doculab_test;
\connect doculab_test

\i labtables.sql

