import React from 'react'

const Resultcontent = () => {
    const mockresult = [
        {
            date : "20th May 2024",
            participants : 100,
            amount : 0.01,
            status : "Ongoing",
            Winners : "N/A"
        },
        {
            date : "20th May 2024",
            participants : 100,
            amount : 0.01,
            status : "Ongoing",
            Winners : "N/A"
        },  {
            date : "20th May 2024",
            participants : 100,
            amount : 0.01,
            status : "Ongoing",
            Winners : "N/A"
        },  {
            date : "20th May 2024",
            participants : 100,
            amount : 0.01,
            status : "Ongoing",
            Winners : "N/A"
        },
        {
            date : "20th May 2024",
            participants : 100,
            amount : 0.01,
            status : "Ongoing",
            Winners : "N/A"
        },
        {
            date : "20th May 2024",
            participants : 100,
            amount : 0.01,
            status : "Ongoing",
            Winners : "N/A"
        },
        {
            date : "20th May 2024",
            participants : 100,
            amount : 0.01,
            status : "Ongoing",
            Winners : "N/A"
        },
        {
            date : "20th May 2024",
            participants : 100,
            amount : 0.01,
            status : "Ongoing",
            Winners : "0x7523d,0x8423,d0b7423d"
        },
        {
            date : "20th May 2024",
            participants : 100,
            amount : 0.01,
            status : "Ongoing",
            Winners : "0x7523d,0x8423,d0b7423d"
        },  {
            date : "20th May 2024",
            participants : 100,
            amount : 0.01,
            status : "Ongoing",
            Winners : "0x7523d,0x8423,d0b7423d"
        },  {
            date : "20th May 2024",
            participants : 100,
            amount : 0.01,
            status : "Ongoing",
            Winners : "0x7523d,0x8423,d0b7423d"
        },
        {
            date : "20th May 2024",
            participants : 100,
            amount : 0.01,
            status : "Ongoing",
            Winners : "0x7523d,0x8423,d0b7423d"
        },{
            date : "20th May 2024",
            participants : 100,
            amount : 0.01,
            status : "Ongoing",
            Winners : "0x7523d,0x8423,d0b7423d"
        },
        {
            date : "20th May 2024",
            participants : 100,
            amount : 0.01,
            status : "Ongoing",
            Winners : "0x7523d,0x8423,d0b7423d"
        },{
            date : "20th May 2024",
            participants : 100,
            amount : 0.01,
            status : "Ongoing",
            Winners : "0x7523d,0x8423,d0b7423d"
        },
    ]
  
    return (
    <div>
        <div className="text-[#FFFFFF] mx-28 mt-10">
        Lorem ipsum dolor sit amet consectetur. Purus faucibus nulla id mi.. Vel
        volutpat pellentesque aliquam faucibus nunc venenatis commodo commodo
        pulvinar. Vel volutpat pellentesque aliquam faucibus nunc venenatis
        commodo commodo pulvinar Vel volutpat pellentesque aliquam faucibus nunc
        venenatis commodo commodo pulvinar.
      </div>
        <div className="mx-28 bg-[#000000] h-[100vh] mt-10 pt-6 text-[#ffffff] overflow-y-scroll custom-scrollbar">
            <table className="min-w-full border-collapse">
            <thead> 
            <tr className=''>
                <th className="px-6 py-3 text-center">Date</th>
                <th className="px-6 py-3 text-center">Participants</th>
                <th className="px-6 py-3 text-center">Price</th>
                <th className="px-6 py-3 text-center">Status</th>
                <th className="px-6 py-3 text-center">Winners</th>
            </tr>
            <tr>
                <td className="py-3"></td>
            </tr>
            </thead>
            <tbody >
                {mockresult.map((data, index)=>(
                    <tr key={index}>
                        <td className="px-6 py-4 text-center border-b-[#D43791] border-b-[0.2px]">{data.date}</td>
                        <td className="px-6 py-4 text-center border-b-[#D43791] border-b-[0.2px]">{data.participants}</td>
                        <td className="px-6 py-4 text-center border-b-[#D43791] border-b-[0.2px]">{data.amount}</td>
                        <td className="px-6 py-4 text-center border-b-[#D43791] border-b-[0.2px]">{data.status}</td>
                        <td className="px-6 py-4 text-center border-b-[#D43791] border-b-[0.2px]">{data.Winners}</td>
                    </tr>
                ))}
            </tbody>
            </table>
        </div>
    </div>
  )
}

export default Resultcontent

// className='mx-28 bg-[#000000] h-[80vh]'