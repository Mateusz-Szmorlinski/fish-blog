import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function OnRouteChange() {
  const { pathname } = useLocation();

  useEffect(() => {
    const handleClick = (event) => {
      const clickedElement = event.target.closest("a");
      if (clickedElement && clickedElement.getAttribute("href") === window.location.pathname) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0});
  }, [pathname]);

  return null;
}

export default OnRouteChange;