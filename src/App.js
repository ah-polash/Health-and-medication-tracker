import React, { useState } from 'react';

function App() {
  const [diseases, setDiseases] = useState([]);
  const [statusMessage, setStatusMessage] = useState('');

  const addDisease = () => {
    setDiseases([...diseases, { name: '', medicines: [] }]);
  };

  const updateDiseaseName = (index, value) => {
    const updated = [...diseases];
    updated[index].name = value;
    setDiseases(updated);
  };

  const addMedicine = (diseaseIndex) => {
    const updated = [...diseases];
    updated[diseaseIndex].medicines.push({ name: '' });
    setDiseases(updated);
  };

  const updateMedicineName = (diseaseIndex, medIndex, value) => {
    const updated = [...diseases];
    updated[diseaseIndex].medicines[medIndex].name = value;
    setDiseases(updated);
  };

  const resetForm = () => {
    setDiseases([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage('Submitting...');

    try {
      const response = await fetch('https://hook.us1.make.com/ni3r6ka7j44stpxgn5vqna1bqi0nfxmo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ diseases })
      });

      if (response.ok) {
        setStatusMessage('✅ Data submitted successfully!');
        resetForm();

        setTimeout(() => {
          setStatusMessage('');
        }, 3000);
      } else {
        setStatusMessage('❌ Submission failed. Please try again.');
      }
    } catch (error) {
      console.error(error);
      setStatusMessage('❌ An error occurred while submitting.');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Medicine & Health Tracker</h2>

      {statusMessage && (
        <div className="alert alert-info text-center">{statusMessage}</div>
      )}

      <form onSubmit={handleSubmit}>
        {diseases.map((disease, dIndex) => (
          <div key={dIndex} className="card mb-4 p-3">
            <div className="mb-3">
              <label className="form-label">Disease Name</label>
              <input
                type="text"
                className="form-control"
                value={disease.name}
                onChange={(e) => updateDiseaseName(dIndex, e.target.value)}
                required
              />
            </div>

            {disease.medicines.map((med, mIndex) => (
              <div key={mIndex} className="mb-3">
                <label className="form-label">Medicine Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={med.name}
                  onChange={(e) =>
                    updateMedicineName(dIndex, mIndex, e.target.value)
                  }
                  required
                />
              </div>
            ))}

            <button
              type="button"
              className="btn btn-sm btn-outline-primary"
              onClick={() => addMedicine(dIndex)}
            >
              + Add Medicine for this disease
            </button>
          </div>
        ))}

        <div className="mb-3">
          <button
            type="button"
            className="btn btn-outline-success"
            onClick={addDisease}
          >
            + Add Disease
          </button>
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Submit
        </button>
      </form>
    </div>
  );
}

export default App;
