-- SQL Manager Lite for PostgreSQL 5.9.5.52424
-- ---------------------------------------
-- Host      : localhost
-- Database  : Ordering
-- Version   : PostgreSQL 11.2, compiled by Visual C++ build 1914, 64-bit



SET search_path = "Ordering", pg_catalog;
--
-- Data for table "Ordering"."AAY" (OID = 24946) (LIMIT 0,11)
--
INSERT INTO "AAY" ("Id", "AccountId", "Value", "Year", "ProtocolNumber", "ProtocolDate", "EadNumber", "PreviousYear", "ADA")
VALUES (29, 30, 'Α00488', 2019, 56142, '2019-01-01', 487, '', '9Ξ4ΔΩ6Μ-ΡΥ4');

INSERT INTO "AAY" ("Id", "AccountId", "Value", "Year", "ProtocolNumber", "ProtocolDate", "EadNumber", "PreviousYear", "ADA")
VALUES (27, 28, 'Α00488', 2019, 56142, '2019-02-01', 487, '', '9Ξ4ΔΩ6Μ-ΡΥ4');

INSERT INTO "AAY" ("Id", "AccountId", "Value", "Year", "ProtocolNumber", "ProtocolDate", "EadNumber", "PreviousYear", "ADA")
VALUES (32, 33, 'Α00488', 2019, 56142, '2019-01-01', 487, '', '9Ξ4ΔΩ6Μ-ΡΥ4');

INSERT INTO "AAY" ("Id", "AccountId", "Value", "Year", "ProtocolNumber", "ProtocolDate", "EadNumber", "PreviousYear", "ADA")
VALUES (33, 34, 'Α00488', 2019, 56142, '2019-01-01', 487, '', '9Ξ4ΔΩ6Μ-ΡΥ4');

INSERT INTO "AAY" ("Id", "AccountId", "Value", "Year", "ProtocolNumber", "ProtocolDate", "EadNumber", "PreviousYear", "ADA")
VALUES (26, 27, 'Α00488', 2019, 56142, '2019-01-01', 487, '', '9Ξ4ΔΩ6Μ-ΡΥ4');

INSERT INTO "AAY" ("Id", "AccountId", "Value", "Year", "ProtocolNumber", "ProtocolDate", "EadNumber", "PreviousYear", "ADA")
VALUES (34, 35, 'Α00488', 2019, 56142, '2019-01-01', 487, '', '9Ξ4ΔΩ6Μ-ΡΥ4');

INSERT INTO "AAY" ("Id", "AccountId", "Value", "Year", "ProtocolNumber", "ProtocolDate", "EadNumber", "PreviousYear", "ADA")
VALUES (30, 31, 'Α00488', 2019, 56142, '2019-01-01', 487, '', '9Ξ4ΔΩ6Μ-ΡΥ4');

INSERT INTO "AAY" ("Id", "AccountId", "Value", "Year", "ProtocolNumber", "ProtocolDate", "EadNumber", "PreviousYear", "ADA")
VALUES (35, 37, 'Α00917', 2019, 140972, '2019-05-17', 916, NULL, 'ΩΗΩΡΟΡΙΝ-99Ε');

INSERT INTO "AAY" ("Id", "AccountId", "Value", "Year", "ProtocolNumber", "ProtocolDate", "EadNumber", "PreviousYear", "ADA")
VALUES (36, 42, 'Α00488', 2019, 56142, '2019-01-01', 487, NULL, '9Ξ4ΔΩ6Μ-ΡΥ4');

INSERT INTO "AAY" ("Id", "AccountId", "Value", "Year", "ProtocolNumber", "ProtocolDate", "EadNumber", "PreviousYear", "ADA")
VALUES (37, 43, 'Α00488', 2019, 56142, '2019-01-01', 487, '1', '9Ξ4ΔΩ6Μ-ΡΥ4');

INSERT INTO "AAY" ("Id", "AccountId", "Value", "Year", "ProtocolNumber", "ProtocolDate", "EadNumber", "PreviousYear", "ADA")
VALUES (28, 29, 'Α00488', 2019, 56142, '2019-01-01', 487, '', '9Ξ4ΔΩ6Μ-ΡΥ4');

--
-- Data for table "Ordering"."Account" (OID = 24951) (LIMIT 0,11)
--
INSERT INTO "Account" ("Id", "ContractId", "Number", "Start", "End", "AmountPure", "AmountFpa", "AmountTotal", "ProtocolNumber", "ProtocolDate", "AmountFullWritten", "IsFirstOfTheYear", "WorkConfirmationDate", "DeliveryGoodsDate", "DocumentDate", "DateCreated", "DateModified", "FirstAccountProtocolNumber", "FirstAccountProtocolDate", "RemainAmountOfContract")
VALUES (30, 10, 5, '2019-01-01', '2019-01-01', 12323, 2957.52, 15280.5, NULL, '2019-06-19', 'ΔΕΚΑ ΠΕΝΤΕ ΧΙΛΙΑΔΩΝ ΔΙΑΚΟΣΙΩΝ ΟΓΔΟΝΤΑ  ΕΥΡΩ KAI ΠΕΝΗΝΤΑ ΔΥΩ ΛΕΠΤΩΝ', true, '2019-01-01', '2019-01-01', '2019-01-01', '2019-06-19', '2019-06-19', NULL, '2019-06-18', 2134);

INSERT INTO "Account" ("Id", "ContractId", "Number", "Start", "End", "AmountPure", "AmountFpa", "AmountTotal", "ProtocolNumber", "ProtocolDate", "AmountFullWritten", "IsFirstOfTheYear", "WorkConfirmationDate", "DeliveryGoodsDate", "DocumentDate", "DateCreated", "DateModified", "FirstAccountProtocolNumber", "FirstAccountProtocolDate", "RemainAmountOfContract")
VALUES (28, 11, 1, '2019-12-31', '2019-12-31', 1, 0.24, 1.24, NULL, '2019-06-26', 'ΕΝΟΣ ΕΥΡΩ KAI ΕΙΚΟΣΙ ΤΕΣΣΑΡΩΝ ΛΕΠΤΩΝ', false, '2019-01-01', '2019-01-01', '2019-12-31', '2019-06-18', '2019-06-26', NULL, '2019-06-26', 1);

INSERT INTO "Account" ("Id", "ContractId", "Number", "Start", "End", "AmountPure", "AmountFpa", "AmountTotal", "ProtocolNumber", "ProtocolDate", "AmountFullWritten", "IsFirstOfTheYear", "WorkConfirmationDate", "DeliveryGoodsDate", "DocumentDate", "DateCreated", "DateModified", "FirstAccountProtocolNumber", "FirstAccountProtocolDate", "RemainAmountOfContract")
VALUES (33, 18, 1, '2019-01-01', '2019-01-01', 123, 29.52, 152.52, NULL, '2019-06-26', 'ΕΚΑΤΩΝ ΠΕΝΗΝΤΑ ΔΥΩ ΕΥΡΩ KAI ΠΕΝΗΝΤΑ ΔΥΩ ΛΕΠΤΩΝ', false, '2019-01-01', '2019-01-01', '2019-01-01', '2019-06-26', '2019-06-26', NULL, '2019-06-26', 5);

INSERT INTO "Account" ("Id", "ContractId", "Number", "Start", "End", "AmountPure", "AmountFpa", "AmountTotal", "ProtocolNumber", "ProtocolDate", "AmountFullWritten", "IsFirstOfTheYear", "WorkConfirmationDate", "DeliveryGoodsDate", "DocumentDate", "DateCreated", "DateModified", "FirstAccountProtocolNumber", "FirstAccountProtocolDate", "RemainAmountOfContract")
VALUES (34, 10, 2, '2019-01-01', '2019-01-01', 1, 1, 1, NULL, '2019-06-26', '  ΕΝΟΣ ΕΥΡΩ', false, '2019-01-01', '2019-01-01', '2019-01-01', '2019-06-26', '2019-06-26', 1, '2019-02-01', 1);

INSERT INTO "Account" ("Id", "ContractId", "Number", "Start", "End", "AmountPure", "AmountFpa", "AmountTotal", "ProtocolNumber", "ProtocolDate", "AmountFullWritten", "IsFirstOfTheYear", "WorkConfirmationDate", "DeliveryGoodsDate", "DocumentDate", "DateCreated", "DateModified", "FirstAccountProtocolNumber", "FirstAccountProtocolDate", "RemainAmountOfContract")
VALUES (27, 10, 1, '2020-01-01', '2021-01-01', 12, 2.88, 14.88, NULL, '2019-06-18', 'ΔΕΚΑ ΤΕΣΣΑΡΩΝ ΕΥΡΩ KAI ΟΓΔΟΝΤΑ ΟΚΤΩΝ ΛΕΠΤΩΝ', true, '2019-01-01', '2019-01-01', '2019-01-02', '2019-06-18', '2019-06-26', NULL, '2019-06-18', 12);

INSERT INTO "Account" ("Id", "ContractId", "Number", "Start", "End", "AmountPure", "AmountFpa", "AmountTotal", "ProtocolNumber", "ProtocolDate", "AmountFullWritten", "IsFirstOfTheYear", "WorkConfirmationDate", "DeliveryGoodsDate", "DocumentDate", "DateCreated", "DateModified", "FirstAccountProtocolNumber", "FirstAccountProtocolDate", "RemainAmountOfContract")
VALUES (35, 12, 8, '2019-01-01', '2019-01-01', 123, 29.52, 152.52, NULL, '2019-06-26', 'ΕΚΑΤΩΝ ΠΕΝΗΝΤΑ ΔΥΩ ΕΥΡΩ KAI ΠΕΝΗΝΤΑ ΔΥΩ ΛΕΠΤΩΝ', false, '2019-01-01', '2020-01-01', '2019-01-01', '2019-06-26', '2019-06-26', NULL, '2019-01-01', 3);

INSERT INTO "Account" ("Id", "ContractId", "Number", "Start", "End", "AmountPure", "AmountFpa", "AmountTotal", "ProtocolNumber", "ProtocolDate", "AmountFullWritten", "IsFirstOfTheYear", "WorkConfirmationDate", "DeliveryGoodsDate", "DocumentDate", "DateCreated", "DateModified", "FirstAccountProtocolNumber", "FirstAccountProtocolDate", "RemainAmountOfContract")
VALUES (31, 19, 1, '2019-01-01', '2019-01-01', 30000, 7200, 37200, NULL, '2019-06-24', 'ΤΡΙΑΝΤΑ ΕΦΤΑ ΧΙΛΙΑΔΩΝ ΔΙΑΚΟΣΙΩΝ   ΕΥΡΩ', false, '2019-01-01', '2019-01-01', '2019-01-01', '2019-06-24', '2019-06-28', NULL, '2019-06-24', 12);

INSERT INTO "Account" ("Id", "ContractId", "Number", "Start", "End", "AmountPure", "AmountFpa", "AmountTotal", "ProtocolNumber", "ProtocolDate", "AmountFullWritten", "IsFirstOfTheYear", "WorkConfirmationDate", "DeliveryGoodsDate", "DocumentDate", "DateCreated", "DateModified", "FirstAccountProtocolNumber", "FirstAccountProtocolDate", "RemainAmountOfContract")
VALUES (37, 43, 1, '2019-01-01', '2019-01-01', 300000, 72000, 372000, NULL, '2019-07-19', 'ΤΡΙΑΚΟΣΙΩΝ ΕΒΔΗΜΟΝΤΑ ΔΥΩ ΧΙΛΙΑΔΩΝ ΕΥΡΩ', true, '2019-01-01', '2019-01-01', '2019-06-26', '2019-07-19', '2019-07-19', NULL, '2019-07-19', 868000);

INSERT INTO "Account" ("Id", "ContractId", "Number", "Start", "End", "AmountPure", "AmountFpa", "AmountTotal", "ProtocolNumber", "ProtocolDate", "AmountFullWritten", "IsFirstOfTheYear", "WorkConfirmationDate", "DeliveryGoodsDate", "DocumentDate", "DateCreated", "DateModified", "FirstAccountProtocolNumber", "FirstAccountProtocolDate", "RemainAmountOfContract")
VALUES (42, 43, 2, '2019-01-02', '2019-01-01', 12, 2.88, 14.88, NULL, '2019-07-19', 'ΔΕΚΑ ΤΕΣΣΑΡΩΝ ΕΥΡΩ KAI ΟΓΔΟΝΤΑ ΟΚΤΩ ΛΕΠΤΩΝ', false, '2019-01-01', '2019-01-01', '2019-01-01', '2019-07-19', '2019-07-19', NULL, '2019-07-19', 867985);

INSERT INTO "Account" ("Id", "ContractId", "Number", "Start", "End", "AmountPure", "AmountFpa", "AmountTotal", "ProtocolNumber", "ProtocolDate", "AmountFullWritten", "IsFirstOfTheYear", "WorkConfirmationDate", "DeliveryGoodsDate", "DocumentDate", "DateCreated", "DateModified", "FirstAccountProtocolNumber", "FirstAccountProtocolDate", "RemainAmountOfContract")
VALUES (29, 11, 2, '2019-01-01', '2019-01-01', 88709.7, 21290.3, 110000, NULL, '2019-06-18', 'ΕΚΑΤΩΝ ΔΕΚΑ  ΧΙΛΙΑΔΩΝ ΕΥΡΩ', false, '2019-01-01', '2019-01-01', '2019-01-01', '2019-06-18', '2019-06-18', NULL, '2019-06-18', 12);

INSERT INTO "Account" ("Id", "ContractId", "Number", "Start", "End", "AmountPure", "AmountFpa", "AmountTotal", "ProtocolNumber", "ProtocolDate", "AmountFullWritten", "IsFirstOfTheYear", "WorkConfirmationDate", "DeliveryGoodsDate", "DocumentDate", "DateCreated", "DateModified", "FirstAccountProtocolNumber", "FirstAccountProtocolDate", "RemainAmountOfContract")
VALUES (43, 44, 17, '2019-01-01', '2019-01-01', 12, 3, 15, NULL, '2019-07-30', ' ΔΕΚΑ ΠΕΝΤΕ ΕΥΡΩ', false, '2019-01-01', '2019-01-01', '2019-01-01', '2019-07-30', '2019-07-30', 1, '2019-01-01', 12);

--
-- Data for table "Ordering"."CC" (OID = 24959) (LIMIT 0,22)
--
INSERT INTO "CC" ("Id", "AccountId", "CC1", "CC2", "ccType", "Order")
VALUES (49, 29, 3, -1, 1, 1);

INSERT INTO "CC" ("Id", "AccountId", "CC1", "CC2", "ccType", "Order")
VALUES (50, 29, 3, -1, 1, 2);

INSERT INTO "CC" ("Id", "AccountId", "CC1", "CC2", "ccType", "Order")
VALUES (51, 30, 3, 10, 1, 1);

INSERT INTO "CC" ("Id", "AccountId", "CC1", "CC2", "ccType", "Order")
VALUES (52, 30, 3, 10, 1, 2);

INSERT INTO "CC" ("Id", "AccountId", "CC1", "CC2", "ccType", "Order")
VALUES (47, 28, 3, 10, 1, 1);

INSERT INTO "CC" ("Id", "AccountId", "CC1", "CC2", "ccType", "Order")
VALUES (48, 28, 3, 10, 1, 2);

INSERT INTO "CC" ("Id", "AccountId", "CC1", "CC2", "ccType", "Order")
VALUES (57, 33, 3, 10, 1, 1);

INSERT INTO "CC" ("Id", "AccountId", "CC1", "CC2", "ccType", "Order")
VALUES (58, 33, 2, 4, 1, 2);

INSERT INTO "CC" ("Id", "AccountId", "CC1", "CC2", "ccType", "Order")
VALUES (59, 34, 3, 10, 1, 1);

INSERT INTO "CC" ("Id", "AccountId", "CC1", "CC2", "ccType", "Order")
VALUES (60, 34, 3, 10, 1, 2);

INSERT INTO "CC" ("Id", "AccountId", "CC1", "CC2", "ccType", "Order")
VALUES (45, 27, 2, 4, 1, 1);

INSERT INTO "CC" ("Id", "AccountId", "CC1", "CC2", "ccType", "Order")
VALUES (46, 27, 3, -1, 1, 2);

INSERT INTO "CC" ("Id", "AccountId", "CC1", "CC2", "ccType", "Order")
VALUES (61, 35, 3, 10, 1, 1);

INSERT INTO "CC" ("Id", "AccountId", "CC1", "CC2", "ccType", "Order")
VALUES (62, 35, 3, 10, 1, 2);

INSERT INTO "CC" ("Id", "AccountId", "CC1", "CC2", "ccType", "Order")
VALUES (53, 31, 3, 10, 1, 1);

INSERT INTO "CC" ("Id", "AccountId", "CC1", "CC2", "ccType", "Order")
VALUES (54, 31, 2, -1, 1, 2);

INSERT INTO "CC" ("Id", "AccountId", "CC1", "CC2", "ccType", "Order")
VALUES (63, 37, 2, 6, 1, 1);

INSERT INTO "CC" ("Id", "AccountId", "CC1", "CC2", "ccType", "Order")
VALUES (64, 37, 1, -1, 2, 2);

INSERT INTO "CC" ("Id", "AccountId", "CC1", "CC2", "ccType", "Order")
VALUES (65, 42, 3, 10, 1, 1);

INSERT INTO "CC" ("Id", "AccountId", "CC1", "CC2", "ccType", "Order")
VALUES (66, 42, 1, -1, 2, 2);

INSERT INTO "CC" ("Id", "AccountId", "CC1", "CC2", "ccType", "Order")
VALUES (67, 43, 3, 10, 1, 1);

INSERT INTO "CC" ("Id", "AccountId", "CC1", "CC2", "ccType", "Order")
VALUES (68, 43, 3, 10, 1, 2);

--
-- Data for table "Ordering"."Concessionaire" (OID = 24964) (LIMIT 0,6)
--
INSERT INTO "Concessionaire" ("ConcessionaireId", "ArticleDocumentTransition", "ArticleDocumentAccount", "ConcessionaireName", "ConcessionaireAFM")
VALUES (2, 'NULL', 'NULL', 'Concessionaire', 'ConcessionaireAFM');

INSERT INTO "Concessionaire" ("ConcessionaireId", "ArticleDocumentTransition", "ArticleDocumentAccount", "ConcessionaireName", "ConcessionaireAFM")
VALUES (1, 'της', 'ΤΗΝ', 'COSMOS BUSINESS SYSTEMS Α.Ε.Β.Ε.', '00');

INSERT INTO "Concessionaire" ("ConcessionaireId", "ArticleDocumentTransition", "ArticleDocumentAccount", "ConcessionaireName", "ConcessionaireAFM")
VALUES (3, 'NULL', 'NULL', 'sdfsdf', '234454');

INSERT INTO "Concessionaire" ("ConcessionaireId", "ArticleDocumentTransition", "ArticleDocumentAccount", "ConcessionaireName", "ConcessionaireAFM")
VALUES (4, 'NULL', 'NULL', 'COSMOS BUSINESS SYSTEMS ΑΕΒΕ', '094223430');

INSERT INTO "Concessionaire" ("ConcessionaireId", "ArticleDocumentTransition", "ArticleDocumentAccount", "ConcessionaireName", "ConcessionaireAFM")
VALUES (5, 'NULL', 'NULL', 'Vert ', '1234');

INSERT INTO "Concessionaire" ("ConcessionaireId", "ArticleDocumentTransition", "ArticleDocumentAccount", "ConcessionaireName", "ConcessionaireAFM")
VALUES (6, 'NULL', 'NULL', 'sdf', 'sdf');

--
-- Data for table "Ordering"."Contract" (OID = 24972) (LIMIT 0,24)
--
INSERT INTO "Contract" ("Id", "ContractTypeId", "Title", "ProtocolNumber", "ProtocolDate", "KAE", "Actor", "CodeDirection", "AwardNumber", "AwardDate", "AwardAda", "CpvCode", "CpvTitle", "AmountPure", "AmountFpa", "AmountTotal", "PaidAmountPure", "PaidAmountFpa", "PaidAmountTotal", "Balance", "Start", "End", "NumberOfAccounts", "DateCreated", "DateModified", "DirectionId", "DepartmentId", "ConcessionaireName", "ConcessionaireAFM")
VALUES (32, 1, 'Συντήρηση του Ενεργού Εξοπλισμού Δικτύου Φωνής & Δεδομένων (LAN-WAN) του Δήμου Αθηναίων', 546, '2019-01-01', '6264.005', '10', '18', 1448, '2019-01-01', '75Η2Ω6Μ-ΝΙΩ', '50312310-1', 'Συντήρηση Εξοπλισμού Δικτύου Δεδομένων', 123, 29.52, 152.52, 99.19, 23.81, 123, 0, '2019-01-01', '2019-01-01', 7, '2019-06-27 10:36:26', '2019-06-27 10:36:26', 3, 11, 'COSMOS BUSINESS SYSTEMS ΑΕΒΕ', '094223430');

INSERT INTO "Contract" ("Id", "ContractTypeId", "Title", "ProtocolNumber", "ProtocolDate", "KAE", "Actor", "CodeDirection", "AwardNumber", "AwardDate", "AwardAda", "CpvCode", "CpvTitle", "AmountPure", "AmountFpa", "AmountTotal", "PaidAmountPure", "PaidAmountFpa", "PaidAmountTotal", "Balance", "Start", "End", "NumberOfAccounts", "DateCreated", "DateModified", "DirectionId", "DepartmentId", "ConcessionaireName", "ConcessionaireAFM")
VALUES (10, 1, 'TEst test', 93942, '2019-01-01', '6264.005', '10', '18', 1448, '2019-01-01', '75Η2Ω6Μ-ΝΙΩ', '50312310-1', 'Συντήρηση Εξοπλισμού Δικτύου Δεδομένων', 100, 24, 124, 42, 10.08, 52.08, 0, '2019-01-01', '2019-01-01', 9, '2019-06-19 14:23:34', '2019-06-19 14:23:34', 2, 4, 'Αναδοχος 1', '123');

INSERT INTO "Contract" ("Id", "ContractTypeId", "Title", "ProtocolNumber", "ProtocolDate", "KAE", "Actor", "CodeDirection", "AwardNumber", "AwardDate", "AwardAda", "CpvCode", "CpvTitle", "AmountPure", "AmountFpa", "AmountTotal", "PaidAmountPure", "PaidAmountFpa", "PaidAmountTotal", "Balance", "Start", "End", "NumberOfAccounts", "DateCreated", "DateModified", "DirectionId", "DepartmentId", "ConcessionaireName", "ConcessionaireAFM")
VALUES (11, 1, 'Συντήρηση του Ενεργού Εξοπλισμού Δικτύου Φωνής & Δεδομένων (LAN-WAN) του Δήμου Αθηναίων', 384467, '2017-12-29', '6264.005', '10', '18', 1448, '2019-01-01', '75Η2Ω6Μ-ΝΙΩ', '50312310-1', 'Συντήρηση Εξοπλισμού Δικτύου Δεδομένων', 450000, 108000, 558000, 261028, 62646.7, 323674, 0, '2019-01-01', '2019-01-01', 7, '2019-06-19 14:24:34', '2019-06-19 14:24:34', 2, 4, 'Αναδοχος 2', '456');

INSERT INTO "Contract" ("Id", "ContractTypeId", "Title", "ProtocolNumber", "ProtocolDate", "KAE", "Actor", "CodeDirection", "AwardNumber", "AwardDate", "AwardAda", "CpvCode", "CpvTitle", "AmountPure", "AmountFpa", "AmountTotal", "PaidAmountPure", "PaidAmountFpa", "PaidAmountTotal", "Balance", "Start", "End", "NumberOfAccounts", "DateCreated", "DateModified", "DirectionId", "DepartmentId", "ConcessionaireName", "ConcessionaireAFM")
VALUES (33, 1, 'Simvasi 1049', 12345, '2019-01-01', '6264.005', '10', '18', 1448, '2019-01-01', '75Η2Ω6Μ-ΝΙΩ', 'sdfsdf', 'sfwersdf', 123, 29.52, 152.52, 23, 5.52, 28.52, 0, '2019-01-01', '2019-01-01', 11, '2019-06-27 10:49:44', '2019-06-27 10:49:44', 2, 5, 'Anadoxox 123', '654987564546');

INSERT INTO "Contract" ("Id", "ContractTypeId", "Title", "ProtocolNumber", "ProtocolDate", "KAE", "Actor", "CodeDirection", "AwardNumber", "AwardDate", "AwardAda", "CpvCode", "CpvTitle", "AmountPure", "AmountFpa", "AmountTotal", "PaidAmountPure", "PaidAmountFpa", "PaidAmountTotal", "Balance", "Start", "End", "NumberOfAccounts", "DateCreated", "DateModified", "DirectionId", "DepartmentId", "ConcessionaireName", "ConcessionaireAFM")
VALUES (34, 1, 'Simvasi 8', 34567, '2019-01-01', '6264.005', '10', '18', 1448, '2019-01-01', '75Η2Ω6Μ-ΝΙΩ', '123234', '234234', 123, 29.52, 152.52, 12, 2.88, 14.88, 0, '2019-01-01', '2019-01-01', 12, '2019-06-27 11:34:20', '2019-06-27 11:34:20', 2, 5, 'Anadoxos 45', '12345678');

INSERT INTO "Contract" ("Id", "ContractTypeId", "Title", "ProtocolNumber", "ProtocolDate", "KAE", "Actor", "CodeDirection", "AwardNumber", "AwardDate", "AwardAda", "CpvCode", "CpvTitle", "AmountPure", "AmountFpa", "AmountTotal", "PaidAmountPure", "PaidAmountFpa", "PaidAmountTotal", "Balance", "Start", "End", "NumberOfAccounts", "DateCreated", "DateModified", "DirectionId", "DepartmentId", "ConcessionaireName", "ConcessionaireAFM")
VALUES (35, 1, 'Simvasi 8', 345671, '2019-01-01', '6264.005', '10', '18', 1448, '2019-01-01', '75Η2Ω6Μ-ΝΙΩ', '123234', '234234', 123, 29.52, 152.52, 12, 2.88, 14.88, 0, '2019-01-01', '2019-01-01', 12, '2019-06-27 11:35:35', '2019-06-27 11:35:35', 2, 5, 'Anadoxos 45', '12345678');

INSERT INTO "Contract" ("Id", "ContractTypeId", "Title", "ProtocolNumber", "ProtocolDate", "KAE", "Actor", "CodeDirection", "AwardNumber", "AwardDate", "AwardAda", "CpvCode", "CpvTitle", "AmountPure", "AmountFpa", "AmountTotal", "PaidAmountPure", "PaidAmountFpa", "PaidAmountTotal", "Balance", "Start", "End", "NumberOfAccounts", "DateCreated", "DateModified", "DirectionId", "DepartmentId", "ConcessionaireName", "ConcessionaireAFM")
VALUES (18, 1, 'Συντήρηση του Ενεργού Εξοπλισμού Δικτύου Φωνής & Δεδομένων (LAN-WAN) του Δήμου Αθηναίων', 456, '2019-01-01', '6264.005', '10', '18', 1448, '2019-01-01', '75Η2Ω6Μ-ΝΙΩ', '50312310-1', 'Συντήρηση Εξοπλισμού Δικτύου Δεδομένων', 12, 2.88, 14.88, 123, 29.52, 152.52, 0, '2019-01-01', '2019-01-01', 7, '2019-06-19 14:33:34', '2019-06-19 14:33:34', 3, 10, 'Αναδοχος 4
', '1234');

INSERT INTO "Contract" ("Id", "ContractTypeId", "Title", "ProtocolNumber", "ProtocolDate", "KAE", "Actor", "CodeDirection", "AwardNumber", "AwardDate", "AwardAda", "CpvCode", "CpvTitle", "AmountPure", "AmountFpa", "AmountTotal", "PaidAmountPure", "PaidAmountFpa", "PaidAmountTotal", "Balance", "Start", "End", "NumberOfAccounts", "DateCreated", "DateModified", "DirectionId", "DepartmentId", "ConcessionaireName", "ConcessionaireAFM")
VALUES (40, 1, 'Contract 1200', 5234, '2019-01-01', '6264.005', '10', '18', 1448, '2019-01-01', '75Η2Ω6Μ-ΝΙΩ', '50312310-1', 'Συντήρηση Εξοπλισμού Δικτύου Δεδομένων', 145, 34.8, 179.8, 1234, 296.16, 1530.16, 0, '2019-01-01', '2019-01-01', 13, '2019-06-27 12:00:54', '2019-06-27 12:00:54', 3, 11, 'ASDFSDF', '094223430');

INSERT INTO "Contract" ("Id", "ContractTypeId", "Title", "ProtocolNumber", "ProtocolDate", "KAE", "Actor", "CodeDirection", "AwardNumber", "AwardDate", "AwardAda", "CpvCode", "CpvTitle", "AmountPure", "AmountFpa", "AmountTotal", "PaidAmountPure", "PaidAmountFpa", "PaidAmountTotal", "Balance", "Start", "End", "NumberOfAccounts", "DateCreated", "DateModified", "DirectionId", "DepartmentId", "ConcessionaireName", "ConcessionaireAFM")
VALUES (41, 1, 'Contract 1202', 3467, '2019-01-01', '6264.005', '10', '18', 1448, '2019-01-01', '75Η2Ω6Μ-ΝΙΩ', '50312310-1', 'Συντήρηση Εξοπλισμού Δικτύου Δεδομένων', 145, 34.8, 179.8, 12, 2.88, 14.88, 0, '2019-01-01', '2019-01-01', 14, '2019-06-27 12:02:29', '2019-06-27 12:02:29', 3, 10, 'Contract 1202 Anad', '094223430');

INSERT INTO "Contract" ("Id", "ContractTypeId", "Title", "ProtocolNumber", "ProtocolDate", "KAE", "Actor", "CodeDirection", "AwardNumber", "AwardDate", "AwardAda", "CpvCode", "CpvTitle", "AmountPure", "AmountFpa", "AmountTotal", "PaidAmountPure", "PaidAmountFpa", "PaidAmountTotal", "Balance", "Start", "End", "NumberOfAccounts", "DateCreated", "DateModified", "DirectionId", "DepartmentId", "ConcessionaireName", "ConcessionaireAFM")
VALUES (42, 1, 'Συντήρηση του Ενεργού Εξοπλισμού Δικτύου Φωνής & Δεδομένων (LAN-WAN) του Δήμου Αθηναίων', 93941, '2019-01-01', '6264.005', '10', '18', 1448, '2019-01-01', '75Η2Ω6Μ-ΝΙΩ', '50312310-1', 'Συντήρηση Εξοπλισμού Δικτύου Δεδομένων', 123, 29.52, 152.52, 12, 2.88, 14.88, 0, '2019-01-01', '2019-01-01', 7, '2019-07-01 10:20:06', '2019-07-01 10:20:06', 2, 4, 'COSMOS BUSINESS SYSTEMS ΑΕΒΕ', '094223430');

INSERT INTO "Contract" ("Id", "ContractTypeId", "Title", "ProtocolNumber", "ProtocolDate", "KAE", "Actor", "CodeDirection", "AwardNumber", "AwardDate", "AwardAda", "CpvCode", "CpvTitle", "AmountPure", "AmountFpa", "AmountTotal", "PaidAmountPure", "PaidAmountFpa", "PaidAmountTotal", "Balance", "Start", "End", "NumberOfAccounts", "DateCreated", "DateModified", "DirectionId", "DepartmentId", "ConcessionaireName", "ConcessionaireAFM")
VALUES (19, 1, 'Contract 5', 234234, '2019-01-01', '6264.005', '10', '18', 1448, '2019-01-01', '75Η2Ω6Μ-ΝΙΩ', '50312310-1', 'Συντήρηση Εξοπλισμού Δικτύου Δεδομένων', 1, 0.24, 1.24, 187.1, 44.9, 232, NULL, '2019-01-01', '2019-01-01', 3, '2019-06-19 14:56:58', '2019-06-26 15:51:56', 3, 11, 'Ανάδοχος 5_5_5', '123_5_%_%');

INSERT INTO "Contract" ("Id", "ContractTypeId", "Title", "ProtocolNumber", "ProtocolDate", "KAE", "Actor", "CodeDirection", "AwardNumber", "AwardDate", "AwardAda", "CpvCode", "CpvTitle", "AmountPure", "AmountFpa", "AmountTotal", "PaidAmountPure", "PaidAmountFpa", "PaidAmountTotal", "Balance", "Start", "End", "NumberOfAccounts", "DateCreated", "DateModified", "DirectionId", "DepartmentId", "ConcessionaireName", "ConcessionaireAFM")
VALUES (12, 1, 'Σύμβαση 3', 2334, '2019-01-01', '6264.005', '10', '18', 1448, '2019-01-01', '75Η2Ω6Μ-ΝΙΩ', '50312310-1', 'Συντήρηση Εξοπλισμού Δικτύου Δεδομένων', 1, 0.24, 1.24, 2, 0.48, 2.48, NULL, '2019-01-01', '2019-02-01', 9, '2019-06-19 14:25:34', '2019-06-26 15:52:12', 2, 4, 'Αναδοχος 3
', '678');

INSERT INTO "Contract" ("Id", "ContractTypeId", "Title", "ProtocolNumber", "ProtocolDate", "KAE", "Actor", "CodeDirection", "AwardNumber", "AwardDate", "AwardAda", "CpvCode", "CpvTitle", "AmountPure", "AmountFpa", "AmountTotal", "PaidAmountPure", "PaidAmountFpa", "PaidAmountTotal", "Balance", "Start", "End", "NumberOfAccounts", "DateCreated", "DateModified", "DirectionId", "DepartmentId", "ConcessionaireName", "ConcessionaireAFM")
VALUES (30, 1, 'Συντήρηση του Ενεργού Εξοπλισμού Δικτύου Φωνής & Δεδομένων (LAN-WAN) του Δήμου Αθηναίων sdf', 234, '2019-01-01', '6264.005', '10', '18', 1448, '2019-01-01', '75Η2Ω6Μ-ΝΙΩ', '50312310-1', 'Συντήρηση Εξοπλισμού Δικτύου Δεδομένων', 123, 29.52, 152.52, 345, 82.8, 427.8, 0, '2019-01-01', '2019-01-01', 7, '2019-06-26 16:02:37', '2019-06-26 16:02:37', 2, 4, 'COSMOS BUSINESS SYSTEMS ΑΕΒΕ', '094223430');

INSERT INTO "Contract" ("Id", "ContractTypeId", "Title", "ProtocolNumber", "ProtocolDate", "KAE", "Actor", "CodeDirection", "AwardNumber", "AwardDate", "AwardAda", "CpvCode", "CpvTitle", "AmountPure", "AmountFpa", "AmountTotal", "PaidAmountPure", "PaidAmountFpa", "PaidAmountTotal", "Balance", "Start", "End", "NumberOfAccounts", "DateCreated", "DateModified", "DirectionId", "DepartmentId", "ConcessionaireName", "ConcessionaireAFM")
VALUES (31, 1, 'Test insert', 123, '2019-01-01', '6264.005', '10', '18', 1448, '2019-01-01', '75Η2Ω6Μ-ΝΙΩ', '50312310-1', 'Συντήρηση Εξοπλισμού Δικτύου Δεδομένων', 123, 29.52, 152.52, 12, 2.88, 14.88, 0, '2019-01-01', '2019-01-01', 7, '2019-06-26 16:06:17', '2019-06-26 16:06:17', 2, 5, 'COSMOS BUSINESS SYSTEMS ΑΕΒΕ', '094223430');

INSERT INTO "Contract" ("Id", "ContractTypeId", "Title", "ProtocolNumber", "ProtocolDate", "KAE", "Actor", "CodeDirection", "AwardNumber", "AwardDate", "AwardAda", "CpvCode", "CpvTitle", "AmountPure", "AmountFpa", "AmountTotal", "PaidAmountPure", "PaidAmountFpa", "PaidAmountTotal", "Balance", "Start", "End", "NumberOfAccounts", "DateCreated", "DateModified", "DirectionId", "DepartmentId", "ConcessionaireName", "ConcessionaireAFM")
VALUES (20, 1, '123', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2019-06-20 14:23:34', '2019-06-19 14:23:34', NULL, NULL, NULL, NULL);

INSERT INTO "Contract" ("Id", "ContractTypeId", "Title", "ProtocolNumber", "ProtocolDate", "KAE", "Actor", "CodeDirection", "AwardNumber", "AwardDate", "AwardAda", "CpvCode", "CpvTitle", "AmountPure", "AmountFpa", "AmountTotal", "PaidAmountPure", "PaidAmountFpa", "PaidAmountTotal", "Balance", "Start", "End", "NumberOfAccounts", "DateCreated", "DateModified", "DirectionId", "DepartmentId", "ConcessionaireName", "ConcessionaireAFM")
VALUES (21, 1, '234', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2019-06-21 14:23:34', '2019-06-19 14:23:34', NULL, NULL, NULL, NULL);

INSERT INTO "Contract" ("Id", "ContractTypeId", "Title", "ProtocolNumber", "ProtocolDate", "KAE", "Actor", "CodeDirection", "AwardNumber", "AwardDate", "AwardAda", "CpvCode", "CpvTitle", "AmountPure", "AmountFpa", "AmountTotal", "PaidAmountPure", "PaidAmountFpa", "PaidAmountTotal", "Balance", "Start", "End", "NumberOfAccounts", "DateCreated", "DateModified", "DirectionId", "DepartmentId", "ConcessionaireName", "ConcessionaireAFM")
VALUES (22, 1, '345', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2019-06-22 14:23:34', '2019-06-19 14:23:34', NULL, NULL, NULL, NULL);

INSERT INTO "Contract" ("Id", "ContractTypeId", "Title", "ProtocolNumber", "ProtocolDate", "KAE", "Actor", "CodeDirection", "AwardNumber", "AwardDate", "AwardAda", "CpvCode", "CpvTitle", "AmountPure", "AmountFpa", "AmountTotal", "PaidAmountPure", "PaidAmountFpa", "PaidAmountTotal", "Balance", "Start", "End", "NumberOfAccounts", "DateCreated", "DateModified", "DirectionId", "DepartmentId", "ConcessionaireName", "ConcessionaireAFM")
VALUES (23, 1, '456', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2019-06-23 14:23:34', '2019-06-19 14:23:34', NULL, NULL, NULL, NULL);

INSERT INTO "Contract" ("Id", "ContractTypeId", "Title", "ProtocolNumber", "ProtocolDate", "KAE", "Actor", "CodeDirection", "AwardNumber", "AwardDate", "AwardAda", "CpvCode", "CpvTitle", "AmountPure", "AmountFpa", "AmountTotal", "PaidAmountPure", "PaidAmountFpa", "PaidAmountTotal", "Balance", "Start", "End", "NumberOfAccounts", "DateCreated", "DateModified", "DirectionId", "DepartmentId", "ConcessionaireName", "ConcessionaireAFM")
VALUES (25, 1, '567', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2019-06-24 14:23:34', '2019-06-19 14:23:34', NULL, NULL, NULL, NULL);

INSERT INTO "Contract" ("Id", "ContractTypeId", "Title", "ProtocolNumber", "ProtocolDate", "KAE", "Actor", "CodeDirection", "AwardNumber", "AwardDate", "AwardAda", "CpvCode", "CpvTitle", "AmountPure", "AmountFpa", "AmountTotal", "PaidAmountPure", "PaidAmountFpa", "PaidAmountTotal", "Balance", "Start", "End", "NumberOfAccounts", "DateCreated", "DateModified", "DirectionId", "DepartmentId", "ConcessionaireName", "ConcessionaireAFM")
VALUES (26, 1, '678', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2019-06-25 14:23:34', '2019-06-19 14:23:34', NULL, NULL, NULL, NULL);

INSERT INTO "Contract" ("Id", "ContractTypeId", "Title", "ProtocolNumber", "ProtocolDate", "KAE", "Actor", "CodeDirection", "AwardNumber", "AwardDate", "AwardAda", "CpvCode", "CpvTitle", "AmountPure", "AmountFpa", "AmountTotal", "PaidAmountPure", "PaidAmountFpa", "PaidAmountTotal", "Balance", "Start", "End", "NumberOfAccounts", "DateCreated", "DateModified", "DirectionId", "DepartmentId", "ConcessionaireName", "ConcessionaireAFM")
VALUES (27, 1, '789', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2019-06-26 14:23:34', '2019-06-19 14:23:34', NULL, NULL, NULL, NULL);

INSERT INTO "Contract" ("Id", "ContractTypeId", "Title", "ProtocolNumber", "ProtocolDate", "KAE", "Actor", "CodeDirection", "AwardNumber", "AwardDate", "AwardAda", "CpvCode", "CpvTitle", "AmountPure", "AmountFpa", "AmountTotal", "PaidAmountPure", "PaidAmountFpa", "PaidAmountTotal", "Balance", "Start", "End", "NumberOfAccounts", "DateCreated", "DateModified", "DirectionId", "DepartmentId", "ConcessionaireName", "ConcessionaireAFM")
VALUES (43, 2, 'ΤΡΙΤΗ ΦΑΣΗ ΕΦΑΡΜΟΓΗΣ ΚΑΙ ΠΑΡΑΚΟΛΟΥΘΗΣΗΣ ΤΟΥ ΣΧΕΔΙΟΥ ΟΛΟΚΛΗΡΩΜΕΝΗΣ ΑΣΤΙΚΗΣ ΠΑΡΕΜΒΑΣΗΣ (ΣΟΑΠ) ΣΤΟ ΔΗΜΟ ΑΘΗΝΑΙΩΝ ΜΕ ΤΗΝ ΑΞΙΟΠΟΙΗΣΗ ΤΟΥ ΒΡΑΒΕΙΟΥ ΚΑΙΝΟΤΟΜΙΑΣ I-CAPITAL 2018 ΤΗΣ ΕΥΡΩΠΑΙΚΗΣ ΕΠΙΤΡΟΠΗΣ', 182280, '2019-07-03', '6737.080', '0', '18', 1448, '2019-01-01', '75Η2Ω6Μ-ΝΙΩ', '50312310-1', 'Συντήρηση Εξοπλισμού Δικτύου Δεδομένων', 1e+06, 240000, 1.24e+06, 300000, 72000, 372000, NULL, '2019-07-03', '2020-05-03', 7, '2019-07-19 11:59:12', '2019-07-22 12:49:56', 2, 6, 'ΕΤΑΙΡΕΙΑ ΑΝΑΠΤΥΞΗΣ ΚΑΙ ΤΟΥΡΙΣΤΙΚΗΣ ΠΡΟΒΟΛΗΣ ΑΘΗΝΩΝ - ΑΝΑΠΤΥΞΙΑΚΗ ΑΕ ΟΤΑ «Ε.Α.Τ.Α. Α.Ε.»', '094492456');

INSERT INTO "Contract" ("Id", "ContractTypeId", "Title", "ProtocolNumber", "ProtocolDate", "KAE", "Actor", "CodeDirection", "AwardNumber", "AwardDate", "AwardAda", "CpvCode", "CpvTitle", "AmountPure", "AmountFpa", "AmountTotal", "PaidAmountPure", "PaidAmountFpa", "PaidAmountTotal", "Balance", "Start", "End", "NumberOfAccounts", "DateCreated", "DateModified", "DirectionId", "DepartmentId", "ConcessionaireName", "ConcessionaireAFM")
VALUES (45, 1, 'dsfsdfsdf', -1, '2019-01-01', '123', '34', '234', 1, '2019-01-01', '34', 'asdf', 'cvcv', 1, 0.25, 1.25, 274.4, 68.6, 343, NULL, '2019-01-01', '2019-01-01', 1, '2019-07-30 13:38:15', '2019-07-30 13:38:15', 3, 10, 'sdf', '123');

INSERT INTO "Contract" ("Id", "ContractTypeId", "Title", "ProtocolNumber", "ProtocolDate", "KAE", "Actor", "CodeDirection", "AwardNumber", "AwardDate", "AwardAda", "CpvCode", "CpvTitle", "AmountPure", "AmountFpa", "AmountTotal", "PaidAmountPure", "PaidAmountFpa", "PaidAmountTotal", "Balance", "Start", "End", "NumberOfAccounts", "DateCreated", "DateModified", "DirectionId", "DepartmentId", "ConcessionaireName", "ConcessionaireAFM")
VALUES (44, 1, 'sadfasdf <<sdfsdf>>', 2, '2019-01-01', '234', '213', '123', 2, '2019-01-01', 'sdfsdf', '345345', 'sfasdf', 123, 30.75, 153.75, 123, 30.75, 153.75, NULL, '2019-01-01', '2019-01-01', 24, '2019-07-24 14:56:23', '2019-07-30 14:28:45', 3, 11, 'asdf', '2345345345');

--
-- Data for table "Ordering"."ContractType" (OID = 24978) (LIMIT 0,2)
--
INSERT INTO "ContractType" ("ContractTypeId", "ContractTypeName")
VALUES (1, 'Δημόσιας Ανάθεσης');

INSERT INTO "ContractType" ("ContractTypeId", "ContractTypeName")
VALUES (2, 'Προγραμματική');

--
-- Data for table "Ordering"."Department" (OID = 24985) (LIMIT 0,11)
--
INSERT INTO "Department" ("DepartmentId", "DirectionId", "DepartmentName", "DepartmentSupervisor", "DepartmentTelephone", "DepartmentEmail")
VALUES (10, 3, 'Προμηθειών, Προγραμματισμού, Τεκμηρίωσης Αιτημάτων και Ηλεκτρονικής Διακυβέρνησης', 'Μπουρνά Βούλα', '210.5225617', 't.promitheion@athens.gr');

INSERT INTO "Department" ("DepartmentId", "DirectionId", "DepartmentName", "DepartmentSupervisor", "DepartmentTelephone", "DepartmentEmail")
VALUES (11, 3, 'Διαδικασιών Σύναψης Δημοσίων Συμβάσεων', 'Μπιμπούδης Παναγιώτης', '213.2082956', 't.prom.dimoprasies@athens.gr');

INSERT INTO "Department" ("DepartmentId", "DirectionId", "DepartmentName", "DepartmentSupervisor", "DepartmentTelephone", "DepartmentEmail")
VALUES (12, 3, 'Αποθηκών Υλικών', 'Κακριδά  Άννα', '210.5225068', 't.apothikon.ylikon@athens.gr');

INSERT INTO "Department" ("DepartmentId", "DirectionId", "DepartmentName", "DepartmentSupervisor", "DepartmentTelephone", "DepartmentEmail")
VALUES (13, 3, 'Διαχείρισης Καυσίμων και Λιπαντικών', 'Τσιλάβης Γεώργιος', '210.3460146', 't.diax.kausimon.lipantikon@athens.gr');

INSERT INTO "Department" ("DepartmentId", "DirectionId", "DepartmentName", "DepartmentSupervisor", "DepartmentTelephone", "DepartmentEmail")
VALUES (4, 2, 'Τεχνολογίας, Πληροφορικής και Επικοινωνιών', 'Χατζηευστρατίου Ιωάννης', '210.5277169', 'i.chatzieustratiou@athens.gr');

INSERT INTO "Department" ("DepartmentId", "DirectionId", "DepartmentName", "DepartmentSupervisor", "DepartmentTelephone", "DepartmentEmail")
VALUES (5, 2, 'Ανθεκτικότητας και Βιωσιμότητας', 'Νεοφύτου Γεώργιος', '210.3721553', 't.anthektikotitas.biosimotitas@athens.gr');

INSERT INTO "Department" ("DepartmentId", "DirectionId", "DepartmentName", "DepartmentSupervisor", "DepartmentTelephone", "DepartmentEmail")
VALUES (7, 2, 'Στρατηγικού Σχεδιασμού και Προγραμματισμού', 'Κοντώσης Ηλίας', '210.5277160', 't.stratigikou.sxediasmou.progr@athens.gr');

INSERT INTO "Department" ("DepartmentId", "DirectionId", "DepartmentName", "DepartmentSupervisor", "DepartmentTelephone", "DepartmentEmail")
VALUES (6, 2, 'Καινοτομίας και Εξωστρέφειας', 'Παπακωνσταντίνου - Παπαδοπούλου Έλλη', '210.5277109', 't.kainotomias.exostrefias@athens.gr');

INSERT INTO "Department" ("DepartmentId", "DirectionId", "DepartmentName", "DepartmentSupervisor", "DepartmentTelephone", "DepartmentEmail")
VALUES (2, 3, 'Διοικητικής Υποστήριξης, Τεκμηρίωσης και Ηλεκτρονικής Διακυβέρνησης', 'Πριόβολου Καλλιόπη', '210.5277110', 't.dioikitikis.ypostirixis.strat.sxed@athens.gr');

INSERT INTO "Department" ("DepartmentId", "DirectionId", "DepartmentName", "DepartmentSupervisor", "DepartmentTelephone", "DepartmentEmail")
VALUES (3, 2, 'Διαχείρισης Γεωχωρικών Δεδομένων Πόλεως
', 'Μαρούγκα Κωνσταντίνα', '210.5277185', 't.gis@athens.gr');

INSERT INTO "Department" ("DepartmentId", "DirectionId", "DepartmentName", "DepartmentSupervisor", "DepartmentTelephone", "DepartmentEmail")
VALUES (14, 2, 'test create new department', 'myself', '2154854654', 'dvasialskdf@asdfsd.com');

--
-- Data for table "Ordering"."Direction" (OID = 24993) (LIMIT 0,3)
--
INSERT INTO "Direction" ("DirectionId", "DirectionName", "DirectionSupervisor", "DirectionTelephone", "DirectionEmail", "DirectionAddress", "DirectionPostCode", "DirectionCity")
VALUES (3, 'Προμηθειών και Αποθηκών', 'Βακουντούζης Ιωάννης', '210.5225446', 'd.prom.apothikon@athens.gr', 'Κων/νου Παλαιολόγου 9', '104 38', 'Αθήνα');

INSERT INTO "Direction" ("DirectionId", "DirectionName", "DirectionSupervisor", "DirectionTelephone", "DirectionEmail", "DirectionAddress", "DirectionPostCode", "DirectionCity")
VALUES (2, 'Στρατηγικού Σχεδιασμού, Ανθεκτικότητας, Καινοτομίας και Τεκμηρίωσης', 'Δρ. Κακριδά Ουρανία', '210.5277110', 'd.stratigikou.sxediasmou@athens.gr', 'Λιοσίων 22', '104 38', 'Αθήνα');

INSERT INTO "Direction" ("DirectionId", "DirectionName", "DirectionSupervisor", "DirectionTelephone", "DirectionEmail", "DirectionAddress", "DirectionPostCode", "DirectionCity")
VALUES (15, 'Αποκέντρωσης και Διοίκησης', 'Νεμπεγλεριώτης Ευάγγελος', '210 5277541', 'd.apokentrosi.dioikisi@athens.gr', 'Λιοσίων 22', '104 38', 'Αθήνα');

--
-- Data for table "Ordering"."DocumentSignatory" (OID = 25001) (LIMIT 0,44)
--
INSERT INTO "DocumentSignatory" ("Id", "AccountId", "SignatoryTypeId", "SignatoryId", "DocumentType", "Absense")
VALUES (34, 28, 2, 1, 1, false);

INSERT INTO "DocumentSignatory" ("Id", "AccountId", "SignatoryTypeId", "SignatoryId", "DocumentType", "Absense")
VALUES (35, 28, 5, 1, 1, false);

INSERT INTO "DocumentSignatory" ("Id", "AccountId", "SignatoryTypeId", "SignatoryId", "DocumentType", "Absense")
VALUES (36, 28, 4, 1, 1, false);

INSERT INTO "DocumentSignatory" ("Id", "AccountId", "SignatoryTypeId", "SignatoryId", "DocumentType", "Absense")
VALUES (37, 28, 4, 1, 2, false);

INSERT INTO "DocumentSignatory" ("Id", "AccountId", "SignatoryTypeId", "SignatoryId", "DocumentType", "Absense")
VALUES (54, 33, 2, 1, 1, false);

INSERT INTO "DocumentSignatory" ("Id", "AccountId", "SignatoryTypeId", "SignatoryId", "DocumentType", "Absense")
VALUES (55, 33, 5, 2, 1, false);

INSERT INTO "DocumentSignatory" ("Id", "AccountId", "SignatoryTypeId", "SignatoryId", "DocumentType", "Absense")
VALUES (56, 33, 4, 3, 1, true);

INSERT INTO "DocumentSignatory" ("Id", "AccountId", "SignatoryTypeId", "SignatoryId", "DocumentType", "Absense")
VALUES (57, 33, 4, 3, 2, true);

INSERT INTO "DocumentSignatory" ("Id", "AccountId", "SignatoryTypeId", "SignatoryId", "DocumentType", "Absense")
VALUES (58, 34, 2, 1, 1, false);

INSERT INTO "DocumentSignatory" ("Id", "AccountId", "SignatoryTypeId", "SignatoryId", "DocumentType", "Absense")
VALUES (59, 34, 5, 1, 1, false);

INSERT INTO "DocumentSignatory" ("Id", "AccountId", "SignatoryTypeId", "SignatoryId", "DocumentType", "Absense")
VALUES (38, 29, 2, 1, 1, false);

INSERT INTO "DocumentSignatory" ("Id", "AccountId", "SignatoryTypeId", "SignatoryId", "DocumentType", "Absense")
VALUES (39, 29, 5, 2, 1, false);

INSERT INTO "DocumentSignatory" ("Id", "AccountId", "SignatoryTypeId", "SignatoryId", "DocumentType", "Absense")
VALUES (40, 29, 4, 4, 1, false);

INSERT INTO "DocumentSignatory" ("Id", "AccountId", "SignatoryTypeId", "SignatoryId", "DocumentType", "Absense")
VALUES (41, 29, 3, 2, 2, false);

INSERT INTO "DocumentSignatory" ("Id", "AccountId", "SignatoryTypeId", "SignatoryId", "DocumentType", "Absense")
VALUES (60, 34, 4, 1, 1, true);

INSERT INTO "DocumentSignatory" ("Id", "AccountId", "SignatoryTypeId", "SignatoryId", "DocumentType", "Absense")
VALUES (42, 30, 2, 1, 1, false);

INSERT INTO "DocumentSignatory" ("Id", "AccountId", "SignatoryTypeId", "SignatoryId", "DocumentType", "Absense")
VALUES (43, 30, 5, 1, 1, false);

INSERT INTO "DocumentSignatory" ("Id", "AccountId", "SignatoryTypeId", "SignatoryId", "DocumentType", "Absense")
VALUES (44, 30, 4, 1, 1, false);

INSERT INTO "DocumentSignatory" ("Id", "AccountId", "SignatoryTypeId", "SignatoryId", "DocumentType", "Absense")
VALUES (45, 30, 4, 1, 2, true);

INSERT INTO "DocumentSignatory" ("Id", "AccountId", "SignatoryTypeId", "SignatoryId", "DocumentType", "Absense")
VALUES (61, 34, 4, 1, 2, false);

INSERT INTO "DocumentSignatory" ("Id", "AccountId", "SignatoryTypeId", "SignatoryId", "DocumentType", "Absense")
VALUES (30, 27, 1, 1, 1, false);

INSERT INTO "DocumentSignatory" ("Id", "AccountId", "SignatoryTypeId", "SignatoryId", "DocumentType", "Absense")
VALUES (31, 27, 5, 2, 1, false);

INSERT INTO "DocumentSignatory" ("Id", "AccountId", "SignatoryTypeId", "SignatoryId", "DocumentType", "Absense")
VALUES (32, 27, 4, 3, 1, true);

INSERT INTO "DocumentSignatory" ("Id", "AccountId", "SignatoryTypeId", "SignatoryId", "DocumentType", "Absense")
VALUES (33, 27, 4, 3, 2, true);

INSERT INTO "DocumentSignatory" ("Id", "AccountId", "SignatoryTypeId", "SignatoryId", "DocumentType", "Absense")
VALUES (62, 35, 2, 1, 1, false);

INSERT INTO "DocumentSignatory" ("Id", "AccountId", "SignatoryTypeId", "SignatoryId", "DocumentType", "Absense")
VALUES (63, 35, 5, 1, 1, false);

INSERT INTO "DocumentSignatory" ("Id", "AccountId", "SignatoryTypeId", "SignatoryId", "DocumentType", "Absense")
VALUES (64, 35, 4, 2, 1, false);

INSERT INTO "DocumentSignatory" ("Id", "AccountId", "SignatoryTypeId", "SignatoryId", "DocumentType", "Absense")
VALUES (65, 35, 4, 2, 2, false);

INSERT INTO "DocumentSignatory" ("Id", "AccountId", "SignatoryTypeId", "SignatoryId", "DocumentType", "Absense")
VALUES (46, 31, 2, 1, 1, false);

INSERT INTO "DocumentSignatory" ("Id", "AccountId", "SignatoryTypeId", "SignatoryId", "DocumentType", "Absense")
VALUES (47, 31, 5, 1, 1, false);

INSERT INTO "DocumentSignatory" ("Id", "AccountId", "SignatoryTypeId", "SignatoryId", "DocumentType", "Absense")
VALUES (48, 31, 4, 1, 1, false);

INSERT INTO "DocumentSignatory" ("Id", "AccountId", "SignatoryTypeId", "SignatoryId", "DocumentType", "Absense")
VALUES (49, 31, 4, 1, 2, false);

INSERT INTO "DocumentSignatory" ("Id", "AccountId", "SignatoryTypeId", "SignatoryId", "DocumentType", "Absense")
VALUES (66, 37, 1, 1, 1, NULL);

INSERT INTO "DocumentSignatory" ("Id", "AccountId", "SignatoryTypeId", "SignatoryId", "DocumentType", "Absense")
VALUES (67, 37, 5, 2, 1, NULL);

INSERT INTO "DocumentSignatory" ("Id", "AccountId", "SignatoryTypeId", "SignatoryId", "DocumentType", "Absense")
VALUES (68, 37, 4, 3, 1, true);

INSERT INTO "DocumentSignatory" ("Id", "AccountId", "SignatoryTypeId", "SignatoryId", "DocumentType", "Absense")
VALUES (69, 37, 4, 3, 2, true);

INSERT INTO "DocumentSignatory" ("Id", "AccountId", "SignatoryTypeId", "SignatoryId", "DocumentType", "Absense")
VALUES (70, 42, 2, 1, 1, NULL);

INSERT INTO "DocumentSignatory" ("Id", "AccountId", "SignatoryTypeId", "SignatoryId", "DocumentType", "Absense")
VALUES (71, 42, 6, 1, 1, NULL);

INSERT INTO "DocumentSignatory" ("Id", "AccountId", "SignatoryTypeId", "SignatoryId", "DocumentType", "Absense")
VALUES (72, 42, 3, 1, 1, true);

INSERT INTO "DocumentSignatory" ("Id", "AccountId", "SignatoryTypeId", "SignatoryId", "DocumentType", "Absense")
VALUES (73, 42, 4, 1, 2, true);

INSERT INTO "DocumentSignatory" ("Id", "AccountId", "SignatoryTypeId", "SignatoryId", "DocumentType", "Absense")
VALUES (74, 43, 2, 1, 1, false);

INSERT INTO "DocumentSignatory" ("Id", "AccountId", "SignatoryTypeId", "SignatoryId", "DocumentType", "Absense")
VALUES (75, 43, 5, 1, 1, false);

INSERT INTO "DocumentSignatory" ("Id", "AccountId", "SignatoryTypeId", "SignatoryId", "DocumentType", "Absense")
VALUES (76, 43, 3, 1, 1, true);

INSERT INTO "DocumentSignatory" ("Id", "AccountId", "SignatoryTypeId", "SignatoryId", "DocumentType", "Absense")
VALUES (77, 43, 3, 1, 2, true);

--
-- Data for table "Ordering"."Invoice" (OID = 25004) (LIMIT 0,11)
--
INSERT INTO "Invoice" ("Id", "AccountId", "Number", "Date", "DeliveredDateProtocolNumber", "DeliveredDateProtocolDate")
VALUES (26, 33, 'ΤΥΠΒ022942', '2019-01-01', 97620, '2019-01-01');

INSERT INTO "Invoice" ("Id", "AccountId", "Number", "Date", "DeliveredDateProtocolNumber", "DeliveredDateProtocolDate")
VALUES (27, 34, 'ΤΥΠΒ022942', '2019-01-01', 97620, '2019-01-01');

INSERT INTO "Invoice" ("Id", "AccountId", "Number", "Date", "DeliveredDateProtocolNumber", "DeliveredDateProtocolDate")
VALUES (20, 27, 'ΤΥΠΒ022942', '2019-01-01', 97621, '2019-01-01');

INSERT INTO "Invoice" ("Id", "AccountId", "Number", "Date", "DeliveredDateProtocolNumber", "DeliveredDateProtocolDate")
VALUES (28, 35, 'ΤΥΠΒ022942', '2019-01-01', 97621, '2019-01-01');

INSERT INTO "Invoice" ("Id", "AccountId", "Number", "Date", "DeliveredDateProtocolNumber", "DeliveredDateProtocolDate")
VALUES (24, 31, 'ΤΥΠΒ022942', '2019-01-01', 97620, '2019-01-01');

INSERT INTO "Invoice" ("Id", "AccountId", "Number", "Date", "DeliveredDateProtocolNumber", "DeliveredDateProtocolDate")
VALUES (29, 37, '19', '2019-07-04', 97620, '2019-01-01');

INSERT INTO "Invoice" ("Id", "AccountId", "Number", "Date", "DeliveredDateProtocolNumber", "DeliveredDateProtocolDate")
VALUES (30, 42, 'ΤΥΠΒ022942', '2019-01-01', 97620, '2019-01-01');

INSERT INTO "Invoice" ("Id", "AccountId", "Number", "Date", "DeliveredDateProtocolNumber", "DeliveredDateProtocolDate")
VALUES (31, 43, 'ΤΥΠΒ022942', '2019-01-01', 97620, '2019-01-01');

INSERT INTO "Invoice" ("Id", "AccountId", "Number", "Date", "DeliveredDateProtocolNumber", "DeliveredDateProtocolDate")
VALUES (22, 29, 'ΤΥΠΒ022942', '2019-01-01', 97620, '2019-01-01');

INSERT INTO "Invoice" ("Id", "AccountId", "Number", "Date", "DeliveredDateProtocolNumber", "DeliveredDateProtocolDate")
VALUES (23, 30, 'ΤΥΠΒ022942', '2019-01-01', 97620, '2019-01-01');

INSERT INTO "Invoice" ("Id", "AccountId", "Number", "Date", "DeliveredDateProtocolNumber", "DeliveredDateProtocolDate")
VALUES (21, 28, 'ΤΥΠΒ022942', '2019-01-01', 97620, '2019-01-01');

--
-- Data for table "Ordering"."Signatory" (OID = 25009) (LIMIT 0,4)
--
INSERT INTO "Signatory" ("Id", "Name")
VALUES (1, 'ΦΩΤΕΙΝΗ ΤΣΟΤΡΑ');

INSERT INTO "Signatory" ("Id", "Name")
VALUES (2, 'ΙΩΑΝΝΗΣ ΧΑΤΖΗΕΥΣΤΡΑΤΙΟΥ');

INSERT INTO "Signatory" ("Id", "Name")
VALUES (3, 'ΠΑΠΑΚΩΝΣΤΑΝΤΙΝΟΥ – ΠΑΠΑΔΟΠΟΥΛΟΥ ΕΛΛΗ');

INSERT INTO "Signatory" ("Id", "Name")
VALUES (4, 'ΔΡ. ΟΥΡΑΝΙΑ ΚΑΚΡΙΔΑ');

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
VALUES (2, 'Ε.Α.Α.ΔΗ.ΣΥ.', 0.07, 3, 20, true, 1);

INSERT INTO "Reservations" ("Id", "Name", "Percentage", "Stamp", "StampOGA", "IsReservation", "Order")
VALUES (5, 'Α.Ε.Π.Π', 0.06, 3, 20, true, 2);

INSERT INTO "Reservations" ("Id", "Name", "Percentage", "Stamp", "StampOGA", "IsReservation", "Order")
VALUES (8, 'Φ.Ε.', 8, NULL, NULL, true, 3);

INSERT INTO "Reservations" ("Id", "Name", "Percentage", "Stamp", "StampOGA", "IsReservation", "Order")
VALUES (23, 'Φ.Π.Α.', 24, NULL, NULL, false, NULL);

--
-- Data for table "Ordering"."Agencies" (OID = 25162) (LIMIT 0,2)
--
INSERT INTO "Agencies" ("Id", "Name")
VALUES (1, 'Εταιρεία Ανάπτυξης και Τουριστικής Προβολής Αθηνών (ΕΑΤΑ)');

INSERT INTO "Agencies" ("Id", "Name")
VALUES (2, 'ΔΑΕΜ Α.Ε. - Ανώνυμη Αναπτυξιακή Εταιρεία Μηχανογράφησης & Επιχειρησιακών Μονάδων ΟΤΑ του Δήμου Αθηναίων
');

--
-- Data for table "Ordering"."User" (OID = 25267) (LIMIT 0,2)
--
INSERT INTO "User" ("Id", "Username", "Password", "Role")
VALUES (3, 'admin', '$2a$10$RiTpjkWsU4.n/EPjHvMmoOXdpRBM0Dn.WVoOMUVz2bdc6xfq9hjKe', 1);

INSERT INTO "User" ("Id", "Username", "Password", "Role")
VALUES (4, 'dvasilakis', '$2a$10$garRdP9dHno9poUNHgd3C.qfxI0eVcRAVMYOfmFELz9ysm.gcB8hu', 1);

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
-- Data for sequence "Ordering"."AAY_Id_seq" (OID = 24949)
--
SELECT pg_catalog.setval('"AAY_Id_seq"', 37, true);
--
-- Data for sequence "Ordering"."Account_Id_seq" (OID = 24957)
--
SELECT pg_catalog.setval('"Account_Id_seq"', 43, true);
--
-- Data for sequence "Ordering"."CC_Id_seq" (OID = 24962)
--
SELECT pg_catalog.setval('"CC_Id_seq"', 68, true);
--
-- Data for sequence "Ordering"."Concessionaire_Id_seq" (OID = 24970)
--
SELECT pg_catalog.setval('"Concessionaire_Id_seq"', 6, true);
--
-- Data for sequence "Ordering"."ContractType_Id_seq" (OID = 24981)
--
SELECT pg_catalog.setval('"ContractType_Id_seq"', 15, true);
--
-- Data for sequence "Ordering"."Contract_Id_seq" (OID = 24983)
--
SELECT pg_catalog.setval('"Contract_Id_seq"', 45, true);
--
-- Data for sequence "Ordering"."Department_Id_seq" (OID = 24991)
--
SELECT pg_catalog.setval('"Department_Id_seq"', 49, true);
--
-- Data for sequence "Ordering"."Direction_Id_seq" (OID = 24999)
--
SELECT pg_catalog.setval('"Direction_Id_seq"', 19, true);
--
-- Data for sequence "Ordering"."Invoice_Id_seq" (OID = 25007)
--
SELECT pg_catalog.setval('"Invoice_Id_seq"', 31, true);
--
-- Data for sequence "Ordering"."SignatoryType_Id_seq" (OID = 25015)
--
SELECT pg_catalog.setval('"SignatoryType_Id_seq"', 8, true);
--
-- Data for sequence "Ordering"."Signatory_Id_seq" (OID = 25017)
--
SELECT pg_catalog.setval('"Signatory_Id_seq"', 6, true);
--
-- Data for sequence "Ordering"."Reservations_Id_seq" (OID = 25134)
--
SELECT pg_catalog.setval('"Reservations_Id_seq"', 26, true);
--
-- Data for sequence "Ordering"."MunicipalAgencies_Id_seq" (OID = 25160)
--
SELECT pg_catalog.setval('"MunicipalAgencies_Id_seq"', 9, true);
--
-- Data for sequence "Ordering".documentsignatory_id_seq (OID = 25203)
--
SELECT pg_catalog.setval('documentsignatory_id_seq', 77, true);
--
-- Data for sequence "Ordering"."User_Id_seq" (OID = 25265)
--
SELECT pg_catalog.setval('"User_Id_seq"', 18, true);
--
-- Data for sequence "Ordering"."UserRoles_Id_seq" (OID = 25279)
--
SELECT pg_catalog.setval('"UserRoles_Id_seq"', 6, true);
--
-- Data for sequence "Ordering"."LogError_Id_seq" (OID = 25295)
--
SELECT pg_catalog.setval('"LogError_Id_seq"', 39, true);
