import React, { useEffect, useState } from "react";

interface Subject {
  id: number;
  name: string;
  stream: string;
}

const Subjects: React.FC = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [editingSubject, setEditingSubject] = useState<Subject | null>(null);
  const [editedName, setEditedName] = useState<string>("");
  const [editedStream, setEditedStream] = useState<string>("");
  const [newSubjectName, setNewSubjectName] = useState<string>("");
  const [newSubjectStream, setNewSubjectStream] = useState<string>("");

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = () => {
    fetch("http://localhost:3000/subject/", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("adminToken")}` || "",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Network response was not ok");
        }
      })
      .then((data: { subjects: Subject[] }) => {
        setSubjects(data.subjects);
      })
      .catch((err) => {
        alert(err);
      });
  };

  const handleDelete = (id: number) => {
    fetch(`http://localhost:3000/subject/delete/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("adminToken")}` || "",
      },
    })
      .then((res) => {
        if (res.ok) {
          fetchSubjects();
        } else {
          throw new Error("Network response was not ok");
        }
      })
      .catch((err) => {
        alert(err);
      });
  };

  const handleEdit = (subject: Subject) => {
    setEditingSubject(subject);
    setEditedName(subject.name);
    setEditedStream(subject.stream);
  };

  const handleSubmitEdit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!editingSubject) return;

    fetch(`http://localhost:3000/subject/update/${editingSubject.id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("adminToken")}` || "",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: editedName,
        stream: editedStream,
      }),
    })
      .then((res) => {
        if (res.ok) {
          fetchSubjects();
          setEditingSubject(null);
          setEditedName("");
          setEditedStream("");
        } else {
          throw new Error("Network response was not ok");
        }
      })
      .catch((err) => {
        alert(err);
      });
  };

  const handleAddSubject = () => {
    fetch("http://localhost:3000/subject/add", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("adminToken")}` || "",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: newSubjectName,
        stream: newSubjectStream,
      }),
    })
      .then((res) => {
        if (res.ok) {
          fetchSubjects();
          setNewSubjectName("");
          setNewSubjectStream("");
        } else {
          throw new Error("Network response was not ok");
        }
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <div className="container mx-auto mt-8">
      <div className="flex items-center mb-4">
        <input
          type="text"
          placeholder="Name"
          className="border rounded py-2 px-4 mr-2 focus:outline-none"
          value={newSubjectName}
          onChange={(e) => setNewSubjectName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Stream"
          className="border rounded py-2 px-4 mr-2 focus:outline-none"
          value={newSubjectStream}
          onChange={(e) => setNewSubjectStream(e.target.value)}
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
          onClick={handleAddSubject}
        >
          Add Subject
        </button>
      </div>
      {subjects.map((subject) => (
        <div key={subject.id} className="bg-gray-100 rounded-md p-4 mb-4">
          {editingSubject && editingSubject.id === subject.id ? (
            <form onSubmit={handleSubmitEdit}>
              <div className="flex items-center">
                <input
                  type="text"
                  className="border rounded py-2 px-4 mr-2 focus:outline-none"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                />
                <input
                  type="text"
                  className="border rounded py-2 px-4 mr-2 focus:outline-none"
                  value={editedStream}
                  onChange={(e) => setEditedStream(e.target.value)}
                />
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
                >
                  Save
                </button>
              </div>
            </form>
          ) : (
            <div className="flex items-center justify-between">
              <div className="text-lg">{subject.name}</div>
              <div>{subject.stream}</div>
              <div>
                <button
                  className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-2 focus:outline-none"
                  onClick={() => handleEdit(subject)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
                  onClick={() => handleDelete(subject.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Subjects;
