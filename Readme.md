1. Currently using Local DB. Need to change in environment Variables
2. Setup Proxy should have the right proxy for backend
3. Add the .env file

4.DATABASE INFORMATION:

---DATABASE CREATION---

CREATE DATABASE assetztracker;

---CONNECTING TO DATABASE---

\c assetztracker

---USERS TABLE CREATION---

CREATE TABLE users (
userid BIGSERIAL NOT NULL,
name VARCHAR(200) NOT NULL,
email VARCHAR(200) NOT NULL UNIQUE,
password VARCHAR(200) NOT NULL,
role VARCHAR(20) NOT NULL DEFAULT 'view',
createby VARCHAR(20) NOT NULL,
createdat TIMESTAMPTZ NOT NULL DEFAULT NOW(),
PRIMARY KEY(userid)
);

---USER TABLE INSERTION(ADMIN)---

INSERT INTO users (name,email, password,role) values ('Rakesh', 'rakesh@example.com','$2y$10$nRlYCXu2zTuDvxhaqmlTR.jopPvQQgTv1Lp4A9rb9HTvdEcc/8oYa','admin', 'System Created');

---USERAUDIT TABLE CREATION---

CREATE TABLE useraudit (
dmltype dmltype NOT NULL,
recordid INT NOT NULL,
oldvalue VARCHAR(500) DEFAULT NULL,
newvalue VARCHAR(500) NOT NULL,
createby VARCHAR(20) NOT NULL,
createdat TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

---TRIGGER AND FUNCTION CREATION---

CREATE TYPE dmltype AS ENUM ('INSERT', 'UPDATE', 'DELETE');

CREATE OR REPLACE FUNCTION user_audit_trigger_func()
RETURNS trigger AS $body$
BEGIN
   if (TG_OP = 'INSERT') then
       INSERT INTO useraudit (
	   dmltype,
           recordid,
           oldvalue,
           newvalue,
           createby
       )
       VALUES(
	   'INSERT',
           NEW.userid,
           null,
           to_jsonb(NEW),
           New.createby
       );
             
       RETURN NEW;
   elsif (TG_OP = 'UPDATE') then
       INSERT INTO useraudit (
           dmltype,
           recordid,
           oldvalue,
           newvalue,
           createby
       )
       VALUES(
	   'UPDATE',
           NEW.userid,
           to_jsonb(OLD),
           to_jsonb(NEW),
           New.createby
       );
             
       RETURN NEW;
   elsif (TG_OP = 'DELETE') then
       INSERT INTO useraudit (
           dmltype,
           recordid,
           oldvalue,
           newvalue,
           createby
       )
       VALUES(
	   'DELETE',
           OLD.userid,
           to_jsonb(OLD),
           'Record Deleted',
           OLD.createby
       );
        
       RETURN OLD;
   end if;
     
END;
$body$
LANGUAGE plpgsql

CREATE TRIGGER user_audit_trigger
AFTER INSERT OR UPDATE OR DELETE ON users
FOR EACH ROW EXECUTE FUNCTION user_audit_trigger_func();

---ASSET TABLE CREATION---

CREATE TABLE asset(
	id serial NOT NULL PRIMARY KEY,
	userid bigint, 
	onboard json NOT NULL,
	software jsonb,
	hardware jsonb,
	depreciation json,
FOREIGN KEY(userid) 
      REFERENCES users(userid)
);
