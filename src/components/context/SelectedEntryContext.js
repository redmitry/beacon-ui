import { createContext, useContext, useState } from "react";

const SelectedEntryContext = createContext();

export const SelectedEntryProvider = ({ children }) => {
  const [selectedPathSegment, setSelectedPathSegment] = useState(null);
  const [entryTypes, setEntryTypes] = useState([]);

  return (
    <SelectedEntryContext.Provider
      value={{
        selectedPathSegment,
        setSelectedPathSegment,
        entryTypes,
        setEntryTypes,
      }}
    >
      {children}
    </SelectedEntryContext.Provider>
  );
};

export const useSelectedEntry = () => useContext(SelectedEntryContext);
