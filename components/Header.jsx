import { ConnectButton } from 'web3uikit'

const Header = () => {
  return (
    <div className="border-b-2 flex flex-row p-5 bg-blue-200 rounded-lg">
      <spam className='text-2xl text-blue-600 font-extrabold py-3 px-6 rounded-xl'>Lottery</spam>
      <div className='ml-auto py-1 px-4'>
      <ConnectButton moralisAuth={false} />
      </div>
    </div>
  )
}

export default Header
