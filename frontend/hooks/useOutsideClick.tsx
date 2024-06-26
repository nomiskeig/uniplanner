import React from "react";

export  function useOutsideClick(callback: () => void) {
    const ref = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const handleClick = (event: any) => {
            if (ref.current && !ref.current.contains(event.target))   {
                callback();
            }
        }
        document.addEventListener('click', handleClick, true)
        return () => {
            document.removeEventListener('click', handleClick, true)
        }
    }, [])
    return ref;

}
