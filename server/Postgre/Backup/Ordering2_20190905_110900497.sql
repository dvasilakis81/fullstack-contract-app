--
-- PostgreSQL database dump
--

-- Dumped from database version 11.2
-- Dumped by pg_dump version 11.1

-- Started on 2019-09-05 11:09:00

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_with_oids = false;

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
-- TOC entry 2905 (class 0 OID 0)
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
-- TOC entry 2906 (class 0 OID 0)
-- Dependencies: 210
-- Name: Direction_Id_seq; Type: SEQUENCE OWNED BY; Schema: Ordering; Owner: dvasilakis
--

ALTER SEQUENCE "Ordering"."Direction_Id_seq" OWNED BY "Ordering"."Direction"."DirectionId";


--
-- TOC entry 2768 (class 2604 OID 25025)
-- Name: Department DepartmentId; Type: DEFAULT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."Department" ALTER COLUMN "DepartmentId" SET DEFAULT nextval('"Ordering"."Department_Id_seq"'::regclass);


--
-- TOC entry 2769 (class 2604 OID 25026)
-- Name: Direction DirectionId; Type: DEFAULT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."Direction" ALTER COLUMN "DirectionId" SET DEFAULT nextval('"Ordering"."Direction_Id_seq"'::regclass);


--
-- TOC entry 2896 (class 0 OID 24985)
-- Dependencies: 207
-- Data for Name: Department; Type: TABLE DATA; Schema: Ordering; Owner: dvasilakis
--

INSERT INTO "Ordering"."Department" ("DepartmentId", "DirectionId", "DepartmentName", "DepartmentSupervisor", "DepartmentTelephone", "DepartmentEmail") VALUES (62, 21, 'Διοικητικής Υποστήριξης & Ηλεκτρονικής Διακυβέρνησης', 'Τάτση Ζαφειρούλα', '210 5277938', 't.dioikitikis.ypostirixis.astikis.katastasis@athens.gr');
INSERT INTO "Ordering"."Department" ("DepartmentId", "DirectionId", "DepartmentName", "DepartmentSupervisor", "DepartmentTelephone", "DepartmentEmail") VALUES (63, 21, 'Έκδοσης Πιστοποιητικών', 'Κοντού Αικατερίνη', '210 3722067', 't.ekd.pistopoiitikon@athens.gr');
INSERT INTO "Ordering"."Department" ("DepartmentId", "DirectionId", "DepartmentName", "DepartmentSupervisor", "DepartmentTelephone", "DepartmentEmail") VALUES (64, 21, 'Μητρώου Αρρένων', 'Καγιά - Παναγοπούλου Αμαλία', '210 3722119', 't.mitroou.arrenon@athens.gr');
INSERT INTO "Ordering"."Department" ("DepartmentId", "DirectionId", "DepartmentName", "DepartmentSupervisor", "DepartmentTelephone", "DepartmentEmail") VALUES (65, 21, 'Ιθαγένειας, Δημοτολογίου και Εκλογικών Καταλόγων', 'Τσιχριτζή Αμαλία', '210 3722102', ' t.ith.dimotologiou@athens.gr');
INSERT INTO "Ordering"."Department" ("DepartmentId", "DirectionId", "DepartmentName", "DepartmentSupervisor", "DepartmentTelephone", "DepartmentEmail") VALUES (10, 3, 'Προμηθειών, Προγραμματισμού, Τεκμηρίωσης Αιτημάτων και Ηλεκτρονικής Διακυβέρνησης', 'Μπουρνά Βούλα', '210.5225617', 't.promitheion@athens.gr');
INSERT INTO "Ordering"."Department" ("DepartmentId", "DirectionId", "DepartmentName", "DepartmentSupervisor", "DepartmentTelephone", "DepartmentEmail") VALUES (11, 3, 'Διαδικασιών Σύναψης Δημοσίων Συμβάσεων', 'Μπιμπούδης Παναγιώτης', '213.2082956', 't.prom.dimoprasies@athens.gr');
INSERT INTO "Ordering"."Department" ("DepartmentId", "DirectionId", "DepartmentName", "DepartmentSupervisor", "DepartmentTelephone", "DepartmentEmail") VALUES (12, 3, 'Αποθηκών Υλικών', 'Κακριδά  Άννα', '210.5225068', 't.apothikon.ylikon@athens.gr');
INSERT INTO "Ordering"."Department" ("DepartmentId", "DirectionId", "DepartmentName", "DepartmentSupervisor", "DepartmentTelephone", "DepartmentEmail") VALUES (13, 3, 'Διαχείρισης Καυσίμων και Λιπαντικών', 'Τσιλάβης Γεώργιος', '210.3460146', 't.diax.kausimon.lipantikon@athens.gr');
INSERT INTO "Ordering"."Department" ("DepartmentId", "DirectionId", "DepartmentName", "DepartmentSupervisor", "DepartmentTelephone", "DepartmentEmail") VALUES (4, 2, 'Τεχνολογίας, Πληροφορικής και Επικοινωνιών', 'Χατζηευστρατίου Ιωάννης', '210.5277169', 'i.chatzieustratiou@athens.gr');
INSERT INTO "Ordering"."Department" ("DepartmentId", "DirectionId", "DepartmentName", "DepartmentSupervisor", "DepartmentTelephone", "DepartmentEmail") VALUES (5, 2, 'Ανθεκτικότητας και Βιωσιμότητας', 'Νεοφύτου Γεώργιος', '210.3721553', 't.anthektikotitas.biosimotitas@athens.gr');
INSERT INTO "Ordering"."Department" ("DepartmentId", "DirectionId", "DepartmentName", "DepartmentSupervisor", "DepartmentTelephone", "DepartmentEmail") VALUES (7, 2, 'Στρατηγικού Σχεδιασμού και Προγραμματισμού', 'Κοντώσης Ηλίας', '210.5277160', 't.stratigikou.sxediasmou.progr@athens.gr');
INSERT INTO "Ordering"."Department" ("DepartmentId", "DirectionId", "DepartmentName", "DepartmentSupervisor", "DepartmentTelephone", "DepartmentEmail") VALUES (6, 2, 'Καινοτομίας και Εξωστρέφειας', 'Παπακωνσταντίνου - Παπαδοπούλου Έλλη', '210.5277109', 't.kainotomias.exostrefias@athens.gr');
INSERT INTO "Ordering"."Department" ("DepartmentId", "DirectionId", "DepartmentName", "DepartmentSupervisor", "DepartmentTelephone", "DepartmentEmail") VALUES (66, 21, 'Γεννήσεων', 'Δασκαλάκη Ανδριάνα', '210 5277987', 't.genniseon@athens.gr');
INSERT INTO "Ordering"."Department" ("DepartmentId", "DirectionId", "DepartmentName", "DepartmentSupervisor", "DepartmentTelephone", "DepartmentEmail") VALUES (3, 2, 'Διαχείρισης Γεωχωρικών Δεδομένων Πόλεως
', 'Μαρούγκα Κωνσταντίνα', '210.5277185', 't.gis@athens.gr');
INSERT INTO "Ordering"."Department" ("DepartmentId", "DirectionId", "DepartmentName", "DepartmentSupervisor", "DepartmentTelephone", "DepartmentEmail") VALUES (14, 2, 'test create new department', 'myself', '2154854654', 'dvasialskdf@asdfsd.com');
INSERT INTO "Ordering"."Department" ("DepartmentId", "DirectionId", "DepartmentName", "DepartmentSupervisor", "DepartmentTelephone", "DepartmentEmail") VALUES (67, 21, 'Γάμων – Θανάτων', 'Φρανσέ Αλέγρη', '210 5277966', 't.gamon.thanaton@athens.gr');
INSERT INTO "Ordering"."Department" ("DepartmentId", "DirectionId", "DepartmentName", "DepartmentSupervisor", "DepartmentTelephone", "DepartmentEmail") VALUES (68, 21, 'Πολιτικών Γάμων', 'Θεωνά Ελένη-Άννα', '210 3722165', 't.politikon.gamon@athens.gr');
INSERT INTO "Ordering"."Department" ("DepartmentId", "DirectionId", "DepartmentName", "DepartmentSupervisor", "DepartmentTelephone", "DepartmentEmail") VALUES (49, 2, 'bn_2', 'bn1', 'bn1', 'bn1');
INSERT INTO "Ordering"."Department" ("DepartmentId", "DirectionId", "DepartmentName", "DepartmentSupervisor", "DepartmentTelephone", "DepartmentEmail") VALUES (2, 2, 'Διοικητικής Υποστήριξης, Τεκμηρίωσης και Ηλεκτρονικής Διακυβέρνησης', 'Πριόβολου Καλλιόπη', '210.5277110', 't.dioikitikis.ypostirixis.strat.sxed@athens.gr');
INSERT INTO "Ordering"."Department" ("DepartmentId", "DirectionId", "DepartmentName", "DepartmentSupervisor", "DepartmentTelephone", "DepartmentEmail") VALUES (50, 15, 'Διοικητικής Υποστήριξης & Ηλεκτρονικής Διακυβέρνησης', 'Γιώργος Σκαφίδας', '210 5277071', 't.dioikitikis.ypostirixis.apokentrosi@athens.gr');
INSERT INTO "Ordering"."Department" ("DepartmentId", "DirectionId", "DepartmentName", "DepartmentSupervisor", "DepartmentTelephone", "DepartmentEmail") VALUES (52, 15, 'Εξυπηρέτησης Δημοτών και Επαγγελματιών 1ης Δημοτικής Κοινότητας', 'Σταματογιαννόπουλος Νικόλαος', '210 5277963', 't.dk1@athens.gr');
INSERT INTO "Ordering"."Department" ("DepartmentId", "DirectionId", "DepartmentName", "DepartmentSupervisor", "DepartmentTelephone", "DepartmentEmail") VALUES (53, 15, 'Εξυπηρέτησης Δημοτών και Επαγγελματιών 2ης Δημοτικής Κοινότητας', 'Καραθανάση Βαρβάρα', '210 7567860', 't.dk2@athens.gr');
INSERT INTO "Ordering"."Department" ("DepartmentId", "DirectionId", "DepartmentName", "DepartmentSupervisor", "DepartmentTelephone", "DepartmentEmail") VALUES (54, 15, 'Εξυπηρέτησης Δημοτών και Επαγγελματιών 3ης Δημοτικής Κοινότητας', 'Τσιπούρα Ελένη', '210 3424343', 't.dk3@athens.gr');
INSERT INTO "Ordering"."Department" ("DepartmentId", "DirectionId", "DepartmentName", "DepartmentSupervisor", "DepartmentTelephone", "DepartmentEmail") VALUES (55, 15, 'Εξυπηρέτησης Δημοτών και Επαγγελματιών 4ης Δημοτικής Κοινότητας', 'Νανούρης Ιωάννης', '210 5149940', 't.dk4@athens.gr');
INSERT INTO "Ordering"."Department" ("DepartmentId", "DirectionId", "DepartmentName", "DepartmentSupervisor", "DepartmentTelephone", "DepartmentEmail") VALUES (56, 15, 'Εξυπηρέτησης Δημοτών και Επαγγελματιών 5ης Δημοτικής Κοινότητας', 'Νικολάου Κωνσταντίνος', '210 8646790', 't.dk5@athens.gr');
INSERT INTO "Ordering"."Department" ("DepartmentId", "DirectionId", "DepartmentName", "DepartmentSupervisor", "DepartmentTelephone", "DepartmentEmail") VALUES (57, 15, 'Εξυπηρέτησης Δημοτών και Επαγγελματιών 6ης Δημοτικής Κοινότητας', 'Αναγνωστοπούλου Σοφία', '210 8668162', 't.dk6@athens.gr');
INSERT INTO "Ordering"."Department" ("DepartmentId", "DirectionId", "DepartmentName", "DepartmentSupervisor", "DepartmentTelephone", "DepartmentEmail") VALUES (58, 15, 'Εξυπηρέτησης Δημοτών και Επαγγελματιών 7ης Δημοτικής Κοινότητας', 'Μήτσης Νικόλαος', '210 6998832', 't.dk7@athens.gr');
INSERT INTO "Ordering"."Department" ("DepartmentId", "DirectionId", "DepartmentName", "DepartmentSupervisor", "DepartmentTelephone", "DepartmentEmail") VALUES (51, 15, 'Διοικητικού, Εποπτείας και Συντονισμού Δημοτικών Κοινοτήτων', 'Γλάρου Ιωάννα', '210 5277501', 't.dioikitiko@athens.gr');
INSERT INTO "Ordering"."Department" ("DepartmentId", "DirectionId", "DepartmentName", "DepartmentSupervisor", "DepartmentTelephone", "DepartmentEmail") VALUES (59, 20, 'Εξυπηρέτησης Πολιτών', 'Παπαχαραλάμπους Δημήτριος', '210 3303075', 't.exipiretisis.politon@athens.gr');
INSERT INTO "Ordering"."Department" ("DepartmentId", "DirectionId", "DepartmentName", "DepartmentSupervisor", "DepartmentTelephone", "DepartmentEmail") VALUES (60, 20, 'Εσωτερικής Ανταπόκρισης', 'Φεραδούρου Αναστασία', '210 3836871', 't.esoterikis.antapokrisis@athens.gr');
INSERT INTO "Ordering"."Department" ("DepartmentId", "DirectionId", "DepartmentName", "DepartmentSupervisor", "DepartmentTelephone", "DepartmentEmail") VALUES (61, 20, 'Εξωτερικών Εφαρμογών', 'Γούλας Κωνσταντίνος', '210 3836871', 't.exoterikon.efarmogon@athens.gr');


--
-- TOC entry 2898 (class 0 OID 24993)
-- Dependencies: 209
-- Data for Name: Direction; Type: TABLE DATA; Schema: Ordering; Owner: dvasilakis
--

INSERT INTO "Ordering"."Direction" ("DirectionId", "DirectionName", "DirectionSupervisor", "DirectionTelephone", "DirectionEmail", "DirectionAddress", "DirectionPostCode", "DirectionCity") VALUES (3, 'Προμηθειών και Αποθηκών', 'Βακουντούζης Ιωάννης', '210.5225446', 'd.prom.apothikon@athens.gr', 'Κων/νου Παλαιολόγου 9', '104 38', 'Αθήνα');
INSERT INTO "Ordering"."Direction" ("DirectionId", "DirectionName", "DirectionSupervisor", "DirectionTelephone", "DirectionEmail", "DirectionAddress", "DirectionPostCode", "DirectionCity") VALUES (2, 'Στρατηγικού Σχεδιασμού, Ανθεκτικότητας, Καινοτομίας και Τεκμηρίωσης', 'Δρ. Κακριδά Ουρανία', '210.5277110', 'd.stratigikou.sxediasmou@athens.gr', 'Λιοσίων 22', '104 38', 'Αθήνα');
INSERT INTO "Ordering"."Direction" ("DirectionId", "DirectionName", "DirectionSupervisor", "DirectionTelephone", "DirectionEmail", "DirectionAddress", "DirectionPostCode", "DirectionCity") VALUES (15, 'Αποκέντρωσης και Διοίκησης', 'Νεμπεγλεριώτης Ευάγγελος', '210 5277541', 'd.apokentrosi.dioikisi@athens.gr', 'Λιοσίων 22', '104 38', 'Αθήνα');
INSERT INTO "Ordering"."Direction" ("DirectionId", "DirectionName", "DirectionSupervisor", "DirectionTelephone", "DirectionEmail", "DirectionAddress", "DirectionPostCode", "DirectionCity") VALUES (20, 'Κέντρων Εξυπηρέτησης Πολιτών (Κ.Ε.Π)', 'Αυγερινός Δημήτριος', '210 3836522', 'd.kep@athens.gr', 'Ακαδημίας 88', '106 78', 'Αθήνα');
INSERT INTO "Ordering"."Direction" ("DirectionId", "DirectionName", "DirectionSupervisor", "DirectionTelephone", "DirectionEmail", "DirectionAddress", "DirectionPostCode", "DirectionCity") VALUES (21, 'Αστικής Κατάστασης', 'Μπούρη Βασιλική', '210 3722173', 'd.ast.katastasis@athens.gr', 'Αθηνάς 63', '10552', 'Αθήνα');


--
-- TOC entry 2907 (class 0 OID 0)
-- Dependencies: 208
-- Name: Department_Id_seq; Type: SEQUENCE SET; Schema: Ordering; Owner: dvasilakis
--

SELECT pg_catalog.setval('"Ordering"."Department_Id_seq"', 68, true);


--
-- TOC entry 2908 (class 0 OID 0)
-- Dependencies: 210
-- Name: Direction_Id_seq; Type: SEQUENCE SET; Schema: Ordering; Owner: dvasilakis
--

SELECT pg_catalog.setval('"Ordering"."Direction_Id_seq"', 21, true);


--
-- TOC entry 2771 (class 2606 OID 25043)
-- Name: Department Department_pkey; Type: CONSTRAINT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."Department"
    ADD CONSTRAINT "Department_pkey" PRIMARY KEY ("DepartmentId");


--
-- TOC entry 2773 (class 2606 OID 25045)
-- Name: Direction Direction_pkey; Type: CONSTRAINT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."Direction"
    ADD CONSTRAINT "Direction_pkey" PRIMARY KEY ("DirectionId");


--
-- TOC entry 2774 (class 2606 OID 25290)
-- Name: Department Department_fk; Type: FK CONSTRAINT; Schema: Ordering; Owner: dvasilakis
--

ALTER TABLE ONLY "Ordering"."Department"
    ADD CONSTRAINT "Department_fk" FOREIGN KEY ("DirectionId") REFERENCES "Ordering"."Direction"("DirectionId") ON DELETE CASCADE;


-- Completed on 2019-09-05 11:09:01

--
-- PostgreSQL database dump complete
--

