import { useState, useEffect } from "react";

function Form() {
  const [name, setName] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();

  }


  return(
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            id='name'
            type='text'
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>



        <button>Submit</button>
      </form>
    </div>
  );
}

export default Form;
