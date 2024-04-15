import { Editor } from "draft-js";
import { TEventHeaderForm } from "../../../common/types";
import { LiaExclamationCircleSolid } from "react-icons/lia";

export default function EventHeaderForm({ setEditorTitleState, editorTitleState, setEditorSummaryState, editorSummaryState, price, setPrice, formError, setOpenPrice, openPrice }: TEventHeaderForm) {

    return (
        <div className="header-expanded">
            <div className="header-title">
                <h3>
                    Event Title
                    {
                        (formError.title || formError.summary || formError.price) && (
                            <LiaExclamationCircleSolid className="error-icon" color="red" />
                        )
                    }
                </h3>
                <p>Make a title that is clear and concise to tell people what your event is about.</p>
                {
                    formError.title && (
                        <div className="error">Please make a title for your event. *</div>
                    )
                }
                <div className="input-container">
                    <h4>Event title</h4>
                    <Editor blockStyleFn={() => "input"} editorState={editorTitleState} onChange={setEditorTitleState} />
                </div>
            </div>
            <div className="header-summary">
                <h3>Summary</h3>
                <p>Grab people's attention with a short description about your event. Attendees will see this at the top of the event page with the event title. (140 characters max)</p>
                {
                    formError.summary && (
                        <div className="error">Please make a summary for your event. *</div>
                    )
                }
                <div className="input-container">
                    <h4>Summary</h4>
                    <Editor blockStyleFn={() => "input"} editorState={editorSummaryState} onChange={setEditorSummaryState} />
                </div>
            </div>
            <div className="header-price">
                <h3>Price</h3>
                <p>Set a price for your event. The minimum price allowed is £0.03. You can also make the event free. The open price option gives the attendees the freedom of how much they would want to pay for the event.</p>
                {
                    formError.price && (
                        <div className="error">Please check your set price. If you want to make the event free, please put £ 0. Otherwise, the minimun price you can set is £ 0.30. *</div>
                    )
                }
                <div className="input-container">
                    <div className="price-input">
                        <h4>Price</h4>
                        <div className="price">
                            <span>£ </span>
                            <input type="number" id="input-price" step={0.01} onChange={e => setPrice(() => Number(e.target.value))} value={price} />
                        </div>
                    </div>
                    <div className="openPrice-input">
                        <label htmlFor="openPrice-input">Open </label>
                        <input checked={openPrice} id="openPrice-input" type="checkbox" onChange={e => setOpenPrice(e.target.checked)} />
                    </div>
                </div>
            </div>
        </div>
    )
}