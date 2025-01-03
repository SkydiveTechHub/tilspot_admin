import React, { useEffect, useState } from 'react'
import { BlackText, GrayText } from '../../../components/shared/typograph'
import { PryButton } from '../../../components/shared/button'
import InstanceView from './InstanceView'
import AddFootballTicketProvider from '../../../components/shared/Modals/football/AddFootballProvider'
import { useDispatch, useSelector } from 'react-redux'
import { getMatch } from '../../../store/actions'
import { checkCategory } from '../../../store/reducers/providerSlice'

const role = localStorage.getItem('role')
const FootballPage = () => {
  const [open, setOpen] = useState(false)
  const [hasData, setHasData] = useState(true)
  const [data, setData] = useState([])
  const [catId, setCatId] = useState('');
      const [catStatus, setCatStatus] = useState(false);
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.providers);

  
    useEffect(() => {
      if (categories) {
        const cat = categories.find((i) => i.name === 'Electricity');
        setCatStatus(cat.isEnabled)
        setCatId(cat?._id);
      } else {
        dispatch(checkCategory())
      }
    }, [categories]);

        useEffect(()=>{
          const fetchProvider = async() =>{
            if (catId){
              try {
              const res = await dispatch(getMatch())
              console.log(res)
              if(res.payload.statusCode){
                setData(res.payload.providers)
                setHasData(true)
              }                
              } catch (error) {
                
              }

            }              
          };
          fetchProvider()
        },[catId])
  return (
    <>
            <AddFootballTicketProvider
                openModal={open}
                handleCancel={()=>setOpen(false)}
                handleOk={()=>setOpen(false)}
            />   
        {
          hasData?
          <InstanceView id={catId} catStatus={catStatus} data={data}/>
          :
          <div className='h-screen'>


              <div className='w-full h-[80%] flex justify-center items-center flex-col gap-4'>
      
                  <img src="/images/layers.png" alt="" />
                  <BlackText style={'font-[600]'} text='No Provider Available'/>
                  <GrayText style={'md:w-[40%] text-center text-[12px]'} text={'You haven’t added any Provider. Click the button below to add a provided!'}/>
      
                  <PryButton handleClick={()=>setOpen(true)} text={'Add Football Provider'}/>
      
              
      
              </div>        
          </div>
        } 
    </>


  )
}

export default FootballPage
