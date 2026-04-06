import React from 'react';
import {NavLink} from 'react-router-dom';

interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({children}) => {
    return (
        <>
            <header>
                <nav className="nav" aria-label="Головна навігація">
                    <div className="nav__inner">
                        <NavLink to="/" className="nav__brand">VIN DECODER</NavLink>
                        <ul className="nav__links" role="list">
                            <li>
                                <NavLink
                                    to="/"
                                    end
                                    className={({isActive}) =>
                                        `nav__link${isActive ? ' nav__link--active' : ''}`
                                    }
                                >
                                    Головна
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/variables"
                                    className={({isActive}) =>
                                        `nav__link${isActive ? ' nav__link--active' : ''}`
                                    }
                                >
                                    Змінні
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>

            <main>
                {children}
            </main>
        </>
    );
};

export default MainLayout;