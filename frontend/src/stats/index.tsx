// @ts-ignore
import {Button, Dropdown} from "monday-ui-react-core"

import Questions, {Question} from "../data/questions";

export default function Stats(props: {
    onHome: () => void;
}) {
    return <>
        <Button onClick={props.onHome}>Go back</Button>

        {Questions.map(question => <QuestionStats question={question}/>)}
    </>;
}

function QuestionStats(props: { question: Question }) {
    return <>


    </>
}