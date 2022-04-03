
import React from 'react'
import { useLocation, useNavigate, useParams ,useSearchParams} from 'react-router-dom';

const Food = () => {
   
  const location = useLocation();
  const navigate = useNavigate()
  const params = useParams()
  let [searchParams, setSearchParams] = useSearchParams();
  return (
    <div>Food</div>
  )
}

export default Food;