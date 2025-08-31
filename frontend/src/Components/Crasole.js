import React from 'react';


// #region constants

// #endregion

// #region styled-components

// #endregion

// #region functions

// #endregion

// #region component
const propTypes = {};

const defaultProps = {};

/**
 * 
 */
const Crasole = () => {
    return <div className='container mt-sm-3 mt-2'>
        <div id="carouselExampleControls" className="carousel slide text-center rounded shadow-lg" data-bs-ride="carousel">
  <div className="carousel-inner rounded">
    <div className="carousel-item active">
      <img src="../BannerImg/kitchen.jpg" className="d-block w-100  rounded" alt="..."  />
    </div>
    <div className="carousel-item active">
      <img src="../BannerImg/electricity.jpg" className="d-block w-100  rounded" alt="..."  />
    </div>
    <div className="carousel-item active">
      <img src="../BannerImg/homecleaning.jpg" className="d-block w-100  rounded" alt="..."  />
    </div>
    <div className="carousel-item active">
      <img src="../BannerImg/interior.jpg" className="d-block w-100  rounded" alt="..."  />
    </div>
    <div className="carousel-item">
      <img src="./BannerImg/housepaint.jpg" className="d-block w-100 rounded" alt="..." />
    </div>
    <div className="carousel-item">
      <img src="./BannerImg/product.jpg" className="d-block w-100  rounded" alt="..."   />
    </div>
  </div>
  <button className="carousel-control-prev my-auto ms-3" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next my-auto me-3" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
    </div>;
}

Crasole.propTypes = propTypes;
Crasole.defaultProps = defaultProps;
// #endregion

export default Crasole;