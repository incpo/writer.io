import {signIn, signOut, useSession} from "next-auth/react";

const Header = () => {
    const {data: sessionData} = useSession()
    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost btn-circle">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        <li><a>Homepage</a></li>
                        <li><a>Portfolio</a></li>
                        <li><a>About</a></li>
                    </ul>
                </div>
            </div>
            <div className="navbar-center">
                <a className="btn btn-ghost normal-case text-xl">Writer IO</a>
            </div>
            <div className="navbar-end">
                <a className='mr-3'>{sessionData?.user?.name ? sessionData.user.name : ''}</a>
                <div className="dropdown dropdown-end">
                    {sessionData?.user?.name && sessionData.user.image ?
                        <>
                            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                <div className="w-24 rounded">
                                    {sessionData?.user?.image && sessionData?.user.name ? <img src={sessionData.user.image} alt={sessionData?.user?.name}/> : '---'}
                                </div>
                            </label>
                            <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                                <li>
                                    <a className="justify-between">
                                        Profile
                                        <span className="badge">New</span>
                                    </a>
                                </li>
                                <li><a>Settings</a></li>
                                <li><a onClick={()=>void signOut()}>Logout</a></li>
                            </ul>
                        </> :
                        <button className="btn btn-ghost" onClick={()=>void signIn()}>Sign In</button>
                    }

                </div>
            </div>
        </div>
    );
};

export default Header;