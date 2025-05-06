import { useEffect, useRef } from "react";

function useInterval(callback: () => void, delay: number) {
    const savedCb = useRef<() => void>(null);

    useEffect(() => {
        if (savedCb) {
            savedCb.current = callback;
        }
    }, [callback]);

    useEffect(() => {
        function tick() {
            if (savedCb.current) {
                savedCb.current();
            }
        }
        if (delay !== null) {
            const intervalId = setInterval(tick, delay);
            return () => clearInterval(intervalId);
        }
    }, [delay]);
}

export default useInterval;
