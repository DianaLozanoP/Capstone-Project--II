--
-- PostgreSQL database dump
--

-- Dumped from database version 14.9 (Ubuntu 14.9-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.9 (Ubuntu 14.9-0ubuntu0.22.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: chapters; Type: TABLE; Schema: public; Owner: dianaloz
--

CREATE TABLE public.chapters (
    chapter_id integer NOT NULL,
    chapter text NOT NULL
);


ALTER TABLE public.chapters OWNER TO dianaloz;

--
-- Name: chapters_chapter_id_seq; Type: SEQUENCE; Schema: public; Owner: dianaloz
--

CREATE SEQUENCE public.chapters_chapter_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.chapters_chapter_id_seq OWNER TO dianaloz;

--
-- Name: chapters_chapter_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dianaloz
--

ALTER SEQUENCE public.chapters_chapter_id_seq OWNED BY public.chapters.chapter_id;


--
-- Name: clients; Type: TABLE; Schema: public; Owner: dianaloz
--

CREATE TABLE public.clients (
    client_id integer NOT NULL,
    client_name character varying(100) NOT NULL,
    email text NOT NULL,
    contact_info text,
    CONSTRAINT clients_email_check CHECK ((POSITION(('@'::text) IN (email)) > 1))
);


ALTER TABLE public.clients OWNER TO dianaloz;

--
-- Name: clients_client_id_seq; Type: SEQUENCE; Schema: public; Owner: dianaloz
--

CREATE SEQUENCE public.clients_client_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.clients_client_id_seq OWNER TO dianaloz;

--
-- Name: clients_client_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dianaloz
--

ALTER SEQUENCE public.clients_client_id_seq OWNED BY public.clients.client_id;


--
-- Name: equipment; Type: TABLE; Schema: public; Owner: dianaloz
--

CREATE TABLE public.equipment (
    equip_id integer NOT NULL,
    equip_name text NOT NULL,
    cal_due date
);


ALTER TABLE public.equipment OWNER TO dianaloz;

--
-- Name: equipment_equip_id_seq; Type: SEQUENCE; Schema: public; Owner: dianaloz
--

CREATE SEQUENCE public.equipment_equip_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.equipment_equip_id_seq OWNER TO dianaloz;

--
-- Name: equipment_equip_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dianaloz
--

ALTER SEQUENCE public.equipment_equip_id_seq OWNED BY public.equipment.equip_id;


--
-- Name: equipment_used; Type: TABLE; Schema: public; Owner: dianaloz
--

CREATE TABLE public.equipment_used (
    equip_id integer,
    work_order integer
);


ALTER TABLE public.equipment_used OWNER TO dianaloz;

--
-- Name: genmethods; Type: TABLE; Schema: public; Owner: dianaloz
--

CREATE TABLE public.genmethods (
    method_id integer NOT NULL,
    m_name text NOT NULL
);


ALTER TABLE public.genmethods OWNER TO dianaloz;

--
-- Name: genmethods_method_id_seq; Type: SEQUENCE; Schema: public; Owner: dianaloz
--

CREATE SEQUENCE public.genmethods_method_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.genmethods_method_id_seq OWNER TO dianaloz;

--
-- Name: genmethods_method_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dianaloz
--

ALTER SEQUENCE public.genmethods_method_id_seq OWNED BY public.genmethods.method_id;


--
-- Name: media; Type: TABLE; Schema: public; Owner: dianaloz
--

CREATE TABLE public.media (
    media_id integer NOT NULL,
    daycode text NOT NULL,
    media_name text NOT NULL,
    exp text NOT NULL,
    reviewed character varying(25)
);


ALTER TABLE public.media OWNER TO dianaloz;

--
-- Name: media_media_id_seq; Type: SEQUENCE; Schema: public; Owner: dianaloz
--

CREATE SEQUENCE public.media_media_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.media_media_id_seq OWNER TO dianaloz;

--
-- Name: media_media_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dianaloz
--

ALTER SEQUENCE public.media_media_id_seq OWNED BY public.media.media_id;


--
-- Name: media_used; Type: TABLE; Schema: public; Owner: dianaloz
--

CREATE TABLE public.media_used (
    media_id integer,
    work_order integer
);


ALTER TABLE public.media_used OWNER TO dianaloz;

--
-- Name: notes; Type: TABLE; Schema: public; Owner: dianaloz
--

CREATE TABLE public.notes (
    work_order integer NOT NULL,
    test_date date NOT NULL,
    analyst character varying(25),
    procedure_ text NOT NULL,
    release_date date NOT NULL,
    results text NOT NULL,
    reviewed character varying(25)
);


ALTER TABLE public.notes OWNER TO dianaloz;

--
-- Name: samples; Type: TABLE; Schema: public; Owner: dianaloz
--

CREATE TABLE public.samples (
    work_order integer NOT NULL,
    client_id integer,
    description_ text NOT NULL,
    storage text NOT NULL,
    method_id integer,
    chapter_id integer
);


ALTER TABLE public.samples OWNER TO dianaloz;

--
-- Name: samples_work_order_seq; Type: SEQUENCE; Schema: public; Owner: dianaloz
--

CREATE SEQUENCE public.samples_work_order_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.samples_work_order_seq OWNER TO dianaloz;

--
-- Name: samples_work_order_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dianaloz
--

ALTER SEQUENCE public.samples_work_order_seq OWNED BY public.samples.work_order;


--
-- Name: users; Type: TABLE; Schema: public; Owner: dianaloz
--

CREATE TABLE public.users (
    username character varying(25) NOT NULL,
    first_name text NOT NULL,
    last_name text NOT NULL,
    password text NOT NULL,
    email text NOT NULL,
    is_admin boolean DEFAULT false NOT NULL,
    CONSTRAINT users_email_check CHECK ((POSITION(('@'::text) IN (email)) > 1))
);


ALTER TABLE public.users OWNER TO dianaloz;

--
-- Name: validations; Type: TABLE; Schema: public; Owner: dianaloz
--

CREATE TABLE public.validations (
    val_id integer NOT NULL,
    client_id integer,
    work_order integer,
    description_ text NOT NULL,
    method_id integer,
    chapter_id integer,
    val_date date,
    val_method text
);


ALTER TABLE public.validations OWNER TO dianaloz;

--
-- Name: validations_val_id_seq; Type: SEQUENCE; Schema: public; Owner: dianaloz
--

CREATE SEQUENCE public.validations_val_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.validations_val_id_seq OWNER TO dianaloz;

--
-- Name: validations_val_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dianaloz
--

ALTER SEQUENCE public.validations_val_id_seq OWNED BY public.validations.val_id;


--
-- Name: chapters chapter_id; Type: DEFAULT; Schema: public; Owner: dianaloz
--

ALTER TABLE ONLY public.chapters ALTER COLUMN chapter_id SET DEFAULT nextval('public.chapters_chapter_id_seq'::regclass);


--
-- Name: clients client_id; Type: DEFAULT; Schema: public; Owner: dianaloz
--

ALTER TABLE ONLY public.clients ALTER COLUMN client_id SET DEFAULT nextval('public.clients_client_id_seq'::regclass);


--
-- Name: equipment equip_id; Type: DEFAULT; Schema: public; Owner: dianaloz
--

ALTER TABLE ONLY public.equipment ALTER COLUMN equip_id SET DEFAULT nextval('public.equipment_equip_id_seq'::regclass);


--
-- Name: genmethods method_id; Type: DEFAULT; Schema: public; Owner: dianaloz
--

ALTER TABLE ONLY public.genmethods ALTER COLUMN method_id SET DEFAULT nextval('public.genmethods_method_id_seq'::regclass);


--
-- Name: media media_id; Type: DEFAULT; Schema: public; Owner: dianaloz
--

ALTER TABLE ONLY public.media ALTER COLUMN media_id SET DEFAULT nextval('public.media_media_id_seq'::regclass);


--
-- Name: samples work_order; Type: DEFAULT; Schema: public; Owner: dianaloz
--

ALTER TABLE ONLY public.samples ALTER COLUMN work_order SET DEFAULT nextval('public.samples_work_order_seq'::regclass);


--
-- Name: validations val_id; Type: DEFAULT; Schema: public; Owner: dianaloz
--

ALTER TABLE ONLY public.validations ALTER COLUMN val_id SET DEFAULT nextval('public.validations_val_id_seq'::regclass);


--
-- Data for Name: chapters; Type: TABLE DATA; Schema: public; Owner: dianaloz
--

COPY public.chapters (chapter_id, chapter) FROM stdin;
1	<61>
2	<62>
3	<1231>
4	<71>
5	<81>
6	<60>
7	11737-2:2018
8	2.6.1
\.


--
-- Data for Name: clients; Type: TABLE DATA; Schema: public; Owner: dianaloz
--

COPY public.clients (client_id, client_name, email, contact_info) FROM stdin;
1	Botanical Pharmaceuticals	jackson@botanical.ca	Jackson Davis, Quality Assurance, +1 (647) 987-3321
2	Vitamins Lab Inc	andrea@vitlab.ca	Andrea Evans Director of Quality Assurance, Mitchell Brown Quality Assurance Associate
3	Biohacking Inc	rmejia@biohacking.com	Ryan Mejia
4	Another Bayern Company Inc	elee@bayern.com	Edwards Lee
5	Natural beauty	lizthompson@naturalbeauty.com	Liz Thompson
6	Bioremedies Limited	vpatel@bioremedies.com	Vikrant Patel
\.


--
-- Data for Name: equipment; Type: TABLE DATA; Schema: public; Owner: dianaloz
--

COPY public.equipment (equip_id, equip_name, cal_due) FROM stdin;
1	Incubator #1	2025-01-30
2	Incubator #2	2025-01-30
3	Vortex #1	\N
4	Stomacher	2025-03-25
\.


--
-- Data for Name: equipment_used; Type: TABLE DATA; Schema: public; Owner: dianaloz
--

COPY public.equipment_used (equip_id, work_order) FROM stdin;
\.


--
-- Data for Name: genmethods; Type: TABLE DATA; Schema: public; Owner: dianaloz
--

COPY public.genmethods (method_id, m_name) FROM stdin;
1	USP-NF 2024, Issue 1
2	EP 11.0
3	USP-NF 2023, Issue 2
4	EP 10.0
5	ANSI/AAMI/ISO
\.


--
-- Data for Name: media; Type: TABLE DATA; Schema: public; Owner: dianaloz
--

COPY public.media (media_id, daycode, media_name, exp, reviewed) FROM stdin;
1	1144	Tryptic Soy Broth	2024-05-15	\N
2	1154	Fluid Thioglycollate Medium	2024-05-16	\N
3	1504	Tryptic Soy Agar	2024-05-31	\N
4	1514	Sabouraud Dextrose Agar	2024-06-01	\N
5	1434	Tryptic Soy Agar	2024-05-31	\N
\.


--
-- Data for Name: media_used; Type: TABLE DATA; Schema: public; Owner: dianaloz
--

COPY public.media_used (media_id, work_order) FROM stdin;
\.


--
-- Data for Name: notes; Type: TABLE DATA; Schema: public; Owner: dianaloz
--

COPY public.notes (work_order, test_date, analyst, procedure_, release_date, results, reviewed) FROM stdin;
\.


--
-- Data for Name: samples; Type: TABLE DATA; Schema: public; Owner: dianaloz
--

COPY public.samples (work_order, client_id, description_, storage, method_id, chapter_id) FROM stdin;
1	1	Honey Healing Ointment 35g	Room Temperature	1	4
2	2	Magnesium 200 mg ultra strenght	Room Temperature	1	4
3	3	Laparoscopic Grasping Forceps	Room Temperature	1	4
4	4	Amylase (enzyme concetrated serum)	minimum -20 degrees	1	4
5	5	Night Lotion with hyaluronic acid	Room Temperature	1	1
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: dianaloz
--

COPY public.users (username, first_name, last_name, password, email, is_admin) FROM stdin;
AL	Andrea	Lopez	abc123456	andrea@testing.com	f
PT	Peter	Thompson	abc123456	peter@testing.com	f
OS	Oliver	Sanders	abc123456	oliver@testing.com	f
DL	Diana	Lozano	abc132465	diana@testing.com	f
\.


--
-- Data for Name: validations; Type: TABLE DATA; Schema: public; Owner: dianaloz
--

COPY public.validations (val_id, client_id, work_order, description_, method_id, chapter_id, val_date, val_method) FROM stdin;
1	1	1	Honey Healing Ointment 35g	1	4	2024-04-21	Dispense all contents of one tube into 200 mL of Tryptic Soy Broth, and dispense all contents of one tube into 200 ml of Fluid Thioglycollate Medium.
\.


--
-- Name: chapters_chapter_id_seq; Type: SEQUENCE SET; Schema: public; Owner: dianaloz
--

SELECT pg_catalog.setval('public.chapters_chapter_id_seq', 8, true);


--
-- Name: clients_client_id_seq; Type: SEQUENCE SET; Schema: public; Owner: dianaloz
--

SELECT pg_catalog.setval('public.clients_client_id_seq', 6, true);


--
-- Name: equipment_equip_id_seq; Type: SEQUENCE SET; Schema: public; Owner: dianaloz
--

SELECT pg_catalog.setval('public.equipment_equip_id_seq', 4, true);


--
-- Name: genmethods_method_id_seq; Type: SEQUENCE SET; Schema: public; Owner: dianaloz
--

SELECT pg_catalog.setval('public.genmethods_method_id_seq', 5, true);


--
-- Name: media_media_id_seq; Type: SEQUENCE SET; Schema: public; Owner: dianaloz
--

SELECT pg_catalog.setval('public.media_media_id_seq', 5, true);


--
-- Name: samples_work_order_seq; Type: SEQUENCE SET; Schema: public; Owner: dianaloz
--

SELECT pg_catalog.setval('public.samples_work_order_seq', 5, true);


--
-- Name: validations_val_id_seq; Type: SEQUENCE SET; Schema: public; Owner: dianaloz
--

SELECT pg_catalog.setval('public.validations_val_id_seq', 1, true);


--
-- Name: chapters chapters_pkey; Type: CONSTRAINT; Schema: public; Owner: dianaloz
--

ALTER TABLE ONLY public.chapters
    ADD CONSTRAINT chapters_pkey PRIMARY KEY (chapter_id);


--
-- Name: clients clients_client_name_key; Type: CONSTRAINT; Schema: public; Owner: dianaloz
--

ALTER TABLE ONLY public.clients
    ADD CONSTRAINT clients_client_name_key UNIQUE (client_name);


--
-- Name: clients clients_pkey; Type: CONSTRAINT; Schema: public; Owner: dianaloz
--

ALTER TABLE ONLY public.clients
    ADD CONSTRAINT clients_pkey PRIMARY KEY (client_id);


--
-- Name: equipment equipment_pkey; Type: CONSTRAINT; Schema: public; Owner: dianaloz
--

ALTER TABLE ONLY public.equipment
    ADD CONSTRAINT equipment_pkey PRIMARY KEY (equip_id);


--
-- Name: genmethods genmethods_pkey; Type: CONSTRAINT; Schema: public; Owner: dianaloz
--

ALTER TABLE ONLY public.genmethods
    ADD CONSTRAINT genmethods_pkey PRIMARY KEY (method_id);


--
-- Name: media media_pkey; Type: CONSTRAINT; Schema: public; Owner: dianaloz
--

ALTER TABLE ONLY public.media
    ADD CONSTRAINT media_pkey PRIMARY KEY (media_id);


--
-- Name: notes notes_pkey; Type: CONSTRAINT; Schema: public; Owner: dianaloz
--

ALTER TABLE ONLY public.notes
    ADD CONSTRAINT notes_pkey PRIMARY KEY (work_order);


--
-- Name: samples samples_pkey; Type: CONSTRAINT; Schema: public; Owner: dianaloz
--

ALTER TABLE ONLY public.samples
    ADD CONSTRAINT samples_pkey PRIMARY KEY (work_order);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: dianaloz
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (username);


--
-- Name: validations validations_pkey; Type: CONSTRAINT; Schema: public; Owner: dianaloz
--

ALTER TABLE ONLY public.validations
    ADD CONSTRAINT validations_pkey PRIMARY KEY (val_id);


--
-- Name: equipment_used equipment_used_equip_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dianaloz
--

ALTER TABLE ONLY public.equipment_used
    ADD CONSTRAINT equipment_used_equip_id_fkey FOREIGN KEY (equip_id) REFERENCES public.equipment(equip_id);


--
-- Name: equipment_used equipment_used_work_order_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dianaloz
--

ALTER TABLE ONLY public.equipment_used
    ADD CONSTRAINT equipment_used_work_order_fkey FOREIGN KEY (work_order) REFERENCES public.samples(work_order);


--
-- Name: media media_reviewed_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dianaloz
--

ALTER TABLE ONLY public.media
    ADD CONSTRAINT media_reviewed_fkey FOREIGN KEY (reviewed) REFERENCES public.users(username);


--
-- Name: media_used media_used_media_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dianaloz
--

ALTER TABLE ONLY public.media_used
    ADD CONSTRAINT media_used_media_id_fkey FOREIGN KEY (media_id) REFERENCES public.media(media_id);


--
-- Name: media_used media_used_work_order_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dianaloz
--

ALTER TABLE ONLY public.media_used
    ADD CONSTRAINT media_used_work_order_fkey FOREIGN KEY (work_order) REFERENCES public.samples(work_order);


--
-- Name: notes notes_analyst_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dianaloz
--

ALTER TABLE ONLY public.notes
    ADD CONSTRAINT notes_analyst_fkey FOREIGN KEY (analyst) REFERENCES public.users(username);


--
-- Name: notes notes_reviewed_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dianaloz
--

ALTER TABLE ONLY public.notes
    ADD CONSTRAINT notes_reviewed_fkey FOREIGN KEY (reviewed) REFERENCES public.users(username);


--
-- Name: notes notes_work_order_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dianaloz
--

ALTER TABLE ONLY public.notes
    ADD CONSTRAINT notes_work_order_fkey FOREIGN KEY (work_order) REFERENCES public.samples(work_order);


--
-- Name: samples samples_chapter_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dianaloz
--

ALTER TABLE ONLY public.samples
    ADD CONSTRAINT samples_chapter_id_fkey FOREIGN KEY (chapter_id) REFERENCES public.chapters(chapter_id);


--
-- Name: samples samples_client_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dianaloz
--

ALTER TABLE ONLY public.samples
    ADD CONSTRAINT samples_client_id_fkey FOREIGN KEY (client_id) REFERENCES public.clients(client_id);


--
-- Name: samples samples_method_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dianaloz
--

ALTER TABLE ONLY public.samples
    ADD CONSTRAINT samples_method_id_fkey FOREIGN KEY (method_id) REFERENCES public.genmethods(method_id);


--
-- Name: validations validations_chapter_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dianaloz
--

ALTER TABLE ONLY public.validations
    ADD CONSTRAINT validations_chapter_id_fkey FOREIGN KEY (chapter_id) REFERENCES public.chapters(chapter_id);


--
-- Name: validations validations_client_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dianaloz
--

ALTER TABLE ONLY public.validations
    ADD CONSTRAINT validations_client_id_fkey FOREIGN KEY (client_id) REFERENCES public.clients(client_id);


--
-- Name: validations validations_method_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dianaloz
--

ALTER TABLE ONLY public.validations
    ADD CONSTRAINT validations_method_id_fkey FOREIGN KEY (method_id) REFERENCES public.genmethods(method_id);


--
-- Name: validations validations_work_order_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dianaloz
--

ALTER TABLE ONLY public.validations
    ADD CONSTRAINT validations_work_order_fkey FOREIGN KEY (work_order) REFERENCES public.samples(work_order);


--
-- PostgreSQL database dump complete
--

