 -- SQL Manager Lite for PostgreSQL 6.1.0.53492
-- ---------------------------------------
-- Host      : localhost
-- Database  : Ordering2
-- Version   : PostgreSQL 11.2, compiled by Visual C++ build 1914, 64-bit

CREATE SCHEMA "Ordering" AUTHORIZATION postgres;

SET check_function_bodies = false;
--
-- Structure for table AAY (OID = 24946) :
--
SET search_path = "Ordering", pg_catalog;
CREATE TABLE "Ordering"."AAY" (
    "Id" bigserial NOT NULL,
    "AccountId" bigint NOT NULL,
    "Value" varchar(20),
    "ProtocolNumber" integer,
    "ProtocolDate" date,
    "EadNumber" integer,
    "PreviousYear" varchar(4),
    "ADA" varchar(20)
)
WITH (oids = false);
--
-- Structure for table Account (OID = 24951) :
--
CREATE TABLE "Ordering"."Account" (
    "Id" bigserial NOT NULL,
    "ContractId" bigint NOT NULL,
    "Number" integer NOT NULL,
    "Start" date NOT NULL,
    "End" date NOT NULL,
    "AmountPure" numeric(15,3) NOT NULL,
    "AmountFpa" numeric(15,3) NOT NULL,
    "AmountTotal" numeric(15,3) NOT NULL,
    "ProtocolNumber" integer,
    "ProtocolDate" date,
    "AmountFullWritten" varchar(2000) NOT NULL,
    "IsFirstOfTheYear" boolean NOT NULL,
    "WorkConfirmationDate" date,
    "DeliveryGoodsDate" date,
    "DocumentDate" date,
    "DateCreated" date,
    "DateModified" date,
    "FirstAccountProtocolNumber" bigint,
    "FirstAccountProtocolDate" date,
    "DownpaymentLawArticle" bigint
)
WITH (oids = false);
--
-- Structure for table CC (OID = 24959) :
--
CREATE TABLE "Ordering"."CC" (
    "Id" bigserial NOT NULL,
    "AccountId" bigint NOT NULL,
    "CC1" integer,
    "CC2" integer,
    "ccType" smallint,
    "Order" smallint
)
WITH (oids = false);
--
-- Structure for table Contract (OID = 24972) :
--
CREATE TABLE "Ordering"."Contract" (
    "Id" bigserial NOT NULL,
    "ContractTypeId" integer,
    "Title" varchar(2000),
    "ProtocolNumber" integer,
    "ProtocolDate" date,
    "KAE" varchar(20),
    "Actor" varchar(5),
    "CodeDirection" varchar(5),
    "AwardNumber" integer,
    "AwardDate" date,
    "AwardAda" varchar(20),
    "CpvCode" varchar(20),
    "CpvTitle" varchar(255),
    "AmountPure" numeric(15,3),
    "AmountFpa" numeric(15,3),
    "AmountTotal" numeric(15,3),
    "Balance" numeric(15,3),
    "Start" date,
    "End" date,
    "NumberOfAccounts" integer,
    "DateCreated" timestamp(0) without time zone,
    "DateModified" timestamp(0) without time zone,
    "DirectionId" bigint,
    "DepartmentId" bigint,
    "ConcessionaireName" varchar(1000),
    "ConcessionaireAFM" varchar(50),
    "HasDownPayment" boolean DEFAULT false NOT NULL,
    "FpaValue" integer,
    "OwnerId" bigint,
    "AllUsers" boolean
)
WITH (oids = false);
ALTER TABLE ONLY "Ordering"."Contract" ALTER COLUMN "AwardNumber" SET STATISTICS 0;
ALTER TABLE ONLY "Ordering"."Contract" ALTER COLUMN "AwardDate" SET STATISTICS 0;
ALTER TABLE ONLY "Ordering"."Contract" ALTER COLUMN "AwardAda" SET STATISTICS 0;
ALTER TABLE ONLY "Ordering"."Contract" ALTER COLUMN "CpvCode" SET STATISTICS 0;
ALTER TABLE ONLY "Ordering"."Contract" ALTER COLUMN "CpvTitle" SET STATISTICS 0;
--
-- Structure for table ContractType (OID = 24978) :
--
CREATE TABLE "Ordering"."ContractType" (
    "ContractTypeId" bigserial NOT NULL,
    "ContractTypeName" varchar(255)
)
WITH (oids = false);
--
-- Structure for table Department (OID = 24985) :
--
CREATE TABLE "Ordering"."Department" (
    "DepartmentId" bigserial NOT NULL,
    "DirectionId" smallint NOT NULL,
    "DepartmentName" varchar(2000) NOT NULL,
    "DepartmentSupervisor" varchar(255),
    "DepartmentTelephone" varchar(200),
    "DepartmentEmail" varchar(255)
)
WITH (oids = false);
--
-- Structure for table Direction (OID = 24993) :
--
CREATE TABLE "Ordering"."Direction" (
    "DirectionId" bigserial NOT NULL,
    "DirectionName" varchar(2000),
    "DirectionSupervisor" varchar(255),
    "DirectionTelephone" varchar(200),
    "DirectionEmail" varchar(255),
    "DirectionAddress" varchar(255),
    "DirectionPostCode" varchar(7),
    "DirectionCity" varchar(50)
)
WITH (oids = false);
--
-- Structure for table DocumentSignatory (OID = 25001) :
--
CREATE TABLE "Ordering"."DocumentSignatory" (
    "Id" bigserial NOT NULL,
    "AccountId" bigint NOT NULL,
    "SignatoryTypeId" integer,
    "SignatoryId" bigint,
    "DocumentType" smallint,
    "Absense" boolean
)
WITH (oids = false);
--
-- Structure for table Invoice (OID = 25004) :
--
CREATE TABLE "Ordering"."Invoice" (
    "Id" bigserial NOT NULL,
    "AccountId" bigint NOT NULL,
    "Number" varchar(20),
    "Date" date,
    "DeliveredDateProtocolNumber" integer,
    "DeliveredDateProtocolDate" date,
    "DeliveredDate" date
)
WITH (oids = false);
--
-- Structure for table Signatory (OID = 25009) :
--
CREATE TABLE "Ordering"."Signatory" (
    "Id" smallint NOT NULL,
    "Name" varchar(255)
)
WITH (oids = false);
--
-- Structure for table SignatoryType (OID = 25012) :
--
CREATE TABLE "Ordering"."SignatoryType" (
    "Id" smallint NOT NULL,
    "Name" varchar(255)
)
WITH (oids = false);
--
-- Structure for table Reservations (OID = 25136) :
--
CREATE TABLE "Ordering"."Reservations" (
    "Id" bigserial NOT NULL,
    "Name" varchar(255),
    "Percentage" numeric(15,3),
    "Stamp" numeric(15,3),
    "StampOGA" numeric(15,3),
    "IsReservation" boolean,
    "Order" smallint
)
WITH (oids = false);
--
-- Structure for table Agencies (OID = 25162) :
--
CREATE TABLE "Ordering"."Agencies" (
    "Id" bigserial NOT NULL,
    "Name" varchar(1000) NOT NULL
)
WITH (oids = false);
--
-- Definition for sequence documentsignatory_id_seq (OID = 25203) :
--
CREATE SEQUENCE "Ordering".documentsignatory_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MAXVALUE
    NO MINVALUE
    CACHE 1;
--
-- Structure for table User (OID = 25267) :
--
CREATE TABLE "Ordering"."User" (
    "Id" bigserial NOT NULL,
    "Username" varchar(50),
    "Password" varchar(1000),
    "Role" integer,
    "Firstname" varchar(50),
    "Lastname" varchar(50)
)
WITH (oids = false);
--
-- Structure for table UserRoles (OID = 25281) :
--
CREATE TABLE "Ordering"."UserRoles" (
    "Id" bigserial NOT NULL,
    "Name" varchar
)
WITH (oids = false);
--
-- Structure for table LogError (OID = 25297) :
--
CREATE TABLE "Ordering"."LogError" (
    "Id" bigserial NOT NULL,
    "Username" varchar(50),
    "ErrorMessage" varchar(2000),
    "DateCreated" timestamp(0) without time zone,
    "HttpMethod" varchar(10),
    "HttpPath" varchar(100)
)
WITH (oids = false);
--
-- Structure for table DecisionBoard (OID = 33615) :
--
CREATE TABLE "Ordering"."DecisionBoard" (
    "Id" bigserial NOT NULL,
    "AccountId" bigint NOT NULL,
    "ProtocolNumber" integer,
    "ProtocolDate" date,
    "Content" varchar(2000)
)
WITH (oids = false);
--
-- Structure for table DecisionCoordinatorDecentrilizedAdministration (OID = 33623) :
--
CREATE TABLE "Ordering"."DecisionCoordinatorDecentrilizedAdministration" (
    "Id" bigserial NOT NULL,
    "AccountId" bigint NOT NULL,
    "ProtocolNumber" integer,
    "ProtocolDate" date
)
WITH (oids = false);
--
-- Structure for table CourtOfAuditors (OID = 33631) :
--
CREATE TABLE "Ordering"."CourtOfAuditors" (
    "Id" bigserial NOT NULL,
    "AccountId" bigint NOT NULL,
    "ProtocolNumber" integer,
    "ProtocolYear" varchar(5),
    "ScaleNumber" varchar(10),
    "APDA_ProtocolNumber" integer,
    "APDA_ProtocolDate" date
)
WITH (oids = false);
--
-- Structure for table ContractUsers (OID = 33755) :
--
CREATE TABLE "Ordering"."ContractUsers" (
    "ContractId" bigint NOT NULL,
    "UserId" bigint NOT NULL
)
WITH (oids = false);
--
-- Definition for sequence contractusers_id_seq (OID = 33760) :
--
CREATE SEQUENCE "Ordering".contractusers_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MAXVALUE
    NO MINVALUE
    CACHE 1;
SET search_path = "Ordering", pg_catalog;
--
-- Data for table "Ordering"."AAY" (OID = 24946) (LIMIT 0,18)
--
INSERT INTO "AAY" ("Id", "AccountId", "Value", "ProtocolNumber", "ProtocolDate", "EadNumber", "PreviousYear", "ADA")
VALUES (98, 109, 'asd', 1, '2019-01-01', 1, NULL, 'asdf');

INSERT INTO "AAY" ("Id", "AccountId", "Value", "ProtocolNumber", "ProtocolDate", "EadNumber", "PreviousYear", "ADA")
VALUES (106, 121, 'WE', 23, '2019-01-01', 2, '12', 'WE');

INSERT INTO "AAY" ("Id", "AccountId", "Value", "ProtocolNumber", "ProtocolDate", "EadNumber", "PreviousYear", "ADA")
VALUES (107, 122, '12', 12, '2020-01-20', 112, '112', '12');

INSERT INTO "AAY" ("Id", "AccountId", "Value", "ProtocolNumber", "ProtocolDate", "EadNumber", "PreviousYear", "ADA")
VALUES (108, 123, '234', 12, '2019-01-01', 234, NULL, 'DDFDF');

INSERT INTO "AAY" ("Id", "AccountId", "Value", "ProtocolNumber", "ProtocolDate", "EadNumber", "PreviousYear", "ADA")
VALUES (112, 127, 'ertert', 234, '2020-01-01', 1345, NULL, 'sdfsdff');

INSERT INTO "AAY" ("Id", "AccountId", "Value", "ProtocolNumber", "ProtocolDate", "EadNumber", "PreviousYear", "ADA")
VALUES (110, 125, '123', 6, '2020-01-01', 1, NULL, '123');

INSERT INTO "AAY" ("Id", "AccountId", "Value", "ProtocolNumber", "ProtocolDate", "EadNumber", "PreviousYear", "ADA")
VALUES (111, 126, 'sdsdf', 123, '2020-01-01', 3, NULL, 'sdfsdf');

INSERT INTO "AAY" ("Id", "AccountId", "Value", "ProtocolNumber", "ProtocolDate", "EadNumber", "PreviousYear", "ADA")
VALUES (113, 128, '12', 123, '2020-01-01', 1, NULL, '12');

INSERT INTO "AAY" ("Id", "AccountId", "Value", "ProtocolNumber", "ProtocolDate", "EadNumber", "PreviousYear", "ADA")
VALUES (97, 108, 'sd', 2, '2019-01-01', 1, '2012', 'sdf');

INSERT INTO "AAY" ("Id", "AccountId", "Value", "ProtocolNumber", "ProtocolDate", "EadNumber", "PreviousYear", "ADA")
VALUES (114, 129, 'df', 123, '2020-02-18', 34, NULL, 'sdf');

INSERT INTO "AAY" ("Id", "AccountId", "Value", "ProtocolNumber", "ProtocolDate", "EadNumber", "PreviousYear", "ADA")
VALUES (115, 130, 'fgrt', 123, '2020-02-20', 123, '23', 'fgertert');

INSERT INTO "AAY" ("Id", "AccountId", "Value", "ProtocolNumber", "ProtocolDate", "EadNumber", "PreviousYear", "ADA")
VALUES (105, 120, '123', 12, '2020-01-19', 3, NULL, 'sdf');

INSERT INTO "AAY" ("Id", "AccountId", "Value", "ProtocolNumber", "ProtocolDate", "EadNumber", "PreviousYear", "ADA")
VALUES (116, 131, '123', 123, '2020-02-12', 456, NULL, '234');

INSERT INTO "AAY" ("Id", "AccountId", "Value", "ProtocolNumber", "ProtocolDate", "EadNumber", "PreviousYear", "ADA")
VALUES (117, 132, '12', 12, '2020-02-20', 12, NULL, 'sdfsdf');

INSERT INTO "AAY" ("Id", "AccountId", "Value", "ProtocolNumber", "ProtocolDate", "EadNumber", "PreviousYear", "ADA")
VALUES (42, 52, '123', 123, '2019-01-01', 123, '3', 'asdf23');

INSERT INTO "AAY" ("Id", "AccountId", "Value", "ProtocolNumber", "ProtocolDate", "EadNumber", "PreviousYear", "ADA")
VALUES (43, 53, 'sdf', 4, '2019-01-01', 3, '1234', '234');

INSERT INTO "AAY" ("Id", "AccountId", "Value", "ProtocolNumber", "ProtocolDate", "EadNumber", "PreviousYear", "ADA")
VALUES (40, 50, '12_u', 19, '2025-03-02', 7, '6', 'uuuu');

INSERT INTO "AAY" ("Id", "AccountId", "Value", "ProtocolNumber", "ProtocolDate", "EadNumber", "PreviousYear", "ADA")
VALUES (41, 51, 'asdf', 1, '2019-01-01', 1, '1', 'sdf');

--
-- Data for table "Ordering"."Account" (OID = 24951) (LIMIT 0,19)
--
INSERT INTO "Account" ("Id", "ContractId", "Number", "Start", "End", "AmountPure", "AmountFpa", "AmountTotal", "ProtocolNumber", "ProtocolDate", "AmountFullWritten", "IsFirstOfTheYear", "WorkConfirmationDate", "DeliveryGoodsDate", "DocumentDate", "DateCreated", "DateModified", "FirstAccountProtocolNumber", "FirstAccountProtocolDate", "DownpaymentLawArticle")
VALUES (109, 58, 3, '2019-01-01', '2019-01-01', 34.000, 8.160, 42.160, NULL, '2019-11-20', 'ΣΑΡΑΝΤΑ ΔΥΟ ΕΥΡΩ ΚΑΙ ΔΕΚΑ ΕΞΙ ΛΕΠΤΩΝ', false, '2019-01-01', '2019-01-01', '2019-01-01', '2019-11-20', '2019-11-20', 1, '2019-01-01', NULL);

INSERT INTO "Account" ("Id", "ContractId", "Number", "Start", "End", "AmountPure", "AmountFpa", "AmountTotal", "ProtocolNumber", "ProtocolDate", "AmountFullWritten", "IsFirstOfTheYear", "WorkConfirmationDate", "DeliveryGoodsDate", "DocumentDate", "DateCreated", "DateModified", "FirstAccountProtocolNumber", "FirstAccountProtocolDate", "DownpaymentLawArticle")
VALUES (110, 58, 4, '2019-01-01', '2019-01-01', 123.000, 29.520, 152.520, NULL, '2019-11-22', 'ΕΚΑΤΟΝ ΠΕΝΗΝΤΑ ΔΥΟ ΕΥΡΩ ΚΑΙ ΠΕΝΗΝΤΑ ΔΥΟ ΛΕΠΤΩΝ', false, '2019-01-01', '2019-01-01', '2019-01-01', '2019-11-22', '2019-11-22', NULL, '2019-01-01', NULL);

INSERT INTO "Account" ("Id", "ContractId", "Number", "Start", "End", "AmountPure", "AmountFpa", "AmountTotal", "ProtocolNumber", "ProtocolDate", "AmountFullWritten", "IsFirstOfTheYear", "WorkConfirmationDate", "DeliveryGoodsDate", "DocumentDate", "DateCreated", "DateModified", "FirstAccountProtocolNumber", "FirstAccountProtocolDate", "DownpaymentLawArticle")
VALUES (108, 58, 2, '2019-01-01', '2019-01-01', 10.000, 2.400, 12.400, NULL, '2019-11-20', 'ΔΕΚΑ ΤΡΙΩΝ ΕΥΡΩ ΚΑΙ ΕΞΗΝΤΑ ΤΕΣΣΑΡΩΝ ΛΕΠΤΩΝ', false, '2019-01-01', '2019-01-01', '2019-01-01', '2019-11-20', '2019-12-10', 1, '2019-01-01', NULL);

INSERT INTO "Account" ("Id", "ContractId", "Number", "Start", "End", "AmountPure", "AmountFpa", "AmountTotal", "ProtocolNumber", "ProtocolDate", "AmountFullWritten", "IsFirstOfTheYear", "WorkConfirmationDate", "DeliveryGoodsDate", "DocumentDate", "DateCreated", "DateModified", "FirstAccountProtocolNumber", "FirstAccountProtocolDate", "DownpaymentLawArticle")
VALUES (52, 53, 2, '2019-01-01', '2019-01-01', 123.000, 29.520, 152.520, NULL, '2019-09-30', 'ΕΚΑΤΩΝ ΠΕΝΗΝΤΑ ΔΥΩ ΕΥΡΩ KAI ΠΕΝΗΝΤΑ ΔΥΩ ΛΕΠΤΩΝ', false, '2019-01-01', '2019-01-01', '2019-01-01', '2019-09-30', '2019-10-08', 1, '2019-01-01', NULL);

INSERT INTO "Account" ("Id", "ContractId", "Number", "Start", "End", "AmountPure", "AmountFpa", "AmountTotal", "ProtocolNumber", "ProtocolDate", "AmountFullWritten", "IsFirstOfTheYear", "WorkConfirmationDate", "DeliveryGoodsDate", "DocumentDate", "DateCreated", "DateModified", "FirstAccountProtocolNumber", "FirstAccountProtocolDate", "DownpaymentLawArticle")
VALUES (53, 54, 10, '2020-01-01', '2020-01-01', 2.000, 0.480, 2.480, NULL, '2019-10-08', 'ΔΥΩ ΕΥΡΩ KAI ΣΑΡΑΝΤΑ ΟΚΤΩ ΛΕΠΤΩΝ', false, '2019-01-01', '2019-02-01', '2019-01-01', '2019-10-08', '2019-10-08', 7, '2020-02-02', NULL);

INSERT INTO "Account" ("Id", "ContractId", "Number", "Start", "End", "AmountPure", "AmountFpa", "AmountTotal", "ProtocolNumber", "ProtocolDate", "AmountFullWritten", "IsFirstOfTheYear", "WorkConfirmationDate", "DeliveryGoodsDate", "DocumentDate", "DateCreated", "DateModified", "FirstAccountProtocolNumber", "FirstAccountProtocolDate", "DownpaymentLawArticle")
VALUES (50, 52, 1, '2019-02-04', '2019-04-04', 5.000, 1.200, 6.200, 1223, '2019-08-07', 'ΕΞΙ ΕΥΡΩ KAI ΕΙΚΟΣΙ ΛΕΠΤΩΝ', true, '2020-03-02', '2020-02-02', '2019-10-02', '2019-08-07', '2019-10-08', NULL, '2019-08-07', NULL);

INSERT INTO "Account" ("Id", "ContractId", "Number", "Start", "End", "AmountPure", "AmountFpa", "AmountTotal", "ProtocolNumber", "ProtocolDate", "AmountFullWritten", "IsFirstOfTheYear", "WorkConfirmationDate", "DeliveryGoodsDate", "DocumentDate", "DateCreated", "DateModified", "FirstAccountProtocolNumber", "FirstAccountProtocolDate", "DownpaymentLawArticle")
VALUES (51, 53, 1, '2019-01-01', '2019-01-01', 256.890, 61.650, 318.540, NULL, '2019-08-23', 'ΤΡΙΑΚΟΣΙΩΝ ΔΕΚΑ ΟΚΤΩ ΕΥΡΩ KAI ΠΕΝΗΝΤΑ ΤΕΣΣΑΡΩΝ ΛΕΠΤΩΝ', false, '2019-01-01', '2019-01-01', '2019-01-01', '2019-08-23', '2019-10-09', NULL, '2019-08-23', NULL);

INSERT INTO "Account" ("Id", "ContractId", "Number", "Start", "End", "AmountPure", "AmountFpa", "AmountTotal", "ProtocolNumber", "ProtocolDate", "AmountFullWritten", "IsFirstOfTheYear", "WorkConfirmationDate", "DeliveryGoodsDate", "DocumentDate", "DateCreated", "DateModified", "FirstAccountProtocolNumber", "FirstAccountProtocolDate", "DownpaymentLawArticle")
VALUES (121, 56, 1, '2019-01-01', '2019-01-01', 12.000, 2.880, 14.880, NULL, NULL, 'ΔΕΚΑ ΤΕΣΣΑΡΩΝ ΕΥΡΩ ΚΑΙ ΟΓΔΟΝΤΑ ΟΚΤΩ ΛΕΠΤΩΝ', false, '2019-01-01', '2019-01-01', '2018-01-01', '2019-12-18', '2019-12-18', NULL, NULL, NULL);

INSERT INTO "Account" ("Id", "ContractId", "Number", "Start", "End", "AmountPure", "AmountFpa", "AmountTotal", "ProtocolNumber", "ProtocolDate", "AmountFullWritten", "IsFirstOfTheYear", "WorkConfirmationDate", "DeliveryGoodsDate", "DocumentDate", "DateCreated", "DateModified", "FirstAccountProtocolNumber", "FirstAccountProtocolDate", "DownpaymentLawArticle")
VALUES (122, 54, 2, '2018-11-18', '2018-11-18', 12234.000, 2936.160, 15170.160, NULL, NULL, 'ΔΕΚΑ ΠΕΝΤΕ ΧΙΛΙΑΔΩΝ ΕΚΑΤΟΝ ΕΒΔΗΜΟΝΤΑ  ΕΥΡΩ ΚΑΙ ΔΕΚΑ ΕΞΙ ΛΕΠΤΩΝ', false, '2020-01-20', '2020-01-20', '2020-01-20', '2019-12-19', '2020-01-23', 12, '2020-01-20', NULL);

INSERT INTO "Account" ("Id", "ContractId", "Number", "Start", "End", "AmountPure", "AmountFpa", "AmountTotal", "ProtocolNumber", "ProtocolDate", "AmountFullWritten", "IsFirstOfTheYear", "WorkConfirmationDate", "DeliveryGoodsDate", "DocumentDate", "DateCreated", "DateModified", "FirstAccountProtocolNumber", "FirstAccountProtocolDate", "DownpaymentLawArticle")
VALUES (123, 56, 2, '2019-01-01', '2019-01-01', 723.000, 173.520, 896.520, NULL, NULL, 'ΟΚΤΑΚΟΣΙΩΝ  ΕΝΝΙΑ ΕΥΡΩ ΚΑΙ  ΤΕΣΣΑΡΩΝ ΛΕΠΤΩΝ', false, '2019-01-01', '2019-01-01', '2019-01-01', '2019-12-20', '2020-01-23', NULL, '1970-01-01', NULL);

INSERT INTO "Account" ("Id", "ContractId", "Number", "Start", "End", "AmountPure", "AmountFpa", "AmountTotal", "ProtocolNumber", "ProtocolDate", "AmountFullWritten", "IsFirstOfTheYear", "WorkConfirmationDate", "DeliveryGoodsDate", "DocumentDate", "DateCreated", "DateModified", "FirstAccountProtocolNumber", "FirstAccountProtocolDate", "DownpaymentLawArticle")
VALUES (127, 68, 3, '2020-01-01', '2020-01-01', 7896.000, 1895.040, 9791.040, NULL, NULL, 'ΕΝΝΙΑ ΧΙΛΙΑΔΩΝ ΕΦΤΑΚΟΣΙΩΝ ΕΝΕΝΗΝΤΑ ΕΝΟΣ ΕΥΡΩ ΚΑΙ  ΤΕΣΣΑΡΩΝ ΛΕΠΤΩΝ', false, '2020-01-01', '2020-01-01', '2020-01-01', '2020-01-29', '2020-01-29', 3265, '2020-01-16', NULL);

INSERT INTO "Account" ("Id", "ContractId", "Number", "Start", "End", "AmountPure", "AmountFpa", "AmountTotal", "ProtocolNumber", "ProtocolDate", "AmountFullWritten", "IsFirstOfTheYear", "WorkConfirmationDate", "DeliveryGoodsDate", "DocumentDate", "DateCreated", "DateModified", "FirstAccountProtocolNumber", "FirstAccountProtocolDate", "DownpaymentLawArticle")
VALUES (125, 68, 1, '2020-01-01', '2020-01-01', 514.000, 123.360, 637.360, 3265, '2020-01-16', 'ΕΞΑΚΟΣΙΩΝ ΤΡΙΑΝΤΑ ΕΦΤΑ ΕΥΡΩ ΚΑΙ ΤΡΙΑΝΤΑ ΕΞΙ ΛΕΠΤΩΝ', false, NULL, NULL, '2020-01-01', '2020-01-23', '2020-01-30', NULL, NULL, 8);

INSERT INTO "Account" ("Id", "ContractId", "Number", "Start", "End", "AmountPure", "AmountFpa", "AmountTotal", "ProtocolNumber", "ProtocolDate", "AmountFullWritten", "IsFirstOfTheYear", "WorkConfirmationDate", "DeliveryGoodsDate", "DocumentDate", "DateCreated", "DateModified", "FirstAccountProtocolNumber", "FirstAccountProtocolDate", "DownpaymentLawArticle")
VALUES (126, 68, 2, '2020-02-03', '2020-03-12', 4567.000, 1096.080, 5663.080, NULL, NULL, 'ΠΕΝΤΕ ΧΙΛΙΑΔΩΝ ΕΞΑΚΟΣΙΩΝ ΕΞΗΝΤΑ ΤΡΙΩΝ ΕΥΡΩ ΚΑΙ  ΟΚΤΩ ΛΕΠΤΩΝ', false, '2020-01-01', '2020-01-01', '2020-01-01', '2020-01-29', '2020-01-30', 3265, '2020-01-16', NULL);

INSERT INTO "Account" ("Id", "ContractId", "Number", "Start", "End", "AmountPure", "AmountFpa", "AmountTotal", "ProtocolNumber", "ProtocolDate", "AmountFullWritten", "IsFirstOfTheYear", "WorkConfirmationDate", "DeliveryGoodsDate", "DocumentDate", "DateCreated", "DateModified", "FirstAccountProtocolNumber", "FirstAccountProtocolDate", "DownpaymentLawArticle")
VALUES (128, 68, 4, '2021-12-03', '2022-12-02', 3786.000, 908.640, 4694.640, NULL, NULL, 'ΤΕΣΣΑΡΩΝ ΧΙΛΙΑΔΩΝ ΕΞΑΚΟΣΙΩΝ ΕΝΕΝΗΝΤΑ ΤΕΣΣΑΡΩΝ ΕΥΡΩ ΚΑΙ ΕΞΗΝΤΑ ΤΕΣΣΑΡΩΝ ΛΕΠΤΩΝ', false, '2020-01-01', '2020-01-01', '2020-01-01', '2020-02-03', '2020-02-03', 3265, '2020-01-16', NULL);

INSERT INTO "Account" ("Id", "ContractId", "Number", "Start", "End", "AmountPure", "AmountFpa", "AmountTotal", "ProtocolNumber", "ProtocolDate", "AmountFullWritten", "IsFirstOfTheYear", "WorkConfirmationDate", "DeliveryGoodsDate", "DocumentDate", "DateCreated", "DateModified", "FirstAccountProtocolNumber", "FirstAccountProtocolDate", "DownpaymentLawArticle")
VALUES (129, 75, 1, '2020-02-12', '2020-12-16', 456.000, 109.440, 565.440, 345, '2020-02-26', 'ΠΕΝΤΑΚΟΣΙΩΝ ΕΞΗΝΤΑ ΠΕΝΤΕ ΕΥΡΩ ΚΑΙ ΣΑΡΑΝΤΑ ΤΕΣΣΑΡΩΝ ΛΕΠΤΩΝ', false, NULL, NULL, '2020-02-20', '2020-02-04', '2020-02-05', NULL, NULL, 5);

INSERT INTO "Account" ("Id", "ContractId", "Number", "Start", "End", "AmountPure", "AmountFpa", "AmountTotal", "ProtocolNumber", "ProtocolDate", "AmountFullWritten", "IsFirstOfTheYear", "WorkConfirmationDate", "DeliveryGoodsDate", "DocumentDate", "DateCreated", "DateModified", "FirstAccountProtocolNumber", "FirstAccountProtocolDate", "DownpaymentLawArticle")
VALUES (130, 75, 2, '2020-02-13', '2020-02-21', 45234.000, 10856.160, 56090.160, NULL, NULL, 'ΠΕΝΗΝΤΑ ΕΞΙ ΧΙΛΙΑΔΩΝ  ΕΝΕΝΗΝΤΑ  ΕΥΡΩ ΚΑΙ ΔΕΚΑ ΕΞΙ ΛΕΠΤΩΝ', false, '2020-02-13', '2020-02-22', '2020-02-21', '2020-02-05', '2020-02-05', 345, '2020-02-26', NULL);

INSERT INTO "Account" ("Id", "ContractId", "Number", "Start", "End", "AmountPure", "AmountFpa", "AmountTotal", "ProtocolNumber", "ProtocolDate", "AmountFullWritten", "IsFirstOfTheYear", "WorkConfirmationDate", "DeliveryGoodsDate", "DocumentDate", "DateCreated", "DateModified", "FirstAccountProtocolNumber", "FirstAccountProtocolDate", "DownpaymentLawArticle")
VALUES (120, 58, 1, '2019-01-16', '2019-12-28', 12.000, 2.880, 14.880, NULL, NULL, 'ΔΕΚΑ ΤΕΣΣΑΡΩΝ ΕΥΡΩ ΚΑΙ ΟΓΔΟΝΤΑ ΟΚΤΩ ΛΕΠΤΩΝ', true, NULL, NULL, '2018-01-20', '2019-12-18', '2020-02-06', NULL, NULL, 3);

INSERT INTO "Account" ("Id", "ContractId", "Number", "Start", "End", "AmountPure", "AmountFpa", "AmountTotal", "ProtocolNumber", "ProtocolDate", "AmountFullWritten", "IsFirstOfTheYear", "WorkConfirmationDate", "DeliveryGoodsDate", "DocumentDate", "DateCreated", "DateModified", "FirstAccountProtocolNumber", "FirstAccountProtocolDate", "DownpaymentLawArticle")
VALUES (131, 57, 1, '2020-02-13', '2020-07-17', 1000.000, 240.000, 1240.000, NULL, NULL, 'ΧΙΛΙΩΝ ΔΙΑΚΟΣΙΩΝ ΣΑΡΑΝΤΑ  ΕΥΡΩ', false, NULL, NULL, '2020-02-28', '2020-02-05', '2020-02-06', NULL, NULL, 67);

INSERT INTO "Account" ("Id", "ContractId", "Number", "Start", "End", "AmountPure", "AmountFpa", "AmountTotal", "ProtocolNumber", "ProtocolDate", "AmountFullWritten", "IsFirstOfTheYear", "WorkConfirmationDate", "DeliveryGoodsDate", "DocumentDate", "DateCreated", "DateModified", "FirstAccountProtocolNumber", "FirstAccountProtocolDate", "DownpaymentLawArticle")
VALUES (132, 58, 5, '2020-02-22', '2020-02-20', 3456.000, 829.440, 4285.440, NULL, NULL, 'ΤΕΣΣΑΡΩΝ ΧΙΛΙΑΔΩΝ ΔΙΑΚΟΣΙΩΝ ΟΓΔΟΝΤΑ ΠΕΝΤΕ ΕΥΡΩ ΚΑΙ ΣΑΡΑΝΤΑ ΤΕΣΣΑΡΩΝ ΛΕΠΤΩΝ', false, '2020-02-14', '2020-02-28', '2020-01-01', '2020-02-06', '2020-02-06', NULL, NULL, NULL);

--
-- Data for table "Ordering"."CC" (OID = 24959) (LIMIT 0,36)
--
INSERT INTO "CC" ("Id", "AccountId", "CC1", "CC2", "ccType", "Order")
VALUES (212, 127, 3, 10, 1, 1);

INSERT INTO "CC" ("Id", "AccountId", "CC1", "CC2", "ccType", "Order")
VALUES (213, 127, 1, -1, 2, 2);

INSERT INTO "CC" ("Id", "AccountId", "CC1", "CC2", "ccType", "Order")
VALUES (208, 125, 3, 10, 1, 1);

INSERT INTO "CC" ("Id", "AccountId", "CC1", "CC2", "ccType", "Order")
VALUES (209, 125, 1, -1, 2, 2);

INSERT INTO "CC" ("Id", "AccountId", "CC1", "CC2", "ccType", "Order")
VALUES (190, 109, 3, 10, 1, 1);

INSERT INTO "CC" ("Id", "AccountId", "CC1", "CC2", "ccType", "Order")
VALUES (210, 126, 3, 10, 1, 1);

INSERT INTO "CC" ("Id", "AccountId", "CC1", "CC2", "ccType", "Order")
VALUES (77, 52, 3, 10, 1, 1);

INSERT INTO "CC" ("Id", "AccountId", "CC1", "CC2", "ccType", "Order")
VALUES (78, 52, 1, -1, 2, 2);

INSERT INTO "CC" ("Id", "AccountId", "CC1", "CC2", "ccType", "Order")
VALUES (79, 53, 3, 10, 1, 1);

INSERT INTO "CC" ("Id", "AccountId", "CC1", "CC2", "ccType", "Order")
VALUES (80, 53, 3, 10, 1, 2);

INSERT INTO "CC" ("Id", "AccountId", "CC1", "CC2", "ccType", "Order")
VALUES (73, 50, 3, 10, 1, 1);

INSERT INTO "CC" ("Id", "AccountId", "CC1", "CC2", "ccType", "Order")
VALUES (74, 50, 3, 11, 1, 2);

INSERT INTO "CC" ("Id", "AccountId", "CC1", "CC2", "ccType", "Order")
VALUES (211, 126, 1, -1, 2, 2);

INSERT INTO "CC" ("Id", "AccountId", "CC1", "CC2", "ccType", "Order")
VALUES (75, 51, 3, 10, 1, 1);

INSERT INTO "CC" ("Id", "AccountId", "CC1", "CC2", "ccType", "Order")
VALUES (76, 51, 1, -1, 2, 2);

INSERT INTO "CC" ("Id", "AccountId", "CC1", "CC2", "ccType", "Order")
VALUES (191, 109, -1, -1, 2, 2);

INSERT INTO "CC" ("Id", "AccountId", "CC1", "CC2", "ccType", "Order")
VALUES (188, 108, 3, 10, 1, 1);

INSERT INTO "CC" ("Id", "AccountId", "CC1", "CC2", "ccType", "Order")
VALUES (189, 108, 2, -1, 2, 2);

INSERT INTO "CC" ("Id", "AccountId", "CC1", "CC2", "ccType", "Order")
VALUES (214, 128, 3, 10, 1, 1);

INSERT INTO "CC" ("Id", "AccountId", "CC1", "CC2", "ccType", "Order")
VALUES (215, 128, 1, -1, 2, 2);

INSERT INTO "CC" ("Id", "AccountId", "CC1", "CC2", "ccType", "Order")
VALUES (216, 129, 2, 5, 1, 1);

INSERT INTO "CC" ("Id", "AccountId", "CC1", "CC2", "ccType", "Order")
VALUES (217, 129, 2, 5, 1, 2);

INSERT INTO "CC" ("Id", "AccountId", "CC1", "CC2", "ccType", "Order")
VALUES (200, 121, 3, 10, 1, 1);

INSERT INTO "CC" ("Id", "AccountId", "CC1", "CC2", "ccType", "Order")
VALUES (201, 121, 1, -1, 2, 2);

INSERT INTO "CC" ("Id", "AccountId", "CC1", "CC2", "ccType", "Order")
VALUES (202, 122, 3, 10, 1, 1);

INSERT INTO "CC" ("Id", "AccountId", "CC1", "CC2", "ccType", "Order")
VALUES (203, 122, 1, -1, 2, 2);

INSERT INTO "CC" ("Id", "AccountId", "CC1", "CC2", "ccType", "Order")
VALUES (218, 130, 3, 11, 1, 1);

INSERT INTO "CC" ("Id", "AccountId", "CC1", "CC2", "ccType", "Order")
VALUES (219, 130, 2, 7, 1, 2);

INSERT INTO "CC" ("Id", "AccountId", "CC1", "CC2", "ccType", "Order")
VALUES (204, 123, 3, 10, 1, 1);

INSERT INTO "CC" ("Id", "AccountId", "CC1", "CC2", "ccType", "Order")
VALUES (205, 123, 1, -1, 2, 2);

INSERT INTO "CC" ("Id", "AccountId", "CC1", "CC2", "ccType", "Order")
VALUES (198, 120, 15, 54, 1, 1);

INSERT INTO "CC" ("Id", "AccountId", "CC1", "CC2", "ccType", "Order")
VALUES (199, 120, 1, -1, 2, 2);

INSERT INTO "CC" ("Id", "AccountId", "CC1", "CC2", "ccType", "Order")
VALUES (220, 131, 3, 10, 1, 1);

INSERT INTO "CC" ("Id", "AccountId", "CC1", "CC2", "ccType", "Order")
VALUES (221, 131, 1, -1, 2, 2);

INSERT INTO "CC" ("Id", "AccountId", "CC1", "CC2", "ccType", "Order")
VALUES (222, 132, 3, 10, 1, 1);

INSERT INTO "CC" ("Id", "AccountId", "CC1", "CC2", "ccType", "Order")
VALUES (223, 132, 1, -1, 2, 2);

--
-- Data for table "Ordering"."Contract" (OID = 24972) (LIMIT 0,10)
--
INSERT INTO "Contract" ("Id", "ContractTypeId", "Title", "ProtocolNumber", "ProtocolDate", "KAE", "Actor", "CodeDirection", "AwardNumber", "AwardDate", "AwardAda", "CpvCode", "CpvTitle", "AmountPure", "AmountFpa", "AmountTotal", "Balance", "Start", "End", "NumberOfAccounts", "DateCreated", "DateModified", "DirectionId", "DepartmentId", "ConcessionaireName", "ConcessionaireAFM", "HasDownPayment", "FpaValue", "OwnerId", "AllUsers")
VALUES (54, 2, 'ss', 223, '2019-01-01', '22', '22', '2', 22, '2019-09-11', '2323', '22', 'dd', 12.000, 2.880, 14.880, NULL, '2020-02-01', '2019-01-01', 22, '2019-09-18 15:49:51', '2019-10-18 10:37:52', 3, 10, 'ss', 'ss', false, 24, 4, NULL);

INSERT INTO "Contract" ("Id", "ContractTypeId", "Title", "ProtocolNumber", "ProtocolDate", "KAE", "Actor", "CodeDirection", "AwardNumber", "AwardDate", "AwardAda", "CpvCode", "CpvTitle", "AmountPure", "AmountFpa", "AmountTotal", "Balance", "Start", "End", "NumberOfAccounts", "DateCreated", "DateModified", "DirectionId", "DepartmentId", "ConcessionaireName", "ConcessionaireAFM", "HasDownPayment", "FpaValue", "OwnerId", "AllUsers")
VALUES (56, 2, 'title sadf ', 3, '2019-01-01', 'ασδφ', 'ασδφ', 'ασδφ', 5, '2019-01-01', 'ασδ', 'σαδφ', 'αδσφ', 213445.000, 51226.800, 264672.000, NULL, '2019-01-01', '2019-01-01', 3, '2019-10-18 12:31:42', '2020-01-22 11:49:45', 3, 10, 'ασδφ', 'σαδφ', false, 24, 4, NULL);

INSERT INTO "Contract" ("Id", "ContractTypeId", "Title", "ProtocolNumber", "ProtocolDate", "KAE", "Actor", "CodeDirection", "AwardNumber", "AwardDate", "AwardAda", "CpvCode", "CpvTitle", "AmountPure", "AmountFpa", "AmountTotal", "Balance", "Start", "End", "NumberOfAccounts", "DateCreated", "DateModified", "DirectionId", "DepartmentId", "ConcessionaireName", "ConcessionaireAFM", "HasDownPayment", "FpaValue", "OwnerId", "AllUsers")
VALUES (55, 1, 'Προμήθεια μηχανογραφικού εξοπλισμού hardware (Η/Υ οθονών, φωτοαντιγραφικών, πολυμηχανημάτων κλπ) ', 123456, '2019-09-23', '7134.022', '10', '18', 388, '2019-05-17', '64ΝΔΩ6Μ-Τ10', '30213300-8 ', 'Επιτραπέζιοι ηλεκτρονικοί υπολογιστές', 120955.000, 29029.200, 149984.000, NULL, '2019-09-01', '2019-12-31', 1, '2019-09-26 13:58:58', '2019-10-09 14:35:01', 2, 4, 'ΔΑΕΜ ΑΕ', '090033107', false, 24, 4, NULL);

INSERT INTO "Contract" ("Id", "ContractTypeId", "Title", "ProtocolNumber", "ProtocolDate", "KAE", "Actor", "CodeDirection", "AwardNumber", "AwardDate", "AwardAda", "CpvCode", "CpvTitle", "AmountPure", "AmountFpa", "AmountTotal", "Balance", "Start", "End", "NumberOfAccounts", "DateCreated", "DateModified", "DirectionId", "DepartmentId", "ConcessionaireName", "ConcessionaireAFM", "HasDownPayment", "FpaValue", "OwnerId", "AllUsers")
VALUES (57, 2, 'Contract 2 in a row', 456, '2019-01-01', '123', '23', '112', 2, '2019-01-01', 'sdfasdf', '123', '123', 1232.000, 295.680, 1527.680, NULL, '2019-01-01', '2019-01-01', 2, '2019-10-18 12:35:30', '2020-01-22 12:21:59', 3, 10, 'asdf', '1234', true, 24, 4, true);

INSERT INTO "Contract" ("Id", "ContractTypeId", "Title", "ProtocolNumber", "ProtocolDate", "KAE", "Actor", "CodeDirection", "AwardNumber", "AwardDate", "AwardAda", "CpvCode", "CpvTitle", "AmountPure", "AmountFpa", "AmountTotal", "Balance", "Start", "End", "NumberOfAccounts", "DateCreated", "DateModified", "DirectionId", "DepartmentId", "ConcessionaireName", "ConcessionaireAFM", "HasDownPayment", "FpaValue", "OwnerId", "AllUsers")
VALUES (74, 2, '3333', 453, '2020-01-01', '12', '12', '45', 3, '2020-01-01', 'RTERWT', '34', '23', 603987.780, 144957.070, 748944.850, NULL, '2020-01-01', '2020-01-01', 5, '2020-02-03 13:01:12', '2020-02-03 13:01:12', 3, 10, 'vdfdf', '345546', true, 24, 4, false);

INSERT INTO "Contract" ("Id", "ContractTypeId", "Title", "ProtocolNumber", "ProtocolDate", "KAE", "Actor", "CodeDirection", "AwardNumber", "AwardDate", "AwardAda", "CpvCode", "CpvTitle", "AmountPure", "AmountFpa", "AmountTotal", "Balance", "Start", "End", "NumberOfAccounts", "DateCreated", "DateModified", "DirectionId", "DepartmentId", "ConcessionaireName", "ConcessionaireAFM", "HasDownPayment", "FpaValue", "OwnerId", "AllUsers")
VALUES (75, 1, '5555', 567, '2020-02-14', '12', '12', '12', 456, '2020-01-01', 'ΔΦΔΦΓ', '234', '234', 603987.780, 144957.070, 748944.850, NULL, '2020-02-22', '2020-02-21', 2, '2020-02-03 13:06:22', '2020-02-03 13:06:22', 20, 61, 'sdfsdf', '5676', true, 24, 4, false);

INSERT INTO "Contract" ("Id", "ContractTypeId", "Title", "ProtocolNumber", "ProtocolDate", "KAE", "Actor", "CodeDirection", "AwardNumber", "AwardDate", "AwardAda", "CpvCode", "CpvTitle", "AmountPure", "AmountFpa", "AmountTotal", "Balance", "Start", "End", "NumberOfAccounts", "DateCreated", "DateModified", "DirectionId", "DepartmentId", "ConcessionaireName", "ConcessionaireAFM", "HasDownPayment", "FpaValue", "OwnerId", "AllUsers")
VALUES (58, 2, 'VEWERSDFSDF', 345, '2019-01-01', '123', '123', '12', 123, '2019-01-01', 'sdfsdf', '123', '123', 123293.000, 29590.320, 152883.320, NULL, '2019-01-01', '2019-01-01', 50, '2019-10-18 12:42:26', '2020-02-06 12:13:46', 21, 65, 'sdf', 'sdf', true, 24, 4, true);

INSERT INTO "Contract" ("Id", "ContractTypeId", "Title", "ProtocolNumber", "ProtocolDate", "KAE", "Actor", "CodeDirection", "AwardNumber", "AwardDate", "AwardAda", "CpvCode", "CpvTitle", "AmountPure", "AmountFpa", "AmountTotal", "Balance", "Start", "End", "NumberOfAccounts", "DateCreated", "DateModified", "DirectionId", "DepartmentId", "ConcessionaireName", "ConcessionaireAFM", "HasDownPayment", "FpaValue", "OwnerId", "AllUsers")
VALUES (68, 2, 'Τίτλος Προγραμματικής Σύμβασης 1', 6745, '2020-01-24', '12356', '9', '12', 1344, '2020-01-01', 'ΞΔΞΦΞΓΚ', '23411', 'CPV Tίτλος 111', 603987.780, 144957.070, 748944.850, NULL, '2020-01-01', '2021-01-27', 7, '2020-01-21 14:12:14', '2020-02-07 13:04:04', 25, 84, 'Ανάδοχος 199', '678345234111', true, 24, 4, false);

INSERT INTO "Contract" ("Id", "ContractTypeId", "Title", "ProtocolNumber", "ProtocolDate", "KAE", "Actor", "CodeDirection", "AwardNumber", "AwardDate", "AwardAda", "CpvCode", "CpvTitle", "AmountPure", "AmountFpa", "AmountTotal", "Balance", "Start", "End", "NumberOfAccounts", "DateCreated", "DateModified", "DirectionId", "DepartmentId", "ConcessionaireName", "ConcessionaireAFM", "HasDownPayment", "FpaValue", "OwnerId", "AllUsers")
VALUES (53, 2, 'Contract 2', 2, '2019-01-01', '123', '12', '123', 77, '2024-03-03', 'DFGERTER', 'cpv code 1', 'cpv title', 2500.000, 600.000, 3100.000, NULL, '2019-03-04', '2022-06-07', 5, '2019-08-23 12:08:38', '2020-01-30 16:14:46', 3, 12, 'Anadoxos 2', '123123', false, 24, 4, NULL);

INSERT INTO "Contract" ("Id", "ContractTypeId", "Title", "ProtocolNumber", "ProtocolDate", "KAE", "Actor", "CodeDirection", "AwardNumber", "AwardDate", "AwardAda", "CpvCode", "CpvTitle", "AmountPure", "AmountFpa", "AmountTotal", "Balance", "Start", "End", "NumberOfAccounts", "DateCreated", "DateModified", "DirectionId", "DepartmentId", "ConcessionaireName", "ConcessionaireAFM", "HasDownPayment", "FpaValue", "OwnerId", "AllUsers")
VALUES (52, 1, 'Contract 1', 1, '2019-01-01', '12', '12', '12', 1, '2019-01-01', 'sdfsdf', '123', '123r', 100.000, 24.000, 124.000, NULL, '2019-01-01', '2019-01-01', 8, '2019-08-07 11:22:39', '2020-01-31 14:04:33', 2, 4, 'Anadoxos 1 ', 's234sdf23', false, 24, 4, NULL);

--
-- Data for table "Ordering"."ContractType" (OID = 24978) (LIMIT 0,2)
--
INSERT INTO "ContractType" ("ContractTypeId", "ContractTypeName")
VALUES (2, 'Προγραμματική');

INSERT INTO "ContractType" ("ContractTypeId", "ContractTypeName")
VALUES (1, 'Δημόσιας Ανάθεσης');

--
-- Data for table "Ordering"."Department" (OID = 24985) (LIMIT 0,92)
--
INSERT INTO "Department" ("DepartmentId", "DirectionId", "DepartmentName", "DepartmentSupervisor", "DepartmentTelephone", "DepartmentEmail")
VALUES (62, 21, 'Διοικητικής Υποστήριξης & Ηλεκτρονικής Διακυβέρνησης', 'Τάτση Ζαφειρούλα', '210 5277938', 't.dioikitikis.ypostirixis.astikis.katastasis@athens.gr');

INSERT INTO "Department" ("DepartmentId", "DirectionId", "DepartmentName", "DepartmentSupervisor", "DepartmentTelephone", "DepartmentEmail")
VALUES (63, 21, 'Έκδοσης Πιστοποιητικών', 'Κοντού Αικατερίνη', '210 3722067', 't.ekd.pistopoiitikon@athens.gr');

INSERT INTO "Department" ("DepartmentId", "DirectionId", "DepartmentName", "DepartmentSupervisor", "DepartmentTelephone", "DepartmentEmail")
VALUES (64, 21, 'Μητρώου Αρρένων', 'Καγιά - Παναγοπούλου Αμαλία', '210 3722119', 't.mitroou.arrenon@athens.gr');

INSERT INTO "Department" ("DepartmentId", "DirectionId", "DepartmentName", "DepartmentSupervisor", "DepartmentTelephone", "DepartmentEmail")
VALUES (65, 21, 'Ιθαγένειας, Δημοτολογίου και Εκλογικών Καταλόγων', 'Τσιχριτζή Αμαλία', '210 3722102', ' t.ith.dimotologiou@athens.gr');

INSERT INTO "Department" ("DepartmentId", "DirectionId", "DepartmentName", "DepartmentSupervisor", "DepartmentTelephone", "DepartmentEmail")
VALUES (10, 3, 'Προμηθειών, Προγραμματισμού, Τεκμηρίωσης Αιτημάτων και Ηλεκτρονικής Διακυβέρνησης', 'Μπουρνά Βούλα', '210.5225617', 't.promitheion@athens.gr');

INSERT INTO "Department" ("DepartmentId", "DirectionId", "DepartmentName", "DepartmentSupervisor", "DepartmentTelephone", "DepartmentEmail")
VALUES (76, 24, 'Σχεδιασμού, Οργάνωσης και Ηλεκτρονικής Διακυβέρνησης', ' Καρούσου Ανδριάννα', '210 3626608', 't.sxd.organosis.dim.iatrion@athens.gr');

INSERT INTO "Department" ("DepartmentId", "DirectionId", "DepartmentName", "DepartmentSupervisor", "DepartmentTelephone", "DepartmentEmail")
VALUES (4, 2, 'Τεχνολογίας, Πληροφορικής και Επικοινωνιών', 'Χατζηευστρατίου Ιωάννης', '210.5277169', 'i.chatzieustratiou@athens.gr');

INSERT INTO "Department" ("DepartmentId", "DirectionId", "DepartmentName", "DepartmentSupervisor", "DepartmentTelephone", "DepartmentEmail")
VALUES (5, 2, 'Ανθεκτικότητας και Βιωσιμότητας', 'Νεοφύτου Γεώργιος', '210.3721553', 't.anthektikotitas.biosimotitas@athens.gr');

INSERT INTO "Department" ("DepartmentId", "DirectionId", "DepartmentName", "DepartmentSupervisor", "DepartmentTelephone", "DepartmentEmail")
VALUES (7, 2, 'Στρατηγικού Σχεδιασμού και Προγραμματισμού', 'Κοντώσης Ηλίας', '210.5277160', 't.stratigikou.sxediasmou.progr@athens.gr');

INSERT INTO "Department" ("DepartmentId", "DirectionId", "DepartmentName", "DepartmentSupervisor", "DepartmentTelephone", "DepartmentEmail")
VALUES (6, 2, 'Καινοτομίας και Εξωστρέφειας', 'Παπακωνσταντίνου - Παπαδοπούλου Έλλη', '210.5277109', 't.kainotomias.exostrefias@athens.gr');

INSERT INTO "Department" ("DepartmentId", "DirectionId", "DepartmentName", "DepartmentSupervisor", "DepartmentTelephone", "DepartmentEmail")
VALUES (66, 21, 'Γεννήσεων', 'Δασκαλάκη Ανδριάνα', '210 5277987', 't.genniseon@athens.gr');

INSERT INTO "Department" ("DepartmentId", "DirectionId", "DepartmentName", "DepartmentSupervisor", "DepartmentTelephone", "DepartmentEmail")
VALUES (3, 2, 'Διαχείρισης Γεωχωρικών Δεδομένων Πόλεως
', 'Μαρούγκα Κωνσταντίνα', '210.5277185', 't.gis@athens.gr');

INSERT INTO "Department" ("DepartmentId", "DirectionId", "DepartmentName", "DepartmentSupervisor", "DepartmentTelephone", "DepartmentEmail")
VALUES (67, 21, 'Γάμων – Θανάτων', 'Φρανσέ Αλέγρη', '210 5277966', 't.gamon.thanaton@athens.gr');

INSERT INTO "Department" ("DepartmentId", "DirectionId", "DepartmentName", "DepartmentSupervisor", "DepartmentTelephone", "DepartmentEmail")
VALUES (68, 21, 'Πολιτικών Γάμων', 'Θεωνά Ελένη-Άννα', '210 3722165', 't.politikon.gamon@athens.gr');

INSERT INTO "Department" ("DepartmentId", "DirectionId", "DepartmentName", "DepartmentSupervisor", "DepartmentTelephone", "DepartmentEmail")
VALUES (77, 24, 'Δημοτικών Ιατρειών 1ης και 2ης Δημοτικής κοινότητας', 'Τσιμπλιάρη Βασιλική', '210 9239865', 't.dim.iatrion.dk12@athens.gr');

INSERT INTO "Department" ("DepartmentId", "DirectionId", "DepartmentName", "DepartmentSupervisor", "DepartmentTelephone", "DepartmentEmail")
VALUES (13, 3, 'Διαχείρισης Καυσίμων και Λιπαντικών', 'Τσιλάβης Γεώργιος', '210.3460146', 't.diax.kausimon.lipantikon@athens.gr');

INSERT INTO "Department" ("DepartmentId", "DirectionId", "DepartmentName", "DepartmentSupervisor", "DepartmentTelephone", "DepartmentEmail")
VALUES (2, 2, 'Διοικητικής Υποστήριξης, Τεκμηρίωσης και Ηλεκτρονικής Διακυβέρνησης', 'Πριόβολου Καλλιόπη', '210.5277110', 't.dioikitikis.ypostirixis.strat.sxed@athens.gr');

INSERT INTO "Department" ("DepartmentId", "DirectionId", "DepartmentName", "DepartmentSupervisor", "DepartmentTelephone", "DepartmentEmail")
VALUES (50, 15, 'Διοικητικής Υποστήριξης & Ηλεκτρονικής Διακυβέρνησης', 'Γιώργος Σκαφίδας', '210 5277071', 't.dioikitikis.ypostirixis.apokentrosi@athens.gr');

INSERT INTO "Department" ("DepartmentId", "DirectionId", "DepartmentName", "DepartmentSupervisor", "DepartmentTelephone", "DepartmentEmail")
VALUES (52, 15, 'Εξυπηρέτησης Δημοτών και Επαγγελματιών 1ης Δημοτικής Κοινότητας', 'Σταματογιαννόπουλος Νικόλαος', '210 5277963', 't.dk1@athens.gr');

INSERT INTO "Department" ("DepartmentId", "DirectionId", "DepartmentName", "DepartmentSupervisor", "DepartmentTelephone", "DepartmentEmail")
VALUES (53, 15, 'Εξυπηρέτησης Δημοτών και Επαγγελματιών 2ης Δημοτικής Κοινότητας', 'Καραθανάση Βαρβάρα', '210 7567860', 't.dk2@athens.gr');

INSERT INTO "Department" ("DepartmentId", "DirectionId", "DepartmentName", "DepartmentSupervisor", "DepartmentTelephone", "DepartmentEmail")
VALUES (54, 15, 'Εξυπηρέτησης Δημοτών και Επαγγελματιών 3ης Δημοτικής Κοινότητας', 'Τσιπούρα Ελένη', '210 3424343', 't.dk3@athens.gr');

INSERT INTO "Department" ("DepartmentId", "DirectionId", "DepartmentName", "DepartmentSupervisor", "DepartmentTelephone", "DepartmentEmail")
VALUES (55, 15, 'Εξυπηρέτησης Δημοτών και Επαγγελματιών 4ης Δημοτικής Κοινότητας', 'Νανούρης Ιωάννης', '210 5149940', 't.dk4@athens.gr');

INSERT INTO "Department" ("DepartmentId", "DirectionId", "DepartmentName", "DepartmentSupervisor", "DepartmentTelephone", "DepartmentEmail")
VALUES (56, 15, 'Εξυπηρέτησης Δημοτών και Επαγγελματιών 5ης Δημοτικής Κοινότητας', 'Νικολάου Κωνσταντίνος', '210 8646790', 't.dk5@athens.gr');

INSERT INTO "Department" ("DepartmentId", "DirectionId", "DepartmentName", "DepartmentSupervisor", "DepartmentTelephone", "DepartmentEmail")
VALUES (57, 15, 'Εξυπηρέτησης Δημοτών και Επαγγελματιών 6ης Δημοτικής Κοινότητας', 'Αναγνωστοπούλου Σοφία', '210 8668162', 't.dk6@athens.gr');

INSERT INTO "Department" ("DepartmentId", "DirectionId", "DepartmentName", "DepartmentSupervisor", "DepartmentTelephone", "DepartmentEmail")
VALUES (58, 15, 'Εξυπηρέτησης Δημοτών και Επαγγελματιών 7ης Δημοτικής Κοινότητας', 'Μήτσης Νικόλαος', '210 6998832', 't.dk7@athens.gr');

INSERT INTO "Department" ("DepartmentId", "DirectionId", "DepartmentName", "DepartmentSupervisor", "DepartmentTelephone", "DepartmentEmail")
VALUES (51, 15, 'Διοικητικού, Εποπτείας και Συντονισμού Δημοτικών Κοινοτήτων', 'Γλάρου Ιωάννα', '210 5277501', 't.dioikitiko@athens.gr');

INSERT INTO "Department" ("DepartmentId", "DirectionId", "DepartmentName", "DepartmentSupervisor", "DepartmentTelephone", "DepartmentEmail")
VALUES (59, 20, 'Εξυπηρέτησης Πολιτών', 'Παπαχαραλάμπους Δημήτριος', '210 3303075', 't.exipiretisis.politon@athens.gr');

INSERT INTO "Department" ("DepartmentId", "DirectionId", "DepartmentName", "DepartmentSupervisor", "DepartmentTelephone", "DepartmentEmail")
VALUES (60, 20, 'Εσωτερικής Ανταπόκρισης', 'Φεραδούρου Αναστασία', '210 3836871', 't.esoterikis.antapokrisis@athens.gr');

INSERT INTO "Department" ("DepartmentId", "DirectionId", "DepartmentName", "DepartmentSupervisor", "DepartmentTelephone", "DepartmentEmail")
VALUES (61, 20, 'Εξωτερικών Εφαρμογών', 'Γούλας Κωνσταντίνος', '210 3836871', 't.exoterikon.efarmogon@athens.gr');

INSERT INTO "Department" ("DepartmentId", "DirectionId", "DepartmentName", "DepartmentSupervisor", "DepartmentTelephone", "DepartmentEmail")
VALUES (11, 3, 'Διαδικασιών Σύναψης Δημοσίων Συμβάσεων', 'Μπιμπούδης Παναγιώτης', '213.2082956', 't.prom.dimoprasies@athens.gr');

INSERT INTO "Department" ("DepartmentId", "DirectionId", "DepartmentName", "DepartmentSupervisor", "DepartmentTelephone", "DepartmentEmail")
VALUES (12, 3, 'Αποθηκών Υλικών', 'Κακριδά  Άννα', '210.5225068', 't.apothikon.ylikon@athens.gr');

INSERT INTO "Department" ("DepartmentId", "DirectionId", "DepartmentName", "DepartmentSupervisor", "DepartmentTelephone", "DepartmentEmail")
VALUES (70, 22, 'Δικαστικό', ' ', ' ', ' ');

INSERT INTO "Department" ("DepartmentId", "DirectionId", "DepartmentName", "DepartmentSupervisor", "DepartmentTelephone", "DepartmentEmail")
VALUES (71, 22, 'Γραμματείας και Αρχείου', 'Κρητικός Αλοΐσιος', '210 5277428', 't.gram.arxeiou.nomiki@athens.gr');

INSERT INTO "Department" ("DepartmentId", "DirectionId", "DepartmentName", "DepartmentSupervisor", "DepartmentTelephone", "DepartmentEmail")
VALUES (78, 24, 'Δημοτικών Ιατρειών 3ης και 4ης Δημοτικής κοινότητας', 'Μαρινάκη Σοφία', '210 3427515', 't.dim.iatrion.dk34@athens.gr');

INSERT INTO "Department" ("DepartmentId", "DirectionId", "DepartmentName", "DepartmentSupervisor", "DepartmentTelephone", "DepartmentEmail")
VALUES (72, 23, 'Καταγραφής, Αναθεώρησης και Ελέγχου Τήρησης Διαδικασιών', 'Πουρναροπούλου Μαρία', '213 2083169', 't.ka.an.el.ti.diadikasion@athens.gr');

INSERT INTO "Department" ("DepartmentId", "DirectionId", "DepartmentName", "DepartmentSupervisor", "DepartmentTelephone", "DepartmentEmail")
VALUES (73, 23, 'Διασφάλισης Ποιότητας Παρεχόμενων Υπηρεσιών', 'Δημητρίου Γεώργιος', '210 5277505', 't.dias.poiotitas@athens.gr');

INSERT INTO "Department" ("DepartmentId", "DirectionId", "DepartmentName", "DepartmentSupervisor", "DepartmentTelephone", "DepartmentEmail")
VALUES (74, 23, 'Επικοινωνίας και Διαφάνειας', 'Παπαπέτρου Μαρία', '210 5277515', 't.epik.diafaneias@athens.gr');

INSERT INTO "Department" ("DepartmentId", "DirectionId", "DepartmentName", "DepartmentSupervisor", "DepartmentTelephone", "DepartmentEmail")
VALUES (75, 15, 'Διοικητικού, Εποπτείας και Συντονισμού Δημοτικών Κοινοτήτων', 'Γλάρου Ιωάννα', '210 5277501', 't.dioikitiko@athens.gr');

INSERT INTO "Department" ("DepartmentId", "DirectionId", "DepartmentName", "DepartmentSupervisor", "DepartmentTelephone", "DepartmentEmail")
VALUES (79, 24, 'Δημοτικών Ιατρειών 5ης, 6ης και 7ης Δημοτικής κοινότητας', 'Κουτρέτση Βαρβάρα', '210 2015510-11', 't.dim.iatrion.dk567@athens.gr');

INSERT INTO "Department" ("DepartmentId", "DirectionId", "DepartmentName", "DepartmentSupervisor", "DepartmentTelephone", "DepartmentEmail")
VALUES (80, 24, 'Προληπτικής Ιατρικής, Προαγωγής Υγείας και Δημόσιας Υγείας', 'Σκανδάλη Βασιλική', '210 2015510-11', 't.proliptikis.iatrikis@athens.gr');

INSERT INTO "Department" ("DepartmentId", "DirectionId", "DepartmentName", "DepartmentSupervisor", "DepartmentTelephone", "DepartmentEmail")
VALUES (81, 25, 'Διοικητικής Υποστήριξης & Ηλεκτρονικής Διακυβέρνησης', 'Χειλάκου Στυλιανή', '210 5277491', 't.dioikitikis.ypostirixis.anth.dyn@athens.gr');

INSERT INTO "Department" ("DepartmentId", "DirectionId", "DepartmentName", "DepartmentSupervisor", "DepartmentTelephone", "DepartmentEmail")
VALUES (82, 25, 'Μονίμου Προσωπικού', 'Αθανίτης Βύρων', '210 5277448', 't.mon.pros@athens.gr');

INSERT INTO "Department" ("DepartmentId", "DirectionId", "DepartmentName", "DepartmentSupervisor", "DepartmentTelephone", "DepartmentEmail")
VALUES (83, 25, 'Προσωπικού Ιδιωτικού Δικαίου', 'Γιαννέλης Παναγιώτης', '210 5277450', 't.iddikaiou.pros@athens.gr');

INSERT INTO "Department" ("DepartmentId", "DirectionId", "DepartmentName", "DepartmentSupervisor", "DepartmentTelephone", "DepartmentEmail")
VALUES (84, 25, 'Εκπαίδευσης, Ανάπτυξης, Υγιεινής και Ασφάλειας Ανθρώπινου Δυναμικού', 'Παπάζογλου Γραμματική', '210 5277548, 210 5277542, 210 5277529', 't.ekpaidefsis@athens.gr');

INSERT INTO "Department" ("DepartmentId", "DirectionId", "DepartmentName", "DepartmentSupervisor", "DepartmentTelephone", "DepartmentEmail")
VALUES (85, 25, 'Ελέγχου Απασχόλησης', 'Δερμιτζάκη Αναστασία', '210 5277574', 't.elegxou.apasx@athens.gr');

INSERT INTO "Department" ("DepartmentId", "DirectionId", "DepartmentName", "DepartmentSupervisor", "DepartmentTelephone", "DepartmentEmail")
VALUES (86, 25, 'Ελέγχου Απασχόλησης', 'Δερμιτζάκη Αναστασία', ' 210 5277574', ' t.elegxou.apasx@athens.gr');

INSERT INTO "Department" ("DepartmentId", "DirectionId", "DepartmentName", "DepartmentSupervisor", "DepartmentTelephone", "DepartmentEmail")
VALUES (87, 26, 'Σχεδιασμού, Οργάνωσης και Ηλεκτρονικής Διακυβέρνησης', 'Γαλώνη Βασιλική', '213 2082925', 't.sxd.organosis.paideias@athens.gr');

INSERT INTO "Department" ("DepartmentId", "DirectionId", "DepartmentName", "DepartmentSupervisor", "DepartmentTelephone", "DepartmentEmail")
VALUES (88, 26, 'Υποστήριξης και Λειτουργίας Σχολικών Μονάδων, Σχολικών Επιτροπών και της Δημοτικής Επιτροπής Παιδείας (ΔΕΠ)', 'Μαράκη Σοφία', '213 2082947, 210 8217733', 't.yp.lei.sxolikon.monadon@athens.gr');

INSERT INTO "Department" ("DepartmentId", "DirectionId", "DepartmentName", "DepartmentSupervisor", "DepartmentTelephone", "DepartmentEmail")
VALUES (89, 26, 'Δια Βίου Μάθησης', 'Σοφία Μαράγκη', '213 2082924 ,213 2082923', 't.dia.viou.mathisis@athens.gr');

INSERT INTO "Department" ("DepartmentId", "DirectionId", "DepartmentName", "DepartmentSupervisor", "DepartmentTelephone", "DepartmentEmail")
VALUES (90, 26, 'Αδειοδοτήσεων - Ελέγχων', 'Φράγκος Κωνσταντίνος', '210 8224947, 210 8210647', 't.adeiodotiseon.elegon@athens.gr');

INSERT INTO "Department" ("DepartmentId", "DirectionId", "DepartmentName", "DepartmentSupervisor", "DepartmentTelephone", "DepartmentEmail")
VALUES (91, 26, 'Παιδικών Εξοχών', 'Νόνικας Δημήτριος', '210 8250611', 't.paidikon.exoxon@athens.gr');

INSERT INTO "Department" ("DepartmentId", "DirectionId", "DepartmentName", "DepartmentSupervisor", "DepartmentTelephone", "DepartmentEmail")
VALUES (92, 27, 'Υποστήριξης Δημοτικών Παρατάξεων και Αιρετών και Ηλεκτρονικής Διακυβέρνησης', 'Καλλίας Παύλος', '210 5277118', 't.d.parat@athens.gr');

INSERT INTO "Department" ("DepartmentId", "DirectionId", "DepartmentName", "DepartmentSupervisor", "DepartmentTelephone", "DepartmentEmail")
VALUES (93, 27, 'Υποστήριξης Δημοτικού Συμβουλίου, Εκτελεστικής Επιτροπής και Δημοτικής Επιτροπής Διαβούλευσης
Τμηματάρχης', 'Ζιούβα Ελπίδα', ' 210 5277624 (ΤΜΗΜΑΤΑΡΧΗΣ), 210 5277621-3, 210 5277646 (Δημοτικό Συμβούλιο)', 'dimotikosymvoulio@athens.gr');

INSERT INTO "Department" ("DepartmentId", "DirectionId", "DepartmentName", "DepartmentSupervisor", "DepartmentTelephone", "DepartmentEmail")
VALUES (94, 27, 'Υποστήριξης Οικονομικής Επιτροπής και Επιτροπής Ποιότητας Ζωής', 'Καρανικόλας Νικόλαος', '210 5277432 (ΤΜΗΜΑΤΑΡΧΗΣ), 210 5277431, 210 5277456-7, 210 5277467', 't.oikonomiki.poiotita@athens.gr, oikonomiki@athens.gr, poiotita@athens.gr');

INSERT INTO "Department" ("DepartmentId", "DirectionId", "DepartmentName", "DepartmentSupervisor", "DepartmentTelephone", "DepartmentEmail")
VALUES (95, 28, 'Διοικητικής Υποστήριξης και Ηλεκτρονικής Διακυβέρνησης', 'Περρή Αγγελική', '213 2082932 (Τμηματάρχης), 210 5210660 (Γραμματεία)', 't.da.ypostirixi@athens.gr');

INSERT INTO "Department" ("DepartmentId", "DirectionId", "DepartmentName", "DepartmentSupervisor", "DepartmentTelephone", "DepartmentEmail")
VALUES (96, 28, 'Επιχειρησιακού Σχεδιασμού', 'Δικαιάκος Πουλίκος', '210 5210655 (Τμηματάρχης), 213 2082926 (Γραμματεία)', 't.da.epixeirisiako@athens.gr');

INSERT INTO "Department" ("DepartmentId", "DirectionId", "DepartmentName", "DepartmentSupervisor", "DepartmentTelephone", "DepartmentEmail")
VALUES (97, 28, 'Ελέγχου Στάθμευσης', 'Λεβεντάκης - Γιαννικάκης Ιωάννης', '210 5210654 (Τμηματάρχης), 210 5210625, 210 5210630 (Γραμματεία)', 't.da.elegx.stath@athens.gr');

INSERT INTO "Department" ("DepartmentId", "DirectionId", "DepartmentName", "DepartmentSupervisor", "DepartmentTelephone", "DepartmentEmail")
VALUES (98, 28, 'Δημοτικό Αστυνομικό Τμήμα 1ης Δημοτικής Κοινότητας', 'Τσιρογιάννης Σαράντης', '210 5210604(Τμηματάρχης), 210 5210605 (Γραμματεία)', 't.dat1@athens.gr');

INSERT INTO "Department" ("DepartmentId", "DirectionId", "DepartmentName", "DepartmentSupervisor", "DepartmentTelephone", "DepartmentEmail")
VALUES (99, 28, 'Δημοτικό Αστυνομικό Τμήμα 2ης και 7ης Δημοτικής Κοινότητας', 'Ροδόπουλος Σάββας', '210 7481521', 't.dat2.7@athens.gr');

INSERT INTO "Department" ("DepartmentId", "DirectionId", "DepartmentName", "DepartmentSupervisor", "DepartmentTelephone", "DepartmentEmail")
VALUES (100, 28, 'Δημοτικό Αστυνομικό Τμήμα 3ης και 4ης Δημοτικής Κοινότητας', 'Σπανός Χρήστος', '210 5210606,  210 5210704', 't.dat3.4@athens.gr');

INSERT INTO "Department" ("DepartmentId", "DirectionId", "DepartmentName", "DepartmentSupervisor", "DepartmentTelephone", "DepartmentEmail")
VALUES (101, 28, 'Δημοτικό Αστυνομικό Τμήμα 5ης και 6ης Δημοτικής Κοινότητας', 'Χάζλαρης Δημήτριος', '210 8673844', 't.dat5.6@athens.gr');

INSERT INTO "Department" ("DepartmentId", "DirectionId", "DepartmentName", "DepartmentSupervisor", "DepartmentTelephone", "DepartmentEmail")
VALUES (102, 28, 'Επιβολής Διοικητικών Κυρώσεων σε Καταστήματα Υγειονομικού Ενδιαφέροντος και Επιχειρήσεις', 'Κανάλης Κωνσταντίνος', '210 5210638 (Τμηματάρχης), 210 5210679(Γραμματεία)', 't.da.kyrwsis@athens.gr');

INSERT INTO "Department" ("DepartmentId", "DirectionId", "DepartmentName", "DepartmentSupervisor", "DepartmentTelephone", "DepartmentEmail")
VALUES (103, 29, 'Σχεδιασμού, Οργάνωσης και Ηλεκτρονικής Διακυβέρνησης', 'Ιωαννίδου Ευδοξία', '210 5210635', 't.sxd.organosis.koin.allil@athens.gr');

INSERT INTO "Department" ("DepartmentId", "DirectionId", "DepartmentName", "DepartmentSupervisor", "DepartmentTelephone", "DepartmentEmail")
VALUES (104, 29, 'Κοινωνικής Ένταξης', 'Κυπραίος Παντελής', '210 5210706', 't.koin.entaxis@athens.gr');

INSERT INTO "Department" ("DepartmentId", "DirectionId", "DepartmentName", "DepartmentSupervisor", "DepartmentTelephone", "DepartmentEmail")
VALUES (105, 29, 'Πολιτικών Ισότητας και Αντιμετώπισης Διακρίσεων', 'Μπούρη Γεωργία', '210 5210634', 't.pol.is.ant.diakriseon@athens.gr');

INSERT INTO "Department" ("DepartmentId", "DirectionId", "DepartmentName", "DepartmentSupervisor", "DepartmentTelephone", "DepartmentEmail")
VALUES (106, 29, 'Κοινωνικής Εργασίας', 'Πατέλκου Αντωνία', '210 5210637', 't.koinonikis.ergasias@athens.gr');

INSERT INTO "Department" ("DepartmentId", "DirectionId", "DepartmentName", "DepartmentSupervisor", "DepartmentTelephone", "DepartmentEmail")
VALUES (107, 29, 'Επιδοματικής Πολιτικής και Κοινωνικής Ασφάλισης', 'Αλεξόπουλος Παναγιώτης', '213 20 82 997', 't.epid.pol.koin.asfalisis@athens.gr');

INSERT INTO "Department" ("DepartmentId", "DirectionId", "DepartmentName", "DepartmentSupervisor", "DepartmentTelephone", "DepartmentEmail")
VALUES (108, 29, 'Υποστήριξης και Κοινωνικής ένταξης Μεταναστών και Προσφύγων', 'Ψαθάς Παναγιώτης', '210 5246225, 210 5246722', 't.yp.koin.entaxis.me.pr@athens.gr');

INSERT INTO "Department" ("DepartmentId", "DirectionId", "DepartmentName", "DepartmentSupervisor", "DepartmentTelephone", "DepartmentEmail")
VALUES (109, 29, 'Υποδοχής και Υποστήριξης Αστέγων', 'Θεοφυλάκτου Θεολογία', '210 5246516', 't.ypod.ypos.astegon@athens.gr');

INSERT INTO "Department" ("DepartmentId", "DirectionId", "DepartmentName", "DepartmentSupervisor", "DepartmentTelephone", "DepartmentEmail")
VALUES (110, 29, 'Τρίτης Ηλικίας', 'Κωστοπούλου Άννα', '210 5210640', 't.tritis.ilikias@athens.gr    ');

INSERT INTO "Department" ("DepartmentId", "DirectionId", "DepartmentName", "DepartmentSupervisor", "DepartmentTelephone", "DepartmentEmail")
VALUES (111, 30, 'Προϋπολογισμού', 'Πολυμέρου Αλεξάνδρα', '210 5277381', 't.proipologismou@athens.gr');

INSERT INTO "Department" ("DepartmentId", "DirectionId", "DepartmentName", "DepartmentSupervisor", "DepartmentTelephone", "DepartmentEmail")
VALUES (112, 30, 'Λογιστηρίου', 'Σκλαβενίτης Περικλής', '210 5277325', 't.logistiriou@athens.gr');

INSERT INTO "Department" ("DepartmentId", "DirectionId", "DepartmentName", "DepartmentSupervisor", "DepartmentTelephone", "DepartmentEmail")
VALUES (113, 30, 'Ταμειακής Διαχείρισης και Εξόδων', 'Φανακίδης Δημήτριος', '210 5277309', 't.tamiaki.exoda@athens.gr');

INSERT INTO "Department" ("DepartmentId", "DirectionId", "DepartmentName", "DepartmentSupervisor", "DepartmentTelephone", "DepartmentEmail")
VALUES (114, 30, 'Εκκαθάρισης και Εντολής Δαπανών', 'Καλαμπόκη Ισμήνη', '210 5277385', 't.ek.ent.dapanon@athens.gr');

INSERT INTO "Department" ("DepartmentId", "DirectionId", "DepartmentName", "DepartmentSupervisor", "DepartmentTelephone", "DepartmentEmail")
VALUES (115, 30, 'Εσόδων', 'Παφίτου Χριστίνα', '210 5277316', 't.esodon@athens.gr');

INSERT INTO "Department" ("DepartmentId", "DirectionId", "DepartmentName", "DepartmentSupervisor", "DepartmentTelephone", "DepartmentEmail")
VALUES (116, 30, 'Μισθοδοσίας', 'Στρατογιάννη Ευαγγελία', '210 5277434', 't.misthodosias@athens.gr');

INSERT INTO "Department" ("DepartmentId", "DirectionId", "DepartmentName", "DepartmentSupervisor", "DepartmentTelephone", "DepartmentEmail")
VALUES (117, 30, 'Οικονομικής Παρακολούθησης Συμβάσεων', 'Σαϊνίδου Σοφία', '210 5277352', 't.oik.par.simvaseon@athens.gr');

INSERT INTO "Department" ("DepartmentId", "DirectionId", "DepartmentName", "DepartmentSupervisor", "DepartmentTelephone", "DepartmentEmail")
VALUES (118, 31, 'Διοικητικής Υποστήριξης, Τεκμηρίωσης και Ηλεκτρονικής Διακυβέρνησης', 'Τζάννε Αναστασία', '210 5277272', 't.dioikitikis.ypostirixis.dp@athens.gr');

INSERT INTO "Department" ("DepartmentId", "DirectionId", "DepartmentName", "DepartmentSupervisor", "DepartmentTelephone", "DepartmentEmail")
VALUES (119, 31, 'Α΄ Κοιμητηρίου', 'Βαλλιάνος Δημήτριος', '210 9221173', 't.a.koimitiriou@athens.gr');

INSERT INTO "Department" ("DepartmentId", "DirectionId", "DepartmentName", "DepartmentSupervisor", "DepartmentTelephone", "DepartmentEmail")
VALUES (120, 31, 'Β΄ Κοιμητηρίου', 'Λώλη Ελένη', '210 2920531', 't.b.koimitiriou@athens.gr');

INSERT INTO "Department" ("DepartmentId", "DirectionId", "DepartmentName", "DepartmentSupervisor", "DepartmentTelephone", "DepartmentEmail")
VALUES (121, 31, 'Γ΄ Κοιμητηρίου', 'Μπαούρδας Δήμος', '210 5612357', 't.c.koimitiriou@athens.gr');

INSERT INTO "Department" ("DepartmentId", "DirectionId", "DepartmentName", "DepartmentSupervisor", "DepartmentTelephone", "DepartmentEmail")
VALUES (122, 31, 'Αξιοποίησης και Εκμετάλλευσης Δημοτικής Περιουσίας', 'Θράππα-Μάρκου Ευσταθία', '210 5277290', 't.ax.ek.dim.periousias@athens.gr');

INSERT INTO "Department" ("DepartmentId", "DirectionId", "DepartmentName", "DepartmentSupervisor", "DepartmentTelephone", "DepartmentEmail")
VALUES (123, 31, 'Αγορών, Απαλλοτριώσεων και Μισθώσεων', 'Ρηγόπουλος Γεώργιος', '210 5277233', 't.ag.ap.misthoseon@athens.gr');

INSERT INTO "Department" ("DepartmentId", "DirectionId", "DepartmentName", "DepartmentSupervisor", "DepartmentTelephone", "DepartmentEmail")
VALUES (124, 31, 'Περιουσιακών Στοιχείων, Κοινοχρήστων Χώρων, Κτηματολογίου και Κληροδοτημάτων', 'Μαρούλη Ρεγγίνα', '210 5277203', 't.ktimatologiou@athens.gr');

INSERT INTO "Department" ("DepartmentId", "DirectionId", "DepartmentName", "DepartmentSupervisor", "DepartmentTelephone", "DepartmentEmail")
VALUES (125, 32, 'Σχεδιασμού, Τεκμηρίωσης και Ηλεκτρονικής Διακυβερνήσεως', 'Πολυμερόπουλος Βασίλειος', '210 5277353', 't.sxed.tek.prosodon@athens.gr');

INSERT INTO "Department" ("DepartmentId", "DirectionId", "DepartmentName", "DepartmentSupervisor", "DepartmentTelephone", "DepartmentEmail")
VALUES (126, 32, 'Αδειοδότησης Εμπορικών Δράσεων', 'Κουρμπάνη Ζωή', '210 5277259, 210 5277261, 210 5277263, 210 5277268', 't.adiodotisis.emporikon.draseon@athens.gr');

INSERT INTO "Department" ("DepartmentId", "DirectionId", "DepartmentName", "DepartmentSupervisor", "DepartmentTelephone", "DepartmentEmail")
VALUES (127, 32, 'Αδειοδότησης Χρήσης Κοινοχρήστου Χώρου', 'χχχ', '210 5277201', 't.adiodotisis.xrisis.koin.xorou@athens.gr');

INSERT INTO "Department" ("DepartmentId", "DirectionId", "DepartmentName", "DepartmentSupervisor", "DepartmentTelephone", "DepartmentEmail")
VALUES (128, 32, 'Αδειοδότησης Υπαίθριων Αγορών και Συναφών Δράσεων', 'Συριανού Άννα', '210 5277209, 210 5277249', 't.adiodotisis.ypaith.agoron@athens.gr');

INSERT INTO "Department" ("DepartmentId", "DirectionId", "DepartmentName", "DepartmentSupervisor", "DepartmentTelephone", "DepartmentEmail")
VALUES (129, 32, 'Αδειοδότησης Υπαίθριων Αγορών και Συναφών Δράσεων', 'Συριανού Άννα', '210 5277209, 210 5277249', 't.adiodotisis.ypaith.agoron@athens.gr');

INSERT INTO "Department" ("DepartmentId", "DirectionId", "DepartmentName", "DepartmentSupervisor", "DepartmentTelephone", "DepartmentEmail")
VALUES (130, 32, 'Βεβαίωσης Γενικών Εσόδων', 'Γραβιάς Γεώργιος', '210 5277375', 't.bebaiosis.genikon.esodon@athens.gr');

INSERT INTO "Department" ("DepartmentId", "DirectionId", "DepartmentName", "DepartmentSupervisor", "DepartmentTelephone", "DepartmentEmail")
VALUES (131, 32, 'Βεβαίωσης Εσόδων από Παραβάσεις Κώδικα Οδικής Κυκλοφορίας (Κ.Ο.Κ)', 'Σούμπαση Αναστασία', '210 5277273', 't.bebaiosis.esodon.kok@athens.gr');

INSERT INTO "Department" ("DepartmentId", "DirectionId", "DepartmentName", "DepartmentSupervisor", "DepartmentTelephone", "DepartmentEmail")
VALUES (132, 32, 'Ανταποδοτικών Τελών και Τ.Α.Π.', 'Μπαρλαούρας Δημήτριος', '210 5277280-286 (ΑΝΤΑΠΟΔΟΤΙΚΑ ΤΕΛΗ), 210 5277234-35, 210 5277214-15 (Τ.Α.Π.)', 't.telon.tap@athens.gr');

--
-- Data for table "Ordering"."Direction" (OID = 24993) (LIMIT 0,17)
--
INSERT INTO "Direction" ("DirectionId", "DirectionName", "DirectionSupervisor", "DirectionTelephone", "DirectionEmail", "DirectionAddress", "DirectionPostCode", "DirectionCity")
VALUES (3, 'Προμηθειών και Αποθηκών', 'Βακουντούζης Ιωάννης', '210.5225446', 'd.prom.apothikon@athens.gr', 'Κων/νου Παλαιολόγου 9', '104 38', 'Αθήνα');

INSERT INTO "Direction" ("DirectionId", "DirectionName", "DirectionSupervisor", "DirectionTelephone", "DirectionEmail", "DirectionAddress", "DirectionPostCode", "DirectionCity")
VALUES (2, 'Στρατηγικού Σχεδιασμού, Ανθεκτικότητας, Καινοτομίας και Τεκμηρίωσης', 'Δρ. Κακριδά Ουρανία', '210.5277110', 'd.stratigikou.sxediasmou@athens.gr', 'Λιοσίων 22', '104 38', 'Αθήνα');

INSERT INTO "Direction" ("DirectionId", "DirectionName", "DirectionSupervisor", "DirectionTelephone", "DirectionEmail", "DirectionAddress", "DirectionPostCode", "DirectionCity")
VALUES (20, 'Κέντρων Εξυπηρέτησης Πολιτών (Κ.Ε.Π)', 'Αυγερινός Δημήτριος', '210 3836522', 'd.kep@athens.gr', 'Ακαδημίας 88', '106 78', 'Αθήνα');

INSERT INTO "Direction" ("DirectionId", "DirectionName", "DirectionSupervisor", "DirectionTelephone", "DirectionEmail", "DirectionAddress", "DirectionPostCode", "DirectionCity")
VALUES (21, 'Αστικής Κατάστασης', 'Μπούρη Βασιλική', '210 3722173', 'd.ast.katastasis@athens.gr', 'Αθηνάς 63', '10552', 'Αθήνα');

INSERT INTO "Direction" ("DirectionId", "DirectionName", "DirectionSupervisor", "DirectionTelephone", "DirectionEmail", "DirectionAddress", "DirectionPostCode", "DirectionCity")
VALUES (15, 'Αποκέντρωσης και Διοίκησης', 'Νεμπεγλεριώτης Ευάγγελος', '210 5277541', 'd.apokentrosi.dioikisi@athens.gr', 'Λιοσίων 22', '104 38', 'Αθήνα');

INSERT INTO "Direction" ("DirectionId", "DirectionName", "DirectionSupervisor", "DirectionTelephone", "DirectionEmail", "DirectionAddress", "DirectionPostCode", "DirectionCity")
VALUES (22, 'Νομική', 'Γεωργακαράκος Γεώργιος', ' 210 5277420-23', 'd.nomiki@athens.gr', 'Λιοσίων 22', '104 38', 'Αθήνα');

INSERT INTO "Direction" ("DirectionId", "DirectionName", "DirectionSupervisor", "DirectionTelephone", "DirectionEmail", "DirectionAddress", "DirectionPostCode", "DirectionCity")
VALUES (23, 'Εσωτερικού Ελέγχου', ' Γλένη Όλγα', '210 5277575', 'd.es.elegxou@athens.gr', 'Λιοσίων 22', '104 38', 'Αθήνα');

INSERT INTO "Direction" ("DirectionId", "DirectionName", "DirectionSupervisor", "DirectionTelephone", "DirectionEmail", "DirectionAddress", "DirectionPostCode", "DirectionCity")
VALUES (24, 'Δημοτικών Ιατρείων και Δημόσιας Υγείας', 'Θεοφανόπουλος Αλέξανδρος', '210 3626396', 'd.dim.iatrion@athens.gr', ' ', ' ', ' ');

INSERT INTO "Direction" ("DirectionId", "DirectionName", "DirectionSupervisor", "DirectionTelephone", "DirectionEmail", "DirectionAddress", "DirectionPostCode", "DirectionCity")
VALUES (25, 'Διαχείρισης και Ανάπτυξης Ανθρωπίνου Δυναμικού', 'Χαλβατζά Ελένη', '210 5277559, 210 5277508', 'd.anth.dyn@athens.gr', 'Λιοσίων 22', '104 38', 'Αθήνα');

INSERT INTO "Direction" ("DirectionId", "DirectionName", "DirectionSupervisor", "DirectionTelephone", "DirectionEmail", "DirectionAddress", "DirectionPostCode", "DirectionCity")
VALUES (26, 'Παιδικής Ηλικίας, Παιδείας και Δια Βίου Μάθησης', 'Γαλούνης Σταμούλης', '210 8217430', 'd.paideias@athens.gr', 'Ηπείρου 70 και Λιοσίων', ' 104 38', 'Αθήνα');

INSERT INTO "Direction" ("DirectionId", "DirectionName", "DirectionSupervisor", "DirectionTelephone", "DirectionEmail", "DirectionAddress", "DirectionPostCode", "DirectionCity")
VALUES (27, 'Υποστήριξης Συλλογικών Οργάνων, Δημοτικών Παρατάξεων και Αιρετών', 'Ξύστρας Χρήστος', '210 5277640,210 5277625', 'd.syllorg.dimpar@athens.gr', 'Λιοσίων 22', '104 38', 'Αθήνα');

INSERT INTO "Direction" ("DirectionId", "DirectionName", "DirectionSupervisor", "DirectionTelephone", "DirectionEmail", "DirectionAddress", "DirectionPostCode", "DirectionCity")
VALUES (28, 'Δημοτικής Αστυνομίας', 'Τάτσης Θάνος', '210 5210656 - 651', 'd.dim.astynomias@athens.gr', 'Αγίου Κωνσταντίνου 14', '104 31', 'Αθήνα');

INSERT INTO "Direction" ("DirectionId", "DirectionName", "DirectionSupervisor", "DirectionTelephone", "DirectionEmail", "DirectionAddress", "DirectionPostCode", "DirectionCity")
VALUES (29, 'Κοινωνικής Αλληλεγγύης', '(Αναμένεται Τοποθέτηση)', '210 5210701', 'd.koin.allil@athens.gr', 'Αγίου Κωνσταντίνου 14', '104 31', 'Αθήνα');

INSERT INTO "Direction" ("DirectionId", "DirectionName", "DirectionSupervisor", "DirectionTelephone", "DirectionEmail", "DirectionAddress", "DirectionPostCode", "DirectionCity")
VALUES (30, 'Οικονομικών', 'Βλασερού Μαρία', '210 5277386, 210 5277344', 'd.oikonomikon@athens.gr', 'Λιοσίων 22', '104 38', 'Αθήνα');

INSERT INTO "Direction" ("DirectionId", "DirectionName", "DirectionSupervisor", "DirectionTelephone", "DirectionEmail", "DirectionAddress", "DirectionPostCode", "DirectionCity")
VALUES (31, 'Δημοτικής Περιουσίας', 'Νούση Δήμητρα', '210 5277526', 'd.dim.periousias@athens.gr', 'Λιοσίων 22', '104 38', 'Αθήνα');

INSERT INTO "Direction" ("DirectionId", "DirectionName", "DirectionSupervisor", "DirectionTelephone", "DirectionEmail", "DirectionAddress", "DirectionPostCode", "DirectionCity")
VALUES (32, 'Δημοτικών Προσόδων', 'Συριανός Γρηγόριος', '210 5277306, 210 5277329', 'd.dim.prosodon@athens.gr', 'Λιοσίων 22', '104 38', '
Αθήνα');

INSERT INTO "Direction" ("DirectionId", "DirectionName", "DirectionSupervisor", "DirectionTelephone", "DirectionEmail", "DirectionAddress", "DirectionPostCode", "DirectionCity")
VALUES (33, 'Κτιριακής Υποδομής', 'Δανιήλ Μαρία', '210 3721539, 210 3721508', 'd.ktiriakis.ypodomis@athens.gr', 'Αθηνάς & Βύσσης', '105 51', 'Αθήνα');

--
-- Data for table "Ordering"."DocumentSignatory" (OID = 25001) (LIMIT 0,72)
--
INSERT INTO "DocumentSignatory" ("Id", "AccountId", "SignatoryTypeId", "SignatoryId", "DocumentType", "Absense")
VALUES (306, 121, 2, 2, 1, false);

INSERT INTO "DocumentSignatory" ("Id", "AccountId", "SignatoryTypeId", "SignatoryId", "DocumentType", "Absense")
VALUES (307, 121, 5, 2, 1, false);

INSERT INTO "DocumentSignatory" ("Id", "AccountId", "SignatoryTypeId", "SignatoryId", "DocumentType", "Absense")
VALUES (308, 121, 3, 2, 1, false);

INSERT INTO "DocumentSignatory" ("Id", "AccountId", "SignatoryTypeId", "SignatoryId", "DocumentType", "Absense")
VALUES (309, 121, 3, 2, 2, false);

INSERT INTO "DocumentSignatory" ("Id", "AccountId", "SignatoryTypeId", "SignatoryId", "DocumentType", "Absense")
VALUES (94, 52, 2, 1, 1, false);

INSERT INTO "DocumentSignatory" ("Id", "AccountId", "SignatoryTypeId", "SignatoryId", "DocumentType", "Absense")
VALUES (95, 52, 5, 1, 1, false);

INSERT INTO "DocumentSignatory" ("Id", "AccountId", "SignatoryTypeId", "SignatoryId", "DocumentType", "Absense")
VALUES (96, 52, 3, 1, 1, false);

INSERT INTO "DocumentSignatory" ("Id", "AccountId", "SignatoryTypeId", "SignatoryId", "DocumentType", "Absense")
VALUES (97, 52, 3, 1, 2, false);

INSERT INTO "DocumentSignatory" ("Id", "AccountId", "SignatoryTypeId", "SignatoryId", "DocumentType", "Absense")
VALUES (98, 53, 2, 1, 1, false);

INSERT INTO "DocumentSignatory" ("Id", "AccountId", "SignatoryTypeId", "SignatoryId", "DocumentType", "Absense")
VALUES (99, 53, 5, 1, 1, false);

INSERT INTO "DocumentSignatory" ("Id", "AccountId", "SignatoryTypeId", "SignatoryId", "DocumentType", "Absense")
VALUES (100, 53, 3, 2, 1, true);

INSERT INTO "DocumentSignatory" ("Id", "AccountId", "SignatoryTypeId", "SignatoryId", "DocumentType", "Absense")
VALUES (101, 53, 3, 3, 2, true);

INSERT INTO "DocumentSignatory" ("Id", "AccountId", "SignatoryTypeId", "SignatoryId", "DocumentType", "Absense")
VALUES (86, 50, 1, 1, 1, false);

INSERT INTO "DocumentSignatory" ("Id", "AccountId", "SignatoryTypeId", "SignatoryId", "DocumentType", "Absense")
VALUES (87, 50, 5, 2, 1, false);

INSERT INTO "DocumentSignatory" ("Id", "AccountId", "SignatoryTypeId", "SignatoryId", "DocumentType", "Absense")
VALUES (88, 50, 4, 4, 1, false);

INSERT INTO "DocumentSignatory" ("Id", "AccountId", "SignatoryTypeId", "SignatoryId", "DocumentType", "Absense")
VALUES (89, 50, 4, 3, 2, true);

INSERT INTO "DocumentSignatory" ("Id", "AccountId", "SignatoryTypeId", "SignatoryId", "DocumentType", "Absense")
VALUES (286, 109, 2, 2, 1, false);

INSERT INTO "DocumentSignatory" ("Id", "AccountId", "SignatoryTypeId", "SignatoryId", "DocumentType", "Absense")
VALUES (287, 109, 5, 2, 1, false);

INSERT INTO "DocumentSignatory" ("Id", "AccountId", "SignatoryTypeId", "SignatoryId", "DocumentType", "Absense")
VALUES (288, 109, 3, 2, 1, false);

INSERT INTO "DocumentSignatory" ("Id", "AccountId", "SignatoryTypeId", "SignatoryId", "DocumentType", "Absense")
VALUES (289, 109, 3, 2, 2, false);

INSERT INTO "DocumentSignatory" ("Id", "AccountId", "SignatoryTypeId", "SignatoryId", "DocumentType", "Absense")
VALUES (90, 51, 1, 1, 1, false);

INSERT INTO "DocumentSignatory" ("Id", "AccountId", "SignatoryTypeId", "SignatoryId", "DocumentType", "Absense")
VALUES (91, 51, 5, 2, 1, false);

INSERT INTO "DocumentSignatory" ("Id", "AccountId", "SignatoryTypeId", "SignatoryId", "DocumentType", "Absense")
VALUES (92, 51, 4, 4, 1, false);

INSERT INTO "DocumentSignatory" ("Id", "AccountId", "SignatoryTypeId", "SignatoryId", "DocumentType", "Absense")
VALUES (93, 51, 4, 4, 2, false);

INSERT INTO "DocumentSignatory" ("Id", "AccountId", "SignatoryTypeId", "SignatoryId", "DocumentType", "Absense")
VALUES (310, 122, 2, 2, 1, false);

INSERT INTO "DocumentSignatory" ("Id", "AccountId", "SignatoryTypeId", "SignatoryId", "DocumentType", "Absense")
VALUES (311, 122, 5, 2, 1, false);

INSERT INTO "DocumentSignatory" ("Id", "AccountId", "SignatoryTypeId", "SignatoryId", "DocumentType", "Absense")
VALUES (312, 122, 3, 2, 1, false);

INSERT INTO "DocumentSignatory" ("Id", "AccountId", "SignatoryTypeId", "SignatoryId", "DocumentType", "Absense")
VALUES (313, 122, 3, 2, 2, false);

INSERT INTO "DocumentSignatory" ("Id", "AccountId", "SignatoryTypeId", "SignatoryId", "DocumentType", "Absense")
VALUES (322, 125, 2, 1, 1, false);

INSERT INTO "DocumentSignatory" ("Id", "AccountId", "SignatoryTypeId", "SignatoryId", "DocumentType", "Absense")
VALUES (323, 125, 5, 2, 1, false);

INSERT INTO "DocumentSignatory" ("Id", "AccountId", "SignatoryTypeId", "SignatoryId", "DocumentType", "Absense")
VALUES (324, 125, 4, 4, 1, false);

INSERT INTO "DocumentSignatory" ("Id", "AccountId", "SignatoryTypeId", "SignatoryId", "DocumentType", "Absense")
VALUES (325, 125, 4, 4, 2, false);

INSERT INTO "DocumentSignatory" ("Id", "AccountId", "SignatoryTypeId", "SignatoryId", "DocumentType", "Absense")
VALUES (314, 123, 2, 2, 1, false);

INSERT INTO "DocumentSignatory" ("Id", "AccountId", "SignatoryTypeId", "SignatoryId", "DocumentType", "Absense")
VALUES (315, 123, 5, 2, 1, false);

INSERT INTO "DocumentSignatory" ("Id", "AccountId", "SignatoryTypeId", "SignatoryId", "DocumentType", "Absense")
VALUES (316, 123, 3, 2, 1, false);

INSERT INTO "DocumentSignatory" ("Id", "AccountId", "SignatoryTypeId", "SignatoryId", "DocumentType", "Absense")
VALUES (317, 123, 3, 2, 2, false);

INSERT INTO "DocumentSignatory" ("Id", "AccountId", "SignatoryTypeId", "SignatoryId", "DocumentType", "Absense")
VALUES (282, 108, 2, 2, 1, false);

INSERT INTO "DocumentSignatory" ("Id", "AccountId", "SignatoryTypeId", "SignatoryId", "DocumentType", "Absense")
VALUES (283, 108, 5, 2, 1, false);

INSERT INTO "DocumentSignatory" ("Id", "AccountId", "SignatoryTypeId", "SignatoryId", "DocumentType", "Absense")
VALUES (284, 108, 3, 2, 1, false);

INSERT INTO "DocumentSignatory" ("Id", "AccountId", "SignatoryTypeId", "SignatoryId", "DocumentType", "Absense")
VALUES (285, 108, 3, 2, 2, false);

INSERT INTO "DocumentSignatory" ("Id", "AccountId", "SignatoryTypeId", "SignatoryId", "DocumentType", "Absense")
VALUES (326, 126, 2, 2, 1, false);

INSERT INTO "DocumentSignatory" ("Id", "AccountId", "SignatoryTypeId", "SignatoryId", "DocumentType", "Absense")
VALUES (327, 126, 5, 2, 1, false);

INSERT INTO "DocumentSignatory" ("Id", "AccountId", "SignatoryTypeId", "SignatoryId", "DocumentType", "Absense")
VALUES (328, 126, 3, 2, 1, false);

INSERT INTO "DocumentSignatory" ("Id", "AccountId", "SignatoryTypeId", "SignatoryId", "DocumentType", "Absense")
VALUES (329, 126, 3, 2, 2, false);

INSERT INTO "DocumentSignatory" ("Id", "AccountId", "SignatoryTypeId", "SignatoryId", "DocumentType", "Absense")
VALUES (302, 120, 2, 2, 1, false);

INSERT INTO "DocumentSignatory" ("Id", "AccountId", "SignatoryTypeId", "SignatoryId", "DocumentType", "Absense")
VALUES (303, 120, 5, 2, 1, false);

INSERT INTO "DocumentSignatory" ("Id", "AccountId", "SignatoryTypeId", "SignatoryId", "DocumentType", "Absense")
VALUES (304, 120, 3, 2, 1, false);

INSERT INTO "DocumentSignatory" ("Id", "AccountId", "SignatoryTypeId", "SignatoryId", "DocumentType", "Absense")
VALUES (305, 120, 3, 2, 2, false);

INSERT INTO "DocumentSignatory" ("Id", "AccountId", "SignatoryTypeId", "SignatoryId", "DocumentType", "Absense")
VALUES (346, 131, 1, 1, 1, false);

INSERT INTO "DocumentSignatory" ("Id", "AccountId", "SignatoryTypeId", "SignatoryId", "DocumentType", "Absense")
VALUES (347, 131, 5, 2, 1, false);

INSERT INTO "DocumentSignatory" ("Id", "AccountId", "SignatoryTypeId", "SignatoryId", "DocumentType", "Absense")
VALUES (348, 131, 4, 3, 1, true);

INSERT INTO "DocumentSignatory" ("Id", "AccountId", "SignatoryTypeId", "SignatoryId", "DocumentType", "Absense")
VALUES (349, 131, 3, 4, 2, false);

INSERT INTO "DocumentSignatory" ("Id", "AccountId", "SignatoryTypeId", "SignatoryId", "DocumentType", "Absense")
VALUES (350, 132, 1, 2, 1, false);

INSERT INTO "DocumentSignatory" ("Id", "AccountId", "SignatoryTypeId", "SignatoryId", "DocumentType", "Absense")
VALUES (351, 132, 5, 1, 1, false);

INSERT INTO "DocumentSignatory" ("Id", "AccountId", "SignatoryTypeId", "SignatoryId", "DocumentType", "Absense")
VALUES (352, 132, 4, 4, 1, false);

INSERT INTO "DocumentSignatory" ("Id", "AccountId", "SignatoryTypeId", "SignatoryId", "DocumentType", "Absense")
VALUES (353, 132, 3, 3, 2, false);

INSERT INTO "DocumentSignatory" ("Id", "AccountId", "SignatoryTypeId", "SignatoryId", "DocumentType", "Absense")
VALUES (330, 127, 2, 2, 1, false);

INSERT INTO "DocumentSignatory" ("Id", "AccountId", "SignatoryTypeId", "SignatoryId", "DocumentType", "Absense")
VALUES (331, 127, 5, 2, 1, false);

INSERT INTO "DocumentSignatory" ("Id", "AccountId", "SignatoryTypeId", "SignatoryId", "DocumentType", "Absense")
VALUES (332, 127, 3, 2, 1, false);

INSERT INTO "DocumentSignatory" ("Id", "AccountId", "SignatoryTypeId", "SignatoryId", "DocumentType", "Absense")
VALUES (333, 127, 3, 3, 2, false);

INSERT INTO "DocumentSignatory" ("Id", "AccountId", "SignatoryTypeId", "SignatoryId", "DocumentType", "Absense")
VALUES (334, 128, 2, 2, 1, false);

INSERT INTO "DocumentSignatory" ("Id", "AccountId", "SignatoryTypeId", "SignatoryId", "DocumentType", "Absense")
VALUES (335, 128, 5, 2, 1, false);

INSERT INTO "DocumentSignatory" ("Id", "AccountId", "SignatoryTypeId", "SignatoryId", "DocumentType", "Absense")
VALUES (336, 128, 3, 2, 1, false);

INSERT INTO "DocumentSignatory" ("Id", "AccountId", "SignatoryTypeId", "SignatoryId", "DocumentType", "Absense")
VALUES (337, 128, 4, 3, 2, false);

INSERT INTO "DocumentSignatory" ("Id", "AccountId", "SignatoryTypeId", "SignatoryId", "DocumentType", "Absense")
VALUES (338, 129, 2, 2, 1, false);

INSERT INTO "DocumentSignatory" ("Id", "AccountId", "SignatoryTypeId", "SignatoryId", "DocumentType", "Absense")
VALUES (339, 129, 5, 2, 1, false);

INSERT INTO "DocumentSignatory" ("Id", "AccountId", "SignatoryTypeId", "SignatoryId", "DocumentType", "Absense")
VALUES (340, 129, 4, 3, 1, false);

INSERT INTO "DocumentSignatory" ("Id", "AccountId", "SignatoryTypeId", "SignatoryId", "DocumentType", "Absense")
VALUES (341, 129, 3, 4, 2, false);

INSERT INTO "DocumentSignatory" ("Id", "AccountId", "SignatoryTypeId", "SignatoryId", "DocumentType", "Absense")
VALUES (342, 130, 2, 2, 1, false);

INSERT INTO "DocumentSignatory" ("Id", "AccountId", "SignatoryTypeId", "SignatoryId", "DocumentType", "Absense")
VALUES (343, 130, 6, 1, 1, false);

INSERT INTO "DocumentSignatory" ("Id", "AccountId", "SignatoryTypeId", "SignatoryId", "DocumentType", "Absense")
VALUES (344, 130, 3, 3, 1, false);

INSERT INTO "DocumentSignatory" ("Id", "AccountId", "SignatoryTypeId", "SignatoryId", "DocumentType", "Absense")
VALUES (345, 130, 4, 4, 2, false);

--
-- Data for table "Ordering"."Invoice" (OID = 25004) (LIMIT 0,17)
--
INSERT INTO "Invoice" ("Id", "AccountId", "Number", "Date", "DeliveredDateProtocolNumber", "DeliveredDateProtocolDate", "DeliveredDate")
VALUES (91, 108, 'sdf', '2019-01-01', 1, '2019-01-01', '2019-11-13');

INSERT INTO "Invoice" ("Id", "AccountId", "Number", "Date", "DeliveredDateProtocolNumber", "DeliveredDateProtocolDate", "DeliveredDate")
VALUES (97, 121, '23', '2019-01-01', 12, '2019-01-01', '2019-01-01');

INSERT INTO "Invoice" ("Id", "AccountId", "Number", "Date", "DeliveredDateProtocolNumber", "DeliveredDateProtocolDate", "DeliveredDate")
VALUES (98, 122, '12', '2020-01-20', 1, '2020-01-20', '2020-01-20');

INSERT INTO "Invoice" ("Id", "AccountId", "Number", "Date", "DeliveredDateProtocolNumber", "DeliveredDateProtocolDate", "DeliveredDate")
VALUES (99, 123, '123', '2019-01-01', 23, '2019-01-01', '2019-01-01');

INSERT INTO "Invoice" ("Id", "AccountId", "Number", "Date", "DeliveredDateProtocolNumber", "DeliveredDateProtocolDate", "DeliveredDate")
VALUES (36, 52, 'asd', '2019-01-01', 3, '2019-01-01', NULL);

INSERT INTO "Invoice" ("Id", "AccountId", "Number", "Date", "DeliveredDateProtocolNumber", "DeliveredDateProtocolDate", "DeliveredDate")
VALUES (37, 53, '123', '2019-01-02', 3, '2019-01-01', NULL);

INSERT INTO "Invoice" ("Id", "AccountId", "Number", "Date", "DeliveredDateProtocolNumber", "DeliveredDateProtocolDate", "DeliveredDate")
VALUES (103, 127, '456', '2020-01-01', 2314, '2020-01-01', '2020-01-01');

INSERT INTO "Invoice" ("Id", "AccountId", "Number", "Date", "DeliveredDateProtocolNumber", "DeliveredDateProtocolDate", "DeliveredDate")
VALUES (101, 125, '123', '2020-01-01', 5452, '2020-01-01', '2020-01-01');

INSERT INTO "Invoice" ("Id", "AccountId", "Number", "Date", "DeliveredDateProtocolNumber", "DeliveredDateProtocolDate", "DeliveredDate")
VALUES (102, 126, '23', '2020-01-01', 2323, '2020-01-01', '2020-01-01');

INSERT INTO "Invoice" ("Id", "AccountId", "Number", "Date", "DeliveredDateProtocolNumber", "DeliveredDateProtocolDate", "DeliveredDate")
VALUES (34, 50, '2343', '2018-12-31', 2314, '3219-12-31', NULL);

INSERT INTO "Invoice" ("Id", "AccountId", "Number", "Date", "DeliveredDateProtocolNumber", "DeliveredDateProtocolDate", "DeliveredDate")
VALUES (35, 51, '123', '2019-01-01', 1, '2019-01-01', NULL);

INSERT INTO "Invoice" ("Id", "AccountId", "Number", "Date", "DeliveredDateProtocolNumber", "DeliveredDateProtocolDate", "DeliveredDate")
VALUES (104, 128, '456', '2020-01-01', 234, '2020-01-01', '2020-01-01');

INSERT INTO "Invoice" ("Id", "AccountId", "Number", "Date", "DeliveredDateProtocolNumber", "DeliveredDateProtocolDate", "DeliveredDate")
VALUES (105, 129, '345', '2020-02-14', 123, '2020-02-19', '2020-02-19');

INSERT INTO "Invoice" ("Id", "AccountId", "Number", "Date", "DeliveredDateProtocolNumber", "DeliveredDateProtocolDate", "DeliveredDate")
VALUES (106, 130, '456', '2020-02-11', 234, '2020-02-19', '2020-02-19');

INSERT INTO "Invoice" ("Id", "AccountId", "Number", "Date", "DeliveredDateProtocolNumber", "DeliveredDateProtocolDate", "DeliveredDate")
VALUES (96, 120, '123', '2020-01-19', 12, '2020-01-19', '2020-01-19');

INSERT INTO "Invoice" ("Id", "AccountId", "Number", "Date", "DeliveredDateProtocolNumber", "DeliveredDateProtocolDate", "DeliveredDate")
VALUES (107, 131, '345', '2020-02-13', 564, '2020-02-12', '2020-02-27');

INSERT INTO "Invoice" ("Id", "AccountId", "Number", "Date", "DeliveredDateProtocolNumber", "DeliveredDateProtocolDate", "DeliveredDate")
VALUES (108, 132, '23', '2020-02-19', 1123, '2020-02-20', '2020-02-27');

--
-- Data for table "Ordering"."Signatory" (OID = 25009) (LIMIT 0,4)
--
INSERT INTO "Signatory" ("Id", "Name")
VALUES (2, 'ΙΩΑΝΝΗΣ ΧΑΤΖΗΕΥΣΤΡΑΤΙΟΥ');

INSERT INTO "Signatory" ("Id", "Name")
VALUES (3, 'ΠΑΠΑΚΩΝΣΤΑΝΤΙΝΟΥ – ΠΑΠΑΔΟΠΟΥΛΟΥ ΕΛΛΗ');

INSERT INTO "Signatory" ("Id", "Name")
VALUES (4, 'Δρ. ΟΥΡΑΝΙΑ Β. ΚΑΚΡΙΔΑ');

INSERT INTO "Signatory" ("Id", "Name")
VALUES (1, 'ΦΩΤΕΙΝΗ ΤΣΟΤΡΑ');

--
-- Data for table "Ordering"."SignatoryType" (OID = 25012) (LIMIT 0,6)
--
INSERT INTO "SignatoryType" ("Id", "Name")
VALUES (2, 'Ο ΣΥΝΤΑΚΤΗΣ');

INSERT INTO "SignatoryType" ("Id", "Name")
VALUES (1, 'Η ΣΥΝΤΑΞΑΣΑ');

INSERT INTO "SignatoryType" ("Id", "Name")
VALUES (3, 'Ο ΠΡΟΪΣΤΑΜΕΝΟΣ ΔΙΕΥΘΥΝΣΗΣ');

INSERT INTO "SignatoryType" ("Id", "Name")
VALUES (5, 'Ο  ΠΡΟΪΣΤΑΜΕΝΟΣ ΤΜΗΜΑΤΟΣ');

INSERT INTO "SignatoryType" ("Id", "Name")
VALUES (6, 'Η ΠΡΟΪΣΤΑΜΕΝΗ ΤΜΗΜΑΤΟΣ');

INSERT INTO "SignatoryType" ("Id", "Name")
VALUES (4, 'Η ΠΡΟΪΣΤΑΜΕΝΗ ΔΙΕΥΘΥΝΣΗΣ');

--
-- Data for table "Ordering"."Reservations" (OID = 25136) (LIMIT 0,4)
--
INSERT INTO "Reservations" ("Id", "Name", "Percentage", "Stamp", "StampOGA", "IsReservation", "Order")
VALUES (5, 'Α.Ε.Π.Π', 0.060, 3.000, 20.000, true, 2);

INSERT INTO "Reservations" ("Id", "Name", "Percentage", "Stamp", "StampOGA", "IsReservation", "Order")
VALUES (8, 'Φ.Ε.', 8.000, NULL, NULL, true, 3);

INSERT INTO "Reservations" ("Id", "Name", "Percentage", "Stamp", "StampOGA", "IsReservation", "Order")
VALUES (23, 'Φ.Π.Α.', 24.000, NULL, NULL, false, NULL);

INSERT INTO "Reservations" ("Id", "Name", "Percentage", "Stamp", "StampOGA", "IsReservation", "Order")
VALUES (2, 'Ε.Α.Α.ΔΗ.ΣΥ.', 0.070, 3.000, 20.000, true, 1);

--
-- Data for table "Ordering"."Agencies" (OID = 25162) (LIMIT 0,3)
--
INSERT INTO "Agencies" ("Id", "Name")
VALUES (1, 'Εταιρεία Ανάπτυξης και Τουριστικής Προβολής Αθηνών (ΕΑΤΑ)');

INSERT INTO "Agencies" ("Id", "Name")
VALUES (2, 'ΔΑΕΜ Α.Ε. - Ανώνυμη Αναπτυξιακή Εταιρεία Μηχανογράφησης & Επιχειρησιακών Μονάδων ΟΤΑ του Δήμου Αθηναίων
');

INSERT INTO "Agencies" ("Id", "Name")
VALUES (11, 'Ο.Π.Α.Ν.Δ.Α');

--
-- Data for table "Ordering"."User" (OID = 25267) (LIMIT 0,10)
--
INSERT INTO "User" ("Id", "Username", "Password", "Role", "Firstname", "Lastname")
VALUES (24, 'v.priovolos', '$2a$10$P5Gxa2rsj4oipFour8kiSOivv1YBhimOhcoiMqSe8lfeM8wauzli2', 2, 'Βασίλειος', 'Πριόβολος');

INSERT INTO "User" ("Id", "Username", "Password", "Role", "Firstname", "Lastname")
VALUES (25, 'k.kodella', '$2a$10$c6XWx0oPIJJGLG7KQQSm4O00s06K9CK9IzuW75Yly1s66hJcaYOK2', 2, 'Κων/να', 'Κοδέλλα');

INSERT INTO "User" ("Id", "Username", "Password", "Role", "Firstname", "Lastname")
VALUES (26, 'i.fytros', '$2a$10$Y4LaYWQ/c.yGWo.83PprNuFy7qxbNa5CyLuP1ZIoMCRpf2P8Dl/Dm', 2, 'Ιωάννης', 'Φύτρος');

INSERT INTO "User" ("Id", "Username", "Password", "Role", "Firstname", "Lastname")
VALUES (27, 'e.fragkoylopoylos', '$2a$10$4Pn8ToetNGhUAMep70s.5OEgMMWpliW89IynRMOeO19EF.ZrZNrv6', 2, 'Εμμανουήλ', 'Φραγκουλόπουλος');

INSERT INTO "User" ("Id", "Username", "Password", "Role", "Firstname", "Lastname")
VALUES (28, 'd.morfis', '$2a$10$fGRX8c47eM0Rj3KyYUXip.WIpdnRwgCKvFXUWAKn452tu.GpU0E52', 2, 'Δημήτριος', 'Μόρφης');

INSERT INTO "User" ("Id", "Username", "Password", "Role", "Firstname", "Lastname")
VALUES (4, 'dvasilakis', '$2a$10$uZiLUhOIDVFc5C6bdu9Lq.6n9p38l90hCYy10pIrU42nLpYe5FR3K', 1, 'Δημήτριος ', 'Βασιλάκης');

INSERT INTO "User" ("Id", "Username", "Password", "Role", "Firstname", "Lastname")
VALUES (3, 'admin', '$2a$10$80mc2Ltf0DBkNvpzkQu51utFnve2iH62IVPO8vGefn2XPrQKvUtti', 1, 'Διαχειριστής', '');

INSERT INTO "User" ("Id", "Username", "Password", "Role", "Firstname", "Lastname")
VALUES (19, 'm.apostolopoulou', '$2a$10$RxnwA6b8Kqv.TYCGjqji9.z8dLcTZcnrdBMMBuhmMb2w/Zm19Xdwm', 3, 'Μαρία', 'Αποστολοπούλου');

INSERT INTO "User" ("Id", "Username", "Password", "Role", "Firstname", "Lastname")
VALUES (21, 'k.kaloutas', '$2a$10$ix4aMH88ybzSGJLVTuDHHO7Eh2jsZNUGuF1XLsfFojoeIOneibYW2', 1, 'Κων/νος', 'Καλουτάς');

INSERT INTO "User" ("Id", "Username", "Password", "Role", "Firstname", "Lastname")
VALUES (22, 'i.chatzieustratiou', '$2a$10$QOWDKVhn7I98.ARMOMEm3eoX9X0LuVE2m.4V8Kb6t5VK7MbJ.wrwC', 2, 'Ιωάννης', 'Χατζηευστρατίου');

--
-- Data for table "Ordering"."UserRoles" (OID = 25281) (LIMIT 0,6)
--
INSERT INTO "UserRoles" ("Id", "Name")
VALUES (1, 'Admin
');

INSERT INTO "UserRoles" ("Id", "Name")
VALUES (2, 'Superuser');

INSERT INTO "UserRoles" ("Id", "Name")
VALUES (3, 'Create
');

INSERT INTO "UserRoles" ("Id", "Name")
VALUES (4, 'Edit
');

INSERT INTO "UserRoles" ("Id", "Name")
VALUES (5, 'Delete
');

INSERT INTO "UserRoles" ("Id", "Name")
VALUES (6, 'View
');

--
-- Data for table "Ordering"."LogError" (OID = 25297) (LIMIT 0,6)
--
INSERT INTO "LogError" ("Id", "Username", "ErrorMessage", "DateCreated", "HttpMethod", "HttpPath")
VALUES (615, 'dvasilakis', 'Message: Cannot read property ''className'' of undefined
Stack:
    in ForwardRef(Tooltip) (created by WithStyles(ForwardRef(Tooltip)))
    in WithStyles(ForwardRef(Tooltip)) (at materialobjects.js:41)
    in div (at NewAccountForm.js:567)
    in form (at NewAccountForm.js:587)
    in div (at NewAccountForm.js:585)
    in div (at NewAccountForm.js:584)
    in div (at NewAccountForm.js:583)
    in div (at body.js:20)
    in Body (created by ConnectFunction)
    in ConnectFunction (at NewAccountForm.js:582)
    in NewAccountForm (created by WithStyles(NewAcco
', '2020-02-04 15:56:21', 'POST', '/logClientError');

INSERT INTO "LogError" ("Id", "Username", "ErrorMessage", "DateCreated", "HttpMethod", "HttpPath")
VALUES (616, 'dvasilakis', 'Message: Cannot read property ''className'' of undefined
Stack:
    in ForwardRef(Tooltip) (created by WithStyles(ForwardRef(Tooltip)))
    in WithStyles(ForwardRef(Tooltip)) (at materialobjects.js:41)
    in div (at NewAccountForm.js:567)
    in form (at NewAccountForm.js:587)
    in div (at NewAccountForm.js:585)
    in div (at NewAccountForm.js:584)
    in div (at NewAccountForm.js:583)
    in div (at body.js:20)
    in Body (created by ConnectFunction)
    in ConnectFunction (at NewAccountForm.js:582)
    in NewAccountForm (created by WithStyles(NewAccountForm))
    in WithStyles(NewAccountForm) (created by Context.Consumer)
    in withRouter(WithStyles(NewAccountForm)) (created by ConnectFunction)
    in ConnectFunction (at NewAccount.js:81)
    in div (at NewAccount.js:75)
    in NewAccount (created by ConnectFunction)
    in ConnectFunction (created by Context.Consumer)
    in Route (at routes.js:35)
    in Switch (at routes.js:34)
    in Sus
', '2020-02-04 15:57:34', 'POST', '/logClientError');

INSERT INTO "LogError" ("Id", "Username", "ErrorMessage", "DateCreated", "HttpMethod", "HttpPath")
VALUES (617, 'dvasilakis', 'Message: Cannot read property ''className'' of undefined
Stack:
    in ForwardRef(Tooltip) (created by WithStyles(ForwardRef(Tooltip)))
    in WithStyles(ForwardRef(Tooltip)) (at materialobjects.js:41)
    in div (at NewAccountForm.js:567)
    in form (at NewAccountForm.js:587)
    in div (at NewAccountForm.js:585)
    in div (at NewAccountForm.js:584)
    in div (at NewAccountForm.js:583)
    in div (at body.js:20)
    in Body (created by ConnectFunction)
    in ConnectFunction (at NewAccountForm.js:582)
    in NewAccountForm (created by WithStyles(NewAccountForm))
    in WithStyles(NewAccountForm) (created by Context.Consumer)
    in withRouter(WithStyles(NewAccountForm)) (created by ConnectFunction)
    in ConnectFunction (at NewAccount.js:81)
    in div (at NewAccount.js:75)
    in NewAccount (created by ConnectFunction)
    in ConnectFunction (created by Context.Consumer)
    in Route (at routes.js:35)
    in Switch (at routes.js:34)
    in Sus
', '2020-02-04 15:57:34', 'POST', '/logClientError');

INSERT INTO "LogError" ("Id", "Username", "ErrorMessage", "DateCreated", "HttpMethod", "HttpPath")
VALUES (618, 'dvasilakis', 'Message: Cannot read property ''Number'' of undefined
Stack: TypeError: Cannot read property ''Number'' of undefined
    at Object.getAttachment5 (c:\\Github\\ordering\\server\\WORD\\rawXml\\DownPayment\\trasmissionAttachments.js:141:187)
    at Object.getAttachmentsXmlValue (c:\\Github\\ordering\\server\\WORD\\rawXml\\DownPayment\\trasmissionAttachments.js:334:9)
    at Object.setDataForDownpaymentTransmissionDocument (c:\\Github\\ordering\\server\\FileData\\DownPaymentData.js:9:54)
    at c:\\Github\\ordering\\server\\app.js:89:35
    at Layer.handle [as handle_request] (c:\\Github\\ordering\\server\\node_modules\\express\\lib\\router\\layer.js:95:5)
    at next (c:\\Github\\ordering\\server\\node_modules\\express\\lib\\router\\route.js:137:13)
    at c:\\Github\\ordering\\server\\Postgre\\queries_login.js:222:9
    at c:\\Github\\ordering\\server\\node_modules\\jsonwebtoken\\verify.js:223:12
    at getSecret (c:\\Github\\ordering\\server\\node_modules\\jsonwebtoken\\verify.js:90:14)
    at Object.module.exports [as verify] (c:\\Gith', '2020-02-05 14:02:10', 'POST', '/getDownpaymentTransmissionWordDocument');

INSERT INTO "LogError" ("Id", "Username", "ErrorMessage", "DateCreated", "HttpMethod", "HttpPath")
VALUES (619, 'dvasilakis', 'Message: value too long for type character varying(20)
Stack: error: value too long for type character varying(20)
    at Connection.parseE (c:\\Github\\ordering\\server\\node_modules\\pg\\lib\\connection.js:602:11)
    at Connection.parseMessage (c:\\Github\\ordering\\server\\node_modules\\pg\\lib\\connection.js:399:19)
    at Socket.<anonymous> (c:\\Github\\ordering\\server\\node_modules\\pg\\lib\\connection.js:121:22)
    at Socket.emit (events.js:210:5)
    at addChunk (_stream_readable.js:309:12)
    at readableAddChunk (_stream_readable.js:290:11)
    at Socket.Readable.push (_stream_readable.js:224:10)
    at TCP.onStreamRead (internal/stream_base_commons.js:182:23)
', '2020-02-07 11:48:31', 'POST', '/createdirection');

INSERT INTO "LogError" ("Id", "Username", "ErrorMessage", "DateCreated", "HttpMethod", "HttpPath")
VALUES (620, 'dvasilakis', 'Message: value too long for type character varying(20)
Stack: error: value too long for type character varying(20)
    at Connection.parseE (c:\\Github\\ordering\\server\\node_modules\\pg\\lib\\connection.js:602:11)
    at Connection.parseMessage (c:\\Github\\ordering\\server\\node_modules\\pg\\lib\\connection.js:399:19)
    at Socket.<anonymous> (c:\\Github\\ordering\\server\\node_modules\\pg\\lib\\connection.js:121:22)
    at Socket.emit (events.js:210:5)
    at addChunk (_stream_readable.js:309:12)
    at readableAddChunk (_stream_readable.js:290:11)
    at Socket.Readable.push (_stream_readable.js:224:10)
    at TCP.onStreamRead (internal/stream_base_commons.js:182:23)
', '2020-02-07 11:55:23', 'POST', '/createdepartment');

--
-- Data for table "Ordering"."DecisionBoard" (OID = 33615) (LIMIT 0,6)
--
INSERT INTO "DecisionBoard" ("Id", "AccountId", "ProtocolNumber", "ProtocolDate", "Content")
VALUES (57, 125, 123, '2020-01-23', '');

INSERT INTO "DecisionBoard" ("Id", "AccountId", "ProtocolNumber", "ProtocolDate", "Content")
VALUES (59, 129, 234, '2020-02-20', '');

INSERT INTO "DecisionBoard" ("Id", "AccountId", "ProtocolNumber", "ProtocolDate", "Content")
VALUES (64, 120, 12, '2020-01-19', '');

INSERT INTO "DecisionBoard" ("Id", "AccountId", "ProtocolNumber", "ProtocolDate", "Content")
VALUES (65, 120, 34, '2019-12-12', 'sdfsdfsdf');

INSERT INTO "DecisionBoard" ("Id", "AccountId", "ProtocolNumber", "ProtocolDate", "Content")
VALUES (66, 131, 456, '2020-02-28', '');

INSERT INTO "DecisionBoard" ("Id", "AccountId", "ProtocolNumber", "ProtocolDate", "Content")
VALUES (67, 131, 345, '2020-02-27', 'lalala');

--
-- Data for table "Ordering"."DecisionCoordinatorDecentrilizedAdministration" (OID = 33623) (LIMIT 0,6)
--
INSERT INTO "DecisionCoordinatorDecentrilizedAdministration" ("Id", "AccountId", "ProtocolNumber", "ProtocolDate")
VALUES (58, 120, 12, '2020-02-19');

INSERT INTO "DecisionCoordinatorDecentrilizedAdministration" ("Id", "AccountId", "ProtocolNumber", "ProtocolDate")
VALUES (59, 120, 12, '2020-02-12');

INSERT INTO "DecisionCoordinatorDecentrilizedAdministration" ("Id", "AccountId", "ProtocolNumber", "ProtocolDate")
VALUES (60, 131, 345, '2020-02-27');

INSERT INTO "DecisionCoordinatorDecentrilizedAdministration" ("Id", "AccountId", "ProtocolNumber", "ProtocolDate")
VALUES (61, 131, 123, '2020-02-27');

INSERT INTO "DecisionCoordinatorDecentrilizedAdministration" ("Id", "AccountId", "ProtocolNumber", "ProtocolDate")
VALUES (51, 125, 1123, '2020-01-01');

INSERT INTO "DecisionCoordinatorDecentrilizedAdministration" ("Id", "AccountId", "ProtocolNumber", "ProtocolDate")
VALUES (53, 129, 434, '2020-02-12');

--
-- Data for table "Ordering"."CourtOfAuditors" (OID = 33631) (LIMIT 0,2)
--
INSERT INTO "CourtOfAuditors" ("Id", "AccountId", "ProtocolNumber", "ProtocolYear", "ScaleNumber", "APDA_ProtocolNumber", "APDA_ProtocolDate")
VALUES (9, 120, NULL, NULL, NULL, NULL, NULL);

INSERT INTO "CourtOfAuditors" ("Id", "AccountId", "ProtocolNumber", "ProtocolYear", "ScaleNumber", "APDA_ProtocolNumber", "APDA_ProtocolDate")
VALUES (10, 131, 673, '2021', 'Στ''', 467, '2020-02-26');

--
-- Data for table "Ordering"."ContractUsers" (OID = 33755) (LIMIT 0,2)
--
INSERT INTO "ContractUsers" ("ContractId", "UserId")
VALUES (68, 4);

INSERT INTO "ContractUsers" ("ContractId", "UserId")
VALUES (68, 28);

--
-- Definition for index AAY_pkey (OID = 25030) :
--
SET search_path = "Ordering", pg_catalog;
ALTER TABLE ONLY "AAY"
    ADD CONSTRAINT "AAY_pkey"
    PRIMARY KEY ("Id");
--
-- Definition for index Account_pkey (OID = 25032) :
--
ALTER TABLE ONLY "Account"
    ADD CONSTRAINT "Account_pkey"
    PRIMARY KEY ("Id");
--
-- Definition for index CC_pkey (OID = 25034) :
--
ALTER TABLE ONLY "CC"
    ADD CONSTRAINT "CC_pkey"
    PRIMARY KEY ("Id");
--
-- Definition for index ContractType_ContactType_pkey (OID = 25038) :
--
ALTER TABLE ONLY "ContractType"
    ADD CONSTRAINT "ContractType_ContactType_pkey"
    PRIMARY KEY ("ContractTypeId");
--
-- Definition for index Contract_pkey (OID = 25040) :
--
ALTER TABLE ONLY "Contract"
    ADD CONSTRAINT "Contract_pkey"
    PRIMARY KEY ("Id");
--
-- Definition for index Department_pkey (OID = 25042) :
--
ALTER TABLE ONLY "Department"
    ADD CONSTRAINT "Department_pkey"
    PRIMARY KEY ("DepartmentId");
--
-- Definition for index Direction_pkey (OID = 25044) :
--
ALTER TABLE ONLY "Direction"
    ADD CONSTRAINT "Direction_pkey"
    PRIMARY KEY ("DirectionId");
--
-- Definition for index Invoice_pkey (OID = 25048) :
--
ALTER TABLE ONLY "Invoice"
    ADD CONSTRAINT "Invoice_pkey"
    PRIMARY KEY ("Id");
--
-- Definition for index SignatoryType_pkey (OID = 25050) :
--
ALTER TABLE ONLY "SignatoryType"
    ADD CONSTRAINT "SignatoryType_pkey"
    PRIMARY KEY ("Id");
--
-- Definition for index Signatory_pkey (OID = 25052) :
--
ALTER TABLE ONLY "Signatory"
    ADD CONSTRAINT "Signatory_pkey"
    PRIMARY KEY ("Id");
--
-- Definition for index Contract_fk (OID = 25069) :
--
ALTER TABLE ONLY "Contract"
    ADD CONSTRAINT "Contract_fk"
    FOREIGN KEY ("ContractTypeId") REFERENCES "ContractType"("ContractTypeId");
--
-- Definition for index Contract_fk2 (OID = 25100) :
--
ALTER TABLE ONLY "Contract"
    ADD CONSTRAINT "Contract_fk2"
    FOREIGN KEY ("DirectionId") REFERENCES "Direction"("DirectionId");
--
-- Definition for index Contract_fk3 (OID = 25105) :
--
ALTER TABLE ONLY "Contract"
    ADD CONSTRAINT "Contract_fk3"
    FOREIGN KEY ("DepartmentId") REFERENCES "Department"("DepartmentId");
--
-- Definition for index Reservations_pkey (OID = 25140) :
--
ALTER TABLE ONLY "Reservations"
    ADD CONSTRAINT "Reservations_pkey"
    PRIMARY KEY ("Id");
--
-- Definition for index MunicipalAgencies_pkey (OID = 25169) :
--
ALTER TABLE ONLY "Agencies"
    ADD CONSTRAINT "MunicipalAgencies_pkey"
    PRIMARY KEY ("Id");
--
-- Definition for index DocumentSignatories_pkey (OID = 25205) :
--
ALTER TABLE ONLY "DocumentSignatory"
    ADD CONSTRAINT "DocumentSignatories_pkey"
    PRIMARY KEY ("Id");
--
-- Definition for index AAY_fk (OID = 25215) :
--
ALTER TABLE ONLY "AAY"
    ADD CONSTRAINT "AAY_fk"
    FOREIGN KEY ("AccountId") REFERENCES "Account"("Id") ON DELETE CASCADE;
--
-- Definition for index Account_fk (OID = 25220) :
--
ALTER TABLE ONLY "Account"
    ADD CONSTRAINT "Account_fk"
    FOREIGN KEY ("ContractId") REFERENCES "Contract"("Id") ON DELETE CASCADE;
--
-- Definition for index CC_fk (OID = 25225) :
--
ALTER TABLE ONLY "CC"
    ADD CONSTRAINT "CC_fk"
    FOREIGN KEY ("AccountId") REFERENCES "Account"("Id") ON DELETE CASCADE;
--
-- Definition for index DocumentSignatories_fk (OID = 25230) :
--
ALTER TABLE ONLY "DocumentSignatory"
    ADD CONSTRAINT "DocumentSignatories_fk"
    FOREIGN KEY ("SignatoryTypeId") REFERENCES "SignatoryType"("Id") ON DELETE CASCADE;
--
-- Definition for index DocumentSignatories_fk1 (OID = 25235) :
--
ALTER TABLE ONLY "DocumentSignatory"
    ADD CONSTRAINT "DocumentSignatories_fk1"
    FOREIGN KEY ("AccountId") REFERENCES "Account"("Id") ON DELETE CASCADE;
--
-- Definition for index DocumentSignatories_fk2 (OID = 25240) :
--
ALTER TABLE ONLY "DocumentSignatory"
    ADD CONSTRAINT "DocumentSignatories_fk2"
    FOREIGN KEY ("SignatoryId") REFERENCES "Signatory"("Id") ON DELETE CASCADE;
--
-- Definition for index Invoice_fk (OID = 25245) :
--
ALTER TABLE ONLY "Invoice"
    ADD CONSTRAINT "Invoice_fk"
    FOREIGN KEY ("AccountId") REFERENCES "Account"("Id") ON DELETE CASCADE;
--
-- Definition for index User_pkey (OID = 25271) :
--
ALTER TABLE ONLY "User"
    ADD CONSTRAINT "User_pkey"
    PRIMARY KEY ("Id");
--
-- Definition for index UserRoles_pkey (OID = 25288) :
--
ALTER TABLE ONLY "UserRoles"
    ADD CONSTRAINT "UserRoles_pkey"
    PRIMARY KEY ("Id");
--
-- Definition for index Department_fk (OID = 25290) :
--
ALTER TABLE ONLY "Department"
    ADD CONSTRAINT "Department_fk"
    FOREIGN KEY ("DirectionId") REFERENCES "Direction"("DirectionId") ON DELETE CASCADE;
--
-- Definition for index LogError_pkey (OID = 25304) :
--
ALTER TABLE ONLY "LogError"
    ADD CONSTRAINT "LogError_pkey"
    PRIMARY KEY ("Id");
--
-- Definition for index DecisionBoard_pkey (OID = 33619) :
--
ALTER TABLE ONLY "DecisionBoard"
    ADD CONSTRAINT "DecisionBoard_pkey"
    PRIMARY KEY ("Id");
--
-- Definition for index DecisionCoordinatorDecentrilizedAdministration_pkey (OID = 33627) :
--
ALTER TABLE ONLY "DecisionCoordinatorDecentrilizedAdministration"
    ADD CONSTRAINT "DecisionCoordinatorDecentrilizedAdministration_pkey"
    PRIMARY KEY ("Id");
--
-- Definition for index CourtOfAuditors_pkey (OID = 33635) :
--
ALTER TABLE ONLY "CourtOfAuditors"
    ADD CONSTRAINT "CourtOfAuditors_pkey"
    PRIMARY KEY ("Id");
--
-- Definition for index CourtOfAuditors_fk (OID = 33642) :
--
ALTER TABLE ONLY "CourtOfAuditors"
    ADD CONSTRAINT "CourtOfAuditors_fk"
    FOREIGN KEY ("AccountId") REFERENCES "Account"("Id") ON DELETE CASCADE;
--
-- Definition for index DecisionBoard_fk (OID = 33657) :
--
ALTER TABLE ONLY "DecisionBoard"
    ADD CONSTRAINT "DecisionBoard_fk"
    FOREIGN KEY ("AccountId") REFERENCES "Account"("Id") ON DELETE CASCADE;
--
-- Definition for index DecisionCoordinatorDecentrilizedAdministration_fk (OID = 33662) :
--
ALTER TABLE ONLY "DecisionCoordinatorDecentrilizedAdministration"
    ADD CONSTRAINT "DecisionCoordinatorDecentrilizedAdministration_fk"
    FOREIGN KEY ("AccountId") REFERENCES "Account"("Id") ON DELETE CASCADE;
--
-- Definition for index Contract_fk1 (OID = 33750) :
--
ALTER TABLE ONLY "Contract"
    ADD CONSTRAINT "Contract_fk1"
    FOREIGN KEY ("OwnerId") REFERENCES "User"("Id");
--
-- Definition for index ContractUsers_fk (OID = 33765) :
--
ALTER TABLE ONLY "ContractUsers"
    ADD CONSTRAINT "ContractUsers_fk"
    FOREIGN KEY ("ContractId") REFERENCES "Contract"("Id") ON DELETE CASCADE;
--
-- Data for sequence "Ordering"."AAY_Id_seq" (OID = 24949)
--
SELECT pg_catalog.setval('"AAY_Id_seq"', 117, true);
--
-- Data for sequence "Ordering"."Account_Id_seq" (OID = 24957)
--
SELECT pg_catalog.setval('"Account_Id_seq"', 132, true);
--
-- Data for sequence "Ordering"."CC_Id_seq" (OID = 24962)
--
SELECT pg_catalog.setval('"CC_Id_seq"', 223, true);
--
-- Data for sequence "Ordering"."ContractType_Id_seq" (OID = 24981)
--
--
-- Data for sequence "Ordering"."Contract_Id_seq" (OID = 24983)
--
SELECT pg_catalog.setval('"Contract_Id_seq"', 75, true);
--
-- Data for sequence "Ordering"."Department_Id_seq" (OID = 24991)
--
SELECT pg_catalog.setval('"Department_Id_seq"', 132, true);
--
-- Data for sequence "Ordering"."Direction_Id_seq" (OID = 24999)
--
SELECT pg_catalog.setval('"Direction_Id_seq"', 33, true);
--
-- Data for sequence "Ordering"."Invoice_Id_seq" (OID = 25007)
--
SELECT pg_catalog.setval('"Invoice_Id_seq"', 108, true);
--
-- Data for sequence "Ordering"."SignatoryType_Id_seq" (OID = 25015)
--
SELECT pg_catalog.setval('"SignatoryType_Id_seq"', 8, true);
--
-- Data for sequence "Ordering"."Signatory_Id_seq" (OID = 25017)
--
SELECT pg_catalog.setval('"Signatory_Id_seq"', 8, true);
--
-- Data for sequence "Ordering"."Reservations_Id_seq" (OID = 25134)
--
SELECT pg_catalog.setval('"Reservations_Id_seq"', 26, true);
--
-- Data for sequence "Ordering"."MunicipalAgencies_Id_seq" (OID = 25160)
--
SELECT pg_catalog.setval('"MunicipalAgencies_Id_seq"', 11, true);
--
-- Data for sequence "Ordering".documentsignatory_id_seq (OID = 25203)
--
SELECT pg_catalog.setval('documentsignatory_id_seq', 353, true);
--
-- Data for sequence "Ordering"."User_Id_seq" (OID = 25265)
--
SELECT pg_catalog.setval('"User_Id_seq"', 28, true);
--
-- Data for sequence "Ordering"."UserRoles_Id_seq" (OID = 25279)
--
SELECT pg_catalog.setval('"UserRoles_Id_seq"', 6, true);
--
-- Data for sequence "Ordering"."LogError_Id_seq" (OID = 25295)
--
SELECT pg_catalog.setval('"LogError_Id_seq"', 620, true);
--
-- Data for sequence "Ordering"."DecisionBoard_Id_seq" (OID = 33613)
--
SELECT pg_catalog.setval('"DecisionBoard_Id_seq"', 67, true);
--
-- Data for sequence "Ordering"."DecisionCoordinatorDecentrilizedAdministration_Id_seq" (OID = 33621)
--
SELECT pg_catalog.setval('"DecisionCoordinatorDecentrilizedAdministration_Id_seq"', 61, true);
--
-- Data for sequence "Ordering"."CourtOfAuditors_Id_seq" (OID = 33629)
--
SELECT pg_catalog.setval('"CourtOfAuditors_Id_seq"', 10, true);
--
-- Data for sequence "Ordering".contractusers_id_seq (OID = 33760)
--
SELECT pg_catalog.setval('contractusers_id_seq', 4, true);
--
-- Comments
--
COMMENT ON SCHEMA public IS 'standard public schema';
