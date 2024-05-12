-- DropIndex
DROP INDEX "Streams_id_key";

-- AlterTable
ALTER TABLE "Marks" ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Marks_pkey" PRIMARY KEY ("id");

-- AlterTable
CREATE SEQUENCE streams_id_seq;
ALTER TABLE "Streams" ALTER COLUMN "id" SET DEFAULT nextval('streams_id_seq'),
ADD CONSTRAINT "Streams_pkey" PRIMARY KEY ("id");
ALTER SEQUENCE streams_id_seq OWNED BY "Streams"."id";

-- AlterTable
ALTER TABLE "Subject" ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Subject_pkey" PRIMARY KEY ("id");
