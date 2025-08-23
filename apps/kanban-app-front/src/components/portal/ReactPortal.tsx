import { createPortal } from "react-dom";
import { useLayoutEffect, useState } from "react";

type Props = {
    children: React.ReactNode
    wrapperId: string
}


function createWrappeAndAppendToBody(wrapperId: string) {
    const wrapperElement = document.createElement('div')
    wrapperElement.setAttribute('id', wrapperId)
    document.body.appendChild(wrapperElement)
    
    return wrapperElement
}

const ReactPortal = ({children, wrapperId = "portal-wrapper"}: Props) => {
    
    const [wrapperElement, setWrapperElement] = useState<HTMLElement | null>(null)


    useLayoutEffect(() => {
        let element = document.getElementById(wrapperId);
        let systemCreated = false;
    
        if (!element) {
         systemCreated = true
         element = createWrappeAndAppendToBody(wrapperId)
        }

        setWrapperElement(element);

        return () => {
            // if the element was created by the system, remove it when the component unmounts
            if (systemCreated && element!.parentNode) {
                // remove from the parentNod of the element
                element!.parentNode.removeChild(element as HTMLElement)
            }

        }

    },[wrapperId])

    if (wrapperElement === null) return null;



    return createPortal(children, wrapperElement as HTMLElement)
}

export default ReactPortal