import {useCallback, useState } from "react";
import debounce from "lodash.debounce";

function useDebounce(callback, delay) {
    const debouncedFn = useCallback(
        debounce((...args) => callback(...args), delay),
        [delay] // will recreate if delay changes
    );
    return debouncedFn;
}

const Slider = ({min, max, step=1, name}) => {

    const [value, setValue] = useState(parseInt(min) + ((max-min) / 2))
    const [dbValue, setDbValue] = useState()

    const debouncedSave = useDebounce((nextValue) => setDbValue(nextValue), 500);

    const labelName = name.replace(/\s/g, '-').toLowerCase()
    
    const allRanges = document.querySelectorAll(".together");
        allRanges.forEach(wrap => {
        const range = wrap.querySelector(".slider");
        const bubble = wrap.querySelector(".current");

        range.addEventListener("input", () => {
            setBubble(range, bubble);
        });
    });

    const handleChange = (event) => {
        const { value: nextValue } = event.target;
        setValue(nextValue);
        debouncedSave(nextValue);
    };


    function setBubble(range, bubble) {
        const val = range.value;
        const newVal = Number(((val - min) * 100) / (max - min));
        bubble.innerHTML = val;
        bubble.style.opacity = 1;
        bubble.style.left = `calc(${newVal}% + (${8 - newVal * 0.15}px) - 16px)`;
    }

    return(
        <>
            <div className="together">
                <label htmlFor={labelName}>{name}</label>
                <input type="range" name={labelName} min={min} max={max} value={value} step={step} onChange={handleChange} id="slider" className="slider"/>
                <div className="values">
                    <span className="min">{min}</span>
                    <span className="current">{value}</span>
                    <span className="max">{max}</span>
                </div>
            </div>
        </>
    )
}

export default Slider;