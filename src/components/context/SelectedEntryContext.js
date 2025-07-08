import { createContext, useContext, useState } from "react";

const SelectedEntryContext = createContext();

export const SelectedEntryProvider = ({ children }) => {
  const [selectedPathSegment, setSelectedPathSegment] = useState(null);
  const [entryTypes, setEntryTypes] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState([]);
  const [extraFilter, setExtraFilter] = useState(null);
  const [loadingData, setLoadingData] = useState(false);
  const [resultData, setResultData] = useState([]);
  const [hasSearchResults, setHasSearchResult] = useState(false);
  const [beaconsInfo, setBeaconsInfo] = useState([]);
  const [entryTypesConfig, setEntryTypesConfig] = useState({});
  const [message, setMessage] = useState(null);

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
        setResultData,
        hasSearchResults,
        setHasSearchResult,
        beaconsInfo,
        setBeaconsInfo,
        entryTypesConfig,
        setEntryTypesConfig,
        message,
        setMessage,
      }}
    >
      {children}
    </SelectedEntryContext.Provider>
  );
};

export const useSelectedEntry = () => useContext(SelectedEntryContext);
