export function initSearching(searchField) {
    return (data, state, action) => {
        const searchValue = state.filters?.[searchField] || "";

        if (!searchValue) return data;

        return (query, state, action) => {
            return state[searchField] ? Object.assign({}, query, {
                search: state[searchField]
            }) : query;
        }
    };
}
