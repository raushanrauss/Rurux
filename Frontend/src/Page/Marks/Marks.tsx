import React, { useEffect, useState } from "react";

interface Mark {
  id: number;
  studentName: string;
  stream: string;
  subject: string;
  marks: number;
}

const Marks: React.FC = () => {
  const [marks, setMarks] = useState<Mark[]>([]);
  const [editingMark, setEditingMark] = useState<Mark | null>(null);
  const [newMark, setNewMark] = useState<Partial<Mark>>({
    studentName: "",
    stream: "",
    subject: "",
    marks: 0,
  });

  useEffect(() => {
    fetchMarks();
  }, []);

  const fetchMarks = () => {
    fetch("https://rurux-1.onrender.com/mark/", {
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
      .then((data: Mark[]) => {
        setMarks(data);
      })
      .catch((err) => {
        alert(err);
      });
  };

  const handleDelete = (id: number) => {
    fetch(`https://rurux-1.onrender.com/mark/delete/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("adminToken")}` || "",
      },
    })
      .then((res) => {
        if (res.ok) {
          fetchMarks();
        } else {
          throw new Error("Network response was not ok");
        }
      })
      .catch((err) => {
        alert(err);
      });
  };

  const handleEdit = (mark: Mark) => {
    setEditingMark(mark);
  };

  const handleSubmitEdit = () => {
    if (!editingMark) return;

    fetch(`https://rurux-1.onrender.com/mark/update/${editingMark.id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("adminToken")}` || "",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editingMark),
    })
      .then((res) => {
        if (res.ok) {
          fetchMarks();
          setEditingMark(null);
        } else {
          throw new Error("Network response was not ok");
        }
      })
      .catch((err) => {
        alert(err);
      });
  };

  const handleAddMark = () => {
    fetch("https://rurux-1.onrender.com/mark/add", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("adminToken")}` || "",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMark),
    })
      .then((res) => {
        if (res.ok) {
          fetchMarks();
          setNewMark({
            studentName: "",
            stream: "",
            subject: "",
            marks: 0,
          });
        } else {
          throw new Error("Network response was not ok");
        }
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <div className="container mx-auto">
      <div className="my-8">
        <input
          type="text"
          placeholder="Student Name"
          className="p-2 mb-2 border rounded"
          value={newMark.studentName}
          onChange={(e) =>
            setNewMark({ ...newMark, studentName: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Stream"
          className="p-2 mb-2 border rounded"
          value={newMark.stream}
          onChange={(e) => setNewMark({ ...newMark, stream: e.target.value })}
        />
        <input
          type="text"
          placeholder="Subject"
          className="p-2 mb-2 border rounded"
          value={newMark.subject}
          onChange={(e) => setNewMark({ ...newMark, subject: e.target.value })}
        />
        <input
          type="number"
          placeholder="Marks"
          className="p-2 mb-2 border rounded"
          value={newMark.marks}
          onChange={(e) => setNewMark({ ...newMark, marks: +e.target.value })}
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleAddMark}
        >
          Add Mark
        </button>
      </div>
      {marks.map((mark) => (
        <div key={mark.id} className="my-4 p-4 border rounded">
          <div>Student Name: {mark.studentName}</div>
          <div>Stream: {mark.stream}</div>
          <div>Subject: {mark.subject}</div>
          <div>Marks: {mark.marks}</div>
          <button
            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded mr-2 mt-2"
            onClick={() => handleEdit(mark)}
          >
            Edit
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded mt-2"
            onClick={() => handleDelete(mark.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default Marks;
