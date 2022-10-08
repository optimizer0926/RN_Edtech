import React from "react";
import { createContext, useReducer } from "react";
import {
  initialState,
  SearchFilterReducer,
} from "../reducer/SearchFilterReducer";

export const SearchFilterContext = createContext<{
  activitiesFilters: string;
  domainFilters: string;
  updateSearchFilter: (domain: string) => void;
}>(initialState);

export const SearchProvider = ({
  children,
}: {
  children: any;
}): JSX.Element => {
  const [state, dispatch] = useReducer(SearchFilterReducer, {
    activitiesFilters: "View All",
    domainFilters: "View All",
  });

  const updateSearchFilter: (domain: string) => void = (domain) => {
    dispatch({
      type: domain,
    });
  };

  const value: {
    activitiesFilters: string;
    domainFilters: string;
    updateSearchFilter: (domain: string) => void;
  } = {
    activitiesFilters: state.activitiesFilters,
    domainFilters: state.domainFilters,
    updateSearchFilter,
  };

  return (
    <SearchFilterContext.Provider value={value}>
      {children}
    </SearchFilterContext.Provider>
  );
};
