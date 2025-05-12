import { createContext, useContext, useState } from "react";

const SelectedEntryContext = createContext();

export const SelectedEntryProvider = ({ children }) => {
  const [selectedPathSegment, setSelectedPathSegment] = useState(null);
  const [entryTypes, setEntryTypes] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState([]);
  const [extraFilter, setExtraFilter] = useState(null);
  const [loadingData, setLoadingData] = useState(false);
  const [resultData, setResultData] = useState([]);

  return (
    <SelectedEntryContext.Provider
      value={{
        selectedPathSegment,
        setSelectedPathSegment,
        entryTypes,
        setEntryTypes,
        selectedFilter,
        setSelectedFilter,
        extraFilter,
        setExtraFilter,
        loadingData,
        setLoadingData,
        resultData,
        setResultData
      }}
    >
      {children}
    </SelectedEntryContext.Provider>
  );
};

export const useSelectedEntry = () => useContext(SelectedEntryContext);
