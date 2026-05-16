import Greeting from "../../shared/components/Greeting";
import Sections from "./components/Sections";
import Header from "./components/Header";

const JiraDashboard = () => {
    return (
        <div className="flex flex-col h-[calc(150vh-2rem)] gap-6 bg-background text-foreground rounded-2xl pb-6 px-4 pt-4 overflow-hidden">
            <div className="shrink-0">
                <Greeting />
            </div>
            <div className="shrink-0">
                <Header />
            </div>
            <div className="flex-1 min-h-0 overflow-hidden">
                <Sections />
            </div>
        </div>
    )
}

export default JiraDashboard