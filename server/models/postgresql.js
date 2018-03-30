const { Client } = require('pg');
const config = require('../config.json');

const db = new Client({
  connectionString: config.uri,
});
db.connect();

let setupQuery = `
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
  	"Author" int NOT NULL,
  	"messageId" int NOT NULL,
  	"createdAt" TIMESTAMP NOT NULL DEFAULT 'NOW()',
  	CONSTRAINT Messages_pk PRIMARY KEY ("id")
  ) WITH (
    OIDS=FALSE
  );

  CREATE TABLE "Recepients" (
  	"id" serial NOT NULL,
  	"messageId" int NOT NULL,
  	"recepient" int NOT NULL,
  	"type" TEXT NOT NULL,
  	CONSTRAINT Recepients_pk PRIMARY KEY ("id")
  ) WITH (
    OIDS=FALSE
  );

  CREATE TABLE "Sent" (
  	"id" serial NOT NULL,
  	"messageId" int NOT NULL,
  	"Recepient" int NOT NULL,
  	"createdAt" TIMESTAMP NOT NULL DEFAULT 'NOW()',
  	CONSTRAINT Sent_pk PRIMARY KEY ("id")
  ) WITH (
    OIDS=FALSE
  );

  ALTER TABLE "Emails" ADD CONSTRAINT "Emails_fk0" FOREIGN KEY ("CreatedBy") REFERENCES "Users"("id");

  ALTER TABLE "Messages" ADD CONSTRAINT "Messages_fk0" FOREIGN KEY ("Author") REFERENCES "Users"("id");
  ALTER TABLE "Messages" ADD CONSTRAINT "Messages_fk1" FOREIGN KEY ("messageId") REFERENCES "Emails"("id");

  ALTER TABLE "Recepients" ADD CONSTRAINT "Recepients_fk0" FOREIGN KEY ("messageId") REFERENCES "Emails"("id");
  ALTER TABLE "Recepients" ADD CONSTRAINT "Recepients_fk1" FOREIGN KEY ("recepient") REFERENCES "Users"("id");

  ALTER TABLE "Sent" ADD CONSTRAINT "Sent_fk0" FOREIGN KEY ("messageId") REFERENCES "Messages"("id");
  ALTER TABLE "Sent" ADD CONSTRAINT "Sent_fk1" FOREIGN KEY ("Recepient") REFERENCES "Recepients"("id") returning *
`;

  // make SQL queries:
  db.query(setupQuery, (err, result) => {

    console.log(result.rows[0])
    // close database connection
    // db.end();
  });





module.exports = db;
