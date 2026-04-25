import Greeting from "../../shared/components/Greeting";
import Sections from "./components/Sections";
import Header from "./components/Header";

const JiraDashboard = () => {
    return (
        <div className="flex flex-col gap-4 w-full">
            <Greeting />
            <Header />
            <Sections />
        </div>
    )
}

export default JiraDashboard