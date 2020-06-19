import React, {useState} from 'react';

import Header from './components/Header';

function App() {

  const [ projects, setProjects ] = useState(["NodeJS", "ReactJS"]);

  function handleAddProject(){
    setProjects([...projects, `Novo projeto ${Date.now()}`]);
  }

  return (
    <>
      <Header title="Project" />
        <ul>
          {projects.map(project => <li key={project}>{project}</li>)}
        </ul>

        <button type="button" onClick={handleAddProject}>AddProject</button>
    </>
  );
}

export default App;