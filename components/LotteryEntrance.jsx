import { contractAbi, address } from '../constants'
import { useMoralis, useWeb3Contract } from 'react-moralis'
import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import { useNotification } from 'web3uikit'

const LotteryEntrance = () => {
  const { chainId: chainIdHex, isWeb3Enabled } = useMoralis()
  const chainId = parseInt(chainIdHex)
  const lotteryAddress = chainId in address ? address[chainId][0] : null
  const [entranceFee, setEntranceFee] = useState('0')
  const [numberOfPlayers, setNumberOfPlayers] = useState('0')
  const [recentWinner, setRecentWinner] = useState('0')
  const dispatch = useNotification()

  const {
    runContractFunction: enterLottery,
    isFetching,
    isLoading,
  } = useWeb3Contract({
    abi: contractAbi,
    contractAddress: lotteryAddress,
    functionName: 'enterLottery',
    params: {},
    msgValue: entranceFee,
  })
  const { runContractFunction: getEntranceFee } = useWeb3Contract({
    abi: contractAbi,
    contractAddress: lotteryAddress,
    functionName: 'getEntranceFee',
    params: {},
  })
  const { runContractFunction: getNumberOfPlayers } = useWeb3Contract({
    abi: contractAbi,
    contractAddress: lotteryAddress,
    functionName: 'getNumberOfPlayers',
    params: {},
  })
  const { runContractFunction: getRecentWinner } = useWeb3Contract({
    abi: contractAbi,
    contractAddress: lotteryAddress,
    functionName: 'getRecentWinner',
    params: {},
  })

  useEffect(() => {
    if (isWeb3Enabled) {
      updateUi()
    }
  }, [isWeb3Enabled])

  const updateUi = async () => {
    const entranceFeeFromContract = (await getEntranceFee()).toString()
    const numberOfPlayersFromContract = (await getNumberOfPlayers()).toString()
    const recentWinnerFromContract = await getRecentWinner()
    setEntranceFee(entranceFeeFromContract)
    setNumberOfPlayers(numberOfPlayersFromContract)
    setRecentWinner(recentWinnerFromContract)
  }

  const handleSuccess = async (tx) => {
    await tx.wait(1)
    handleNewNotification(tx)
    updateUi()
  }

  const handleNewNotification = () => {
    dispatch({
      type: 'info',
      message: 'Transaction Complete!',
      title: 'Tx Notification',
      position: 'topR',
      icon: 'bell',
    })
  }

  return (
    <div className="flex justify-center border p-5 bg-blue-200 rounded-lg font-bold ">
      {lotteryAddress ? (
        <div>
          <div className="border border-blue-500 py-2 px-5 rounded-xl	mx-2 my-5">
            <div className="border border-blue-500 py-2 px-5 rounded-xl	mx-2 my-5">
              Entrance fee: {ethers.utils.formatUnits(entranceFee, 'ether')} ETH
            </div>
            <div className="border border-blue-500 py-2 px-5 rounded-xl	mx-2 my-5">
              Number of players in the Lottery is {numberOfPlayers}
            </div>
            <div className="border border-blue-500 py-2 px-5 rounded-xl	mx-2 my-5">
              Recent winner is {recentWinner}
            </div>
          </div>
          <div
            className="bg-white hover:bg-blue-500  flex justify-center text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded-lg"
            onClick={async () => {
              console.log(
                await enterLottery({
                  onSuccess: handleSuccess,
                  onError: (e) => console.log(e),
                })
              )
            }}
          >
            {isLoading || isFetching ? (
              <div className="animate-spin spinner-border h-8 w-8 border-b-2 bg-blue rounded-full"></div>
            ) : (
              'Enter Raffle'
            )}
          </div>
        </div>
      ) : (
        <span className="border border-blue-500 py-2 px-5 rounded-xl	mx-2 my-5">
          Connect your wallet for entering the lottery
        </span>
      )}
    </div>
  )
}

export default LotteryEntrance
