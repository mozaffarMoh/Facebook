import { useMediaQuery } from "react-responsive";

export const MediaQuery = () => {
    const isScreen555 = useMediaQuery({ maxWidth: 555 });
    const isScreen666 = useMediaQuery({ maxWidth: 666 });
    const isScreen800 = useMediaQuery({ maxWidth: 800 });
    const isScreen900 = useMediaQuery({ maxWidth: 900 });
    const isScreen1000 = useMediaQuery({ maxWidth: 1000 });

    return { isScreen555, isScreen666, isScreen800, isScreen900, isScreen1000 };
}
