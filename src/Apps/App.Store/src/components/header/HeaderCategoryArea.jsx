import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { FarzaaContext } from '../../context/FarzaaContext'

const HeaderCategoryArea = ({header,title}) => {
    const {
        isCategoryOpen,
        handleCategoryBtn,
        categoryBtnRef,
    } = useContext(FarzaaContext)
  return (
    <div className={`fz-category-area ${header}`} ref={categoryBtnRef}>
        <button className="fz-category-btn" onClick={handleCategoryBtn}>
            <i className="fa-solid fa-grid"></i>
            <span className={title}>Category</span>
        </button>

        <div className={`fz-category-menu ${isCategoryOpen? 'open':''}`}>
            <div className="row gx-3 gx-md-5 gy-5">
                <div className="col-md-4 col-6">
                    <ul className="fz-category-list">
                        <li><Link to="/shop">Rings (29)</Link></li>
                        <li><Link to="/shop">Earrings (47)</Link></li>
                        <li><Link to="/shop">Necklaces (68)</Link></li>
                        <li><Link to="/shop">locket (44)</Link></li>
                        <li><Link to="/shop">Bangle (12)</Link></li>
                        <li><Link to="/shop">Bolo tie (48)</Link></li>
                        <li><Link to="/shop">Brooch (64)</Link></li>
                        <li><Link to="/shop">Body Piercing (56)</Link></li>
                    </ul>
                </div>
                <div className="col-md-4 col-6">
                    <ul className="fz-category-list">
                        <li><Link to="/shop">Rings (29)</Link></li>
                        <li><Link to="/shop">Earrings (47)</Link></li>
                        <li><Link to="/shop">Necklaces (68)</Link></li>
                        <li><Link to="/shop">locket (44)</Link></li>
                        <li><Link to="/shop">Bangle (12)</Link></li>
                        <li><Link to="/shop">Bolo tie (48)</Link></li>
                        <li><Link to="/shop">Brooch (64)</Link></li>
                        <li><Link to="/shop">Body Piercing (56)</Link></li>
                    </ul>
                </div>
                <div className="col-md-4 col-6">
                    <ul className="fz-category-list">
                        <li><Link to="/shop">Rings (29)</Link></li>
                        <li><Link to="/shop">Earrings (47)</Link></li>
                        <li><Link to="/shop">Necklaces (68)</Link></li>
                        <li><Link to="/shop">locket (44)</Link></li>
                        <li><Link to="/shop">Bangle (12)</Link></li>
                        <li><Link to="/shop">Bolo tie (48)</Link></li>
                        <li><Link to="/shop">Brooch (64)</Link></li>
                        <li><Link to="/shop">Body Piercing (56)</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
  )
}

export default HeaderCategoryArea