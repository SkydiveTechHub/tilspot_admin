import React from 'react'
import { DescText } from '../../../shared/typograph'
import { featuresData } from '../../../../utils/data'
import { Container } from '@mui/material'

const Features = () => {
  return (
    <Container>
      <div className='py-[4rem]'>
        
        <div className='flex-1'>
          <h1 className="font-[700] text-black font-mont text-[28px] text-center lg:text-[26px] lg:leading-[28px] ">
            <span className="block">See our capabilities</span>          
            <span className="block">Advanced features for better performance</span> 
          </h1>
        </div>
        <div className='flex-1 flex flex-col mt-10  gap-16 lg:gap-8 justify-between items-center'>
          {
            featuresData.map((i, id)=>(
              <FeatCard
                tag={i.tag}
                tagColor={i.tagColor}
                title={i.title}
                desc={i.desc}
                img={i.img}
                style={i.style}
              />
            ))
          }
        </div>
      </div>      
    </Container>

  )
}

export default Features

const FeatCard = ({tag, tagColor, title, desc, img, style})=>{
    return(
        <div className={`${style} flex justify-between items-center `}>
            <div className='flex-1 space-y-3'>
              <span style={{backgroundColor:tagColor}} className={`text-white py-1 px-2 rounded-full font-mont text-[12px] font-medium`}>{tag}</span>
              <h1 className="font-[600] w-full lg:w-[70%] font-mont text-[20px] lg:text-[32px]  lg:leading-[40px] ">
                  {title}
              </h1>
              <DescText
                align={""}
                style={"w-[90%] md:w-[70%] text-[13px] text-[#6A6A6A]"}
                value={desc}
              />
            </div>

            <div className='flex-1'>
                <img src={img} alt="feat-img" />
            </div>
        </div>
    )
}