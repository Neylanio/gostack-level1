import React, {useState, useEffect} from 'react';
import api from './services/api';

import './App.css';

import Header from './components/Header';

function App() {

  const [ projects, setProjects ] = useState([]);

  useEffect(() => {
    api.get('projects').then(response => {
      setProjects(response.data);
    });
  }, [projects]);

  async function handleAddProject(){
    // setProjects([...projects, `Novo projeto ${Date.now()}`]);
    const project = {
      title: `Novo projeto ${Date.now()}`,
      owner: "Neylanio"
    }
    const response = await api.post('projects', project);

    setProjects([...projects, response.data]); 


  }

  return (
    <>
      <Header title="Project" />

        <ul>
          {projects.map(project => 
            (
              <li key={project.id}>{project.title}</li>
            )
          )}
        </ul>

        <button type="button" onClick={handleAddProject}>AddProject</button>
    </>
  );
}

export default App;