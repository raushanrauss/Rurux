/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useEffect, useState } from "react";
import { StudentContext } from "../../context/student";

const Profile = () => {
  const [details, setDetails] = useState<{ [key: string]: any }>({});
  const { streams, subjects } = useContext(StudentContext);
  const getDetails = () => {
    fetch("http://localhost:3000/user/profile", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
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
  return (
    <div>
      Profile Page:
      <div>Name: {details.name}</div>
      <div>
        Stream: {streams.find((stream) => stream.id == details.stream)?.name}
      </div>
      <div>
        Subject:{" "}
        {subjects.find((subject) => subject.id == details.subject)?.name}
      </div>
    </div>
  );
};

export default Profile;
