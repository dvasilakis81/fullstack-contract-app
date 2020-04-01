--
-- PostgreSQL database dump
--

-- Dumped from database version 11.2
-- Dumped by pg_dump version 11.1

-- Started on 2019-05-14 22:01:16

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
-- TOC entry 7 (class 2615 OID 16809)
-- Name: Ordering; Type: SCHEMA; Schema: -; Owner: dvasilakis
--

CREATE SCHEMA "Ordering";


ALTER SCHEMA "Ordering" OWNER TO dvasilakis;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 197 (class 1259 OID 16810)
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
    "PreviousYear" integer
);


ALTER TABLE "Ordering"."AAY" OWNER TO dvasilakis;

--
-- TOC entry 198 (class 1259 OID 16813)
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
-- TOC entry 2927 (class 0 OID 0)
-- Dependencies: 198
-- Name: AAY_Id_seq; Type: SEQUENCE OWNED BY; Schema: Ordering; Owner: dvasilakis
--

ALTER SEQUENCE "Ordering"."AAY_Id_seq" OWNED BY "Ordering"."AAY"."Id";


--
-- TOC entry 199 (class 1259 OID 16815)
-- Name: Account; Type: TABLE; Schema: Ordering; Owner: dvasilakis
--

CREATE TABLE "Ordering"."Account" (
    "Id" bigint NOT NULL,
    "contractId" bigint,
    "Number" integer,
    "Start" date,
    "End" date,
    "Amount" real,
    "ProtocolNumber" integer,
    "ProtocolDate" date,
    "DocumentConfirmationDate" date,
    "DateDeliveryGoods" date,
    "IsFirstOfTheYear" boolean,
    "Attach2_ADA" character varying(255),
    "BudgetExpenditureYear" integer,
    "AmountInWords" character varying(1000)
);


ALTER TABLE "Ordering"."Account" OWNER TO dvasilakis;

--
-- TOC entry 200 (class 1259 OID 16821)
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
-- TOC entry 2928 (class 0 OID 0)
-- Dependencies: 200
-- Name: Account_Id_seq; Type: SEQUENCE OWNED BY; Schema: Ordering; Owner: dvasilakis
--

ALTER SEQUENCE "Ordering"."Account_Id_seq" OWNED BY "Ordering"."Account"."Id";


--
-- TOC entry 201 (class 1259 OID 16823)
-- Name: CC; Type: TABLE; Schema: Ordering; Owner: dvasilakis
--

CREATE TABLE "Ordering"."CC" (
    "Id" bigint NOT NULL,
    "AccountId" bigint,
    "Value" integer
);


ALTER TABLE "Ordering"."CC" OWNER TO dvasilakis;

--
-- TOC entry 202 (class 1259 OID 16826)
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
-- TOC entry 2929 (class 0 OID 0)
-- Dependencies: 202
-- Name: CC_Id_seq; Type: SEQUENCE OWNED BY; Schema: Ordering; Owner: dvasilakis
--

ALTER SEQUENCE "Ordering"."CC_Id_seq" OWNED BY "Ordering"."CC"."Id";


--
-- TOC entry 203 (class 1259 OID 16828)
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
-- TOC entry 204 (class 1259 OID 16834)
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
-- TOC entry 2930 (class 0 OID 0)
-- Dependencies: 204
-- Name: Concessionaire_Id_seq; Type: SEQUENCE OWNED BY; Schema: Ordering; Owner: dvasilakis
--

ALTER SEQUENCE "Ordering"."Concessionaire_Id_seq" OWNED BY "Ordering"."Concessionaire"."ConcessionaireId";


--
-- TOC entry 205 (class 1259 OID 16836)
-- Name: Contract; Type: TABLE; Schema: Ordering; Owner: dvasilakis
--

CREATE TABLE "Ordering"."Contract" (
    "Id" bigint NOT NULL,
    "ContractType" integer,
    "Concessionaire" bigint,
    "Title" character varying(2000),
    "ProtocolNumber" character varying(10),
    "ProtocolDate" date,
    "KAE" character varying(10),
    "Actor" character varying(5),
    "CodeDirection" character varying(5),
    "AwardNumber" character varying(10),
    "AwardDate" date,
    "ADA" character varying(10),
    "CpvCode" character varying(20),
    "CpvTitle" character varying(255),
    "ClearAmount" real,
    "FPA" real,
    "TotalAmount" real,
    "PaidAmount" real,
    "PaidAmountFpa" real,
    "PaidAmountTotal" real,
    "Balance" real,
    "Start" date,
    "End" date,
    "numberOfAccounts" integer,
    "DirectionId" bigint,
    "DepartmentId" bigint
);
ALTER TABLE ONLY "Ordering"."Contract" ALTER COLUMN "AwardNumber" SET STATISTICS 0;
ALTER TABLE ONLY "Ordering"."Contract" ALTER COLUMN "AwardDate" SET STATISTICS 0;
ALTER TABLE ONLY "Ordering"."Contract" ALTER COLUMN "ADA" SET STATISTICS 0;
ALTER TABLE ONLY "Ordering"."Contract" ALTER COLUMN "CpvCode" SET STATISTICS 0;
ALTER TABLE ONLY "Ordering"."Contract" ALTER COLUMN "CpvTitle" SET STATISTICS 0;


ALTER TABLE "Ordering"."Contract" OWNER TO dvasilakis;

--
-- TOC entry 206 (class 1259 OID 16842)
-- Name: ContractType; Type: TABLE; Schema: Ordering; Owner: dvasilakis
--

CREATE TABLE "Ordering"."ContractType" (
    "Id" bigint NOT NULL,
    "Name" character varying(255)
);


ALTER TABLE "Ordering"."ContractType" OWNER TO dvasilakis;

--
-- TOC entry 207 (class 1259 OID 16845)
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
-- TOC entry 2931 (class 0 OID 0)
-- Dependencies: 207
-- Name: ContractType_Id_seq; Type: SEQUENCE OWNED BY; Schema: Ordering; Owner: dvasilakis
--

ALTER SEQUENCE "Ordering"."ContractType_Id_seq" OWNED BY "Ordering"."ContractType"."Id";


--
-- TOC entry 208 (class 1259 OID 16847)
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
-- TOC entry 2932 (class 0 OID 0)
-- Dependencies: 208
-- Name: Contract_Id_seq; Type: SEQUENCE OWNED BY; Schema: Ordering; Owner: dvasilakis
--

ALTER SEQUENCE "Ordering"."Contract_Id_seq" OWNED BY "Ordering"."Contract"."Id";


--
-- TOC entry 209 (class 1259 OID 16849)
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
    "DepartmentCity" character varying(50)
);


ALTER TABLE "Ordering"."Department" OWNER TO dvasilakis;

--
-- TOC entry 210 (class 1259 OID 16855)
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
-- TOC entry 2933 (class 0 OID 0)
-- Dependencies: 210
-- Name: Department_Id_seq; Type: SEQUENCE OWNED BY; Schema: Ordering; Owner: dvasilakis
--

ALTER SEQUENCE "Ordering"."Department_Id_seq" OWNED BY "Ordering"."Department"."DepartmentId";


--
-- TOC entry 211 (class 1259 OID 16857)
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
-- TOC entry 212 (class 1259 OID 16863)
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
-- TOC entry 2934 (class 0 OID 0)
-- Dependencies: 212
-- Name: Direction_Id_seq; Type: SEQUENCE OWNED BY; Schema: Ordering; Owner: dvasilakis
--

ALTER SEQUENCE "Ordering"."Direction_Id_seq" OWNED BY "Ordering"."Direction"."DirectionId";


--
-- TOC entry 213 (class 1259 OID 16865)
-- Name: DocumentSignatories; Type: TABLE; Schema: Ordering; Owner: dvasilakis
--

CREATE TABLE "Ordering"."DocumentSignatories" (
    "Id" bigint NOT NULL,
    "ContractId" bigint,
    "AccountId" bigint,
    "Name" integer,
    "SignatoryType" integer
);


ALTER TABLE "Ordering"."DocumentSignatories" OWNER TO dvasilakis;

--
-- TOC entry 214 (class 1259 OID 16868)
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
-- TOC entry 215 (class 1259 OID 16871)
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
-- TOC entry 2935 (class 0 OID 0)
-- Dependencies: 215
-- Name: Invoice_Id_seq; Type: SEQUENCE OWNED BY; Schema: Ordering; Owner: dvasilakis
--

ALTER SEQUENCE "Ordering"."Invoice_Id_seq" OWNED BY "Ordering"."Invoice"."Id";


--
-- TOC entry 216 (class 1259 OID 16873)
-- Name: Signatory; Type: TABLE; Schema: Ordering; Owner: dvasilakis
--

CREATE TABLE "Ordering"."Signatory" (
    "Id" smallint NOT NULL,
    "Name" character varying(255),
    "SignatoryType" smallint
);


ALTER TABLE "Ordering"."Signatory" OWNER TO dvasilakis;

--
-- TOC entry 217 (class 1259 OID 16876)
-- Name: SignatoryType; Type: TABLE; Schema: Ordering; Owner: dvasilakis
--

CREATE TABLE "Ordering"."SignatoryType" (
    "Id" smallint NOT NULL,
    "Name" character varying(255)
);


ALTER TABLE "Ordering"."SignatoryType" OWNER TO dvasilakis;

--
-- TOC entry 218 (class 1259 OID 16879)
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
-- TOC entry 2936 (class 0 OID 0)
-- Dependencies: 218
-- Name: SignatoryType_Id_seq; Type: SEQUENCE OWNED BY; Schema: Ordering; Owner: dvasilakis
--

ALTER SEQUENCE "Ordering"."SignatoryType_Id_seq" OWNED BY "Ordering"."SignatoryType"."Id";


--
-- TOC entry 219 (class 1259 OID 16881)
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
-- TOC entry 2937 (class 0 OID 0)
-- Dependencies: 219
-- Name: Signatory_Id_seq; Type: SEQUENCE OWNED BY; Schema: Ordering; Owner: dvasilakis
--

ALTER SEQUENCE "Ordering"."Signatory_Id_seq" OWNED BY "Ordering"."Signatory"."Id";


--
-- TOC entry 2755 (class 2604 OID 16964)
-- Name: AAY Id; Type: DEFAULT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."AAY" ALTER COLUMN "Id" SET DEFAULT nextval('"Ordering"."AAY_Id_seq"'::regclass);


--
-- TOC entry 2756 (class 2604 OID 16965)
-- Name: Account Id; Type: DEFAULT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."Account" ALTER COLUMN "Id" SET DEFAULT nextval('"Ordering"."Account_Id_seq"'::regclass);


--
-- TOC entry 2757 (class 2604 OID 16966)
-- Name: CC Id; Type: DEFAULT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."CC" ALTER COLUMN "Id" SET DEFAULT nextval('"Ordering"."CC_Id_seq"'::regclass);


--
-- TOC entry 2758 (class 2604 OID 16967)
-- Name: Concessionaire ConcessionaireId; Type: DEFAULT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."Concessionaire" ALTER COLUMN "ConcessionaireId" SET DEFAULT nextval('"Ordering"."Concessionaire_Id_seq"'::regclass);


--
-- TOC entry 2759 (class 2604 OID 16968)
-- Name: Contract Id; Type: DEFAULT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."Contract" ALTER COLUMN "Id" SET DEFAULT nextval('"Ordering"."Contract_Id_seq"'::regclass);


--
-- TOC entry 2760 (class 2604 OID 16969)
-- Name: ContractType Id; Type: DEFAULT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."ContractType" ALTER COLUMN "Id" SET DEFAULT nextval('"Ordering"."ContractType_Id_seq"'::regclass);


--
-- TOC entry 2761 (class 2604 OID 16970)
-- Name: Department DepartmentId; Type: DEFAULT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."Department" ALTER COLUMN "DepartmentId" SET DEFAULT nextval('"Ordering"."Department_Id_seq"'::regclass);


--
-- TOC entry 2762 (class 2604 OID 16971)
-- Name: Direction DirectionId; Type: DEFAULT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."Direction" ALTER COLUMN "DirectionId" SET DEFAULT nextval('"Ordering"."Direction_Id_seq"'::regclass);


--
-- TOC entry 2763 (class 2604 OID 16972)
-- Name: Invoice Id; Type: DEFAULT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."Invoice" ALTER COLUMN "Id" SET DEFAULT nextval('"Ordering"."Invoice_Id_seq"'::regclass);


--
-- TOC entry 2764 (class 2604 OID 16973)
-- Name: Signatory Id; Type: DEFAULT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."Signatory" ALTER COLUMN "Id" SET DEFAULT nextval('"Ordering"."Signatory_Id_seq"'::regclass);


--
-- TOC entry 2765 (class 2604 OID 16974)
-- Name: SignatoryType Id; Type: DEFAULT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."SignatoryType" ALTER COLUMN "Id" SET DEFAULT nextval('"Ordering"."SignatoryType_Id_seq"'::regclass);


--
-- TOC entry 2767 (class 2606 OID 16895)
-- Name: AAY AAY_pkey; Type: CONSTRAINT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."AAY"
    ADD CONSTRAINT "AAY_pkey" PRIMARY KEY ("Id");


--
-- TOC entry 2769 (class 2606 OID 16897)
-- Name: Account Account_pkey; Type: CONSTRAINT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."Account"
    ADD CONSTRAINT "Account_pkey" PRIMARY KEY ("Id");


--
-- TOC entry 2771 (class 2606 OID 16899)
-- Name: CC CC_pkey; Type: CONSTRAINT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."CC"
    ADD CONSTRAINT "CC_pkey" PRIMARY KEY ("Id");


--
-- TOC entry 2773 (class 2606 OID 16901)
-- Name: Concessionaire Concessionaire_pkey; Type: CONSTRAINT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."Concessionaire"
    ADD CONSTRAINT "Concessionaire_pkey" PRIMARY KEY ("ConcessionaireId");


--
-- TOC entry 2777 (class 2606 OID 16903)
-- Name: ContractType ContractType_ContactType_pkey; Type: CONSTRAINT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."ContractType"
    ADD CONSTRAINT "ContractType_ContactType_pkey" PRIMARY KEY ("Id");


--
-- TOC entry 2775 (class 2606 OID 16905)
-- Name: Contract Contract_pkey; Type: CONSTRAINT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."Contract"
    ADD CONSTRAINT "Contract_pkey" PRIMARY KEY ("Id");


--
-- TOC entry 2779 (class 2606 OID 16907)
-- Name: Department Department_pkey; Type: CONSTRAINT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."Department"
    ADD CONSTRAINT "Department_pkey" PRIMARY KEY ("DepartmentId");


--
-- TOC entry 2781 (class 2606 OID 16909)
-- Name: Direction Direction_pkey; Type: CONSTRAINT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."Direction"
    ADD CONSTRAINT "Direction_pkey" PRIMARY KEY ("DirectionId");


--
-- TOC entry 2783 (class 2606 OID 16911)
-- Name: DocumentSignatories DocumentSignatories_pkey; Type: CONSTRAINT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."DocumentSignatories"
    ADD CONSTRAINT "DocumentSignatories_pkey" PRIMARY KEY ("Id");


--
-- TOC entry 2785 (class 2606 OID 16913)
-- Name: Invoice Invoice_pkey; Type: CONSTRAINT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."Invoice"
    ADD CONSTRAINT "Invoice_pkey" PRIMARY KEY ("Id");


--
-- TOC entry 2789 (class 2606 OID 16915)
-- Name: SignatoryType SignatoryType_pkey; Type: CONSTRAINT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."SignatoryType"
    ADD CONSTRAINT "SignatoryType_pkey" PRIMARY KEY ("Id");


--
-- TOC entry 2787 (class 2606 OID 16917)
-- Name: Signatory Signatory_pkey; Type: CONSTRAINT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."Signatory"
    ADD CONSTRAINT "Signatory_pkey" PRIMARY KEY ("Id");


--
-- TOC entry 2790 (class 2606 OID 16918)
-- Name: AAY AAY_fk; Type: FK CONSTRAINT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."AAY"
    ADD CONSTRAINT "AAY_fk" FOREIGN KEY ("AccountId") REFERENCES "Ordering"."Account"("Id");


--
-- TOC entry 2791 (class 2606 OID 16923)
-- Name: Account Account_fk; Type: FK CONSTRAINT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."Account"
    ADD CONSTRAINT "Account_fk" FOREIGN KEY ("contractId") REFERENCES "Ordering"."Contract"("Id");


--
-- TOC entry 2792 (class 2606 OID 16928)
-- Name: CC CC_fk; Type: FK CONSTRAINT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."CC"
    ADD CONSTRAINT "CC_fk" FOREIGN KEY ("AccountId") REFERENCES "Ordering"."Account"("Id");


--
-- TOC entry 2793 (class 2606 OID 16933)
-- Name: Contract Contract_fk; Type: FK CONSTRAINT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."Contract"
    ADD CONSTRAINT "Contract_fk" FOREIGN KEY ("ContractType") REFERENCES "Ordering"."ContractType"("Id");


--
-- TOC entry 2794 (class 2606 OID 16938)
-- Name: Contract Contract_fk1; Type: FK CONSTRAINT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."Contract"
    ADD CONSTRAINT "Contract_fk1" FOREIGN KEY ("Concessionaire") REFERENCES "Ordering"."Concessionaire"("ConcessionaireId");


--
-- TOC entry 2795 (class 2606 OID 16989)
-- Name: Contract Contract_fk2; Type: FK CONSTRAINT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."Contract"
    ADD CONSTRAINT "Contract_fk2" FOREIGN KEY ("DirectionId") REFERENCES "Ordering"."Direction"("DirectionId");


--
-- TOC entry 2796 (class 2606 OID 16994)
-- Name: Contract Contract_fk3; Type: FK CONSTRAINT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."Contract"
    ADD CONSTRAINT "Contract_fk3" FOREIGN KEY ("DepartmentId") REFERENCES "Ordering"."Department"("DepartmentId");


--
-- TOC entry 2797 (class 2606 OID 16943)
-- Name: Department Department_fk; Type: FK CONSTRAINT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."Department"
    ADD CONSTRAINT "Department_fk" FOREIGN KEY ("DirectionId") REFERENCES "Ordering"."Direction"("DirectionId");


--
-- TOC entry 2798 (class 2606 OID 16948)
-- Name: DocumentSignatories DocumentSignatories_fk; Type: FK CONSTRAINT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."DocumentSignatories"
    ADD CONSTRAINT "DocumentSignatories_fk" FOREIGN KEY ("ContractId") REFERENCES "Ordering"."Contract"("Id");


--
-- TOC entry 2799 (class 2606 OID 16953)
-- Name: DocumentSignatories DocumentSignatories_fk1; Type: FK CONSTRAINT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."DocumentSignatories"
    ADD CONSTRAINT "DocumentSignatories_fk1" FOREIGN KEY ("AccountId") REFERENCES "Ordering"."Account"("Id");


--
-- TOC entry 2800 (class 2606 OID 16958)
-- Name: Invoice Invoice_fk; Type: FK CONSTRAINT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."Invoice"
    ADD CONSTRAINT "Invoice_fk" FOREIGN KEY ("AccountId") REFERENCES "Ordering"."Account"("Id");


-- Completed on 2019-05-14 22:01:17

--
-- PostgreSQL database dump complete
--

