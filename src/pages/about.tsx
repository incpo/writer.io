import { NextPage } from "next";
import MainContainer from "~/containers/Main";
import {useRouter} from "next/navigation";

const About: NextPage = () => {
    const router = useRouter()

    return(
        <MainContainer>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content text-center">
                    <div className="max-w-md">
                        <h1 className="text-5xl font-bold">Writer IO</h1>
                        <p className="py-6">It is a good tool for programmers to keep code base.<br/>
                            No more searching in repos to find code example, writerIo help to dont loose your code.</p>
                        <button className="btn btn-primary" onClick={()=>router.push('/')}>Get Started</button>
                    </div>
                </div>
            </div>
        </MainContainer>
    )
}

export default About;