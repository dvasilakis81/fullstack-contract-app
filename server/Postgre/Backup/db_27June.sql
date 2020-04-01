--
-- PostgreSQL database dump
--

-- Dumped from database version 11.2
-- Dumped by pg_dump version 11.1

-- Started on 2019-06-27 16:26:02

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
-- TOC entry 2990 (class 0 OID 0)
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
-- TOC entry 2991 (class 0 OID 0)
-- Dependencies: 200
-- Name: Account_Id_seq; Type: SEQUENCE OWNED BY; Schema: Ordering; Owner: dvasilakis
--

ALTER SEQUENCE "Ordering"."Account_Id_seq" OWNED BY "Ordering"."Account"."Id";


--
-- TOC entry 223 (class 1259 OID 25162)
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
-- TOC entry 2992 (class 0 OID 0)
-- Dependencies: 202
-- Name: CC_Id_seq; Type: SEQUENCE OWNED BY; Schema: Ordering; Owner: dvasilakis
--

ALTER SEQUENCE "Ordering"."CC_Id_seq" OWNED BY "Ordering"."CC"."Id";


--
-- TOC entry 203 (class 1259 OID 24964)
-- Name: Concessionaire; Type: TABLE; Schema: Ordering; Owner: dvasilakis
--

CREATE TABLE "Ordering"."Concessionaire" (
    "ConcessionaireId" bigint NOT NULL,
    "ArticleDocumentTransition" character varying(5),
    "ArticleDocumentAccount" character varying(5),
    "ConcessionaireName" character varying(1000),
    "ConcessionaireAFM" character varying(20)
);
ALTER TABLE ONLY "Ordering"."Concessionaire" ALTER COLUMN "ArticleDocumentAccount" SET STATISTICS 0;


ALTER TABLE "Ordering"."Concessionaire" OWNER TO dvasilakis;

--
-- TOC entry 204 (class 1259 OID 24970)
-- Name: Concessionaire_Id_seq; Type: SEQUENCE; Schema: Ordering; Owner: dvasilakis
--

CREATE SEQUENCE "Ordering"."Concessionaire_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "Ordering"."Concessionaire_Id_seq" OWNER TO dvasilakis;

--
-- TOC entry 2993 (class 0 OID 0)
-- Dependencies: 204
-- Name: Concessionaire_Id_seq; Type: SEQUENCE OWNED BY; Schema: Ordering; Owner: dvasilakis
--

ALTER SEQUENCE "Ordering"."Concessionaire_Id_seq" OWNED BY "Ordering"."Concessionaire"."ConcessionaireId";


--
-- TOC entry 205 (class 1259 OID 24972)
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
-- TOC entry 206 (class 1259 OID 24978)
-- Name: ContractType; Type: TABLE; Schema: Ordering; Owner: dvasilakis
--

CREATE TABLE "Ordering"."ContractType" (
    "ContractTypeId" bigint NOT NULL,
    "ContractTypeName" character varying(255)
);


ALTER TABLE "Ordering"."ContractType" OWNER TO dvasilakis;

--
-- TOC entry 207 (class 1259 OID 24981)
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
-- TOC entry 2994 (class 0 OID 0)
-- Dependencies: 207
-- Name: ContractType_Id_seq; Type: SEQUENCE OWNED BY; Schema: Ordering; Owner: dvasilakis
--

ALTER SEQUENCE "Ordering"."ContractType_Id_seq" OWNED BY "Ordering"."ContractType"."ContractTypeId";


--
-- TOC entry 208 (class 1259 OID 24983)
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
-- TOC entry 2995 (class 0 OID 0)
-- Dependencies: 208
-- Name: Contract_Id_seq; Type: SEQUENCE OWNED BY; Schema: Ordering; Owner: dvasilakis
--

ALTER SEQUENCE "Ordering"."Contract_Id_seq" OWNED BY "Ordering"."Contract"."Id";


--
-- TOC entry 209 (class 1259 OID 24985)
-- Name: Department; Type: TABLE; Schema: Ordering; Owner: dvasilakis
--

CREATE TABLE "Ordering"."Department" (
    "DepartmentId" smallint NOT NULL,
    "DirectionId" smallint,
    "DepartmentName" character varying(2000),
    "DepartmentSupervisor" character varying(255),
    "DepartmentTelephone" character varying(20),
    "DepartmentEmail" character varying(255),
    "DepartmentPostCode" character varying(10),
    "DepartmentCity" character varying(50),
    "DepartmentAddress" character varying(255)
);


ALTER TABLE "Ordering"."Department" OWNER TO dvasilakis;

--
-- TOC entry 210 (class 1259 OID 24991)
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
-- TOC entry 2996 (class 0 OID 0)
-- Dependencies: 210
-- Name: Department_Id_seq; Type: SEQUENCE OWNED BY; Schema: Ordering; Owner: dvasilakis
--

ALTER SEQUENCE "Ordering"."Department_Id_seq" OWNED BY "Ordering"."Department"."DepartmentId";


--
-- TOC entry 211 (class 1259 OID 24993)
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
-- TOC entry 212 (class 1259 OID 24999)
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
-- TOC entry 2997 (class 0 OID 0)
-- Dependencies: 212
-- Name: Direction_Id_seq; Type: SEQUENCE OWNED BY; Schema: Ordering; Owner: dvasilakis
--

ALTER SEQUENCE "Ordering"."Direction_Id_seq" OWNED BY "Ordering"."Direction"."DirectionId";


--
-- TOC entry 213 (class 1259 OID 25001)
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
-- TOC entry 214 (class 1259 OID 25004)
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
-- TOC entry 215 (class 1259 OID 25007)
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
-- TOC entry 2998 (class 0 OID 0)
-- Dependencies: 215
-- Name: Invoice_Id_seq; Type: SEQUENCE OWNED BY; Schema: Ordering; Owner: dvasilakis
--

ALTER SEQUENCE "Ordering"."Invoice_Id_seq" OWNED BY "Ordering"."Invoice"."Id";


--
-- TOC entry 222 (class 1259 OID 25160)
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
-- TOC entry 2999 (class 0 OID 0)
-- Dependencies: 222
-- Name: MunicipalAgencies_Id_seq; Type: SEQUENCE OWNED BY; Schema: Ordering; Owner: dvasilakis
--

ALTER SEQUENCE "Ordering"."MunicipalAgencies_Id_seq" OWNED BY "Ordering"."Agencies"."Id";


--
-- TOC entry 221 (class 1259 OID 25136)
-- Name: Reservations; Type: TABLE; Schema: Ordering; Owner: dvasilakis
--

CREATE TABLE "Ordering"."Reservations" (
    "Id" bigint NOT NULL,
    "Name" character varying(255),
    "Percentage" real,
    "Stamp" real,
    "StampOGA" real
);


ALTER TABLE "Ordering"."Reservations" OWNER TO dvasilakis;

--
-- TOC entry 220 (class 1259 OID 25134)
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
-- TOC entry 3000 (class 0 OID 0)
-- Dependencies: 220
-- Name: Reservations_Id_seq; Type: SEQUENCE OWNED BY; Schema: Ordering; Owner: dvasilakis
--

ALTER SEQUENCE "Ordering"."Reservations_Id_seq" OWNED BY "Ordering"."Reservations"."Id";


--
-- TOC entry 216 (class 1259 OID 25009)
-- Name: Signatory; Type: TABLE; Schema: Ordering; Owner: dvasilakis
--

CREATE TABLE "Ordering"."Signatory" (
    "Id" smallint NOT NULL,
    "Name" character varying(255),
    "SignatoryType" smallint,
    "AccountId" bigint
);


ALTER TABLE "Ordering"."Signatory" OWNER TO dvasilakis;

--
-- TOC entry 217 (class 1259 OID 25012)
-- Name: SignatoryType; Type: TABLE; Schema: Ordering; Owner: dvasilakis
--

CREATE TABLE "Ordering"."SignatoryType" (
    "Id" smallint NOT NULL,
    "Name" character varying(255)
);


ALTER TABLE "Ordering"."SignatoryType" OWNER TO dvasilakis;

--
-- TOC entry 218 (class 1259 OID 25015)
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
-- TOC entry 3001 (class 0 OID 0)
-- Dependencies: 218
-- Name: SignatoryType_Id_seq; Type: SEQUENCE OWNED BY; Schema: Ordering; Owner: dvasilakis
--

ALTER SEQUENCE "Ordering"."SignatoryType_Id_seq" OWNED BY "Ordering"."SignatoryType"."Id";


--
-- TOC entry 219 (class 1259 OID 25017)
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
-- TOC entry 3002 (class 0 OID 0)
-- Dependencies: 219
-- Name: Signatory_Id_seq; Type: SEQUENCE OWNED BY; Schema: Ordering; Owner: dvasilakis
--

ALTER SEQUENCE "Ordering"."Signatory_Id_seq" OWNED BY "Ordering"."Signatory"."Id";


--
-- TOC entry 226 (class 1259 OID 25267)
-- Name: User; Type: TABLE; Schema: Ordering; Owner: dvasilakis
--

CREATE TABLE "Ordering"."User" (
    "Id" bigint NOT NULL,
    "Username" character varying(50),
    "Password" character varying(50)
);


ALTER TABLE "Ordering"."User" OWNER TO dvasilakis;

--
-- TOC entry 225 (class 1259 OID 25265)
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
-- TOC entry 3003 (class 0 OID 0)
-- Dependencies: 225
-- Name: User_Id_seq; Type: SEQUENCE OWNED BY; Schema: Ordering; Owner: dvasilakis
--

ALTER SEQUENCE "Ordering"."User_Id_seq" OWNED BY "Ordering"."User"."Id";


--
-- TOC entry 224 (class 1259 OID 25203)
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
-- TOC entry 2776 (class 2604 OID 25019)
-- Name: AAY Id; Type: DEFAULT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."AAY" ALTER COLUMN "Id" SET DEFAULT nextval('"Ordering"."AAY_Id_seq"'::regclass);


--
-- TOC entry 2777 (class 2604 OID 25020)
-- Name: Account Id; Type: DEFAULT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."Account" ALTER COLUMN "Id" SET DEFAULT nextval('"Ordering"."Account_Id_seq"'::regclass);


--
-- TOC entry 2789 (class 2604 OID 25165)
-- Name: Agencies Id; Type: DEFAULT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."Agencies" ALTER COLUMN "Id" SET DEFAULT nextval('"Ordering"."MunicipalAgencies_Id_seq"'::regclass);


--
-- TOC entry 2778 (class 2604 OID 25021)
-- Name: CC Id; Type: DEFAULT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."CC" ALTER COLUMN "Id" SET DEFAULT nextval('"Ordering"."CC_Id_seq"'::regclass);


--
-- TOC entry 2779 (class 2604 OID 25022)
-- Name: Concessionaire ConcessionaireId; Type: DEFAULT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."Concessionaire" ALTER COLUMN "ConcessionaireId" SET DEFAULT nextval('"Ordering"."Concessionaire_Id_seq"'::regclass);


--
-- TOC entry 2780 (class 2604 OID 25023)
-- Name: Contract Id; Type: DEFAULT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."Contract" ALTER COLUMN "Id" SET DEFAULT nextval('"Ordering"."Contract_Id_seq"'::regclass);


--
-- TOC entry 2781 (class 2604 OID 25024)
-- Name: ContractType ContractTypeId; Type: DEFAULT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."ContractType" ALTER COLUMN "ContractTypeId" SET DEFAULT nextval('"Ordering"."ContractType_Id_seq"'::regclass);


--
-- TOC entry 2782 (class 2604 OID 25025)
-- Name: Department DepartmentId; Type: DEFAULT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."Department" ALTER COLUMN "DepartmentId" SET DEFAULT nextval('"Ordering"."Department_Id_seq"'::regclass);


--
-- TOC entry 2783 (class 2604 OID 25026)
-- Name: Direction DirectionId; Type: DEFAULT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."Direction" ALTER COLUMN "DirectionId" SET DEFAULT nextval('"Ordering"."Direction_Id_seq"'::regclass);


--
-- TOC entry 2785 (class 2604 OID 25027)
-- Name: Invoice Id; Type: DEFAULT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."Invoice" ALTER COLUMN "Id" SET DEFAULT nextval('"Ordering"."Invoice_Id_seq"'::regclass);


--
-- TOC entry 2788 (class 2604 OID 25139)
-- Name: Reservations Id; Type: DEFAULT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."Reservations" ALTER COLUMN "Id" SET DEFAULT nextval('"Ordering"."Reservations_Id_seq"'::regclass);


--
-- TOC entry 2786 (class 2604 OID 25028)
-- Name: Signatory Id; Type: DEFAULT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."Signatory" ALTER COLUMN "Id" SET DEFAULT nextval('"Ordering"."Signatory_Id_seq"'::regclass);


--
-- TOC entry 2787 (class 2604 OID 25029)
-- Name: SignatoryType Id; Type: DEFAULT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."SignatoryType" ALTER COLUMN "Id" SET DEFAULT nextval('"Ordering"."SignatoryType_Id_seq"'::regclass);


--
-- TOC entry 2790 (class 2604 OID 25270)
-- Name: User Id; Type: DEFAULT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."User" ALTER COLUMN "Id" SET DEFAULT nextval('"Ordering"."User_Id_seq"'::regclass);


--
-- TOC entry 2955 (class 0 OID 24946)
-- Dependencies: 197
-- Data for Name: AAY; Type: TABLE DATA; Schema: Ordering; Owner: dvasilakis
--

COPY "Ordering"."AAY" ("Id", "AccountId", "Value", "Year", "ProtocolNumber", "ProtocolDate", "EadNumber", "PreviousYear", "ADA") FROM stdin;
29	30	Α00488	2019	56142	2019-01-01	487		9Ξ4ΔΩ6Μ-ΡΥ4
30	31	Α00488	2019	56142	2019-01-01	487		9Ξ4ΔΩ6Μ-ΡΥ4
31	32	Α00488	2019	56142	2019-01-01	488	123	9Ξ4ΔΩ6Μ-ΡΥ4
27	28	Α00488	2019	56142	2019-02-01	487		9Ξ4ΔΩ6Μ-ΡΥ4
32	33	Α00488	2019	56142	2019-01-01	487		9Ξ4ΔΩ6Μ-ΡΥ4
33	34	Α00488	2019	56142	2019-01-01	487		9Ξ4ΔΩ6Μ-ΡΥ4
26	27	Α00488	2019	56142	2019-01-01	487		9Ξ4ΔΩ6Μ-ΡΥ4
34	35	Α00488	2019	56142	2019-01-01	487		9Ξ4ΔΩ6Μ-ΡΥ4
28	29	Α00488	2019	56142	2019-01-01	487		9Ξ4ΔΩ6Μ-ΡΥ4
\.


--
-- TOC entry 2957 (class 0 OID 24951)
-- Dependencies: 199
-- Data for Name: Account; Type: TABLE DATA; Schema: Ordering; Owner: dvasilakis
--

COPY "Ordering"."Account" ("Id", "ContractId", "Number", "Start", "End", "AmountPure", "AmountFpa", "AmountTotal", "ProtocolNumber", "ProtocolDate", "AmountFullWritten", "IsFirstOfTheYear", "WorkConfirmationDate", "DeliveryGoodsDate", "DocumentDate", "DateCreated", "DateModified", "FirstAccountProtocolNumber", "FirstAccountProtocolDate", "RemainAmountOfContract") FROM stdin;
30	10	5	2019-01-01	2019-01-01	12323	2957.52002	15280.5195	\N	2019-06-19	ΔΕΚΑ ΠΕΝΤΕ ΧΙΛΙΑΔΩΝ ΔΙΑΚΟΣΙΩΝ ΟΓΔΟΝΤΑ  ΕΥΡΩ KAI ΠΕΝΗΝΤΑ ΔΥΩ ΛΕΠΤΩΝ	t	2019-01-01	2019-01-01	2019-01-01	2019-06-19	2019-06-19	\N	2019-06-18	2134
31	19	1	2019-01-01	2019-01-01	30000	7200	37200	\N	2019-06-24	ΤΡΙΑΝΤΑ ΕΦΤΑ ΧΙΛΙΑΔΩΝ ΔΙΑΚΟΣΙΩΝ   ΕΥΡΩ	f	2019-01-01	2019-01-01	2019-01-01	2019-06-24	2019-06-24	\N	2019-06-24	12
32	28	1	2019-01-01	2019-01-01	123	29.5200005	152.520004	\N	2019-06-24	ΕΚΑΤΩΝ ΠΕΝΗΝΤΑ ΔΥΩ ΕΥΡΩ KAI ΠΕΝΗΝΤΑ ΔΥΩ ΛΕΠΤΩΝ	f	2019-01-01	2019-01-01	2019-01-01	2019-06-24	2019-06-24	\N	2019-06-24	12
28	11	1	2019-12-31	2019-12-31	1	0.239999995	1.24000001	\N	2019-06-26	ΕΝΟΣ ΕΥΡΩ KAI ΕΙΚΟΣΙ ΤΕΣΣΑΡΩΝ ΛΕΠΤΩΝ	f	2019-01-01	2019-01-01	2019-12-31	2019-06-18	2019-06-26	\N	2019-06-26	1
33	18	1	2019-01-01	2019-01-01	123	29.5200005	152.520004	\N	2019-06-26	ΕΚΑΤΩΝ ΠΕΝΗΝΤΑ ΔΥΩ ΕΥΡΩ KAI ΠΕΝΗΝΤΑ ΔΥΩ ΛΕΠΤΩΝ	f	2019-01-01	2019-01-01	2019-01-01	2019-06-26	2019-06-26	\N	2019-06-26	5
34	10	2	2019-01-01	2019-01-01	1	1	1	\N	2019-06-26	  ΕΝΟΣ ΕΥΡΩ	f	2019-01-01	2019-01-01	2019-01-01	2019-06-26	2019-06-26	1	2019-02-01	1
27	10	1	2020-01-01	2021-01-01	12	2.88000011	14.8800001	\N	2019-06-18	ΔΕΚΑ ΤΕΣΣΑΡΩΝ ΕΥΡΩ KAI ΟΓΔΟΝΤΑ ΟΚΤΩΝ ΛΕΠΤΩΝ	t	2019-01-01	2019-01-01	2019-01-02	2019-06-18	2019-06-26	\N	2019-06-18	12
35	12	8	2019-01-01	2019-01-01	123	29.5200005	152.520004	\N	2019-06-26	ΕΚΑΤΩΝ ΠΕΝΗΝΤΑ ΔΥΩ ΕΥΡΩ KAI ΠΕΝΗΝΤΑ ΔΥΩ ΛΕΠΤΩΝ	f	2019-01-01	2020-01-01	2019-01-01	2019-06-26	2019-06-26	\N	2019-01-01	3
29	11	2	2019-01-01	2019-01-01	88709.7031	21290.3008	110000	\N	2019-06-18	ΕΚΑΤΩΝ ΔΕΚΑ  ΧΙΛΙΑΔΩΝ ΕΥΡΩ	f	2019-01-01	2019-01-01	2019-01-01	2019-06-18	2019-06-18	\N	2019-06-18	12
\.


--
-- TOC entry 2981 (class 0 OID 25162)
-- Dependencies: 223
-- Data for Name: Agencies; Type: TABLE DATA; Schema: Ordering; Owner: dvasilakis
--

COPY "Ordering"."Agencies" ("Id", "Name") FROM stdin;
1	Εταιρεία Ανάπτυξης και Τουριστικής Προβολής Αθηνών (ΕΑΤΑ)
2	ΔΑΕΜ Α.Ε. - Ανώνυμη Αναπτυξιακή Εταιρεία Μηχανογράφησης & Επιχειρησιακών Μονάδων ΟΤΑ του Δήμου Αθηναίων\r\n
\.


--
-- TOC entry 2959 (class 0 OID 24959)
-- Dependencies: 201
-- Data for Name: CC; Type: TABLE DATA; Schema: Ordering; Owner: dvasilakis
--

COPY "Ordering"."CC" ("Id", "AccountId", "CC1", "CC2", "ccType", "Order") FROM stdin;
49	29	3	-1	1	1
50	29	3	-1	1	2
51	30	3	10	1	1
52	30	3	10	1	2
53	31	3	10	1	1
54	31	2	-1	1	2
55	32	3	10	1	1
56	32	2	4	1	2
47	28	3	10	1	1
48	28	3	10	1	2
57	33	3	10	1	1
58	33	2	4	1	2
59	34	3	10	1	1
60	34	3	10	1	2
45	27	2	4	1	1
46	27	3	-1	1	2
61	35	3	10	1	1
62	35	3	10	1	2
\.


--
-- TOC entry 2961 (class 0 OID 24964)
-- Dependencies: 203
-- Data for Name: Concessionaire; Type: TABLE DATA; Schema: Ordering; Owner: dvasilakis
--

COPY "Ordering"."Concessionaire" ("ConcessionaireId", "ArticleDocumentTransition", "ArticleDocumentAccount", "ConcessionaireName", "ConcessionaireAFM") FROM stdin;
2	NULL	NULL	Concessionaire	ConcessionaireAFM
1	της	ΤΗΝ	COSMOS BUSINESS SYSTEMS Α.Ε.Β.Ε.	00
3	NULL	NULL	sdfsdf	234454
4	NULL	NULL	COSMOS BUSINESS SYSTEMS ΑΕΒΕ	094223430
5	NULL	NULL	Vert 	1234
6	NULL	NULL	sdf	sdf
\.


--
-- TOC entry 2963 (class 0 OID 24972)
-- Dependencies: 205
-- Data for Name: Contract; Type: TABLE DATA; Schema: Ordering; Owner: dvasilakis
--

COPY "Ordering"."Contract" ("Id", "ContractTypeId", "Title", "ProtocolNumber", "ProtocolDate", "KAE", "Actor", "CodeDirection", "AwardNumber", "AwardDate", "AwardAda", "CpvCode", "CpvTitle", "AmountPure", "AmountFpa", "AmountTotal", "PaidAmountPure", "PaidAmountFpa", "PaidAmountTotal", "Balance", "Start", "End", "NumberOfAccounts", "DateCreated", "DateModified", "DirectionId", "DepartmentId", "ConcessionaireName", "ConcessionaireAFM") FROM stdin;
32	1	Συντήρηση του Ενεργού Εξοπλισμού Δικτύου Φωνής & Δεδομένων (LAN-WAN) του Δήμου Αθηναίων	546	2019-01-01	6264.005	10	18	1448	2019-01-01	75Η2Ω6Μ-ΝΙΩ	50312310-1	Συντήρηση Εξοπλισμού Δικτύου Δεδομένων	123	29.5200005	152.520004	99.1900024	23.8099995	123	0	2019-01-01	2019-01-01	7	2019-06-27 10:36:26	2019-06-27 10:36:26	3	11	COSMOS BUSINESS SYSTEMS ΑΕΒΕ	094223430
10	1	TEst test	93942	2019-01-01	6264.005	10	18	1448	2019-01-01	75Η2Ω6Μ-ΝΙΩ	50312310-1	Συντήρηση Εξοπλισμού Δικτύου Δεδομένων	100	24	124	42	10.0799999	52.0800018	0	2019-01-01	2019-01-01	9	2019-06-19 14:23:34	2019-06-19 14:23:34	2	4	Αναδοχος 1	123
11	1	Συντήρηση του Ενεργού Εξοπλισμού Δικτύου Φωνής & Δεδομένων (LAN-WAN) του Δήμου Αθηναίων	384467	2017-12-29	6264.005	10	18	1448	2019-01-01	75Η2Ω6Μ-ΝΙΩ	50312310-1	Συντήρηση Εξοπλισμού Δικτύου Δεδομένων	450000	108000	558000	261028	62646.6992	323674	0	2019-01-01	2019-01-01	7	2019-06-19 14:24:34	2019-06-19 14:24:34	2	4	Αναδοχος 2	456
33	1	Simvasi 1049	12345	2019-01-01	6264.005	10	18	1448	2019-01-01	75Η2Ω6Μ-ΝΙΩ	sdfsdf	sfwersdf	123	29.5200005	152.520004	23	5.51999998	28.5200005	0	2019-01-01	2019-01-01	11	2019-06-27 10:49:44	2019-06-27 10:49:44	2	5	Anadoxox 123	654987564546
34	1	Simvasi 8	34567	2019-01-01	6264.005	10	18	1448	2019-01-01	75Η2Ω6Μ-ΝΙΩ	123234	234234	123	29.5200005	152.520004	12	2.88000011	14.8800001	0	2019-01-01	2019-01-01	12	2019-06-27 11:34:20	2019-06-27 11:34:20	2	5	Anadoxos 45	12345678
35	1	Simvasi 8	345671	2019-01-01	6264.005	10	18	1448	2019-01-01	75Η2Ω6Μ-ΝΙΩ	123234	234234	123	29.5200005	152.520004	12	2.88000011	14.8800001	0	2019-01-01	2019-01-01	12	2019-06-27 11:35:35	2019-06-27 11:35:35	2	5	Anadoxos 45	12345678
18	1	Συντήρηση του Ενεργού Εξοπλισμού Δικτύου Φωνής & Δεδομένων (LAN-WAN) του Δήμου Αθηναίων	456	2019-01-01	6264.005	10	18	1448	2019-01-01	75Η2Ω6Μ-ΝΙΩ	50312310-1	Συντήρηση Εξοπλισμού Δικτύου Δεδομένων	12	2.88000011	14.8800001	123	29.5200005	152.520004	0	2019-01-01	2019-01-01	7	2019-06-19 14:33:34	2019-06-19 14:33:34	3	10	Αναδοχος 4\r\n	1234
36	1	So,vs 23	123123	2019-01-01	6264.005	10	18	1448	2019-01-01	75Η2Ω6Μ-ΝΙΩ	50312310-1	Συντήρηση Εξοπλισμού Δικτύου Δεδομένων	123	29.5200005	152.520004	12	2.88000011	14.8800001	0	2019-01-01	2019-01-01	12	2019-06-27 11:36:25	2019-06-27 11:36:25	3	11	COSMOS BUSINESS SYSTEMS ΑΕΒΕ	094223430
37	1	sdsdfertwetfg	9394223	2019-01-01	6264.005	10	18	1448	2019-01-01	75Η2Ω6Μ-ΝΙΩ	50312310-1	Συντήρηση Εξοπλισμού Δικτύου Δεδομένων	112	26.8799992	138.880005	12	2.88000011	14.8800001	0	2019-01-01	2019-01-01	10	2019-06-27 11:37:44	2019-06-27 11:37:44	3	10	23	23
38	1	sdsdfertwetfg	2324	2019-01-01	6264.005	10	18	1448	2019-01-01	75Η2Ω6Μ-ΝΙΩ	50312310-1	Συντήρηση Εξοπλισμού Δικτύου Δεδομένων	112	26.8799992	138.880005	12	2.88000011	14.8800001	0	2019-01-01	2019-01-01	10	2019-06-27 11:38:27	2019-06-27 11:38:27	3	10	23	23
39	2	1150	123456	2019-01-01	6264.005	10	18	1448	2019-01-01	75Η2Ω6Μ-ΝΙΩ	50312310-1	Συντήρηση Εξοπλισμού Δικτύου Δεδομένων	123	29.5200005	152.520004	12	2.88000011	14.8800001	0	2019-01-01	2019-01-01	13	2019-06-27 11:50:47	2019-06-27 11:50:47	3	10	Anad 98	12
40	1	Contract 1200	5234	2019-01-01	6264.005	10	18	1448	2019-01-01	75Η2Ω6Μ-ΝΙΩ	50312310-1	Συντήρηση Εξοπλισμού Δικτύου Δεδομένων	145	34.7999992	179.800003	1234	296.160004	1530.16003	0	2019-01-01	2019-01-01	13	2019-06-27 12:00:54	2019-06-27 12:00:54	3	11	ASDFSDF	094223430
41	1	Contract 1202	3467	2019-01-01	6264.005	10	18	1448	2019-01-01	75Η2Ω6Μ-ΝΙΩ	50312310-1	Συντήρηση Εξοπλισμού Δικτύου Δεδομένων	145	34.7999992	179.800003	12	2.88000011	14.8800001	0	2019-01-01	2019-01-01	14	2019-06-27 12:02:29	2019-06-27 12:02:29	3	10	Contract 1202 Anad	094223430
19	1	Contract 5	234234	2019-01-01	6264.005	10	18	1448	2019-01-01	75Η2Ω6Μ-ΝΙΩ	50312310-1	Συντήρηση Εξοπλισμού Δικτύου Δεδομένων	1	0.239999995	1.24000001	187.100006	44.9000015	232	\N	2019-01-01	2019-01-01	3	2019-06-19 14:56:58	2019-06-26 15:51:56	3	11	Ανάδοχος 5_5_5	123_5_%_%
12	1	Σύμβαση 3	2334	2019-01-01	6264.005	10	18	1448	2019-01-01	75Η2Ω6Μ-ΝΙΩ	50312310-1	Συντήρηση Εξοπλισμού Δικτύου Δεδομένων	1	0.239999995	1.24000001	2	0.479999989	2.48000002	\N	2019-01-01	2019-02-01	9	2019-06-19 14:25:34	2019-06-26 15:52:12	2	4	Αναδοχος 3\r\n	678
30	1	Συντήρηση του Ενεργού Εξοπλισμού Δικτύου Φωνής & Δεδομένων (LAN-WAN) του Δήμου Αθηναίων sdf	234	2019-01-01	6264.005	10	18	1448	2019-01-01	75Η2Ω6Μ-ΝΙΩ	50312310-1	Συντήρηση Εξοπλισμού Δικτύου Δεδομένων	123	29.5200005	152.520004	345	82.8000031	427.799988	0	2019-01-01	2019-01-01	7	2019-06-26 16:02:37	2019-06-26 16:02:37	2	4	COSMOS BUSINESS SYSTEMS ΑΕΒΕ	094223430
31	1	Test insert	123	2019-01-01	6264.005	10	18	1448	2019-01-01	75Η2Ω6Μ-ΝΙΩ	50312310-1	Συντήρηση Εξοπλισμού Δικτύου Δεδομένων	123	29.5200005	152.520004	12	2.88000011	14.8800001	0	2019-01-01	2019-01-01	7	2019-06-26 16:06:17	2019-06-26 16:06:17	2	5	COSMOS BUSINESS SYSTEMS ΑΕΒΕ	094223430
20	1	123	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2019-06-20 14:23:34	2019-06-19 14:23:34	\N	\N	\N	\N
21	1	234	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2019-06-21 14:23:34	2019-06-19 14:23:34	\N	\N	\N	\N
22	1	345	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2019-06-22 14:23:34	2019-06-19 14:23:34	\N	\N	\N	\N
23	1	456	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2019-06-23 14:23:34	2019-06-19 14:23:34	\N	\N	\N	\N
25	1	567	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2019-06-24 14:23:34	2019-06-19 14:23:34	\N	\N	\N	\N
26	1	678	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2019-06-25 14:23:34	2019-06-19 14:23:34	\N	\N	\N	\N
27	1	789	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2019-06-26 14:23:34	2019-06-19 14:23:34	\N	\N	\N	\N
28	1	8910	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	1	2019-06-27 14:23:34	2019-06-19 14:23:34	\N	\N	\N	\N
\.


--
-- TOC entry 2964 (class 0 OID 24978)
-- Dependencies: 206
-- Data for Name: ContractType; Type: TABLE DATA; Schema: Ordering; Owner: dvasilakis
--

COPY "Ordering"."ContractType" ("ContractTypeId", "ContractTypeName") FROM stdin;
1	Δημόσιας Ανάθεσης
2	Προγραμματική
\.


--
-- TOC entry 2967 (class 0 OID 24985)
-- Dependencies: 209
-- Data for Name: Department; Type: TABLE DATA; Schema: Ordering; Owner: dvasilakis
--

COPY "Ordering"."Department" ("DepartmentId", "DirectionId", "DepartmentName", "DepartmentSupervisor", "DepartmentTelephone", "DepartmentEmail", "DepartmentPostCode", "DepartmentCity", "DepartmentAddress") FROM stdin;
10	3	Προμηθειών, Προγραμματισμού, Τεκμηρίωσης Αιτημάτων και Ηλεκτρονικής Διακυβέρνησης	Μπουρνά Βούλα	210.5225617	t.promitheion@athens.gr	104 38	Αθήνα	Κων/νου Παλαιολόγου 9
11	3	Διαδικασιών Σύναψης Δημοσίων Συμβάσεων	Μπιμπούδης Παναγιώτης	213.2082956	t.prom.dimoprasies@athens.gr	104 38	Αθήνα	Κων/νου Παλαιολόγου 9
12	3	Αποθηκών Υλικών	Κακριδά  Άννα	210.5225068	t.apothikon.ylikon@athens.gr	\N	\N	\N
13	3	Διαχείρισης Καυσίμων και Λιπαντικών	Τσιλάβης Γεώργιος	210.3460146	t.diax.kausimon.lipantikon@athens.gr	\N	\N	\N
4	2	Τεχνολογίας, Πληροφορικής και Επικοινωνιών	Χατζηευστρατίου Ιωάννης	210.5277169	i.chatzieustratiou@athens.gr	104 38	Αθήνα	Λιοσίων 22
5	2	Ανθεκτικότητας και Βιωσιμότητας	Νεοφύτου Γεώργιος	210.3721553	t.anthektikotitas.biosimotitas@athens.gr	\N	\N	\N
7	2	Στρατηγικού Σχεδιασμού και Προγραμματισμού	Κοντώσης Ηλίας	210.5277160	t.stratigikou.sxediasmou.progr@athens.gr	\N	\N	\N
6	2	Καινοτομίας και Εξωστρέφειας	Παπακωνσταντίνου - Παπαδοπούλου Έλλη	210.5277109	t.kainotomias.exostrefias@athens.gr	\N	\N	\N
2	3	Διοικητικής Υποστήριξης, Τεκμηρίωσης και Ηλεκτρονικής Διακυβέρνησης	Πριόβολου Καλλιόπη	210.5277110	t.dioikitikis.ypostirixis.strat.sxed@athens.gr	\N	\N	\N
3	2	Διαχείρισης Γεωχωρικών Δεδομένων Πόλεως\r\n	Μαρούγκα Κωνσταντίνα	210.5277185	t.gis@athens.gr	\N	\N	\N
\.


--
-- TOC entry 2969 (class 0 OID 24993)
-- Dependencies: 211
-- Data for Name: Direction; Type: TABLE DATA; Schema: Ordering; Owner: dvasilakis
--

COPY "Ordering"."Direction" ("DirectionId", "DirectionName", "DirectionSupervisor", "DirectionTelephone", "DirectionEmail", "DirectionAddress", "DirectionPostCode", "DirectionCity") FROM stdin;
3	Προμηθειών και Αποθηκών	Βακουντούζης Ιωάννης	210.5225446	d.prom.apothikon@athens.gr	Κων/νου Παλαιολόγου 9	104 38	Αθήνα
2	Στρατηγικού Σχεδιασμού, Ανθεκτικότητας, Καινοτομίας και Τεκμηρίωσης	Δρ. Κακριδά Ουρανία	210.5277110	d.stratigikou.sxediasmou@athens.gr	Λιοσίων 22	104 38	Αθήνα
\.


--
-- TOC entry 2971 (class 0 OID 25001)
-- Dependencies: 213
-- Data for Name: DocumentSignatory; Type: TABLE DATA; Schema: Ordering; Owner: dvasilakis
--

COPY "Ordering"."DocumentSignatory" ("Id", "AccountId", "SignatoryTypeId", "SignatoryId", "DocumentType", "Absense") FROM stdin;
46	31	2	1	1	f
47	31	5	1	1	f
48	31	4	1	1	f
49	31	4	1	2	f
50	32	2	1	1	f
51	32	5	1	1	f
52	32	4	1	1	f
53	32	4	1	2	f
34	28	2	1	1	f
35	28	5	1	1	f
36	28	4	1	1	f
37	28	4	1	2	f
54	33	2	1	1	f
55	33	5	2	1	f
56	33	4	3	1	t
57	33	4	3	2	t
58	34	2	1	1	f
59	34	5	1	1	f
38	29	2	1	1	f
39	29	5	2	1	f
40	29	4	4	1	f
41	29	3	2	2	f
60	34	4	1	1	t
42	30	2	1	1	f
43	30	5	1	1	f
44	30	4	1	1	f
45	30	4	1	2	t
61	34	4	1	2	f
30	27	1	1	1	f
31	27	5	2	1	f
32	27	4	3	1	t
33	27	4	3	2	t
62	35	2	1	1	f
63	35	5	1	1	f
64	35	4	2	1	f
65	35	4	2	2	f
\.


--
-- TOC entry 2972 (class 0 OID 25004)
-- Dependencies: 214
-- Data for Name: Invoice; Type: TABLE DATA; Schema: Ordering; Owner: dvasilakis
--

COPY "Ordering"."Invoice" ("Id", "AccountId", "Number", "Date", "DeliveredDateProtocolNumber", "DeliveredDateProtocolDate") FROM stdin;
26	33	ΤΥΠΒ022942	2019-01-01	97620	2019-01-01
27	34	ΤΥΠΒ022942	2019-01-01	97620	2019-01-01
20	27	ΤΥΠΒ022942	2019-01-01	97621	2019-01-01
28	35	ΤΥΠΒ022942	2019-01-01	97621	2019-01-01
22	29	ΤΥΠΒ022942	2019-01-01	97620	2019-01-01
23	30	ΤΥΠΒ022942	2019-01-01	97620	2019-01-01
24	31	ΤΥΠΒ022942	2019-01-01	97620	2019-01-01
25	32	ΤΥΠΒ022942	2019-01-01	97620	2019-01-01
21	28	ΤΥΠΒ022942	2019-01-01	97620	2019-01-01
\.


--
-- TOC entry 2979 (class 0 OID 25136)
-- Dependencies: 221
-- Data for Name: Reservations; Type: TABLE DATA; Schema: Ordering; Owner: dvasilakis
--

COPY "Ordering"."Reservations" ("Id", "Name", "Percentage", "Stamp", "StampOGA") FROM stdin;
2	Ε.Α.Α.ΔΗ.ΣΥ.	0.0599999987	3	20
5	Α.Ε.Π.Π	0.0599999987	3	20
8	Φ.Ε. 	8	0	0
\.


--
-- TOC entry 2974 (class 0 OID 25009)
-- Dependencies: 216
-- Data for Name: Signatory; Type: TABLE DATA; Schema: Ordering; Owner: dvasilakis
--

COPY "Ordering"."Signatory" ("Id", "Name", "SignatoryType", "AccountId") FROM stdin;
1	ΦΩΤΕΙΝΗ ΤΣΟΤΡΑ	1	\N
2	ΙΩΑΝΝΗΣ ΧΑΤΖΗΕΥΣΤΡΑΤΙΟΥ	5	\N
3	ΠΑΠΑΚΩΝΣΤΑΝΤΙΝΟΥ – ΠΑΠΑΔΟΠΟΥΛΟΥ ΕΛΛΗ	4	\N
4	ΔΡ. ΟΥΡΑΝΙΑ ΚΑΚΡΙΔΑ	4	\N
\.


--
-- TOC entry 2975 (class 0 OID 25012)
-- Dependencies: 217
-- Data for Name: SignatoryType; Type: TABLE DATA; Schema: Ordering; Owner: dvasilakis
--

COPY "Ordering"."SignatoryType" ("Id", "Name") FROM stdin;
2	Ο ΣΥΝΤΑΚΤΗΣ
1	Η ΣΥΝΤΑΞΑΣΑ
4	Η ΠΡΟΪΣΤΑΜΕΝΗ ΔΙΕΥΘΥΝΣΗΣ
3	Ο ΠΡΟΪΣΤΑΜΕΝΟΣ ΔΙΕΥΘΥΝΣΗΣ
5	Ο  ΠΡΟΪΣΤΑΜΕΝΟΣ ΤΜΗΜΑΤΟΣ
6	Η ΠΡΟΪΣΤΑΜΕΝΗ ΤΜΗΜΑΤΟΣ
\.


--
-- TOC entry 2984 (class 0 OID 25267)
-- Dependencies: 226
-- Data for Name: User; Type: TABLE DATA; Schema: Ordering; Owner: dvasilakis
--

COPY "Ordering"."User" ("Id", "Username", "Password") FROM stdin;
1	dvasilakis	123
\.


--
-- TOC entry 3004 (class 0 OID 0)
-- Dependencies: 198
-- Name: AAY_Id_seq; Type: SEQUENCE SET; Schema: Ordering; Owner: dvasilakis
--

SELECT pg_catalog.setval('"Ordering"."AAY_Id_seq"', 34, true);


--
-- TOC entry 3005 (class 0 OID 0)
-- Dependencies: 200
-- Name: Account_Id_seq; Type: SEQUENCE SET; Schema: Ordering; Owner: dvasilakis
--

SELECT pg_catalog.setval('"Ordering"."Account_Id_seq"', 35, true);


--
-- TOC entry 3006 (class 0 OID 0)
-- Dependencies: 202
-- Name: CC_Id_seq; Type: SEQUENCE SET; Schema: Ordering; Owner: dvasilakis
--

SELECT pg_catalog.setval('"Ordering"."CC_Id_seq"', 62, true);


--
-- TOC entry 3007 (class 0 OID 0)
-- Dependencies: 204
-- Name: Concessionaire_Id_seq; Type: SEQUENCE SET; Schema: Ordering; Owner: dvasilakis
--

SELECT pg_catalog.setval('"Ordering"."Concessionaire_Id_seq"', 6, true);


--
-- TOC entry 3008 (class 0 OID 0)
-- Dependencies: 207
-- Name: ContractType_Id_seq; Type: SEQUENCE SET; Schema: Ordering; Owner: dvasilakis
--

SELECT pg_catalog.setval('"Ordering"."ContractType_Id_seq"', 3, false);


--
-- TOC entry 3009 (class 0 OID 0)
-- Dependencies: 208
-- Name: Contract_Id_seq; Type: SEQUENCE SET; Schema: Ordering; Owner: dvasilakis
--

SELECT pg_catalog.setval('"Ordering"."Contract_Id_seq"', 41, true);


--
-- TOC entry 3010 (class 0 OID 0)
-- Dependencies: 210
-- Name: Department_Id_seq; Type: SEQUENCE SET; Schema: Ordering; Owner: dvasilakis
--

SELECT pg_catalog.setval('"Ordering"."Department_Id_seq"', 13, true);


--
-- TOC entry 3011 (class 0 OID 0)
-- Dependencies: 212
-- Name: Direction_Id_seq; Type: SEQUENCE SET; Schema: Ordering; Owner: dvasilakis
--

SELECT pg_catalog.setval('"Ordering"."Direction_Id_seq"', 3, true);


--
-- TOC entry 3012 (class 0 OID 0)
-- Dependencies: 215
-- Name: Invoice_Id_seq; Type: SEQUENCE SET; Schema: Ordering; Owner: dvasilakis
--

SELECT pg_catalog.setval('"Ordering"."Invoice_Id_seq"', 28, true);


--
-- TOC entry 3013 (class 0 OID 0)
-- Dependencies: 222
-- Name: MunicipalAgencies_Id_seq; Type: SEQUENCE SET; Schema: Ordering; Owner: dvasilakis
--

SELECT pg_catalog.setval('"Ordering"."MunicipalAgencies_Id_seq"', 2, true);


--
-- TOC entry 3014 (class 0 OID 0)
-- Dependencies: 220
-- Name: Reservations_Id_seq; Type: SEQUENCE SET; Schema: Ordering; Owner: dvasilakis
--

SELECT pg_catalog.setval('"Ordering"."Reservations_Id_seq"', 8, true);


--
-- TOC entry 3015 (class 0 OID 0)
-- Dependencies: 218
-- Name: SignatoryType_Id_seq; Type: SEQUENCE SET; Schema: Ordering; Owner: dvasilakis
--

SELECT pg_catalog.setval('"Ordering"."SignatoryType_Id_seq"', 7, false);


--
-- TOC entry 3016 (class 0 OID 0)
-- Dependencies: 219
-- Name: Signatory_Id_seq; Type: SEQUENCE SET; Schema: Ordering; Owner: dvasilakis
--

SELECT pg_catalog.setval('"Ordering"."Signatory_Id_seq"', 5, false);


--
-- TOC entry 3017 (class 0 OID 0)
-- Dependencies: 225
-- Name: User_Id_seq; Type: SEQUENCE SET; Schema: Ordering; Owner: dvasilakis
--

SELECT pg_catalog.setval('"Ordering"."User_Id_seq"', 1, true);


--
-- TOC entry 3018 (class 0 OID 0)
-- Dependencies: 224
-- Name: documentsignatory_id_seq; Type: SEQUENCE SET; Schema: Ordering; Owner: dvasilakis
--

SELECT pg_catalog.setval('"Ordering".documentsignatory_id_seq', 65, true);


--
-- TOC entry 2792 (class 2606 OID 25031)
-- Name: AAY AAY_pkey; Type: CONSTRAINT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."AAY"
    ADD CONSTRAINT "AAY_pkey" PRIMARY KEY ("Id");


--
-- TOC entry 2794 (class 2606 OID 25033)
-- Name: Account Account_pkey; Type: CONSTRAINT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."Account"
    ADD CONSTRAINT "Account_pkey" PRIMARY KEY ("Id");


--
-- TOC entry 2796 (class 2606 OID 25035)
-- Name: CC CC_pkey; Type: CONSTRAINT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."CC"
    ADD CONSTRAINT "CC_pkey" PRIMARY KEY ("Id");


--
-- TOC entry 2798 (class 2606 OID 25037)
-- Name: Concessionaire Concessionaire_pkey; Type: CONSTRAINT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."Concessionaire"
    ADD CONSTRAINT "Concessionaire_pkey" PRIMARY KEY ("ConcessionaireId");


--
-- TOC entry 2802 (class 2606 OID 25039)
-- Name: ContractType ContractType_ContactType_pkey; Type: CONSTRAINT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."ContractType"
    ADD CONSTRAINT "ContractType_ContactType_pkey" PRIMARY KEY ("ContractTypeId");


--
-- TOC entry 2800 (class 2606 OID 25041)
-- Name: Contract Contract_pkey; Type: CONSTRAINT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."Contract"
    ADD CONSTRAINT "Contract_pkey" PRIMARY KEY ("Id");


--
-- TOC entry 2804 (class 2606 OID 25043)
-- Name: Department Department_pkey; Type: CONSTRAINT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."Department"
    ADD CONSTRAINT "Department_pkey" PRIMARY KEY ("DepartmentId");


--
-- TOC entry 2806 (class 2606 OID 25045)
-- Name: Direction Direction_pkey; Type: CONSTRAINT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."Direction"
    ADD CONSTRAINT "Direction_pkey" PRIMARY KEY ("DirectionId");


--
-- TOC entry 2808 (class 2606 OID 25206)
-- Name: DocumentSignatory DocumentSignatories_pkey; Type: CONSTRAINT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."DocumentSignatory"
    ADD CONSTRAINT "DocumentSignatories_pkey" PRIMARY KEY ("Id");


--
-- TOC entry 2810 (class 2606 OID 25049)
-- Name: Invoice Invoice_pkey; Type: CONSTRAINT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."Invoice"
    ADD CONSTRAINT "Invoice_pkey" PRIMARY KEY ("Id");


--
-- TOC entry 2818 (class 2606 OID 25170)
-- Name: Agencies MunicipalAgencies_pkey; Type: CONSTRAINT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."Agencies"
    ADD CONSTRAINT "MunicipalAgencies_pkey" PRIMARY KEY ("Id");


--
-- TOC entry 2816 (class 2606 OID 25141)
-- Name: Reservations Reservations_pkey; Type: CONSTRAINT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."Reservations"
    ADD CONSTRAINT "Reservations_pkey" PRIMARY KEY ("Id");


--
-- TOC entry 2814 (class 2606 OID 25051)
-- Name: SignatoryType SignatoryType_pkey; Type: CONSTRAINT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."SignatoryType"
    ADD CONSTRAINT "SignatoryType_pkey" PRIMARY KEY ("Id");


--
-- TOC entry 2812 (class 2606 OID 25053)
-- Name: Signatory Signatory_pkey; Type: CONSTRAINT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."Signatory"
    ADD CONSTRAINT "Signatory_pkey" PRIMARY KEY ("Id");


--
-- TOC entry 2820 (class 2606 OID 25272)
-- Name: User User_pkey; Type: CONSTRAINT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY ("Id");


--
-- TOC entry 2821 (class 2606 OID 25215)
-- Name: AAY AAY_fk; Type: FK CONSTRAINT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."AAY"
    ADD CONSTRAINT "AAY_fk" FOREIGN KEY ("AccountId") REFERENCES "Ordering"."Account"("Id") ON DELETE CASCADE;


--
-- TOC entry 2822 (class 2606 OID 25220)
-- Name: Account Account_fk; Type: FK CONSTRAINT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."Account"
    ADD CONSTRAINT "Account_fk" FOREIGN KEY ("ContractId") REFERENCES "Ordering"."Contract"("Id") ON DELETE CASCADE;


--
-- TOC entry 2823 (class 2606 OID 25225)
-- Name: CC CC_fk; Type: FK CONSTRAINT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."CC"
    ADD CONSTRAINT "CC_fk" FOREIGN KEY ("AccountId") REFERENCES "Ordering"."Account"("Id") ON DELETE CASCADE;


--
-- TOC entry 2824 (class 2606 OID 25069)
-- Name: Contract Contract_fk; Type: FK CONSTRAINT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."Contract"
    ADD CONSTRAINT "Contract_fk" FOREIGN KEY ("ContractTypeId") REFERENCES "Ordering"."ContractType"("ContractTypeId");


--
-- TOC entry 2825 (class 2606 OID 25100)
-- Name: Contract Contract_fk2; Type: FK CONSTRAINT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."Contract"
    ADD CONSTRAINT "Contract_fk2" FOREIGN KEY ("DirectionId") REFERENCES "Ordering"."Direction"("DirectionId");


--
-- TOC entry 2826 (class 2606 OID 25105)
-- Name: Contract Contract_fk3; Type: FK CONSTRAINT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."Contract"
    ADD CONSTRAINT "Contract_fk3" FOREIGN KEY ("DepartmentId") REFERENCES "Ordering"."Department"("DepartmentId");


--
-- TOC entry 2827 (class 2606 OID 25079)
-- Name: Department Department_fk; Type: FK CONSTRAINT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."Department"
    ADD CONSTRAINT "Department_fk" FOREIGN KEY ("DirectionId") REFERENCES "Ordering"."Direction"("DirectionId");


--
-- TOC entry 2828 (class 2606 OID 25230)
-- Name: DocumentSignatory DocumentSignatories_fk; Type: FK CONSTRAINT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."DocumentSignatory"
    ADD CONSTRAINT "DocumentSignatories_fk" FOREIGN KEY ("SignatoryTypeId") REFERENCES "Ordering"."SignatoryType"("Id") ON DELETE CASCADE;


--
-- TOC entry 2829 (class 2606 OID 25235)
-- Name: DocumentSignatory DocumentSignatories_fk1; Type: FK CONSTRAINT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."DocumentSignatory"
    ADD CONSTRAINT "DocumentSignatories_fk1" FOREIGN KEY ("AccountId") REFERENCES "Ordering"."Account"("Id") ON DELETE CASCADE;


--
-- TOC entry 2830 (class 2606 OID 25240)
-- Name: DocumentSignatory DocumentSignatories_fk2; Type: FK CONSTRAINT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."DocumentSignatory"
    ADD CONSTRAINT "DocumentSignatories_fk2" FOREIGN KEY ("SignatoryId") REFERENCES "Ordering"."Signatory"("Id") ON DELETE CASCADE;


--
-- TOC entry 2831 (class 2606 OID 25245)
-- Name: Invoice Invoice_fk; Type: FK CONSTRAINT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."Invoice"
    ADD CONSTRAINT "Invoice_fk" FOREIGN KEY ("AccountId") REFERENCES "Ordering"."Account"("Id") ON DELETE CASCADE;


--
-- TOC entry 2832 (class 2606 OID 25171)
-- Name: Signatory Signatory_fk; Type: FK CONSTRAINT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."Signatory"
    ADD CONSTRAINT "Signatory_fk" FOREIGN KEY ("AccountId") REFERENCES "Ordering"."Account"("Id");


--
-- TOC entry 2833 (class 2606 OID 25177)
-- Name: Signatory Signatory_fk1; Type: FK CONSTRAINT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."Signatory"
    ADD CONSTRAINT "Signatory_fk1" FOREIGN KEY ("SignatoryType") REFERENCES "Ordering"."SignatoryType"("Id");


-- Completed on 2019-06-27 16:26:03

--
-- PostgreSQL database dump complete
--

