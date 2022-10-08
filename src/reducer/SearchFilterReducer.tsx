export const initialState: {
  activitiesFilters: string;
  domainFilters: string;
  updateSearchFilter: (domain: string) => void;
} = {
  activitiesFilters: "View All",
  domainFilters: "View All",
  updateSearchFilter: () => {
    "View All";
  },
};

export type ACTIONTYPE =
  | { type: "Self Awareness" }
  | { type: "Relationship Skills" }
  | { type: "Social Awareness" }
  | { type: "Decision Making" }
  | { type: "Self Management" }
  | { type: "Cultral Responsiveness" }
  | { type: "Domains View All" }
  | { type: "Lab Activity" }
  | { type: "Reflections" }
  | { type: "Group Share" }
  | { type: "Mindful Practice" }
  | { type: "Motivation Moment" }
  | { type: "Vocabulary Chart" }
  | { type: "Activities View All" }
  | { type: string };

type initState = {
  activitiesFilters: string;
  domainFilters: string;
};

export const SearchFilterReducer = (
  state: initState,
  action: ACTIONTYPE
): initState => {
  switch (action.type) {
    case "Self Awareness":
      return {
        ...state,
        domainFilters: "Self Awareness",
      };
    case "Relationship Skills":
      return {
        ...state,
        domainFilters: "Relationship Skills",
      };
    case "Social Awareness":
      return {
        ...state,
        domainFilters: "Social Awareness",
      };
    case "Decision Making":
      return {
        ...state,
        domainFilters: "Decision Making",
      };
    case "Self Management":
      return {
        ...state,
        domainFilters: "Self Management",
      };
    case "Cultral Responsiveness":
      return {
        ...state,
        domainFilters: "Cultral Responsiveness",
      };
    case "Domains View All":
      return {
        ...state,
        domainFilters: "View All",
      };
    case "Lab Activity":
      return {
        ...state,
        activitiesFilters: "Lab Activity",
      };
    case "Reflections":
      return {
        ...state,
        activitiesFilters: "Reflections",
      };
    case "Group Share":
      return {
        ...state,
        activitiesFilters: "Group Share",
      };
    case "Mindful Practice":
      return {
        ...state,
        activitiesFilters: "Mindful Practice",
      };
    case "Motivation Moment":
      return {
        ...state,
        activitiesFilters: "Motivation Moment",
      };
    case "Vocabulary Chart":
      return {
        ...state,
        activitiesFilters: "Vocabulary Chart",
      };
    case "Activities View All":
      return {
        ...state,
        activitiesFilters: "View All",
      };
    default:
      throw new Error();
  }
};
