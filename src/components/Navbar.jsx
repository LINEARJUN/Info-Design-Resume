import { logoImg, contactImg, searchImg } from '../utils';
import { navLists } from '../constants';

const Navbar = () => {
  return (
    <header className="w-full py-5 sm:px-10 px-5 flex justify-between items-center">
      <nav className="flex w-full screen-max-width">
        <p className="font-semibold">Li</p>

        <div className="flex flex-1 justify-center max-sm:hidden">
          {navLists.map((nav) => (
            <div key={nav} className="px-5 text-sm cursor-pointer text-gray hover:text-white transition-all">
              {nav}
            </div>
          ))}
        </div>

        <div className="flex items-baseline gap-7 max-sm:justify-end max-sm:flex-1">
          <img
            src={contactImg}
            alt="bag"
            width={24}
            height={24}
            onClick={() => window.location.href = 'mailto:admin@linearjun.com'}
            style={{ cursor: 'pointer' }}
          />
        </div>
      </nav>
    </header>
  )
}

export default Navbar