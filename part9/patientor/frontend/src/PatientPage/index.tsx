import React, { useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { apiBaseUrl } from "../constants";
import { Patient } from "../types";
import { useStateValue } from "../state";

const PatientPage: React.FC = () => {
  const [{ patients }, dispatch] = useStateValue();
  const { id } = useParams< {id: string} >();

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data: patientFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch({
          type: "SET_PATIENT",
          payload: patientFromApi
        });
      } catch (e) {
        console.error(e);
      }
    }
    
    if (patients[id] === undefined) return;

    if (patients[id].entries === undefined) {
      fetchPatient();
    }
  }, []);

  if (patients[id] === undefined ||
      patients[id].entries === undefined) {
    return null;
  }

  return (
    <div>
      <h2>{patients[id].name}</h2>
      <p>ssn: {patients[id].ssn}</p>
      <p>occupation: {patients[id].occupation}</p>
    </div>
  )
}

export default PatientPage;