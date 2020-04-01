--
-- PostgreSQL database dump
--

-- Dumped from database version 11.2
-- Dumped by pg_dump version 11.1

-- Started on 2019-11-18 17:01:56

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
-- TOC entry 3000 (class 0 OID 0)
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
-- TOC entry 3001 (class 0 OID 0)
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
-- TOC entry 3002 (class 0 OID 0)
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
    "ConcessionaireAFM" character varying(50),
    "HasDownPayment" boolean DEFAULT false NOT NULL,
    "FpaValue" integer
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
-- TOC entry 3003 (class 0 OID 0)
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
-- TOC entry 3004 (class 0 OID 0)
-- Dependencies: 206
-- Name: Contract_Id_seq; Type: SEQUENCE OWNED BY; Schema: Ordering; Owner: dvasilakis
--

ALTER SEQUENCE "Ordering"."Contract_Id_seq" OWNED BY "Ordering"."Contract"."Id";


--
-- TOC entry 234 (class 1259 OID 33631)
-- Name: CourtOfAuditors; Type: TABLE; Schema: Ordering; Owner: postgres
--

CREATE TABLE "Ordering"."CourtOfAuditors" (
    "Id" bigint NOT NULL,
    "AccountId" bigint,
    "ProtocolNumber" integer,
    "ProtocolYear" character varying(5),
    "ScaleNumber" character varying(10),
    "APDA_ProtocolNumber" integer,
    "APDA_ProtocolDate" date
);


ALTER TABLE "Ordering"."CourtOfAuditors" OWNER TO postgres;

--
-- TOC entry 233 (class 1259 OID 33629)
-- Name: CourtOfAuditors_Id_seq; Type: SEQUENCE; Schema: Ordering; Owner: postgres
--

CREATE SEQUENCE "Ordering"."CourtOfAuditors_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "Ordering"."CourtOfAuditors_Id_seq" OWNER TO postgres;

--
-- TOC entry 3005 (class 0 OID 0)
-- Dependencies: 233
-- Name: CourtOfAuditors_Id_seq; Type: SEQUENCE OWNED BY; Schema: Ordering; Owner: postgres
--

ALTER SEQUENCE "Ordering"."CourtOfAuditors_Id_seq" OWNED BY "Ordering"."CourtOfAuditors"."Id";


--
-- TOC entry 230 (class 1259 OID 33615)
-- Name: DecisionBoard; Type: TABLE; Schema: Ordering; Owner: postgres
--

CREATE TABLE "Ordering"."DecisionBoard" (
    "Id" bigint NOT NULL,
    "AccountId" bigint,
    "ProtocolNumber" integer,
    "ProtocolDate" date
);


ALTER TABLE "Ordering"."DecisionBoard" OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 33613)
-- Name: DecisionBoard_Id_seq; Type: SEQUENCE; Schema: Ordering; Owner: postgres
--

CREATE SEQUENCE "Ordering"."DecisionBoard_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "Ordering"."DecisionBoard_Id_seq" OWNER TO postgres;

--
-- TOC entry 3006 (class 0 OID 0)
-- Dependencies: 229
-- Name: DecisionBoard_Id_seq; Type: SEQUENCE OWNED BY; Schema: Ordering; Owner: postgres
--

ALTER SEQUENCE "Ordering"."DecisionBoard_Id_seq" OWNED BY "Ordering"."DecisionBoard"."Id";


--
-- TOC entry 232 (class 1259 OID 33623)
-- Name: DecisionCoordinatorDecentrilizedAdministration; Type: TABLE; Schema: Ordering; Owner: postgres
--

CREATE TABLE "Ordering"."DecisionCoordinatorDecentrilizedAdministration" (
    "Id" bigint NOT NULL,
    "AccountId" bigint,
    "ProtocolNumber" integer,
    "ProtocolDate" date
);


ALTER TABLE "Ordering"."DecisionCoordinatorDecentrilizedAdministration" OWNER TO postgres;

--
-- TOC entry 231 (class 1259 OID 33621)
-- Name: DecisionCoordinatorDecentrilizedAdministration_Id_seq; Type: SEQUENCE; Schema: Ordering; Owner: postgres
--

CREATE SEQUENCE "Ordering"."DecisionCoordinatorDecentrilizedAdministration_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "Ordering"."DecisionCoordinatorDecentrilizedAdministration_Id_seq" OWNER TO postgres;

--
-- TOC entry 3007 (class 0 OID 0)
-- Dependencies: 231
-- Name: DecisionCoordinatorDecentrilizedAdministration_Id_seq; Type: SEQUENCE OWNED BY; Schema: Ordering; Owner: postgres
--

ALTER SEQUENCE "Ordering"."DecisionCoordinatorDecentrilizedAdministration_Id_seq" OWNED BY "Ordering"."DecisionCoordinatorDecentrilizedAdministration"."Id";


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
-- TOC entry 3008 (class 0 OID 0)
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
-- TOC entry 3009 (class 0 OID 0)
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
-- TOC entry 3010 (class 0 OID 0)
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
-- TOC entry 3011 (class 0 OID 0)
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
-- TOC entry 3012 (class 0 OID 0)
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
-- TOC entry 3013 (class 0 OID 0)
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
-- TOC entry 3014 (class 0 OID 0)
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
-- TOC entry 3015 (class 0 OID 0)
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
-- TOC entry 3016 (class 0 OID 0)
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
-- TOC entry 3017 (class 0 OID 0)
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
-- TOC entry 2802 (class 2604 OID 25019)
-- Name: AAY Id; Type: DEFAULT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."AAY" ALTER COLUMN "Id" SET DEFAULT nextval('"Ordering"."AAY_Id_seq"'::regclass);


--
-- TOC entry 2803 (class 2604 OID 25020)
-- Name: Account Id; Type: DEFAULT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."Account" ALTER COLUMN "Id" SET DEFAULT nextval('"Ordering"."Account_Id_seq"'::regclass);


--
-- TOC entry 2815 (class 2604 OID 25165)
-- Name: Agencies Id; Type: DEFAULT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."Agencies" ALTER COLUMN "Id" SET DEFAULT nextval('"Ordering"."MunicipalAgencies_Id_seq"'::regclass);


--
-- TOC entry 2804 (class 2604 OID 25021)
-- Name: CC Id; Type: DEFAULT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."CC" ALTER COLUMN "Id" SET DEFAULT nextval('"Ordering"."CC_Id_seq"'::regclass);


--
-- TOC entry 2805 (class 2604 OID 25023)
-- Name: Contract Id; Type: DEFAULT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."Contract" ALTER COLUMN "Id" SET DEFAULT nextval('"Ordering"."Contract_Id_seq"'::regclass);


--
-- TOC entry 2807 (class 2604 OID 25024)
-- Name: ContractType ContractTypeId; Type: DEFAULT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."ContractType" ALTER COLUMN "ContractTypeId" SET DEFAULT nextval('"Ordering"."ContractType_Id_seq"'::regclass);


--
-- TOC entry 2821 (class 2604 OID 33634)
-- Name: CourtOfAuditors Id; Type: DEFAULT; Schema: Ordering; Owner: postgres
--

ALTER TABLE ONLY "Ordering"."CourtOfAuditors" ALTER COLUMN "Id" SET DEFAULT nextval('"Ordering"."CourtOfAuditors_Id_seq"'::regclass);


--
-- TOC entry 2819 (class 2604 OID 33618)
-- Name: DecisionBoard Id; Type: DEFAULT; Schema: Ordering; Owner: postgres
--

ALTER TABLE ONLY "Ordering"."DecisionBoard" ALTER COLUMN "Id" SET DEFAULT nextval('"Ordering"."DecisionBoard_Id_seq"'::regclass);


--
-- TOC entry 2820 (class 2604 OID 33626)
-- Name: DecisionCoordinatorDecentrilizedAdministration Id; Type: DEFAULT; Schema: Ordering; Owner: postgres
--

ALTER TABLE ONLY "Ordering"."DecisionCoordinatorDecentrilizedAdministration" ALTER COLUMN "Id" SET DEFAULT nextval('"Ordering"."DecisionCoordinatorDecentrilizedAdministration_Id_seq"'::regclass);


--
-- TOC entry 2808 (class 2604 OID 25025)
-- Name: Department DepartmentId; Type: DEFAULT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."Department" ALTER COLUMN "DepartmentId" SET DEFAULT nextval('"Ordering"."Department_Id_seq"'::regclass);


--
-- TOC entry 2809 (class 2604 OID 25026)
-- Name: Direction DirectionId; Type: DEFAULT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."Direction" ALTER COLUMN "DirectionId" SET DEFAULT nextval('"Ordering"."Direction_Id_seq"'::regclass);


--
-- TOC entry 2811 (class 2604 OID 25027)
-- Name: Invoice Id; Type: DEFAULT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."Invoice" ALTER COLUMN "Id" SET DEFAULT nextval('"Ordering"."Invoice_Id_seq"'::regclass);


--
-- TOC entry 2818 (class 2604 OID 25300)
-- Name: LogError Id; Type: DEFAULT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."LogError" ALTER COLUMN "Id" SET DEFAULT nextval('"Ordering"."LogError_Id_seq"'::regclass);


--
-- TOC entry 2814 (class 2604 OID 25139)
-- Name: Reservations Id; Type: DEFAULT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."Reservations" ALTER COLUMN "Id" SET DEFAULT nextval('"Ordering"."Reservations_Id_seq"'::regclass);


--
-- TOC entry 2812 (class 2604 OID 25028)
-- Name: Signatory Id; Type: DEFAULT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."Signatory" ALTER COLUMN "Id" SET DEFAULT nextval('"Ordering"."Signatory_Id_seq"'::regclass);


--
-- TOC entry 2813 (class 2604 OID 25029)
-- Name: SignatoryType Id; Type: DEFAULT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."SignatoryType" ALTER COLUMN "Id" SET DEFAULT nextval('"Ordering"."SignatoryType_Id_seq"'::regclass);


--
-- TOC entry 2816 (class 2604 OID 25270)
-- Name: User Id; Type: DEFAULT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."User" ALTER COLUMN "Id" SET DEFAULT nextval('"Ordering"."User_Id_seq"'::regclass);


--
-- TOC entry 2817 (class 2604 OID 25284)
-- Name: UserRoles Id; Type: DEFAULT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."UserRoles" ALTER COLUMN "Id" SET DEFAULT nextval('"Ordering"."UserRoles_Id_seq"'::regclass);


--
-- TOC entry 2823 (class 2606 OID 25031)
-- Name: AAY AAY_pkey; Type: CONSTRAINT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."AAY"
    ADD CONSTRAINT "AAY_pkey" PRIMARY KEY ("Id");


--
-- TOC entry 2825 (class 2606 OID 25033)
-- Name: Account Account_pkey; Type: CONSTRAINT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."Account"
    ADD CONSTRAINT "Account_pkey" PRIMARY KEY ("Id");


--
-- TOC entry 2827 (class 2606 OID 25035)
-- Name: CC CC_pkey; Type: CONSTRAINT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."CC"
    ADD CONSTRAINT "CC_pkey" PRIMARY KEY ("Id");


--
-- TOC entry 2831 (class 2606 OID 25039)
-- Name: ContractType ContractType_ContactType_pkey; Type: CONSTRAINT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."ContractType"
    ADD CONSTRAINT "ContractType_ContactType_pkey" PRIMARY KEY ("ContractTypeId");


--
-- TOC entry 2829 (class 2606 OID 25041)
-- Name: Contract Contract_pkey; Type: CONSTRAINT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."Contract"
    ADD CONSTRAINT "Contract_pkey" PRIMARY KEY ("Id");


--
-- TOC entry 2859 (class 2606 OID 33636)
-- Name: CourtOfAuditors CourtOfAuditors_pkey; Type: CONSTRAINT; Schema: Ordering; Owner: postgres
--

ALTER TABLE ONLY "Ordering"."CourtOfAuditors"
    ADD CONSTRAINT "CourtOfAuditors_pkey" PRIMARY KEY ("Id");


--
-- TOC entry 2855 (class 2606 OID 33620)
-- Name: DecisionBoard DecisionBoard_pkey; Type: CONSTRAINT; Schema: Ordering; Owner: postgres
--

ALTER TABLE ONLY "Ordering"."DecisionBoard"
    ADD CONSTRAINT "DecisionBoard_pkey" PRIMARY KEY ("Id");


--
-- TOC entry 2857 (class 2606 OID 33628)
-- Name: DecisionCoordinatorDecentrilizedAdministration DecisionCoordinatorDecentrilizedAdministration_pkey; Type: CONSTRAINT; Schema: Ordering; Owner: postgres
--

ALTER TABLE ONLY "Ordering"."DecisionCoordinatorDecentrilizedAdministration"
    ADD CONSTRAINT "DecisionCoordinatorDecentrilizedAdministration_pkey" PRIMARY KEY ("Id");


--
-- TOC entry 2833 (class 2606 OID 25043)
-- Name: Department Department_pkey; Type: CONSTRAINT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."Department"
    ADD CONSTRAINT "Department_pkey" PRIMARY KEY ("DepartmentId");


--
-- TOC entry 2835 (class 2606 OID 25045)
-- Name: Direction Direction_pkey; Type: CONSTRAINT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."Direction"
    ADD CONSTRAINT "Direction_pkey" PRIMARY KEY ("DirectionId");


--
-- TOC entry 2837 (class 2606 OID 25206)
-- Name: DocumentSignatory DocumentSignatories_pkey; Type: CONSTRAINT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."DocumentSignatory"
    ADD CONSTRAINT "DocumentSignatories_pkey" PRIMARY KEY ("Id");


--
-- TOC entry 2839 (class 2606 OID 25049)
-- Name: Invoice Invoice_pkey; Type: CONSTRAINT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."Invoice"
    ADD CONSTRAINT "Invoice_pkey" PRIMARY KEY ("Id");


--
-- TOC entry 2853 (class 2606 OID 25305)
-- Name: LogError LogError_pkey; Type: CONSTRAINT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."LogError"
    ADD CONSTRAINT "LogError_pkey" PRIMARY KEY ("Id");


--
-- TOC entry 2847 (class 2606 OID 25170)
-- Name: Agencies MunicipalAgencies_pkey; Type: CONSTRAINT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."Agencies"
    ADD CONSTRAINT "MunicipalAgencies_pkey" PRIMARY KEY ("Id");


--
-- TOC entry 2845 (class 2606 OID 25141)
-- Name: Reservations Reservations_pkey; Type: CONSTRAINT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."Reservations"
    ADD CONSTRAINT "Reservations_pkey" PRIMARY KEY ("Id");


--
-- TOC entry 2843 (class 2606 OID 25051)
-- Name: SignatoryType SignatoryType_pkey; Type: CONSTRAINT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."SignatoryType"
    ADD CONSTRAINT "SignatoryType_pkey" PRIMARY KEY ("Id");


--
-- TOC entry 2841 (class 2606 OID 25053)
-- Name: Signatory Signatory_pkey; Type: CONSTRAINT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."Signatory"
    ADD CONSTRAINT "Signatory_pkey" PRIMARY KEY ("Id");


--
-- TOC entry 2851 (class 2606 OID 25289)
-- Name: UserRoles UserRoles_pkey; Type: CONSTRAINT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."UserRoles"
    ADD CONSTRAINT "UserRoles_pkey" PRIMARY KEY ("Id");


--
-- TOC entry 2849 (class 2606 OID 25272)
-- Name: User User_pkey; Type: CONSTRAINT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY ("Id");


--
-- TOC entry 2860 (class 2606 OID 25215)
-- Name: AAY AAY_fk; Type: FK CONSTRAINT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."AAY"
    ADD CONSTRAINT "AAY_fk" FOREIGN KEY ("AccountId") REFERENCES "Ordering"."Account"("Id") ON DELETE CASCADE;


--
-- TOC entry 2861 (class 2606 OID 25220)
-- Name: Account Account_fk; Type: FK CONSTRAINT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."Account"
    ADD CONSTRAINT "Account_fk" FOREIGN KEY ("ContractId") REFERENCES "Ordering"."Contract"("Id") ON DELETE CASCADE;


--
-- TOC entry 2862 (class 2606 OID 25225)
-- Name: CC CC_fk; Type: FK CONSTRAINT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."CC"
    ADD CONSTRAINT "CC_fk" FOREIGN KEY ("AccountId") REFERENCES "Ordering"."Account"("Id") ON DELETE CASCADE;


--
-- TOC entry 2863 (class 2606 OID 25069)
-- Name: Contract Contract_fk; Type: FK CONSTRAINT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."Contract"
    ADD CONSTRAINT "Contract_fk" FOREIGN KEY ("ContractTypeId") REFERENCES "Ordering"."ContractType"("ContractTypeId");


--
-- TOC entry 2864 (class 2606 OID 25100)
-- Name: Contract Contract_fk2; Type: FK CONSTRAINT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."Contract"
    ADD CONSTRAINT "Contract_fk2" FOREIGN KEY ("DirectionId") REFERENCES "Ordering"."Direction"("DirectionId");


--
-- TOC entry 2865 (class 2606 OID 25105)
-- Name: Contract Contract_fk3; Type: FK CONSTRAINT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."Contract"
    ADD CONSTRAINT "Contract_fk3" FOREIGN KEY ("DepartmentId") REFERENCES "Ordering"."Department"("DepartmentId");


--
-- TOC entry 2873 (class 2606 OID 33642)
-- Name: CourtOfAuditors CourtOfAuditors_fk; Type: FK CONSTRAINT; Schema: Ordering; Owner: postgres
--

ALTER TABLE ONLY "Ordering"."CourtOfAuditors"
    ADD CONSTRAINT "CourtOfAuditors_fk" FOREIGN KEY ("AccountId") REFERENCES "Ordering"."Account"("Id") ON DELETE CASCADE;


--
-- TOC entry 2871 (class 2606 OID 33657)
-- Name: DecisionBoard DecisionBoard_fk; Type: FK CONSTRAINT; Schema: Ordering; Owner: postgres
--

ALTER TABLE ONLY "Ordering"."DecisionBoard"
    ADD CONSTRAINT "DecisionBoard_fk" FOREIGN KEY ("AccountId") REFERENCES "Ordering"."Account"("Id") ON DELETE CASCADE;


--
-- TOC entry 2872 (class 2606 OID 33662)
-- Name: DecisionCoordinatorDecentrilizedAdministration DecisionCoordinatorDecentrilizedAdministration_fk; Type: FK CONSTRAINT; Schema: Ordering; Owner: postgres
--

ALTER TABLE ONLY "Ordering"."DecisionCoordinatorDecentrilizedAdministration"
    ADD CONSTRAINT "DecisionCoordinatorDecentrilizedAdministration_fk" FOREIGN KEY ("AccountId") REFERENCES "Ordering"."Account"("Id") ON DELETE CASCADE;


--
-- TOC entry 2866 (class 2606 OID 25290)
-- Name: Department Department_fk; Type: FK CONSTRAINT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."Department"
    ADD CONSTRAINT "Department_fk" FOREIGN KEY ("DirectionId") REFERENCES "Ordering"."Direction"("DirectionId") ON DELETE CASCADE;


--
-- TOC entry 2867 (class 2606 OID 25230)
-- Name: DocumentSignatory DocumentSignatories_fk; Type: FK CONSTRAINT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."DocumentSignatory"
    ADD CONSTRAINT "DocumentSignatories_fk" FOREIGN KEY ("SignatoryTypeId") REFERENCES "Ordering"."SignatoryType"("Id") ON DELETE CASCADE;


--
-- TOC entry 2868 (class 2606 OID 25235)
-- Name: DocumentSignatory DocumentSignatories_fk1; Type: FK CONSTRAINT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."DocumentSignatory"
    ADD CONSTRAINT "DocumentSignatories_fk1" FOREIGN KEY ("AccountId") REFERENCES "Ordering"."Account"("Id") ON DELETE CASCADE;


--
-- TOC entry 2869 (class 2606 OID 25240)
-- Name: DocumentSignatory DocumentSignatories_fk2; Type: FK CONSTRAINT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."DocumentSignatory"
    ADD CONSTRAINT "DocumentSignatories_fk2" FOREIGN KEY ("SignatoryId") REFERENCES "Ordering"."Signatory"("Id") ON DELETE CASCADE;


--
-- TOC entry 2870 (class 2606 OID 25245)
-- Name: Invoice Invoice_fk; Type: FK CONSTRAINT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."Invoice"
    ADD CONSTRAINT "Invoice_fk" FOREIGN KEY ("AccountId") REFERENCES "Ordering"."Account"("Id") ON DELETE CASCADE;


-- Completed on 2019-11-18 17:01:57

--
-- PostgreSQL database dump complete
--

