// import { useMoralis } from 'react-moralis'
// import { useEffect } from 'react'

// const ManualHeader = () => {
//   // useMoralis is a react hook
//   const {
//     enableWeb3,
//     account,
//     isWeb3Enabled,
//     Moralis,
//     deactivateWeb3,
//     isWeb3EnableLoading,
//   } = useMoralis()

//   useEffect(() => {
//     Moralis.onAccountChanged((account) => {
//       if (account == null) {
//         window.localStorage.removeItem('connected')
//         deactivateWeb3()
//       }
//     })
//   }, [account])

//   useEffect(() => {
//     if (isWeb3Enabled) return
//     if (window !== undefined) {
//       if (localStorage.getItem('connected')) {
//         enableWeb3()
//       }
//     }
//   }, [isWeb3Enabled])

//   return (
//     <div>
//       {account ? (
//         <div>
//           Connected to {account.slice(0, 6)}...
//           {account.slice(account.length - 4)}
//         </div>
//       ) : (
//         <button
//           onClick={async () => {
//             enableWeb3()
//             if (window !== undefined) {
//               window.localStorage.setItem('connected', 'injected')
//             }
//           }}
//           disabled={isWeb3EnableLoading}
//         >
//           Connect
//         </button>
//       )}
//     </div>
//   )
// }

// export default ManualHeader
