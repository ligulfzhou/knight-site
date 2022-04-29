export default function HeroSection() {
    return (
        // <div className="hero min-h-screen bg-ukraine-yellow text-ukraine-blue">
        //     <div className="hero-content text-center">
        //         <div className="">
        //             <h1 className="text-3xl font-bold">🇺🇦 We Stand With Ukraine 🇺🇦</h1>
        //             <p className="py-6 max-w-md">
        //                 StandWithUkraine NFT is a collection of 6,000 randomly generated animated pixel soldiers on the
        //                 Ethereum Mainnet.
        //                 There are some thounds of Ukraine soldiers, which are brave, fearless and strong, and ready
        //                 fighting to resist Russian invasion. And we believe Putin will fail eventually.
        //                 <br className="inline-block"/><br className="inline-block"/>
        //                 <span className='text-xl'>Justice belongs to Ukraine.</span> and we <span
        //                 className='text-xl'>#StandWithUkraine.</span>
        //             </p>
        //             <button className="btn btn-primary">Get Started</button>
        //         </div>
        //     </div>
        // </div>

        <section className="text-ukraine-blue body-font bg-ukraine-yellow">
            <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
                <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
                    <h1 className="font-extrabold sm:text-4xl text-3xl mb-4 font-medium text-ukraine-blue">🇺🇦 We Stand With Ukraine 🇺🇦
                    </h1>
                    <p className="mb-8 leading-relaxed font-bold">
                        StandWithUkraine NFT is a collection of 6,000 randomly generated animated pixel soldiers on the Ethereum Mainnet.
                        There are some thounds of Ukraine soldiers, which are brave, fearless and strong, and ready  fighting to resist Russian invasion.  And we believe Putin will fail eventually.
                        <br className="inline-block" /><br className="inline-block" />
                        <span className='text-xl'>Justice belongs to Ukraine.</span> and we  <span className='text-xl'>#StandWithUkraine.</span>
                    </p>
                    <p className="pb-4 text-indigo-600">
                        Join our discord and follow our twitter to get latest announcements about the NFTs.<br/> Stay Tuned.
                    </p>
                    <div className="flex justify-center">
                        <a href="https://twitter.com/SW_UkraineNFT" target="_blank" className="inline-flex border-0 py-2 px-6 focus:outline-none rounded text-lg">
                            <img src="/twitter-blue.svg" className="text-ukraine-blue"/>
                        </a>
                        <a href="https://discord.gg/yYYbvAXDYX" target="_blank" className="inline-flex border-0 py-2 px-6 text-ukraine-blue focus:outline-none rounded text-lg">
                            <img src="/discord-blue.svg" className="text-ukraine-blue"/>
                        </a>
                    </div>
                </div>
                <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
                    <img className="object-cover object-center rounded border border-2" alt="hero" src="/images/logo.gif" />
                </div>
            </div>
        </section>
    )
}