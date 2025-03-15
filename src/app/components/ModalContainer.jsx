import { isClientSide } from "@/utils/renderSide";
import { useEffect, useMemo, useState } from "react";
import ReactDOM from "react-dom";

function Modal({ children, visible = false, width = null, styles, ...props }) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        return () => setIsMounted(false);
    }, []);

    const element = useMemo(() => {
        if (isClientSide()) {
            return document.createElement("div");
        }
        return null;
    }, []);

    useEffect(() => {
        if (element) {
            document.body?.appendChild(element);

            return () => {
                document.body?.removeChild(element);
            };
        }
    }, [element]);

    if (!isMounted || !element) {
        return null;
    }

    return ReactDOM.createPortal(
        <div
            className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 whitespace-nowrap ${
                visible ? "block" : "hidden"
            }`}
        >
            <div
                {...props}
                style={{ ...styles }}
                className={`bg-white p-6 rounded shadow-lg text-black max-sm:p-4 ${width ? width : "w-[90%]"}`}
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>,
        element,
    );
}

export default Modal;
