import {useState, useEffect} from 'react'

import fetchStatusConstraints from '../constants/fetchStatusConstraints'

const useFetchedData = () => {
  const [status, setStatus] = useState(fetchStatusConstraints.inProgress)
  const [data, setData] = useState({})

  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch(
          'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details',
        )
        const fetchedData = await response.json()

        if (!response.ok) {
          throw new Error('Something went wrong!')
        }

        setData(fetchedData[0])
        setStatus(fetchStatusConstraints.success)
      } catch {
        setStatus(fetchStatusConstraints.failure)
      }
    }
    getData()
  }, [])

  return {data, status}
}

export default useFetchedData
