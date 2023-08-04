import { useRouter } from 'next/router';
import React from 'react'

 const SearchPanel = ( {isVisible, users, onClose}) => {
    if (!isVisible) return null;

   const router = useRouter();
  return (
<div className='fixed inset-y-16 inset-x-4 flex justify-center items-center'>
  <div className='overflow-hidden bg-white rounded-md outline outline-3 outline-gray-200 w-11/12 md:w-1/2 h-full mx-auto flex flex-col text-black font-bold'>
    <ul>
        
      {
        users.map((user) => (<li key={user.id}>
            <div className='flex items-center justify-center mt-3 cursor-pointer'onClick={() => router.push(`/${user.data().username}`).then(() => onClose())} >
            
            <img src={user.data().profileImg} className='w-10 h-10 rounded-full border p-[2px]' alt=''></img>
            <div>

            <div className='w-20 ml-6'>
            <h2 className='font-semibold text-sm'>{user?.data().username}</h2>
            </div>
               
            </div>
            {/* {
                hasFollowed ? (
                 <button className='text-blue-400 text-sm font-bold w-16' onClick={followUser}>Following</button> ):(
                  <button className='text-blue-400 text-sm font-bold w-16' onClick={followUser}>Follow</button>)
            } */}
                
            </div>
            </li>
        ))
      }
    </ul>
  </div>
</div>

  )
}

export default SearchPanel