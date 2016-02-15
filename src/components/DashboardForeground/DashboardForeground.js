import styles from './DashboardForeground.css';

import React, { Component } from 'react';
import AboutBlock from '../AboutBlock/AboutBlock';
import BackgroundImage from '../BackgroundImage/BackgroundImage';
import YearTrendWrapper from '../YearTrendWrapper/YearTrendWrapper';
import MakeWrapper from '../MakeWrapper/MakeWrapper';
import OverlayInstructions from '../OverlayInstructions/OverlayInstructions';
import Connector from '../Connector/Connector';
import Header from '../Header/Header';
import ModelWrapper from '../ModelWrapper/ModelWrapper';
import Gauges from '../Gauges/Gauges';
import Tabs from '../Tabs/Tabs';
import Annotation from '../Annotation/Annotation';

export default class DashboardForeground extends Component {
    render() {
        const aboutVisibility = this.props.aboutVisibility;
        const chartData = this.props.chartData;
        return <div className={styles.root}>
            <AboutBlock aboutVisibility={aboutVisibility}
                        onSetAboutVisibilityOption={this.props.onSetAboutVisibilityOption} />
            <BackgroundImage />
            <YearTrendWrapper aboutVisibility={aboutVisibility}
                              onSetAboutVisibilityOption={this.props.onSetAboutVisibilityOption} />
            <MakeWrapper onSetMakeWrapperProps={this.props.onSetMakeWrapperProps}
                         chartData={chartData}
                         onChangeMakeDataQuery={this.props.onChangeMakeDataQuery} />
            <OverlayInstructions />
            <Connector />
            <Header />
            <ModelWrapper />
            <Gauges />
            <Tabs tab={this.props.tab}
                  onSetActiveTab={this.props.onSetActiveTab} />
            <Annotation />
        </div>
    }
}