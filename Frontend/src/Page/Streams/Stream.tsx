import React, { useEffect, useState } from "react";

interface Stream {
  id: number;
  name: string;
}

const Stream: React.FC = () => {
  const [streams, setStreams] = useState<Stream[]>([]);
  const [newStreamName, setNewStreamName] = useState<string>("");
  const [editingStream, setEditingStream] = useState<Stream | null>(null);
  const [editedStreamName, setEditedStreamName] = useState<string>("");

  useEffect(() => {
    fetchStreams();
  }, []);

  const fetchStreams = () => {
    fetch("https://rurux-1.onrender.com/stream/", {
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
      .then((data: Stream[]) => {
        setStreams(data);
      })
      .catch((err) => {
        alert(err);
      });
  };

  const handleAddStream = () => {
    fetch("https://rurux-1.onrender.com/stream/add", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("adminToken")}` || "",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: newStreamName }),
    })
      .then((res) => {
        if (res.ok) {
          fetchStreams();
          setNewStreamName("");
        } else {
          throw new Error("Network response was not ok");
        }
      })
      .catch((err) => {
        alert(err);
      });
  };

  const handleEdit = (stream: Stream) => {
    setEditingStream(stream);
    setEditedStreamName(stream.name);
  };

  const handleSubmitEdit = () => {
    if (!editingStream) return;

    fetch(`https://rurux-1.onrender.com/stream/update/${editingStream.id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("adminToken")}` || "",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: editedStreamName }),
    })
      .then((res) => {
        if (res.ok) {
          fetchStreams();
          setEditingStream(null);
          setEditedStreamName("");
        } else {
          throw new Error("Network response was not ok");
        }
      })
      .catch((err) => {
        alert(err);
      });
  };

  const handleDelete = (id: number) => {
    fetch(`https://rurux-1.onrender.com/stream/delete/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("adminToken")}` || "",
      },
    })
      .then((res) => {
        if (res.ok) {
          fetchStreams();
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
          className="border rounded py-2 px-4 mr-2 focus:outline-none"
          placeholder="New Stream Name"
          value={newStreamName}
          onChange={(e) => setNewStreamName(e.target.value)}
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
          onClick={handleAddStream}
        >
          Add Stream
        </button>
      </div>
      {streams.map((stream) => (
        <div key={stream.id} className="bg-gray-100 rounded-md p-4 mb-4">
          {editingStream && editingStream.id === stream.id ? (
            <div className="flex items-center">
              <input
                type="text"
                className="border rounded py-2 px-4 mr-2 focus:outline-none"
                value={editedStreamName}
                onChange={(e) => setEditedStreamName(e.target.value)}
              />
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
                onClick={handleSubmitEdit}
              >
                Save
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <div className="text-lg">{stream.name}</div>
              <div>
                <button
                  className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-2 focus:outline-none"
                  onClick={() => handleEdit(stream)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
                  onClick={() => handleDelete(stream.id)}
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

export default Stream;
