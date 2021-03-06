import React, { useState, useEffect } from 'react'
import api from './services/api'

import './App.css'
import Header from './components/Header'

function App() {

  const [projects, setProjects] = useState([]);

  //useState retorna um array com duas posições
  //
  //1. Variável com o seu valor inicial
  //2. Função para atualizarmos esse valor

  useEffect(() => {
    api.get('projects').then(response => {
      setProjects(response.data);
    })
  }, [])

  //useState retorna um array com duas posições
  //
  //1. Qual função quero disparar
  //2. Quando eu quero disparar essa função

  async function handleAddProject() {
  const response = await api.post('projects', {
    title: `Novo projeto${Date.now()}`,
    owner: "Leo mestre do universo"
  }) 
  const project = response.data;

  setProjects([...projects, project])

    //projects.push(`Novo projeto${Date.now()}`); //altera o valor de projects

    //setProjects([...projects, `Novo projeto${Date.now()}`]); //cria um novo project com o valor que eu definir
    //pega o todos os valores de project passa o valor que eu quero, e cria um novo.
  }

  return (
    <>
      <Header title="Projects" />

      <ul>
        {projects.map(project => <li key={project.id}>{project.title}</li>)}
      </ul>

      <button type="button" onClick={handleAddProject}>Adicionar Projeto</button>
    </>
  )
}

export default App;