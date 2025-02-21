import Candidate from '../interfaces/Candidate';
import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';

const CandidateSearch = () => {
  const [candidate, setCandidate] = useState<Candidate>({} as Candidate);

  const fetchData = async () => {
    const result = await searchGithub();
    console.log(result[0])
    const user = await searchGithubUser(result[0].login);
    const cand: Candidate = {
      name: user.name,
      username: user.login,
      location: user.location,
      avatar: user.avatar_url,
      email: user.email,
      html_url: user.html_url,
      company: user.company,
      bio: user.bio,
    };
    console.log(cand);
    if(cand.username === undefined){
      cand.username = "Deleted Account"
    }
    setCandidate(cand);
  };

  const addCandidate= () => {
    let candidates: Candidate[] = []
    const candstring: string|null = localStorage.getItem('Candidates');
    if (candstring !== null) {
      candidates = JSON.parse(candstring);
    }
    candidates.push(candidate);
    localStorage.setItem('Candidates',JSON.stringify(candidates));
    fetchData();
  }

  useEffect(() => {
    fetchData();
  }, []);


  return (
      <>
        <h1>CandidateSearch</h1>
        <div className='card'>
          <img src={candidate.avatar} alt="Deleted Candidate Account" />
          <h2>{candidate.name}({candidate.username})</h2>
          <p>location: {candidate.location}</p>
          <p>Email: {candidate.email}</p>
          <p>Company: {candidate.company}</p>
          <p>Bio: {candidate.bio}</p>
        </div>
        <div>
          <button onClick={fetchData}>-</button>
          <button onClick={addCandidate}>+</button>
        </div>
      </>);
};

export default CandidateSearch;
