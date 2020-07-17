--
-- PostgreSQL database dump
--

-- Dumped from database version 11.7 (Debian 11.7-0+deb10u1)
-- Dumped by pg_dump version 11.7

-- Started on 2020-07-16 10:31:03

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
-- TOC entry 10 (class 2615 OID 16641)
-- Name: Ordering; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA "Ordering";


ALTER SCHEMA "Ordering" OWNER TO postgres;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 199 (class 1259 OID 16642)
-- Name: AAY; Type: TABLE; Schema: Ordering; Owner: postgres
--

CREATE TABLE "Ordering"."AAY" (
    "Id" bigint NOT NULL,
    "ContractId" bigint NOT NULL,
    "Value" character varying(20),
    "ProtocolNumber" character varying(50),
    "ProtocolDate" date,
    "EadNumber" integer,
    "ADA" character varying(20),
    "OrderNo" smallint,
    "Type" smallint,
    "Overthrow" character varying(50)
);


ALTER TABLE "Ordering"."AAY" OWNER TO postgres;

--
-- TOC entry 200 (class 1259 OID 16645)
-- Name: AAY_Id_seq; Type: SEQUENCE; Schema: Ordering; Owner: postgres
--

CREATE SEQUENCE "Ordering"."AAY_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "Ordering"."AAY_Id_seq" OWNER TO postgres;

--
-- TOC entry 3178 (class 0 OID 0)
-- Dependencies: 200
-- Name: AAY_Id_seq; Type: SEQUENCE OWNED BY; Schema: Ordering; Owner: postgres
--

ALTER SEQUENCE "Ordering"."AAY_Id_seq" OWNED BY "Ordering"."AAY"."Id";


--
-- TOC entry 201 (class 1259 OID 16647)
-- Name: Account; Type: TABLE; Schema: Ordering; Owner: postgres
--

CREATE TABLE "Ordering"."Account" (
    "Id" bigint NOT NULL,
    "ContractId" bigint NOT NULL,
    "Number" integer NOT NULL,
    "Start" date,
    "End" date,
    "AmountPure" numeric(15,3) NOT NULL,
    "AmountFpa" numeric(15,3) NOT NULL,
    "AmountTotal" numeric(15,3) NOT NULL,
    "ProtocolNumber" character varying(50),
    "ProtocolDate" date,
    "AmountFullWritten" character varying(2000) NOT NULL,
    "IsFirstOfTheYear" boolean NOT NULL,
    "WorkConfirmationDate" date,
    "DeliveryGoodsDate" date,
    "DocumentDate" date,
    "DateCreated" date,
    "DateModified" date,
    "FirstAccountProtocolNumber" character varying(50),
    "FirstAccountProtocolDate" date
);


ALTER TABLE "Ordering"."Account" OWNER TO postgres;

--
-- TOC entry 244 (class 1259 OID 25161)
-- Name: AccountReservations; Type: TABLE; Schema: Ordering; Owner: postgres
--

CREATE TABLE "Ordering"."AccountReservations" (
    "UserId" bigint,
    "AccountId" bigint,
    "Name" character varying(255),
    "Percentage" numeric(15,3),
    "Stamp" numeric(15,3),
    "StampOGA" numeric(15,3),
    "IsReservation" boolean,
    "Order" smallint
);


ALTER TABLE "Ordering"."AccountReservations" OWNER TO postgres;

--
-- TOC entry 202 (class 1259 OID 16653)
-- Name: Account_Id_seq; Type: SEQUENCE; Schema: Ordering; Owner: postgres
--

CREATE SEQUENCE "Ordering"."Account_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "Ordering"."Account_Id_seq" OWNER TO postgres;

--
-- TOC entry 3179 (class 0 OID 0)
-- Dependencies: 202
-- Name: Account_Id_seq; Type: SEQUENCE OWNED BY; Schema: Ordering; Owner: postgres
--

ALTER SEQUENCE "Ordering"."Account_Id_seq" OWNED BY "Ordering"."Account"."Id";


--
-- TOC entry 203 (class 1259 OID 16655)
-- Name: Agencies; Type: TABLE; Schema: Ordering; Owner: postgres
--

CREATE TABLE "Ordering"."Agencies" (
    "Id" bigint NOT NULL,
    "Name" character varying(1000) NOT NULL
);


ALTER TABLE "Ordering"."Agencies" OWNER TO postgres;

--
-- TOC entry 204 (class 1259 OID 16661)
-- Name: Agencies_Id_seq; Type: SEQUENCE; Schema: Ordering; Owner: postgres
--

CREATE SEQUENCE "Ordering"."Agencies_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "Ordering"."Agencies_Id_seq" OWNER TO postgres;

--
-- TOC entry 3180 (class 0 OID 0)
-- Dependencies: 204
-- Name: Agencies_Id_seq; Type: SEQUENCE OWNED BY; Schema: Ordering; Owner: postgres
--

ALTER SEQUENCE "Ordering"."Agencies_Id_seq" OWNED BY "Ordering"."Agencies"."Id";


--
-- TOC entry 237 (class 1259 OID 16910)
-- Name: AuthorDocumentedRequest; Type: TABLE; Schema: Ordering; Owner: postgres
--

CREATE TABLE "Ordering"."AuthorDocumentedRequest" (
    "Id" bigint NOT NULL,
    "ContractId" bigint,
    "ProtocolNumber" character varying(50),
    "ProtocolDate" date,
    "ADA" character varying(50),
    "OrderNo" smallint
);


ALTER TABLE "Ordering"."AuthorDocumentedRequest" OWNER TO postgres;

--
-- TOC entry 236 (class 1259 OID 16908)
-- Name: AuthorDocumentedRequest_Id_seq; Type: SEQUENCE; Schema: Ordering; Owner: postgres
--

CREATE SEQUENCE "Ordering"."AuthorDocumentedRequest_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "Ordering"."AuthorDocumentedRequest_Id_seq" OWNER TO postgres;

--
-- TOC entry 3181 (class 0 OID 0)
-- Dependencies: 236
-- Name: AuthorDocumentedRequest_Id_seq; Type: SEQUENCE OWNED BY; Schema: Ordering; Owner: postgres
--

ALTER SEQUENCE "Ordering"."AuthorDocumentedRequest_Id_seq" OWNED BY "Ordering"."AuthorDocumentedRequest"."Id";


--
-- TOC entry 243 (class 1259 OID 17013)
-- Name: CC; Type: TABLE; Schema: Ordering; Owner: postgres
--

CREATE TABLE "Ordering"."CC" (
    "ContractId" bigint,
    "AccountId" bigint NOT NULL,
    "CC" character varying(2000),
    "Order" smallint
);


ALTER TABLE "Ordering"."CC" OWNER TO postgres;

--
-- TOC entry 205 (class 1259 OID 16669)
-- Name: Contract; Type: TABLE; Schema: Ordering; Owner: postgres
--

CREATE TABLE "Ordering"."Contract" (
    "Id" bigint NOT NULL,
    "ContractTypeId" integer,
    "Title" character varying(2000),
    "ProtocolNumber" character varying(50),
    "ProtocolDate" date,
    "KAE" character varying(20),
    "Actor" character varying(5),
    "CodeDirection" character varying(5),
    "AwardNumber" character varying(50),
    "AwardDate" date,
    "AwardAda" character varying(20),
    "CpvCode" character varying(20),
    "CpvTitle" character varying(255),
    "AmountPure" numeric(15,3),
    "AmountFpa" numeric(15,3),
    "AmountTotal" numeric(15,3),
    "Balance" numeric(15,3),
    "Start" date,
    "End" date,
    "NumberOfAccounts" integer,
    "DateCreated" timestamp(0) without time zone,
    "DateModified" timestamp(0) without time zone,
    "Direction" character varying(2000),
    "Department" character varying(2000),
    "ConcessionaireName" character varying(1000),
    "ConcessionaireAFM" character varying(50),
    "HasDownPayment" boolean DEFAULT false NOT NULL,
    "FpaValue" integer,
    "OwnerId" character varying(255),
    "AllUsers" boolean,
    "LawArticle" character varying(1000)
);
ALTER TABLE ONLY "Ordering"."Contract" ALTER COLUMN "AwardNumber" SET STATISTICS 0;
ALTER TABLE ONLY "Ordering"."Contract" ALTER COLUMN "AwardDate" SET STATISTICS 0;
ALTER TABLE ONLY "Ordering"."Contract" ALTER COLUMN "AwardAda" SET STATISTICS 0;
ALTER TABLE ONLY "Ordering"."Contract" ALTER COLUMN "CpvCode" SET STATISTICS 0;
ALTER TABLE ONLY "Ordering"."Contract" ALTER COLUMN "CpvTitle" SET STATISTICS 0;


ALTER TABLE "Ordering"."Contract" OWNER TO postgres;

--
-- TOC entry 206 (class 1259 OID 16676)
-- Name: ContractType; Type: TABLE; Schema: Ordering; Owner: postgres
--

CREATE TABLE "Ordering"."ContractType" (
    "ContractTypeId" bigint NOT NULL,
    "ContractTypeName" character varying(255)
);


ALTER TABLE "Ordering"."ContractType" OWNER TO postgres;

--
-- TOC entry 207 (class 1259 OID 16679)
-- Name: ContractType_ContractTypeId_seq; Type: SEQUENCE; Schema: Ordering; Owner: postgres
--

CREATE SEQUENCE "Ordering"."ContractType_ContractTypeId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "Ordering"."ContractType_ContractTypeId_seq" OWNER TO postgres;

--
-- TOC entry 3182 (class 0 OID 0)
-- Dependencies: 207
-- Name: ContractType_ContractTypeId_seq; Type: SEQUENCE OWNED BY; Schema: Ordering; Owner: postgres
--

ALTER SEQUENCE "Ordering"."ContractType_ContractTypeId_seq" OWNED BY "Ordering"."ContractType"."ContractTypeId";


--
-- TOC entry 208 (class 1259 OID 16681)
-- Name: ContractUsers; Type: TABLE; Schema: Ordering; Owner: postgres
--

CREATE TABLE "Ordering"."ContractUsers" (
    "ContractId" bigint NOT NULL,
    "UserId" bigint NOT NULL
);


ALTER TABLE "Ordering"."ContractUsers" OWNER TO postgres;

--
-- TOC entry 209 (class 1259 OID 16684)
-- Name: Contract_Id_seq; Type: SEQUENCE; Schema: Ordering; Owner: postgres
--

CREATE SEQUENCE "Ordering"."Contract_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "Ordering"."Contract_Id_seq" OWNER TO postgres;

--
-- TOC entry 3183 (class 0 OID 0)
-- Dependencies: 209
-- Name: Contract_Id_seq; Type: SEQUENCE OWNED BY; Schema: Ordering; Owner: postgres
--

ALTER SEQUENCE "Ordering"."Contract_Id_seq" OWNED BY "Ordering"."Contract"."Id";


--
-- TOC entry 210 (class 1259 OID 16686)
-- Name: CourtOfAuditors; Type: TABLE; Schema: Ordering; Owner: postgres
--

CREATE TABLE "Ordering"."CourtOfAuditors" (
    "Id" bigint NOT NULL,
    "ContractId" bigint NOT NULL,
    "ProtocolNumber" character varying(50),
    "ProtocolYear" character varying(5),
    "ScaleNumber" character varying(10),
    "APDA_ProtocolNumber" character varying(50),
    "APDA_ProtocolDate" date,
    "OrderNo" smallint,
    "ContentAccount" character varying(1000)
);


ALTER TABLE "Ordering"."CourtOfAuditors" OWNER TO postgres;

--
-- TOC entry 211 (class 1259 OID 16689)
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
-- TOC entry 3184 (class 0 OID 0)
-- Dependencies: 211
-- Name: CourtOfAuditors_Id_seq; Type: SEQUENCE OWNED BY; Schema: Ordering; Owner: postgres
--

ALTER SEQUENCE "Ordering"."CourtOfAuditors_Id_seq" OWNED BY "Ordering"."CourtOfAuditors"."Id";


--
-- TOC entry 212 (class 1259 OID 16691)
-- Name: DecisionBoard; Type: TABLE; Schema: Ordering; Owner: postgres
--

CREATE TABLE "Ordering"."DecisionBoard" (
    "Id" bigint NOT NULL,
    "ContractId" bigint NOT NULL,
    "ProtocolNumber" character varying(50),
    "ProtocolDate" date,
    "ContentAccount" character varying(2000),
    "ADA" character varying(50),
    "OriginalCopies" integer,
    "PhotoCopies" integer,
    "OrderNo" smallint,
    "ContentTransmission" character varying(2000)
);


ALTER TABLE "Ordering"."DecisionBoard" OWNER TO postgres;

--
-- TOC entry 213 (class 1259 OID 16697)
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
-- TOC entry 3185 (class 0 OID 0)
-- Dependencies: 213
-- Name: DecisionBoard_Id_seq; Type: SEQUENCE OWNED BY; Schema: Ordering; Owner: postgres
--

ALTER SEQUENCE "Ordering"."DecisionBoard_Id_seq" OWNED BY "Ordering"."DecisionBoard"."Id";


--
-- TOC entry 214 (class 1259 OID 16699)
-- Name: DecisionCoordinatorDecentrilizedAdministration; Type: TABLE; Schema: Ordering; Owner: postgres
--

CREATE TABLE "Ordering"."DecisionCoordinatorDecentrilizedAdministration" (
    "Id" bigint NOT NULL,
    "ContractId" bigint NOT NULL,
    "ProtocolNumber" character varying(50),
    "ProtocolDate" date,
    "ADA" character varying(50),
    "OriginalCopies" integer,
    "PhotoCopies" integer,
    "OrderNo" smallint,
    "DecisionBoardProtocol" character varying(100),
    "APDA_ProtocolNumber" character varying(50),
    "APDA_ProtocolDate" date,
    "ActionTransmission" character varying(1000),
    "ActionAccount" character varying(2000)
);


ALTER TABLE "Ordering"."DecisionCoordinatorDecentrilizedAdministration" OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 16702)
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
-- TOC entry 3186 (class 0 OID 0)
-- Dependencies: 215
-- Name: DecisionCoordinatorDecentrilizedAdministration_Id_seq; Type: SEQUENCE OWNED BY; Schema: Ordering; Owner: postgres
--

ALTER SEQUENCE "Ordering"."DecisionCoordinatorDecentrilizedAdministration_Id_seq" OWNED BY "Ordering"."DecisionCoordinatorDecentrilizedAdministration"."Id";


--
-- TOC entry 216 (class 1259 OID 16704)
-- Name: Department; Type: TABLE; Schema: Ordering; Owner: postgres
--

CREATE TABLE "Ordering"."Department" (
    "DepartmentId" smallint NOT NULL,
    "DirectionId" smallint NOT NULL,
    "DepartmentName" character varying(2000) NOT NULL,
    "DepartmentSupervisor" character varying(255),
    "DepartmentTelephone" character varying(200),
    "DepartmentEmail" character varying(255)
);


ALTER TABLE "Ordering"."Department" OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16710)
-- Name: Department_DepartmentId_seq; Type: SEQUENCE; Schema: Ordering; Owner: postgres
--

CREATE SEQUENCE "Ordering"."Department_DepartmentId_seq"
    AS smallint
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "Ordering"."Department_DepartmentId_seq" OWNER TO postgres;

--
-- TOC entry 3187 (class 0 OID 0)
-- Dependencies: 217
-- Name: Department_DepartmentId_seq; Type: SEQUENCE OWNED BY; Schema: Ordering; Owner: postgres
--

ALTER SEQUENCE "Ordering"."Department_DepartmentId_seq" OWNED BY "Ordering"."Department"."DepartmentId";


--
-- TOC entry 218 (class 1259 OID 16712)
-- Name: Direction; Type: TABLE; Schema: Ordering; Owner: postgres
--

CREATE TABLE "Ordering"."Direction" (
    "DirectionId" smallint NOT NULL,
    "DirectionName" character varying(2000),
    "DirectionSupervisor" character varying(255),
    "DirectionTelephone" character varying(200),
    "DirectionEmail" character varying(255),
    "DirectionAddress" character varying(255),
    "DirectionPostCode" character varying(7),
    "DirectionCity" character varying(50)
);


ALTER TABLE "Ordering"."Direction" OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16718)
-- Name: Direction_DirectionId_seq; Type: SEQUENCE; Schema: Ordering; Owner: postgres
--

CREATE SEQUENCE "Ordering"."Direction_DirectionId_seq"
    AS smallint
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "Ordering"."Direction_DirectionId_seq" OWNER TO postgres;

--
-- TOC entry 3188 (class 0 OID 0)
-- Dependencies: 219
-- Name: Direction_DirectionId_seq; Type: SEQUENCE OWNED BY; Schema: Ordering; Owner: postgres
--

ALTER SEQUENCE "Ordering"."Direction_DirectionId_seq" OWNED BY "Ordering"."Direction"."DirectionId";


--
-- TOC entry 242 (class 1259 OID 16971)
-- Name: DocumentSignatory; Type: TABLE; Schema: Ordering; Owner: postgres
--

CREATE TABLE "Ordering"."DocumentSignatory" (
    "Id" bigint NOT NULL,
    "AccountId" bigint,
    "SignatoryTypeId" bigint,
    "SignatoryId" bigint,
    "DocumentType" smallint,
    "Absense" boolean
);


ALTER TABLE "Ordering"."DocumentSignatory" OWNER TO postgres;

--
-- TOC entry 241 (class 1259 OID 16969)
-- Name: DocumentSignatory_Id_seq; Type: SEQUENCE; Schema: Ordering; Owner: postgres
--

CREATE SEQUENCE "Ordering"."DocumentSignatory_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "Ordering"."DocumentSignatory_Id_seq" OWNER TO postgres;

--
-- TOC entry 3189 (class 0 OID 0)
-- Dependencies: 241
-- Name: DocumentSignatory_Id_seq; Type: SEQUENCE OWNED BY; Schema: Ordering; Owner: postgres
--

ALTER SEQUENCE "Ordering"."DocumentSignatory_Id_seq" OWNED BY "Ordering"."DocumentSignatory"."Id";


--
-- TOC entry 220 (class 1259 OID 16724)
-- Name: Invoice; Type: TABLE; Schema: Ordering; Owner: postgres
--

CREATE TABLE "Ordering"."Invoice" (
    "Id" bigint NOT NULL,
    "AccountId" bigint NOT NULL,
    "Number" character varying(20),
    "Date" date,
    "DeliveredDateProtocolNumber" character varying(50),
    "DeliveredDateProtocolDate" date,
    "DeliveredDate" date
);


ALTER TABLE "Ordering"."Invoice" OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16727)
-- Name: Invoice_Id_seq; Type: SEQUENCE; Schema: Ordering; Owner: postgres
--

CREATE SEQUENCE "Ordering"."Invoice_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "Ordering"."Invoice_Id_seq" OWNER TO postgres;

--
-- TOC entry 3190 (class 0 OID 0)
-- Dependencies: 221
-- Name: Invoice_Id_seq; Type: SEQUENCE OWNED BY; Schema: Ordering; Owner: postgres
--

ALTER SEQUENCE "Ordering"."Invoice_Id_seq" OWNED BY "Ordering"."Invoice"."Id";


--
-- TOC entry 222 (class 1259 OID 16729)
-- Name: LogError; Type: TABLE; Schema: Ordering; Owner: postgres
--

CREATE TABLE "Ordering"."LogError" (
    "Id" bigint NOT NULL,
    "Username" character varying(50),
    "ErrorMessage" character varying(1000),
    "DateCreated" timestamp(0) without time zone,
    "HttpMethod" character varying(10),
    "HttpPath" character varying(100)
);


ALTER TABLE "Ordering"."LogError" OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 16735)
-- Name: LogError_Id_seq; Type: SEQUENCE; Schema: Ordering; Owner: postgres
--

CREATE SEQUENCE "Ordering"."LogError_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "Ordering"."LogError_Id_seq" OWNER TO postgres;

--
-- TOC entry 3191 (class 0 OID 0)
-- Dependencies: 223
-- Name: LogError_Id_seq; Type: SEQUENCE OWNED BY; Schema: Ordering; Owner: postgres
--

ALTER SEQUENCE "Ordering"."LogError_Id_seq" OWNED BY "Ordering"."LogError"."Id";


--
-- TOC entry 224 (class 1259 OID 16737)
-- Name: MonitoringCommittee; Type: TABLE; Schema: Ordering; Owner: postgres
--

CREATE TABLE "Ordering"."MonitoringCommittee" (
    "AccountId" bigint NOT NULL,
    "DocumentProtocolNumber" character varying(50),
    "DocumentProtocolDate" date,
    "MayorDecisionProtocolNumber" character varying(50),
    "MayorDecisionProtocolDate" date,
    "PracticalDate" date
);


ALTER TABLE "Ordering"."MonitoringCommittee" OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 16740)
-- Name: MonitoringCommittee_AccounttId_seq; Type: SEQUENCE; Schema: Ordering; Owner: postgres
--

CREATE SEQUENCE "Ordering"."MonitoringCommittee_AccounttId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "Ordering"."MonitoringCommittee_AccounttId_seq" OWNER TO postgres;

--
-- TOC entry 3192 (class 0 OID 0)
-- Dependencies: 225
-- Name: MonitoringCommittee_AccounttId_seq; Type: SEQUENCE OWNED BY; Schema: Ordering; Owner: postgres
--

ALTER SEQUENCE "Ordering"."MonitoringCommittee_AccounttId_seq" OWNED BY "Ordering"."MonitoringCommittee"."AccountId";


--
-- TOC entry 226 (class 1259 OID 16742)
-- Name: Reservations; Type: TABLE; Schema: Ordering; Owner: postgres
--

CREATE TABLE "Ordering"."Reservations" (
    "Id" bigint NOT NULL,
    "Name" character varying(255) NOT NULL,
    "Percentage" numeric(15,3) NOT NULL,
    "Stamp" numeric(15,3),
    "StampOGA" numeric(15,3),
    "IsReservation" boolean,
    "Order" smallint
);


ALTER TABLE "Ordering"."Reservations" OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 16745)
-- Name: Reservations_Id_seq; Type: SEQUENCE; Schema: Ordering; Owner: postgres
--

CREATE SEQUENCE "Ordering"."Reservations_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "Ordering"."Reservations_Id_seq" OWNER TO postgres;

--
-- TOC entry 3193 (class 0 OID 0)
-- Dependencies: 227
-- Name: Reservations_Id_seq; Type: SEQUENCE OWNED BY; Schema: Ordering; Owner: postgres
--

ALTER SEQUENCE "Ordering"."Reservations_Id_seq" OWNED BY "Ordering"."Reservations"."Id";


--
-- TOC entry 228 (class 1259 OID 16747)
-- Name: Signatory; Type: TABLE; Schema: Ordering; Owner: postgres
--

CREATE TABLE "Ordering"."Signatory" (
    "Id" smallint NOT NULL,
    "Name" character varying(255)
);


ALTER TABLE "Ordering"."Signatory" OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 16750)
-- Name: SignatoryType; Type: TABLE; Schema: Ordering; Owner: postgres
--

CREATE TABLE "Ordering"."SignatoryType" (
    "Id" smallint NOT NULL,
    "Name" character varying(255)
);


ALTER TABLE "Ordering"."SignatoryType" OWNER TO postgres;

--
-- TOC entry 230 (class 1259 OID 16753)
-- Name: SignatoryType_Id_seq; Type: SEQUENCE; Schema: Ordering; Owner: postgres
--

CREATE SEQUENCE "Ordering"."SignatoryType_Id_seq"
    AS smallint
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "Ordering"."SignatoryType_Id_seq" OWNER TO postgres;

--
-- TOC entry 3194 (class 0 OID 0)
-- Dependencies: 230
-- Name: SignatoryType_Id_seq; Type: SEQUENCE OWNED BY; Schema: Ordering; Owner: postgres
--

ALTER SEQUENCE "Ordering"."SignatoryType_Id_seq" OWNED BY "Ordering"."SignatoryType"."Id";


--
-- TOC entry 231 (class 1259 OID 16755)
-- Name: Signatory_Id_seq; Type: SEQUENCE; Schema: Ordering; Owner: postgres
--

CREATE SEQUENCE "Ordering"."Signatory_Id_seq"
    AS smallint
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "Ordering"."Signatory_Id_seq" OWNER TO postgres;

--
-- TOC entry 3195 (class 0 OID 0)
-- Dependencies: 231
-- Name: Signatory_Id_seq; Type: SEQUENCE OWNED BY; Schema: Ordering; Owner: postgres
--

ALTER SEQUENCE "Ordering"."Signatory_Id_seq" OWNED BY "Ordering"."Signatory"."Id";


--
-- TOC entry 239 (class 1259 OID 16916)
-- Name: SnippetPractical; Type: TABLE; Schema: Ordering; Owner: postgres
--

CREATE TABLE "Ordering"."SnippetPractical" (
    "Id" bigint NOT NULL,
    "ContractId" bigint,
    "ProtocolNumber" character varying(50),
    "ProtocolDate" date,
    "DecisionBoardProtocol" character varying(50),
    "OrderNo" smallint
);


ALTER TABLE "Ordering"."SnippetPractical" OWNER TO postgres;

--
-- TOC entry 238 (class 1259 OID 16914)
-- Name: SnippetPractical_Id_seq; Type: SEQUENCE; Schema: Ordering; Owner: postgres
--

CREATE SEQUENCE "Ordering"."SnippetPractical_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "Ordering"."SnippetPractical_Id_seq" OWNER TO postgres;

--
-- TOC entry 3196 (class 0 OID 0)
-- Dependencies: 238
-- Name: SnippetPractical_Id_seq; Type: SEQUENCE OWNED BY; Schema: Ordering; Owner: postgres
--

ALTER SEQUENCE "Ordering"."SnippetPractical_Id_seq" OWNED BY "Ordering"."SnippetPractical"."Id";


--
-- TOC entry 232 (class 1259 OID 16757)
-- Name: User; Type: TABLE; Schema: Ordering; Owner: postgres
--

CREATE TABLE "Ordering"."User" (
    "Id" bigint NOT NULL,
    "Username" character varying(50),
    "Password" character varying(1000),
    "Role" integer,
    "Firstname" character varying(50),
    "Lastname" character varying(50)
);


ALTER TABLE "Ordering"."User" OWNER TO postgres;

--
-- TOC entry 246 (class 1259 OID 25166)
-- Name: UserReservations; Type: TABLE; Schema: Ordering; Owner: postgres
--

CREATE TABLE "Ordering"."UserReservations" (
    "Id" bigint NOT NULL,
    "UserId" character varying(255) NOT NULL,
    "Name" character varying(255) NOT NULL,
    "Percentage" numeric(15,3) NOT NULL,
    "Stamp" numeric(15,3),
    "StampOGA" numeric(15,3),
    "IsReservation" boolean,
    "Order" smallint
);


ALTER TABLE "Ordering"."UserReservations" OWNER TO postgres;

--
-- TOC entry 245 (class 1259 OID 25164)
-- Name: UserReservations_Id_seq; Type: SEQUENCE; Schema: Ordering; Owner: postgres
--

CREATE SEQUENCE "Ordering"."UserReservations_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "Ordering"."UserReservations_Id_seq" OWNER TO postgres;

--
-- TOC entry 3197 (class 0 OID 0)
-- Dependencies: 245
-- Name: UserReservations_Id_seq; Type: SEQUENCE OWNED BY; Schema: Ordering; Owner: postgres
--

ALTER SEQUENCE "Ordering"."UserReservations_Id_seq" OWNED BY "Ordering"."UserReservations"."Id";


--
-- TOC entry 233 (class 1259 OID 16763)
-- Name: UserRoles; Type: TABLE; Schema: Ordering; Owner: postgres
--

CREATE TABLE "Ordering"."UserRoles" (
    "Id" bigint NOT NULL,
    "Name" character varying
);


ALTER TABLE "Ordering"."UserRoles" OWNER TO postgres;

--
-- TOC entry 234 (class 1259 OID 16769)
-- Name: UserRoles_Id_seq; Type: SEQUENCE; Schema: Ordering; Owner: postgres
--

CREATE SEQUENCE "Ordering"."UserRoles_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "Ordering"."UserRoles_Id_seq" OWNER TO postgres;

--
-- TOC entry 3198 (class 0 OID 0)
-- Dependencies: 234
-- Name: UserRoles_Id_seq; Type: SEQUENCE OWNED BY; Schema: Ordering; Owner: postgres
--

ALTER SEQUENCE "Ordering"."UserRoles_Id_seq" OWNED BY "Ordering"."UserRoles"."Id";


--
-- TOC entry 235 (class 1259 OID 16771)
-- Name: User_Id_seq; Type: SEQUENCE; Schema: Ordering; Owner: postgres
--

CREATE SEQUENCE "Ordering"."User_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "Ordering"."User_Id_seq" OWNER TO postgres;

--
-- TOC entry 3199 (class 0 OID 0)
-- Dependencies: 235
-- Name: User_Id_seq; Type: SEQUENCE OWNED BY; Schema: Ordering; Owner: postgres
--

ALTER SEQUENCE "Ordering"."User_Id_seq" OWNED BY "Ordering"."User"."Id";


--
-- TOC entry 240 (class 1259 OID 16962)
-- Name: documentsignatory_id_seq; Type: SEQUENCE; Schema: Ordering; Owner: postgres
--

CREATE SEQUENCE "Ordering".documentsignatory_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "Ordering".documentsignatory_id_seq OWNER TO postgres;

--
-- TOC entry 2931 (class 2604 OID 16773)
-- Name: AAY Id; Type: DEFAULT; Schema: Ordering; Owner: postgres
--

ALTER TABLE ONLY "Ordering"."AAY" ALTER COLUMN "Id" SET DEFAULT nextval('"Ordering"."AAY_Id_seq"'::regclass);


--
-- TOC entry 2932 (class 2604 OID 16774)
-- Name: Account Id; Type: DEFAULT; Schema: Ordering; Owner: postgres
--

ALTER TABLE ONLY "Ordering"."Account" ALTER COLUMN "Id" SET DEFAULT nextval('"Ordering"."Account_Id_seq"'::regclass);


--
-- TOC entry 2933 (class 2604 OID 16775)
-- Name: Agencies Id; Type: DEFAULT; Schema: Ordering; Owner: postgres
--

ALTER TABLE ONLY "Ordering"."Agencies" ALTER COLUMN "Id" SET DEFAULT nextval('"Ordering"."Agencies_Id_seq"'::regclass);


--
-- TOC entry 2950 (class 2604 OID 16913)
-- Name: AuthorDocumentedRequest Id; Type: DEFAULT; Schema: Ordering; Owner: postgres
--

ALTER TABLE ONLY "Ordering"."AuthorDocumentedRequest" ALTER COLUMN "Id" SET DEFAULT nextval('"Ordering"."AuthorDocumentedRequest_Id_seq"'::regclass);


--
-- TOC entry 2935 (class 2604 OID 16776)
-- Name: Contract Id; Type: DEFAULT; Schema: Ordering; Owner: postgres
--

ALTER TABLE ONLY "Ordering"."Contract" ALTER COLUMN "Id" SET DEFAULT nextval('"Ordering"."Contract_Id_seq"'::regclass);


--
-- TOC entry 2936 (class 2604 OID 16777)
-- Name: ContractType ContractTypeId; Type: DEFAULT; Schema: Ordering; Owner: postgres
--

ALTER TABLE ONLY "Ordering"."ContractType" ALTER COLUMN "ContractTypeId" SET DEFAULT nextval('"Ordering"."ContractType_ContractTypeId_seq"'::regclass);


--
-- TOC entry 2937 (class 2604 OID 16778)
-- Name: CourtOfAuditors Id; Type: DEFAULT; Schema: Ordering; Owner: postgres
--

ALTER TABLE ONLY "Ordering"."CourtOfAuditors" ALTER COLUMN "Id" SET DEFAULT nextval('"Ordering"."CourtOfAuditors_Id_seq"'::regclass);


--
-- TOC entry 2938 (class 2604 OID 16779)
-- Name: DecisionBoard Id; Type: DEFAULT; Schema: Ordering; Owner: postgres
--

ALTER TABLE ONLY "Ordering"."DecisionBoard" ALTER COLUMN "Id" SET DEFAULT nextval('"Ordering"."DecisionBoard_Id_seq"'::regclass);


--
-- TOC entry 2939 (class 2604 OID 16780)
-- Name: DecisionCoordinatorDecentrilizedAdministration Id; Type: DEFAULT; Schema: Ordering; Owner: postgres
--

ALTER TABLE ONLY "Ordering"."DecisionCoordinatorDecentrilizedAdministration" ALTER COLUMN "Id" SET DEFAULT nextval('"Ordering"."DecisionCoordinatorDecentrilizedAdministration_Id_seq"'::regclass);


--
-- TOC entry 2940 (class 2604 OID 16781)
-- Name: Department DepartmentId; Type: DEFAULT; Schema: Ordering; Owner: postgres
--

ALTER TABLE ONLY "Ordering"."Department" ALTER COLUMN "DepartmentId" SET DEFAULT nextval('"Ordering"."Department_DepartmentId_seq"'::regclass);


--
-- TOC entry 2941 (class 2604 OID 16782)
-- Name: Direction DirectionId; Type: DEFAULT; Schema: Ordering; Owner: postgres
--

ALTER TABLE ONLY "Ordering"."Direction" ALTER COLUMN "DirectionId" SET DEFAULT nextval('"Ordering"."Direction_DirectionId_seq"'::regclass);


--
-- TOC entry 2952 (class 2604 OID 16974)
-- Name: DocumentSignatory Id; Type: DEFAULT; Schema: Ordering; Owner: postgres
--

ALTER TABLE ONLY "Ordering"."DocumentSignatory" ALTER COLUMN "Id" SET DEFAULT nextval('"Ordering"."DocumentSignatory_Id_seq"'::regclass);


--
-- TOC entry 2942 (class 2604 OID 16783)
-- Name: Invoice Id; Type: DEFAULT; Schema: Ordering; Owner: postgres
--

ALTER TABLE ONLY "Ordering"."Invoice" ALTER COLUMN "Id" SET DEFAULT nextval('"Ordering"."Invoice_Id_seq"'::regclass);


--
-- TOC entry 2943 (class 2604 OID 16784)
-- Name: LogError Id; Type: DEFAULT; Schema: Ordering; Owner: postgres
--

ALTER TABLE ONLY "Ordering"."LogError" ALTER COLUMN "Id" SET DEFAULT nextval('"Ordering"."LogError_Id_seq"'::regclass);


--
-- TOC entry 2944 (class 2604 OID 16785)
-- Name: MonitoringCommittee AccountId; Type: DEFAULT; Schema: Ordering; Owner: postgres
--

ALTER TABLE ONLY "Ordering"."MonitoringCommittee" ALTER COLUMN "AccountId" SET DEFAULT nextval('"Ordering"."MonitoringCommittee_AccounttId_seq"'::regclass);


--
-- TOC entry 2945 (class 2604 OID 16786)
-- Name: Reservations Id; Type: DEFAULT; Schema: Ordering; Owner: postgres
--

ALTER TABLE ONLY "Ordering"."Reservations" ALTER COLUMN "Id" SET DEFAULT nextval('"Ordering"."Reservations_Id_seq"'::regclass);


--
-- TOC entry 2946 (class 2604 OID 16787)
-- Name: Signatory Id; Type: DEFAULT; Schema: Ordering; Owner: postgres
--

ALTER TABLE ONLY "Ordering"."Signatory" ALTER COLUMN "Id" SET DEFAULT nextval('"Ordering"."Signatory_Id_seq"'::regclass);


--
-- TOC entry 2947 (class 2604 OID 16788)
-- Name: SignatoryType Id; Type: DEFAULT; Schema: Ordering; Owner: postgres
--

ALTER TABLE ONLY "Ordering"."SignatoryType" ALTER COLUMN "Id" SET DEFAULT nextval('"Ordering"."SignatoryType_Id_seq"'::regclass);


--
-- TOC entry 2951 (class 2604 OID 16919)
-- Name: SnippetPractical Id; Type: DEFAULT; Schema: Ordering; Owner: postgres
--

ALTER TABLE ONLY "Ordering"."SnippetPractical" ALTER COLUMN "Id" SET DEFAULT nextval('"Ordering"."SnippetPractical_Id_seq"'::regclass);


--
-- TOC entry 2948 (class 2604 OID 16789)
-- Name: User Id; Type: DEFAULT; Schema: Ordering; Owner: postgres
--

ALTER TABLE ONLY "Ordering"."User" ALTER COLUMN "Id" SET DEFAULT nextval('"Ordering"."User_Id_seq"'::regclass);


--
-- TOC entry 2953 (class 2604 OID 25169)
-- Name: UserReservations Id; Type: DEFAULT; Schema: Ordering; Owner: postgres
--

ALTER TABLE ONLY "Ordering"."UserReservations" ALTER COLUMN "Id" SET DEFAULT nextval('"Ordering"."UserReservations_Id_seq"'::regclass);


--
-- TOC entry 2949 (class 2604 OID 16790)
-- Name: UserRoles Id; Type: DEFAULT; Schema: Ordering; Owner: postgres
--

ALTER TABLE ONLY "Ordering"."UserRoles" ALTER COLUMN "Id" SET DEFAULT nextval('"Ordering"."UserRoles_Id_seq"'::regclass);


--
-- TOC entry 3125 (class 0 OID 16642)
-- Dependencies: 199
-- Data for Name: AAY; Type: TABLE DATA; Schema: Ordering; Owner: postgres
--

COPY "Ordering"."AAY" ("Id", "ContractId", "Value", "ProtocolNumber", "ProtocolDate", "EadNumber", "ADA", "OrderNo", "Type", "Overthrow") FROM stdin;
121	76	Α01197	254432	2019-10-08	1196	6ΡΗ5Ω6Μ-ΨΗΚ	1	1	\N
122	76	\N	333293	2019-12-31	\N	ΨΘΡΨΩ6Μ-Λ3Υ	2	3	Α01197/2019
123	76	Α00661	070524	2020-03-03	661	ΨΛΓΘΩ6Μ-Ο5Η	3	1	\N
127	90	Π00835	232878	2017-08-16	1	1234	1	1	\N
124	89	Π00799/2018	167601	2018-06-28	\N	ΩΨ6ΡΩ6Μ-9ΩΠ	1	0	\N
125	89	Π00799/2018	179391	2018-07-11	\N	ΩΨ6ΡΩ6Μ-9ΩΠ	2	1	\N
126	89	Α00277	23961	2019-01-23	\N	\N	3	2	\N
\.


--
-- TOC entry 3127 (class 0 OID 16647)
-- Dependencies: 201
-- Data for Name: Account; Type: TABLE DATA; Schema: Ordering; Owner: postgres
--

COPY "Ordering"."Account" ("Id", "ContractId", "Number", "Start", "End", "AmountPure", "AmountFpa", "AmountTotal", "ProtocolNumber", "ProtocolDate", "AmountFullWritten", "IsFirstOfTheYear", "WorkConfirmationDate", "DeliveryGoodsDate", "DocumentDate", "DateCreated", "DateModified", "FirstAccountProtocolNumber", "FirstAccountProtocolDate") FROM stdin;
143	76	1	\N	\N	158379.690	38011.130	196390.820	1	0001-01-01	ΕΚΑΤΟΝ ΕΝΕΝΗΝΤΑ ΕΞΙ ΧΙΛΙΑΔΩΝ ΤΡΙΑΚΟΣΙΩΝ ΕΝΕΝΗΝΤΑ  ΕΥΡΩ ΚΑΙ ΟΓΔΟΝΤΑ ΔΥΟ ΛΕΠΤΩΝ	f	\N	\N	2020-04-01	2020-06-22	2020-06-22	\N	\N
145	88	1	2020-06-30	2022-12-31	65000.000	15600.000	80600.000	\N	\N	ΟΓΔΟΝΤΑ  ΧΙΛΙΑΔΩΝ ΕΞΑΚΟΣΙΩΝ   ΕΥΡΩ	t	\N	2020-06-29	2020-06-30	2020-06-24	2020-06-24	\N	\N
146	89	1	\N	\N	120967.740	29032.260	150000.000	\N	\N	ΕΚΑΤΟΝ ΠΕΝΗΝΤΑ  ΧΙΛΙΑΔΩΝ    ΕΥΡΩ	f	\N	\N	2018-11-06	2020-06-25	2020-06-25	\N	\N
147	89	2	2018-10-17	2018-12-24	45565.130	10935.630	56500.760	\N	\N	ΠΕΝΗΝΤΑ ΕΞΙ ΧΙΛΙΑΔΩΝ ΠΕΝΤΑΚΟΣΙΩΝ   ΕΥΡΩ ΚΑΙ ΕΒΔΗΜΟΝΤΑ ΕΞΙ ΛΕΠΤΩΝ	f	\N	\N	2019-03-21	2020-06-26	2020-06-26	\N	\N
148	90	1	\N	\N	88709.680	21290.320	110000.000	\N	\N	ΕΚΑΤΟΝ ΔΕΚΑ  ΧΙΛΙΑΔΩΝ    ΕΥΡΩ	f	\N	\N	2017-12-15	2020-06-29	2020-06-29	\N	\N
149	90	2	2017-12-14	2018-12-14	236968.560	56872.450	293841.010	\N	\N	ΔΙΑΚΟΣΙΩΝ ΕΝΕΝΗΝΤΑ ΤΡΙΩΝ ΧΙΛΙΑΔΩΝ ΟΚΤΑΚΟΣΙΩΝ ΣΑΡΑΝΤΑ ΕΝΟΣ ΕΥΡΩ ΚΑΙ  ΕΝΟΣ ΛΕΠΤΩΝ	f	\N	\N	2019-02-04	2020-06-29	2020-06-29	\N	\N
\.


--
-- TOC entry 3170 (class 0 OID 25161)
-- Dependencies: 244
-- Data for Name: AccountReservations; Type: TABLE DATA; Schema: Ordering; Owner: postgres
--

COPY "Ordering"."AccountReservations" ("UserId", "AccountId", "Name", "Percentage", "Stamp", "StampOGA", "IsReservation", "Order") FROM stdin;
4	146	Ε.Α.Α.ΔΗ.ΣΥ.	0.060	3.000	20.000	t	1
4	146	Α.Ε.Π.Π	0.060	3.000	20.000	t	2
4	146	Φ.Ε.	8.000	\N	\N	t	3
4	146	Φ.Π.Α.	24.000	\N	\N	\N	\N
4	147	Ε.Α.Α.ΔΗ.ΣΥ.	0.060	3.000	20.000	t	1
4	147	Α.Ε.Π.Π	0.060	3.000	20.000	t	2
4	147	Φ.Ε.	8.000	\N	\N	t	3
4	147	Φ.Π.Α.	24.000	\N	\N	\N	\N
4	143	Ε.Α.Α.ΔΗ.ΣΥ.	0.070	3.000	20.000	t	1
4	143	Α.Ε.Π.Π	0.060	3.000	20.000	t	2
4	143	Φ.Ε.	8.000	\N	\N	t	3
4	143	Φ.Π.Α.	28.000	\N	\N	\N	\N
4	148	Ε.Α.Α.ΔΗ.ΣΥ.	0.070	3.000	20.000	t	1
4	148	Α.Ε.Π.Π	0.060	3.000	20.000	t	2
4	148	Φ.Ε.	8.000	\N	\N	t	3
4	148	Φ.Π.Α.	28.000	\N	\N	\N	\N
\.


--
-- TOC entry 3129 (class 0 OID 16655)
-- Dependencies: 203
-- Data for Name: Agencies; Type: TABLE DATA; Schema: Ordering; Owner: postgres
--

COPY "Ordering"."Agencies" ("Id", "Name") FROM stdin;
1	Εταιρεία Ανάπτυξης και Τουριστικής Προβολής Αθηνών (ΕΑΤΑ)
2	ΔΑΕΜ Α.Ε. - Ανώνυμη Αναπτυξιακή Εταιρεία Μηχανογράφησης & Επιχειρησιακών Μονάδων ΟΤΑ του Δήμου Αθηναίων\r\n
11	Ο.Π.Α.Ν.Δ.Α
12	Αθήνα 9,84 FM Stereo
13	Αθηναϊκό Αέριο Α.Ε.
14	Δημοτικό Βρεφοκομείο Αθηνών
15	Διπλή Ανάπλαση Α.Ε.
16	Εταιρεία Ασφαλιστικών - Συμβουλευτικών Υπηρεσιών ΑΑΕ ΟΤΑ
17	Κέντρο Επαγγελματικής Κατάρτισης
18	Κέντρο Πρόληψης των Εξαρτήσεων και Προαγωγής της Ψυχοκοινωνικής Υγείας "Αθηνά Υγεία"
19	Κέντρο Υποδοχής & Αλληλεγγύης Δήμου Αθηναίων (ΚΥΑΔΑ)
20	"Τεχνόπολις" Δήμου Αθηναίων
21	Οργανισμός Πολιτισμού Αθλητισμού και Νεολαίας
\.


--
-- TOC entry 3163 (class 0 OID 16910)
-- Dependencies: 237
-- Data for Name: AuthorDocumentedRequest; Type: TABLE DATA; Schema: Ordering; Owner: postgres
--

COPY "Ordering"."AuthorDocumentedRequest" ("Id", "ContractId", "ProtocolNumber", "ProtocolDate", "ADA", "OrderNo") FROM stdin;
1	76	245924	2019-09-27	\N	1
2	76	061640	2020-03-12	\N	2
\.


--
-- TOC entry 3169 (class 0 OID 17013)
-- Dependencies: 243
-- Data for Name: CC; Type: TABLE DATA; Schema: Ordering; Owner: postgres
--

COPY "Ordering"."CC" ("ContractId", "AccountId", "CC", "Order") FROM stdin;
88	145	Διεύθυνση Στρατηγικού Σχεδιασμού, Ανθεκτικότητας, Καινοτομίας και Τεκμηρίωσης - Τμήμα Τεχνολογίας, Πληροφορικής και Επικοινωνιών	0
89	146	Αυτοτελές Τμήμα Διοικητικής Υποστήριξης Δημάρχου	0
89	146	Αυτοτελές Τμήμα Διοικητικής Υποστήριξης Γενικού Γραμματέα	1
89	146	Γενική Διεύθυνση Διοικησης	2
89	146	Δ.Α.Ε.Μ Α.Ε.	3
89	147	Αυτοτελές Τμήμα Διοικητικής Υποστήριξης Δημάρχου	0
89	147	Αυτοτελές Τμήμα Διοικητικής Υποστήριξης Γενικού Γραμματέα	1
89	147	Δ.Α.Ε.Μ. Α.Ε.	2
\N	148	Δ/νση Επιχ/κού Σχεδ/σμού, Οργάνωσης & Πληροφορικής Τμήμα Τεχνικής & Διοικητικής  Υποστήριξης Μέσων Επικοινωνίας  & Δημοτικών Επιχειρήσεων	0
\N	149	Διεύθυνση Στρατηγικού Σχεδιασμού, Ανθεκτικότητας, Καινοτομίας και Τεκμηρίωσης - Τμήμα Διοικητικής Υποστήριξης, Τεκμηρίωσης και Ηλεκτρονικής Διακυβέρνησης	0
\.


--
-- TOC entry 3131 (class 0 OID 16669)
-- Dependencies: 205
-- Data for Name: Contract; Type: TABLE DATA; Schema: Ordering; Owner: postgres
--

COPY "Ordering"."Contract" ("Id", "ContractTypeId", "Title", "ProtocolNumber", "ProtocolDate", "KAE", "Actor", "CodeDirection", "AwardNumber", "AwardDate", "AwardAda", "CpvCode", "CpvTitle", "AmountPure", "AmountFpa", "AmountTotal", "Balance", "Start", "End", "NumberOfAccounts", "DateCreated", "DateModified", "Direction", "Department", "ConcessionaireName", "ConcessionaireAFM", "HasDownPayment", "FpaValue", "OwnerId", "AllUsers", "LawArticle") FROM stdin;
55	1	Προμήθεια μηχανογραφικού εξοπλισμού hardware (Η/Υ οθονών, φωτοαντιγραφικών, πολυμηχανημάτων κλπ) 	123456	2019-09-23	7134.022	10	18	388	2019-05-17	64ΝΔΩ6Μ-Τ10	30213300-8 	Επιτραπέζιοι ηλεκτρονικοί υπολογιστές	120955.000	29029.200	149984.000	\N	2019-09-01	2019-12-31	1	2019-09-26 13:58:58	2019-10-09 14:35:01	2	4	ΔΑΕΜ ΑΕ	090033107	f	24	d.vasilakis	\N	\N
76	2	Διασφάλιση καλής λειτουργίας, υποστήριξης και συντήρησης Δικτύου και Υποδομών πληροφοριακών Συστημάτων, αναβάθμισης και επέκτασης Δικτύου τηλεφωνίας μέσω διαδικτύου (IP τηλεφωνίας) για τις Διευθύνσεις του Δήμου Αθηναίων	070809	2020-03-31	6737.075	0	18	108	2020-03-31	ΩΦΦ0Ω6Μ-08Ε	\N	\N	1999916.600	479979.980	2479896.580	\N	2020-03-31	2020-03-30	12	2020-06-05 12:14:12	2020-06-25 10:22:59	2	4	Δ.Α.Ε.Μ. Α.Ε.	090033107	t	24	d.vasilakis	f	3 "Προϋπολογισμός"
89	2	Συμμόρφωση των κεντρικών υπολογιστικών συστημάτων με τον Ευρωπαϊκό Γενικό Κανονισμό για την Προστασία Δεδομένων GDPR (General Data Protection Regulation) για το Δήμο Αθηναίων	260100	2018-10-17	8115.001 	0	10	1	2020-01-01	\N	\N	\N	1168064.520	280335.480	1448400.000	\N	2018-10-17	2022-10-17	8	2020-06-25 10:32:23	2020-06-25 15:49:03	2	4	Δ.Α.Ε.Μ. Α.Ε. 	090033107	f	24	d.vasilakis	f	5 “ Πόροι – Χρηματοδότηση – Προϋπολογισμός”
90	2	για τον σχεδιασμό, ανάπτυξη, υλοποίηση και μηχανογραφική υποστήριξη σύγχρονου πληροφοριακού συστήματος διαχείρισης επιχειρησιακών πόρων για το Δήμο Αθηναίων	\N	2020-06-29	6737.053	0	10	\N	2020-06-29	\N	\N	\N	2395161.290	574838.710	2970000.000	\N	2017-01-01	2020-11-11	5	2020-06-29 14:24:13	2020-06-29 15:32:12	2	4	ΔΑΕΜ Α.Ε.	090033107	f	24	d.vasilakis	f	 
88	1	Προμήθεια αναλωσίμων υλικών εκτυπωτών,\nφωτοαντιγραφικών μηχανημάτων και φαξ	\N	2020-06-23	6613.001	10	18	\N	2020-06-24	\N	30192110-5	Μελάνια	119003.200	28560.770	147563.970	\N	2020-06-23	2022-12-31	4	2020-06-24 08:43:17	2020-06-24 08:43:17	2	7	ΚΟΝΤΗΣ ΜΟΝΟΠΡΟΣΩΠΗ Ε.Π.Ε.	800563609	f	24	v.priovolos	f	\N
\.


--
-- TOC entry 3132 (class 0 OID 16676)
-- Dependencies: 206
-- Data for Name: ContractType; Type: TABLE DATA; Schema: Ordering; Owner: postgres
--

COPY "Ordering"."ContractType" ("ContractTypeId", "ContractTypeName") FROM stdin;
2	Προγραμματική
1	Δημόσιας Ανάθεσης
\.


--
-- TOC entry 3134 (class 0 OID 16681)
-- Dependencies: 208
-- Data for Name: ContractUsers; Type: TABLE DATA; Schema: Ordering; Owner: postgres
--

COPY "Ordering"."ContractUsers" ("ContractId", "UserId") FROM stdin;
76	25
88	24
76	24
76	32
76	21
76	22
89	24
89	21
89	32
89	22
89	25
\.


--
-- TOC entry 3136 (class 0 OID 16686)
-- Dependencies: 210
-- Data for Name: CourtOfAuditors; Type: TABLE DATA; Schema: Ordering; Owner: postgres
--

COPY "Ordering"."CourtOfAuditors" ("Id", "ContractId", "ProtocolNumber", "ProtocolYear", "ScaleNumber", "APDA_ProtocolNumber", "APDA_ProtocolDate", "OrderNo", "ContentAccount") FROM stdin;
10	57	673	2021	Στ'	467	2020-02-26	\N	\N
9	58	sdf	2019	ΣΤ'	sdf	2020-05-11	\N	\N
11	76	841	2019	Ζ'	001510	2020-01-07	\N	περί μη κωλύματος της υπογραφής του σχεδίου της εν θέματι Προγραμματικής Σύμβασης
14	89	329	2018	Z'	\N	\N	\N	περί μη κωλύματος της υπογραφής του σχεδίου της εν θέματι Προγραμματικής Σύμβασης
15	90	336	2017	 	359966	2017-12-05	\N	 
\.


--
-- TOC entry 3138 (class 0 OID 16691)
-- Dependencies: 212
-- Data for Name: DecisionBoard; Type: TABLE DATA; Schema: Ordering; Owner: postgres
--

COPY "Ordering"."DecisionBoard" ("Id", "ContractId", "ProtocolNumber", "ProtocolDate", "ContentAccount", "ADA", "OriginalCopies", "PhotoCopies", "OrderNo", "ContentTransmission") FROM stdin;
64	58	12	2020-01-19		\N	2	2	\N	\N
65	58	34	2019-12-12	sdfsdfsdf	\N	2	2	\N	\N
66	57	456	2020-02-28		\N	2	2	\N	\N
67	57	345	2020-02-27	lalala	\N	2	2	\N	\N
68	68	123	2020-01-23		\N	2	2	\N	\N
90	129	234	2020-02-20		\N	2	2	\N	\N
91	75	123	2015-11-01	 με την οποία εγκρίθηκαν: η υπογραφή των όρων, το σχέδιο και τα ανά έτος ποσά της προαναφερθείσας Προγραμματικής Σύμβασης. 	\N	\N	\N	1	\N
93	76	108	2019-01-31	 με την οποία εγκρίθηκαν: οι όροι της προσαρτόμενης Προγραμματικής Σύμβασης μεταξύ του Δήμου Αθηναίων και Δ.Α.Ε.Μ. Α.Ε. διάρκειας είκοσι τεσσάρων [24]  μηνών και τα ανά έτος ποσά.	ΩΦΦ0Ω6Μ-08Ε	\N	\N	1	\N
95	76	960	2019-07-25	\N	6ΨΕΓΩ6Μ-Β31	\N	\N	3	περί συμπλήρωσης της Προγραμματικής Σύμβασης με ΑΔΑ: ΩΦΦ0Ω6Μ-08Ε και Α.Δ.Σ. 108/31-01-2019, με Πρόσθετο Σύμφωνο για την επεξεργασία Δεδομένων Προσωπικού χαρακτήρα.
94	76	723	2019-04-11	με την οποία τροποποιήθηκε η ανωτέρω Α.Δ.Σ. “μόνο ως προς την απαλοιφή των άρθρων 5 και 6 αυτής”.	6Β58Ω6Μ-ΠΨΦ 	\N	\N	2	περί έγκρισης τροποποίησης της 108/2019 Α.Δ.Σ.
96	87	12	2020-06-18	 με την οποία εγκρίθηκαν: η υπογραφή των όρων, το σχέδιο και τα ανά έτος ποσά της προαναφερθείσας Προγραμματικής Σύμβασης. 	123	\N	\N	1	\N
97	89	866	2018-06-14	 με την οποία εγκρίθηκαν: η υπογραφή των όρων, το σχέδιο και τα ανά έτος ποσά της προαναφερθείσας Προγραμματικής Σύμβασης. 	\N	\N	\N	1	\N
98	89	959	2018-06-28	με την οποία διορθώθηκε η ανωτέρω Α.Δ.Σ. ως προς τον Κ.Α. του προυπολογισμού και ως πρός το λεκτικό της δαπάνης	\N	\N	\N	2	\N
99	90	938	2017-07-06	 με την οποία εγκρίθηκαν: η υπογραφή των όρων, το σχέδιο και τα ανά έτος ποσά της προαναφερθείσας Προγραμματικής Σύμβασης. 	\N	\N	\N	1	\N
\.


--
-- TOC entry 3140 (class 0 OID 16699)
-- Dependencies: 214
-- Data for Name: DecisionCoordinatorDecentrilizedAdministration; Type: TABLE DATA; Schema: Ordering; Owner: postgres
--

COPY "Ordering"."DecisionCoordinatorDecentrilizedAdministration" ("Id", "ContractId", "ProtocolNumber", "ProtocolDate", "ADA", "OriginalCopies", "PhotoCopies", "OrderNo", "DecisionBoardProtocol", "APDA_ProtocolNumber", "APDA_ProtocolDate", "ActionTransmission", "ActionAccount") FROM stdin;
58	58	12	2020-02-19	\N	\N	\N	\N	\N	\N	\N	\N	\N
59	58	12	2020-02-12	\N	\N	\N	\N	\N	\N	\N	\N	\N
60	57	345	2020-02-27	\N	\N	\N	\N	\N	\N	\N	\N	\N
61	57	123	2020-02-27	\N	\N	\N	\N	\N	\N	\N	\N	\N
62	68	1123	2020-01-01	\N	\N	\N	\N	\N	\N	\N	\N	\N
82	75	434	2020-02-12	\N	\N	\N	\N	\N	\N	\N	\N	\N
83	76	14935/4426	2019-03-13	\N	\N	\N	1	108/2019-01-31	096406	2019-03-29	 περί έγκρισης της 	 για τη νόμιμη λήψη της 
84	76	43918/12244	2019-05-27	\N	\N	\N	2	108/2019-01-31	155067	2019-06-04	 περί έγκρισης της τροποίησης της 	 περί έγκρισης της τροποίησης της 
85	89	17724	2018-07-10	\N	\N	\N	1	866/2018-06-14	\N	\N	 περί έγκρισης της 	 για τη νόμιμη λήψη της 
86	89	209641	2018-08-24	\N	\N	\N	2	959/2018-06-28	\N	\N	 περί έγκρισης της 	 για τη νόμιμη λήψη της 
87	90	212833	2017-07-12	\N	\N	\N	1	938/2017-07-06	\N	\N	 περί έγκρισης της 	 για τη νόμιμη λήψη της 
\.


--
-- TOC entry 3142 (class 0 OID 16704)
-- Dependencies: 216
-- Data for Name: Department; Type: TABLE DATA; Schema: Ordering; Owner: postgres
--

COPY "Ordering"."Department" ("DepartmentId", "DirectionId", "DepartmentName", "DepartmentSupervisor", "DepartmentTelephone", "DepartmentEmail") FROM stdin;
62	21	Διοικητικής Υποστήριξης & Ηλεκτρονικής Διακυβέρνησης	Τάτση Ζαφειρούλα	210 5277938	t.dioikitikis.ypostirixis.astikis.katastasis@athens.gr
63	21	Έκδοσης Πιστοποιητικών	Κοντού Αικατερίνη	210 3722067	t.ekd.pistopoiitikon@athens.gr
64	21	Μητρώου Αρρένων	Καγιά - Παναγοπούλου Αμαλία	210 3722119	t.mitroou.arrenon@athens.gr
65	21	Ιθαγένειας, Δημοτολογίου και Εκλογικών Καταλόγων	Τσιχριτζή Αμαλία	210 3722102	 t.ith.dimotologiou@athens.gr
10	3	Προμηθειών, Προγραμματισμού, Τεκμηρίωσης Αιτημάτων και Ηλεκτρονικής Διακυβέρνησης	Μπουρνά Βούλα	210.5225617	t.promitheion@athens.gr
76	24	Σχεδιασμού, Οργάνωσης και Ηλεκτρονικής Διακυβέρνησης	 Καρούσου Ανδριάννα	210 3626608	t.sxd.organosis.dim.iatrion@athens.gr
4	2	Τεχνολογίας, Πληροφορικής και Επικοινωνιών	Χατζηευστρατίου Ιωάννης	210.5277169	i.chatzieustratiou@athens.gr
5	2	Ανθεκτικότητας και Βιωσιμότητας	Νεοφύτου Γεώργιος	210.3721553	t.anthektikotitas.biosimotitas@athens.gr
7	2	Στρατηγικού Σχεδιασμού και Προγραμματισμού	Κοντώσης Ηλίας	210.5277160	t.stratigikou.sxediasmou.progr@athens.gr
6	2	Καινοτομίας και Εξωστρέφειας	Παπακωνσταντίνου - Παπαδοπούλου Έλλη	210.5277109	t.kainotomias.exostrefias@athens.gr
66	21	Γεννήσεων	Δασκαλάκη Ανδριάνα	210 5277987	t.genniseon@athens.gr
3	2	Διαχείρισης Γεωχωρικών Δεδομένων Πόλεως\r\n	Μαρούγκα Κωνσταντίνα	210.5277185	t.gis@athens.gr
67	21	Γάμων – Θανάτων	Φρανσέ Αλέγρη	210 5277966	t.gamon.thanaton@athens.gr
68	21	Πολιτικών Γάμων	Θεωνά Ελένη-Άννα	210 3722165	t.politikon.gamon@athens.gr
77	24	Δημοτικών Ιατρειών 1ης και 2ης Δημοτικής κοινότητας	Τσιμπλιάρη Βασιλική	210 9239865	t.dim.iatrion.dk12@athens.gr
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
11	3	Διαδικασιών Σύναψης Δημοσίων Συμβάσεων	Μπιμπούδης Παναγιώτης	213.2082956	t.prom.dimoprasies@athens.gr
12	3	Αποθηκών Υλικών	Κακριδά  Άννα	210.5225068	t.apothikon.ylikon@athens.gr
70	22	Δικαστικό	 	 	 
71	22	Γραμματείας και Αρχείου	Κρητικός Αλοΐσιος	210 5277428	t.gram.arxeiou.nomiki@athens.gr
78	24	Δημοτικών Ιατρειών 3ης και 4ης Δημοτικής κοινότητας	Μαρινάκη Σοφία	210 3427515	t.dim.iatrion.dk34@athens.gr
72	23	Καταγραφής, Αναθεώρησης και Ελέγχου Τήρησης Διαδικασιών	Πουρναροπούλου Μαρία	213 2083169	t.ka.an.el.ti.diadikasion@athens.gr
73	23	Διασφάλισης Ποιότητας Παρεχόμενων Υπηρεσιών	Δημητρίου Γεώργιος	210 5277505	t.dias.poiotitas@athens.gr
74	23	Επικοινωνίας και Διαφάνειας	Παπαπέτρου Μαρία	210 5277515	t.epik.diafaneias@athens.gr
75	15	Διοικητικού, Εποπτείας και Συντονισμού Δημοτικών Κοινοτήτων	Γλάρου Ιωάννα	210 5277501	t.dioikitiko@athens.gr
79	24	Δημοτικών Ιατρειών 5ης, 6ης και 7ης Δημοτικής κοινότητας	Κουτρέτση Βαρβάρα	210 2015510-11	t.dim.iatrion.dk567@athens.gr
80	24	Προληπτικής Ιατρικής, Προαγωγής Υγείας και Δημόσιας Υγείας	Σκανδάλη Βασιλική	210 2015510-11	t.proliptikis.iatrikis@athens.gr
81	25	Διοικητικής Υποστήριξης & Ηλεκτρονικής Διακυβέρνησης	Χειλάκου Στυλιανή	210 5277491	t.dioikitikis.ypostirixis.anth.dyn@athens.gr
82	25	Μονίμου Προσωπικού	Αθανίτης Βύρων	210 5277448	t.mon.pros@athens.gr
83	25	Προσωπικού Ιδιωτικού Δικαίου	Γιαννέλης Παναγιώτης	210 5277450	t.iddikaiou.pros@athens.gr
84	25	Εκπαίδευσης, Ανάπτυξης, Υγιεινής και Ασφάλειας Ανθρώπινου Δυναμικού	Παπάζογλου Γραμματική	210 5277548, 210 5277542, 210 5277529	t.ekpaidefsis@athens.gr
85	25	Ελέγχου Απασχόλησης	Δερμιτζάκη Αναστασία	210 5277574	t.elegxou.apasx@athens.gr
86	25	Ελέγχου Απασχόλησης	Δερμιτζάκη Αναστασία	 210 5277574	 t.elegxou.apasx@athens.gr
87	26	Σχεδιασμού, Οργάνωσης και Ηλεκτρονικής Διακυβέρνησης	Γαλώνη Βασιλική	213 2082925	t.sxd.organosis.paideias@athens.gr
88	26	Υποστήριξης και Λειτουργίας Σχολικών Μονάδων, Σχολικών Επιτροπών και της Δημοτικής Επιτροπής Παιδείας (ΔΕΠ)	Μαράκη Σοφία	213 2082947, 210 8217733	t.yp.lei.sxolikon.monadon@athens.gr
89	26	Δια Βίου Μάθησης	Σοφία Μαράγκη	213 2082924 ,213 2082923	t.dia.viou.mathisis@athens.gr
90	26	Αδειοδοτήσεων - Ελέγχων	Φράγκος Κωνσταντίνος	210 8224947, 210 8210647	t.adeiodotiseon.elegon@athens.gr
91	26	Παιδικών Εξοχών	Νόνικας Δημήτριος	210 8250611	t.paidikon.exoxon@athens.gr
92	27	Υποστήριξης Δημοτικών Παρατάξεων και Αιρετών και Ηλεκτρονικής Διακυβέρνησης	Καλλίας Παύλος	210 5277118	t.d.parat@athens.gr
93	27	Υποστήριξης Δημοτικού Συμβουλίου, Εκτελεστικής Επιτροπής και Δημοτικής Επιτροπής Διαβούλευσης\nΤμηματάρχης	Ζιούβα Ελπίδα	 210 5277624 (ΤΜΗΜΑΤΑΡΧΗΣ), 210 5277621-3, 210 5277646 (Δημοτικό Συμβούλιο)	dimotikosymvoulio@athens.gr
94	27	Υποστήριξης Οικονομικής Επιτροπής και Επιτροπής Ποιότητας Ζωής	Καρανικόλας Νικόλαος	210 5277432 (ΤΜΗΜΑΤΑΡΧΗΣ), 210 5277431, 210 5277456-7, 210 5277467	t.oikonomiki.poiotita@athens.gr, oikonomiki@athens.gr, poiotita@athens.gr
95	28	Διοικητικής Υποστήριξης και Ηλεκτρονικής Διακυβέρνησης	Περρή Αγγελική	213 2082932 (Τμηματάρχης), 210 5210660 (Γραμματεία)	t.da.ypostirixi@athens.gr
96	28	Επιχειρησιακού Σχεδιασμού	Δικαιάκος Πουλίκος	210 5210655 (Τμηματάρχης), 213 2082926 (Γραμματεία)	t.da.epixeirisiako@athens.gr
97	28	Ελέγχου Στάθμευσης	Λεβεντάκης - Γιαννικάκης Ιωάννης	210 5210654 (Τμηματάρχης), 210 5210625, 210 5210630 (Γραμματεία)	t.da.elegx.stath@athens.gr
98	28	Δημοτικό Αστυνομικό Τμήμα 1ης Δημοτικής Κοινότητας	Τσιρογιάννης Σαράντης	210 5210604(Τμηματάρχης), 210 5210605 (Γραμματεία)	t.dat1@athens.gr
99	28	Δημοτικό Αστυνομικό Τμήμα 2ης και 7ης Δημοτικής Κοινότητας	Ροδόπουλος Σάββας	210 7481521	t.dat2.7@athens.gr
100	28	Δημοτικό Αστυνομικό Τμήμα 3ης και 4ης Δημοτικής Κοινότητας	Σπανός Χρήστος	210 5210606,  210 5210704	t.dat3.4@athens.gr
101	28	Δημοτικό Αστυνομικό Τμήμα 5ης και 6ης Δημοτικής Κοινότητας	Χάζλαρης Δημήτριος	210 8673844	t.dat5.6@athens.gr
102	28	Επιβολής Διοικητικών Κυρώσεων σε Καταστήματα Υγειονομικού Ενδιαφέροντος και Επιχειρήσεις	Κανάλης Κωνσταντίνος	210 5210638 (Τμηματάρχης), 210 5210679(Γραμματεία)	t.da.kyrwsis@athens.gr
103	29	Σχεδιασμού, Οργάνωσης και Ηλεκτρονικής Διακυβέρνησης	Ιωαννίδου Ευδοξία	210 5210635	t.sxd.organosis.koin.allil@athens.gr
104	29	Κοινωνικής Ένταξης	Κυπραίος Παντελής	210 5210706	t.koin.entaxis@athens.gr
105	29	Πολιτικών Ισότητας και Αντιμετώπισης Διακρίσεων	Μπούρη Γεωργία	210 5210634	t.pol.is.ant.diakriseon@athens.gr
106	29	Κοινωνικής Εργασίας	Πατέλκου Αντωνία	210 5210637	t.koinonikis.ergasias@athens.gr
107	29	Επιδοματικής Πολιτικής και Κοινωνικής Ασφάλισης	Αλεξόπουλος Παναγιώτης	213 20 82 997	t.epid.pol.koin.asfalisis@athens.gr
108	29	Υποστήριξης και Κοινωνικής ένταξης Μεταναστών και Προσφύγων	Ψαθάς Παναγιώτης	210 5246225, 210 5246722	t.yp.koin.entaxis.me.pr@athens.gr
109	29	Υποδοχής και Υποστήριξης Αστέγων	Θεοφυλάκτου Θεολογία	210 5246516	t.ypod.ypos.astegon@athens.gr
110	29	Τρίτης Ηλικίας	Κωστοπούλου Άννα	210 5210640	t.tritis.ilikias@athens.gr    
111	30	Προϋπολογισμού	Πολυμέρου Αλεξάνδρα	210 5277381	t.proipologismou@athens.gr
112	30	Λογιστηρίου	Σκλαβενίτης Περικλής	210 5277325	t.logistiriou@athens.gr
113	30	Ταμειακής Διαχείρισης και Εξόδων	Φανακίδης Δημήτριος	210 5277309	t.tamiaki.exoda@athens.gr
114	30	Εκκαθάρισης και Εντολής Δαπανών	Καλαμπόκη Ισμήνη	210 5277385	t.ek.ent.dapanon@athens.gr
115	30	Εσόδων	Παφίτου Χριστίνα	210 5277316	t.esodon@athens.gr
116	30	Μισθοδοσίας	Στρατογιάννη Ευαγγελία	210 5277434	t.misthodosias@athens.gr
117	30	Οικονομικής Παρακολούθησης Συμβάσεων	Σαϊνίδου Σοφία	210 5277352	t.oik.par.simvaseon@athens.gr
118	31	Διοικητικής Υποστήριξης, Τεκμηρίωσης και Ηλεκτρονικής Διακυβέρνησης	Τζάννε Αναστασία	210 5277272	t.dioikitikis.ypostirixis.dp@athens.gr
119	31	Α΄ Κοιμητηρίου	Βαλλιάνος Δημήτριος	210 9221173	t.a.koimitiriou@athens.gr
120	31	Β΄ Κοιμητηρίου	Λώλη Ελένη	210 2920531	t.b.koimitiriou@athens.gr
121	31	Γ΄ Κοιμητηρίου	Μπαούρδας Δήμος	210 5612357	t.c.koimitiriou@athens.gr
122	31	Αξιοποίησης και Εκμετάλλευσης Δημοτικής Περιουσίας	Θράππα-Μάρκου Ευσταθία	210 5277290	t.ax.ek.dim.periousias@athens.gr
123	31	Αγορών, Απαλλοτριώσεων και Μισθώσεων	Ρηγόπουλος Γεώργιος	210 5277233	t.ag.ap.misthoseon@athens.gr
124	31	Περιουσιακών Στοιχείων, Κοινοχρήστων Χώρων, Κτηματολογίου και Κληροδοτημάτων	Μαρούλη Ρεγγίνα	210 5277203	t.ktimatologiou@athens.gr
125	32	Σχεδιασμού, Τεκμηρίωσης και Ηλεκτρονικής Διακυβερνήσεως	Πολυμερόπουλος Βασίλειος	210 5277353	t.sxed.tek.prosodon@athens.gr
126	32	Αδειοδότησης Εμπορικών Δράσεων	Κουρμπάνη Ζωή	210 5277259, 210 5277261, 210 5277263, 210 5277268	t.adiodotisis.emporikon.draseon@athens.gr
127	32	Αδειοδότησης Χρήσης Κοινοχρήστου Χώρου	χχχ	210 5277201	t.adiodotisis.xrisis.koin.xorou@athens.gr
128	32	Αδειοδότησης Υπαίθριων Αγορών και Συναφών Δράσεων	Συριανού Άννα	210 5277209, 210 5277249	t.adiodotisis.ypaith.agoron@athens.gr
129	32	Αδειοδότησης Υπαίθριων Αγορών και Συναφών Δράσεων	Συριανού Άννα	210 5277209, 210 5277249	t.adiodotisis.ypaith.agoron@athens.gr
130	32	Βεβαίωσης Γενικών Εσόδων	Γραβιάς Γεώργιος	210 5277375	t.bebaiosis.genikon.esodon@athens.gr
131	32	Βεβαίωσης Εσόδων από Παραβάσεις Κώδικα Οδικής Κυκλοφορίας (Κ.Ο.Κ)	Σούμπαση Αναστασία	210 5277273	t.bebaiosis.esodon.kok@athens.gr
132	32	Ανταποδοτικών Τελών και Τ.Α.Π.	Μπαρλαούρας Δημήτριος	210 5277280-286 (ΑΝΤΑΠΟΔΟΤΙΚΑ ΤΕΛΗ), 210 5277234-35, 210 5277214-15 (Τ.Α.Π.)	t.telon.tap@athens.gr
133	33	Διοικητικής Υποστήριξης και Ηλεκτρονικής Διακυβέρνησης	Κοναξή Ευγενία	210 3721505, 2103721508,210 3721539	t.dioikitikis.ypostirixis.ktiriakis@athens.gr
134	33	Μελετών, Τεκμηρίωσης και Προγραμματισμού	Σκόπα Βασιλική	210 3721546	t.mel.tek.prog.ktiriakis@athens.gr
135	33	Επίβλεψης	Παπαχριστόπουλος Χρήστος	210 3721593	t.epivlepsis.ktiriakis@athens.gr
136	33	Τεχνικών Συνεργείων	Αντωνιάδης Δημήτριος	210 3412635, 210 3412394, 210 3414158	t.tex.synergeion.ktiriakis@athens.gr
137	34	Οργάνωσης, Τεκμηρίωσης και Ηλεκτρονικής Διακυβέρνησης	Δαγκλή Μάρθα	210 3721566	t.org.tekm.sp.ap@athens.gr
138	34	Πολεοδομικού Σχεδιασμού	Πανούση Μαγδαληνή	210 3721589, 210 3721582, 210 3721574	t.poleo.sxediasmou@athens.gr
139	34	Τοπογραφίας & Περιβάλλοντος	Φραντζέλας Ανδρέας	210 3721553	t.top.perivallontos@athens.gr
141	34	Πολεοδομικών Εφαρμογών και Απαλλοτριώσεων	Λοτίδης Αντώνιος	210 3721501 (προϊστάμενος), 210 3721502, 210 3254726	t.poleo.ef.ap@athens.gr
142	34	Πολιτιστικής Κληρονομιάς	Πουλούδης Αλέξανδρος	210 3721596	t.pol.klironomias@athens.gr
143	34	Βιώσιμης Κινητικότητας	Τζήμας Σωτήριος	210 3721506	t.viosimis.kinitikotitas@athens.gr
144	35	Οργάνωσης, Τεκμηρίωσης και Ηλεκτρονικής Διακυβέρνησης	Ευαγγελίου Αναστασία	210 5205011, 210 5205015	t.org.tekm.domisis@athens.gr
145	35	Έκδοσης Αδειών	Πλουμπή Όλγα	210 5205050, 210 5205031, 210 5205007	t.ekdosis.adeion@athens.gr
146	35	Ελέγχου Κατασκευών	 	210 5205052, 2105205039, 2105205056, 210 5205042, 210 5205053	t.elegxou.kataskevon@athens.gr
147	35	Όρων Δόμησης	Τσούτσης Θωμάς	210 5205003, 210 5205002, 210 5205035	t.oron.domisis@athens.gr
148	36	Διοικητικής Υποστήριξης & Ηλεκτρονικής Διακυβέρνησης	Κακλαμάνη Ευαγγελία	210 3721503	t.dioikitikis.ypostirixis.odop@athens.gr
149	36	Μελετών, Τεκμηρίωσης και Προγραμματισμού	Τρυφωνίδου-Φραντζεσκάκη Βασιλική	210 3210182	t.mel.tek.prog.odop@athens.gr
150	36	Επίβλεψης	Λυκούρης Μιχαήλ-Άγγελος	210 5277792	t.epivlepsis.odop@athens.gr
151	36	Τεχνικών Συνεργείων	Γαβρίλη Αικατερίνη	210 3412945	t.tex.synergeion.odop@athens.gr
152	36	Αδειοδοτήσεων	Κακούρης Κωνσταντίνος	210 5277715	t.adeiodotiseon.odop@athens.gr
153	37	Διοικητικής Υποστήριξης και Ηλεκτρονικής Διακυβέρνησης	Κουσαρίδας Ιωάννης	210 9224873	t.dioikitikis.ypostirixis.electrologiko@athens.gr
154	37	Μελετών, Τεκμηρίωσης και Προγραμματισμού	Τσάφος Νικόλαος	210 9224873	t.mel.tek.prog.electrologikou@athens.gr
155	37	Συντήρησης Δικτύου Ηλεκτροφωτισμού και Υποδομών	Γεωργίου Κωνσταντίνος	210 9221135	t.elektrofotismou@athens.gr
156	38	Μελετών, Προγραμματισμού, Διοικητικής Υποστήριξης και Ηλεκτρονικής Διακυβέρνησης	Κοτταρά Μαρία	2103470643	t.mel.prog.dioik.ypost.mixanologikou@athens.gr
157	38	Συντήρησης Οχημάτων	Αυλωνίτης Ηλίας	210 3422320	t.syntirisis.oximaton@athens.gr
158	39	Μελετών, Σχεδιασμού, Προγραμματισμού, Διοικητικής Υποστήριξης και Ηλεκτρονικής Διακυβέρνησης	Αμπελιώτη Μαρία	210 3421776	t.mel.sxed.prog.dioik.ypost.kath@athens.gr
159	39	Εναλλακτικής Διαχείρισης Αποβλήτων	Τσιμπλιάρης Κωνσταντίνος	210 3470763	t.enallaktikis.diax.apovliton@athens.gr
160	39	Ελέγχου Ποιότητας Εργασίας	Σύρου Λεμονιά	210 3402531-32	t.elgx.poiotitas.ergasias@athens.gr
161	39	Αποκομιδής, Μεταφοράς Απορριμμάτων και Ανακυκλώσιμων Υλικών Συσκευασίας	Γαλαίος Μηνάς	210 3422316	t.apokomidis.anakiklosis@athens.gr
162	39	Επίβλεψης Λειτουργίας Υποδομών και Εγκαταστάσεων	Ξένος Σωτήριος	210 3402525	t.epivlepsis.kath@athens.gr
163	39	Οδοκαθαρισμού	Καββαδίας Ανδρέας	210 3452551	t.odokatharismou.dk@athens.gr
164	39	Ειδικών Εργασιών	Σαμπέρης Θεόδωρος	210 3470770	t.eidikon.ergasion@athens.gr
165	40	Σχεδιασμού, Προγραμματισμού, Διοικητικής Υποστήριξης και Ηλεκτρονικής Διακυβέρνησης	Θέος Γεώργιος	210 7789693, 210 7482222-5 (εσωτερικό 140)	t.sx.prog.dioik.ypost.prasino@athens.gr
166	40	Φυτικής Παραγωγής, Περιβαλλοντικής Εκπαίδευσης και Τεχνικής Υποστήριξης	Κοκκοτής Αθανάσιος	210 7711189, 210 7482222-5 (εσωτερικό 116)	t.fitikis.paragogis@athens.gr
167	40	Πρασίνου 1ης Δημοτικής Κοινότητας	Δούκας Ευστράτιος	210 3251742	t.pras.1dk@athens.gr
168	40	Πρασίνου 2ης και 3ης Δημοτικής Κοινότητας	Μελάς Πολυχρόνης	210 7525470	t.pras.23dk@athens.gr
169	40	Πρασίνου 4ης και 5ης Δημοτικής Κοινότητας	Χαβάκης Νικόλαος	210 8663533	t.pras.45dk@athens.gr
170	40	Πρασίνου 6ης και 7ης Δημοτικής Κοινότητας	Τσαγκαρόπουλος Δημήτριος	210 8664077	t.pras.67dk@athens.gr
171	40	Αστικής Πανίδας	Μορφέτα Μαρία	210 3239201-202, 210 3310397	t.astikis.panidas@athens.gr
172	40	Εθνικού Κήπου	Αγοραστού Αικατερίνη	210 7255106, 210 7215019, 210 7211178	t.ethnikou.kipou@athens.gr
\.


--
-- TOC entry 3144 (class 0 OID 16712)
-- Dependencies: 218
-- Data for Name: Direction; Type: TABLE DATA; Schema: Ordering; Owner: postgres
--

COPY "Ordering"."Direction" ("DirectionId", "DirectionName", "DirectionSupervisor", "DirectionTelephone", "DirectionEmail", "DirectionAddress", "DirectionPostCode", "DirectionCity") FROM stdin;
34	Σχεδίου Πόλεως και Αστικού Περιβάλλοντος	Μελαμπιανάκη Ευγενία	210 3721566 (Γραμματεία)	d.sx.po.ast.perivallontos@athens.gr	Αθηνάς 16	10551	Αθήνα
35	Δόμησης	Γαβριελάτος Ευάγγελος	210 5205008, 210 5205004	d.domisis@athens.gr	Σωκράτους 57	10431	Αθήνα
36	Οδοποιίας, Αποχέτευσης και Κοινοχρήστων Χώρων	Τουρή Βάγια	210 5226937 (Γραμματεία)	d.odop.apox.koin.xoron@athens.gr	Αθηνάς 16 & Βύσσης	10551	Αθήνα
37	Ηλεκτρολογικού	Παπαευγενίου Σπυρίδων	210 9233113, 210 9235732 (Γραμματείας)	d.electrologikou@athens.gr 	Ραζηκότζικα 20 και Αναπαύσεως	116 36	Αθήνα
38	Μηχανολογικού	Ψύλλος Δημήτριος	210 3402447	d.mixanologikou@athens.gr	Ιερά Οδός 151	12241	Αθήνα
39	Καθαριότητας - Ανακύκλωσης	 	210 3422055	d.kath.anakiklosis@athens.gr	Ιερά Οδός 151	122 41	Αθήνα
40	Πρασίνου και Αστικής Πανίδας	Κυριακάκης Δημήτριος	210 7485143, 210 7485792	d.pras.ast.panidas@athens.gr	Π. Κανελλόπουλου 5 (πρώην Λεωφ. Κατεχάκη)	115 25	Αθήνα
3	Προμηθειών και Αποθηκών	Βακουντούζης Ιωάννης	210.5225446	d.prom.apothikon@athens.gr	Κων/νου Παλαιολόγου 9	104 38	Αθήνα
2	Στρατηγικού Σχεδιασμού, Ανθεκτικότητας, Καινοτομίας και Τεκμηρίωσης	Δρ. Κακριδά Ουρανία	210.5277110	d.stratigikou.sxediasmou@athens.gr	Λιοσίων 22	104 38	Αθήνα
20	Κέντρων Εξυπηρέτησης Πολιτών (Κ.Ε.Π)	Αυγερινός Δημήτριος	210 3836522	d.kep@athens.gr	Ακαδημίας 88	106 78	Αθήνα
21	Αστικής Κατάστασης	Μπούρη Βασιλική	210 3722173	d.ast.katastasis@athens.gr	Αθηνάς 63	10552	Αθήνα
15	Αποκέντρωσης και Διοίκησης	Νεμπεγλεριώτης Ευάγγελος	210 5277541	d.apokentrosi.dioikisi@athens.gr	Λιοσίων 22	104 38	Αθήνα
22	Νομική	Γεωργακαράκος Γεώργιος	 210 5277420-23	d.nomiki@athens.gr	Λιοσίων 22	104 38	Αθήνα
23	Εσωτερικού Ελέγχου	 Γλένη Όλγα	210 5277575	d.es.elegxou@athens.gr	Λιοσίων 22	104 38	Αθήνα
24	Δημοτικών Ιατρείων και Δημόσιας Υγείας	Θεοφανόπουλος Αλέξανδρος	210 3626396	d.dim.iatrion@athens.gr	 	 	 
25	Διαχείρισης και Ανάπτυξης Ανθρωπίνου Δυναμικού	Χαλβατζά Ελένη	210 5277559, 210 5277508	d.anth.dyn@athens.gr	Λιοσίων 22	104 38	Αθήνα
26	Παιδικής Ηλικίας, Παιδείας και Δια Βίου Μάθησης	Γαλούνης Σταμούλης	210 8217430	d.paideias@athens.gr	Ηπείρου 70 και Λιοσίων	 104 38	Αθήνα
27	Υποστήριξης Συλλογικών Οργάνων, Δημοτικών Παρατάξεων και Αιρετών	Ξύστρας Χρήστος	210 5277640,210 5277625	d.syllorg.dimpar@athens.gr	Λιοσίων 22	104 38	Αθήνα
28	Δημοτικής Αστυνομίας	Τάτσης Θάνος	210 5210656 - 651	d.dim.astynomias@athens.gr	Αγίου Κωνσταντίνου 14	104 31	Αθήνα
29	Κοινωνικής Αλληλεγγύης	(Αναμένεται Τοποθέτηση)	210 5210701	d.koin.allil@athens.gr	Αγίου Κωνσταντίνου 14	104 31	Αθήνα
30	Οικονομικών	Βλασερού Μαρία	210 5277386, 210 5277344	d.oikonomikon@athens.gr	Λιοσίων 22	104 38	Αθήνα
31	Δημοτικής Περιουσίας	Νούση Δήμητρα	210 5277526	d.dim.periousias@athens.gr	Λιοσίων 22	104 38	Αθήνα
32	Δημοτικών Προσόδων	Συριανός Γρηγόριος	210 5277306, 210 5277329	d.dim.prosodon@athens.gr	Λιοσίων 22	104 38	\nΑθήνα
33	Κτιριακής Υποδομής	Δανιήλ Μαρία	210 3721539, 210 3721508	d.ktiriakis.ypodomis@athens.gr	Αθηνάς & Βύσσης	105 51	Αθήνα
\.


--
-- TOC entry 3168 (class 0 OID 16971)
-- Dependencies: 242
-- Data for Name: DocumentSignatory; Type: TABLE DATA; Schema: Ordering; Owner: postgres
--

COPY "Ordering"."DocumentSignatory" ("Id", "AccountId", "SignatoryTypeId", "SignatoryId", "DocumentType", "Absense") FROM stdin;
9	143	2	6	1	f
10	143	5	2	1	f
11	143	4	5	1	f
12	143	4	5	2	f
17	145	2	9	1	f
18	145	5	2	1	f
19	145	4	5	1	f
20	145	4	5	2	f
21	146	2	6	1	f
22	146	5	8	1	f
23	146	4	5	1	f
24	146	4	5	2	f
25	147	2	6	1	f
26	147	5	2	1	f
27	147	4	5	1	f
28	147	4	5	2	f
29	148	2	9	1	f
30	148	5	2	1	f
31	148	4	5	1	f
32	148	4	5	2	f
33	149	2	9	1	f
34	149	5	2	1	f
35	149	4	5	1	f
36	149	3	5	2	f
\.


--
-- TOC entry 3146 (class 0 OID 16724)
-- Dependencies: 220
-- Data for Name: Invoice; Type: TABLE DATA; Schema: Ordering; Owner: postgres
--

COPY "Ordering"."Invoice" ("Id", "AccountId", "Number", "Date", "DeliveredDateProtocolNumber", "DeliveredDateProtocolDate", "DeliveredDate") FROM stdin;
118	143	Σειρά Γ 28	2020-03-31	071886	2020-04-01	\N
120	145	9999	2020-06-29	\N	2020-06-29	2020-06-29
121	146	5	2018-10-17	260342	2018-10-18	\N
122	147	21	2018-12-28	342414	\N	\N
123	148	16	2017-12-15	\N	\N	\N
124	149	22	2018-12-28	\N	\N	\N
\.


--
-- TOC entry 3148 (class 0 OID 16729)
-- Dependencies: 222
-- Data for Name: LogError; Type: TABLE DATA; Schema: Ordering; Owner: postgres
--

COPY "Ordering"."LogError" ("Id", "Username", "ErrorMessage", "DateCreated", "HttpMethod", "HttpPath") FROM stdin;
833	d.vasilakis	Message: column "nan" does not exist\nStack: error: column "nan" does not exist\n    at Parser.parseErrorMessage (/home/d.vasilakis/Ordering_Development/node_modules/pg-protocol/dist/parser.js:241:15)\n    at Parser.handlePacket (/home/d.vasilakis/Ordering_Development/node_modules/pg-protocol/dist/parser.js:89:29)\n    at Parser.parse (/home/d.vasilakis/Ordering_Development/node_modules/pg-protocol/dist/parser.js:41:38)\n    at Socket.<anonymous> (/home/d.vasilakis/Ordering_Development/node_modules/pg-protocol/dist/index.js:8:42)\n    at Socket.emit (events.js:315:20)\n    at addChunk (_stream_readable.js:302:12)\n    at readableAddChunk (_stream_readable.js:278:9)\n    at Socket.Readable.push (_stream_readable.js:217:10)\n    at TCP.onStreamRead (internal/stream_base_commons.js:186:23)\n	2020-07-15 16:51:55	GET	/contracts
839	d.vasilakis	Message: syntax error at or near ","\nStack: error: syntax error at or near ","\n    at Parser.parseErrorMessage (/home/d.vasilakis/Ordering_Development/node_modules/pg-protocol/dist/parser.js:241:15)\n    at Parser.handlePacket (/home/d.vasilakis/Ordering_Development/node_modules/pg-protocol/dist/parser.js:89:29)\n    at Parser.parse (/home/d.vasilakis/Ordering_Development/node_modules/pg-protocol/dist/parser.js:41:38)\n    at Socket.<anonymous> (/home/d.vasilakis/Ordering_Development/node_modules/pg-protocol/dist/index.js:8:42)\n    at Socket.emit (events.js:315:20)\n    at addChunk (_stream_readable.js:302:12)\n    at readableAddChunk (_stream_readable.js:278:9)\n    at Socket.Readable.push (_stream_readable.js:217:10)\n    at TCP.onStreamRead (internal/stream_base_commons.js:186:23)\n	2020-07-15 17:13:56	GET	/contracts
834	d.vasilakis	Message: operator does not exist: character varying = bigint\nStack: error: operator does not exist: character varying = bigint\n    at Parser.parseErrorMessage (/home/d.vasilakis/Ordering_Development/node_modules/pg-protocol/dist/parser.js:241:15)\n    at Parser.handlePacket (/home/d.vasilakis/Ordering_Development/node_modules/pg-protocol/dist/parser.js:89:29)\n    at Parser.parse (/home/d.vasilakis/Ordering_Development/node_modules/pg-protocol/dist/parser.js:41:38)\n    at Socket.<anonymous> (/home/d.vasilakis/Ordering_Development/node_modules/pg-protocol/dist/index.js:8:42)\n    at Socket.emit (events.js:315:20)\n    at addChunk (_stream_readable.js:302:12)\n    at readableAddChunk (_stream_readable.js:278:9)\n    at Socket.Readable.push (_stream_readable.js:217:10)\n    at TCP.onStreamRead (internal/stream_base_commons.js:186:23)\n	2020-07-15 17:03:02	GET	/contracts
835	d.vasilakis	Message: missing FROM-clause entry for table "d"\nStack: error: missing FROM-clause entry for table "d"\n    at Parser.parseErrorMessage (/home/d.vasilakis/Ordering_Development/node_modules/pg-protocol/dist/parser.js:241:15)\n    at Parser.handlePacket (/home/d.vasilakis/Ordering_Development/node_modules/pg-protocol/dist/parser.js:89:29)\n    at Parser.parse (/home/d.vasilakis/Ordering_Development/node_modules/pg-protocol/dist/parser.js:41:38)\n    at Socket.<anonymous> (/home/d.vasilakis/Ordering_Development/node_modules/pg-protocol/dist/index.js:8:42)\n    at Socket.emit (events.js:315:20)\n    at addChunk (_stream_readable.js:302:12)\n    at readableAddChunk (_stream_readable.js:278:9)\n    at Socket.Readable.push (_stream_readable.js:217:10)\n    at TCP.onStreamRead (internal/stream_base_commons.js:186:23)\n	2020-07-15 17:05:47	GET	/contracts
836	d.vasilakis	Message: missing FROM-clause entry for table "d"\nStack: error: missing FROM-clause entry for table "d"\n    at Parser.parseErrorMessage (/home/d.vasilakis/Ordering_Development/node_modules/pg-protocol/dist/parser.js:241:15)\n    at Parser.handlePacket (/home/d.vasilakis/Ordering_Development/node_modules/pg-protocol/dist/parser.js:89:29)\n    at Parser.parse (/home/d.vasilakis/Ordering_Development/node_modules/pg-protocol/dist/parser.js:41:38)\n    at Socket.<anonymous> (/home/d.vasilakis/Ordering_Development/node_modules/pg-protocol/dist/index.js:8:42)\n    at Socket.emit (events.js:315:20)\n    at addChunk (_stream_readable.js:302:12)\n    at readableAddChunk (_stream_readable.js:278:9)\n    at Socket.Readable.push (_stream_readable.js:217:10)\n    at TCP.onStreamRead (internal/stream_base_commons.js:186:23)\n	2020-07-15 17:08:49	GET	/contracts
837	d.vasilakis	Message: missing FROM-clause entry for table "d"\nStack: error: missing FROM-clause entry for table "d"\n    at Parser.parseErrorMessage (/home/d.vasilakis/Ordering_Development/node_modules/pg-protocol/dist/parser.js:241:15)\n    at Parser.handlePacket (/home/d.vasilakis/Ordering_Development/node_modules/pg-protocol/dist/parser.js:89:29)\n    at Parser.parse (/home/d.vasilakis/Ordering_Development/node_modules/pg-protocol/dist/parser.js:41:38)\n    at Socket.<anonymous> (/home/d.vasilakis/Ordering_Development/node_modules/pg-protocol/dist/index.js:8:42)\n    at Socket.emit (events.js:315:20)\n    at addChunk (_stream_readable.js:302:12)\n    at readableAddChunk (_stream_readable.js:278:9)\n    at Socket.Readable.push (_stream_readable.js:217:10)\n    at TCP.onStreamRead (internal/stream_base_commons.js:186:23)\n	2020-07-15 17:09:27	GET	/contracts
838	d.vasilakis	Message: missing FROM-clause entry for table "d"\nStack: error: missing FROM-clause entry for table "d"\n    at Parser.parseErrorMessage (/home/d.vasilakis/Ordering_Development/node_modules/pg-protocol/dist/parser.js:241:15)\n    at Parser.handlePacket (/home/d.vasilakis/Ordering_Development/node_modules/pg-protocol/dist/parser.js:89:29)\n    at Parser.parse (/home/d.vasilakis/Ordering_Development/node_modules/pg-protocol/dist/parser.js:41:38)\n    at Socket.<anonymous> (/home/d.vasilakis/Ordering_Development/node_modules/pg-protocol/dist/index.js:8:42)\n    at Socket.emit (events.js:315:20)\n    at addChunk (_stream_readable.js:302:12)\n    at readableAddChunk (_stream_readable.js:278:9)\n    at Socket.Readable.push (_stream_readable.js:217:10)\n    at TCP.onStreamRead (internal/stream_base_commons.js:186:23)\n	2020-07-15 17:11:17	GET	/contracts
\.


--
-- TOC entry 3150 (class 0 OID 16737)
-- Dependencies: 224
-- Data for Name: MonitoringCommittee; Type: TABLE DATA; Schema: Ordering; Owner: postgres
--

COPY "Ordering"."MonitoringCommittee" ("AccountId", "DocumentProtocolNumber", "DocumentProtocolDate", "MayorDecisionProtocolNumber", "MayorDecisionProtocolDate", "PracticalDate") FROM stdin;
\.


--
-- TOC entry 3152 (class 0 OID 16742)
-- Dependencies: 226
-- Data for Name: Reservations; Type: TABLE DATA; Schema: Ordering; Owner: postgres
--

COPY "Ordering"."Reservations" ("Id", "Name", "Percentage", "Stamp", "StampOGA", "IsReservation", "Order") FROM stdin;
8	Φ.Ε.	8.000	\N	\N	t	3
23	Φ.Π.Α.	24.000	\N	\N	f	\N
2	Ε.Α.Α.ΔΗ.ΣΥ.	0.070	3.000	20.000	t	1
5	Α.Ε.Π.Π	0.060	3.000	20.000	t	2
\.


--
-- TOC entry 3154 (class 0 OID 16747)
-- Dependencies: 228
-- Data for Name: Signatory; Type: TABLE DATA; Schema: Ordering; Owner: postgres
--

COPY "Ordering"."Signatory" ("Id", "Name") FROM stdin;
2	ΙΩΑΝΝΗΣ ΧΑΤΖΗΕΥΣΤΡΑΤΙΟΥ
5	ΓΡΑΜΜΑΤΙΚΗ Στ. ΠΑΠΑΖΟΓΛΟΥ
6	ΚΩΝΣΤΑΝΤΙΝΟΣ ΚΑΛΟΥΤΑΣ
7	ΚΩΝΣΤΑΝΤΙΝΑ ΚΟΔΕΛΛΑ
8	ΟΛΓΑ ΒΑΣΟΓΛΟΥ
9	ΒΑΣΙΛΕΙΟΣ ΠΡΙΟΒΟΛΟΣ
\.


--
-- TOC entry 3155 (class 0 OID 16750)
-- Dependencies: 229
-- Data for Name: SignatoryType; Type: TABLE DATA; Schema: Ordering; Owner: postgres
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
-- TOC entry 3165 (class 0 OID 16916)
-- Dependencies: 239
-- Data for Name: SnippetPractical; Type: TABLE DATA; Schema: Ordering; Owner: postgres
--

COPY "Ordering"."SnippetPractical" ("Id", "ContractId", "ProtocolNumber", "ProtocolDate", "DecisionBoardProtocol", "OrderNo") FROM stdin;
1	76	3	2019-02-11	108/2019-01-31	1
\.


--
-- TOC entry 3158 (class 0 OID 16757)
-- Dependencies: 232
-- Data for Name: User; Type: TABLE DATA; Schema: Ordering; Owner: postgres
--

COPY "Ordering"."User" ("Id", "Username", "Password", "Role", "Firstname", "Lastname") FROM stdin;
24	v.priovolos	$2a$10$P5Gxa2rsj4oipFour8kiSOivv1YBhimOhcoiMqSe8lfeM8wauzli2	2	Βασίλειος	Πριόβολος
25	k.kodella	$2a$10$c6XWx0oPIJJGLG7KQQSm4O00s06K9CK9IzuW75Yly1s66hJcaYOK2	2	Κων/να	Κοδέλλα
26	i.fytros	$2a$10$Y4LaYWQ/c.yGWo.83PprNuFy7qxbNa5CyLuP1ZIoMCRpf2P8Dl/Dm	2	Ιωάννης	Φύτρος
27	e.fragkoylopoylos	$2a$10$4Pn8ToetNGhUAMep70s.5OEgMMWpliW89IynRMOeO19EF.ZrZNrv6	2	Εμμανουήλ	Φραγκουλόπουλος
28	d.morfis	$2a$10$fGRX8c47eM0Rj3KyYUXip.WIpdnRwgCKvFXUWAKn452tu.GpU0E52	2	Δημήτριος	Μόρφης
29	e.papakonstantinou	$2a$10$4KkI9U1uxLw8zBzZ3kTupecCtkDSHuxfNxezGDbsY4WaqlV9UzY0.	2	'Ελλη	Παπακωνσταντίνου
30	k.priovolou	$2a$10$f9YgdJkGWowMILAZkHT.9.jn0LisGeOUW3FqtufLGneXcdFMvq.Hm	2	Καλλιόπη	Πριοβόλου
4	dvasilakis	$2a$10$uZiLUhOIDVFc5C6bdu9Lq.6n9p38l90hCYy10pIrU42nLpYe5FR3K	1	Δημήτριος 	Βασιλάκης
3	admin	$2a$10$80mc2Ltf0DBkNvpzkQu51utFnve2iH62IVPO8vGefn2XPrQKvUtti	1	Διαχειριστής	
19	m.apostolopoulou	$2a$10$RxnwA6b8Kqv.TYCGjqji9.z8dLcTZcnrdBMMBuhmMb2w/Zm19Xdwm	3	Μαρία	Αποστολοπούλου
21	k.kaloutas	$2a$10$ix4aMH88ybzSGJLVTuDHHO7Eh2jsZNUGuF1XLsfFojoeIOneibYW2	1	Κων/νος	Καλουτάς
22	i.chatzieustratiou	$2a$10$QOWDKVhn7I98.ARMOMEm3eoX9X0LuVE2m.4V8Kb6t5VK7MbJ.wrwC	2	Ιωάννης	Χατζηευστρατίου
31	o.evangelinou	$2a$10$bhovWtSsDz/Wb9mBjBH5hu4YtxIy0EhUlbSl2yqL99V0h513MTO1e	2	Ορθοδοξία	Ευαγγελινού
32	o.vasoglou	$2a$10$/vhbz3FivlLKOp2a0tT7/.budNroZg7bvMtyEPRAy9a.K.e6p5Toi	2	Όλγα	Βάσογλου
\.


--
-- TOC entry 3172 (class 0 OID 25166)
-- Dependencies: 246
-- Data for Name: UserReservations; Type: TABLE DATA; Schema: Ordering; Owner: postgres
--

COPY "Ordering"."UserReservations" ("Id", "UserId", "Name", "Percentage", "Stamp", "StampOGA", "IsReservation", "Order") FROM stdin;
2	d.vasilakis	Α.Ε.Π.Π	0.060	3.000	20.000	t	2
3	d.vasilakis	Φ.Ε.	8.000	\N	\N	t	3
4	d.vasilakis	Φ.Π.Α.	28.000	\N	\N	f	\N
1	d.vasilakis	Ε.Α.Α.ΔΗ.ΣΥ.	0.070	3.000	20.000	t	1
\.


--
-- TOC entry 3159 (class 0 OID 16763)
-- Dependencies: 233
-- Data for Name: UserRoles; Type: TABLE DATA; Schema: Ordering; Owner: postgres
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
-- TOC entry 3200 (class 0 OID 0)
-- Dependencies: 200
-- Name: AAY_Id_seq; Type: SEQUENCE SET; Schema: Ordering; Owner: postgres
--

SELECT pg_catalog.setval('"Ordering"."AAY_Id_seq"', 127, true);


--
-- TOC entry 3201 (class 0 OID 0)
-- Dependencies: 202
-- Name: Account_Id_seq; Type: SEQUENCE SET; Schema: Ordering; Owner: postgres
--

SELECT pg_catalog.setval('"Ordering"."Account_Id_seq"', 149, true);


--
-- TOC entry 3202 (class 0 OID 0)
-- Dependencies: 204
-- Name: Agencies_Id_seq; Type: SEQUENCE SET; Schema: Ordering; Owner: postgres
--

SELECT pg_catalog.setval('"Ordering"."Agencies_Id_seq"', 21, true);


--
-- TOC entry 3203 (class 0 OID 0)
-- Dependencies: 236
-- Name: AuthorDocumentedRequest_Id_seq; Type: SEQUENCE SET; Schema: Ordering; Owner: postgres
--

SELECT pg_catalog.setval('"Ordering"."AuthorDocumentedRequest_Id_seq"', 2, true);


--
-- TOC entry 3204 (class 0 OID 0)
-- Dependencies: 207
-- Name: ContractType_ContractTypeId_seq; Type: SEQUENCE SET; Schema: Ordering; Owner: postgres
--

SELECT pg_catalog.setval('"Ordering"."ContractType_ContractTypeId_seq"', 2, true);


--
-- TOC entry 3205 (class 0 OID 0)
-- Dependencies: 209
-- Name: Contract_Id_seq; Type: SEQUENCE SET; Schema: Ordering; Owner: postgres
--

SELECT pg_catalog.setval('"Ordering"."Contract_Id_seq"', 90, true);


--
-- TOC entry 3206 (class 0 OID 0)
-- Dependencies: 211
-- Name: CourtOfAuditors_Id_seq; Type: SEQUENCE SET; Schema: Ordering; Owner: postgres
--

SELECT pg_catalog.setval('"Ordering"."CourtOfAuditors_Id_seq"', 15, true);


--
-- TOC entry 3207 (class 0 OID 0)
-- Dependencies: 213
-- Name: DecisionBoard_Id_seq; Type: SEQUENCE SET; Schema: Ordering; Owner: postgres
--

SELECT pg_catalog.setval('"Ordering"."DecisionBoard_Id_seq"', 99, true);


--
-- TOC entry 3208 (class 0 OID 0)
-- Dependencies: 215
-- Name: DecisionCoordinatorDecentrilizedAdministration_Id_seq; Type: SEQUENCE SET; Schema: Ordering; Owner: postgres
--

SELECT pg_catalog.setval('"Ordering"."DecisionCoordinatorDecentrilizedAdministration_Id_seq"', 87, true);


--
-- TOC entry 3209 (class 0 OID 0)
-- Dependencies: 217
-- Name: Department_DepartmentId_seq; Type: SEQUENCE SET; Schema: Ordering; Owner: postgres
--

SELECT pg_catalog.setval('"Ordering"."Department_DepartmentId_seq"', 172, true);


--
-- TOC entry 3210 (class 0 OID 0)
-- Dependencies: 219
-- Name: Direction_DirectionId_seq; Type: SEQUENCE SET; Schema: Ordering; Owner: postgres
--

SELECT pg_catalog.setval('"Ordering"."Direction_DirectionId_seq"', 40, true);


--
-- TOC entry 3211 (class 0 OID 0)
-- Dependencies: 241
-- Name: DocumentSignatory_Id_seq; Type: SEQUENCE SET; Schema: Ordering; Owner: postgres
--

SELECT pg_catalog.setval('"Ordering"."DocumentSignatory_Id_seq"', 36, true);


--
-- TOC entry 3212 (class 0 OID 0)
-- Dependencies: 221
-- Name: Invoice_Id_seq; Type: SEQUENCE SET; Schema: Ordering; Owner: postgres
--

SELECT pg_catalog.setval('"Ordering"."Invoice_Id_seq"', 124, true);


--
-- TOC entry 3213 (class 0 OID 0)
-- Dependencies: 223
-- Name: LogError_Id_seq; Type: SEQUENCE SET; Schema: Ordering; Owner: postgres
--

SELECT pg_catalog.setval('"Ordering"."LogError_Id_seq"', 839, true);


--
-- TOC entry 3214 (class 0 OID 0)
-- Dependencies: 225
-- Name: MonitoringCommittee_AccounttId_seq; Type: SEQUENCE SET; Schema: Ordering; Owner: postgres
--

SELECT pg_catalog.setval('"Ordering"."MonitoringCommittee_AccounttId_seq"', 1, false);


--
-- TOC entry 3215 (class 0 OID 0)
-- Dependencies: 227
-- Name: Reservations_Id_seq; Type: SEQUENCE SET; Schema: Ordering; Owner: postgres
--

SELECT pg_catalog.setval('"Ordering"."Reservations_Id_seq"', 23, true);


--
-- TOC entry 3216 (class 0 OID 0)
-- Dependencies: 230
-- Name: SignatoryType_Id_seq; Type: SEQUENCE SET; Schema: Ordering; Owner: postgres
--

SELECT pg_catalog.setval('"Ordering"."SignatoryType_Id_seq"', 6, true);


--
-- TOC entry 3217 (class 0 OID 0)
-- Dependencies: 231
-- Name: Signatory_Id_seq; Type: SEQUENCE SET; Schema: Ordering; Owner: postgres
--

SELECT pg_catalog.setval('"Ordering"."Signatory_Id_seq"', 9, true);


--
-- TOC entry 3218 (class 0 OID 0)
-- Dependencies: 238
-- Name: SnippetPractical_Id_seq; Type: SEQUENCE SET; Schema: Ordering; Owner: postgres
--

SELECT pg_catalog.setval('"Ordering"."SnippetPractical_Id_seq"', 1, true);


--
-- TOC entry 3219 (class 0 OID 0)
-- Dependencies: 245
-- Name: UserReservations_Id_seq; Type: SEQUENCE SET; Schema: Ordering; Owner: postgres
--

SELECT pg_catalog.setval('"Ordering"."UserReservations_Id_seq"', 4, true);


--
-- TOC entry 3220 (class 0 OID 0)
-- Dependencies: 234
-- Name: UserRoles_Id_seq; Type: SEQUENCE SET; Schema: Ordering; Owner: postgres
--

SELECT pg_catalog.setval('"Ordering"."UserRoles_Id_seq"', 6, true);


--
-- TOC entry 3221 (class 0 OID 0)
-- Dependencies: 235
-- Name: User_Id_seq; Type: SEQUENCE SET; Schema: Ordering; Owner: postgres
--

SELECT pg_catalog.setval('"Ordering"."User_Id_seq"', 32, true);


--
-- TOC entry 3222 (class 0 OID 0)
-- Dependencies: 240
-- Name: documentsignatory_id_seq; Type: SEQUENCE SET; Schema: Ordering; Owner: postgres
--

SELECT pg_catalog.setval('"Ordering".documentsignatory_id_seq', 1, true);


--
-- TOC entry 2955 (class 2606 OID 16792)
-- Name: AAY AAY_pkey; Type: CONSTRAINT; Schema: Ordering; Owner: postgres
--

ALTER TABLE ONLY "Ordering"."AAY"
    ADD CONSTRAINT "AAY_pkey" PRIMARY KEY ("Id");


--
-- TOC entry 2957 (class 2606 OID 16794)
-- Name: Account Account_pkey; Type: CONSTRAINT; Schema: Ordering; Owner: postgres
--

ALTER TABLE ONLY "Ordering"."Account"
    ADD CONSTRAINT "Account_pkey" PRIMARY KEY ("Id");


--
-- TOC entry 2963 (class 2606 OID 16796)
-- Name: ContractType ContractType_ContactType_pkey; Type: CONSTRAINT; Schema: Ordering; Owner: postgres
--

ALTER TABLE ONLY "Ordering"."ContractType"
    ADD CONSTRAINT "ContractType_ContactType_pkey" PRIMARY KEY ("ContractTypeId");


--
-- TOC entry 2961 (class 2606 OID 16798)
-- Name: Contract Contract_pkey; Type: CONSTRAINT; Schema: Ordering; Owner: postgres
--

ALTER TABLE ONLY "Ordering"."Contract"
    ADD CONSTRAINT "Contract_pkey" PRIMARY KEY ("Id");


--
-- TOC entry 2965 (class 2606 OID 16800)
-- Name: CourtOfAuditors CourtOfAuditors_pkey; Type: CONSTRAINT; Schema: Ordering; Owner: postgres
--

ALTER TABLE ONLY "Ordering"."CourtOfAuditors"
    ADD CONSTRAINT "CourtOfAuditors_pkey" PRIMARY KEY ("Id");


--
-- TOC entry 2967 (class 2606 OID 16802)
-- Name: DecisionBoard DecisionBoard_pkey; Type: CONSTRAINT; Schema: Ordering; Owner: postgres
--

ALTER TABLE ONLY "Ordering"."DecisionBoard"
    ADD CONSTRAINT "DecisionBoard_pkey" PRIMARY KEY ("Id");


--
-- TOC entry 2969 (class 2606 OID 16804)
-- Name: DecisionCoordinatorDecentrilizedAdministration DecisionCoordinatorDecentrilizedAdministration_pkey; Type: CONSTRAINT; Schema: Ordering; Owner: postgres
--

ALTER TABLE ONLY "Ordering"."DecisionCoordinatorDecentrilizedAdministration"
    ADD CONSTRAINT "DecisionCoordinatorDecentrilizedAdministration_pkey" PRIMARY KEY ("Id");


--
-- TOC entry 2971 (class 2606 OID 16806)
-- Name: Department Department_pkey; Type: CONSTRAINT; Schema: Ordering; Owner: postgres
--

ALTER TABLE ONLY "Ordering"."Department"
    ADD CONSTRAINT "Department_pkey" PRIMARY KEY ("DepartmentId");


--
-- TOC entry 2973 (class 2606 OID 16808)
-- Name: Direction Direction_pkey; Type: CONSTRAINT; Schema: Ordering; Owner: postgres
--

ALTER TABLE ONLY "Ordering"."Direction"
    ADD CONSTRAINT "Direction_pkey" PRIMARY KEY ("DirectionId");


--
-- TOC entry 2991 (class 2606 OID 16991)
-- Name: DocumentSignatory DocumentSignatory_pkey; Type: CONSTRAINT; Schema: Ordering; Owner: postgres
--

ALTER TABLE ONLY "Ordering"."DocumentSignatory"
    ADD CONSTRAINT "DocumentSignatory_pkey" PRIMARY KEY ("Id");


--
-- TOC entry 2975 (class 2606 OID 16812)
-- Name: Invoice Invoice_pkey; Type: CONSTRAINT; Schema: Ordering; Owner: postgres
--

ALTER TABLE ONLY "Ordering"."Invoice"
    ADD CONSTRAINT "Invoice_pkey" PRIMARY KEY ("Id");


--
-- TOC entry 2977 (class 2606 OID 16814)
-- Name: LogError LogError_pkey; Type: CONSTRAINT; Schema: Ordering; Owner: postgres
--

ALTER TABLE ONLY "Ordering"."LogError"
    ADD CONSTRAINT "LogError_pkey" PRIMARY KEY ("Id");


--
-- TOC entry 2979 (class 2606 OID 16816)
-- Name: MonitoringCommittee MonitoringCommittee_pkey; Type: CONSTRAINT; Schema: Ordering; Owner: postgres
--

ALTER TABLE ONLY "Ordering"."MonitoringCommittee"
    ADD CONSTRAINT "MonitoringCommittee_pkey" PRIMARY KEY ("AccountId");


--
-- TOC entry 2959 (class 2606 OID 16818)
-- Name: Agencies MunicipalAgencies_pkey; Type: CONSTRAINT; Schema: Ordering; Owner: postgres
--

ALTER TABLE ONLY "Ordering"."Agencies"
    ADD CONSTRAINT "MunicipalAgencies_pkey" PRIMARY KEY ("Id");


--
-- TOC entry 2981 (class 2606 OID 16820)
-- Name: Reservations Reservations_pkey; Type: CONSTRAINT; Schema: Ordering; Owner: postgres
--

ALTER TABLE ONLY "Ordering"."Reservations"
    ADD CONSTRAINT "Reservations_pkey" PRIMARY KEY ("Id");


--
-- TOC entry 2985 (class 2606 OID 16822)
-- Name: SignatoryType SignatoryType_pkey; Type: CONSTRAINT; Schema: Ordering; Owner: postgres
--

ALTER TABLE ONLY "Ordering"."SignatoryType"
    ADD CONSTRAINT "SignatoryType_pkey" PRIMARY KEY ("Id");


--
-- TOC entry 2983 (class 2606 OID 16824)
-- Name: Signatory Signatory_pkey; Type: CONSTRAINT; Schema: Ordering; Owner: postgres
--

ALTER TABLE ONLY "Ordering"."Signatory"
    ADD CONSTRAINT "Signatory_pkey" PRIMARY KEY ("Id");


--
-- TOC entry 2989 (class 2606 OID 16826)
-- Name: UserRoles UserRoles_pkey; Type: CONSTRAINT; Schema: Ordering; Owner: postgres
--

ALTER TABLE ONLY "Ordering"."UserRoles"
    ADD CONSTRAINT "UserRoles_pkey" PRIMARY KEY ("Id");


--
-- TOC entry 2987 (class 2606 OID 16828)
-- Name: User User_pkey; Type: CONSTRAINT; Schema: Ordering; Owner: postgres
--

ALTER TABLE ONLY "Ordering"."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY ("Id");


--
-- TOC entry 2992 (class 2606 OID 16897)
-- Name: AAY AAY_fk; Type: FK CONSTRAINT; Schema: Ordering; Owner: postgres
--

ALTER TABLE ONLY "Ordering"."AAY"
    ADD CONSTRAINT "AAY_fk" FOREIGN KEY ("ContractId") REFERENCES "Ordering"."Contract"("Id");


--
-- TOC entry 2993 (class 2606 OID 16834)
-- Name: Account Account_fk; Type: FK CONSTRAINT; Schema: Ordering; Owner: postgres
--

ALTER TABLE ONLY "Ordering"."Account"
    ADD CONSTRAINT "Account_fk" FOREIGN KEY ("ContractId") REFERENCES "Ordering"."Contract"("Id") ON DELETE CASCADE;


--
-- TOC entry 3002 (class 2606 OID 17019)
-- Name: CC CC_fk; Type: FK CONSTRAINT; Schema: Ordering; Owner: postgres
--

ALTER TABLE ONLY "Ordering"."CC"
    ADD CONSTRAINT "CC_fk" FOREIGN KEY ("AccountId") REFERENCES "Ordering"."Account"("Id") ON DELETE CASCADE;


--
-- TOC entry 3003 (class 2606 OID 17029)
-- Name: CC CC_fk1; Type: FK CONSTRAINT; Schema: Ordering; Owner: postgres
--

ALTER TABLE ONLY "Ordering"."CC"
    ADD CONSTRAINT "CC_fk1" FOREIGN KEY ("ContractId") REFERENCES "Ordering"."Contract"("Id") ON DELETE CASCADE;


--
-- TOC entry 2995 (class 2606 OID 16844)
-- Name: ContractUsers ContractUsers_fk; Type: FK CONSTRAINT; Schema: Ordering; Owner: postgres
--

ALTER TABLE ONLY "Ordering"."ContractUsers"
    ADD CONSTRAINT "ContractUsers_fk" FOREIGN KEY ("ContractId") REFERENCES "Ordering"."Contract"("Id") ON DELETE CASCADE;


--
-- TOC entry 2994 (class 2606 OID 16849)
-- Name: Contract Contract_fk; Type: FK CONSTRAINT; Schema: Ordering; Owner: postgres
--

ALTER TABLE ONLY "Ordering"."Contract"
    ADD CONSTRAINT "Contract_fk" FOREIGN KEY ("ContractTypeId") REFERENCES "Ordering"."ContractType"("ContractTypeId");


--
-- TOC entry 2996 (class 2606 OID 16869)
-- Name: Department Department_fk; Type: FK CONSTRAINT; Schema: Ordering; Owner: postgres
--

ALTER TABLE ONLY "Ordering"."Department"
    ADD CONSTRAINT "Department_fk" FOREIGN KEY ("DirectionId") REFERENCES "Ordering"."Direction"("DirectionId") ON DELETE CASCADE;


--
-- TOC entry 2999 (class 2606 OID 16992)
-- Name: DocumentSignatory DocumentSignatory_fk; Type: FK CONSTRAINT; Schema: Ordering; Owner: postgres
--

ALTER TABLE ONLY "Ordering"."DocumentSignatory"
    ADD CONSTRAINT "DocumentSignatory_fk" FOREIGN KEY ("AccountId") REFERENCES "Ordering"."Account"("Id") ON DELETE CASCADE;


--
-- TOC entry 3000 (class 2606 OID 16997)
-- Name: DocumentSignatory DocumentSignatory_fk1; Type: FK CONSTRAINT; Schema: Ordering; Owner: postgres
--

ALTER TABLE ONLY "Ordering"."DocumentSignatory"
    ADD CONSTRAINT "DocumentSignatory_fk1" FOREIGN KEY ("SignatoryId") REFERENCES "Ordering"."Signatory"("Id") ON DELETE CASCADE;


--
-- TOC entry 3001 (class 2606 OID 17002)
-- Name: DocumentSignatory DocumentSignatory_fk2; Type: FK CONSTRAINT; Schema: Ordering; Owner: postgres
--

ALTER TABLE ONLY "Ordering"."DocumentSignatory"
    ADD CONSTRAINT "DocumentSignatory_fk2" FOREIGN KEY ("SignatoryTypeId") REFERENCES "Ordering"."SignatoryType"("Id") ON DELETE CASCADE;


--
-- TOC entry 2997 (class 2606 OID 16889)
-- Name: Invoice Invoice_fk; Type: FK CONSTRAINT; Schema: Ordering; Owner: postgres
--

ALTER TABLE ONLY "Ordering"."Invoice"
    ADD CONSTRAINT "Invoice_fk" FOREIGN KEY ("AccountId") REFERENCES "Ordering"."Account"("Id") ON DELETE CASCADE;


--
-- TOC entry 2998 (class 2606 OID 16920)
-- Name: SnippetPractical SnippetPractical_fk; Type: FK CONSTRAINT; Schema: Ordering; Owner: postgres
--

ALTER TABLE ONLY "Ordering"."SnippetPractical"
    ADD CONSTRAINT "SnippetPractical_fk" FOREIGN KEY ("ContractId") REFERENCES "Ordering"."Contract"("Id");


-- Completed on 2020-07-16 10:31:05

--
-- PostgreSQL database dump complete
--

