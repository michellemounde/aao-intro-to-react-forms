import { useState, useEffect } from "react";

function Form() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneType, setPhoneType] = useState('');
  const [staff, setStaff] = useState('');
  const [bio, setBio] = useState('');
  const [signup, setSignup] = useState(false);
  const [validationErrors, setValidationErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  //BONUS
  const [disabled, setDisabled] = useState(false);

  // Phone validator
  const isPhone = () => {
    return (phone.replace(/\D/g,'').length === 10);
  }

  // Email validator
  const isEmail = () => {
    const emailFormat = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");

    return emailFormat.test(email);
  }

  useEffect(() => {
    const errors = [];

    if (name.length < 1) errors.push('Please enter your Name');
    if (!isEmail(email)) errors.push('Please enter a valid Email');
    if (!isPhone(phone)) errors.push('Please enter a valid Phone');
    if (!phoneType && phone) errors.push('Please select a Phone Type');
    if (bio.length > 280) errors.push('Bio cannot be longer than 280 characters');

    setValidationErrors(errors);
  }, [name, email, phone, phoneType, bio]);

  // Disable phone type if no phone
  useEffect(() => {

    if (!phone) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }

  }, [phone]);

  const onSubmit = (e) => {
    e.preventDefault();

    setHasSubmitted(true);

    if (validationErrors.length > 0 ) return alert('Cannot Submit!');

    const FormInformation = {
      name,
      email,
      phone,
      phoneType,
      staff,
      bio,
      signup,
      submittedOn: new Date()
    }

    console.log(FormInformation);

    // Reset form
    setName('');
    setEmail('');
    setPhone('');
    setPhoneType('');
    setStaff('');
    setBio('');
    setSignup('');
    setHasSubmitted(false);
  }


  return(
    <div>
      <form onSubmit={onSubmit}>
        {hasSubmitted && validationErrors.length > 0 && (
          <ul>
            {validationErrors.map((error) => {
                return (
                  <li key={error}>{error}</li>
                )
              })
            }
          </ul>
        )}
        <div>
          <label htmlFor='name'>Name:</label>
          <input
            id='name'
            type='text'
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>

        <div>
          <label htmlFor='email'>Email:</label>
          <input
            id='email'
            type='text'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div>
          <label htmlFor='phone'>Phone:</label>
          <input
            id='phone'
            type='text'
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
          />
        </div>

        <div>
          <label htmlFor='phoneType'>Phone Type:</label>
          <select
            name='phoneType'
            onChange={(e) => setPhoneType(e.target.value)}
            value={phoneType}
            disabled={disabled}
          >
            <option value='' disabled>Select a phone type...</option>
            <option value='home'>Home</option>
            <option value='work'>Work</option>
            <option value='mobile'>Mobile</option>
          </select>
        </div>

        <fieldset onChange={(e) => setStaff(e.target.value)}>
          <legend>Select a staff status:</legend>

          <div>
            <input
              id='teacher'
              type='radio'
              name='staff'
              value='teacher'
            />
            <label htmlFor='teacher'>Teacher</label>
          </div>

          <div>
            <input
              id='student'
              type='radio'
              name='staff'
              value='student'
            />
            <label htmlFor='student'>Student</label>
          </div>
        </fieldset>


        <div>
          <label htmlFor='bio'>Bio:</label>
          <textarea
            id='bio'
            name='bio'
            onChange={(e) => setBio(e.target.value)}
            value={bio}
          />
        </div>

        <div>
          <input
            id='signup'
            type='checkbox'
            onChange={(e) => setSignup(e.target.checked)}
            checked={signup}
          />
          <label htmlFor='signup'>Signup for email notifications</label>
        </div>

        <button>Submit</button>
      </form>
    </div>
  );
}

export default Form;
