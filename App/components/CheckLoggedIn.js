import { useSelector, useDispatch } from 'react-redux';

export default checkLoggedIn = () => {
    const loggedIn = useSelector(state => (state.auth.userId == null ? false : true));

    return loggedIn
}