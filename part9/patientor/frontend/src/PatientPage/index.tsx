import React, { useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { apiBaseUrl } from "../constants";
import { Patient } from "../types";
import { useStateValue, setPatient } from "../state";

const PatientPage: React.FC = () => {
  const [{ patients }, dispatch] = useStateValue();
  const { id } = useParams< {id: string} >();

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data: patientFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(setPatient(patientFromApi));
      } catch (e) {
        console.error(e);
      }
    }
    
    if (patients[id] === undefined) return;

    if (patients[id].entries === undefined) {
      fetchPatient();
    }
  }, [dispatch, id, patients]);

  if (patients[id] === undefined ||
      patients[id].entries === undefined) {
    return null;
  }

  return (
    <div>
      <h2>{patients[id].name}</h2>
      <p>ssn: {patients[id].ssn}</p>
      <p>occupation: {patients[id].occupation}</p>
      <h3>Entries</h3>
      {patients[id].entries.map(entry => (
        <div key={entry.id}>
          <p>
            {entry.date} {entry.description}
          </p>
          <ul>
            {entry.diagnosisCodes &&
            entry.diagnosisCodes.map(code => (
              <li key={code}>
                {code}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

export default PatientPage;