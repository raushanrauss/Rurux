/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, ReactNode, useEffect, useState } from "react";

export const StudentContext = createContext<{ [key: string]: any }>({});

function StudentContextProvider({ children }: { children: ReactNode }) {
  const [streams, setStreams] = useState<{ [key: string]: any }[]>([]);
  const [subjects, setSubjects] = useState<{ [key: string]: any }[]>([]);
  const getStreams = async () => {
    fetch("https://rurux-1.onrender.com/public/streams")
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          throw Error(res.error);
        }
        return res;
      })
      .then((res) => setStreams(res))
      .catch((err) => alert(err));
  };

  const getSubjects = async () => {
    fetch("https://rurux-1.onrender.com/public/subjects")
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          throw Error(res.error);
        }
        return res;
      })
      .then((res) => setSubjects(res))
      .catch((err) => alert(err));
  };

  useEffect(() => {
    Promise.all([getStreams(), getSubjects()]);
  }, []);
  return (
    <StudentContext.Provider value={{ streams, subjects }}>
      {children}
    </StudentContext.Provider>
  );
}

export default StudentContextProvider;
