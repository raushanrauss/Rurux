import React, { useContext, useEffect, useState } from "react";
import { StudentContext } from "../../context/student";

const Performance: React.FC = () => {
  const [details, setDetails] = useState<{
    name: string;
    stream: number;
    subject: number;
  }>({ name: "", stream: 0, subject: 0 });
  const { streams, subjects } = useContext(StudentContext);
 

  const getDetails = () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch("https://rurux-1.onrender.com/user/performance", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          throw Error(res.error);
        }
        return res;
      })
      .then((res) => setDetails(res))
      .catch((err) => alert(err));
  };

  useEffect(() => {
    getDetails();
  }, []);

  const streamName = streams.find(
    (stream) => stream.id == details.stream
  )?.name;
  const subjectName = subjects.find(
    (subject) => subject.id == details.subject
  )?.name;

  return (
    <div>
   
      <div>Marks: {details.name}</div>
      <div>Stream: {streamName}</div>
      <div>Subject: {subjectName}</div>
    </div>
  );
};

export default Performance;
