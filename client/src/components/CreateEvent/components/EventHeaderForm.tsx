import { Editor, EditorState } from "draft-js";

type TEventHeaderForm = {
    setEditorTitleState: React.Dispatch<React.SetStateAction<EditorState>>,
    editorTitleState: EditorState,
    setEditorSummaryState: React.Dispatch<React.SetStateAction<EditorState>>,
    editorSummaryState: EditorState,
    price: number
    setPrice: React.Dispatch<React.SetStateAction<number>>
};

export default function EventHeaderForm({ setEditorTitleState, editorTitleState, setEditorSummaryState, editorSummaryState, price, setPrice }: TEventHeaderForm) {

    return (
        <div className="header-expanded">
            <div className="header-title">
                <h3>Event Title</h3>
                <p>Make a title that is clear and concise to tell people what your event is about.</p>
                <div className="input-container">
                    <h4>Event title</h4>
                    <Editor blockStyleFn={() => "input"} editorState={editorTitleState} onChange={setEditorTitleState} />
                </div>
            </div>
            <div className="header-summary">
                <h3>Summary</h3>
                <p>Grab people's attention with a short description about your event. Attendees will see this at the top of the event page with the event title. (140 characters max)</p>
                <div className="input-container">
                    <h4>Summary</h4>
                    <Editor blockStyleFn={() => "input"} editorState={editorSummaryState} onChange={setEditorSummaryState} />
                </div>
            </div>
            <div className="header-price">
                <h3>Price</h3>
                <p>Set a price for your event. The minimum price allowed is £0.03. You can also make the event free. The open price option gives the attendees the freedom of how much they would want to pay for the event.</p>
                <div className="input-container">
                    <h4>Price</h4>
                    <span>£ </span>
                    <input type="number" id="input-price" min={0.3} step={0.01} onChange={e => setPrice(() => Number(e.target.value))} value={price} />
                </div>
            </div>
        </div>
    )
}