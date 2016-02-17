import styles from './AboutButton.css';

import React from 'react';
import { setAboutVisibilityOption } from '../../actions';
import { connect } from 'react-redux';

const AboutButton = ({dispatch}) => {
    return (
        <img
            className={
                styles.root
            }
            width="119"
            height="28.5"
            src="src/images/about-button.png"
            onClick={
                (e) => {
                    e.stopPropagation();
                    dispatch(setAboutVisibilityOption('OPEN_ABOUT'));
                }
            }
        />
    )
};

export default connect()(AboutButton);