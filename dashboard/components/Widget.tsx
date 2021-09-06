
import React from 'react';
import styles from '../styles/Home.module.css';

export default function Widget({ children }) {
    const header = React.Children.map(children, child => child.type.displayName === 'Header' ? child : null);
    const body = React.Children.map(children, child => child.type.displayName === 'Body' ? child : null);
    const footer = React.Children.map(children, child => child.type.displayName === 'Footer' ? child : null);

    return <div className="p-4 lg:max-w-4xl mt-6 sm:w-full border-2 rounded-lg ">
        <div className="flex justify-between mb-8"><div>{header} </div><button className="float-right h-12 w-12 border-4 rounded-full hover:bg-red-700 hover:text-white hover:border-0">&#10006;</button></div>
        <hr></hr>
        <div className="my-8">
            {body}
        </div>
        {footer}
    </div>
}

const Header = ({ children }) => children;
Header.displayName = 'Header';
Widget.Header = Header;

const Body = ({ children }) => children;
Body.displayName = 'Body';
Widget.Body = Body;

const Footer = ({ children }) => children;
Footer.displayName = 'Footer';
Widget.Footer = Footer;