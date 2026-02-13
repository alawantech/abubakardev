export const isSchoolSubdomain = () => {
    if (typeof window === 'undefined') return false;
    const hostname = window.location.hostname;

    // Check for the specific subdomain
    if (hostname.startsWith('school.')) return true;

    // Support for development (can use school.localhost or a search param for testing)
    if (hostname.includes('school')) return true;

    // Optional: check search params for testing ?subdomain=school
    const params = new URLSearchParams(window.location.search);
    if (params.get('subdomain') === 'school') return true;

    return false;
};
