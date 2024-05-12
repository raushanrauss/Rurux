-- CreateTable
CREATE TABLE "Student" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "stream" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Streams" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Subject" (
    "name" TEXT NOT NULL,
    "stream" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Marks" (
    "studentName" TEXT NOT NULL,
    "stream" TEXT NOT NULL,
    "subjects" TEXT NOT NULL,
    "marks" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Student_email_key" ON "Student"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Streams_id_key" ON "Streams"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Subject_stream_key" ON "Subject"("stream");

-- CreateIndex
CREATE UNIQUE INDEX "Marks_studentName_key" ON "Marks"("studentName");

-- CreateIndex
CREATE UNIQUE INDEX "Marks_stream_key" ON "Marks"("stream");

-- CreateIndex
CREATE UNIQUE INDEX "Marks_subjects_key" ON "Marks"("subjects");
