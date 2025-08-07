import React, { useContext } from 'react'
import { FarzaaContext } from '../../context/FarzaaContext'

const CountdownSection = () => {
    const {isTimerState} = useContext(FarzaaContext)
  return (
    <div className="fz-hot-deal-countdown syotimer">
        <div className="syotimer__head"></div>
        <div className="syotimer__body">
            <div className="syotimer-cell syotimer-cell_type_day">
                <div className="syotimer-cell__value">
                    {isTimerState.days || 0}
                </div>
                <div className="syotimer-cell__unit">
                    days
                </div>
            </div>
            <div className="syotimer-cell syotimer-cell_type_hour">
                <div className="syotimer-cell__value">
                    {isTimerState.hours || '00'}
                </div>
                <div className="syotimer-cell__unit">
                    hours
                </div>
            </div>
            <div className="syotimer-cell syotimer-cell_type_minute">
                <div className="syotimer-cell__value">
                    {isTimerState.minutes || '00'}
                </div>
                <div className="syotimer-cell__unit">
                    minutes
                </div>
            </div>
            <div className="syotimer-cell syotimer-cell_type_second">
                <div className="syotimer-cell__value">
                    {isTimerState.seconds || '00'}
                </div>
                <div className="syotimer-cell__unit">
                    seconds
                </div>
            </div>
        </div>
        <div className="syotimer__footer"></div>
    </div>
  )
}

export default CountdownSection