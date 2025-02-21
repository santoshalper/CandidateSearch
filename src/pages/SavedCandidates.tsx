import Candidate from "../interfaces/Candidate"
import { useState } from "react";
const SavedCandidates = () => {
  let cand: Candidate[] = []; 
  const candstring: string | null = localStorage.getItem('Candidates');
  if (candstring !== null){
    cand = (JSON.parse(candstring));
  } 
  const [candidates,setCandidates] = useState<Candidate[]>(cand)
  


  const deleteCandidate = (event:React.MouseEvent<HTMLButtonElement>) => {
    let cand = [...candidates];
    const element1 = event.currentTarget.parentElement as HTMLElement
    const element2 = element1.parentElement as HTMLElement
    const index1 = element2.getAttribute('data-candidateNum') as string
    const index2 = parseInt(index1);
    cand.splice(index2,1);
    localStorage.setItem('Candidates',JSON.stringify(cand));
    setCandidates(cand);
  }

  return (
    <>
      <h1>Potential Candidates</h1>
      <section className="table">
      <thead>
        <tr>
          <th scope='col'>Image</th>
          <th scope='col'>Name</th>
          <th scope='col'>Location</th>
          <th scope='col'>Email</th>
          <th scope='col'>Company</th>
          <th scope='col'>Bio</th>
          <th scope='col'>Reject</th>
        </tr>
      </thead>
      <tbody>
        {candidates.map((cand,i) => (
          <tr data-candidateNum={i}>
            <th><img src={cand.avatar} alt="failed image load"></img></th>
            <th>{cand.name}</th>
            <th>{cand.location}</th>
            <th>{cand.email}</th>
            <th>{cand.company}</th>
            <th>{cand.bio}</th>
            <th><button onClick={deleteCandidate}>-</button></th>
          </tr>
        ))}
      </tbody>
      </section>
    </>
  );
};

export default SavedCandidates;
