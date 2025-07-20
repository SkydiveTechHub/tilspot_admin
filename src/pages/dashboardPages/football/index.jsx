import React, { useEffect, useState } from 'react'
import { BlackText, GrayText } from '../../../components/shared/typograph'
import { PryButton } from '../../../components/shared/button'
import InstanceView from './InstanceView'
import { useDispatch, useSelector } from 'react-redux'
import { getMatch, getProviderByCategory } from '../../../store/actions'
import { checkCategory } from '../../../store/reducers/providerSlice'
import AddFootballTicketProvider from '../../../components/shared/Modals/football/AddFootballProvider'

const FootballPage = () => {
  const [open, setOpen] = useState(false)
  const [hasData, setHasData] = useState(false)
  const [data, setData] = useState([])
  const [catId, setCatId] = useState('');
  const [provId, setProvId] = useState('');
  const [catStatus, setCatStatus] = useState(false);
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.providers);
const { role } = useSelector((state) => state.auth);

  
    useEffect(() => {
      if (categories) {
        const cat = categories.find((i) => i.name === 'Football Tickets');
        setCatStatus(cat.isEnabled)
        setCatId(cat?._id);
      } else {
        dispatch(checkCategory())
      }
    }, [categories]);


            const fetchMatchData = async (id)=>{

              try {
                const res = await dispatch(getMatch())
                       
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
                fetchMatchData(res.payload.providers[0]._id)
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
                catId={catId}
                provId={provId}            
                openModal={open}
                handleCancel={()=>setOpen(false)}
                handleOk={()=>setOpen(false)}
                action={'create'}
            />   
        {
          hasData?
          <InstanceView p_Id={provId} id={catId} catStatus={catStatus} data={data}/>
          :
          <div className='h-screen'>


              <div className='w-full h-[80%] flex justify-center items-center flex-col gap-4'>
      
                  <img src="/images/layers.png" alt="" />
                  <BlackText style={'font-[600]'} text='No Provider Available'/>
                  <GrayText style={'md:w-[40%] text-center text-[12px]'} text={'You haven’t added any Provider. Click the button below to add a provided!'}/>
                  {
                    role === 'admin' && <PryButton handleClick={()=>setOpen(true)} text={'Add Football Provider'}/>
                  }
                  
      
              
      
              </div>        
          </div>
        } 
    </>


  )
}

export default FootballPage
