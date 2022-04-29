import {useRouter} from "next/router";
import {default as HTMLHead} from "next/head";
import ConnectButton from "./ConnectButton";

export default function Layout({children}) {
    return (
        <div className="bg-black">
            <Head/>
            <Header/>
            <div>{children}</div>
            <Footer/>
        </div>
    );
}

function Head() {
    return (
        <HTMLHead>
            <title>Stand With Ukraine NFT 🇺🇦</title>
            <meta name="title" content="Stand With Ukraine NFT"/>
            <meta
                name="description"
                content="Stand With Ukraine NFTs are 6000 randomly generated soldiers and living on Eth mainnet."
            />

            {/* OG + Faceook */}
            <meta property="og:type" content="website"/>
            <meta property="og:url" content="https://www.standwithukrainenft.xyz/"/>
            <meta property="og:title" content="StandWithUkraine NFT"/>
            <meta
                property="og:description"
                content="Stand With Ukraine NFTs are 6000 randomly generated soldiers and living on Eth mainnet."
            />
            <meta property="og:image" content="https://f002.backblazeb2.com/file/pixelknights/knights.jpeg"/>

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image"/>
            <meta property="twitter:url" content="https://www.pixelknights.art/"/>
            <meta property="twitter:title" content="Stand With Ukraine NFT"/>
            <meta
                property="twitter:description"
                content="StandWithUkraine NFTs are 6000 randomly generated soldiers and living on Eth mainnet."
            />
            <meta property="twitter:image" content="https://f002.backblazeb2.com/file/pixelknights/knights.jpeg"/>
        </HTMLHead>);
}

/**
 * Header
 * @returns {ReactElement} Header
 */
function Header() {
    const {pathname} = useRouter();
    // const links = [{name: "FAQ", path: "/faq"}, {name: "Resources", path: "/resources"},];

    return (
        <header className="body-font bg-ukraine-blue text-ukraine-yellow top-0 z-20 sticky overflow-hidden" id="home">
            <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                <a href='/' className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
                    {/*<img src="https://f002.backblazeb2.com/file/pixelknights/logo.png" viewBox="0 0 24 24" className="w-10 h-10 p-1 rounded-full"/>*/}
                    <div className='inline-block'> 🇺🇦</div>
                    <span className="ml-3 text-xl text-ukraine-yellow">Stand With Ukraine NFT</span>
                </a>
                <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
                    <a className="mr-5 hover:text-blue-600" href="#mint">Mint</a>
                    <a className="mr-5 hover:text-blue-600" href="#collection">Collection</a>
                    {/* <a className="mr-5 hover:text-blue-600" href="#milestone">Milestone</a> */}
                    <a className="mr-5 hover:text-blue-600" href="#faq">FAQ</a>
                </nav>
                <ConnectButton/>
            </div>
        </header>);
}

/**
 * Footer component
 * @returns Footer
 */
function Footer() {
    return (
        <footer className="body-font bg-ukraine-yellow text-ukraine-blue">
            <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
                <a className="flex title-font font-medium items-center md:justify-start justify-center">
                    <span className="ml-3 text-xl">StandWithUkraine NFT</span>
                </a>
                <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
                <a href="https://twitter.com/SW_UkraineNFT" target="_blank"
                   className="inline-flex border-0 py-2 px-6 focus:outline-none rounded text-lg">
                            <img src="/twitter-blue.svg" className="w-5 h-5"/>
                        </a>
                        <a href="https://discord.gg/kvyMYEWXes" target="_blank"
                           className="inline-flex border-0 py-2 px-6 text-indigo-500 focus:outline-none rounded text-lg">
                            <img src="/discord-blue.svg" className="w-5 h-5"/>
                        </a>
                </span>
            </div>
        </footer>
    );
}
