import React, { useContext, useEffect, useState } from "react";
import { StudentContext } from "../../context/student";

const Profile: React.FC = () => {
  const [details, setDetails] = useState<{
    name: string;
    stream: number;
    subject: number;
  } | null>(null);
  const { streams, subjects } = useContext(StudentContext);

  useEffect(() => {
    getDetails();
  }, []);

  const getDetails = () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch("https://rurux-1.onrender.com/user/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          throw Error(res.error);
        }
        setDetails(res);
      })
      .catch((err) => alert(err));
  };

  if (!details) return null;

  return (
    <div className="bg-white shadow-md rounded-md p-6">
      <h2 className="text-2xl font-bold mb-4">Profile Page:</h2>
      <div className="mb-4">
        <span className="font-bold">Name:</span> {details?.name}
      </div>
      <div className="mb-4">
        <span className="font-bold">Stream:</span>{" "}
        {streams.find((stream) => stream.id == details.stream)?.name}
      </div>
      <div>
        <span className="font-bold">Subject:</span>{" "}
        {subjects.find((subject) => subject.id == details.subject)?.name}
      </div>
    </div>
  );
};

export default Profile;
