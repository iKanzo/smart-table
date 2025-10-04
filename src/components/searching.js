export function initSearching(searchInput, searchField) {
    if (searchInput && typeof searchInput.addEventListener === 'function') {
        const form = searchInput.form || searchInput.closest('form');

        if (form) {
            let t = null;
            const submitForm = () => {
                if (typeof form.requestSubmit === 'function') {
                    form.requestSubmit();
                } else {
                    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
                }
            };

            searchInput.addEventListener('input', () => {
                clearTimeout(t);
                t = setTimeout(submitForm, 180);
            });

            const resetBtn = form.querySelector('[data-name="reset"], button[type="reset"]');
            if (resetBtn) {
                resetBtn.addEventListener('click', () => {
                    setTimeout(submitForm, 0);
                });
            }
        }
    }
    
    return (query, state, action) => {
        const value = (state.filters?.[searchField] ?? state[searchField] ?? "").trim();
        return value ? Object.assign({}, query, { search: value }) : query;
    };
}
