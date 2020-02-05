import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [file_name, setFileName] = useState("");
  const [loading, setLoader] = useState(false);
  const [link, setLink] = useState("");
  const [html_string, setCode] = useState("");
  const [error, setError] = useState(false);

  

  return (
    <div className="App">
      <h2>Covert HTML to PDF document with our APIs</h2>

      <div class="form">
        <header></header>

        <div class="row">
          <div class="col-md-6">
            <label for="firstname">File Name</label>
            <input
              value={file_name}
              onChange={file_name => {setFileName(file_name.target.value)
              } 
            
            }
              id="firstname"
              type="text"
              placeholder="First Name"
            />
          </div>
          <div class="col-md-6">
            <label for="lastname">API key</label>
            <input
              id="lastname"
              type="text"
              placeholder="Last Name"
              value={"010100"}
            />
          </div>
        </div>

        <div class="row">
          <div class="col-md-12">
            
            <label for="username">Html Code</label>
            <input
            onChange = {(code)=>setCode(parseHtml(code.target.value))}
            id="username" type="text" placeholder="Username" />
          </div>
        </div>
      </div>

      <center>
        <p>
          For more information, read{" "}
          <a
            href="https://github.com/nicksanchezc137/imani/wiki"
            target="_blank"
          >
            Our Documentation on CSS compatibility
          </a>
          .
        </p>
      </center>

      <footer>
        <p>
          By clicking 'Create PDF', you confirm that you accept our{" "}
          <a href="#">Terms of Use</a> and <a href="#">Privacy Policy</a>.
        </p>
        <p>
        <a href={link} target="_blank">
          {loading?"Loading😌...":link?'Download🙂':error?"Error parsing HTML🥵":'No File😖'}
        </a>
        </p>

        <button
        onClick = {()=>createPdf(html_string,file_name,setLink,setLoader,setError)}
        class="btn btn-info">Create PDF</button>
      </footer>
    </div>
  );
}
const parseHtml = html => {
  return html.replace(/(\r\n|\n|\r)/gm, "");
};

 const createPdf = async (html_string,file_name,setLink,setLoader,setError) => {
   setLoader(true)
   console.log({ html_string, file_name })
  const rawResponse = await fetch(
    "https://jobexperts.co.ke/app/api/imani/generate_pdf.php",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ html_string, file_name })
    }
  );
  const content = await rawResponse.json();
  setLoader(false)

  if(content.status == "Success"){
      setLink(content.message)
  }else{
    console.log("the data is ");
    setError(true)
  }
  console.log(content);
}

export default App;
