import { CheckIcon, QuestionMarkCircleIcon, StarIcon } from '@heroicons/react/solid'
import { RadioGroup } from '@headlessui/react'
import { ShieldCheckIcon } from '@heroicons/react/outline'



import Layout from '../components/Layout'
import HeroSection from '../components/HeroSection'
import CollectionSection from '../components/CollectionSection'
import MilestoneSection from '../components/MilestoneSection'
import FaqSection from '../components/FaqSection'

import ABI from "../abi/abi.json";
import { ethers } from "ethers";
import { useWeb3React } from "@web3-react/core"
import { useEffect, useState, Fragment } from 'react'
import useAddress from '../hooks/useAddress'
import { Contract } from "@ethersproject/contracts";
import { parseEther } from "@ethersproject/units";
import { Dialog, Transition } from '@headlessui/react'


const product = {
  name: 'Everyday Ruck Snack',
  href: '#',
  price: '$220',
  description:
      "Don't compromise on snack-carrying capacity with this lightweight and spacious bag. The drawstring top keeps all your favorite chips, crisps, fries, biscuits, crackers, and cookies secure.",
  imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-04-featured-product-shot.jpg',
  imageAlt: 'Model wearing light green backpack with black canvas straps and front zipper pouch.',
  breadcrumbs: [
    { id: 1, name: 'Travel', href: '#' },
    { id: 2, name: 'Bags', href: '#' },
  ],
  sizes: [
    { name: '18L', description: 'Perfect for a reasonable amount of snacks.' },
    { name: '20L', description: 'Enough room for a serious amount of snacks.' },
  ],
}
const reviews = { average: 4, totalCount: 1624 }

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


export default function Home() {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0])


  const { active, chainId, library } = useWeb3React()
  const [status, setStatus] = useState("")
  const [address, network] = useAddress()
  const [mintStarted, setMintStarted] = useState(false)
  const [totalSupply, setTotalSupply] = useState(0)

  const [isErrorOpen, setIsErrorOpen] = useState(false)
  const [isTransactionOpen, setIsTransactionOpen] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")
  const [transactionId, setTransactionId] = useState("")

  const [count, setCount] = useState()

  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    console.log(address)
    console.log(network)
  }, [])

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('chainChanged', () => {
        setRefresh(!refresh)
      })
      window.ethereum.on('accountsChanged', () => {
        setRefresh(!refresh)
      })
    }
  })

  useEffect(() => {
    const provider = ethers.getDefaultProvider(network, { 'infura': '786649a580e3441f996da22488a8742a' });
    const contract = new ethers.Contract(address, ABI, provider);

    contract.getSaleStarted().then((started) => {
      console.log(started)
      setMintStarted(started)
      console.log(mintStarted)

      if (!started) {
        setStatus("Not Started")
      } else {
        // todo: ""
        setStatus("Started")
      }

    }).catch((error) => {
      console.log(error)
    })

    contract.totalSupply().then((count) => {
      console.log('count: ' + count)
      console.log(count)
      setTotalSupply(count)
    }).catch((error) => {
      console.log(error)
    })
  }, [active, chainId])

  const mint = () => {
    // alert('mint will start about on Nov 14th, stay tuned...')
    // return 
    if (active) {
      const contract = new Contract(address, ABI, library.getSigner())
      if (!mintStarted) {
        // alert("mint not started...")
        setErrorMsg("Mint Not Started...")
        openErrorModal()
        return
      }
      console.log(count)
      contract.mint(count, { 'value': parseEther((0.0333 * count).toString()) }).then((res) => {
        console.log(res)
        // @ts-ignore
        setTransactionId(res["hash"])
        openTransactionModal()
      }).catch((error) => {
        // @ts-ignore
        console.log(error['data'])
        //alert(error['message'])
        if (error['data'] != null && error['data'] !== undefined) {
          setErrorMsg(error['data']['message'])
        } else {
          setErrorMsg(error['message'])
        }
        openErrorModal()
      })
    } else {
      // alert("please connect to mainnet")
      setErrorMsg("Please Connect Metamask to Mainnet...")
      openErrorModal()
    }
  }

  const closeErrorModal = () => {
    setIsErrorOpen(false)
  }
  const openErrorModal = () => {
    setIsErrorOpen(true)
  }

  const closeTransactionModal = () => {
    setIsTransactionOpen(false)
  }
  const openTransactionModal = () => {
    setIsTransactionOpen(true)
  }

  const onCountChange =  (event) => {
    console.log(event.target.value)
    setCount(event.target.value)
  }


  return (
    <Layout>
      <HeroSection />
      <section className="text-ukraine-yellow body-font bg-ukraine-blue" id="mint">
        <div className="bg-ukraine-blue">
          <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:gap-x-8">
            <div className="lg:max-w-lg lg:self-end">
              <div className="mt-4">
                <h1 className="text-3xl font-extrabold tracking-tight text-ukraine-yellow sm:text-4xl">Mint StandWithUkraine NFT</h1>
              </div>

              <section aria-labelledby="information-heading" className="mt-4">
                <h2 id="information-heading" className="sr-only">
                  Product information
                </h2>

                <div className="flex items-center">
                  <p className="text-lg text-ukraine-yellow sm:text-xl">Free to mint 1 NFT</p>

                  <div className="ml-4 pl-4 border-l border-ukraine-yellow">
                    <div>
                      0.01ETH each if you mint multiple
                    </div>
                  </div>
                </div>

                <div className="mt-4 space-y-6">
                  <p className="text-base text-yellow-200">
                    StandWithUkraine NFT is your proof of donation to Ukraine civilians.

                    After sale, <span className='text-ukraine-yellow text-2xl'> 50%</span> will be donated to Ukraine civilians who're suffering from the war initiated by Putin🍮.
                  </p>
                </div>
              </section>
            </div>

            {/* Product image */}
            <div className="mt-10 lg:mt-0 lg:col-start-2 lg:row-span-2 lg:self-center">
              <div className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden">
                <img src={product.imageSrc} alt={product.imageAlt} className="w-full h-full object-center object-cover" />
              </div>
            </div>

            {/* Product form */}
            <div className="mt-10 lg:max-w-lg lg:col-start-1 lg:row-start-2 lg:self-start">
              <section aria-labelledby="options-heading">
                <h2 id="options-heading" className="sr-only">
                  Product options
                </h2>

                <form>
                  <div className="sm:flex sm:justify-between">
                    {/* Size selector */}
                    <RadioGroup value={selectedSize} onChange={setSelectedSize}>
                      <RadioGroup.Label className="block text-sm font-medium text-gray-700">Size</RadioGroup.Label>
                      <div className="mt-1 grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {product.sizes.map((size) => (
                            <RadioGroup.Option
                                as="div"
                                key={size.name}
                                value={size}
                                className={({ active }) =>
                                    classNames(
                                        active ? 'ring-2 ring-indigo-500' : '',
                                        'relative block border border-gray-300 rounded-lg p-4 cursor-pointer focus:outline-none'
                                    )
                                }
                            >
                              {({ active, checked }) => (
                                  <>
                                    <RadioGroup.Label as="p" className="text-base font-medium text-gray-900">
                                      {size.name}
                                    </RadioGroup.Label>
                                    <RadioGroup.Description as="p" className="mt-1 text-sm text-gray-500">
                                      {size.description}
                                    </RadioGroup.Description>
                                    <div
                                        className={classNames(
                                            active ? 'border' : 'border-2',
                                            checked ? 'border-indigo-500' : 'border-transparent',
                                            'absolute -inset-px rounded-lg pointer-events-none'
                                        )}
                                        aria-hidden="true"
                                    />
                                  </>
                              )}
                            </RadioGroup.Option>
                        ))}
                      </div>
                    </RadioGroup>
                  </div>
                  {/*<div className="mt-4">*/}
                  {/*  <a href="#" className="group inline-flex text-sm text-gray-500 hover:text-gray-700">*/}
                  {/*    <span>What size should I buy?</span>*/}
                  {/*    <QuestionMarkCircleIcon*/}
                  {/*        className="flex-shrink-0 ml-2 h-5 w-5 text-gray-400 group-hover:text-gray-500"*/}
                  {/*        aria-hidden="true"*/}
                  {/*    />*/}
                  {/*  </a>*/}
                  {/*</div>*/}
                  <div className="mt-10">
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                    >
                      Add to bag
                    </button>
                  </div>
                  {/*<div className="mt-6 text-center">*/}
                  {/*  <a href="#" className="group inline-flex text-base font-medium">*/}
                  {/*    <ShieldCheckIcon*/}
                  {/*        className="flex-shrink-0 mr-2 h-6 w-6 text-gray-400 group-hover:text-gray-500"*/}
                  {/*        aria-hidden="true"*/}
                  {/*    />*/}
                  {/*    <span className="text-gray-500 hover:text-gray-700">Lifetime Guarantee</span>*/}
                  {/*  </a>*/}
                  {/*</div>*/}
                </form>
              </section>
            </div>
          </div>
        </div>
      </section>
      <CollectionSection />
      {/*<MilestoneSection />*/}
      <FaqSection />


      <Transition appear show={isErrorOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeErrorModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div
                className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-ukraine-yellow shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-lg leading-6 text-ukraine-blue"
                >
                  Failure occur.
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-ukraine-blue">
                    {errorMsg}
                  </p>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-ukraine-yellow bg-ukraine-blue border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={closeErrorModal}
                  >
                    Close
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>

      <Transition appear show={isTransactionOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeTransactionModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div
                className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Transaction Submited
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Click <a href={"https://etherscan.io/tx/" + transactionId} target='_blank' rel="noreferrer" className="underline text-red-500"> me </a> to see transaction detail
                  </p>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={closeTransactionModal}
                  >
                    Close
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>

    </Layout>
  )
}
