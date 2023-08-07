import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { items_data } from "../../data/items_data";
import Link from "next/link";
import "tippy.js/dist/tippy.css";
import Meta from "../../components/Meta";
import Image from "next/image";
import { JoinGame, Guess, GetNumber, Withdraw,initWeb3 ,SetAddress} from "../../components/numbergame/Gamefunction";

const Item = () => {

  useEffect(() => {
    if(window.ethereum)
    initWeb3(window.ethereum);
    window.ethereum.on('accountsChanged', accounts => {
      SetAddress(accounts[0]);
    });
  }, []);

  const handleJoinGame = async () => {
    const entryBet = document.getElementById('entryBet').value;
    await JoinGame(entryBet);
  };

  const handleGuess = async () => {
    const guessBet = document.getElementById('guessBet').value;
    const playerGuess = document.getElementById('guessNumber').value;
    await Guess(guessBet, playerGuess);
  };

  const handleGetNumber = async () => {
    await GetNumber();
  };

  const handleWithdraw = async () => {
    await Withdraw();
  };

  const router = useRouter();
  const pid = router.query.item;

  const [imageModal, setImageModal] = useState(false);

  return (
    <>
      <Meta title={`${pid} || Xhibiter | NFT Marketplace Next.js Template`} />
      {/*  <!-- Item --> */}
      <section className="relative lg:mt-24 lg:pb-24 mt-24 pt-10 pb-24">
        <picture className="pointer-events-none absolute inset-0 -z-10 dark:hidden">
          <Image
            width={1519}
            height={773}
            priority
            src="/images/gradient_light.jpg"
            alt="gradient"
            className="h-full w-full object-cover"
          />
        </picture>
        <div className="container">
          {/* <!-- Item --> */}
          {items_data
            .filter((item) => item.id === pid)
            .map((item) => {
              const { image, title, id } = item;
              return (
                <div className="text-center mt-6">
                  <h1
                  className="text-3xl font-semibold">Welcome to the Number Game</h1>
                  <div className="md:flex md:flex-wrap" key={id}>
                  
                  {/* <!-- Image --> */}
                  <figure className="mb-8 md:w-2/5 md:flex-shrink-0 md:flex-grow-0 md:basis-auto lg:w-1/2 w-full">
                    <button
                      className=" w-full"
                      onClick={() => setImageModal(true)}
                    >
                      <Image
                        width={585}
                        height={726}
                        src={image}
                        alt={title}
                        className="rounded-2xl cursor-pointer h-full object-cover w-full"
                      />
                    </button>

                    {/* <!-- Modal --> */}
                    <div
                      className={
                        imageModal ? "modal fade show block" : "modal fade"
                      }
                    >
                      <div className="modal-dialog !my-0 flex h-full max-w-4xl items-center justify-center">
                        <Image
                          width={582}
                          height={722}
                          src={image}
                          alt={title}
                          className="h-full object-cover w-full rounded-2xl"
                        />
                      </div>

                      <button
                        type="button"
                        className="btn-close absolute top-6 right-6"
                        onClick={() => setImageModal(false)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          width="24"
                          height="24"
                          className="h-6 w-6 fill-white"
                        >
                          <path fill="none" d="M0 0h24v24H0z" />
                          <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" />
                        </svg>
                      </button>
                    </div>
                    {/* <!-- end modal --> */}
                  </figure>

                  {/* <!-- Details --> */}
                  <div className="md:w-3/5 md:basis-auto md:pl-8 lg:w-1/2 lg:pl-[3.75rem]">
                    {/* <!-- Number Game --> */}
                    <div className="mb-8 flex flex-wrap"></div>

                    <div className="dark:bg-jacarta-700 dark:border-jacarta-600 border-jacarta-100 rounded-2lg border bg-white p-8">
                      <input
                        className="border border-solid dark:border-jacarta-600 border-gray-300 mb-3 rounded-full py-3 px-8 w-full"
                        placeholder="Enter your Entry Bet"
                        id="entryBet"
                      ></input>
                      <button
                        className="bg-accent shadow-accent-volume hover:bg-accent-dark inline-block w-full rounded-full py-3 px-8 text-center font-semibold text-white transition-all mb-3"
                        onClick={handleJoinGame}
                      >
                        Join Game
                      </button>
                      <input
                        className="border border-solid dark:border-jacarta-600 border-gray-300 mb-3 rounded-full py-3 px-8 w-full"
                        placeholder="Enter your Bet here"
                        id="guessBet"
                      ></input>
                      <p className="mb-3 font-semibold">Hello</p>
                      <input
                        className="border border-solid dark:border-jacarta-600 border-gray-300 mb-3 rounded-full py-3 px-8 w-full"
                        placeholder="Enter your Guess here"
                        id="guessNumber"
                      ></input>
                      <Link href="#">
                        <button
                          className="bg-accent shadow-accent-volume hover:bg-accent-dark inline-block w-full rounded-full py-3 px-8 text-center font-semibold text-white transition-all mb-3"
                          onClick={handleGuess}
                        >
                          Guess
                        </button>
                        <button
                          className="bg-accent shadow-accent-volume hover:bg-accent-dark inline-block w-full rounded-full py-3 px-8 text-center font-semibold text-white transition-all mb-2"
                          onClick={handleWithdraw}
                        >
                          Withdraw
                        </button>
                      </Link>
                    </div>
                    {/* <!-- end bid --> */}
                  </div>
                  {/* <!-- end details --> */}
                </div>
                </div>
                
              );
            })}
        </div>
      </section>
      {/* <!-- end item --> */}
    </>
  );
};

export default Item;
