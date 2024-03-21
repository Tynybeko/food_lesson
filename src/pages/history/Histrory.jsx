import React, { useEffect, useState } from 'react'
import API from '../../axios'
import Loading from '../../components/UI/Loading'
import useDateFormat from '../../hooks/useDateFormat'
import Button from '../../components/UI/Button'
import RepeatOrder from '../../components/RepeatOrder'

export default function Histrory() {
    const [reapeat, setRepeat] = useState(null)
    const [resState, setResState] = useState({
        data: null,
        loading: false,
        error: ''
    })

    useEffect(() => {
        setResState(prev => ({ ...prev, loading: true }))

        const res = API.get('/orders/')
        res
            .then(res => {
                setResState(prev => ({ ...prev, data: res.data }))
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                setResState(prev => ({ ...prev, loading: false }))
            })
    }, [])

    return (
        <div>
            
            {
                reapeat && <RepeatOrder setHistory={setResState} setClose={setRepeat} items={reapeat}/>
            }
            {
                resState.loading && <Loading />
            }
            <table className='w-full'>
                <thead className=''>
                    <tr className='bg-blue-300'>
                        <th>ID</th>
                        <th>DATE</th>
                        <th>TOTAL</th>
                        <th>ACTION</th>

                    </tr>
                </thead>
                <tbody>
                    {
                        resState.data && resState.data.map(item => {
                            return (
                                <tr>
                                    <th>{item.id}</th>
                                    <th>{useDateFormat(item.ordered_date)}</th>
                                    <th>{item.get_total}</th>
                                    <th><Button onClick={() => setRepeat(item.items)}>Repeat</Button></th>

                                </tr>
                            )

                        })
                    }
                </tbody>
            </table>

        </div>
    )
}
