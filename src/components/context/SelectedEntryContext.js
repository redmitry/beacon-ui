import { createContext, useContext, useState } from "react";

const SelectedEntryContext = createContext();

export const SelectedEntryProvider = ({ children }) => {
  const [selectedPathSegment, setSelectedPathSegment] = useState(null);

  return (
    <SelectedEntryContext.Provider
      value={{ selectedPathSegment, setSelectedPathSegment }}
    >
      {children}
    </SelectedEntryContext.Provider>
  );
};

export const useSelectedEntry = () => useContext(SelectedEntryContext);
