import React from 'react'
import { BlackText, GrayText } from '../../../shared/typograph'
import { PlansCard1 } from './PlansCard'
import { Container } from '../../../shared/container'
import { PlansData } from '../../../../utils/data'


const Plans = () => {
  return (
    <div style={{backgroundImage:'url(/images/planBG.png)'}} className='py-[5rem] bg-cover bg-no-repeat bg-center'>
        <Container>
            <div className='space-y-10'>
                <div className='flex justify-center items-center flex-col '>
                    <BlackText style={'font-bold text-[28px]'} text={'Choose Your Perfect Plan'}/>
                    <GrayText text='Flexible plans designed to grow with your business, offering tailored solutions for every stage'/>
                </div>
                <div className='grid gap-3 md:gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-5 '>
                    {
                        PlansData?.map((i, id)=>
                            <PlansCard1
                            key={id}
                                planAmount={i.price}
                                planFeatures={i.features}
                                planName={i.name}
                                tagged={i.tagged}
                            />
                        )
                    }
                </div>                
            </div>
        </Container>

    </div>
  )
}

export default Plans


