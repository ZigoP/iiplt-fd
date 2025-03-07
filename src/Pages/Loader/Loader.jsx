import * as React from "react";

import { Progress } from "../../components/ui/progress";

const Loader = () => {
    const [progress, setProgress] = React.useState(13);

    React.useEffect(() => {
        const timer = setTimeout(() => setProgress(66), 500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="flex justify-center items-center h-full w-full">
            <Progress value={progress} className="w-[60%]" />
        </div>
    );
}

export default Loader