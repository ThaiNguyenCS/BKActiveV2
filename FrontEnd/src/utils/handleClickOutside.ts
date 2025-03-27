"use client";

import { useEffect } from "react";

export const useHandleClickOutsideAlerter = ({ ref, setState, action }: ClickOutsideAlerterProps) => {
    useEffect(() => {
        function handleClickOutside(event: Event) {
            if (event instanceof MouseEvent || event instanceof FocusEvent) {
                if (Array.isArray(ref)) {
                    if (!ref.some(r => r.current && r.current.contains(event.target as Node))) {
                        if (setState) {
                            setState(false);
                        }
                        if (action) {
                            action();
                        }
                    }
                } else {
                    if (ref.current && !ref.current.contains(event.target as Node)) {
                        if (setState) {
                            setState(false);
                        }
                        if (action) {
                            action();
                        }
                    }
                }
            }
        }

        const events: Array<keyof DocumentEventMap> = ["mousedown", "focusin"];
        events.forEach((event) => document.addEventListener(event, handleClickOutside));

        return () => {
            events.forEach((event) => document.removeEventListener(event, handleClickOutside));
        };
    }, [ref, setState, action]);
};