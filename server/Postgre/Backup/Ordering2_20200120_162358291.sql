--
-- PostgreSQL database dump
--

-- Dumped from database version 11.2
-- Dumped by pg_dump version 12.0

-- Started on 2020-01-20 16:23:59

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

--
-- TOC entry 8 (class 2615 OID 24945)
-- Name: Ordering; Type: SCHEMA; Schema: -; Owner: dvasilakis
--

CREATE SCHEMA "Ordering";


ALTER SCHEMA "Ordering" OWNER TO dvasilakis;

SET default_tablespace = '';

--
-- TOC entry 197 (class 1259 OID 24946)
-- Name: AAY; Type: TABLE; Schema: Ordering; Owner: dvasilakis
--

CREATE TABLE "Ordering"."AAY" (
    "Id" bigint NOT NULL,
    "AccountId" bigint NOT NULL,
    "Value" character varying(20),
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
-- TOC entry 3049 (class 0 OID 0)
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
    "WorkConfirmationDate" date,
    "DeliveryGoodsDate" date,
    "DocumentDate" date,
    "DateCreated" date,
    "DateModified" date,
    "FirstAccountProtocolNumber" bigint,
    "FirstAccountProtocolDate" date
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
-- TOC entry 3050 (class 0 OID 0)
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
    "AccountId" bigint NOT NULL,
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
-- TOC entry 3051 (class 0 OID 0)
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
    "FpaValue" integer,
    "OwnerId" bigint,
    "AllUsers" boolean
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
-- TOC entry 3052 (class 0 OID 0)
-- Dependencies: 205
-- Name: ContractType_Id_seq; Type: SEQUENCE OWNED BY; Schema: Ordering; Owner: dvasilakis
--

ALTER SEQUENCE "Ordering"."ContractType_Id_seq" OWNED BY "Ordering"."ContractType"."ContractTypeId";


--
-- TOC entry 235 (class 1259 OID 33755)
-- Name: ContractUsers; Type: TABLE; Schema: Ordering; Owner: postgres
--

CREATE TABLE "Ordering"."ContractUsers" (
    "ContractId" bigint NOT NULL,
    "UserId" bigint NOT NULL
);


ALTER TABLE "Ordering"."ContractUsers" OWNER TO postgres;

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
-- TOC entry 3053 (class 0 OID 0)
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
    "AccountId" bigint NOT NULL,
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
-- TOC entry 3054 (class 0 OID 0)
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
    "AccountId" bigint NOT NULL,
    "ProtocolNumber" integer,
    "ProtocolDate" date,
    "Content" character varying(2000)
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
-- TOC entry 3055 (class 0 OID 0)
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
    "AccountId" bigint NOT NULL,
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
-- TOC entry 3056 (class 0 OID 0)
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
-- TOC entry 3057 (class 0 OID 0)
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
-- TOC entry 3058 (class 0 OID 0)
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
    "AccountId" bigint NOT NULL,
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
    "AccountId" bigint NOT NULL,
    "Number" character varying(20),
    "Date" date,
    "DeliveredDateProtocolNumber" integer,
    "DeliveredDateProtocolDate" date,
    "DeliveredDate" date
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
-- TOC entry 3059 (class 0 OID 0)
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
-- TOC entry 3060 (class 0 OID 0)
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
-- TOC entry 3061 (class 0 OID 0)
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
-- TOC entry 3062 (class 0 OID 0)
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
-- TOC entry 3063 (class 0 OID 0)
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
-- TOC entry 3064 (class 0 OID 0)
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
    "Role" integer,
    "Firstname" character varying(50),
    "Lastname" character varying(50)
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
-- TOC entry 3065 (class 0 OID 0)
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
-- TOC entry 3066 (class 0 OID 0)
-- Dependencies: 223
-- Name: User_Id_seq; Type: SEQUENCE OWNED BY; Schema: Ordering; Owner: dvasilakis
--

ALTER SEQUENCE "Ordering"."User_Id_seq" OWNED BY "Ordering"."User"."Id";


--
-- TOC entry 236 (class 1259 OID 33760)
-- Name: contractusers_id_seq; Type: SEQUENCE; Schema: Ordering; Owner: postgres
--

CREATE SEQUENCE "Ordering".contractusers_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "Ordering".contractusers_id_seq OWNER TO postgres;

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
-- TOC entry 2809 (class 2604 OID 25019)
-- Name: AAY Id; Type: DEFAULT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."AAY" ALTER COLUMN "Id" SET DEFAULT nextval('"Ordering"."AAY_Id_seq"'::regclass);


--
-- TOC entry 2810 (class 2604 OID 25020)
-- Name: Account Id; Type: DEFAULT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."Account" ALTER COLUMN "Id" SET DEFAULT nextval('"Ordering"."Account_Id_seq"'::regclass);


--
-- TOC entry 2822 (class 2604 OID 25165)
-- Name: Agencies Id; Type: DEFAULT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."Agencies" ALTER COLUMN "Id" SET DEFAULT nextval('"Ordering"."MunicipalAgencies_Id_seq"'::regclass);


--
-- TOC entry 2811 (class 2604 OID 25021)
-- Name: CC Id; Type: DEFAULT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."CC" ALTER COLUMN "Id" SET DEFAULT nextval('"Ordering"."CC_Id_seq"'::regclass);


--
-- TOC entry 2812 (class 2604 OID 25023)
-- Name: Contract Id; Type: DEFAULT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."Contract" ALTER COLUMN "Id" SET DEFAULT nextval('"Ordering"."Contract_Id_seq"'::regclass);


--
-- TOC entry 2814 (class 2604 OID 25024)
-- Name: ContractType ContractTypeId; Type: DEFAULT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."ContractType" ALTER COLUMN "ContractTypeId" SET DEFAULT nextval('"Ordering"."ContractType_Id_seq"'::regclass);


--
-- TOC entry 2828 (class 2604 OID 33634)
-- Name: CourtOfAuditors Id; Type: DEFAULT; Schema: Ordering; Owner: postgres
--

ALTER TABLE ONLY "Ordering"."CourtOfAuditors" ALTER COLUMN "Id" SET DEFAULT nextval('"Ordering"."CourtOfAuditors_Id_seq"'::regclass);


--
-- TOC entry 2826 (class 2604 OID 33618)
-- Name: DecisionBoard Id; Type: DEFAULT; Schema: Ordering; Owner: postgres
--

ALTER TABLE ONLY "Ordering"."DecisionBoard" ALTER COLUMN "Id" SET DEFAULT nextval('"Ordering"."DecisionBoard_Id_seq"'::regclass);


--
-- TOC entry 2827 (class 2604 OID 33626)
-- Name: DecisionCoordinatorDecentrilizedAdministration Id; Type: DEFAULT; Schema: Ordering; Owner: postgres
--

ALTER TABLE ONLY "Ordering"."DecisionCoordinatorDecentrilizedAdministration" ALTER COLUMN "Id" SET DEFAULT nextval('"Ordering"."DecisionCoordinatorDecentrilizedAdministration_Id_seq"'::regclass);


--
-- TOC entry 2815 (class 2604 OID 25025)
-- Name: Department DepartmentId; Type: DEFAULT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."Department" ALTER COLUMN "DepartmentId" SET DEFAULT nextval('"Ordering"."Department_Id_seq"'::regclass);


--
-- TOC entry 2816 (class 2604 OID 25026)
-- Name: Direction DirectionId; Type: DEFAULT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."Direction" ALTER COLUMN "DirectionId" SET DEFAULT nextval('"Ordering"."Direction_Id_seq"'::regclass);


--
-- TOC entry 2818 (class 2604 OID 25027)
-- Name: Invoice Id; Type: DEFAULT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."Invoice" ALTER COLUMN "Id" SET DEFAULT nextval('"Ordering"."Invoice_Id_seq"'::regclass);


--
-- TOC entry 2825 (class 2604 OID 25300)
-- Name: LogError Id; Type: DEFAULT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."LogError" ALTER COLUMN "Id" SET DEFAULT nextval('"Ordering"."LogError_Id_seq"'::regclass);


--
-- TOC entry 2821 (class 2604 OID 25139)
-- Name: Reservations Id; Type: DEFAULT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."Reservations" ALTER COLUMN "Id" SET DEFAULT nextval('"Ordering"."Reservations_Id_seq"'::regclass);


--
-- TOC entry 2819 (class 2604 OID 25028)
-- Name: Signatory Id; Type: DEFAULT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."Signatory" ALTER COLUMN "Id" SET DEFAULT nextval('"Ordering"."Signatory_Id_seq"'::regclass);


--
-- TOC entry 2820 (class 2604 OID 25029)
-- Name: SignatoryType Id; Type: DEFAULT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."SignatoryType" ALTER COLUMN "Id" SET DEFAULT nextval('"Ordering"."SignatoryType_Id_seq"'::regclass);


--
-- TOC entry 2823 (class 2604 OID 25270)
-- Name: User Id; Type: DEFAULT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."User" ALTER COLUMN "Id" SET DEFAULT nextval('"Ordering"."User_Id_seq"'::regclass);


--
-- TOC entry 2824 (class 2604 OID 25284)
-- Name: UserRoles Id; Type: DEFAULT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."UserRoles" ALTER COLUMN "Id" SET DEFAULT nextval('"Ordering"."UserRoles_Id_seq"'::regclass);


--
-- TOC entry 3004 (class 0 OID 24946)
-- Dependencies: 197
-- Data for Name: AAY; Type: TABLE DATA; Schema: Ordering; Owner: dvasilakis
--

COPY "Ordering"."AAY" ("Id", "AccountId", "Value", "ProtocolNumber", "ProtocolDate", "EadNumber", "PreviousYear", "ADA") FROM stdin;
105	120	123	12	2020-01-19	3	\N	sdf
98	109	asd	1	2019-01-01	1	\N	asdf
106	121	WE	23	2019-01-01	2	12	WE
107	122	12	12	2020-01-20	112	112	12
108	123	234	12	2019-01-01	234	\N	DDFDF
97	108	sd	2	2019-01-01	1	2012	sdf
42	52	123	123	2019-01-01	123	3	asdf23
43	53	sdf	4	2019-01-01	3	1234	234
40	50	12_u	19	2025-03-02	7	6	uuuu
41	51	asdf	1	2019-01-01	1	1	sdf
\.


--
-- TOC entry 3006 (class 0 OID 24951)
-- Dependencies: 199
-- Data for Name: Account; Type: TABLE DATA; Schema: Ordering; Owner: dvasilakis
--

COPY "Ordering"."Account" ("Id", "ContractId", "Number", "Start", "End", "AmountPure", "AmountFpa", "AmountTotal", "ProtocolNumber", "ProtocolDate", "AmountFullWritten", "IsFirstOfTheYear", "WorkConfirmationDate", "DeliveryGoodsDate", "DocumentDate", "DateCreated", "DateModified", "FirstAccountProtocolNumber", "FirstAccountProtocolDate") FROM stdin;
109	58	3	2019-01-01	2019-01-01	34	8.15999985	42.1599998	\N	2019-11-20	ΣΑΡΑΝΤΑ ΔΥΟ ΕΥΡΩ ΚΑΙ ΔΕΚΑ ΕΞΙ ΛΕΠΤΩΝ	f	2019-01-01	2019-01-01	2019-01-01	2019-11-20	2019-11-20	1	2019-01-01
110	58	4	2019-01-01	2019-01-01	123	29.5200005	152.520004	\N	2019-11-22	ΕΚΑΤΟΝ ΠΕΝΗΝΤΑ ΔΥΟ ΕΥΡΩ ΚΑΙ ΠΕΝΗΝΤΑ ΔΥΟ ΛΕΠΤΩΝ	f	2019-01-01	2019-01-01	2019-01-01	2019-11-22	2019-11-22	\N	2019-01-01
108	58	2	2019-01-01	2019-01-01	10	2.4000001	12.3999996	\N	2019-11-20	ΔΕΚΑ ΤΡΙΩΝ ΕΥΡΩ ΚΑΙ ΕΞΗΝΤΑ ΤΕΣΣΑΡΩΝ ΛΕΠΤΩΝ	f	2019-01-01	2019-01-01	2019-01-01	2019-11-20	2019-12-10	1	2019-01-01
52	53	2	2019-01-01	2019-01-01	123	29.5200005	152.520004	\N	2019-09-30	ΕΚΑΤΩΝ ΠΕΝΗΝΤΑ ΔΥΩ ΕΥΡΩ KAI ΠΕΝΗΝΤΑ ΔΥΩ ΛΕΠΤΩΝ	f	2019-01-01	2019-01-01	2019-01-01	2019-09-30	2019-10-08	1	2019-01-01
53	54	10	2020-01-01	2020-01-01	2	0.479999989	2.48000002	\N	2019-10-08	ΔΥΩ ΕΥΡΩ KAI ΣΑΡΑΝΤΑ ΟΚΤΩ ΛΕΠΤΩΝ	f	2019-01-01	2019-02-01	2019-01-01	2019-10-08	2019-10-08	7	2020-02-02
50	52	1	2019-02-04	2019-04-04	5	1.20000005	6.19999981	1223	2019-08-07	ΕΞΙ ΕΥΡΩ KAI ΕΙΚΟΣΙ ΛΕΠΤΩΝ	t	2020-03-02	2020-02-02	2019-10-02	2019-08-07	2019-10-08	\N	2019-08-07
51	53	1	2019-01-01	2019-01-01	256.890015	61.6500015	318.540009	\N	2019-08-23	ΤΡΙΑΚΟΣΙΩΝ ΔΕΚΑ ΟΚΤΩ ΕΥΡΩ KAI ΠΕΝΗΝΤΑ ΤΕΣΣΑΡΩΝ ΛΕΠΤΩΝ	f	2019-01-01	2019-01-01	2019-01-01	2019-08-23	2019-10-09	\N	2019-08-23
120	58	1	2019-01-16	2019-12-28	12	2.88000011	14.8800001	\N	\N	ΔΕΚΑ ΤΕΣΣΑΡΩΝ ΕΥΡΩ ΚΑΙ ΟΓΔΟΝΤΑ ΟΚΤΩ ΛΕΠΤΩΝ	t	\N	\N	2018-01-20	2019-12-18	2019-12-18	\N	\N
121	56	1	2019-01-01	2019-01-01	12	2.88000011	14.8800001	\N	\N	ΔΕΚΑ ΤΕΣΣΑΡΩΝ ΕΥΡΩ ΚΑΙ ΟΓΔΟΝΤΑ ΟΚΤΩ ΛΕΠΤΩΝ	f	2019-01-01	2019-01-01	2018-01-01	2019-12-18	2019-12-18	\N	\N
122	54	2	2018-11-18	2018-11-18	12	5	13	\N	\N	ΔΕΚΑ ΤΕΣΣΑΡΩΝ ΕΥΡΩ ΚΑΙ ΟΓΔΟΝΤΑ ΟΚΤΩ ΛΕΠΤΩΝ	f	2020-01-20	2020-01-20	2020-01-20	2019-12-19	2019-12-19	12	2020-01-20
123	56	2	2019-01-01	2019-01-01	452.450012	108.589996	561.039978	\N	\N	ΠΕΝΤΑΚΟΣΙΩΝ ΕΞΗΝΤΑ ΕΝΟΣ ΕΥΡΩ ΚΑΙ  ΤΕΣΣΑΡΩΝ ΛΕΠΤΩΝ	f	2019-01-01	2019-01-01	2019-01-01	2019-12-20	2019-12-20	\N	1970-01-01
\.


--
-- TOC entry 3028 (class 0 OID 25162)
-- Dependencies: 221
-- Data for Name: Agencies; Type: TABLE DATA; Schema: Ordering; Owner: dvasilakis
--

COPY "Ordering"."Agencies" ("Id", "Name") FROM stdin;
1	Εταιρεία Ανάπτυξης και Τουριστικής Προβολής Αθηνών (ΕΑΤΑ)
2	ΔΑΕΜ Α.Ε. - Ανώνυμη Αναπτυξιακή Εταιρεία Μηχανογράφησης & Επιχειρησιακών Μονάδων ΟΤΑ του Δήμου Αθηναίων\r\n
11	Ο.Π.Α.Ν.Δ.Α
\.


--
-- TOC entry 3008 (class 0 OID 24959)
-- Dependencies: 201
-- Data for Name: CC; Type: TABLE DATA; Schema: Ordering; Owner: dvasilakis
--

COPY "Ordering"."CC" ("Id", "AccountId", "CC1", "CC2", "ccType", "Order") FROM stdin;
190	109	3	10	1	1
77	52	3	10	1	1
78	52	1	-1	2	2
79	53	3	10	1	1
80	53	3	10	1	2
73	50	3	10	1	1
74	50	3	11	1	2
75	51	3	10	1	1
76	51	1	-1	2	2
191	109	-1	-1	2	2
188	108	3	10	1	1
189	108	2	-1	2	2
198	120	15	54	1	1
199	120	1	-1	2	2
200	121	3	10	1	1
201	121	1	-1	2	2
202	122	3	10	1	1
203	122	1	-1	2	2
204	123	3	10	1	1
205	123	1	-1	2	2
\.


--
-- TOC entry 3010 (class 0 OID 24972)
-- Dependencies: 203
-- Data for Name: Contract; Type: TABLE DATA; Schema: Ordering; Owner: dvasilakis
--

COPY "Ordering"."Contract" ("Id", "ContractTypeId", "Title", "ProtocolNumber", "ProtocolDate", "KAE", "Actor", "CodeDirection", "AwardNumber", "AwardDate", "AwardAda", "CpvCode", "CpvTitle", "AmountPure", "AmountFpa", "AmountTotal", "Balance", "Start", "End", "NumberOfAccounts", "DateCreated", "DateModified", "DirectionId", "DepartmentId", "ConcessionaireName", "ConcessionaireAFM", "HasDownPayment", "FpaValue", "OwnerId", "AllUsers") FROM stdin;
67	1	LALALALLA	122378	2020-01-01	1	12	12	213	2020-01-01	123d	234	234	345	82.8000031	427.799988	\N	2020-01-01	2020-01-01	56	2020-01-14 11:59:38	2020-01-20 15:21:24	2	5	234	324	t	24	4	f
54	2	ss	223	2019-01-01	22	22	2	22	2019-09-11	2323	22	dd	12	2.88000011	14.8800001	\N	2020-02-01	2019-01-01	22	2019-09-18 15:49:51	2019-10-18 10:37:52	3	10	ss	ss	f	24	4	\N
56	2	ασδασδφψωσδφψχω χψω 	3	2019-01-01	ασδφ	ασδφ	ασδφ	5	2019-01-01	ασδ	σαδφ	αδσφ	2134	512.159973	2646.15991	\N	2019-01-01	2019-01-01	3	2019-10-18 12:31:42	2019-10-18 12:31:42	3	10	ασδφ	σαδφ	f	24	4	\N
62	2	sdf1111	123123	2020-01-01	2	1	23	123	2020-01-01	sdfg	sdf	s	123	29.5200005	152.520004	\N	2020-01-01	2020-01-01	8	2020-01-07 14:41:33	2020-01-07 14:41:33	3	10	sdf	111	t	24	4	\N
63	2	asdfasdfasdf	3452334	2020-01-01	1	3	23	3	2020-01-01	dfgsdg	123	234	345	82.8000031	427.799988	\N	2020-12-31	2020-12-31	5	2020-01-13 12:31:34	2020-01-13 12:31:34	3	11	asdf	23342	t	24	4	\N
58	2	VEWERSDFSDF	345	2019-01-01	123	123	12	123	2019-01-01	sdfsdf	123	123	1232	295.679993	1527.68005	\N	2019-01-01	2019-01-01	50	2019-10-18 12:42:26	2019-12-06 11:41:36	21	65	sdf	sdf	t	24	4	t
65	1	asdf	12323	2020-01-01	1	12	12	213	2020-01-01	123d	234	234	345	82.8000031	427.799988	\N	2020-01-01	2020-01-01	56	2020-01-14 11:43:59	2020-01-14 11:43:59	2	5	234	324	t	24	4	f
52	1	Contract 1	1	2019-01-01	12	12	12	1	2019-01-01	sdfsdf	123	123r	100	24	124	\N	2019-01-01	2019-01-01	8	2019-08-07 11:22:39	2019-08-09 10:23:05	2	4	Anadoxos 1 	s234sdf23	f	24	4	\N
53	2	Contract 2	2	2019-01-01	123	12	123	77	2024-03-03	DFGERTER	cpv code 1	cpv title	2500	600	3100	\N	2019-03-04	2022-06-07	5	2019-08-23 12:08:38	2019-08-23 12:27:51	3	12	Anadoxos 2	123123	f	24	4	\N
55	1	Προμήθεια μηχανογραφικού εξοπλισμού hardware (Η/Υ οθονών, φωτοαντιγραφικών, πολυμηχανημάτων κλπ) 	123456	2019-09-23	7134.022	10	18	388	2019-05-17	64ΝΔΩ6Μ-Τ10	30213300-8 	Επιτραπέζιοι ηλεκτρονικοί υπολογιστές	120955	29029.1992	149984	\N	2019-09-01	2019-12-31	1	2019-09-26 13:58:58	2019-10-09 14:35:01	2	4	ΔΑΕΜ ΑΕ	090033107	f	24	4	\N
57	2	Contract 2 in a row	456	2019-01-01	123	23	112	2	2019-01-01	sdfasdf	123	123	1232	295.679993	1527.68005	\N	2019-01-01	2019-01-01	2	2019-10-18 12:35:30	2019-12-06 10:43:39	3	10	asdf	1234	t	24	4	\N
66	1	asdf	1223323	2020-01-01	1	12	12	213	2020-01-01	123d	234	234	345	82.8000031	427.799988	\N	2020-01-01	2020-01-01	56	2020-01-14 11:50:22	2020-01-14 11:50:22	2	5	234	324	t	24	4	f
64	1	asdf	123	2020-01-01	1	12	12	213	2020-01-01	123d	234	234	345	82.8000031	427.799988	\N	2020-01-01	2020-01-01	56	2020-01-14 11:40:23	2020-01-20 15:35:11	2	5	234	324	t	24	4	f
\.


--
-- TOC entry 3011 (class 0 OID 24978)
-- Dependencies: 204
-- Data for Name: ContractType; Type: TABLE DATA; Schema: Ordering; Owner: dvasilakis
--

COPY "Ordering"."ContractType" ("ContractTypeId", "ContractTypeName") FROM stdin;
2	Προγραμματική
1	Δημόσιας Ανάθεσης
\.


--
-- TOC entry 3042 (class 0 OID 33755)
-- Dependencies: 235
-- Data for Name: ContractUsers; Type: TABLE DATA; Schema: Ordering; Owner: postgres
--

COPY "Ordering"."ContractUsers" ("ContractId", "UserId") FROM stdin;
67	19
67	23
64	9
\.


--
-- TOC entry 3041 (class 0 OID 33631)
-- Dependencies: 234
-- Data for Name: CourtOfAuditors; Type: TABLE DATA; Schema: Ordering; Owner: postgres
--

COPY "Ordering"."CourtOfAuditors" ("Id", "AccountId", "ProtocolNumber", "ProtocolYear", "ScaleNumber", "APDA_ProtocolNumber", "APDA_ProtocolDate") FROM stdin;
\.


--
-- TOC entry 3037 (class 0 OID 33615)
-- Dependencies: 230
-- Data for Name: DecisionBoard; Type: TABLE DATA; Schema: Ordering; Owner: postgres
--

COPY "Ordering"."DecisionBoard" ("Id", "AccountId", "ProtocolNumber", "ProtocolDate", "Content") FROM stdin;
51	120	12	2020-01-19	2020-01-19
52	120	34	2019-12-12	sdfsdfsdf
\.


--
-- TOC entry 3039 (class 0 OID 33623)
-- Dependencies: 232
-- Data for Name: DecisionCoordinatorDecentrilizedAdministration; Type: TABLE DATA; Schema: Ordering; Owner: postgres
--

COPY "Ordering"."DecisionCoordinatorDecentrilizedAdministration" ("Id", "AccountId", "ProtocolNumber", "ProtocolDate") FROM stdin;
\.


--
-- TOC entry 3014 (class 0 OID 24985)
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
4	2	Τεχνολογίας, Πληροφορικής και Επικοινωνιών	Χατζηευστρατίου Ιωάννης	210.5277169	i.chatzieustratiou@athens.gr
5	2	Ανθεκτικότητας και Βιωσιμότητας	Νεοφύτου Γεώργιος	210.3721553	t.anthektikotitas.biosimotitas@athens.gr
7	2	Στρατηγικού Σχεδιασμού και Προγραμματισμού	Κοντώσης Ηλίας	210.5277160	t.stratigikou.sxediasmou.progr@athens.gr
6	2	Καινοτομίας και Εξωστρέφειας	Παπακωνσταντίνου - Παπαδοπούλου Έλλη	210.5277109	t.kainotomias.exostrefias@athens.gr
66	21	Γεννήσεων	Δασκαλάκη Ανδριάνα	210 5277987	t.genniseon@athens.gr
3	2	Διαχείρισης Γεωχωρικών Δεδομένων Πόλεως\r\n	Μαρούγκα Κωνσταντίνα	210.5277185	t.gis@athens.gr
67	21	Γάμων – Θανάτων	Φρανσέ Αλέγρη	210 5277966	t.gamon.thanaton@athens.gr
68	21	Πολιτικών Γάμων	Θεωνά Ελένη-Άννα	210 3722165	t.politikon.gamon@athens.gr
13	3	Διαχείρισης Καυσίμων και Λιπαντικών	Τσιλάβης Γεώργιος	210.3460146	t.diax.kausimon.lipantikon@athens.gr
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
12	3	Αποθηκών Υλικών	Κακριδά  Άννα	210.5225068	t.apothikon.ylikon@athens.gr
\.


--
-- TOC entry 3016 (class 0 OID 24993)
-- Dependencies: 209
-- Data for Name: Direction; Type: TABLE DATA; Schema: Ordering; Owner: dvasilakis
--

COPY "Ordering"."Direction" ("DirectionId", "DirectionName", "DirectionSupervisor", "DirectionTelephone", "DirectionEmail", "DirectionAddress", "DirectionPostCode", "DirectionCity") FROM stdin;
3	Προμηθειών και Αποθηκών	Βακουντούζης Ιωάννης	210.5225446	d.prom.apothikon@athens.gr	Κων/νου Παλαιολόγου 9	104 38	Αθήνα
2	Στρατηγικού Σχεδιασμού, Ανθεκτικότητας, Καινοτομίας και Τεκμηρίωσης	Δρ. Κακριδά Ουρανία	210.5277110	d.stratigikou.sxediasmou@athens.gr	Λιοσίων 22	104 38	Αθήνα
20	Κέντρων Εξυπηρέτησης Πολιτών (Κ.Ε.Π)	Αυγερινός Δημήτριος	210 3836522	d.kep@athens.gr	Ακαδημίας 88	106 78	Αθήνα
21	Αστικής Κατάστασης	Μπούρη Βασιλική	210 3722173	d.ast.katastasis@athens.gr	Αθηνάς 63	10552	Αθήνα
15	Αποκέντρωσης και Διοίκησης	Νεμπεγλεριώτης Ευάγγελος	210 5277541	d.apokentrosi.dioikisi@athens.gr	Λιοσίων 22	104 38	Αθήνα
\.


--
-- TOC entry 3018 (class 0 OID 25001)
-- Dependencies: 211
-- Data for Name: DocumentSignatory; Type: TABLE DATA; Schema: Ordering; Owner: dvasilakis
--

COPY "Ordering"."DocumentSignatory" ("Id", "AccountId", "SignatoryTypeId", "SignatoryId", "DocumentType", "Absense") FROM stdin;
302	120	2	2	1	f
303	120	5	2	1	f
304	120	3	2	1	f
305	120	3	2	2	f
306	121	2	2	1	f
307	121	5	2	1	f
308	121	3	2	1	f
309	121	3	2	2	f
310	122	2	2	1	f
311	122	5	2	1	f
312	122	3	2	1	f
313	122	3	2	2	f
314	123	2	2	1	f
315	123	5	2	1	f
316	123	3	2	1	f
317	123	3	2	2	f
94	52	2	1	1	f
95	52	5	1	1	f
96	52	3	1	1	f
97	52	3	1	2	f
98	53	2	1	1	f
99	53	5	1	1	f
100	53	3	2	1	t
101	53	3	3	2	t
86	50	1	1	1	f
87	50	5	2	1	f
88	50	4	4	1	f
89	50	4	3	2	t
286	109	2	2	1	f
287	109	5	2	1	f
288	109	3	2	1	f
289	109	3	2	2	f
90	51	1	1	1	f
91	51	5	2	1	f
92	51	4	4	1	f
93	51	4	4	2	f
282	108	2	2	1	f
283	108	5	2	1	f
284	108	3	2	1	f
285	108	3	2	2	f
\.


--
-- TOC entry 3019 (class 0 OID 25004)
-- Dependencies: 212
-- Data for Name: Invoice; Type: TABLE DATA; Schema: Ordering; Owner: dvasilakis
--

COPY "Ordering"."Invoice" ("Id", "AccountId", "Number", "Date", "DeliveredDateProtocolNumber", "DeliveredDateProtocolDate", "DeliveredDate") FROM stdin;
91	108	sdf	2019-01-01	1	2019-01-01	2019-11-13
96	120	123	2020-01-19	12	2020-01-19	2020-01-19
97	121	23	2019-01-01	12	2019-01-01	2019-01-01
98	122	12	2020-01-20	1	2020-01-20	2020-01-20
99	123	123	2019-01-01	23	2019-01-01	2019-01-01
36	52	asd	2019-01-01	3	2019-01-01	\N
37	53	123	2019-01-02	3	2019-01-01	\N
34	50	2343	2018-12-31	2314	3219-12-31	\N
35	51	123	2019-01-01	1	2019-01-01	\N
\.


--
-- TOC entry 3035 (class 0 OID 25297)
-- Dependencies: 228
-- Data for Name: LogError; Type: TABLE DATA; Schema: Ordering; Owner: dvasilakis
--

COPY "Ordering"."LogError" ("Id", "Username", "ErrorMessage", "DateCreated") FROM stdin;
520	\N	Message: Cannot read property 'length' of null\nStack: \n	2020-01-20
523	\N	Message: Cannot read property 'length' of null\nStack: \n	2020-01-20
525	\N	Message: Cannot read property 'length' of null\nStack: \n	2020-01-20
518	\N	Message: Cannot read property 'length' of null\nStack: \n	2020-01-20
521	dvasilakis	Message: Loading chunk 0 failed.\n(error: http://localhost:3000/static/js/0.chunk.js)\nStack: \n	2020-01-20
522	dvasilakis	Message: Loading chunk 0 failed.\n(error: http://localhost:3000/static/js/0.chunk.js)\nStack: \n	2020-01-20
524	\N	Message: Cannot read property 'length' of null\nStack: \n	2020-01-20
526	dvasilakis	Message: Cannot read property 'call' of undefined\nStack: \n	2020-01-20
515	dvasilakis	Message: Loading chunk 0 failed.\n(error: http://localhost:3000/static/js/0.chunk.js)\nStack: \n	2020-01-20
516	dvasilakis	Message: Loading chunk 0 failed.\n(error: http://localhost:3000/static/js/0.chunk.js)\nStack: \n	2020-01-20
517	dvasilakis	Message: Loading chunk 0 failed.\n(error: http://localhost:3000/static/js/0.chunk.js)\nStack: \n	2020-01-20
519	\N	Message: Cannot read property 'length' of null\nStack: \n	2020-01-20
\.


--
-- TOC entry 3026 (class 0 OID 25136)
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
-- TOC entry 3021 (class 0 OID 25009)
-- Dependencies: 214
-- Data for Name: Signatory; Type: TABLE DATA; Schema: Ordering; Owner: dvasilakis
--

COPY "Ordering"."Signatory" ("Id", "Name") FROM stdin;
2	ΙΩΑΝΝΗΣ ΧΑΤΖΗΕΥΣΤΡΑΤΙΟΥ
3	ΠΑΠΑΚΩΝΣΤΑΝΤΙΝΟΥ – ΠΑΠΑΔΟΠΟΥΛΟΥ ΕΛΛΗ
4	Δρ. ΟΥΡΑΝΙΑ Β. ΚΑΚΡΙΔΑ
1	ΦΩΤΕΙΝΗ ΤΣΟΤΡΑ
\.


--
-- TOC entry 3022 (class 0 OID 25012)
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
-- TOC entry 3031 (class 0 OID 25267)
-- Dependencies: 224
-- Data for Name: User; Type: TABLE DATA; Schema: Ordering; Owner: dvasilakis
--

COPY "Ordering"."User" ("Id", "Username", "Password", "Role", "Firstname", "Lastname") FROM stdin;
20	p.chalkitis	$2a$10$WyTeEUVG7p5B68syVSC6fe4VqFrPnwown84khLeR920Kf/ChMeR1i	1	Παύλος 	Χαλκίτης
4	dvasilakis	$2a$10$uZiLUhOIDVFc5C6bdu9Lq.6n9p38l90hCYy10pIrU42nLpYe5FR3K	1	Δημήτριος 	Βασιλάκης
3	admin	$2a$10$80mc2Ltf0DBkNvpzkQu51utFnve2iH62IVPO8vGefn2XPrQKvUtti	1	Διαχειριστής	
16	test1	test1	2	test1	
19	m.apostolopoulou	$2a$10$RxnwA6b8Kqv.TYCGjqji9.z8dLcTZcnrdBMMBuhmMb2w/Zm19Xdwm	3	Μαρία	Αποστολοπούλου
21	k.kaloutas	$2a$10$ix4aMH88ybzSGJLVTuDHHO7Eh2jsZNUGuF1XLsfFojoeIOneibYW2	1	Κων/νος	Καλουτάς
22	i.chatzieustratiou	$2a$10$QOWDKVhn7I98.ARMOMEm3eoX9X0LuVE2m.4V8Kb6t5VK7MbJ.wrwC	2	Ιωάννης	Χατζηευστρατίου
23	r.paschou	$2a$10$D2VGEY58KY394pZinlrsguKERLVLqKTQBDAoAAJZoHwuVBl2cnjFy	1	Ρωξάνη	Πάσχου
9	jimakos	$2a$10$/RrPU7/xgJ9DExzruJhLbeGDIxjT3hpzTTujiMrJNSwVeuQ2QO.h6	2	Jimakos	\N
\.


--
-- TOC entry 3033 (class 0 OID 25281)
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
-- TOC entry 3067 (class 0 OID 0)
-- Dependencies: 198
-- Name: AAY_Id_seq; Type: SEQUENCE SET; Schema: Ordering; Owner: dvasilakis
--

SELECT pg_catalog.setval('"Ordering"."AAY_Id_seq"', 108, true);


--
-- TOC entry 3068 (class 0 OID 0)
-- Dependencies: 200
-- Name: Account_Id_seq; Type: SEQUENCE SET; Schema: Ordering; Owner: dvasilakis
--

SELECT pg_catalog.setval('"Ordering"."Account_Id_seq"', 123, true);


--
-- TOC entry 3069 (class 0 OID 0)
-- Dependencies: 202
-- Name: CC_Id_seq; Type: SEQUENCE SET; Schema: Ordering; Owner: dvasilakis
--

SELECT pg_catalog.setval('"Ordering"."CC_Id_seq"', 205, true);


--
-- TOC entry 3070 (class 0 OID 0)
-- Dependencies: 205
-- Name: ContractType_Id_seq; Type: SEQUENCE SET; Schema: Ordering; Owner: dvasilakis
--

SELECT pg_catalog.setval('"Ordering"."ContractType_Id_seq"', 15, true);


--
-- TOC entry 3071 (class 0 OID 0)
-- Dependencies: 206
-- Name: Contract_Id_seq; Type: SEQUENCE SET; Schema: Ordering; Owner: dvasilakis
--

SELECT pg_catalog.setval('"Ordering"."Contract_Id_seq"', 67, true);


--
-- TOC entry 3072 (class 0 OID 0)
-- Dependencies: 233
-- Name: CourtOfAuditors_Id_seq; Type: SEQUENCE SET; Schema: Ordering; Owner: postgres
--

SELECT pg_catalog.setval('"Ordering"."CourtOfAuditors_Id_seq"', 6, true);


--
-- TOC entry 3073 (class 0 OID 0)
-- Dependencies: 229
-- Name: DecisionBoard_Id_seq; Type: SEQUENCE SET; Schema: Ordering; Owner: postgres
--

SELECT pg_catalog.setval('"Ordering"."DecisionBoard_Id_seq"', 52, true);


--
-- TOC entry 3074 (class 0 OID 0)
-- Dependencies: 231
-- Name: DecisionCoordinatorDecentrilizedAdministration_Id_seq; Type: SEQUENCE SET; Schema: Ordering; Owner: postgres
--

SELECT pg_catalog.setval('"Ordering"."DecisionCoordinatorDecentrilizedAdministration_Id_seq"', 48, true);


--
-- TOC entry 3075 (class 0 OID 0)
-- Dependencies: 208
-- Name: Department_Id_seq; Type: SEQUENCE SET; Schema: Ordering; Owner: dvasilakis
--

SELECT pg_catalog.setval('"Ordering"."Department_Id_seq"', 68, true);


--
-- TOC entry 3076 (class 0 OID 0)
-- Dependencies: 210
-- Name: Direction_Id_seq; Type: SEQUENCE SET; Schema: Ordering; Owner: dvasilakis
--

SELECT pg_catalog.setval('"Ordering"."Direction_Id_seq"', 21, true);


--
-- TOC entry 3077 (class 0 OID 0)
-- Dependencies: 213
-- Name: Invoice_Id_seq; Type: SEQUENCE SET; Schema: Ordering; Owner: dvasilakis
--

SELECT pg_catalog.setval('"Ordering"."Invoice_Id_seq"', 99, true);


--
-- TOC entry 3078 (class 0 OID 0)
-- Dependencies: 227
-- Name: LogError_Id_seq; Type: SEQUENCE SET; Schema: Ordering; Owner: dvasilakis
--

SELECT pg_catalog.setval('"Ordering"."LogError_Id_seq"', 526, true);


--
-- TOC entry 3079 (class 0 OID 0)
-- Dependencies: 220
-- Name: MunicipalAgencies_Id_seq; Type: SEQUENCE SET; Schema: Ordering; Owner: dvasilakis
--

SELECT pg_catalog.setval('"Ordering"."MunicipalAgencies_Id_seq"', 11, true);


--
-- TOC entry 3080 (class 0 OID 0)
-- Dependencies: 218
-- Name: Reservations_Id_seq; Type: SEQUENCE SET; Schema: Ordering; Owner: dvasilakis
--

SELECT pg_catalog.setval('"Ordering"."Reservations_Id_seq"', 26, true);


--
-- TOC entry 3081 (class 0 OID 0)
-- Dependencies: 216
-- Name: SignatoryType_Id_seq; Type: SEQUENCE SET; Schema: Ordering; Owner: dvasilakis
--

SELECT pg_catalog.setval('"Ordering"."SignatoryType_Id_seq"', 8, true);


--
-- TOC entry 3082 (class 0 OID 0)
-- Dependencies: 217
-- Name: Signatory_Id_seq; Type: SEQUENCE SET; Schema: Ordering; Owner: dvasilakis
--

SELECT pg_catalog.setval('"Ordering"."Signatory_Id_seq"', 8, true);


--
-- TOC entry 3083 (class 0 OID 0)
-- Dependencies: 225
-- Name: UserRoles_Id_seq; Type: SEQUENCE SET; Schema: Ordering; Owner: dvasilakis
--

SELECT pg_catalog.setval('"Ordering"."UserRoles_Id_seq"', 6, true);


--
-- TOC entry 3084 (class 0 OID 0)
-- Dependencies: 223
-- Name: User_Id_seq; Type: SEQUENCE SET; Schema: Ordering; Owner: dvasilakis
--

SELECT pg_catalog.setval('"Ordering"."User_Id_seq"', 23, true);


--
-- TOC entry 3085 (class 0 OID 0)
-- Dependencies: 236
-- Name: contractusers_id_seq; Type: SEQUENCE SET; Schema: Ordering; Owner: postgres
--

SELECT pg_catalog.setval('"Ordering".contractusers_id_seq', 4, true);


--
-- TOC entry 3086 (class 0 OID 0)
-- Dependencies: 222
-- Name: documentsignatory_id_seq; Type: SEQUENCE SET; Schema: Ordering; Owner: dvasilakis
--

SELECT pg_catalog.setval('"Ordering".documentsignatory_id_seq', 317, true);


--
-- TOC entry 2830 (class 2606 OID 25031)
-- Name: AAY AAY_pkey; Type: CONSTRAINT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."AAY"
    ADD CONSTRAINT "AAY_pkey" PRIMARY KEY ("Id");


--
-- TOC entry 2832 (class 2606 OID 25033)
-- Name: Account Account_pkey; Type: CONSTRAINT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."Account"
    ADD CONSTRAINT "Account_pkey" PRIMARY KEY ("Id");


--
-- TOC entry 2834 (class 2606 OID 25035)
-- Name: CC CC_pkey; Type: CONSTRAINT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."CC"
    ADD CONSTRAINT "CC_pkey" PRIMARY KEY ("Id");


--
-- TOC entry 2838 (class 2606 OID 25039)
-- Name: ContractType ContractType_ContactType_pkey; Type: CONSTRAINT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."ContractType"
    ADD CONSTRAINT "ContractType_ContactType_pkey" PRIMARY KEY ("ContractTypeId");


--
-- TOC entry 2836 (class 2606 OID 25041)
-- Name: Contract Contract_pkey; Type: CONSTRAINT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."Contract"
    ADD CONSTRAINT "Contract_pkey" PRIMARY KEY ("Id");


--
-- TOC entry 2866 (class 2606 OID 33636)
-- Name: CourtOfAuditors CourtOfAuditors_pkey; Type: CONSTRAINT; Schema: Ordering; Owner: postgres
--

ALTER TABLE ONLY "Ordering"."CourtOfAuditors"
    ADD CONSTRAINT "CourtOfAuditors_pkey" PRIMARY KEY ("Id");


--
-- TOC entry 2862 (class 2606 OID 33620)
-- Name: DecisionBoard DecisionBoard_pkey; Type: CONSTRAINT; Schema: Ordering; Owner: postgres
--

ALTER TABLE ONLY "Ordering"."DecisionBoard"
    ADD CONSTRAINT "DecisionBoard_pkey" PRIMARY KEY ("Id");


--
-- TOC entry 2864 (class 2606 OID 33628)
-- Name: DecisionCoordinatorDecentrilizedAdministration DecisionCoordinatorDecentrilizedAdministration_pkey; Type: CONSTRAINT; Schema: Ordering; Owner: postgres
--

ALTER TABLE ONLY "Ordering"."DecisionCoordinatorDecentrilizedAdministration"
    ADD CONSTRAINT "DecisionCoordinatorDecentrilizedAdministration_pkey" PRIMARY KEY ("Id");


--
-- TOC entry 2840 (class 2606 OID 25043)
-- Name: Department Department_pkey; Type: CONSTRAINT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."Department"
    ADD CONSTRAINT "Department_pkey" PRIMARY KEY ("DepartmentId");


--
-- TOC entry 2842 (class 2606 OID 25045)
-- Name: Direction Direction_pkey; Type: CONSTRAINT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."Direction"
    ADD CONSTRAINT "Direction_pkey" PRIMARY KEY ("DirectionId");


--
-- TOC entry 2844 (class 2606 OID 25206)
-- Name: DocumentSignatory DocumentSignatories_pkey; Type: CONSTRAINT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."DocumentSignatory"
    ADD CONSTRAINT "DocumentSignatories_pkey" PRIMARY KEY ("Id");


--
-- TOC entry 2846 (class 2606 OID 25049)
-- Name: Invoice Invoice_pkey; Type: CONSTRAINT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."Invoice"
    ADD CONSTRAINT "Invoice_pkey" PRIMARY KEY ("Id");


--
-- TOC entry 2860 (class 2606 OID 25305)
-- Name: LogError LogError_pkey; Type: CONSTRAINT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."LogError"
    ADD CONSTRAINT "LogError_pkey" PRIMARY KEY ("Id");


--
-- TOC entry 2854 (class 2606 OID 25170)
-- Name: Agencies MunicipalAgencies_pkey; Type: CONSTRAINT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."Agencies"
    ADD CONSTRAINT "MunicipalAgencies_pkey" PRIMARY KEY ("Id");


--
-- TOC entry 2852 (class 2606 OID 25141)
-- Name: Reservations Reservations_pkey; Type: CONSTRAINT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."Reservations"
    ADD CONSTRAINT "Reservations_pkey" PRIMARY KEY ("Id");


--
-- TOC entry 2850 (class 2606 OID 25051)
-- Name: SignatoryType SignatoryType_pkey; Type: CONSTRAINT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."SignatoryType"
    ADD CONSTRAINT "SignatoryType_pkey" PRIMARY KEY ("Id");


--
-- TOC entry 2848 (class 2606 OID 25053)
-- Name: Signatory Signatory_pkey; Type: CONSTRAINT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."Signatory"
    ADD CONSTRAINT "Signatory_pkey" PRIMARY KEY ("Id");


--
-- TOC entry 2858 (class 2606 OID 25289)
-- Name: UserRoles UserRoles_pkey; Type: CONSTRAINT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."UserRoles"
    ADD CONSTRAINT "UserRoles_pkey" PRIMARY KEY ("Id");


--
-- TOC entry 2856 (class 2606 OID 25272)
-- Name: User User_pkey; Type: CONSTRAINT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY ("Id");


--
-- TOC entry 2867 (class 2606 OID 25215)
-- Name: AAY AAY_fk; Type: FK CONSTRAINT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."AAY"
    ADD CONSTRAINT "AAY_fk" FOREIGN KEY ("AccountId") REFERENCES "Ordering"."Account"("Id") ON DELETE CASCADE;


--
-- TOC entry 2868 (class 2606 OID 25220)
-- Name: Account Account_fk; Type: FK CONSTRAINT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."Account"
    ADD CONSTRAINT "Account_fk" FOREIGN KEY ("ContractId") REFERENCES "Ordering"."Contract"("Id") ON DELETE CASCADE;


--
-- TOC entry 2869 (class 2606 OID 25225)
-- Name: CC CC_fk; Type: FK CONSTRAINT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."CC"
    ADD CONSTRAINT "CC_fk" FOREIGN KEY ("AccountId") REFERENCES "Ordering"."Account"("Id") ON DELETE CASCADE;


--
-- TOC entry 2882 (class 2606 OID 33765)
-- Name: ContractUsers ContractUsers_fk; Type: FK CONSTRAINT; Schema: Ordering; Owner: postgres
--

ALTER TABLE ONLY "Ordering"."ContractUsers"
    ADD CONSTRAINT "ContractUsers_fk" FOREIGN KEY ("ContractId") REFERENCES "Ordering"."Contract"("Id") ON DELETE CASCADE;


--
-- TOC entry 2870 (class 2606 OID 25069)
-- Name: Contract Contract_fk; Type: FK CONSTRAINT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."Contract"
    ADD CONSTRAINT "Contract_fk" FOREIGN KEY ("ContractTypeId") REFERENCES "Ordering"."ContractType"("ContractTypeId");


--
-- TOC entry 2873 (class 2606 OID 33750)
-- Name: Contract Contract_fk1; Type: FK CONSTRAINT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."Contract"
    ADD CONSTRAINT "Contract_fk1" FOREIGN KEY ("OwnerId") REFERENCES "Ordering"."User"("Id");


--
-- TOC entry 2871 (class 2606 OID 25100)
-- Name: Contract Contract_fk2; Type: FK CONSTRAINT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."Contract"
    ADD CONSTRAINT "Contract_fk2" FOREIGN KEY ("DirectionId") REFERENCES "Ordering"."Direction"("DirectionId");


--
-- TOC entry 2872 (class 2606 OID 25105)
-- Name: Contract Contract_fk3; Type: FK CONSTRAINT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."Contract"
    ADD CONSTRAINT "Contract_fk3" FOREIGN KEY ("DepartmentId") REFERENCES "Ordering"."Department"("DepartmentId");


--
-- TOC entry 2881 (class 2606 OID 33642)
-- Name: CourtOfAuditors CourtOfAuditors_fk; Type: FK CONSTRAINT; Schema: Ordering; Owner: postgres
--

ALTER TABLE ONLY "Ordering"."CourtOfAuditors"
    ADD CONSTRAINT "CourtOfAuditors_fk" FOREIGN KEY ("AccountId") REFERENCES "Ordering"."Account"("Id") ON DELETE CASCADE;


--
-- TOC entry 2879 (class 2606 OID 33657)
-- Name: DecisionBoard DecisionBoard_fk; Type: FK CONSTRAINT; Schema: Ordering; Owner: postgres
--

ALTER TABLE ONLY "Ordering"."DecisionBoard"
    ADD CONSTRAINT "DecisionBoard_fk" FOREIGN KEY ("AccountId") REFERENCES "Ordering"."Account"("Id") ON DELETE CASCADE;


--
-- TOC entry 2880 (class 2606 OID 33662)
-- Name: DecisionCoordinatorDecentrilizedAdministration DecisionCoordinatorDecentrilizedAdministration_fk; Type: FK CONSTRAINT; Schema: Ordering; Owner: postgres
--

ALTER TABLE ONLY "Ordering"."DecisionCoordinatorDecentrilizedAdministration"
    ADD CONSTRAINT "DecisionCoordinatorDecentrilizedAdministration_fk" FOREIGN KEY ("AccountId") REFERENCES "Ordering"."Account"("Id") ON DELETE CASCADE;


--
-- TOC entry 2874 (class 2606 OID 25290)
-- Name: Department Department_fk; Type: FK CONSTRAINT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."Department"
    ADD CONSTRAINT "Department_fk" FOREIGN KEY ("DirectionId") REFERENCES "Ordering"."Direction"("DirectionId") ON DELETE CASCADE;


--
-- TOC entry 2875 (class 2606 OID 25230)
-- Name: DocumentSignatory DocumentSignatories_fk; Type: FK CONSTRAINT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."DocumentSignatory"
    ADD CONSTRAINT "DocumentSignatories_fk" FOREIGN KEY ("SignatoryTypeId") REFERENCES "Ordering"."SignatoryType"("Id") ON DELETE CASCADE;


--
-- TOC entry 2876 (class 2606 OID 25235)
-- Name: DocumentSignatory DocumentSignatories_fk1; Type: FK CONSTRAINT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."DocumentSignatory"
    ADD CONSTRAINT "DocumentSignatories_fk1" FOREIGN KEY ("AccountId") REFERENCES "Ordering"."Account"("Id") ON DELETE CASCADE;


--
-- TOC entry 2877 (class 2606 OID 25240)
-- Name: DocumentSignatory DocumentSignatories_fk2; Type: FK CONSTRAINT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."DocumentSignatory"
    ADD CONSTRAINT "DocumentSignatories_fk2" FOREIGN KEY ("SignatoryId") REFERENCES "Ordering"."Signatory"("Id") ON DELETE CASCADE;


--
-- TOC entry 2878 (class 2606 OID 25245)
-- Name: Invoice Invoice_fk; Type: FK CONSTRAINT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."Invoice"
    ADD CONSTRAINT "Invoice_fk" FOREIGN KEY ("AccountId") REFERENCES "Ordering"."Account"("Id") ON DELETE CASCADE;


-- Completed on 2020-01-20 16:24:05

--
-- PostgreSQL database dump complete
--

