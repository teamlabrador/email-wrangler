const { Client } = require('pg');
const uri = 'postgres://oilleomz:8Y4riCwxL5g3VYrsQ0_yZZEvMKD94Dhq@baasu.db.elephantsql.com:5432/oilleomz'

const db = new Client({
  connectionString: uri,
});
db.connect();

let setupQuery = `
<<<<<<< HEAD
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
=======
CREATE TABLE "Emails" (
	"id" serial NOT NULL,
	"subject" TEXT NOT NULL,
	"CreatedAt" TIMESTAMP NOT NULL DEFAULT 'NOW()',
	"CreatedBy" int NOT NULL,
	"step" TEXT NOT NULL,
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
ALTER TABLE "Sent" ADD CONSTRAINT "Sent_fk1" FOREIGN KEY ("Recepient") REFERENCES "Recepients"("id");`;
>>>>>>> 9b30371945d941a53736aebcabc0866a6d49eedc

  // make SQL queries:
  db.query(createUser, (err, result) => {

    console.log(result, err)
    // close database connection
    // db.end();
  });

module.exports = db;
