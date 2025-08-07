import React, { useState } from 'react'
import { Nav, Tab } from 'react-bootstrap';
import BirthdayTabPane from './BirthdayTabPane';
import AnniversaryTabPane from './AnniverseryTabPane';
import CelebrationTabPane from './CelebrationTabPane';
import ProductViewModal from '../modal/ProductViewModal';
import { Link } from 'react-router-dom';

const HotSellingCakeSection = () => {
    const [activeTab, setActiveTab] = useState('birthday');

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };
  return (
    <section className="hot-selling-section">
        <div className="container">
            <div className="fz-3-section-heading">
                <h2 className="fz-section-title">Hot Selling Cake</h2>
                <p className="fz-section-sub-title">True Pound Cake is a recipe that dates</p>
            </div>

            <Nav 
            activeKey={activeTab}
            onSelect={handleTabChange}
            className="nav nav-tabs" id="myTab"
            >
                <Nav.Item className="nav-item" role="presentation">
                    <Nav.Link role='button' eventKey='birthday' id="hot-sell-1-tab">Birthday cake</Nav.Link>
                </Nav.Item>
                <Nav.Item className="nav-item" role="presentation">
                    <Nav.Link role='button' eventKey='anniversery' id="hot-sell-2-tab">Anniversary cake</Nav.Link>
                </Nav.Item>
                <Nav.Item className="nav-item" role="presentation">
                    <Nav.Link role='button' eventKey='celebration' id="hot-sell-3-tab">celebration cake</Nav.Link>
                </Nav.Item>
            </Nav>

            <Tab.Content className="tab-content" id="myTabContent">
                <Tab.Pane eventKey="birthday" className={`tab-pane ${activeTab === 'birthday' ? 'show active' : ''}`} id="hot-sell-1-tab-pane">
                    <BirthdayTabPane/>
                </Tab.Pane>

                <Tab.Pane eventKey="anniversery" className={`tab-pane ${activeTab === 'anniversery' ? 'show active' : ''}`} id="hot-sell-2-tab-pane">
                    <AnniversaryTabPane/>
                </Tab.Pane>

                <Tab.Pane eventKey="celebration" className={`tab-pane ${activeTab === 'celebration' ? 'show active' : ''}`} id="hot-sell-3-tab-pane">
                    <CelebrationTabPane/>
                </Tab.Pane>
            </Tab.Content>

            <Link to="/shop" className="fz-3-hot-sell__btn">All products</Link>
        </div>
        <ProductViewModal/>
    </section>
  )
}

export default HotSellingCakeSection