import React from 'react'

const Page1 = () => {
  return (
    <div className='mx-24 min-h-full my-12'>
      <div className='flex items-center text-[#FFF9EF] text-8xl font-bold'>
        <span>Share your project</span>
        <img src="/img2.png" className="w-24 h-24 ml-6 relative -translate-y-6" alt="dec2" 
        />
      </div>
      <div className='my-6 text-[#FDE69E] text-8xl font-bold flex items-center'>
        <span className="mr-6">with other</span>
        <img src="/img1.png" className="w-20 h-20" alt="dec1" />
      </div>      <div className='mt-16 text-[#FFF9EF] text-2xl'>ร่วมแชร์ผลงานในรายวิชาร่วมกับเพื่อน ๆ</div>
      <div className='my-3 text-[#4A4D4D] text-2xl flex justify-between items-center'>หรือเข้าชมผลงานของรุ่นพี่ในแต่ละรายวิชา ก่อนทำการตัดสินใจลงทะเบียน
        <a href="#page2">
          <button type="button" className='bg-[#FDE69E] text-[#4A4D4D] text-xl font-medium py-2 px-6 rounded-[15px] hover:bg-[#FFF9EF] transition-colors duration-300 mr-10'>Get Start</button>
        </a>
      </div>
    </div>
  )
}

export default Page1 