import { useEffect, useRef, useState } from 'react';

/**
 * Determines whether the provided value has remained settled for the provided duration
 * @param value The value to watch for changes
 * @param duration The amount of time to wait to confirm that the value is settled
 */
const useDebounce = (value: string, duration: number): boolean => {
    const timeoutRef = useRef(setTimeout(()=>undefined));
    const [settled, setSettled] = useState(true);
    const [numDebounces, setNumDebounces] = useState(-1);
    
    useEffect(() => {
        setNumDebounces((num: number) => num + 1);
        if (numDebounces <= 0) return; // prevents initially unsettled output on component mount...
        
        clearTimeout(timeoutRef.current);
        setSettled(false);
        timeoutRef.current = setTimeout(() => {
            setSettled(true);
        }, duration);

        return () => clearTimeout(timeoutRef.current);
    }, [value, duration]);

    return settled;
}

export default useDebounce;