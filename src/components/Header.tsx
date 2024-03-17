import { navLinks } from "@/constants";
import { NavLink } from "@/models/index.model";

import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <header className="py-5 w-full sm:px-10 px-5 flex justify-between items-center">
      <nav className="flex items-center justify-between w-full scrim-max-width">
        <Link href="/">
          <Image src="/images/apple.svg" alt="logo" width={15} height={15} />
        </Link>

        <div className="flex flex-1 items-center justify-center gap-5 max-md:hidden">
          {navLinks.map(({ name, href }: NavLink) => (
            <Link key={name} href={href}>
              {name}
            </Link>
          ))}
        </div>

        <div className="flex items-center justify-center gap-5">
          <button>
            <Image
              src="/images/search.svg"
              alt="search"
              width={15}
              height={15}
              className="cursor-pointer"
            />
          </button>

          <button>
            <Image
              src="/images/bag.svg"
              alt="bag"
              width={15}
              height={15}
              className="cursor-pointer"
            />
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
