import React, { useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { apiBaseUrl } from "../constants";
import { Patient, Entry } from "../types";
import { useStateValue, setPatient } from "../state";
import { EntryFormValues } from '../AddEntryModal/AddEntryForm';
import { Button } from 'semantic-ui-react';
import AddEntryModal from '../AddEntryModal';

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  const style = {
    border: '1px solid grey',
    borderRadius: '0.2rem',
    margin: '1rem 0',
    padding: '1rem'
  }

  switch (entry.type) {
    case 'Hospital':
      return (
        <div style={style}>
          <h3>{entry.date} Hospital</h3>
          <p>{entry.description}</p>
          <p>{entry.discharge ? 'Discharged' : 'Not discharged'}</p>
        </div>
      );
    case 'OccupationalHealthcare':
      return (
        <div style={style}>
          <h3>{entry.date} Occupational</h3>
          <p>{entry.description}</p>
        </div>
      );
    case 'HealthCheck':
      return (
        <div style={style}>
          <h3>{entry.date} Health check</h3>
          <p>{entry.description}</p>
          <p>Health rating: {entry.healthCheckRating}</p>
        </div>
      );
    default:
      return null;
  }
}

const PatientPage: React.FC = () => {
  const [{ patients, diagnoses }, dispatch] = useStateValue();
  const { id } = useParams< {id: string} >();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

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

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const { data: updatedPatient } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch({ type: "SET_PATIENT", payload: updatedPatient });
      closeModal();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };

  return (
    <div>
      <h2>{patients[id].name}</h2>
      <p>ssn: {patients[id].ssn}</p>
      <p>occupation: {patients[id].occupation}</p>
      <h3>Entries</h3>
      {patients[id].entries.map(entry => (
        <EntryDetails key={entry.id} entry={entry} />
      ))}
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button onClick={() => openModal()}>Add New Entry</Button>
    </div>
  )
}

export default PatientPage;
