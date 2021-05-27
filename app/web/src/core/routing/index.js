const Routes = Object.freeze({
    // old
    Login: '/login',
    Home: '/home',
    Timeline: '/timeline',
    TimelineDetail: '/timeline/:id',
    Settings: '/settings',
});

// replaces : values with values from object
// e.g. route('/projects/:id', { id : 9 }) -> /movies/9
export const route = (path, options = {}) => {
    Object.keys(options).forEach(key => {
        path = path.replace(`:${key}`, options[key]);
    });
    return path;
};

export { Routes };
