import React from 'react';

const HeaderDetail = () => {
  return (
    <div className="header-detail">
      <div className="path-detail">
        <nav className="product-path">
          <a href="#" className="home">
            Home
          </a>
          <a href="#" className="icon-division">
            /
          </a>
          <a href="#" className="Adventure">
            Adventure
          </a>
          <a href="#" className="icon-division">
            /
          </a>
          <span className="product-name">
            Nobita và vùng đất lý tưởng trên mây
          </span>
        </nav>
      </div>
      <div className="product-management">
        <i className="fa fa-angle-left product-pre"></i>
        <i className="fa fa fa-th-large product-large"></i>
        <i className="fa fa-angle-right product-next"></i>
      </div>
    </div>
  );
};

export default HeaderDetail;
