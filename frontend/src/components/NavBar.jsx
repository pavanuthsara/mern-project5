import {Link} from 'react-router-dom';

function NavBar() {
    return (
        <>
            <nav className="bg-green-500 p-4 shadow-lg">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <p className="text-white text-xl font-bold">Freshly</p>
                    <ul className="flex space-x-6">
                        <Link to="/">
                        <li><a href="#" className="text-gray-300 hover:text-white transition duration-300">Home</a></li>
                        </Link>

                        <Link to="/create">
                        <li><a href="#" className="text-gray-300 hover:text-white transition duration-300">Create</a></li>
                        </Link>

                        <li><a href="#" className="text-gray-300 hover:text-white transition duration-300"> Contact</a></li>

                        <li><a href="#" className="text-gray-300 hover:text-white transition duration-300">Blog</a></li>
                        
                    </ul>
                </div>
            </nav>
        </>
    );
}

export default NavBar;