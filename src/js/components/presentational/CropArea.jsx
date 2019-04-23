import React from "react";
import PropTypes from "prop-types";
const CropArea = ({ holderId, imgId, imgSrc}) => (
    <div class="img-container" id={holderId}>
        <img id={imgId} src={imgSrc} />
    </div>
);
CropArea.propTypes = {
    holderId: PropTypes.string.isRequired,
    imgId: PropTypes.string.isRequired,
    imgSrc: PropTypes.string.isRequired
};
export default CropArea;