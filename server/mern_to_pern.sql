--
-- PostgreSQL database dump
--

-- Dumped from database version 13.2
-- Dumped by pg_dump version 13.2

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
-- Name: project; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.project (
    usersa integer NOT NULL,
    name character varying(255) NOT NULL,
    color character varying(255),
    isstarred boolean
);


ALTER TABLE public.project OWNER TO postgres;

--
-- Name: project_usersa_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.project_usersa_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.project_usersa_seq OWNER TO postgres;

--
-- Name: project_usersa_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.project_usersa_seq OWNED BY public.project.usersa;


--
-- Name: projectcard; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.projectcard (
    name character varying(255) NOT NULL,
    projectid integer NOT NULL
);


ALTER TABLE public.projectcard OWNER TO postgres;

--
-- Name: projectcard_projectid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.projectcard_projectid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.projectcard_projectid_seq OWNER TO postgres;

--
-- Name: projectcard_projectid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.projectcard_projectid_seq OWNED BY public.projectcard.projectid;


--
-- Name: task; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.task (
    projectcardid integer NOT NULL,
    name character varying(255) NOT NULL,
    description character varying(255),
    createdat date DEFAULT CURRENT_DATE NOT NULL
);


ALTER TABLE public.task OWNER TO postgres;

--
-- Name: task_projectcardid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.task_projectcardid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.task_projectcardid_seq OWNER TO postgres;

--
-- Name: task_projectcardid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.task_projectcardid_seq OWNED BY public.task.projectcardid;


--
-- Name: project usersa; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.project ALTER COLUMN usersa SET DEFAULT nextval('public.project_usersa_seq'::regclass);


--
-- Name: projectcard projectid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.projectcard ALTER COLUMN projectid SET DEFAULT nextval('public.projectcard_projectid_seq'::regclass);


--
-- Name: task projectcardid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.task ALTER COLUMN projectcardid SET DEFAULT nextval('public.task_projectcardid_seq'::regclass);


--
-- Data for Name: project; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.project (usersa, name, color, isstarred) FROM stdin;
\.


--
-- Data for Name: projectcard; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.projectcard (name, projectid) FROM stdin;
\.


--
-- Data for Name: task; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.task (projectcardid, name, description, createdat) FROM stdin;
\.


--
-- Name: project_usersa_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.project_usersa_seq', 1, false);


--
-- Name: projectcard_projectid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.projectcard_projectid_seq', 1, false);


--
-- Name: task_projectcardid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.task_projectcardid_seq', 1, false);


--
-- Name: project project_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.project
    ADD CONSTRAINT project_pkey PRIMARY KEY (usersa);


--
-- Name: projectcard projectcard_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.projectcard
    ADD CONSTRAINT projectcard_pkey PRIMARY KEY (projectid);


--
-- Name: task task_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.task
    ADD CONSTRAINT task_pkey PRIMARY KEY (projectcardid);


--
-- PostgreSQL database dump complete
--

