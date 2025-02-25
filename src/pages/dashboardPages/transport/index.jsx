import React, { useEffect, useState } from 'react'
import { BlackText, GrayText } from '../../../components/shared/typograph'
import { PryButton } from '../../../components/shared/button'
import InstanceView from './InstanceView'
import AddTransportProvider from '../../../components/shared/Modals/Transport/AddTransportProvider'
import { useDispatch, useSelector } from 'react-redux'
import { getAllJourney, getProviderByCategory } from '../../../store/actions'
import { checkCategory } from '../../../store/reducers/providerSlice'

const TransportPage = () => {
  const [open, setOpen] = useState(false)
  const [hasData, setHasData] = useState(false)
  const [data, setData] = useState([])
  const [catId, setCatId] = useState('');
  const [provId, setProvId] = useState('');
  const [catStatus, setCatStatus] = useState(false);
  const dispatch = useDispatch();
  const { categories, journeyData } = useSelector((state) => state.providers);
  const { role } = useSelector((state) => state.auth);

    useEffect(() => {
      if (categories) {
        const cat = categories.find((i) => i.name === 'Transport');
        setCatStatus(cat.isEnabled)
        setCatId(cat._id);
      } else {
        dispatch(checkCategory())
      }
    }, [categories]);

    const fetchJourneyDetails = async (id)=>{
      try {
        const res = await dispatch(getAllJourney({provId:id}))
              console.log(res)
              if(res.payload.statusCode){
                setData(res.payload.data)
                setProvId(id)
                setHasData(true)
              }
      } catch (error) {
          console.log(error)
      }
    }
  
        useEffect(()=>{
          const fetchProvider = async() =>{
            if (catId){
              try {
              const res = await dispatch(getProviderByCategory(catId))
              
              if(res.payload.statusCode){
                fetchJourneyDetails(res.payload.providers[0]._id)
              }                
              } catch (error) {
                
              }

            }              
          };
          fetchProvider()
        },[catId])
  return (
    <>
            <AddTransportProvider
                // provId={provId}
                catId={catId}
                openModal={open}
                handleCancel={()=>setOpen(false)}
                handleOk={()=>setOpen(false)}
            />   
        {
          hasData?
          <InstanceView id={catId} ppId={provId} catStatus={catStatus} data={journeyData}/>
          :
          <div className='h-screen'>


              <div className='w-full h-[80%] flex justify-center items-center flex-col gap-4'>
      
                  <img src="/images/layers.png" alt="" />
                  <BlackText style={'font-[600]'} text='No Provider Available'/>
                  <GrayText style={'md:w-[40%] text-center text-[12px]'} text={'You haven’t added any Route. Click the button below to add a route!'}/>
                  {
                    role === 'admin' && <PryButton handleClick={()=>setOpen(true)} text={'Add Transport Route'}/>
                  }
                  
      
              
      
              </div>        
          </div>
        } 
    </>


  )
}

export default TransportPage
