import { Editor } from "draft-js";
import DateTimePicker from "react-datetime-picker";
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import { TDateAndLocation } from "../../../../common/types";

export default function DateAndLocationForm({ startDate, setStartDate, endDate, setEndDate, editorAddressState, setEditorAddressState, formError }: TDateAndLocation) {

    function handleStartDate(e: Date | null) {
        setStartDate(e ? e : new Date());
    }

    function handleEndDate(e: Date | null) {
        setEndDate(e ? e : new Date());
    }

    return (
        <div className="datelocation-expanded">
            <div className="datelocation-dateStart">
                <h3>Start Date</h3>
                {
                    formError.dateStart && (
                        <div className="error">Start date and time should not be earlier than today's date and time. *</div>
                    )
                }
                <div className="input-container">
                    <h4>Start Date</h4>
                    <DateTimePicker value={startDate} className="datetime-picker" onChange={handleStartDate}
                        format="y-MM-dd h:mm a"
                        showLeadingZeros={true} />
                </div>
            </div>
            <div className="datelocation-dateEnd">
                <h3>End Date</h3>
                {
                    formError.dateEnd && (
                        <div className="error">End date and time should not be earlier than today's or your start date and time. *</div>
                    )
                }
                <div className="input-container">
                    <h4>End Date</h4>
                    <DateTimePicker value={endDate} className="datetime-picker" onChange={handleEndDate}
                        format="y-MM-dd h:mm a"
                        showLeadingZeros={true} />
                </div>
            </div>
            <div className="datelocation-address">
                <h3>
                    Address
                    {
                    formError.address && (
                        <div className="error">Please share the address of the event. *</div>
                    )
                }
                    </h3>
                <div className="input-container">
                    <h4>Address</h4>
                    <Editor blockStyleFn={() => "input"} editorState={editorAddressState} onChange={setEditorAddressState} />
                </div>
            </div>
        </div>
    )
}