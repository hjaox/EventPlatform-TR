import { EditorState, Editor } from "draft-js";


type TAboutForm = {
    editorDetailsState: EditorState,
    setEditorDetailsState: React.Dispatch<React.SetStateAction<EditorState>>,
    setTag: React.Dispatch<React.SetStateAction<string>>,
    formError: {
        title: boolean;
        dateStart: boolean;
        dateEnd: boolean;
        address: boolean;
        price: boolean,
        details: boolean;
        summary: boolean;
    },
};

export default function AboutForm({ editorDetailsState, setEditorDetailsState, setTag, formError }: TAboutForm) {
    return (


        <div className="about-expanded">
            <div className="about-details">
                <h3>Details</h3>
                <p>Add more details about your event and inlude what people can expect if they attend. You can inlude an event itinerary, venue information, parking, accessibility options, etc. </p>
                {
                    formError.details && (
                        <div className="error">Please share some details about your event. *</div>
                    )
                }
                <div className="input-container">
                    <h4>Details</h4>
                    <Editor blockStyleFn={() => "input"} editorState={editorDetailsState} onChange={setEditorDetailsState} />
                </div>
            </div>

            <div className="about-tag">
                <h3>Tag</h3>
                <p>Select what type is your event. It will be categorized as "Others" if none is selected.</p>
                <div className="input-container">
                    <h4>Tag</h4>
                    <select name="tags" id="tag-select" onChange={e => setTag(e.target.value)}>
                        <option value="Others">--Please choose a tag--</option>
                        <option value="Music">Music</option>
                        <option value="Pets">Pets</option>
                        <option value="Films">Films</option>
                        <option value="Books">Books</option>
                        <option value="Outdoor">Outdoor</option>
                        <option value="Sports">Sports</option>
                        <option value="Plants">Plants</option>
                        <option value="Community">Community</option>
                    </select>
                </div>
            </div>
        </div>
    )
}