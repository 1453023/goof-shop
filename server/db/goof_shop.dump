--
-- PostgreSQL database dump
--

-- Dumped from database version 9.5.6
-- Dumped by pg_dump version 9.5.6

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: Accounts; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE "Accounts" (
    id integer NOT NULL,
    email character varying(255),
    password character varying(255),
    gender boolean,
    region integer,
    subscribe boolean,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE "Accounts" OWNER TO root;

--
-- Name: Accounts_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE "Accounts_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "Accounts_id_seq" OWNER TO root;

--
-- Name: Accounts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE "Accounts_id_seq" OWNED BY "Accounts".id;


--
-- Name: Users; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE "Users" (
    id integer NOT NULL,
    email character varying(255),
    password character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE "Users" OWNER TO root;

--
-- Name: Users_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE "Users_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "Users_id_seq" OWNER TO root;

--
-- Name: Users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE "Users_id_seq" OWNED BY "Users".id;


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY "Accounts" ALTER COLUMN id SET DEFAULT nextval('"Accounts_id_seq"'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY "Users" ALTER COLUMN id SET DEFAULT nextval('"Users_id_seq"'::regclass);


--
-- Data for Name: Accounts; Type: TABLE DATA; Schema: public; Owner: root
--

COPY "Accounts" (id, email, password, gender, region, subscribe, "createdAt", "updatedAt") FROM stdin;
7	admin@goof.com	$2a$10$X6zT8gQHHjTTVQQO8omukO.qqmOYtmhNnhzg5QopNitRlcsg2xQTu	f	\N	f	2017-04-22 23:21:32.223+07	2017-04-22 23:21:32.223+07
8	stonghuuloc@gmail.com	$2a$10$nkeS5Q/QeU88oVlBTckTGuV/0OSnPXdJE9im00V5ZyQLdDkq2qkYK	f	\N	f	2017-04-22 23:50:46.673+07	2017-04-22 23:50:46.673+07
\.


--
-- Name: Accounts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('"Accounts_id_seq"', 14, true);


--
-- Data for Name: Users; Type: TABLE DATA; Schema: public; Owner: root
--

COPY "Users" (id, email, password, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Name: Users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('"Users_id_seq"', 1, false);


--
-- Name: Accounts_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY "Accounts"
    ADD CONSTRAINT "Accounts_pkey" PRIMARY KEY (id);


--
-- Name: Users_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY "Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (id);


--
-- Name: public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

