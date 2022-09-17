import React, { createContext, useContext, useState, useRef } from 'react';

const Context = createContext();

const initialCountry = 'Andorra';

export const StateContext = ({ children }) => {
    const [allDocs, setAllDocs] = useState(null);
    const [docs, setDocs] = useState(null);
    const [country, setCountry] = useState('');
    const [initialized, setInitialized] = useState(false);
    const [optionGroups, setOptionGroups] = useState(null);
    const [gridHeight, setGridHeight] = useState('auto');
    const gridRef = useRef(null);

    const onSelect = (value) => {
        setCountry(value);
        setGridHeight(gridRef.current.clientHeight)
        setDocs(null);    
    }

    const setNewDocs = () => {
            setDocs(allDocs.filter(doc => doc.country === country));
            setGridHeight('auto');
    }

    const fetchDocs = () => {
            fetch('https://us-central1-insta-deame-api.cloudfunctions.net/app')
            .then(res => {
                return res.json();
            })
            .then((data) => {
                data.sort((a,b) => (a.country > b.country) ? 1 : -1);
                const imgDocs = data.filter(doc => doc.hasOwnProperty('thumburl'));
                setAllDocs(imgDocs);
                const allCountries = imgDocs.map((doc) => (doc.country));
                const uniqueCountries = Array.from(new Set(allCountries)); 
                const groupsArray = uniqueCountries.map((item) => ({'value': item, 'label': item}));
                const groups = {country: groupsArray};
                setOptionGroups(groups);                      
                //setDocs(data.filter(doc => doc.hasOwnProperty('thumburl')));
                setDocs(data.filter(doc => doc.country === initialCountry));
            })
            setInitialized(true);
    }

    return (
        <Context.Provider
        value={{
            fetchDocs,
            setNewDocs,
            onSelect,
            gridRef,
            gridHeight,
            docs,
            initialized,
            optionGroups,
            initialCountry
        }}>
            {children}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context);