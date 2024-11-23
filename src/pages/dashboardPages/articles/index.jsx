import React from 'react'
import { BlackText, GrayText } from '../../../components/shared/typograph'

const Articles = () => {
  return (
    <div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
            {
                articles.map((i, id)=><ArticleCard
                        date= {i.date}
                        title= {i.title}
                        desc= {i.desc}
                    />)
            }

        
        </div>        
    </div>

  )
}

export default Articles

const ArticleCard = ({date, title, desc}) =>{
    return(
        <div className='rounded-lg border border-primary'>
            <img className='rounded-t-lg' src="/images/art.png" alt="" />
            <div className='flex flex-col p-3'>
                <GrayText style={'font-[300] text-[10px]'} text={date}/>
                <BlackText style={'font-[700] text-[14px]'} text={title}/>
                <GrayText style={'my-2 text-[12px]'} text={desc}/>
                <BlackText style={'font-[700] text-primary'} text={'Read More ➡'}/>
            </div>
        </div>
    )
}

const articles = [
    {
       date:'Dec 18, 2024 •5 min read', 
       title:'How to buy instance (more messages)',
       desc:'Worem ipsum dolor sit amet, consectetur adipiscing elit.Worem ipsum dolor sit amet, consectetur adipiscing elit.Worem ipsum do',
    },
    {
       date:'Dec 18, 2024 •5 min read', 
       title:'How to buy instance (more messages)',
       desc:'Worem ipsum dolor sit amet, consectetur adipiscing elit.Worem ipsum dolor sit amet, consectetur adipiscing elit.Worem ipsum do',
    },
    {
       date:'Dec 18, 2024 •5 min read', 
       title:'How to buy instance (more messages)',
       desc:'Worem ipsum dolor sit amet, consectetur adipiscing elit.Worem ipsum dolor sit amet, consectetur adipiscing elit.Worem ipsum do',
    },
    {
       date:'Dec 18, 2024 •5 min read', 
       title:'How to buy instance (more messages)',
       desc:'Worem ipsum dolor sit amet, consectetur adipiscing elit.Worem ipsum dolor sit amet, consectetur adipiscing elit.Worem ipsum do',
    },
    {
       date:'Dec 18, 2024 •5 min read', 
       title:'How to buy instance (more messages)',
       desc:'Worem ipsum dolor sit amet, consectetur adipiscing elit.Worem ipsum dolor sit amet, consectetur adipiscing elit.Worem ipsum do',
    },
    {
       date:'Dec 18, 2024 •5 min read', 
       title:'How to buy instance (more messages)',
       desc:'Worem ipsum dolor sit amet, consectetur adipiscing elit.Worem ipsum dolor sit amet, consectetur adipiscing elit.Worem ipsum do',
    },
    
]
