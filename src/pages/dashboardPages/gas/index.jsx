import React, { useEffect, useState } from 'react'
import { BlackText, GrayText } from '../../../components/shared/typograph'
import { PryButton } from '../../../components/shared/button'
import InstanceView from './InstanceView'
import AddGasProvider from '../../../components/shared/Modals/gas/AddGasProvider'
import { useDispatch, useSelector } from 'react-redux'
import { checkCategory } from '../../../store/reducers/providerSlice'
import { getProviderByCategory } from '../../../store/actions'


const GasPage = () => {
  const [open, setOpen] = useState(false)
  const [hasData, setHasData] = useState(false)
  const [data, setData] = useState([])
  const [catId, setCatId] = useState('');
  const [catStatus, setCatStatus] = useState(false);
  const dispatch = useDispatch();
  const { providers, categories } = useSelector((state) => state.providers);
  const { role } = useSelector((state) => state.auth);
    useEffect(() => {
      if (categories) {
        const cat = categories.find((i) => i.name === 'Gas');
        setCatStatus(cat.isEnabled)
        setCatId(cat._id);
      } else {
        dispatch(checkCategory())
      }
    }, [categories]);

  
        useEffect(()=>{
          const fetchProvider = async() =>{
            if (catId){
              try {
              const res = await dispatch(getProviderByCategory(catId))
              
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
            <AddGasProvider
                catId={catId}
                openModal={open}
                handleCancel={()=>setOpen(false)}
                handleOk={()=>setOpen(false)}
            />   
        {
          hasData?
          <InstanceView id={catId} catStatus={catStatus} data={providers}/>
          :
          <div className='h-screen'>


              <div className='w-full h-[80%] flex justify-center items-center flex-col gap-4'>
      
                  <img src="/images/layers.png" alt="" />
                  <BlackText style={'font-[600]'} text='No Provider Available'/>
                  <GrayText style={'md:w-[40%] text-center text-[12px]'} text={'You haven’t added any Provider. Click the button below to add a provided!'}/>

                        {
                          role === 'admin' &&         <PryButton handleClick={()=>setOpen(true)} text={'Add Gas Provider'}/>
                        }
                        
              
      
              </div>        
          </div>
        } 
    </>


  )
}

export default GasPage
