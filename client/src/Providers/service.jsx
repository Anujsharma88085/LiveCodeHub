const languageCodeMap = {
  cpp: 54,
  python: 92,
  javascript: 93,
  java: 91,
}
let i = 1;
async function getSubmission(tokenId, callback){
  const url = `https://judge0-ce.p.rapidapi.com/submissions/${tokenId}?base64_encoded=true&fields=*`;
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': '7cce8185f6msh93a9c9152084dd6p134630jsnb9336db4b57e',
		  'x-rapidapi-host': 'judge0-ce.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    return result;
  } catch (error) {
    callback({apiStatus: 'error', message: JSON.stringify(error)})
  }
  return;
}

export async function makeSubmission({code, language, stdin, callback}){
  //make a submission on judge0 and handle the status of the submission

  const url = 'https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true&wait=false&fields=*';
  const httpOptions = {
    method: 'POST',
    headers: {
      'x-rapidapi-key': '7cce8185f6msh93a9c9152084dd6p134630jsnb9336db4b57e',
      'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      language_id: languageCodeMap[language],
      source_code: btoa(code),
      stdin: btoa(stdin)
    })
  };

  try{
    callback({apiStatus: 'loading'});
    const response = await fetch(url, httpOptions);
    const result = await response.json();
    const tokenId = result.token;
    let statusCode = 1; // in queue
    let apiSubmissionResult;
    while(statusCode == 1 || statusCode == 2){
      try{
        apiSubmissionResult = await getSubmission(tokenId, callback);
        statusCode = apiSubmissionResult.status.id;
      }catch(error){
        callback({apiStatus: 'error', message: JSON.stringify(error)});
        return;
      }
    }

    if(apiSubmissionResult){
      callback({apiStatus: 'Success', data: apiSubmissionResult})
    }

  }catch(error){
    callback({
      apiStatus: 'error',
      message: JSON.stringify(error)
    })
  }

}