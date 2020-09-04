import React from 'react';

const DreamContext = React.createContext({
    dreams: [],
    addDream: () => {},
    setDreams: () => {},
    changeDream: () => {}
});

export default DreamContext;