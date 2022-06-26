import Link from "next/link";

type LayoutPropsType = {
    children: any
}


const Layout = ({children}:LayoutPropsType): JSX.Element => {

    return (

        <div className={"min-h-screen flex flex-col justify-between bg-orange-400 font-roboto"}>
        <header className={"text-center text-4xl text-gray-800 m-4   "} >
            <Link href={"/"} className={''}>
                <a href="">
                    <h1 >
                        <div>Pets</div>
                        <div className={"font-bold"}>Pats Pats</div>
                    </h1>
                    <h1>Cutry</h1>
                </a>
            </Link>
        </header>
        <div className="md:px-40 px-10">
            {children}
        </div>
        <footer className={"text-center bg-gray-800 py-10 text-gray-50"}>
            <p>Copyright 2022 Pets Shop :) </p>
        </footer>
    </div>);
};

export default Layout;