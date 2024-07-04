import {useEffect, useRef} from "react";
import {useStore} from "effector-react";
import {Action, Entity, ActionPayload, EntityPayload} from "./types";
import {ACTIONS, ENTITIES} from "./constants";

export const useEventProvider = () => {
    const observers = useRef([]);

    useEffect(() => {
        return () => {
            observers.current.forEach(observer => {
                observer.unsubscribe();
            });
        }
    }, []);

    const emit = <T extends Action, P extends ActionPayload<T>>(action: T, payload?: P): void => {
        if (!ACTIONS[action]) return;

        if (payload) //@ts-ignore
            ACTIONS[action](payload);
        else //@ts-ignore
            ACTIONS[action]();
    }

    const observe = <T extends Entity, P extends EntityPayload<T>>(
        entity: T,
        callback: (payload: P) => void
    ): void => {
        //@ts-ignore
        const unwatch = ENTITIES[entity].watch((data: P) => {
            callback(data);
        });

        observers.current.push(unwatch);
    }

    return {emit, observe};
}

export const useStoreProvider = <T extends Entity, R extends EntityPayload<T>>(entity: T): R => {
    //@ts-ignore
    const data = useStore(ENTITIES[entity]);
    //@ts-ignore
    return data;
}