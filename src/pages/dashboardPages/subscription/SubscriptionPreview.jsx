import React, { useState } from 'react'
import { BlackText, GrayText } from '../../../components/shared/typograph'
import { useNavigate } from 'react-router-dom'

const SubscriptionPreview = () => {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [upgradeModal, setUpgradeModal] = useState(false)
  return (
    <>

      <div>
          <div className=''>
              <ul className='space-y-3'>
                  <li><BlackText style={'font-bold text-[14px] capitalize'} text={'Instance Name:'}/><GrayText style={'text-[16px]'} text={'Nitty Gritty'}/></li>
                  <li><BlackText style={'font-bold text-[14px] capitalize'} text={'Registered Phone no:'}/><GrayText style={'text-[16px]'} text={'03936463473'}/></li>
                  <li><BlackText style={'font-bold text-[14px] capitalize'} text={'Subscription Plan:'}/><GrayText style={'text-[16px]'} text={'Free Plan'}/></li>
                  <li><BlackText style={'font-bold text-[14px] capitalize'} text={'Status:'}/><GrayText style={'text-[16px]'} text={'Enabled'}/></li>
                  <li><BlackText style={'font-bold text-[14px] capitalize'} text={'Instance Activation:'}/><GrayText style={'text-[16px]'} text={'Nitty Gritty'}/></li>
                  <li><BlackText style={'font-bold text-[14px] capitalize'} text={'Allocated messages :'}/><GrayText style={'text-[16px]'} text={'100'}/></li>
                  <li><BlackText style={'font-bold text-[14px] capitalize'} text={'Created date:'}/><GrayText style={'text-[16px]'} text={'10th September, 2020'}/></li>
                  <li><BlackText style={'font-bold text-[14px] capitalize'} text={'Expiry date:'}/><GrayText style={'text-[16px]'} text={'2th September, 2020'}/></li>
              </ul>
          </div>


      </div>    
    </>

  )
}

export default SubscriptionPreview

