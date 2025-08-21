import { useCallback, useState } from "react";

export const useClipboard = () => {


    const [isCopied, setIsCopied] = useState(false);

    const hasNavigator = typeof navigator !== 'undefined' && !!navigator.clipboard

    const copy = useCallback(async (text: string) => {
        setIsCopied(false);
        if (!hasNavigator) return

        try {
            await navigator.clipboard.writeText(text);
            setIsCopied(true);
            setTimeout(() => {
                setIsCopied(false);
            }, 2000);
        } catch (error) {
            console.error('Failed to copy text:', error);
        }
    }, [hasNavigator])

    return { copy, isCopied }
}