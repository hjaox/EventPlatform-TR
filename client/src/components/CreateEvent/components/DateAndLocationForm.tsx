import { EditorState, Editor } from "draft-js";
import DatePicker from "react-datepicker";

type TDateAndLocation = {
    startDate: Date,
    setStartDate: React.Dispatch<React.SetStateAction<Date>>,
    endDate: Date,
    setEndDate: React.Dispatch<React.SetStateAction<Date>>,
    editorAddressState: EditorState,
    setEditorAddressState: React.Dispatch<React.SetStateAction<EditorState>>
};

export default function DateAndLocationForm({ startDate, setStartDate, endDate, setEndDate, editorAddressState, setEditorAddressState }: TDateAndLocation) {
    return (
        <div className="datelocation-expanded">
            <div className="datelocation-dateStart">
                <h3>Start Date</h3>
                <div className="input-container">
                    <h4>Start Date</h4>
                    <DatePicker selected={startDate} onChange={(date) => {
                        if (date) {
                            setStartDate(date)
                        }
                    }} wrapperClassName="date-picker" />
                </div>

            </div>

            <div className="datelocation-dateEnd">
                <h3>End Date</h3>
                <div className="input-container">
                    <h4>End Date</h4>
                    <DatePicker selected={endDate} onChange={(date) => {
                        if (date) {
                            setEndDate(date)
                        }
                    }} wrapperClassName="date-picker" />
                </div>

            </div>

            <div className="datelocation-address">
                <h3>Address</h3>
                <div className="input-container">
                    <h4>Address</h4>
                    <Editor blockStyleFn={() => "input"} editorState={editorAddressState} onChange={setEditorAddressState} />
                </div>
            </div>
        </div>
    )
}