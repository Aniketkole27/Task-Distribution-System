import Greeting from "../../shared/components/Greeting";
import Sections from "./components/Sections";
import Header from "./components/Header";

const JiraDashboard = () => {
    return (
        <div className="flex flex-col gap-6 bg-background text-foreground rounded-2xl pb-6 px-4 pt-4 h-full overflow-auto">
            <Greeting />
            <Header />
            <Sections />
        </div>
    )
}

export default JiraDashboard