import React, { useEffect, useState } from 'react'
import { BlackText, GrayText } from '../../../components/shared/typograph'
import { PryButton } from '../../../components/shared/button'
import InstanceView from './InstanceView'
import AddInternetProvider from '../../../components/shared/Modals/Internet/AddInternetProvider'
import { useDispatch, useSelector } from 'react-redux'
import { checkCategory } from '../../../store/reducers/providerSlice'
import { getLocations, getProviderByCategory } from '../../../store/actions'


const ParkingPage = () => {
  const [open, setOpen] = useState(false)
  const [hasData, setHasData] = useState(false)
  const [data, setData] = useState([])
  const [catId, setCatId] = useState('');
  const [catStatus, setCatStatus] = useState(false);
  const dispatch = useDispatch();
  const { categories, locations } = useSelector((state) => state.providers);
  const { role } = useSelector((state) => state.auth);
    useEffect(() => {
      if (categories) {
        const cat = categories.find((i) => i.name === 'Parking');
        setCatStatus(cat.isEnabled)
        setCatId(cat._id);
      } else {
        dispatch(checkCategory())
      }
    }, [categories]);

    console.log(locations)
  
        useEffect(()=>{
          const fetchProvider = async() =>{
            if (catId){
              try {
              const res = await dispatch(getLocations())
              
              if(res.payload.statusCode){
                setData(res.payload.locations)
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
            <AddInternetProvider
                catId={catId}
                openModal={open}
                handleCancel={()=>setOpen(false)}
                handleOk={()=>setOpen(false)}
            />   
        {
          hasData?
          <InstanceView id={catId} catStatus={catStatus} data={locations}/>
          :
          <div className='h-screen'>


              <div className='w-full h-[80%] flex justify-center items-center flex-col gap-4'>
      
                  <img src="/images/layers.png" alt="" />
                  <BlackText style={'font-[600]'} text='No Location Available'/>
                  <GrayText style={'md:w-[40%] text-center text-[12px]'} text={'You haven’t added any Location. Click the button below to add a location!'}/>
      
                  
                        {
                          role === 'admin' && <PryButton handleClick={()=>setOpen(true)} text={'Add Parking Location'}/>
                        }
              
      
              </div>        
          </div>
        } 
    </>


  )
}

export default ParkingPage
