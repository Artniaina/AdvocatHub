import React, {useState, useEffect} from 'react'
import FicheEtude from "./FicheEtude"
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchEtudeInfo } from '../../../Store/AvocatSlice'

const ModifEtude = () => {
  const location= useLocation()
  const dispatch = useDispatch()
  const { id } = location.state || {}; 
  const [initialEtude, setInitialEtude] = useState([]);

  const { etudeInfo } = useSelector((state) => state.avocat);
  useEffect(() => {
    if (etudeInfo) {
      setInitialEtude(etudeInfo);
    }
  }, [etudeInfo]);

  useEffect(() => {
    if (id) {
      dispatch(fetchEtudeInfo(id));
    }
  }, [dispatch, id]);

  return (
    <div>
    <FicheEtude mode={"edit"} initialValue={initialEtude} />
  </div>
  )
}

export default ModifEtude