import React, { useState } from 'react';
import Picker from 'react-scrollable-picker';
import { useStateContext } from './context/StateContext.jsx';
import Loader from './Loader';

const Title = () => {

  const { optionGroups, onSelect, initialCountry } = useStateContext();
  const [valueGroups, setValueGroups] = useState({country: initialCountry});
  

  const handleChange = (name, value) => {
    onSelect(value);
    setValueGroups({...valueGroups, [name]: value});
  };

  return (
    <div className="title">
      <h2>Images from Around the World</h2>
      <p>Welcome to my international photo collection. All photos taken by me or my device.</p>
      {!optionGroups && <Loader />}
      {optionGroups && <Picker
        optionGroups={optionGroups}
        valueGroups={valueGroups}
        onChange={handleChange}
      />}
    </div>
  )
}

export default Title;