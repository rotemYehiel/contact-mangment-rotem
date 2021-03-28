import { useDispatch } from 'react-redux';
import { logOut } from '../actions/UserAction';

const MainHeader = (props) => {
    const { loggedInUser } = props;
    const dispatch = useDispatch();

    const loguot = async (ev) => {
        ev.preventDefault();
        dispatch(logOut());
    }
    return (
        <div className="main-header">

            <section className="user-sec">
                <h1>Hello,  {loggedInUser ? loggedInUser['UserName'] : 'Guest'}</h1>
                {loggedInUser ? (<button onClick={(ev) => loguot(ev)}>Loguot</button>) : ''}
            </section>
        </div>
    )
}

export default MainHeader;