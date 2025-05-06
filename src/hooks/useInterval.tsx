import { useEffect, useRef } from "react";

function useInterval(callback, delay) {
    const savedCb = useRef();

    useEffect(() => {
        savedCb.current = callback;
    }, [callback]);

    useEffect(() => {
        function tick() {
            savedCb.current();
        }
        if (delay !== null) {
            const intervalId = setInterval(tick, delay);
            return () => clearInterval(intervalId);
        }
    }, [delay]);
}

export default useInterval;
