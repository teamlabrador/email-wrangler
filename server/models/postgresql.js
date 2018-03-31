const { Client } = require('pg');
const uri = 'postgres://oilleomz:8Y4riCwxL5g3VYrsQ0_yZZEvMKD94Dhq@baasu.db.elephantsql.com:5432/oilleomz'

const db = new Client({
  connectionString: uri,
});
db.connect();

let setupQuery = `
CREATE TABLE "Emails" (
	"id" serial NOT NULL,
	"subject" TEXT NOT NULL,
	"createdAt" TIMESTAMP NOT NULL DEFAULT 'NOW()',
	"createdById" int NOT NULL,
	"stepId" int NOT NULL,
	CONSTRAINT Emails_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "Users" (
	"id" serial NOT NULL UNIQUE,
	"username" TEXT NOT NULL UNIQUE,
	"email" TEXT NOT NULL UNIQUE,
	"firstName" TEXT NOT NULL,
	"lastName" TEXT NOT NULL,
	"createdAt" TIMESTAMP NOT NULL DEFAULT 'NOW()',
	CONSTRAINT Users_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "Messages" (
	"id" serial NOT NULL,
	"message" TEXT NOT NULL,
	"emailId" int NOT NULL,
	"createdById" int NOT NULL,
	"createdAt" TIMESTAMP NOT NULL DEFAULT 'NOW()',
	CONSTRAINT Messages_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "Recipients" (
	"id" serial NOT NULL,
	"messageId" int NOT NULL,
	"recipientId" int NOT NULL,
	"typeId" int NOT NULL,
	CONSTRAINT Recipients_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "Sent" (
	"id" serial NOT NULL,
	"messageId" int NOT NULL,
	"recipientId" int NOT NULL,
	"createdAt" TIMESTAMP NOT NULL DEFAULT 'NOW()',
	CONSTRAINT Sent_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "Steps" (
	"id" serial NOT NULL,
	"step" TEXT NOT NULL UNIQUE,
	CONSTRAINT Steps_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



ALTER TABLE "Emails" ADD CONSTRAINT "Emails_fk0" FOREIGN KEY ("createdById") REFERENCES "Users"("id");
ALTER TABLE "Emails" ADD CONSTRAINT "Emails_fk1" FOREIGN KEY ("stepId") REFERENCES "Steps"("id");


ALTER TABLE "Messages" ADD CONSTRAINT "Messages_fk0" FOREIGN KEY ("emailId") REFERENCES "Emails"("id");
ALTER TABLE "Messages" ADD CONSTRAINT "Messages_fk1" FOREIGN KEY ("createdById") REFERENCES "Users"("id");

ALTER TABLE "Recipients" ADD CONSTRAINT "Recipients_fk0" FOREIGN KEY ("messageId") REFERENCES "Emails"("id");
ALTER TABLE "Recipients" ADD CONSTRAINT "Recipients_fk1" FOREIGN KEY ("recipientId") REFERENCES "Users"("id");
ALTER TABLE "Recipients" ADD CONSTRAINT "Recipients_fk2" FOREIGN KEY ("typeId") REFERENCES "Steps"("id");

ALTER TABLE "Sent" ADD CONSTRAINT "Sent_fk0" FOREIGN KEY ("messageId") REFERENCES "Messages"("id");
ALTER TABLE "Sent" ADD CONSTRAINT "Sent_fk1" FOREIGN KEY ("recipientId") REFERENCES "Recipients"("id");
`
  // make SQL queries:
  db.query(createUser, (err, result) => {

    console.log(result, err)
    // close database connection
    // db.end();
  });





module.exports = db;
