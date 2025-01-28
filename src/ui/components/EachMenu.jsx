import { NavLink } from "react-router";
import { useNavigate } from "react-router";

const EachMenu = ({ slug, title, pathIcon }) => {
  let navigate = useNavigate();

  const preventNewInstance = (e) => {
    if (e.ctrlKey || e.shiftKey || e.metaKey) {
      e.preventDefault();
      navigate(slug);
    }
  };

  return (
    <NavLink
      onClick={preventNewInstance}
      to={slug}
      title={title}
      className={`group w-full no-drag h-16 p-4 grid place-items-center hover:text-accent text-white`}
    >
      <svg
        className={`group-hover:scale-125 ease-in-out duration-300 fill-current`}
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d={pathIcon} />
      </svg>
    </NavLink>
  );
};

export default EachMenu;
