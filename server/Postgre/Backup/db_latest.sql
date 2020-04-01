--
-- PostgreSQL database dump
--

-- Dumped from database version 11.2
-- Dumped by pg_dump version 11.1

-- Started on 2019-09-04 14:43:34

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 8 (class 2615 OID 24945)
-- Name: Ordering; Type: SCHEMA; Schema: -; Owner: dvasilakis
--

CREATE SCHEMA "Ordering";


ALTER SCHEMA "Ordering" OWNER TO dvasilakis;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 197 (class 1259 OID 24946)
-- Name: AAY; Type: TABLE; Schema: Ordering; Owner: dvasilakis
--

CREATE TABLE "Ordering"."AAY" (
    "Id" bigint NOT NULL,
    "AccountId" bigint,
    "Value" character varying(20),
    "Year" integer,
    "ProtocolNumber" integer,
    "ProtocolDate" date,
    "EadNumber" integer,
    "PreviousYear" character varying(4),
    "ADA" character varying(20)
);


ALTER TABLE "Ordering"."AAY" OWNER TO dvasilakis;

--
-- TOC entry 198 (class 1259 OID 24949)
-- Name: AAY_Id_seq; Type: SEQUENCE; Schema: Ordering; Owner: dvasilakis
--

CREATE SEQUENCE "Ordering"."AAY_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "Ordering"."AAY_Id_seq" OWNER TO dvasilakis;

--
-- TOC entry 3001 (class 0 OID 0)
-- Dependencies: 198
-- Name: AAY_Id_seq; Type: SEQUENCE OWNED BY; Schema: Ordering; Owner: dvasilakis
--

ALTER SEQUENCE "Ordering"."AAY_Id_seq" OWNED BY "Ordering"."AAY"."Id";


--
-- TOC entry 199 (class 1259 OID 24951)
-- Name: Account; Type: TABLE; Schema: Ordering; Owner: dvasilakis
--

CREATE TABLE "Ordering"."Account" (
    "Id" bigint NOT NULL,
    "ContractId" bigint NOT NULL,
    "Number" integer NOT NULL,
    "Start" date NOT NULL,
    "End" date NOT NULL,
    "AmountPure" real NOT NULL,
    "AmountFpa" real NOT NULL,
    "AmountTotal" real NOT NULL,
    "ProtocolNumber" integer,
    "ProtocolDate" date,
    "AmountFullWritten" character varying(2000) NOT NULL,
    "IsFirstOfTheYear" boolean NOT NULL,
    "WorkConfirmationDate" date NOT NULL,
    "DeliveryGoodsDate" date NOT NULL,
    "DocumentDate" date,
    "DateCreated" date,
    "DateModified" date,
    "FirstAccountProtocolNumber" bigint,
    "FirstAccountProtocolDate" date,
    "RemainAmountOfContract" real
);


ALTER TABLE "Ordering"."Account" OWNER TO dvasilakis;

--
-- TOC entry 200 (class 1259 OID 24957)
-- Name: Account_Id_seq; Type: SEQUENCE; Schema: Ordering; Owner: dvasilakis
--

CREATE SEQUENCE "Ordering"."Account_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "Ordering"."Account_Id_seq" OWNER TO dvasilakis;

--
-- TOC entry 3002 (class 0 OID 0)
-- Dependencies: 200
-- Name: Account_Id_seq; Type: SEQUENCE OWNED BY; Schema: Ordering; Owner: dvasilakis
--

ALTER SEQUENCE "Ordering"."Account_Id_seq" OWNED BY "Ordering"."Account"."Id";


--
-- TOC entry 221 (class 1259 OID 25162)
-- Name: Agencies; Type: TABLE; Schema: Ordering; Owner: dvasilakis
--

CREATE TABLE "Ordering"."Agencies" (
    "Id" bigint NOT NULL,
    "Name" character varying(1000) NOT NULL
);


ALTER TABLE "Ordering"."Agencies" OWNER TO dvasilakis;

--
-- TOC entry 201 (class 1259 OID 24959)
-- Name: CC; Type: TABLE; Schema: Ordering; Owner: dvasilakis
--

CREATE TABLE "Ordering"."CC" (
    "Id" bigint NOT NULL,
    "AccountId" bigint,
    "CC1" integer,
    "CC2" integer,
    "ccType" smallint,
    "Order" smallint
);


ALTER TABLE "Ordering"."CC" OWNER TO dvasilakis;

--
-- TOC entry 202 (class 1259 OID 24962)
-- Name: CC_Id_seq; Type: SEQUENCE; Schema: Ordering; Owner: dvasilakis
--

CREATE SEQUENCE "Ordering"."CC_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "Ordering"."CC_Id_seq" OWNER TO dvasilakis;

--
-- TOC entry 3003 (class 0 OID 0)
-- Dependencies: 202
-- Name: CC_Id_seq; Type: SEQUENCE OWNED BY; Schema: Ordering; Owner: dvasilakis
--

ALTER SEQUENCE "Ordering"."CC_Id_seq" OWNED BY "Ordering"."CC"."Id";


--
-- TOC entry 203 (class 1259 OID 24972)
-- Name: Contract; Type: TABLE; Schema: Ordering; Owner: dvasilakis
--

CREATE TABLE "Ordering"."Contract" (
    "Id" bigint NOT NULL,
    "ContractTypeId" integer,
    "Title" character varying(2000),
    "ProtocolNumber" integer,
    "ProtocolDate" date,
    "KAE" character varying(20),
    "Actor" character varying(5),
    "CodeDirection" character varying(5),
    "AwardNumber" integer,
    "AwardDate" date,
    "AwardAda" character varying(20),
    "CpvCode" character varying(20),
    "CpvTitle" character varying(255),
    "AmountPure" real,
    "AmountFpa" real,
    "AmountTotal" real,
    "PaidAmountPure" real,
    "PaidAmountFpa" real,
    "PaidAmountTotal" real,
    "Balance" real,
    "Start" date,
    "End" date,
    "NumberOfAccounts" integer,
    "DateCreated" timestamp(0) without time zone,
    "DateModified" timestamp(0) without time zone,
    "DirectionId" bigint,
    "DepartmentId" bigint,
    "ConcessionaireName" character varying(1000),
    "ConcessionaireAFM" character varying(50)
);
ALTER TABLE ONLY "Ordering"."Contract" ALTER COLUMN "AwardNumber" SET STATISTICS 0;
ALTER TABLE ONLY "Ordering"."Contract" ALTER COLUMN "AwardDate" SET STATISTICS 0;
ALTER TABLE ONLY "Ordering"."Contract" ALTER COLUMN "AwardAda" SET STATISTICS 0;
ALTER TABLE ONLY "Ordering"."Contract" ALTER COLUMN "CpvCode" SET STATISTICS 0;
ALTER TABLE ONLY "Ordering"."Contract" ALTER COLUMN "CpvTitle" SET STATISTICS 0;


ALTER TABLE "Ordering"."Contract" OWNER TO dvasilakis;

--
-- TOC entry 204 (class 1259 OID 24978)
-- Name: ContractType; Type: TABLE; Schema: Ordering; Owner: dvasilakis
--

CREATE TABLE "Ordering"."ContractType" (
    "ContractTypeId" bigint NOT NULL,
    "ContractTypeName" character varying(255)
);


ALTER TABLE "Ordering"."ContractType" OWNER TO dvasilakis;

--
-- TOC entry 205 (class 1259 OID 24981)
-- Name: ContractType_Id_seq; Type: SEQUENCE; Schema: Ordering; Owner: dvasilakis
--

CREATE SEQUENCE "Ordering"."ContractType_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "Ordering"."ContractType_Id_seq" OWNER TO dvasilakis;

--
-- TOC entry 3004 (class 0 OID 0)
-- Dependencies: 205
-- Name: ContractType_Id_seq; Type: SEQUENCE OWNED BY; Schema: Ordering; Owner: dvasilakis
--

ALTER SEQUENCE "Ordering"."ContractType_Id_seq" OWNED BY "Ordering"."ContractType"."ContractTypeId";


--
-- TOC entry 206 (class 1259 OID 24983)
-- Name: Contract_Id_seq; Type: SEQUENCE; Schema: Ordering; Owner: dvasilakis
--

CREATE SEQUENCE "Ordering"."Contract_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "Ordering"."Contract_Id_seq" OWNER TO dvasilakis;

--
-- TOC entry 3005 (class 0 OID 0)
-- Dependencies: 206
-- Name: Contract_Id_seq; Type: SEQUENCE OWNED BY; Schema: Ordering; Owner: dvasilakis
--

ALTER SEQUENCE "Ordering"."Contract_Id_seq" OWNED BY "Ordering"."Contract"."Id";


--
-- TOC entry 207 (class 1259 OID 24985)
-- Name: Department; Type: TABLE; Schema: Ordering; Owner: dvasilakis
--

CREATE TABLE "Ordering"."Department" (
    "DepartmentId" smallint NOT NULL,
    "DirectionId" smallint NOT NULL,
    "DepartmentName" character varying(2000) NOT NULL,
    "DepartmentSupervisor" character varying(255),
    "DepartmentTelephone" character varying(20),
    "DepartmentEmail" character varying(255)
);


ALTER TABLE "Ordering"."Department" OWNER TO dvasilakis;

--
-- TOC entry 208 (class 1259 OID 24991)
-- Name: Department_Id_seq; Type: SEQUENCE; Schema: Ordering; Owner: dvasilakis
--

CREATE SEQUENCE "Ordering"."Department_Id_seq"
    AS smallint
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "Ordering"."Department_Id_seq" OWNER TO dvasilakis;

--
-- TOC entry 3006 (class 0 OID 0)
-- Dependencies: 208
-- Name: Department_Id_seq; Type: SEQUENCE OWNED BY; Schema: Ordering; Owner: dvasilakis
--

ALTER SEQUENCE "Ordering"."Department_Id_seq" OWNED BY "Ordering"."Department"."DepartmentId";


--
-- TOC entry 209 (class 1259 OID 24993)
-- Name: Direction; Type: TABLE; Schema: Ordering; Owner: dvasilakis
--

CREATE TABLE "Ordering"."Direction" (
    "DirectionId" smallint NOT NULL,
    "DirectionName" character varying(2000),
    "DirectionSupervisor" character varying(255),
    "DirectionTelephone" character varying(20),
    "DirectionEmail" character varying(255),
    "DirectionAddress" character varying(255),
    "DirectionPostCode" character varying(7),
    "DirectionCity" character varying(50)
);


ALTER TABLE "Ordering"."Direction" OWNER TO dvasilakis;

--
-- TOC entry 210 (class 1259 OID 24999)
-- Name: Direction_Id_seq; Type: SEQUENCE; Schema: Ordering; Owner: dvasilakis
--

CREATE SEQUENCE "Ordering"."Direction_Id_seq"
    AS smallint
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "Ordering"."Direction_Id_seq" OWNER TO dvasilakis;

--
-- TOC entry 3007 (class 0 OID 0)
-- Dependencies: 210
-- Name: Direction_Id_seq; Type: SEQUENCE OWNED BY; Schema: Ordering; Owner: dvasilakis
--

ALTER SEQUENCE "Ordering"."Direction_Id_seq" OWNED BY "Ordering"."Direction"."DirectionId";


--
-- TOC entry 211 (class 1259 OID 25001)
-- Name: DocumentSignatory; Type: TABLE; Schema: Ordering; Owner: dvasilakis
--

CREATE TABLE "Ordering"."DocumentSignatory" (
    "Id" bigint DEFAULT nextval(('"Ordering".documentsignatory_id_seq'::text)::regclass) NOT NULL,
    "AccountId" bigint,
    "SignatoryTypeId" integer,
    "SignatoryId" bigint,
    "DocumentType" smallint,
    "Absense" boolean
);


ALTER TABLE "Ordering"."DocumentSignatory" OWNER TO dvasilakis;

--
-- TOC entry 212 (class 1259 OID 25004)
-- Name: Invoice; Type: TABLE; Schema: Ordering; Owner: dvasilakis
--

CREATE TABLE "Ordering"."Invoice" (
    "Id" bigint NOT NULL,
    "AccountId" bigint,
    "Number" character varying(20),
    "Date" date,
    "DeliveredDateProtocolNumber" integer,
    "DeliveredDateProtocolDate" date
);


ALTER TABLE "Ordering"."Invoice" OWNER TO dvasilakis;

--
-- TOC entry 213 (class 1259 OID 25007)
-- Name: Invoice_Id_seq; Type: SEQUENCE; Schema: Ordering; Owner: dvasilakis
--

CREATE SEQUENCE "Ordering"."Invoice_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "Ordering"."Invoice_Id_seq" OWNER TO dvasilakis;

--
-- TOC entry 3008 (class 0 OID 0)
-- Dependencies: 213
-- Name: Invoice_Id_seq; Type: SEQUENCE OWNED BY; Schema: Ordering; Owner: dvasilakis
--

ALTER SEQUENCE "Ordering"."Invoice_Id_seq" OWNED BY "Ordering"."Invoice"."Id";


--
-- TOC entry 228 (class 1259 OID 25297)
-- Name: LogError; Type: TABLE; Schema: Ordering; Owner: dvasilakis
--

CREATE TABLE "Ordering"."LogError" (
    "Id" bigint NOT NULL,
    "Username" character varying(50),
    "ErrorMessage" character varying(1000),
    "DateCreated" date
);


ALTER TABLE "Ordering"."LogError" OWNER TO dvasilakis;

--
-- TOC entry 227 (class 1259 OID 25295)
-- Name: LogError_Id_seq; Type: SEQUENCE; Schema: Ordering; Owner: dvasilakis
--

CREATE SEQUENCE "Ordering"."LogError_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "Ordering"."LogError_Id_seq" OWNER TO dvasilakis;

--
-- TOC entry 3009 (class 0 OID 0)
-- Dependencies: 227
-- Name: LogError_Id_seq; Type: SEQUENCE OWNED BY; Schema: Ordering; Owner: dvasilakis
--

ALTER SEQUENCE "Ordering"."LogError_Id_seq" OWNED BY "Ordering"."LogError"."Id";


--
-- TOC entry 220 (class 1259 OID 25160)
-- Name: MunicipalAgencies_Id_seq; Type: SEQUENCE; Schema: Ordering; Owner: dvasilakis
--

CREATE SEQUENCE "Ordering"."MunicipalAgencies_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "Ordering"."MunicipalAgencies_Id_seq" OWNER TO dvasilakis;

--
-- TOC entry 3010 (class 0 OID 0)
-- Dependencies: 220
-- Name: MunicipalAgencies_Id_seq; Type: SEQUENCE OWNED BY; Schema: Ordering; Owner: dvasilakis
--

ALTER SEQUENCE "Ordering"."MunicipalAgencies_Id_seq" OWNED BY "Ordering"."Agencies"."Id";


--
-- TOC entry 219 (class 1259 OID 25136)
-- Name: Reservations; Type: TABLE; Schema: Ordering; Owner: dvasilakis
--

CREATE TABLE "Ordering"."Reservations" (
    "Id" bigint NOT NULL,
    "Name" character varying(255),
    "Percentage" real,
    "Stamp" real,
    "StampOGA" real,
    "IsReservation" boolean,
    "Order" smallint
);


ALTER TABLE "Ordering"."Reservations" OWNER TO dvasilakis;

--
-- TOC entry 218 (class 1259 OID 25134)
-- Name: Reservations_Id_seq; Type: SEQUENCE; Schema: Ordering; Owner: dvasilakis
--

CREATE SEQUENCE "Ordering"."Reservations_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "Ordering"."Reservations_Id_seq" OWNER TO dvasilakis;

--
-- TOC entry 3011 (class 0 OID 0)
-- Dependencies: 218
-- Name: Reservations_Id_seq; Type: SEQUENCE OWNED BY; Schema: Ordering; Owner: dvasilakis
--

ALTER SEQUENCE "Ordering"."Reservations_Id_seq" OWNED BY "Ordering"."Reservations"."Id";


--
-- TOC entry 214 (class 1259 OID 25009)
-- Name: Signatory; Type: TABLE; Schema: Ordering; Owner: dvasilakis
--

CREATE TABLE "Ordering"."Signatory" (
    "Id" smallint NOT NULL,
    "Name" character varying(255)
);


ALTER TABLE "Ordering"."Signatory" OWNER TO dvasilakis;

--
-- TOC entry 215 (class 1259 OID 25012)
-- Name: SignatoryType; Type: TABLE; Schema: Ordering; Owner: dvasilakis
--

CREATE TABLE "Ordering"."SignatoryType" (
    "Id" smallint NOT NULL,
    "Name" character varying(255)
);


ALTER TABLE "Ordering"."SignatoryType" OWNER TO dvasilakis;

--
-- TOC entry 216 (class 1259 OID 25015)
-- Name: SignatoryType_Id_seq; Type: SEQUENCE; Schema: Ordering; Owner: dvasilakis
--

CREATE SEQUENCE "Ordering"."SignatoryType_Id_seq"
    AS smallint
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "Ordering"."SignatoryType_Id_seq" OWNER TO dvasilakis;

--
-- TOC entry 3012 (class 0 OID 0)
-- Dependencies: 216
-- Name: SignatoryType_Id_seq; Type: SEQUENCE OWNED BY; Schema: Ordering; Owner: dvasilakis
--

ALTER SEQUENCE "Ordering"."SignatoryType_Id_seq" OWNED BY "Ordering"."SignatoryType"."Id";


--
-- TOC entry 217 (class 1259 OID 25017)
-- Name: Signatory_Id_seq; Type: SEQUENCE; Schema: Ordering; Owner: dvasilakis
--

CREATE SEQUENCE "Ordering"."Signatory_Id_seq"
    AS smallint
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "Ordering"."Signatory_Id_seq" OWNER TO dvasilakis;

--
-- TOC entry 3013 (class 0 OID 0)
-- Dependencies: 217
-- Name: Signatory_Id_seq; Type: SEQUENCE OWNED BY; Schema: Ordering; Owner: dvasilakis
--

ALTER SEQUENCE "Ordering"."Signatory_Id_seq" OWNED BY "Ordering"."Signatory"."Id";


--
-- TOC entry 224 (class 1259 OID 25267)
-- Name: User; Type: TABLE; Schema: Ordering; Owner: dvasilakis
--

CREATE TABLE "Ordering"."User" (
    "Id" bigint NOT NULL,
    "Username" character varying(50),
    "Password" character varying(1000),
    "Role" integer
);


ALTER TABLE "Ordering"."User" OWNER TO dvasilakis;

--
-- TOC entry 226 (class 1259 OID 25281)
-- Name: UserRoles; Type: TABLE; Schema: Ordering; Owner: dvasilakis
--

CREATE TABLE "Ordering"."UserRoles" (
    "Id" bigint NOT NULL,
    "Name" character varying
);


ALTER TABLE "Ordering"."UserRoles" OWNER TO dvasilakis;

--
-- TOC entry 225 (class 1259 OID 25279)
-- Name: UserRoles_Id_seq; Type: SEQUENCE; Schema: Ordering; Owner: dvasilakis
--

CREATE SEQUENCE "Ordering"."UserRoles_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "Ordering"."UserRoles_Id_seq" OWNER TO dvasilakis;

--
-- TOC entry 3014 (class 0 OID 0)
-- Dependencies: 225
-- Name: UserRoles_Id_seq; Type: SEQUENCE OWNED BY; Schema: Ordering; Owner: dvasilakis
--

ALTER SEQUENCE "Ordering"."UserRoles_Id_seq" OWNED BY "Ordering"."UserRoles"."Id";


--
-- TOC entry 223 (class 1259 OID 25265)
-- Name: User_Id_seq; Type: SEQUENCE; Schema: Ordering; Owner: dvasilakis
--

CREATE SEQUENCE "Ordering"."User_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "Ordering"."User_Id_seq" OWNER TO dvasilakis;

--
-- TOC entry 3015 (class 0 OID 0)
-- Dependencies: 223
-- Name: User_Id_seq; Type: SEQUENCE OWNED BY; Schema: Ordering; Owner: dvasilakis
--

ALTER SEQUENCE "Ordering"."User_Id_seq" OWNED BY "Ordering"."User"."Id";


--
-- TOC entry 222 (class 1259 OID 25203)
-- Name: documentsignatory_id_seq; Type: SEQUENCE; Schema: Ordering; Owner: dvasilakis
--

CREATE SEQUENCE "Ordering".documentsignatory_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "Ordering".documentsignatory_id_seq OWNER TO dvasilakis;

--
-- TOC entry 2784 (class 2604 OID 25019)
-- Name: AAY Id; Type: DEFAULT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."AAY" ALTER COLUMN "Id" SET DEFAULT nextval('"Ordering"."AAY_Id_seq"'::regclass);


--
-- TOC entry 2785 (class 2604 OID 25020)
-- Name: Account Id; Type: DEFAULT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."Account" ALTER COLUMN "Id" SET DEFAULT nextval('"Ordering"."Account_Id_seq"'::regclass);


--
-- TOC entry 2796 (class 2604 OID 25165)
-- Name: Agencies Id; Type: DEFAULT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."Agencies" ALTER COLUMN "Id" SET DEFAULT nextval('"Ordering"."MunicipalAgencies_Id_seq"'::regclass);


--
-- TOC entry 2786 (class 2604 OID 25021)
-- Name: CC Id; Type: DEFAULT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."CC" ALTER COLUMN "Id" SET DEFAULT nextval('"Ordering"."CC_Id_seq"'::regclass);


--
-- TOC entry 2787 (class 2604 OID 25023)
-- Name: Contract Id; Type: DEFAULT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."Contract" ALTER COLUMN "Id" SET DEFAULT nextval('"Ordering"."Contract_Id_seq"'::regclass);


--
-- TOC entry 2788 (class 2604 OID 25024)
-- Name: ContractType ContractTypeId; Type: DEFAULT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."ContractType" ALTER COLUMN "ContractTypeId" SET DEFAULT nextval('"Ordering"."ContractType_Id_seq"'::regclass);


--
-- TOC entry 2789 (class 2604 OID 25025)
-- Name: Department DepartmentId; Type: DEFAULT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."Department" ALTER COLUMN "DepartmentId" SET DEFAULT nextval('"Ordering"."Department_Id_seq"'::regclass);


--
-- TOC entry 2790 (class 2604 OID 25026)
-- Name: Direction DirectionId; Type: DEFAULT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."Direction" ALTER COLUMN "DirectionId" SET DEFAULT nextval('"Ordering"."Direction_Id_seq"'::regclass);


--
-- TOC entry 2792 (class 2604 OID 25027)
-- Name: Invoice Id; Type: DEFAULT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."Invoice" ALTER COLUMN "Id" SET DEFAULT nextval('"Ordering"."Invoice_Id_seq"'::regclass);


--
-- TOC entry 2799 (class 2604 OID 25300)
-- Name: LogError Id; Type: DEFAULT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."LogError" ALTER COLUMN "Id" SET DEFAULT nextval('"Ordering"."LogError_Id_seq"'::regclass);


--
-- TOC entry 2795 (class 2604 OID 25139)
-- Name: Reservations Id; Type: DEFAULT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."Reservations" ALTER COLUMN "Id" SET DEFAULT nextval('"Ordering"."Reservations_Id_seq"'::regclass);


--
-- TOC entry 2793 (class 2604 OID 25028)
-- Name: Signatory Id; Type: DEFAULT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."Signatory" ALTER COLUMN "Id" SET DEFAULT nextval('"Ordering"."Signatory_Id_seq"'::regclass);


--
-- TOC entry 2794 (class 2604 OID 25029)
-- Name: SignatoryType Id; Type: DEFAULT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."SignatoryType" ALTER COLUMN "Id" SET DEFAULT nextval('"Ordering"."SignatoryType_Id_seq"'::regclass);


--
-- TOC entry 2797 (class 2604 OID 25270)
-- Name: User Id; Type: DEFAULT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."User" ALTER COLUMN "Id" SET DEFAULT nextval('"Ordering"."User_Id_seq"'::regclass);


--
-- TOC entry 2798 (class 2604 OID 25284)
-- Name: UserRoles Id; Type: DEFAULT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."UserRoles" ALTER COLUMN "Id" SET DEFAULT nextval('"Ordering"."UserRoles_Id_seq"'::regclass);


--
-- TOC entry 2964 (class 0 OID 24946)
-- Dependencies: 197
-- Data for Name: AAY; Type: TABLE DATA; Schema: Ordering; Owner: dvasilakis
--

COPY "Ordering"."AAY" ("Id", "AccountId", "Value", "Year", "ProtocolNumber", "ProtocolDate", "EadNumber", "PreviousYear", "ADA") FROM stdin;
40	50	12_u	17	19	2025-03-02	7	6	uuuu
41	51	asdf	2	1	2019-01-01	1	1	sdf
\.


--
-- TOC entry 2966 (class 0 OID 24951)
-- Dependencies: 199
-- Data for Name: Account; Type: TABLE DATA; Schema: Ordering; Owner: dvasilakis
--

COPY "Ordering"."Account" ("Id", "ContractId", "Number", "Start", "End", "AmountPure", "AmountFpa", "AmountTotal", "ProtocolNumber", "ProtocolDate", "AmountFullWritten", "IsFirstOfTheYear", "WorkConfirmationDate", "DeliveryGoodsDate", "DocumentDate", "DateCreated", "DateModified", "FirstAccountProtocolNumber", "FirstAccountProtocolDate", "RemainAmountOfContract") FROM stdin;
50	52	1	2019-02-04	2019-04-04	5	1.20000005	6.19999981	1223	2019-08-07	ΕΞΙ ΕΥΡΩ KAI ΕΙΚΟΣΙ ΛΕΠΤΩΝ	t	2020-03-02	2020-02-02	2019-10-02	2019-08-07	2019-08-27	\N	2019-08-07	2323
51	53	1	2019-01-01	2019-01-01	256.890015	61.6500015	318.540009	\N	2019-08-23	ΤΡΙΑΚΟΣΙΩΝ ΔΕΚΑ ΟΚΤΩ ΕΥΡΩ KAI ΠΕΝΗΝΤΑ ΤΕΣΣΑΡΩΝ ΛΕΠΤΩΝ	f	2019-01-01	2019-01-01	2019-01-01	2019-08-23	2019-08-28	\N	2019-08-23	2781.45996
\.


--
-- TOC entry 2988 (class 0 OID 25162)
-- Dependencies: 221
-- Data for Name: Agencies; Type: TABLE DATA; Schema: Ordering; Owner: dvasilakis
--

COPY "Ordering"."Agencies" ("Id", "Name") FROM stdin;
1	Εταιρεία Ανάπτυξης και Τουριστικής Προβολής Αθηνών (ΕΑΤΑ)
2	ΔΑΕΜ Α.Ε. - Ανώνυμη Αναπτυξιακή Εταιρεία Μηχανογράφησης & Επιχειρησιακών Μονάδων ΟΤΑ του Δήμου Αθηναίων\r\n
\.


--
-- TOC entry 2968 (class 0 OID 24959)
-- Dependencies: 201
-- Data for Name: CC; Type: TABLE DATA; Schema: Ordering; Owner: dvasilakis
--

COPY "Ordering"."CC" ("Id", "AccountId", "CC1", "CC2", "ccType", "Order") FROM stdin;
73	50	3	10	1	1
74	50	3	11	1	2
75	51	3	10	1	1
76	51	1	-1	2	2
\.


--
-- TOC entry 2970 (class 0 OID 24972)
-- Dependencies: 203
-- Data for Name: Contract; Type: TABLE DATA; Schema: Ordering; Owner: dvasilakis
--

COPY "Ordering"."Contract" ("Id", "ContractTypeId", "Title", "ProtocolNumber", "ProtocolDate", "KAE", "Actor", "CodeDirection", "AwardNumber", "AwardDate", "AwardAda", "CpvCode", "CpvTitle", "AmountPure", "AmountFpa", "AmountTotal", "PaidAmountPure", "PaidAmountFpa", "PaidAmountTotal", "Balance", "Start", "End", "NumberOfAccounts", "DateCreated", "DateModified", "DirectionId", "DepartmentId", "ConcessionaireName", "ConcessionaireAFM") FROM stdin;
52	1	Contract 1	1	2019-01-01	12	12	12	1	2019-01-01	sdfsdf	123	123r	100	24	124	17	4.07999992	21.0799999	\N	2019-01-01	2019-01-01	8	2019-08-07 11:22:39	2019-08-09 10:23:05	2	4	Anadoxos 1 	s234sdf23
53	2	Contract 2	2	2019-01-01	123	12	123	77	2024-03-03	DFGERTER	cpv code 1	cpv title	2500	600	3100	342.119995	82.1100006	424.230011	\N	2019-03-04	2022-06-07	5	2019-08-23 12:08:38	2019-08-23 12:27:51	3	12	Anadoxos 2	123123
\.


--
-- TOC entry 2971 (class 0 OID 24978)
-- Dependencies: 204
-- Data for Name: ContractType; Type: TABLE DATA; Schema: Ordering; Owner: dvasilakis
--

COPY "Ordering"."ContractType" ("ContractTypeId", "ContractTypeName") FROM stdin;
1	Δημόσιας Ανάθεσης
2	Προγραμματική
\.


--
-- TOC entry 2974 (class 0 OID 24985)
-- Dependencies: 207
-- Data for Name: Department; Type: TABLE DATA; Schema: Ordering; Owner: dvasilakis
--

COPY "Ordering"."Department" ("DepartmentId", "DirectionId", "DepartmentName", "DepartmentSupervisor", "DepartmentTelephone", "DepartmentEmail") FROM stdin;
62	21	Διοικητικής Υποστήριξης & Ηλεκτρονικής Διακυβέρνησης	Τάτση Ζαφειρούλα	210 5277938	t.dioikitikis.ypostirixis.astikis.katastasis@athens.gr
63	21	Έκδοσης Πιστοποιητικών	Κοντού Αικατερίνη	210 3722067	t.ekd.pistopoiitikon@athens.gr
64	21	Μητρώου Αρρένων	Καγιά - Παναγοπούλου Αμαλία	210 3722119	t.mitroou.arrenon@athens.gr
65	21	Ιθαγένειας, Δημοτολογίου και Εκλογικών Καταλόγων	Τσιχριτζή Αμαλία	210 3722102	 t.ith.dimotologiou@athens.gr
10	3	Προμηθειών, Προγραμματισμού, Τεκμηρίωσης Αιτημάτων και Ηλεκτρονικής Διακυβέρνησης	Μπουρνά Βούλα	210.5225617	t.promitheion@athens.gr
11	3	Διαδικασιών Σύναψης Δημοσίων Συμβάσεων	Μπιμπούδης Παναγιώτης	213.2082956	t.prom.dimoprasies@athens.gr
12	3	Αποθηκών Υλικών	Κακριδά  Άννα	210.5225068	t.apothikon.ylikon@athens.gr
13	3	Διαχείρισης Καυσίμων και Λιπαντικών	Τσιλάβης Γεώργιος	210.3460146	t.diax.kausimon.lipantikon@athens.gr
4	2	Τεχνολογίας, Πληροφορικής και Επικοινωνιών	Χατζηευστρατίου Ιωάννης	210.5277169	i.chatzieustratiou@athens.gr
5	2	Ανθεκτικότητας και Βιωσιμότητας	Νεοφύτου Γεώργιος	210.3721553	t.anthektikotitas.biosimotitas@athens.gr
7	2	Στρατηγικού Σχεδιασμού και Προγραμματισμού	Κοντώσης Ηλίας	210.5277160	t.stratigikou.sxediasmou.progr@athens.gr
6	2	Καινοτομίας και Εξωστρέφειας	Παπακωνσταντίνου - Παπαδοπούλου Έλλη	210.5277109	t.kainotomias.exostrefias@athens.gr
66	21	Γεννήσεων	Δασκαλάκη Ανδριάνα	210 5277987	t.genniseon@athens.gr
3	2	Διαχείρισης Γεωχωρικών Δεδομένων Πόλεως\r\n	Μαρούγκα Κωνσταντίνα	210.5277185	t.gis@athens.gr
14	2	test create new department	myself	2154854654	dvasialskdf@asdfsd.com
67	21	Γάμων – Θανάτων	Φρανσέ Αλέγρη	210 5277966	t.gamon.thanaton@athens.gr
68	21	Πολιτικών Γάμων	Θεωνά Ελένη-Άννα	210 3722165	t.politikon.gamon@athens.gr
49	2	bn_2	bn1	bn1	bn1
2	2	Διοικητικής Υποστήριξης, Τεκμηρίωσης και Ηλεκτρονικής Διακυβέρνησης	Πριόβολου Καλλιόπη	210.5277110	t.dioikitikis.ypostirixis.strat.sxed@athens.gr
50	15	Διοικητικής Υποστήριξης & Ηλεκτρονικής Διακυβέρνησης	Γιώργος Σκαφίδας	210 5277071	t.dioikitikis.ypostirixis.apokentrosi@athens.gr
52	15	Εξυπηρέτησης Δημοτών και Επαγγελματιών 1ης Δημοτικής Κοινότητας	Σταματογιαννόπουλος Νικόλαος	210 5277963	t.dk1@athens.gr
53	15	Εξυπηρέτησης Δημοτών και Επαγγελματιών 2ης Δημοτικής Κοινότητας	Καραθανάση Βαρβάρα	210 7567860	t.dk2@athens.gr
54	15	Εξυπηρέτησης Δημοτών και Επαγγελματιών 3ης Δημοτικής Κοινότητας	Τσιπούρα Ελένη	210 3424343	t.dk3@athens.gr
55	15	Εξυπηρέτησης Δημοτών και Επαγγελματιών 4ης Δημοτικής Κοινότητας	Νανούρης Ιωάννης	210 5149940	t.dk4@athens.gr
56	15	Εξυπηρέτησης Δημοτών και Επαγγελματιών 5ης Δημοτικής Κοινότητας	Νικολάου Κωνσταντίνος	210 8646790	t.dk5@athens.gr
57	15	Εξυπηρέτησης Δημοτών και Επαγγελματιών 6ης Δημοτικής Κοινότητας	Αναγνωστοπούλου Σοφία	210 8668162	t.dk6@athens.gr
58	15	Εξυπηρέτησης Δημοτών και Επαγγελματιών 7ης Δημοτικής Κοινότητας	Μήτσης Νικόλαος	210 6998832	t.dk7@athens.gr
51	15	Διοικητικού, Εποπτείας και Συντονισμού Δημοτικών Κοινοτήτων	Γλάρου Ιωάννα	210 5277501	t.dioikitiko@athens.gr
59	20	Εξυπηρέτησης Πολιτών	Παπαχαραλάμπους Δημήτριος	210 3303075	t.exipiretisis.politon@athens.gr
60	20	Εσωτερικής Ανταπόκρισης	Φεραδούρου Αναστασία	210 3836871	t.esoterikis.antapokrisis@athens.gr
61	20	Εξωτερικών Εφαρμογών	Γούλας Κωνσταντίνος	210 3836871	t.exoterikon.efarmogon@athens.gr
\.


--
-- TOC entry 2976 (class 0 OID 24993)
-- Dependencies: 209
-- Data for Name: Direction; Type: TABLE DATA; Schema: Ordering; Owner: dvasilakis
--

COPY "Ordering"."Direction" ("DirectionId", "DirectionName", "DirectionSupervisor", "DirectionTelephone", "DirectionEmail", "DirectionAddress", "DirectionPostCode", "DirectionCity") FROM stdin;
3	Προμηθειών και Αποθηκών	Βακουντούζης Ιωάννης	210.5225446	d.prom.apothikon@athens.gr	Κων/νου Παλαιολόγου 9	104 38	Αθήνα
2	Στρατηγικού Σχεδιασμού, Ανθεκτικότητας, Καινοτομίας και Τεκμηρίωσης	Δρ. Κακριδά Ουρανία	210.5277110	d.stratigikou.sxediasmou@athens.gr	Λιοσίων 22	104 38	Αθήνα
15	Αποκέντρωσης και Διοίκησης	Νεμπεγλεριώτης Ευάγγελος	210 5277541	d.apokentrosi.dioikisi@athens.gr	Λιοσίων 22	104 38	Αθήνα
20	Κέντρων Εξυπηρέτησης Πολιτών (Κ.Ε.Π)	Αυγερινός Δημήτριος	210 3836522	d.kep@athens.gr	Ακαδημίας 88	106 78	Αθήνα
21	Αστικής Κατάστασης	Μπούρη Βασιλική	210 3722173	d.ast.katastasis@athens.gr	Αθηνάς 63	10552	Αθήνα
\.


--
-- TOC entry 2978 (class 0 OID 25001)
-- Dependencies: 211
-- Data for Name: DocumentSignatory; Type: TABLE DATA; Schema: Ordering; Owner: dvasilakis
--

COPY "Ordering"."DocumentSignatory" ("Id", "AccountId", "SignatoryTypeId", "SignatoryId", "DocumentType", "Absense") FROM stdin;
86	50	1	1	1	f
87	50	5	2	1	f
88	50	4	3	1	t
89	50	4	3	2	t
90	51	1	1	1	f
91	51	5	2	1	f
92	51	4	3	1	t
93	51	4	3	2	t
\.


--
-- TOC entry 2979 (class 0 OID 25004)
-- Dependencies: 212
-- Data for Name: Invoice; Type: TABLE DATA; Schema: Ordering; Owner: dvasilakis
--

COPY "Ordering"."Invoice" ("Id", "AccountId", "Number", "Date", "DeliveredDateProtocolNumber", "DeliveredDateProtocolDate") FROM stdin;
34	50	2343	2018-12-31	2314	3219-12-31
35	51	123	2019-01-01	1	2019-01-01
\.


--
-- TOC entry 2995 (class 0 OID 25297)
-- Dependencies: 228
-- Data for Name: LogError; Type: TABLE DATA; Schema: Ordering; Owner: dvasilakis
--

COPY "Ordering"."LogError" ("Id", "Username", "ErrorMessage", "DateCreated") FROM stdin;
38	dvasilakis	Message: relation "Ordering.Departmen" does not exist\nStack: error: relation "Ordering.Departmen" does not exist\n    at Connection.parseE (c:\\Github\\ordering\\server\\node_modules\\pg\\lib\\connection.js:602:11)\n    at Connection.parseMessage (c:\\Github\\ordering\\server\\node_modules\\pg\\lib\\connection.js:399:19)\n    at Socket.<anonymous> (c:\\Github\\ordering\\server\\node_modules\\pg\\lib\\connection.js:121:22)\n    at Socket.emit (events.js:189:13)\n    at addChunk (_stream_readable.js:284:12)\n    at readableAddChunk (_stream_readable.js:265:11)\n    at Socket.Readable.push (_stream_readable.js:220:10)\n    at TCP.onStreamRead [as onread] (internal/stream_base_commons.js:94:17)\n	2019-08-01
39	dvasilakis	Message: relation "Ordering.Departmen" does not exist\nStack: error: relation "Ordering.Departmen" does not exist\n    at Connection.parseE (c:\\Github\\ordering\\server\\node_modules\\pg\\lib\\connection.js:602:11)\n    at Connection.parseMessage (c:\\Github\\ordering\\server\\node_modules\\pg\\lib\\connection.js:399:19)\n    at Socket.<anonymous> (c:\\Github\\ordering\\server\\node_modules\\pg\\lib\\connection.js:121:22)\n    at Socket.emit (events.js:189:13)\n    at addChunk (_stream_readable.js:284:12)\n    at readableAddChunk (_stream_readable.js:265:11)\n    at Socket.Readable.push (_stream_readable.js:220:10)\n    at TCP.onStreamRead [as onread] (internal/stream_base_commons.js:94:17)\n	2019-08-01
40	dvasilakis	Message: null value in column "ContractId" violates not-null constraint\nStack: error: null value in column "ContractId" violates not-null constraint\n    at Connection.parseE (c:\\Github\\ordering\\server\\node_modules\\pg\\lib\\connection.js:602:11)\n    at Connection.parseMessage (c:\\Github\\ordering\\server\\node_modules\\pg\\lib\\connection.js:399:19)\n    at Socket.<anonymous> (c:\\Github\\ordering\\server\\node_modules\\pg\\lib\\connection.js:121:22)\n    at Socket.emit (events.js:189:13)\n    at addChunk (_stream_readable.js:284:12)\n    at readableAddChunk (_stream_readable.js:265:11)\n    at Socket.Readable.push (_stream_readable.js:220:10)\n    at TCP.onStreamRead [as onread] (internal/stream_base_commons.js:94:17)\n	2019-08-07
41	dvasilakis	Message: null value in column "Number" violates not-null constraint\nStack: error: null value in column "Number" violates not-null constraint\n    at Connection.parseE (c:\\Github\\ordering\\server\\node_modules\\pg\\lib\\connection.js:602:11)\n    at Connection.parseMessage (c:\\Github\\ordering\\server\\node_modules\\pg\\lib\\connection.js:399:19)\n    at Socket.<anonymous> (c:\\Github\\ordering\\server\\node_modules\\pg\\lib\\connection.js:121:22)\n    at Socket.emit (events.js:189:13)\n    at addChunk (_stream_readable.js:284:12)\n    at readableAddChunk (_stream_readable.js:265:11)\n    at Socket.Readable.push (_stream_readable.js:220:10)\n    at TCP.onStreamRead [as onread] (internal/stream_base_commons.js:94:17)\n	2019-08-07
42	dvasilakis	Message: null value in column "Number" violates not-null constraint\nStack: error: null value in column "Number" violates not-null constraint\n    at Connection.parseE (c:\\Github\\ordering\\server\\node_modules\\pg\\lib\\connection.js:602:11)\n    at Connection.parseMessage (c:\\Github\\ordering\\server\\node_modules\\pg\\lib\\connection.js:399:19)\n    at Socket.<anonymous> (c:\\Github\\ordering\\server\\node_modules\\pg\\lib\\connection.js:121:22)\n    at Socket.emit (events.js:189:13)\n    at addChunk (_stream_readable.js:284:12)\n    at readableAddChunk (_stream_readable.js:265:11)\n    at Socket.Readable.push (_stream_readable.js:220:10)\n    at TCP.onStreamRead [as onread] (internal/stream_base_commons.js:94:17)\n	2019-08-07
43	dvasilakis	Message: null value in column "Number" violates not-null constraint\nStack: error: null value in column "Number" violates not-null constraint\n    at Connection.parseE (c:\\Github\\ordering\\server\\node_modules\\pg\\lib\\connection.js:602:11)\n    at Connection.parseMessage (c:\\Github\\ordering\\server\\node_modules\\pg\\lib\\connection.js:399:19)\n    at Socket.<anonymous> (c:\\Github\\ordering\\server\\node_modules\\pg\\lib\\connection.js:121:22)\n    at Socket.emit (events.js:189:13)\n    at addChunk (_stream_readable.js:284:12)\n    at readableAddChunk (_stream_readable.js:265:11)\n    at Socket.Readable.push (_stream_readable.js:220:10)\n    at TCP.onStreamRead [as onread] (internal/stream_base_commons.js:94:17)\n	2019-08-07
\.


--
-- TOC entry 2986 (class 0 OID 25136)
-- Dependencies: 219
-- Data for Name: Reservations; Type: TABLE DATA; Schema: Ordering; Owner: dvasilakis
--

COPY "Ordering"."Reservations" ("Id", "Name", "Percentage", "Stamp", "StampOGA", "IsReservation", "Order") FROM stdin;
2	Ε.Α.Α.ΔΗ.ΣΥ.	0.0700000003	3	20	t	1
5	Α.Ε.Π.Π	0.0599999987	3	20	t	2
8	Φ.Ε.	8	\N	\N	t	3
23	Φ.Π.Α.	24	\N	\N	f	\N
\.


--
-- TOC entry 2981 (class 0 OID 25009)
-- Dependencies: 214
-- Data for Name: Signatory; Type: TABLE DATA; Schema: Ordering; Owner: dvasilakis
--

COPY "Ordering"."Signatory" ("Id", "Name") FROM stdin;
1	ΦΩΤΕΙΝΗ ΤΣΟΤΡΑ
2	ΙΩΑΝΝΗΣ ΧΑΤΖΗΕΥΣΤΡΑΤΙΟΥ
3	ΠΑΠΑΚΩΝΣΤΑΝΤΙΝΟΥ – ΠΑΠΑΔΟΠΟΥΛΟΥ ΕΛΛΗ
4	ΔΡ. ΟΥΡΑΝΙΑ ΚΑΚΡΙΔΑ
\.


--
-- TOC entry 2982 (class 0 OID 25012)
-- Dependencies: 215
-- Data for Name: SignatoryType; Type: TABLE DATA; Schema: Ordering; Owner: dvasilakis
--

COPY "Ordering"."SignatoryType" ("Id", "Name") FROM stdin;
2	Ο ΣΥΝΤΑΚΤΗΣ
1	Η ΣΥΝΤΑΞΑΣΑ
3	Ο ΠΡΟΪΣΤΑΜΕΝΟΣ ΔΙΕΥΘΥΝΣΗΣ
5	Ο  ΠΡΟΪΣΤΑΜΕΝΟΣ ΤΜΗΜΑΤΟΣ
6	Η ΠΡΟΪΣΤΑΜΕΝΗ ΤΜΗΜΑΤΟΣ
4	Η ΠΡΟΪΣΤΑΜΕΝΗ ΔΙΕΥΘΥΝΣΗΣ
\.


--
-- TOC entry 2991 (class 0 OID 25267)
-- Dependencies: 224
-- Data for Name: User; Type: TABLE DATA; Schema: Ordering; Owner: dvasilakis
--

COPY "Ordering"."User" ("Id", "Username", "Password", "Role") FROM stdin;
3	admin	$2a$10$80mc2Ltf0DBkNvpzkQu51utFnve2iH62IVPO8vGefn2XPrQKvUtti	1
9	jimakos	$2a$10$eblCqvXGQMajWXM05ck0UeoA9YdQhK0ZOSkPd6dOzod3E7sVbgsWG	2
16	test1	test1	2
4	dvasilakis	$2a$10$garRdP9dHno9poUNHgd3C.qfxI0eVcRAVMYOfmFELz9ysm.gcB8hu	1
\.


--
-- TOC entry 2993 (class 0 OID 25281)
-- Dependencies: 226
-- Data for Name: UserRoles; Type: TABLE DATA; Schema: Ordering; Owner: dvasilakis
--

COPY "Ordering"."UserRoles" ("Id", "Name") FROM stdin;
1	Admin\r\n
2	Superuser
3	Create\r\n
4	Edit\r\n
5	Delete\r\n
6	View\r\n
\.


--
-- TOC entry 3016 (class 0 OID 0)
-- Dependencies: 198
-- Name: AAY_Id_seq; Type: SEQUENCE SET; Schema: Ordering; Owner: dvasilakis
--

SELECT pg_catalog.setval('"Ordering"."AAY_Id_seq"', 41, true);


--
-- TOC entry 3017 (class 0 OID 0)
-- Dependencies: 200
-- Name: Account_Id_seq; Type: SEQUENCE SET; Schema: Ordering; Owner: dvasilakis
--

SELECT pg_catalog.setval('"Ordering"."Account_Id_seq"', 51, true);


--
-- TOC entry 3018 (class 0 OID 0)
-- Dependencies: 202
-- Name: CC_Id_seq; Type: SEQUENCE SET; Schema: Ordering; Owner: dvasilakis
--

SELECT pg_catalog.setval('"Ordering"."CC_Id_seq"', 76, true);


--
-- TOC entry 3019 (class 0 OID 0)
-- Dependencies: 205
-- Name: ContractType_Id_seq; Type: SEQUENCE SET; Schema: Ordering; Owner: dvasilakis
--

SELECT pg_catalog.setval('"Ordering"."ContractType_Id_seq"', 15, true);


--
-- TOC entry 3020 (class 0 OID 0)
-- Dependencies: 206
-- Name: Contract_Id_seq; Type: SEQUENCE SET; Schema: Ordering; Owner: dvasilakis
--

SELECT pg_catalog.setval('"Ordering"."Contract_Id_seq"', 53, true);


--
-- TOC entry 3021 (class 0 OID 0)
-- Dependencies: 208
-- Name: Department_Id_seq; Type: SEQUENCE SET; Schema: Ordering; Owner: dvasilakis
--

SELECT pg_catalog.setval('"Ordering"."Department_Id_seq"', 68, true);


--
-- TOC entry 3022 (class 0 OID 0)
-- Dependencies: 210
-- Name: Direction_Id_seq; Type: SEQUENCE SET; Schema: Ordering; Owner: dvasilakis
--

SELECT pg_catalog.setval('"Ordering"."Direction_Id_seq"', 21, true);


--
-- TOC entry 3023 (class 0 OID 0)
-- Dependencies: 213
-- Name: Invoice_Id_seq; Type: SEQUENCE SET; Schema: Ordering; Owner: dvasilakis
--

SELECT pg_catalog.setval('"Ordering"."Invoice_Id_seq"', 35, true);


--
-- TOC entry 3024 (class 0 OID 0)
-- Dependencies: 227
-- Name: LogError_Id_seq; Type: SEQUENCE SET; Schema: Ordering; Owner: dvasilakis
--

SELECT pg_catalog.setval('"Ordering"."LogError_Id_seq"', 43, true);


--
-- TOC entry 3025 (class 0 OID 0)
-- Dependencies: 220
-- Name: MunicipalAgencies_Id_seq; Type: SEQUENCE SET; Schema: Ordering; Owner: dvasilakis
--

SELECT pg_catalog.setval('"Ordering"."MunicipalAgencies_Id_seq"', 10, true);


--
-- TOC entry 3026 (class 0 OID 0)
-- Dependencies: 218
-- Name: Reservations_Id_seq; Type: SEQUENCE SET; Schema: Ordering; Owner: dvasilakis
--

SELECT pg_catalog.setval('"Ordering"."Reservations_Id_seq"', 26, true);


--
-- TOC entry 3027 (class 0 OID 0)
-- Dependencies: 216
-- Name: SignatoryType_Id_seq; Type: SEQUENCE SET; Schema: Ordering; Owner: dvasilakis
--

SELECT pg_catalog.setval('"Ordering"."SignatoryType_Id_seq"', 8, true);


--
-- TOC entry 3028 (class 0 OID 0)
-- Dependencies: 217
-- Name: Signatory_Id_seq; Type: SEQUENCE SET; Schema: Ordering; Owner: dvasilakis
--

SELECT pg_catalog.setval('"Ordering"."Signatory_Id_seq"', 8, true);


--
-- TOC entry 3029 (class 0 OID 0)
-- Dependencies: 225
-- Name: UserRoles_Id_seq; Type: SEQUENCE SET; Schema: Ordering; Owner: dvasilakis
--

SELECT pg_catalog.setval('"Ordering"."UserRoles_Id_seq"', 6, true);


--
-- TOC entry 3030 (class 0 OID 0)
-- Dependencies: 223
-- Name: User_Id_seq; Type: SEQUENCE SET; Schema: Ordering; Owner: dvasilakis
--

SELECT pg_catalog.setval('"Ordering"."User_Id_seq"', 18, true);


--
-- TOC entry 3031 (class 0 OID 0)
-- Dependencies: 222
-- Name: documentsignatory_id_seq; Type: SEQUENCE SET; Schema: Ordering; Owner: dvasilakis
--

SELECT pg_catalog.setval('"Ordering".documentsignatory_id_seq', 93, true);


--
-- TOC entry 2801 (class 2606 OID 25031)
-- Name: AAY AAY_pkey; Type: CONSTRAINT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."AAY"
    ADD CONSTRAINT "AAY_pkey" PRIMARY KEY ("Id");


--
-- TOC entry 2803 (class 2606 OID 25033)
-- Name: Account Account_pkey; Type: CONSTRAINT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."Account"
    ADD CONSTRAINT "Account_pkey" PRIMARY KEY ("Id");


--
-- TOC entry 2805 (class 2606 OID 25035)
-- Name: CC CC_pkey; Type: CONSTRAINT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."CC"
    ADD CONSTRAINT "CC_pkey" PRIMARY KEY ("Id");


--
-- TOC entry 2809 (class 2606 OID 25039)
-- Name: ContractType ContractType_ContactType_pkey; Type: CONSTRAINT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."ContractType"
    ADD CONSTRAINT "ContractType_ContactType_pkey" PRIMARY KEY ("ContractTypeId");


--
-- TOC entry 2807 (class 2606 OID 25041)
-- Name: Contract Contract_pkey; Type: CONSTRAINT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."Contract"
    ADD CONSTRAINT "Contract_pkey" PRIMARY KEY ("Id");


--
-- TOC entry 2811 (class 2606 OID 25043)
-- Name: Department Department_pkey; Type: CONSTRAINT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."Department"
    ADD CONSTRAINT "Department_pkey" PRIMARY KEY ("DepartmentId");


--
-- TOC entry 2813 (class 2606 OID 25045)
-- Name: Direction Direction_pkey; Type: CONSTRAINT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."Direction"
    ADD CONSTRAINT "Direction_pkey" PRIMARY KEY ("DirectionId");


--
-- TOC entry 2815 (class 2606 OID 25206)
-- Name: DocumentSignatory DocumentSignatories_pkey; Type: CONSTRAINT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."DocumentSignatory"
    ADD CONSTRAINT "DocumentSignatories_pkey" PRIMARY KEY ("Id");


--
-- TOC entry 2817 (class 2606 OID 25049)
-- Name: Invoice Invoice_pkey; Type: CONSTRAINT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."Invoice"
    ADD CONSTRAINT "Invoice_pkey" PRIMARY KEY ("Id");


--
-- TOC entry 2831 (class 2606 OID 25305)
-- Name: LogError LogError_pkey; Type: CONSTRAINT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."LogError"
    ADD CONSTRAINT "LogError_pkey" PRIMARY KEY ("Id");


--
-- TOC entry 2825 (class 2606 OID 25170)
-- Name: Agencies MunicipalAgencies_pkey; Type: CONSTRAINT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."Agencies"
    ADD CONSTRAINT "MunicipalAgencies_pkey" PRIMARY KEY ("Id");


--
-- TOC entry 2823 (class 2606 OID 25141)
-- Name: Reservations Reservations_pkey; Type: CONSTRAINT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."Reservations"
    ADD CONSTRAINT "Reservations_pkey" PRIMARY KEY ("Id");


--
-- TOC entry 2821 (class 2606 OID 25051)
-- Name: SignatoryType SignatoryType_pkey; Type: CONSTRAINT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."SignatoryType"
    ADD CONSTRAINT "SignatoryType_pkey" PRIMARY KEY ("Id");


--
-- TOC entry 2819 (class 2606 OID 25053)
-- Name: Signatory Signatory_pkey; Type: CONSTRAINT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."Signatory"
    ADD CONSTRAINT "Signatory_pkey" PRIMARY KEY ("Id");


--
-- TOC entry 2829 (class 2606 OID 25289)
-- Name: UserRoles UserRoles_pkey; Type: CONSTRAINT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."UserRoles"
    ADD CONSTRAINT "UserRoles_pkey" PRIMARY KEY ("Id");


--
-- TOC entry 2827 (class 2606 OID 25272)
-- Name: User User_pkey; Type: CONSTRAINT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY ("Id");


--
-- TOC entry 2832 (class 2606 OID 25215)
-- Name: AAY AAY_fk; Type: FK CONSTRAINT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."AAY"
    ADD CONSTRAINT "AAY_fk" FOREIGN KEY ("AccountId") REFERENCES "Ordering"."Account"("Id") ON DELETE CASCADE;


--
-- TOC entry 2833 (class 2606 OID 25220)
-- Name: Account Account_fk; Type: FK CONSTRAINT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."Account"
    ADD CONSTRAINT "Account_fk" FOREIGN KEY ("ContractId") REFERENCES "Ordering"."Contract"("Id") ON DELETE CASCADE;


--
-- TOC entry 2834 (class 2606 OID 25225)
-- Name: CC CC_fk; Type: FK CONSTRAINT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."CC"
    ADD CONSTRAINT "CC_fk" FOREIGN KEY ("AccountId") REFERENCES "Ordering"."Account"("Id") ON DELETE CASCADE;


--
-- TOC entry 2835 (class 2606 OID 25069)
-- Name: Contract Contract_fk; Type: FK CONSTRAINT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."Contract"
    ADD CONSTRAINT "Contract_fk" FOREIGN KEY ("ContractTypeId") REFERENCES "Ordering"."ContractType"("ContractTypeId");


--
-- TOC entry 2836 (class 2606 OID 25100)
-- Name: Contract Contract_fk2; Type: FK CONSTRAINT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."Contract"
    ADD CONSTRAINT "Contract_fk2" FOREIGN KEY ("DirectionId") REFERENCES "Ordering"."Direction"("DirectionId");


--
-- TOC entry 2837 (class 2606 OID 25105)
-- Name: Contract Contract_fk3; Type: FK CONSTRAINT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."Contract"
    ADD CONSTRAINT "Contract_fk3" FOREIGN KEY ("DepartmentId") REFERENCES "Ordering"."Department"("DepartmentId");


--
-- TOC entry 2838 (class 2606 OID 25290)
-- Name: Department Department_fk; Type: FK CONSTRAINT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."Department"
    ADD CONSTRAINT "Department_fk" FOREIGN KEY ("DirectionId") REFERENCES "Ordering"."Direction"("DirectionId") ON DELETE CASCADE;


--
-- TOC entry 2839 (class 2606 OID 25230)
-- Name: DocumentSignatory DocumentSignatories_fk; Type: FK CONSTRAINT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."DocumentSignatory"
    ADD CONSTRAINT "DocumentSignatories_fk" FOREIGN KEY ("SignatoryTypeId") REFERENCES "Ordering"."SignatoryType"("Id") ON DELETE CASCADE;


--
-- TOC entry 2840 (class 2606 OID 25235)
-- Name: DocumentSignatory DocumentSignatories_fk1; Type: FK CONSTRAINT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."DocumentSignatory"
    ADD CONSTRAINT "DocumentSignatories_fk1" FOREIGN KEY ("AccountId") REFERENCES "Ordering"."Account"("Id") ON DELETE CASCADE;


--
-- TOC entry 2841 (class 2606 OID 25240)
-- Name: DocumentSignatory DocumentSignatories_fk2; Type: FK CONSTRAINT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."DocumentSignatory"
    ADD CONSTRAINT "DocumentSignatories_fk2" FOREIGN KEY ("SignatoryId") REFERENCES "Ordering"."Signatory"("Id") ON DELETE CASCADE;


--
-- TOC entry 2842 (class 2606 OID 25245)
-- Name: Invoice Invoice_fk; Type: FK CONSTRAINT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."Invoice"
    ADD CONSTRAINT "Invoice_fk" FOREIGN KEY ("AccountId") REFERENCES "Ordering"."Account"("Id") ON DELETE CASCADE;


-- Completed on 2019-09-04 14:43:35

--
-- PostgreSQL database dump complete
--

