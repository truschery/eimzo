export default function (str) {
    try {
        return btoa(atob(str)) === str;
    } catch (e) {
        return false;
    }
}